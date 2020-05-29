<template>

    <el-form  style="width: 60%" :model="openingData" :rules="rules"  ref="form" label-width="100px" class="demo-ruleForm">

      <el-form-item  label="课程号" prop="cno">
        <el-input :disabled="true" v-model="courseData.cno"></el-input>
      </el-form-item>

      <el-form-item label="课程名" prop="name">
        <el-input :disabled="true" v-model="courseData.name"></el-input>
      </el-form-item>


      <el-form-item label="学期" prop="term">
        <el-input v-model="openingData.term"  :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="上课时间"  prop="time">
        <el-input placeholder="例：星期四1-2" v-model="openingData.time"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </el-form-item>
    </el-form>

</template>

<script>
  export default {
    name: "OpeningCourse",
    data() {
      return {
        courseData:[],
        openingData:{
          cno: '',
          workno: sessionStorage.getItem("currentUser"),
          term: '',
          time: ''
        },
        rules:{
          term: [{ required: true, message: '学期不能为空', trigger: 'blur' }],
          time: [{ required: true, message: '上课时间不能为空', trigger: 'blur' }],

        }
      }
    },
    methods: {
      submitForm(form) {
        const _this = this
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.axios.post('/teacher/opening/add',this.openingData).then(function(resp){
              if(resp.data === 'success'){
                _this.$alert('开课成功！', '消息', {
                  confirmButtonText: '确定'
                  ,
                  callback: action => {
                    _this.$router.push('/openingCourse')
                    // window.location.reload()
                  }
                })
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },

    created() {
      this.courseData=this.$route.query.courseData
      this.openingData.cno=this.courseData.cno
      this.openingData.term=localStorage.getItem("currentTerm")
    },

}
</script>
