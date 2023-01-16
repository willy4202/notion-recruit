import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jobDetails: {
      title: "",
      department: "",
      team: "",
      career: "",
    },
  },
  getters: {},
  mutations: {
    SET_JOB_DETAILS(state, job) {
      state.jobDetails.title = job.title;
      state.jobDetails.department = job.department;
      state.jobDetails.team = job.team;
      state.jobDetails.career = job.career;
    },
  },
  actions: {
    setJobDetails({ commit }, job) {
      commit("SET_JOB_DETAILS", job);
    },
  },
  modules: {},
});
