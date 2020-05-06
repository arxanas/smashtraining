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
    // https://github.com/vuetifyjs/vuetify/issues/1210#issuecomment-319624495
    const app = document.createElement("div");
    app.setAttribute("data-app", "data-app");
    document.body.appendChild(app);

    const store = makeDefaultRootStore();
    const wrapper = mount(Training, {
      router,
      vuetify: new Vuetify(),
      store,
    });

    const trainingHeader = wrapper.find({ name: "TrainingHeader" });
    await trainingHeader.vm.$nextTick();
    expect(readSelectedCharacters(store).ssbu).toBeNull();
    expect(
      wrapper
        .findAll({ name: "v-expansion-panel-header" })
        .at(trainingHeader.vm.$data.value)
        .text()
        .toLowerCase(),
    ).toContain("character");

    const autocomplete = wrapper.find({ name: "v-autocomplete" });
    autocomplete.vm.$emit("change", "chrom");

    expect(readSelectedCharacters(store).ssbu).toBe("chrom");
    expect(
      wrapper
        .findAll({ name: "v-expansion-panel-header" })
        .at(trainingHeader.vm.$data.value)
        .text()
        .toLowerCase(),
    ).toContain("how to use");
  });
});
