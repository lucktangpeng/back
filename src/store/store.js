import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex)
import mutations from "./mutations/mutations"
import state from "./state/state"
import actions from "./actions/actions"
import getters from "./getters/getters"

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
  })