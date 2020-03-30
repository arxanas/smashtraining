import {
  averagePerformance,
  createItem,
  Item as SpacedRepetitionItem,
  Performance,
  updateItem,
} from "@/tech/SpacedRepetition";
import { createDirectStore } from "direct-vuex";
import Vue from "vue";
import Vuex, { ActionContext } from "vuex";
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

export interface PracticeSet<T extends TechId> {
  techId: T;
  techVariant: TechVariantOf<T>;
  reps: Rep[];
  timestamp: number;
}

interface State {
  version: 1;
  local: {
    loaded: boolean;
    selectedGame: GameId;
    selectedCharacters: { [game in GameId]: CharacterId<game> | null };
  };
  remote: {
    recordedPracticeSets: Array<PracticeSet<TechId>>;
  };
}

const defaultState: State = {
  version: 1,
  local: {
    loaded: false,
    selectedGame: "ssbu",
    selectedCharacters: {
      ssbu: null,
    },
  },
  remote: {
    recordedPracticeSets: [],
  },
};

Vue.use(Vuex);

const { store } = createDirectStore({
  state: defaultState,
  getters: {
    spacedRepetitionItems(
      state: State,
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
      state: State,
      gameAndCharacterId: GameAndCharacterId<T>,
    ): void {
      const { gameId, characterId } = gameAndCharacterId;
      const selectedCharacters = state.local.selectedCharacters;
      // @ts-ignore TypeScript doesn't seem to know that `gameId` and
      // `characterId` have some relationship. Even casting the right-hand side
      // with `characterId as CharacterId<typeof gameId>` doesn't work.
      selectedCharacters[gameId] = characterId;
    },
    unselectCharacter(state: State, gameId: GameId): void {
      state.local.selectedCharacters[gameId] = null;
    },
    recordPracticeSet<T extends TechId>(
      state: State,
      practiceSet: PracticeSet<T>,
    ): void {
      state.remote.recordedPracticeSets.push(practiceSet);
    },
    restoreState(state: State, newState: State) {
      Object.assign(state, newState);
    },
  },
  actions: {
    async saveState(context: ActionContext<State, {}>): Promise<void> {
      const state = { ...context.state, loaded: false };
      localStorage.setItem("state", JSON.stringify(state));
    },
    async restoreState(context: ActionContext<State, {}>): Promise<void> {
      if (context.state.local.loaded) {
        return;
      }

      const previousStateString = localStorage.getItem("state");
      if (previousStateString === null) {
        return;
      }
      const previousState: State = JSON.parse(previousStateString);
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
});

export default store;

export type Store = typeof store;

export function getStore(): Store {
  return store;
}
