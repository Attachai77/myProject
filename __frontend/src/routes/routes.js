import Users from '../components/User.vue'
import HelloWorld from '../components/HelloWorld.vue'

const routes = [
  {
    path: '/',
    component: HelloWorld
  },
  {
    path: "/users",
    name: "users",
    component: Users
  },
]
  
  export default routes