import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from "../views/Login"
import Main from "../views/Main"
import AddStudent from "../views/student/AddStudent";
import SelectAllStudent from "../views/student/SelectAllStudent";

Vue.use(Router)

export default new Router({
  routes: [
/*    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children:[
        {
          path:'/addStudent',
          name: 'addStudent',
          component: AddStudent
        },
        {
          path: '/selectAllStudent',
          name: 'selectAllStudent',
          component: SelectAllStudent
        }

      ]
    },



  ]
})
