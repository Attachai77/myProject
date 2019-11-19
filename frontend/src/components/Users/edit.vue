<template>
    <div>
        <h1>Users Edit</h1>

        <form>
            <div class="form-group row " >
                <label class="col-sm-4 col-form-label">Username</label>
                <div class="col-sm-8">
                    <input class="form-control" disabled v-model.trim="user.username" />
                </div>
            </div>

            <div class="form-group row " :class="{ 'form-group--error': $v.user.firstname.$error }">
                <label class="col-sm-4 col-form-label">Firstname</label>
                <div class="col-sm-8">
                    <input class="form-control" :class="{ 'is-invalid': $v.user.firstname.$error }" v-model.trim="$v.user.firstname.$model"  />
                    <div v-if="!$v.user.firstname.required" class="invalid-feedback">Firstname is required</div>
                    <div v-if="!$v.user.firstname.minLength" class="invalid-feedback">Firstname must have at least {{$v.user.firstname.$params.minLength.min}} letters.</div>
                </div>
            </div>

            <div class="form-group row " >
                <label class="col-sm-4 col-form-label">Lastname</label>
                <div class="col-sm-8">
                    <input class="form-control"  v-model.trim="user.lastname" />
                </div>
            </div>

            <div class="form-group row " :class="{ 'form-group--error': $v.user.email.$error }">
                <label class="col-sm-4 col-form-label">Email</label>
                <div class="col-sm-8">
                    <input class="form-control" :class="{ 'is-invalid': $v.user.email.$error }" v-model.trim="$v.user.email.$model"  />
                </div>
            </div>

            <div class="form-group row " :class="{ 'form-group--error': $v.user.birthdate.$error }">
                <label class="col-sm-4 col-form-label">Birthdate</label>
                <div class="col-sm-8">
                    <datepicker input-class="form-control" :language="th" name="birthdate" v-model="user.birthdate" ></datepicker>
                </div>
            </div>

            <div class="form-group row " :class="{ 'form-group--error': $v.user.gendar.$error }">
                <label class="col-sm-4 col-form-label">Gendar</label>
                <div class="col-sm-8">
                    <select class="form-control" :class="{ 'is-invalid': $v.user.gendar.$error }" v-model.trim="$v.user.gendar.$model">
                        <option value="">-</option>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                    </select>
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
import Datepicker from 'vuejs-datepicker';
import {en, es, th} from 'vuejs-datepicker/dist/locale'
import api from "../../http-common";
import { required, minLength, maxLength, between, numeric } from 'vuelidate/lib/validators'

export default { 
    components: {
        Datepicker
    },
    props: ["id"],
    data(){
        return {
            user:{
                firsname:'',
                lastname:'',
                email:'',
                birthdate:'',
                gendar:''
            },
            en: en,
            es: es,
            th: th,
        }
    },
    methods: {
        async getUserData(){
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
        },
        updateUser(){
            // console.log(this.user)
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            const data = {
                firstname: this.user.firstname,
                lastname: this.user.lastname,
                email: this.user.email,
                gendar: this.user.gendar,
                birthdate: this.user.birthdate
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
            firstname: {
                required,
                minLength: minLength(4),
                maxLength: maxLength(32)
            },
            email: {},
            birthdate: {},
            gendar: {}
        }
    }
 }
</script>

<style lang="">
    
</style>