import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
Vue.config.devtools = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')



// Vue.config.errorHandler = function(err, vm, info) {
//   console.log(`Error: ${err.toString()}\nInfo: ${info}`);
// }
