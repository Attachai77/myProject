import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuelidate from 'vuelidate'
import Message from 'vue-m-message'

import Axios from "axios";

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
//import material-icon scss
import "font-awesome/css/font-awesome.min.css";

Vue.config.productionTip = false
Vue.config.devtools = false;

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) Vue.prototype.$http.defaults.headers.common['Authorization'] = token

Vue.use(Vuelidate)
Vue.use(Message)

//defined as global component
Vue.component('VueFontawesome', require('vue-fontawesome-icon/src/components/VueFontawesome.vue').default);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')



// Vue.config.errorHandler = function(err, vm, info) {
//   console.log(`Error: ${err.toString()}\nInfo: ${info}`);
// }
