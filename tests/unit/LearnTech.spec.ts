import LearnTech from "@/views/LearnTech.vue";
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import { flagConsoleErrors } from "../utils";

describe("LearnTech.vue", () => {
  beforeAll(() => {
    Vue.use(Vuetify);
  });

  const token = flagConsoleErrors();
  beforeEach(token.beforeEach);
  afterEach(token.afterEach);

  it("should render details about an extant tech", () => {
    const wrapper = shallowMount(LearnTech, {
      mocks: {
        $route: {
          params: {
            techId: "b-reverse",
          },
        },
      },
    });
    expect(wrapper.text()).toMatch(/Learn: B-reverse/);
  });

  it("should render an error for non-existent tech", () => {
    const wrapper = shallowMount(LearnTech, {
      mocks: {
        $route: {
          params: {
            techId: "foo",
          },
        },
      },
    });
    expect(wrapper.text()).toMatch(/Error: Unknown tech 'foo'/);
  });
});
