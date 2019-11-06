<template>
    <div>
        <h1>Users View</h1>
        <div>
            <label for="" class="col-form-label">Name : </label>
            {{ user.name }}
        </div>
        <div>
            <label for="" class="col-form-label">Username : </label>
            {{ user.username }}
        </div>
        <div>
            <label for="" class="col-form-label">Age : </label>
            {{ user.age }}
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
        getUser(){
            api.get("/users/getUserById/"+this.id)
                .then(res => {
                    this.user = res.data.data; 
                    console.log(res)
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.getUser();
    }
}
</script>

<style lang="">
    
</style>