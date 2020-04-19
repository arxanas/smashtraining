import router from "@/router";
import { makeDefaultRootStore, readSelectedCharacters } from "@/store";
import Training from "@/views/Training.vue";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import { flagConsoleErrors } from "../../utils";

describe("Training.vue", () => {
  beforeAll(() => {
    Vue.use(Vuetify);
  });

  const token = flagConsoleErrors();
  beforeEach(token.beforeEach);
  afterEach(token.afterEach);

  it("should close the Select Character dialog when selected", async () => {
    const store = makeDefaultRootStore();
    const wrapper = mount(Training, {
      router,
      vuetify: new Vuetify(),
      store,
    });

    const trainingHeader = wrapper.find({ name: "TrainingHeader" });
    await trainingHeader.vm.$nextTick();
    expect(readSelectedCharacters(store).ssbu).toBeNull();
    expect(trainingHeader.vm.$data.value).toBe(2); // select character panel open

    const autocomplete = wrapper.find({ name: "v-autocomplete" });
    autocomplete.vm.$emit("change", "chrom");

    await trainingHeader.vm.$nextTick();
    expect(readSelectedCharacters(store).ssbu).toBe("chrom");
    expect(trainingHeader.vm.$data.value).toBe(undefined); // no panel open
  });
});
