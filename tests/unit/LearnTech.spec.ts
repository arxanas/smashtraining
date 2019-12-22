import allTechMetadata from "@/tech/AllTechMetadata";
import { TechMetadata, TechVariant } from "@/tech/TechMetadata";
import LearnTech from "@/views/LearnTech.vue";
import { mount, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import { flagConsoleErrors } from "../utils";

function generateVariantData(techMetadata: TechMetadata): TechVariant {
  const result: TechVariant = {};
  if (techMetadata.variants.jumpDistance) {
    result.jumpDistance = "0.5";
  }
  if (techMetadata.variants.aerialType) {
    result.aerialType = "fair";
  }
  return result;
}

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
            techId: "falling-aerial",
          },
          query: {
            jumpDistance: "999.0",
          },
        },
      },
    });
    expect(wrapper.text()).toMatch(
      /Error: Bad variant 'jumpDistance' for tech 'falling-aerial'/,
    );
  });

  it("should not accept providing insufficient variant values", () => {
    const wrapper = shallowMount(LearnTech, {
      mocks: {
        $route: {
          params: {
            techId: "falling-aerial",
          },
          query: {
            // Missing `aerialType`.
            jumpDistance: "1.0",
          },
        },
      },
    });
    expect(wrapper.text()).toMatch(
      /Error: Bad variant 'aerialType' for tech 'falling-aerial'/,
    );
  });

  it.each(Object.entries(allTechMetadata))(
    "should render tech %s without errors",
    (techId: string, techMetadata: TechMetadata) => {
      const params = { techId };
      const query = generateVariantData(techMetadata);
      const wrapper = mount(LearnTech, {
        stubs: ["router-link"],
        mocks: {
          $route: {
            params,
            query,
          },
        },
      });
      expect(wrapper.text()).toMatch(/Description/);
      expect(wrapper.text()).not.toMatch(/Error/);
    },
  );
});
