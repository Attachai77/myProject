import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import counter from './modules/counter'
import name from './modules/name'
import api from "../http-common";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        users,
        counter,
        name
    },
    strict: debug,

    state: {
        appName: 'BNK48',
        status: '',
        token: localStorage.getItem('token') || '',
        user : JSON.parse( localStorage.getItem('user') )  || '',
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, { token, user } ){
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        login({commit}, data){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                api.post("/auth/login", data)
                .then(resp => {
                    const token = resp.data.token
                    const user = resp.data.user
                    
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user) )
                    api.defaults.headers.common['token'] = token
                    commit('auth_success', { token, user } )
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
            })
        },

        logout({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                delete api.defaults.headers.common['token']
                resolve()
            })
        },
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        Auth: state => state.user,
        appTitle (state) {
            return state.appName
        }
    }

})

