<template>
    <div>
        <h1>Users List Page</h1>

        <table class="table table-hover table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Birth Date</th>
                <th scope="col">Gendar</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <th scope="row">{{ recordNumber(index) }}</th>
                    <td>{{ user.fullname }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ formatDate(user.birthdate) }}</td>
                    <td>{{ user.gendar }}</td>
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

        <p class="mt-3" align="left">Current Page: {{ paginator.current_page }}</p>

        <div class="mt-3">
            <b-pagination v-on:input="clickPage" v-model="paginator.current_page" for="table" :per-page="paginator.per_page" 
            aria-controls="my-table" pills :total-rows="paginator.total" align="center"></b-pagination>
        </div>

    </div>
</template>

<script>
import api from "../../http-common";
import moment from 'moment'

export default {
    name: "users-index",
    data() {
        return {
            users: [],
            paginator: {
                total: '',
                last_page: '',
                per_page: 3,
                current_page: 1,
                from: '',
                to: ''
            }
        };
    },
    methods: {
        getAllUsers() {
            const per_page = this.paginator.per_page
            const current_page = this.paginator.current_page
            api.get("/users?current_page="+current_page+"&per_page="+per_page)
                .then(res => {
                    this.users = res.data.data.data; 
                    this.paginator = {
                        total: res.data.data.total,
                        last_page: res.data.data.last_page,
                        per_page: res.data.data.per_page,
                        current_page: res.data.data.current_page,
                        from: res.data.data.from,
                        to: res.data.data.to
                    }
                    // console.log(this.users)
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
        },
        formatDate(value){
            if (value) {
                return moment(String(value)).lang("th").format('DD MMMM YYYY')
            }
            return ""
        },
        recordNumber(index){
            return ((this.paginator.current_page - 1) * this.paginator.per_page ) + ( index + 1 )
        },
        clickPage(page){
            this.paginator.current_page = page
            this.getAllUsers()
        },
    },
    mounted() {
        this.getAllUsers();
    },
    computed: {
        rows() {
            return 125
        }
    }
}
</script>

<style lang="">
    
</style>