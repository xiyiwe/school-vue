import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login"
import AdminMain from "../views/AdminMain"
import AddStudent from "../components/student/AddStudent";
import SelectAllStudent from "../views/admin/SelectAllStudent";
import UpdateStudent from "../components/student/UpdateStudent";
import StudentMain from "../views/StudentMain";
import ElectCourseStudent from "../views/student/ElectCourse-student"
import ElectedCourseStudent from "../views/student/ElectedCourse-student"
import TeacherMain from "../views/TeacherMain";
import OpeningCourseTeacher from "../views/teacher/OpeningCourse-teacher"
import OpeningCourse from "../components/teacher/OpeningCourse"
import ElectingCourseTeacher from "../views/teacher/ElectingCourse-teacher"
import SelectAllTeacher from "../views/admin/SelectAllTeacher"
import AddTeacher from "../components/teacher/AddTeacher";
import UpdateTeacher from "../components/teacher/UpdateTeacher";
import AddCourse from "../components/course/AddCourse";
import UpdateCourse from "../components/course/UpdateCourse";
import SelectAllCourse from "../views/admin/SelectAllCourse";
import UpdateStudentScore from "../views/teacher/UpdateStudentScore";
import EditCurrentTerm from "../views/admin/EditCurrentTerm";
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  //学生页面
  {
    path: '/studentMain',
    name: 'studentMain',
    component: StudentMain,
    children: [
      {
        path: '/electStudent-student',
        name: 'electCourseStudent',
        component: ElectCourseStudent
      },
      {
        path: '/electedCourseStudent',
        name: 'electedCourseStudent',
        component: ElectedCourseStudent,
      },
    ],
    meta: { requiresAuth: true }
  },
  //教师页面
  {
    path: '/teacherMain',
    name: 'teacherMain',
    component: TeacherMain,
    meta: {requiresAuth: true},
    children: [
      {
        path: '/openingCourseTeacher',
        name: 'openingCourseTeacher',
        component: OpeningCourseTeacher,
        children: [
          {
            path: '/openingCourse',
            name: 'openingCourse',
            component: OpeningCourse,
          }
          ]
        },
      {
        path: '/electingCourseTeacher',
        name: 'electingCourseTeacher',
        component: ElectingCourseTeacher
      },
      {
        path: '/updateStudentScore',
        name:'updateStudentScore',
        component: UpdateStudentScore
      }

    ]
  },
  //管理员页面
  {
    path: '/adminMain',
    name: 'adminMain',
    component: AdminMain,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/editCurrentTerm',
        name: 'editCurrentTerm',
        component: EditCurrentTerm
      }
      ,
      {
        path: '/selectAllCourse',
        name: 'selectAllCourse',
        component: SelectAllCourse,
        children: [
          {
            path: '/addCourse',
            name: 'addCourse',
            component: AddCourse
          },
          {
            path: '/updateCourse',
            name: 'updateCourse',
            component: UpdateCourse
          }
        ]
      },
      {
        path: '/selectAllTeacher',
        name: 'selectAllTeacher',
        component: SelectAllTeacher,
        children: [
          {
            path: '/addTeacher',
            name: 'addTeacher',
            component: AddTeacher
          },
          {
            path: '/updateTeacher',
            name: 'updateTeacher',
            component: UpdateTeacher
          }
        ]
      },
      {
        path: '/selectAllStudent',
        name: 'selectAllStudent',
        component: SelectAllStudent,
        children: [
          {
            path: '/addStudent',
            name: 'addStudent',
            component: AddStudent
          },
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


