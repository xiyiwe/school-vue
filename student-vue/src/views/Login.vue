
<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" name="username" placeholder="请输入账号,管理员帐号:000" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" name="password" placeholder="请输入密码，管理员帐号:root" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
      <span >{{ errorMessage }}</span>
    </el-form>

  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        errorMessage: '',
        form: {
          username: '',
          password: ''
        },

        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },

        // 对话框显示和隐藏
        dialogVisible: false
      }
    },
    //设置当前学期
    created() {
      localStorage.setItem("currentTerm","2012-2013冬季")
    }
    ,
    methods: {
      onSubmit(formName) {
        const _this=this
        _this.errorMessage=""
        // 为表单绑定验证功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios(
              {
                url: '/login',
                method: 'post',
                data: {
                  username: _this.form.username,
                  password  :_this.form.password
                }
              }).then(function(resp){
                console.log(resp)
                if(resp.data.authority === "student"){
                  sessionStorage.setItem("authority", "student");
                  sessionStorage.setItem("currentUser", resp.data.swno);
                  _this.$router.push('/studentMain')
                }
                else if(resp.data.authority === "teacher"){
                  sessionStorage.setItem("authority", "teacher");
                  sessionStorage.setItem("currentUser", resp.data.swno);
                  _this.$router.push('/teacherMain')
                }
                else if(resp.data.authority === "admin"){
                  sessionStorage.setItem("authority", "admin");
                  sessionStorage.setItem("currentUser", resp.data.swno);
                  _this.$router.push('/adminMain')
                }
                else if(resp.data.errorMessage != null){
                  _this.errorMessage = resp.data.errorMessage
                  console.log(_this.errorMessage)
                }
              })
              }
            })
            // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
            // this.$router.push("/adminMain");
          }
          }
  }
</script>

<style lang="scss" scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
