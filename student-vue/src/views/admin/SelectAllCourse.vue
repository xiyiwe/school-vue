<template>
  <div>
    <el-button @click="addCourse()" >新增</el-button>
    <el-table :data="courseList">
      <el-table-column  prop="cno" label="课号" width="140">
      </el-table-column>
      <el-table-column prop="name" label="教师姓名" width="120">
      </el-table-column>
      <el-table-column prop="credit" label="学分">
      </el-table-column>
      <el-table-column prop="period" label="学时">
      </el-table-column>
      <el-table-column prop="dname" label="院系">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button @click="editCourse(scope.row)" type="text" size="small">修改</el-button>

          <el-button @click="deleteCourse(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改页面"
      :visible.sync="updateDialog"
      width="60%"

      v-if='updateDialog'
      :destroy-on-close="true"
    >
      <router-view></router-view>
      <span slot="footer" class="dialog-footer">
    <el-button @click="updateDialog = false">取 消</el-button>
        <!--<el-button type="primary" @click="updateDialog = false">确 定</el-button>-->
  </span>
    </el-dialog>
    <el-dialog
      title="新增"
      :visible.sync="addDialog"
      width="60%"
      v-if='addDialog'
      :destroy-on-close="true">
      <router-view></router-view>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script >
  export default {
    name: "SelectAllCourse",
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      deleteCourse(row){
        this.courseData.cno=row.cno
        const _this = this
        this.axios.post('/course/crud/delete',this.courseData).then(function(resp){
          _this.$alert('《'+row.name+'》删除成功！', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload()
            }
          })
        })
      },
      editCourse(row) {
        this.updateDialog = true
        this.$router.push({
          path: '/updateCourse',
          query:{
            student: row
            /*  updateDialog: true*/
          }
        })
      },

      addCourse() {
        this.addDialog = true,
          this.$router.push({path: '/addCourse'})
      },
    },
    data() {
      let  department ;
      return {
        updateDialog: false,
        addDialog: false,
        courseList:[],
        department,
        courseData: {
          cno: '',
          name: '',
          credit: '',
          period:'',
          dno:'',
        }
      }
    },
    created(){
      const _this = this
      this.axios.get('/searchByCourseName/all').then(function(resp) {
        console.log(resp)
        _this.courseList = resp.data

      })
      this.axios.get('/department/selectDepartmentAllNameMap').then(function(resp){
        _this.department = resp.data
      })
      _this.updateDialog = false
    }
  }
</script>

<style scoped>

</style>

