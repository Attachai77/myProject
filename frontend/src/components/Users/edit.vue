<template>
    <div>
        <h1>Users Edit</h1>

        <form>
            <div class="form-group row " :class="{ 'form-group--error': $v.user.name.$error }">
                <label class="col-sm-4 col-form-label">Name</label>
                <div class="col-sm-8">
                    <input class="form-control" :class="{ 'is-invalid': $v.user.name.$error }" v-model.trim="$v.user.name.$model"  placeholder="Name"/>
                    <div v-if="!$v.user.name.required" class="invalid-feedback">Name is required</div>
                    <div v-if="!$v.user.name.minLength" class="invalid-feedback">Name must have at least {{$v.user.name.$params.minLength.min}} letters.</div>
                </div>
            </div>

            <div class="form-group row"  :class="{ 'form-group--error': $v.user.age.$error }">
                <label class="col-sm-4 col-form-label">Age</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" :class="{ 'is-invalid': $v.user.age.$error }" v-model.trim="$v.user.age.$model" placeholder="Age">
                    <div v-if="!$v.user.age.between" class="invalid-feedback">
                        Age must be between {{$v.user.age.$params.between.min}} and {{$v.user.age.$params.between.max}}
                    </div>
                    <div v-if="!$v.user.age.numeric" class="invalid-feedback">Age must be number</div>
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
import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export default { 
    props: ["id"],
    data(){
        return {
            user:{
                name:'',
                age:'',
            }
        }
    },
    methods: {
        getUserData(){
            api.get("/users/getUserById/"+this.id)
                .then(res => {
                    this.user = res.data.data; 
                    // console.log(res)
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
        updateUser(){
            // console.log(this.user)
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            const data = {
                name: this.user.name,
                age: this.user.age
            }
            
            api.patch("/users/updateUser/"+this.id, data)
                .then(res => {
                    console.log(res.data);
                    this.$router.push('/users');
                })
                .catch(e => {
                    if (e.response.data.status == 401) {
                        this.$message({
                            message: e.response.data.message,
                            type: 'error',
                            position: 'top',
                        })
                        localStorage.clear(); 
                        this.$router.push('login')
                    }
                });
        }
    },
    mounted() {
        this.getUserData()
    },
    validations: {
        user:{
            name: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(32)
            },
            age: {
                between: between(0, 100),
                numeric
            }
        }
    }
 }
</script>

<style lang="">
    
</style>