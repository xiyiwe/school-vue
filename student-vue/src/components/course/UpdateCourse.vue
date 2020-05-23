<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="课号" prop="cno">
      <el-input type='number' v-model="ruleForm.cno"></el-input>
    </el-form-item>

    <el-form-item label="课程名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>


    <el-form-item label="学分" prop="credit">
      <el-input type='number' v-model="ruleForm.credit"></el-input>
    </el-form-item>

    <el-form-item label="学时" prop="period">
      <el-input type='number' v-model="ruleForm.period"></el-input>
    </el-form-item>

    <el-form-item label="院系" >
      <el-select  v-model="ruleForm.dno" clearable placeholder="请选择">
        <el-option
          v-for="item in dOptions"
          :key="item.dno"
          :label="item.name"
          :value="item.dno">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
  export default {
    name: "UpdateCourse",
    data() {
      let dOptions = [];
      return {
        dOptions,
        value: '',
        ruleForm: {
          cno: '',
          name: '',
          credit: '',
          period:'',
          dno:'',
        },

        rules: {
          cno: [
            { required: true, message: '学号不能为空', trigger: 'blur' }
          ],
          name:[
            { required: true, message: '课程名不能为空', trigger: 'blur' }
          ],
          credit:[
            { required: true, message: '学分不能为空', trigger: 'change' }
          ],
          period: [
            { required: true, message: '学时不能为空', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('http://localhost:8001/course/crud/update',this.ruleForm).then(function(resp){
              if(resp.data === 'success'){
                _this.$alert(_this.ruleForm.name+' 修改成功！', '消息', {
                  confirmButtonText: '确定'
                  ,
                  callback: action => {
                    _this.$router.push('/selectAllCourse')
                    window.location.reload()
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
      this.ruleForm=this.$route.query.student

      const _this=this
      this.axios.get('http://localhost:8001/department/selectDepartmentAllName').then(function(resp){

        _this.dOptions = resp.data
      })
    },

  }
</script>

