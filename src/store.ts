import { Performance } from "@/tech/SpacedRepetition";
import { createDirectStore } from "direct-vuex";
import Vue from "vue";
import Vuex, { ActionContext, Mutation } from "vuex";
import { TechId } from "./tech/AllTechMetadata";
import { log } from "./utils";

export interface Rep {
  performance: Performance;
}

export interface PracticeSet<T extends TechId> {
  techId: T;
  reps: Rep[];
  timestamp: number;
}

interface State {
  version: 1;
  recordedPracticeSets: Array<PracticeSet<TechId>>;
}

const defaultState: State = {
  version: 1,
  recordedPracticeSets: [],
};

type Context = ActionContext<State, {}>;
function commit<Key extends keyof State>(
  context: Context,
  key: Key,
  value: State[Key],
): void {
  return context.commit(key, value);
}

Vue.use(Vuex);

const { store } = createDirectStore({
  state: defaultState,
  mutations: {
    recordPracticeSet<T extends TechId>(
      state: State,
      practiceSet: PracticeSet<T>,
    ): void {
      state.recordedPracticeSets.push(practiceSet);
    },
  },
  actions: {
    async restoreState(context: ActionContext<State, {}>): Promise<void> {
      const localStateString = localStorage.getItem("state");
      if (localStateString === null) {
        return;
      }
      const localState: State = JSON.parse(localStateString);
      const oldVersion: number = localState.version;
      const currentVersion = context.state.version;
      if (oldVersion !== currentVersion) {
        await log(
          "Version mismatch when local state from `localStorage`. " +
            `Old version was ${oldVersion} and current version is ${currentVersion}`,
        );
      }

      commit(context, "version", currentVersion);
      commit(context, "recordedPracticeSets", localState.recordedPracticeSets);
    },
  },
});

export default store;

export function getStore(): typeof store {
  return store;
}
