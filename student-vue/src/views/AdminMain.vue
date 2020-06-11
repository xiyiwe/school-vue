<template>
  <el-container style="height: 1000px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title">学生管理</template>
<!--            <el-menu-item index="/addStudent">增加学生</el-menu-item>-->
            <el-menu-item index="/selectAllStudent">学生管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">教师管理</template>
          <el-menu-item index="/selectAllTeacher">教师管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">课程管理</template>
          <el-menu-item index="/selectAllCourse">课程管理</el-menu-item>
          <el-menu-item index="/editCurrentTerm">修改当前学期</el-menu-item>
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
        <span>管理员：{{user}}</span>
      </el-header>

      <el-main>
       <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
    export default {
        name: "AdminMain",
        user: '',methods:{
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
        if(sessionStorage.getItem("authority")!=="admin")
        {
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
