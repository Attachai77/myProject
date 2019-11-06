<template>
    <div>
        <h1>Users Create Page</h1>

        <form>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-4 col-form-label">Name</label>
                <div class="col-sm-8">
                <input type="text" class="form-control" id="Name"  v-model="user.name" placeholder="Name">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-4 col-form-label">Username</label>
                <div class="col-sm-8">
                <input type="text" class="form-control" id="Username"  v-model="user.username" placeholder="Username">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label">Password</label>
                <div class="col-sm-8">
                <input type="password" class="form-control" id="Password"  v-model="user.password" placeholder="Password">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label">Age</label>
                <div class="col-sm-8">
                <input type="number" class="form-control" id="Age" v-model="user.age" placeholder="Age">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-8 offset-4">
                <button type="button" v-on:click="createUser" class="btn btn-primary">Create</button>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
import api from "../../http-common";
export default { 
    data(){
        return {
            user:{
                name:'',
                username:'',
                password:'',
                age:'',
            }
        }
    },
    methods: {
        createUser(){
            // console.log(this.user)
            const data = {
                name: this.user.name,
                username: this.user.username,
                password: this.user.password,
                age: this.user.age
            }
            
            api.post("/users/createUser", data)
                .then(res => {
                    console.log(res.data);
                    this.$router.push('/users');
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
 }
</script>

<style lang="">
    
</style>