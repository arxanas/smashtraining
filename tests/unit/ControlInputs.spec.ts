import ControlInputs from "@/components/ControlInputs.vue";
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import { flagConsoleErrors, ignoreConsoleErrors } from "../utils";

describe("HelloWorld.vue", () => {
  beforeAll(() => {
    Vue.use(Vuetify);
  });

  const token = flagConsoleErrors();
  beforeEach(token.beforeEach);
  afterEach(token.afterEach);

  it("renders inputs", () => {
    const inputs = "u d l r . U D L R - a + b sh fh";
    const wrapper = shallowMount(ControlInputs, {
      propsData: { inputs },
    });
    expect(wrapper.text()).toMatchSnapshot();
  });

  it("rejects unknown inputs", () => {
    ignoreConsoleErrors(() => {
      const inputs = "foo";
      expect(() =>
        shallowMount(ControlInputs, {
          propsData: { inputs },
        }),
      ).toThrowError("Unknown control input type: foo");
    });
  });
});
