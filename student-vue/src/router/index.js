import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login"
import AdminMain from "../views/AdminMain"
import AddStudent from "../components/student/AddStudent";
import SelectAllStudent from "../views/student/SelectAllStudent";
import UpdateStudent from "../components/student/UpdateStudent";
Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/adminMain',
    name: 'adminMain',
    component: AdminMain,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/addStudent',
        name: 'addStudent',
        component: AddStudent
      },
      {
        path: '/selectAllStudent',
        name: 'selectAllStudent',
        component: SelectAllStudent,
        children: [
          {
            path: '/updateStudent',
            name: 'updateStudent',
            component: UpdateStudent
          }
        ]
      }
    ]
  }
  ]
/*// 页面刷新时，重新赋值 user
if (window.localStorage.getItem('user')) {
  store.state.user = window.localStorage.getItem('user')
}*/

const router = new Router({
  routes
})

// 在路由更新之前都去遍历路由的meta元信息, 判断有没有requiresAuth
/*router.beforeEach((to, from, next) => {
  // 如果有requiresAuth, 则开始验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果验证不通过, 则重定向到login页面
    this.$session.set("authority","student")
    console.log(this.$session.get("authority"))
    if (this.$session.get("authority").equals("student")||this.$session.get("authority").equals("teacher")||this.$session.get("authority").equals("admin")) {
      next()
    }

    else {
      next('/login')/!*{
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      }*!/
    }
  } else {
    next()
  }
})*/

export default router


/*
export default new Router({
  routes: [

{
    path: '/login',
    name: 'login',
    component: Login,
/!*   meta: { requiresAuth: true }*!/
  },
/!*    {
      path: '/',
      name: 'adminMain1',
      component: AdminMain,
    },*!/
  {
    path: '/adminMain',
    name: 'adminMain',
    component: AdminMain,
    children: [
      {
        path: '/addStudent',
        name: 'addStudent',
        component: AddStudent
      },
      {
        path: '/selectAllStudent',
        name: 'selectAllStudent',
        component: SelectAllStudent,
        children: [
          {
            path: '/updateStudent',
            name: 'updateStudent',
            component: UpdateStudent
          }
        ]
      }
    ]
  }

      ]
    })

*/
