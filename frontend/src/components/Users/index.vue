<template>
    <div>
        <h1>Users List Page</h1>

        <table class="table table-hover table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Age</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <th scope="row">{{ ++index }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.age }}</td>
                    <td>
                        <router-link class="btn btn-outline-warning" :to="{
                            name: 'users-view',
                            params:{ id: user.id }
                        }">view</router-link>

                        <router-link class="btn btn-outline-info" :to="{
                            name: 'users-edit',
                            params:{ id: user.id }
                        }">edit</router-link>

                        <button type="button" v-on:click="deleteUser( user.id )" class="btn btn-outline-danger" >delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import api from "../../http-common";

export default {
    name: "users-index",
    data() {
        return {
            users: []
        };
    },
    methods: {
        getAllUsers() {
            api.get("/users")
                .then(res => {
                    this.users = res.data.data; 
                    // console.log(res)
                })
                .catch(e => {
                    // console.log(e);
                });
        },
        refreshList() {
            this.getAllUsers();
        },
        deleteUser(user_id){
            // console.log(user_id)
            api.delete("/users/deleteUser/"+user_id)
                .then(res => {
                    this.$message({
                        message: res.data.message,
                        type: 'success',
                        position: 'top-right',
                    })
                    this.getAllUsers();
                })
                .catch(e => {
                    if (e.response.data.status == 401) {
                        this.$message({
                            message: e.response.data.message,
                            type: 'error',
                            position: 'top-right',
                        })
                        this.$parent.logout();
                    }
                });
        }
    },
    mounted() {
        this.getAllUsers();
    }
}
</script>

<style lang="">
    
</style>