import Vue from "vue";
import Router from "vue-router";
import LearnTech from "./views/LearnTech.vue";
import Training from "./views/Training.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "training",
      component: Training,
    },
    {
      path: "/tech/:techId",
      name: "learn-tech",
      component: LearnTech,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // See https://router.vuejs.org/guide/advanced/scroll-behavior.html
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
