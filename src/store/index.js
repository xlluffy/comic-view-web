import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import chapter from './modules/chapter'
// import permission from './modules/permission'
import getters from "@/store/getters";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    chapter,
    // permission
  },

  getters
})
