<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <Login /> -->
    <div>
        <router-link  to="/login" class="btn btn-sm btn-outline-info">login</router-link>
        <router-link  to="/register" class="btn btn-sm btn-outline-warning">regiter</router-link>
    </div>
  </div>
</template>

<script>

// import Login from './Auth/login'

export default {
  name: 'welcome',
//   components: {
//     Login
//   },
  data() {
      return {
          msg: 'Welcome'
      }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>