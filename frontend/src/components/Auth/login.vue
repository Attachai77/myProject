<template>
    <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-4 offset-sm-4">
                    <div>
                        <h2>Login</h2>
                        <form @submit.prevent="handleSubmit">
                            <div class="form-label-group text-left">
                                <input type="text" id="username" v-model="user.username" class="form-control" :class="{ 'is-invalid': submitted && $v.user.username.$error }" placeholder="Username" autofocus="">
                                <label for="username">Username</label>
                                <div v-if="submitted && $v.user.username.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.username.required">Username is required</span>
                                </div>
                            </div>
                            <div class="form-label-group text-left">
                                <input type="text" id="password" v-model="user.password" class="form-control" :class="{ 'is-invalid': submitted && $v.user.password.$error }" placeholder="Password" >
                                <label for="password">Password</label>
                                <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.password.required">Password is required</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-lg btn-primary btn-block text-uppercase">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { required  } from "vuelidate/lib/validators";
    import api from "../../http-common";

    export default {
        name: "app",
        data() {
            return {
                user: {
                    username: "",
                    password: ""
                },
                submitted: false
            };
        },
        validations: {
            user: {
                username: { required },
                password: { required },
            }
        },
        methods: {
            handleSubmit(e) {
                this.submitted = true;

                // stop here if form is invalid
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

                const data = {
                  username: this.user.username,
                  password: this.user.password
                }
                
                api.post("/auth/login", data)
                    .then(res => {
                        console.log(res.data);
                        // this.$router.push('/users');
                        const response = res.data;
                        if (response.sucess) {

                          localStorage.setItem('user',JSON.stringify(response.user));
                          localStorage.setItem('token',response.token);

                          alert("Login success")

                          this.$emit('loggedIn')
                          if(this.$route.params.nextUrl != null){
                              this.$router.push(this.$route.params.nextUrl)
                          }
                          this.$router.push('users')

                        }else{

                          console.log("Login failed");
                          alert("Login failed")

                        }

                    })
                    .catch(e => {
                        console.log(e);
                    });
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