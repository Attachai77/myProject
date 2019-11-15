<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-4 offset-sm-4">
                    <div>
                        <h2>Register</h2>
                        <form @submit.prevent="handleSubmit">

                            <div class="form-label-group text-left" :class="{ 'form-group--error': $v.user.firstname.$error }">
                                <input type="text" id="firstname" v-model.trim="$v.user.firstname.$model" class="form-control" :class="{ 'is-invalid': $v.user.firstname.$error }" placeholder="Firstname" autofocus="">
                                <label for="firstname">Firstname</label>
                                <span v-if="!$v.user.firstname.required"  class="invalid-feedback">Firstname is required</span>
                            </div>

                            <div class="form-label-group text-left">
                                <input type="text" id="lastname" v-model.trim="$v.user.lastname.$model" class="form-control"  placeholder="Lastname">
                                <label for="lastname">Lastname</label>
                            </div>
                            <div class="form-label-group text-left">
                                <input type="text" id="username" v-model.trim="$v.user.username.$model" class="form-control" :class="{ 'is-invalid': $v.user.username.$error }" placeholder="Username">
                                <label for="username">Username</label>
                                <span v-if="!$v.user.username.required" class="invalid-feedback">Username is required</span>
                                <div v-if="!$v.user.username.minLength || !$v.user.username.maxLength" class="invalid-feedback">
                                    Username must has between {{$v.user.username.$params.minLength.min}} - {{$v.user.username.$params.maxLength.max}}  characters.
                                </div>
                            </div>
                            <div class="form-label-group text-left">
                                <input type="password" id="password" v-model.trim="$v.user.password.$model" class="form-control" :class="{ 'is-invalid': $v.user.password.$error }" placeholder="Password" >
                                <label for="password">Password</label>
                                <span v-if="!$v.user.password.required" class="invalid-feedback">Password is required</span>
                            </div>
                            <div class="form-label-group text-left">
                                <input type="password" id="confirm_password" v-model.trim="$v.user.confirm_password.$model" class="form-control" :class="{ 'is-invalid': $v.user.confirm_password.$error }" placeholder="Confirm Password" >
                                <label for="confirm_password">Confirm Password</label>
                                <div v-if="!$v.user.confirm_password.sameAs" class="invalid-feedback">Passwords must match</div>
                            </div>
                            <div class="form-label-group text-left">
                                <input type="text" id="email" v-model.trim="$v.user.email.$model" class="form-control" :class="{ 'is-invalid': $v.user.email.$error }" placeholder="Email" >
                                <label for="email">Email</label>
                                <span v-if="!$v.user.email.required" class="invalid-feedback">Email is required</span>
                            </div>
                            <div class="form-label-group text-left">
                                <input type="file" ref="image" id="profile_img" v-on:change="uploadProfileImg" class="form-control"  
                                accept="image/*"
                                :class="{ 'is-invalid': submitted && validImg }" placeholder="Image" >
                                <label for="profile_img">Image</label>
                                <span v-if="!validImg" class="invalid-feedback">Invalid image type</span>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-lg btn-primary btn-block text-uppercase">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <router-link  to="/login" class="btn btn-sm btn-outline-info">login</router-link>
    </div>
</template>

<script>
    import { required , email , sameAs, minLength, maxLength,  } from "vuelidate/lib/validators";
    import api from "../../http-common";

    export default {
        name: "register",
        data() {
            return {
                user: {
                    firstname: "",
                    lastname: "",
                    username: "",
                    password: "",
                    confirm_password: "",
                    email: "",
                    birthdate: "",
                    gendar:"",
                    profile_img:""
                },
                submitted: false,
                validImg: true
            };
        },
        validations: {
            user: {
                firstname: { required },
                lastname: {  },
                username: {
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(16)
                },
                password: { required },
                confirm_password: { sameAsPassword: sameAs('password') },
                email: { email },
                birthdate: {  },
                gendar:{  },
                profile_img:{  },
            }
        },
        methods: {
            uploadProfileImg(e){
              const files = this.$refs.image.files;
              // console.log(files[0]);
              const images_ext = ['image/png','image/jpg','image/jpeg','image/gif'];
              const validaImg =  images_ext.includes("Mango");
              if (validaImg) {
                this.user.profile_img = files[0]
              }else{
                this.validImg = false
                alert("Invalid image file")
              }
              
            },
            handleSubmit(e) {
                this.submitted = true;

                console.log(this.user);

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

                const data = {
                  firstname: this.user.firstname,
                  lastname: this.user.lastname,
                  username: this.user.username,
                  password: this.user.password,
                  email: this.user.email,
                  birthdate: this.user.birthdate,
                  gendar: this.user.gendar,
                  profile_img: this.user.profile_img,
                }

                // console.log(data);
                

                this.$store.dispatch('register', data)
                  .then((res) => {
                    // console.log(res);
                    const response = res.data;

                      this.$message({
                        message: "Register successfully, Welcome to Me",
                        type: 'success',
                        position: 'top-right'
                      })

                      this.$router.push('home')
                  } )
                  .catch((err) => {
                    
                    this.$message({
                        message: err,
                        type: 'error',
                        showClose: true,
                        position: 'top-right',
                        duration: 5000
                      })
                  })
            }
        }
    };
</script>

<style>
label[for=username] , label[for=password]{
  cursor: text;
}
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: .75rem;
}
.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}
.form-label-group>input,
.form-label-group>label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}
</style>