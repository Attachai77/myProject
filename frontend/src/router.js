import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Auth/login.vue";
import UsersList from "./components/Users/index.vue";
import UsersView from "./components/Users/view.vue";
import CreateUser from "./components/Users/create.vue";
import EditUser from "./components/Users/edit.vue";
import ValidateDemo from "./components/validate_demo.vue"

import store from "./store/index"
 
Vue.use(Router);
 
let router = new Router({
    mode: "history",
    routes: [
        {   path: "/", name: "home", component: UsersList},
        {   path: '/login', name: 'login', component: Login,  meta: { guest: true }   },
        {   path: "/users", name: "users-index",    component: UsersList,   /* meta: {  //     requiresAuth: true    } */   },
        {   path: "/users/create", name: "users-create",    component: CreateUser},
        {   path: "/users/edit/:id",name: "users-edit",component: EditUser,props: true,   meta: { requiresAuth: true} }, /* Allow pass parameters */
        {   path: "/users/view/:id",    name: "users-view", component: UsersView,   props: true,    meta: { requiresAuth: true}},
        {   path: "/validateDemo",   component: ValidateDemo    },
        {   path: '*', redirect: '/login' }
    ]
});

router.beforeEach((to, from, next) => {
    // console.log(to);

    if (to.matched.some(record => record.meta.requiresAuth)) {
        

        if (store.getters.isLoggedIn) {
            // console.log("1: isLoggedIn");
            
            next()
            return
        }
        // console.log("2: redirect login");
        next('login')

    } else if(to.matched.some(record => record.meta.guest)) {

        if(!store.getters.isLoggedIn){
            next()
        }
        else{
            next({ name: 'users'})
        }

    } else {

        next()

    }

    // if(to.matched.some(record => record.meta.requiresAuth)) {
        
    //     if (localStorage.getItem('token') == null || localStorage.getItem('token') == undefined) {
    //         next({
    //             path: '/login',
    //             params: { nextUrl: to.fullPath }
    //         })
    //     } else {
    //         next()
    //     }
    // } else if(to.matched.some(record => record.meta.guest)) {
    //     if(localStorage.getItem('token') == null || localStorage.getItem('token') == undefined){
    //         next()
    //     }
    //     else{
    //         next({ name: 'users'})
    //     }
    // }else {
    //     next() 
    // }


})

export default router