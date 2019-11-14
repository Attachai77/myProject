<template>
    <div>
        <h1>Users Create Page</h1>

        <form>

            <div class="form-group row " :class="{ 'form-group--error': $v.user.name.$error }">
                <label class="col-sm-4 col-form-label">Name</label>
                <div class="col-sm-8">
                    <input class="form-control" :class="{ 'is-invalid': $v.user.name.$error }" v-model.trim="$v.user.name.$model"  placeholder="Name"/>
                    <div v-if="!$v.user.name.required" class="invalid-feedback">Name is required</div>
                    <div v-if="!$v.user.name.minLength" class="invalid-feedback">Name must have at least {{$v.user.name.$params.minLength.min}} letters.</div>
                </div>
            </div>
            
            <div class="form-group row" :class="{ 'form-group--error': $v.user.username.$error }">
                <label class="col-sm-4 col-form-label">Username</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" :class="{ 'is-invalid': $v.user.username.$error }" v-model.trim="$v.user.username.$model" placeholder="Username">
                    <div v-if="!$v.user.username.required" class="invalid-feedback">Username is required</div>
                    <div v-if="!$v.user.username.minLength || !$v.user.username.maxLength" class="invalid-feedback">
                        Username must has between {{$v.user.username.$params.minLength.min}} - {{$v.user.username.$params.maxLength.max}}  characters.
                    </div>
                    <div v-if="username_already_taken" class="invalid-feedback">
                        Username already taken.
                    </div>
                </div>
            </div>

            <div class="form-group row"  :class="{ 'form-group--error': $v.user.password.$error }">
                <label class="col-sm-4 col-form-label">Password</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control" :class="{ 'is-invalid': $v.user.password.$error }" v-model.trim="$v.user.password.$model" placeholder="Password">
                    <div v-if="!$v.user.password.required" class="invalid-feedback">Password is required</div>
                    <div v-if="!$v.user.password.minLength || !$v.user.password.maxLength" class="invalid-feedback">
                        Password must has between {{$v.user.password.$params.minLength.min}} - {{$v.user.password.$params.maxLength.max}}  characters.
                    </div>
                </div>
            </div>

            <div class="form-group row"  :class="{ 'form-group--error': $v.user.confirm_password.$error }">
                <label class="col-sm-4 col-form-label">Confirm Password</label>
                <div class="col-sm-8">
                    <input type="password" class="form-control" :class="{ 'is-invalid': $v.user.confirm_password.$error }" v-model.trim="$v.user.confirm_password.$model" placeholder="Confirm Password">
                    <div v-if="!$v.user.confirm_password.sameAs" class="invalid-feedback">Passwords must match</div>
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
                    <button type="button" v-on:click="createUser" class="btn btn-primary">Create</button>
                </div>
            </div>
        </form>

    </div>
</template>

<script>

import api from "../../http-common";
import { required, minLength, maxLength, between, numeric, sameAs } from 'vuelidate/lib/validators'

export default { 
    data(){
        return {
            user:{
                name:'',
                username:'',
                password:'',
                age:'',
                confirm_password:''
            },
            username_already_taken: false
        }
    },
    methods: {
        createUser(){
            this.$v.$touch();
            // console.log(this.$v.user);
            
            if (this.$v.$invalid) {
                return;
            }
            
            // console.log(this.user)
            const data = {
                name: this.user.name,
                username: this.user.username,
                password: this.user.password,
                age: this.user.age
            }
            
            api.post("/users/createUser", data)
                .then(res => {
                    if (res.data.success) {
                        this.$message({
                            message: res.data.message,
                            type: 'success',
                            position: 'top-right'
                        })
                        this.$router.push('/users')
                    }else{
                        this.$message({
                            message: res.data.message,
                            type: 'error',
                            position: 'top-right'
                        })
                    }
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
    validations: {
        user:{
            name: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(32)
            },
            username: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(16)
            },
            password: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(16)
            },
            confirm_password: {
                sameAsPassword: sameAs('password')
            },
            age: {
                between: between(0, 100),
                numeric
            }
        }
    }
    
 }
</script>

