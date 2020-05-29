<template>
  <div>
    <el-table :data="courseList">
      <el-table-column  prop="cno" label="课号" width="140">
      </el-table-column>
      <el-table-column prop="cname" label="课程名称" width="120">
      </el-table-column>
      <el-table-column prop="term" label="学期">
      </el-table-column>
      <el-table-column prop="time" label="上课时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button @click="closeCourse(scope.row)" type="text" size="small">关课</el-button>

        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
    export default {
        name: "ElectingCourseTeacher",
        data(){
          return{
            courseList: [],
            deleteOpeningData: {
              cno:0,
              workno: sessionStorage.getItem("currentUser"),
              term:'',
              time:''
            },
            openDialog: false,
/*          {
              cno: 0,
              name:'',
              credit:'',
              period:'',
              dname: ''
            }*/
          }
        },
      methods:{
        closeCourse(row) {
          this.deleteOpeningData.cno=row.cno
          this.deleteOpeningData.term=row.term
          this.deleteOpeningData.time=row.time
          const _this = this
         this.axios.post("/teacher/opening/delete",_this.deleteOpeningData).then(function (resp) {
           if(resp.data === 'success'){
             _this.$alert('删除成功！', '消息', {
               confirmButtonText: '确定'
               ,
               callback: action => {
                 _this.$router.push('/electingCourseTeacher')
                 window.location.reload()
               }
             })
           }
         })
        }
      },
      created(){
        const _this = this
        this.axios.get('/teacher/opening/'+sessionStorage.getItem("currentUser")).then(function(resp) {
          _this.courseList = resp.data
        })

      }
    }
</script>

<style scoped>

</style>
