<template>
    <div>
        <h1>Users Edit</h1>

        <form>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-4 col-form-label">Name</label>
                <div class="col-sm-8">
                <input type="text" class="form-control" id="Name"  v-model="user.name" >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputEmail3" class="col-sm-4 col-form-label">Username</label>
                <div class="col-sm-8">
                <input type="text" class="form-control" id="Username"  v-model="user.username" >
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPassword3" class="col-sm-4 col-form-label">Age</label>
                <div class="col-sm-8">
                <input type="number" class="form-control" id="Age" v-model="user.age">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-8 offset-4">
                <button type="button" v-on:click="updateUser" class="btn btn-primary">Update</button>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
import api from "../../http-common";
export default { 
    props: ["id"],
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
        getUserData(){
            api.get("/users/getUserById/"+this.id)
                .then(res => {
                    this.user = res.data.data; 
                    console.log(res)
                })
                .catch(e => {
                    console.log(e);
                });
        },
        updateUser(){
            // console.log(this.user)
            const data = {
                name: this.user.name,
                username: this.user.username,
                age: this.user.age
            }

            console.log(data)
            
            api.patch("/users/updateUser/"+this.id, data)
                .then(res => {
                    console.log(res.data);
                    this.$router.push('/users');
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.getUserData()
    },
 }
</script>

<style lang="">
    
</style>