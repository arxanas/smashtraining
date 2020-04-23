import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "Home" */ "./views/Home.vue"),
    },
    {
      path: "/training",
      name: "training",
      component: () =>
        import(/* webpackChunkName: "Training" */ "./views/Training.vue"),
    },
    {
      path: "/gsp-tracker",
      name: "gsp-tracker",
      component: () =>
        import(/* webpackChunkName: "GspTracker" */ "./views/GspTracker.vue"),
    },
    {
      path: "/stats",
      name: "stats",
      component: () =>
        import(/* webpackChunkName: "Stats" */ "./views/Stats.vue"),
    },
    {
      path: "/tech/:techId",
      name: "learn-tech",
      component: () =>
        import(/* webpackChunkName: "LearnTech" */ "./views/LearnTech.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "About" */ "./views/About.vue"),
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
