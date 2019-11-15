<template>
  <div id="app" class="container">
    
      <img alt="Vue logo" src="./assets/logo.png">

      <div v-if="isLoggedIn">
        {{ appName }}
        isLoggedIn : {{ isLoggedIn }}
        <h5 v-if="isLoggedIn">Logged In with : {{ Auth.fullname }} </h5>
        
        <button  v-on:click="logout" class="btn btn-sm btn-warning">logout</button>
      </div>

      <div v-if="isLoggedIn">
          <router-link class="btn btn-outline-primary" to="/home">
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
import api from "./http-common";
import axios from "axios";
import { mapGetters , mapState , mapActions } from 'vuex'

export default {
  name: 'app',
  // components: {
  //   HelloWorld
  // }
  data () {
      return {
          current_route: this.$router.currentRoute,
      }
  },
  methods: {
    logout(){
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  },
  computed: {
    ...mapGetters({
      fullName: 'name/fullName'
    }),
    ...mapState({
      currentCounter: store => store.counter.currentCounter
    }),
    ...mapActions({
      increaseCounter: 'counter/increaseCounter'
    }),
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    Auth: function() {
      return this.$store.getters.Auth;
    },
    appName() {
      return this.$store.getters.appTitle
    }
  },
  beforeCreate() {
    //console.log('beforeCreate (App): Nothing gets called before me!')
  },
  created: function () {
      api.interceptors.response.use(function (response) {
        return response
      }, function (err) {
        console.log(err);
        return err
      });
  },
  beforeMount() {
    // console.log(`tbeforeMount (App): his.$el doesn't exist yet, but it will soon!`)
  },
  mounted() {
    //console.log('mounted (App): ') // I'm text inside the component.
  }
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
