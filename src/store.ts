import {
  averagePerformance,
  createItem,
  Item as SpacedRepetitionItem,
  Performance,
  updateItem,
} from "@/tech/SpacedRepetition";
import Vue from "vue";
import Vuex, { ActionContext } from "vuex";
import { getStoreAccessors } from "vuex-typescript";
import {
  CharacterId,
  GameAndCharacterId,
  GameId,
} from "./tech/AllCharacterMetadata";
import {
  SerializedTechVariant,
  serializeTechVariant,
  TechId,
  TechVariantOf,
} from "./tech/AllTechMetadata";
import { log } from "./utils";

export interface Rep {
  performance: Performance;
}

export interface RawGspDatum {
  timestamp: number;
  gsp: number;
}

export interface PracticeSet<T extends TechId> {
  techId: T;
  techVariant: TechVariantOf<T>;
  reps: Rep[];
  timestamp: number;
}

interface MainState {
  version: 1;
  local: {
    loaded: boolean;
    selectedGame: GameId;
    selectedCharacters: { [game in GameId]: CharacterId<game> | null };
  };
  remote: {
    recordedRawGspData?: {
      [gameId in GameId]?: {
        [character in CharacterId<gameId>]?: RawGspDatum[];
      };
    };
    recordedPracticeSets: Array<PracticeSet<TechId>>;
  };
}

interface RootState {
  main: MainState;
}

export const defaultMainState: MainState = {
  version: 1,
  local: {
    loaded: false,
    selectedGame: "ssbu",
    selectedCharacters: {
      ssbu: null,
    },
  },
  remote: {
    recordedRawGspData: {
      ssbu: {},
    },
    recordedPracticeSets: [],
  },
};

Vue.use(Vuex);

type MainContext = ActionContext<MainState, RootState>;

const mainStore = {
  namespaced: true,
  state: defaultMainState,
  getters: {
    selectedCharacters(
      state: MainState,
    ): MainState["local"]["selectedCharacters"] {
      return state.local.selectedCharacters;
    },
    recordedPracticeSets(
      state: MainState,
    ): MainState["remote"]["recordedPracticeSets"] {
      return state.remote.recordedPracticeSets;
    },
    recordedRawGspData(
      state: MainState,
    ): MainState["remote"]["recordedRawGspData"] {
      return state.remote.recordedRawGspData;
    },
    spacedRepetitionItems(
      state: MainState,
    ): Map<SerializedTechVariant, SpacedRepetitionItem> {
      const result = new Map<SerializedTechVariant, SpacedRepetitionItem>();
      for (const practiceSet of state.remote.recordedPracticeSets) {
        const key = serializeTechVariant(
          practiceSet.techId,
          practiceSet.techVariant,
        );
        const currentItemOpt = result.get(key);
        const currentItem =
          currentItemOpt !== undefined ? currentItemOpt : createItem();
        const performance = averagePerformance(
          practiceSet.reps.map(rep => rep.performance),
        );
        const newItem = updateItem(currentItem, performance);
        result.set(key, newItem);
      }
      return result;
    },
  },
  mutations: {
    selectCharacter<T extends GameId>(
      state: MainState,
      gameAndCharacterId: GameAndCharacterId<T>,
    ): void {
      const { gameId, characterId } = gameAndCharacterId;
      const selectedCharacters = state.local.selectedCharacters;
      // @ts-ignore TypeScript doesn't seem to know that `gameId` and
      // `characterId` have some relationship. Even casting the right-hand side
      // with `characterId as CharacterId<typeof gameId>` doesn't work.
      selectedCharacters[gameId] = characterId;
    },
    unselectCharacter(state: MainState, gameId: GameId): void {
      state.local.selectedCharacters[gameId] = null;
    },
    recordPracticeSet<T extends TechId>(
      state: MainState,
      practiceSet: PracticeSet<T>,
    ): void {
      state.remote.recordedPracticeSets.push(practiceSet);
    },
    recordGspDatum<T extends GameId>(
      state: MainState,
      param: {
        gameAndCharacterId: GameAndCharacterId<T>;
        gspDatum: RawGspDatum;
      },
    ): void {
      const { gameAndCharacterId, gspDatum } = param;
      const { gameId, characterId } = gameAndCharacterId;
      const recordedRawGspData = state.remote.recordedRawGspData || {};
      state.remote.recordedRawGspData = recordedRawGspData;
      const gameData = (recordedRawGspData[gameId] || {}) as {
        [x: string]: RawGspDatum[];
      };
      Vue.set(recordedRawGspData, gameId, gameData);
      const characterData = gameData[characterId] || [];
      Vue.set(gameData, characterId, characterData);
      characterData.push(gspDatum);
    },
    restoreState(state: MainState, newState: MainState) {
      Object.assign(state, newState);
    },
  },
  actions: {
    async saveState(context: MainContext): Promise<void> {
      const state = { ...context.state, loaded: false };
      localStorage.setItem("state", JSON.stringify(state));
    },
    async restoreState(context: MainContext): Promise<void> {
      if (context.state.local.loaded) {
        return;
      }

      const previousStateString = localStorage.getItem("state");
      if (previousStateString === null) {
        return;
      }
      const previousState: MainState = JSON.parse(previousStateString);
      const oldVersion: number = previousState.version;
      const currentVersion = context.state.version;
      if (oldVersion !== currentVersion) {
        await log(
          "Version mismatch when local state from `localStorage`. " +
            `Old version was ${oldVersion} and current version is ${currentVersion}`,
        );
      }

      previousState.local.loaded = true;
      context.commit("restoreState", {
        ...previousState,
        version: currentVersion,
      });
    },
  },
};

export type MainStore = typeof mainStore;

const rootStore = new Vuex.Store({
  modules: {
    main: mainStore,
  },
});

export type RootStore = typeof rootStore;

export default rootStore;

export function makeDefaultRootStore(): RootStore {
  return new Vuex.Store({
    modules: {
      main: mainStore,
    },
  });
}

const { commit, read, dispatch } = getStoreAccessors<MainState, RootState>(
  "main",
);

export const readSpacedRepetitionItems = read(
  mainStore.getters.spacedRepetitionItems,
);
export const readRecordedPracticeSets = read(
  mainStore.getters.recordedPracticeSets,
);
export const readRawGspData = read(mainStore.getters.recordedRawGspData);
export const readSelectedCharacters = read(
  mainStore.getters.selectedCharacters,
);
export const dispatchRestoreState = dispatch(mainStore.actions.restoreState);
export const dispatchSaveState = dispatch(mainStore.actions.saveState);
export const commitRecordPracticeSet = commit(
  mainStore.mutations.recordPracticeSet,
);
export const commitRecordGspDatum = commit(mainStore.mutations.recordGspDatum);
export const commitSelectCharacter = commit(
  mainStore.mutations.selectCharacter,
);
export const commitUnselectCharacter = commit(
  mainStore.mutations.unselectCharacter,
);
