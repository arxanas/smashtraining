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
import { entries, log } from "./utils";

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
  snackbarText: string | null;
  drawer: boolean;
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
    recordedPracticeSets?: {
      [gameId in GameId]?: {
        [character in CharacterId<gameId>]?: Array<PracticeSet<TechId>>;
      };
    };
  };
}

interface RootState {
  main: MainState;
}

export const defaultMainState: MainState = {
  version: 1,
  snackbarText: null,
  drawer: false,
  local: {
    loaded: false,
    selectedGame: "ssbu",
    selectedCharacters: {
      ssbu: null,
    },
  },
  remote: {},
};

Vue.use(Vuex);

type MainContext = ActionContext<MainState, RootState>;

function vueSet<T extends {}, Key extends (keyof T) & (number | string)>(
  object: T,
  key: Key,
  value: T[Key],
): void {
  Vue.set(object, key, value);
}

const mainStore = {
  namespaced: true,
  state: defaultMainState,
  getters: {
    selectedCharacters(
      state: MainState,
    ): MainState["local"]["selectedCharacters"] {
      return state.local.selectedCharacters;
    },
    snackbarText(state: MainState): MainState["snackbarText"] {
      return state.snackbarText;
    },
    drawer(state: MainState): MainState["drawer"] {
      return state.drawer;
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
    ): {
      [gameId in GameId]: {
        [characterId in CharacterId<gameId>]: Map<
          SerializedTechVariant,
          SpacedRepetitionItem
        >;
      };
    } {
      const result: {
        [gameId in GameId]: {
          [characterId in CharacterId<gameId>]: Map<
            SerializedTechVariant,
            SpacedRepetitionItem
          >;
        };
      } = { ssbu: {} };
      const recordedPracticeSets = state.remote.recordedPracticeSets || {};
      for (const gameEntry of entries(recordedPracticeSets)) {
        const [gameId, gameInfo] = gameEntry;
        const gameResult: {
          [characterId in CharacterId<typeof gameId>]: Map<
            SerializedTechVariant,
            SpacedRepetitionItem
          >;
        } = {};
        for (const characterEntry of entries(gameInfo)) {
          const [characterId, characterInfo] = characterEntry;
          const characterResult = new Map<
            SerializedTechVariant,
            SpacedRepetitionItem
          >();
          for (const practiceSet of characterInfo) {
            const key = serializeTechVariant(
              practiceSet.techId,
              practiceSet.techVariant,
            );
            const currentItemOpt = characterResult.get(key);
            const currentItem =
              currentItemOpt !== undefined ? currentItemOpt : createItem();
            const performance = averagePerformance(
              practiceSet.reps.map(rep => rep.performance),
            );
            const newItem = updateItem(currentItem, performance);
            characterResult.set(key, newItem);
          }
          gameResult[characterId] = characterResult;
        }
        result[gameId] = gameResult;
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
      selectedCharacters[gameId] = characterId;
    },
    unselectCharacter(state: MainState, gameId: GameId): void {
      state.local.selectedCharacters[gameId] = null;
    },
    setSnackbarText(state: MainState, snackbarText: string | null): void {
      state.snackbarText = snackbarText;
    },
    setDrawer(state: MainState, drawer: boolean): void {
      state.drawer = drawer;
    },
    recordPracticeSet<G extends GameId, T extends TechId>(
      state: MainState,
      params: {
        gameAndCharacterId: GameAndCharacterId<G>;
        practiceSet: PracticeSet<T>;
      },
    ): void {
      const { gameAndCharacterId, practiceSet } = params;
      const { gameId, characterId } = gameAndCharacterId;
      const recordedPracticeSets = state.remote.recordedPracticeSets || {};
      vueSet(state.remote, "recordedPracticeSets", recordedPracticeSets);
      const gamePracticeSets = (recordedPracticeSets[gameId] || {}) as {
        [c in CharacterId<typeof gameId>]: Array<PracticeSet<TechId>>;
      };
      vueSet(recordedPracticeSets, gameId, gamePracticeSets);
      const characterPracticeSets = gamePracticeSets[characterId] || [];
      vueSet(gamePracticeSets, characterId, characterPracticeSets);
      characterPracticeSets.push(practiceSet);
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
      vueSet(state.remote, "recordedRawGspData", recordedRawGspData);
      const gameData = (recordedRawGspData[gameId] || {}) as {
        [x: string]: RawGspDatum[];
      };
      vueSet(recordedRawGspData, gameId, gameData);
      const characterData = gameData[characterId] || [];
      vueSet(gameData, characterId, characterData);
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

      // Backward-compatibility.
      if (Array.isArray(previousState.remote.recordedPracticeSets)) {
        previousState.remote.recordedPracticeSets = {};
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
export const readSnackbarText = read(mainStore.getters.snackbarText);
export const readDrawer = read(mainStore.getters.drawer);
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
export const commitSnackbarText = commit(mainStore.mutations.setSnackbarText);
export const commitDrawer = commit(mainStore.mutations.setDrawer);
