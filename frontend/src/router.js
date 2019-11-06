import Vue from "vue";
import Router from "vue-router";
import UsersList from "./components/Users/index.vue";
import UsersView from "./components/Users/view.vue";
import CreateUser from "./components/Users/create.vue";
import EditUser from "./components/Users/edit.vue";
 
Vue.use(Router);
 
export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            alias: "/home",
            component: UsersList,
        },
        {
            path: "/users",
            name: "users-index",
            alias: "/users",
            component: UsersList
        },
        {
            path: "/users/create",
            name: "users-create",
            component: CreateUser,
            props: true
        },
        {
            path: "/users/edit",
            name: "users-edit",
            component: EditUser,
            props: true
        },
        {
            path: "/users/view/:id",
            name: "users-view",
            component: UsersView,
            props: true
        }
    ]
});