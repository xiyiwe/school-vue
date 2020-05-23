<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="工号" prop="workno">
      <el-input v-model="ruleForm.workno"></el-input>
    </el-form-item>

    <el-form-item label="教师姓名" prop="name">
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

    <el-form-item label="职位" prop="education">
      <el-input v-model="ruleForm.education"></el-input>
    </el-form-item>

    <el-form-item label="薪资" prop="basicSalary">
      <el-input v-model="ruleForm.basicSalary"></el-input>
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
    name: "AddTeacher",
    data() {

      let dOptions = [];
      return {
        dOptions,
        value: '',
        ruleForm: {
          workno: '',
          name: '',
          gender: '',
          birthday:'',
          education:'',
          basicSalary:'',
          dno:'',
          },

        rules: {
          workno: [
            { required: true, message: '工号不能为空', trigger: 'blur' }
          ],
          name:[
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          gender:[
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          birthday: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          education: [
            { required: true, message: '职位不能为空', trigger: 'blur' }
          ],
          basicSalary: [
            { required: true, message: '薪资不能为空', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        const _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('http://localhost:8001/teacher/crud/create',this.ruleForm).then(function(resp){
              if(resp.data === 'success'){
                _this.$alert(_this.ruleForm.name+' 添加成功！', '消息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$router.push('/selectAllTeacher')
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
      const _this=this
      this.axios.get('http://localhost:8001/department/selectDepartmentAllName').then(function(resp){
        _this.dOptions = resp.data

    })
  }
  }
</script>

