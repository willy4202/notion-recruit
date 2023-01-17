import Vue from "vue";
import VueRouter from "vue-router";
import Jobs from "../views/Jobs.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HomeView.vue"),
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: Jobs,
  },
  {
    path: "/jobs/:jobId",
    name: "jobs",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/JobDetails.vue"),
    props: true,
  },
  {
    path: "/gallery",
    name: "gallery",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DatabaseTestView.vue"),
    props: true,
  },
  {
    path: "/applicant",
    name: "applicant",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ApplicantView.vue"),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
