<template>
  <div>
      <el-table :data="resultCourseData">
        <el-table-column  prop="workno" label="工号" width="140">
        </el-table-column>
        <el-table-column prop="cno" label="课程号" width="120">
        </el-table-column>
        <el-table-column prop="cname" label="课程名">
        </el-table-column>
        <el-table-column prop="tname" label="教师名">
        </el-table-column>
        <el-table-column prop="term" label="学期">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button @click="electCourse(scope.row)" type="text" size="small">退课</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>

  export default {
    name: "ElectedCourseStudent",
    data(){
      var courseData = [];
      var resultCourseData = [];
      return {
        courseData,
        resultCourseData,
        rowCourseDate: {
          sno:'',
          term:'',
          cno:'',
          workno:'',
          dailyScore:0,
          testScore:0,
          finalScore:0,
        },
        errorMessage : ''


      }
    },
    methods:{
      electCourse(row) {
        this.$confirm('是否退课', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.rowCourseDate.sno = sessionStorage.getItem("currentUser")
          this.rowCourseDate.term = row.term
          this.rowCourseDate.cno = row.cno
          this.rowCourseDate.workno = row.workno
          const _this = this
          this.axios.post('http://localhost:8001/student/electCourse', _this.rowCourseDate).then(function (resp) {
            if(resp.data==='success'){
              _this.$alert('退课成功！', '消息', {
                confirmButtonText: '确定',
                callback: action => {
                  window.location.reload()
                }
              })
            }
            else {
              _this.$alert('退课失败！', '消息', {
                confirmButtonText: '确定'
              })
            }
          })
        })
      },
      searchByCourseName(){
        /*            // 为表单绑定验证功能
                    console.log(this.searchCourseName.courseName)
        /!*            this.$refs[formName].validate((valid) => {
                      if (valid) {*!/
                        const _this = this
                        console.log(this.searchCourseName.courseName)
                        this.axios.get('http://localhost:8001/searchByCourseName/' + this.searchCourseName.courseName).then(function (resp) {
                          console.log(resp.data)
                          _this.courseData = resp.data
                        })*/
        const _this= this
        _this.resultCourseData=[]
        this.courseData.forEach(function (item,index) {
          if(item.cname.indexOf(_this.searchedCourseData)!==-1){
            _this.resultCourseData.push(item)
          }
        })
        console.log(_this.resultCourseData)
        if(_this.resultCourseData.length===0){
          _this.resultCourseData=_this.courseData
          _this.errorMessage="没有搜索结果"
        }
      }

    },
    created(){
      const _this = this
      this.axios.get('http://localhost:8001/student/elected/'+sessionStorage.getItem("currentUser")).then(function(resp) {
        console.log(resp)
        _this.courseData = resp.data
        _this.resultCourseData= resp.data

      })
      _this.updateDialog = false

    }
  }
</script>

<style scoped>

</style>
