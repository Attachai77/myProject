import api from "../../http-common";

// components >>call>> actions 
// actions >>call>> Api
// actions >>call>> mutations
// mutations >>assign data to>> state

//can call "state data" by  getters


// const moduleA = {
//     state: { ... },
//     mutations: { ... },
//     actions: { ... },
//     getters: { ... }
// }

const state = {
    user: {},
    users: {}
}
  
const getters = {
    fullName: (state, getters, rootState) => {
        return state.firstName + ' ' + state.lastName
    },
    user: (state, getters, rootState) => {
        return state.user
    }
}
  
const actions = {
    getUserById: async ({ commit, state }, user_id) => {
        try {
            const user = await api.get("/users/getUserById/"+user_id)
            return user.data.data
        } catch (error) {
            return error
        }
    }
}
  
const mutations = {
    SET_USER (state , data) {
        state.user = data
    }
    // SET_FIRST_NAME (state, payload) {
    //     state.firstName = payload
    // },
    // SET_LAST_NAME (state, payload) {
    //     state.lastName = payload
    // }
}
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}