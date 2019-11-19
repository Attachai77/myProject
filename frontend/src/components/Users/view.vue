<template>
    <div>
        <h1>Users View</h1>
        <div>
            <label for="" class="col-form-label">Name : </label>
            {{ user.firstname+" "+user.lastname }}
        </div>
        <div>
            <label for="" class="col-form-label">Username : </label>
            {{ user.username }}
        </div>
        <div>
            <label for="" class="col-form-label">Email : </label>
            {{ user.email }}
        </div>
        <div>
            <label for="" class="col-form-label">Birthdate : </label>
            {{ user.birthdate }}
        </div>
    </div>
</template>


<script>
import api from "../../http-common";

export default {
    props: ["id"],
    data() {
        return {
            user:{}
        }
    },
    methods: {
        async getUser(){

            try {
                const user = await this.$store.dispatch('users/getUserById',this.id)
                this.user = user
            } catch (error) {
                if (error.response.status == 401) {
                    this.$message({
                        message: error.response.data.message,
                        type: 'error',
                        position: 'top-right',
                    })
                    this.$parent.logout();
                }
            }

        }
    },
    mounted() {
        this.getUser();
    }
}
</script>

<style lang="">
    
</style>