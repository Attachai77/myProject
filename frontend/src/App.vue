<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png">

    <div>
        <router-link class="btn btn-outline-primary" to="/">Home</router-link>
        <router-link class="btn btn-outline-secondary" to="/users">user list</router-link>
        <router-link class="btn btn-outline-success" to="/users/create">create user</router-link>
        <router-link class="btn btn-outline-warning" to="/users/view/1">view user</router-link>
        <router-link class="btn btn-outline-info" to="/users/edit">edit user</router-link>
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
  // }
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
