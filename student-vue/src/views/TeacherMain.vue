<template >
  <el-container style="height: 1000px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title">开课管理</template>
          <el-menu-item index="/openingCourseTeacher">可开课程</el-menu-item>
          <el-menu-item index="/electingCourseTeacher">已开课程</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">学生管理</template>
          <el-menu-item index="/updateStudentScore">学生成绩</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
           <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
         </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>工号：{{user}}</span>
      </el-header>

      <el-main>
        <router-view ></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  export default {
    name: "TeacherMain",
    user: '',
    methods:{
      logout(){
        const _this = this
        this.axios.get('/logout').then(function (resp) {
          sessionStorage.setItem("authority", "")
          sessionStorage.setItem("currentUser","")
          _this.$router.push('/login')
        })
      }
    },
    beforeCreate() {
      this.user = sessionStorage.getItem("currentUser")
      if (sessionStorage.getItem("authority") !== "teacher") {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
