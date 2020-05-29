<template>
 <!-- <el-dialog
    title="修改页面"
    :visible.sync="updateDialog"
    width="60%"
    @close="resetForm('ruleForm')"
    v-if='updateDialog'
    :destroy-on-close="true"
  >-->
    <el-form  style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item  label="学号" prop="sno">
        <el-input :disabled="true" v-model="ruleForm.sno"></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="生日" required>
        <el-col :span="11">
          <el-form-item prop="birthday">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="出生地点" prop="birthplace">
        <el-input v-model="ruleForm.birthplace"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber"></el-input>
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
      </el-form-item>
    </el-form>




</template>

<script>
  export default {
    name: "UpdateStudent",
    data() {
      let dOptions = [];
      return {
        dOptions,
        value: '',
        ruleForm: {
          sno: '',
          name: '',
          gender: '',
          birthday:'',
          birthplace:'',
          phoneNumber:'',
          dno:'',
          dName:''
        },
        rules: {
          sno: [
            { required: true, message: '学号不能为空', trigger: 'blur' }
          ],
          name:[
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          gender:[
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          birthday: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          birthplace: [
            { required: true, message: '出生地不能为空', trigger: 'blur' }
          ],
          phoneNumber: [
            { required: true, message: '手机不能为空', trigger: 'blur' },
            {min: 11,max: 11,message: '手机号长度为11'}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('/student/crud/update',this.ruleForm).then(function(resp){
              if(resp.data === 'success'){
                _this.$alert(_this.ruleForm.name+' 修改成功！', '消息', {
                  confirmButtonText: '确定'
                  ,
                  callback: action => {
                    _this.$router.push('/selectAllStudent')
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
/*  updated() {
    this.ruleForm=this.$route.query.student
    this.updateDialog=this.$route.query.updateDialog
    console.log(this.updateDialog)
    console.log(1)
  },*/
    created() {
      this.ruleForm=this.$route.query.student

      const _this=this
      this.axios.get('/department/selectDepartmentAllName').then(function(resp){

          _this.dOptions = resp.data
    })
    },

}
</script>

