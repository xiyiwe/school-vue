<template>
  <el-container style="height: 1000px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title">学生管理</template>
            <el-menu-item index="/addStudent">增加学生</el-menu-item>
            <el-menu-item index="/selectAllStudent">学生管理</el-menu-item>
            <el-menu-item index="1-3">学生选课</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
<!--            <el-dropdown-item>新增</el-dropdown-item>-->
<!--            <el-dropdown-item>删除</el-dropdown-item>-->
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
          this.axios.get('http://localhost:8001/logout').then(function (resp) {
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
