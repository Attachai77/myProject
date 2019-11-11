import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Auth/login.vue";
import UsersList from "./components/Users/index.vue";
import UsersView from "./components/Users/view.vue";
import CreateUser from "./components/Users/create.vue";
import EditUser from "./components/Users/edit.vue";
import ValidateDemo from "./components/validate_demo.vue"
 
Vue.use(Router);
 
let router = new Router({
    mode: "history",
    routes: [
        {   path: "/", name: "home", component: UsersList,},
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
    // console.log(from);

    if(to.matched.some(record => record.meta.requiresAuth)) {
        
        if (localStorage.getItem('token') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('token') == null){
            next()
        }
        else{
            next({ name: 'users'})
        }
    }else {
        next() 
    }


})

export default router