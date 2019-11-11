<template>
  <div id="app" class="container">

    <div v-if="loggedIn">
      Login : {{ user_fullname }} 
      <button v-on:click="logout" class="btn btn-sm btn-warning">logout</button>
    </div>

    <div v-if="!loggedIn">
      <router-link to="/login" class="btn btn-sm btn-info">login</router-link>
    </div>

    <img alt="Vue logo" src="./assets/logo.png">

    <div>
        <router-link class="btn btn-outline-primary" to="/">
          <i class="fa fa-home"></i> Home
        </router-link>
        <router-link class="btn btn-outline-secondary" to="/users">
          <vue-fontawesome icon="users" size="1" color="red"></vue-fontawesome> user list
        </router-link>
        <router-link class="btn btn-outline-success" to="/users/create">
          <vue-fontawesome icon="plus"></vue-fontawesome> create user
        </router-link>
        <router-link class="btn btn-outline-danger" to="/validateDemo">Validate Demo</router-link>
    </div><br>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <router-view></router-view>
    
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  // components: {
  //   HelloWorld
  // }ม
  data () {
      return {
          user_fullname: 'The superheros',
          loggedIn: localStorage.getItem('token') != null,
      }
  },
  methods: {
    logout(){
      localStorage.clear(); 
      alert("Logout success")
      this.$router.push('login')
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.col-form-label{
  text-align: right;
  font-weight: bold;
}
</style>
