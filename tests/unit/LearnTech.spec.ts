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
          query: {},
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
          query: {},
        },
      },
    });
    expect(wrapper.text()).toMatch(/Error: Unknown tech 'foo'/);
  });

  it("should not accept variants for techs that don't have them", () => {
    const wrapper = shallowMount(LearnTech, {
      mocks: {
        $route: {
          params: {
            techId: "b-reverse",
          },
          query: {
            jumpDistance: "1.0",
          },
        },
      },
    });
    expect(wrapper.text()).toMatch(
      /Error: Bad variant 'jumpDistance' for tech 'b-reverse'/,
    );
  });

  it("should not accept invalid variant values", () => {
    const wrapper = shallowMount(LearnTech, {
      mocks: {
        $route: {
          params: {
            techId: "short-hop-fast-fall-aerial",
          },
          query: {
            jumpDistance: "999.0",
          },
        },
      },
    });
    expect(wrapper.text()).toMatch(
      /Error: Bad variant 'jumpDistance' for tech 'short-hop-fast-fall-aerial'/,
    );
  });

  it("should not accept providing insufficient variant values", () => {
    const wrapper = shallowMount(LearnTech, {
      mocks: {
        $route: {
          params: {
            techId: "short-hop-fast-fall-aerial",
          },
          query: {
            // Missing `aerialType`.
            jumpDistance: "1.0",
          },
        },
      },
    });
    expect(wrapper.text()).toMatch(
      /Error: Bad variant 'aerialType' for tech 'short-hop-fast-fall-aerial'/,
    );
  });
});
