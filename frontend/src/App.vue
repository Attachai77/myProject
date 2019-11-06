<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">

    <nav>
        <router-link class="btn btn-primary" to="/">Home</router-link><br>
        <router-link class="btn btn-primary" to="/users">user list</router-link><br>
        <router-link class="btn btn-primary" to="/users/create">create user</router-link><br>
        <router-link class="btn btn-primary" to="/users/view/1">view user</router-link><br>
        <router-link class="btn btn-primary" to="/users/edit">edit user</router-link><br>
    </nav>

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
</style>
