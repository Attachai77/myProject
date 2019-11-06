<template>
    <div>
        <h1>Users List Page</h1>
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
        retrieveUsers() {
            api
                .get("/users")
                .then(res => {
                    this.users = res.data.data; 
                    console.log(res)
                })
                .catch(e => {
                    console.log(e);
                });
        },
        refreshList() {
            this.retrieveUsers();
        }
    },
    mounted() {
        this.retrieveUsers();
    }
}
</script>

<style lang="">
    
</style>