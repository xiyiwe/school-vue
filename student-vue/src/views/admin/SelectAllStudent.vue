<template>
  <div>
    <el-table :data="pageData">
      <el-table-column  prop="sno" label="学号" width="140">
      </el-table-column>
      <el-table-column prop="name" label="学生姓名" width="120">
      </el-table-column>
      <el-table-column prop="gender" label="性别">
      </el-table-column>
      <el-table-column prop="birthday" label="生日">
      </el-table-column>
      <el-table-column prop="birthplace" label="出生地点">
      </el-table-column>
      <el-table-column prop="phoneNumber" label="电话">
      </el-table-column>
      <el-table-column prop="dname" label="院系">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100"
        >
        <template slot-scope="scope">
          <el-button @click="editStudent(scope.row)" type="text" size="small">修改</el-button>

          <el-button @click="deleteStudent(scope.row)" type="text" size="small">删除</el-button>
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
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="pageTotal"
      @current-change="page"
    >
    </el-pagination>
  </div>
</template>
<script >
    export default {
        name: "SelectAllStudent",
      methods: {
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        /*dialogClose(){
          this.$router.push({
            path: '/updateStudent',
            query:{
              student: ''
            }
          })
        },*/

        deleteStudent(row){
          this.studentData.sno=row.sno
          const _this = this
          this.axios.post('http://localhost:8001/student/crud/delete',this.studentData).then(function(resp){
            _this.$alert('《'+row.name+'》删除成功！', '消息', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.reload()
              }
            })
          })
        },
        editStudent(row) {
          this.updateDialog = true
          this.$router.push({
            path: '/updateStudent',
            query:{
              student: row
            /*  updateDialog: true*/
            }
          })
        },
        page(currentPage) {
          const _this = this
          this.axios.get('http://localhost:8001/student/query/'+currentPage).then(
            function (resp) {
              console.log(resp)
              _this.pageData=resp.data.records
              _this.pageTotal=resp.data.total
              _this.pageSize = resp.data.size
/*              for(var i=0; i<_this.pageData.length;i++){
                _this.pageData[i]['dName'] = _this.department[_this.pageData[i].dno].name
              }*/
            }
          )
        },

      },
      data() {
        let  pageTotal = 100;
        let  pageData =[] ;
        let  pageSize = 10 ;
        let  department ;
        return {
          updateDialog: false,
          pageData,
          pageTotal,
          pageSize,
          department,
          studentData: {
            sno: '',
            name: '',
            gender: '',
            birthday:'',
            birthplace:'',
            phoneNumber:'',
            dno:'',
          }
        }
      },
      created(){
        const _this = this
        this.axios.get('http://localhost:8001/student/query/1').then(function(resp) {
          console.log(resp)
          _this.pageData = resp.data.records
          _this.pageTotal = resp.data.total
          _this.pageSize = resp.data.size
  /*        for(var i=0; i<_this.pageData.length;i++){
            _this.pageData[i]['dName'] = _this.department[_this.pageData[i].dno].name
          }*/

        })
          this.axios.get('http://localhost:8001/department/selectDepartmentAllNameMap').then(function(resp){
          _this.department = resp.data
        })
        _this.updateDialog = false

        /*this.$router.push({
          path: '/updateStudent',
          query:{
            updateDialog: false
          }
        })*/

      }
    }
</script>

<style scoped>

</style>

