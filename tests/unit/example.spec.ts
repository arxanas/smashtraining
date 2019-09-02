import HelloWorld from "@/components/HelloWorld.vue";
import { shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";

describe("HelloWorld.vue", () => {
  beforeAll(() => {
    Vue.use(Vuetify);
  });

  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(/Welcome to Vuetify/);
  });
});
