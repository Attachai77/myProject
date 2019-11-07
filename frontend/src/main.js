import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vuelidate from 'vuelidate'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
//import material-icon scss
import "font-awesome/css/font-awesome.min.css";

Vue.config.productionTip = false
Vue.config.devtools = false;


Vue.use(Vuelidate)
//defined as global component
Vue.component('VueFontawesome', require('vue-fontawesome-icon/src/components/VueFontawesome.vue').default);



new Vue({
    router,
    render: h => h(App)
}).$mount('#app')



// Vue.config.errorHandler = function(err, vm, info) {
//   console.log(`Error: ${err.toString()}\nInfo: ${info}`);
// }
