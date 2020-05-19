<template>
  <div>
  <div>
<el-form ref="searchCourseNameForm" >
  <el-row :gutter="10">
    <el-col :span="12"><div ><el-form-item prop="courseName">
      <el-input
        type="text"
        placeholder="请输入课程名"
        suffix-icon="el-icon-search"
        v-model="searchedCourseData"
        @keyup.enter.native="searchByCourseName()"
      >
      </el-input >
    </el-form-item></div></el-col>

    <el-col :span="4"><div>
      <el-form-item>
      <el-button  type="primary" v-on:click="searchByCourseName()">搜索</el-button>
    </el-form-item></div></el-col>

    <el-col :span="8"><div ><span style="color: red">{{errorMessage}}</span></div></el-col>
  </el-row>
</el-form>
  </div>
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
      <el-table-column prop="time" label="上课时间">
      </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <el-button @click="electCourse(scope.row)" type="text" size="small">选课</el-button>
              </template>
            </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>

    export default {
        name: "ElectCourseStudent",
        data(){
          var courseData = [];
          var resultCourseData = [];
          var courseList = [];
          return {
            courseData,
            resultCourseData,
            courseList,
            termList: ['2013-2014冬季', '2013-2014秋季', '2012-2013冬季', '2012-2013秋季'],
            week: ['一', '二', '三', '四', '五'],
            rowCourseDate: {
              sno:'',
              term:'',
              cno:'',
              workno:'',
              dailyScore:0,
              testScore:0,
              finalScore:0,
            },
            searchedCourseData : '',
            errorMessage : ''
/*              searchCourseName:{
                courseName:''
              }*/

          }
        },
      methods:{
          isTimeOverlap(time) {
            console.log('courseList: ' + JSON.stringify(this.courseList))
            for (let t = time.charAt(3) - 1; t < time.charAt(5); t++) {
              console.log(this.courseList[t][time.charAt(2)].length);
              if (this.courseList[t][time.charAt(2)].length!=0) {
                return true
              }
            }
            console.log('false')
            return false
          },
          electCourse(row) {
            const _this = this
            this.$confirm('是否选课', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.rowCourseDate.sno = sessionStorage.getItem("currentUser")
              this.rowCourseDate.term = row.term
              this.rowCourseDate.cno = row.cno
              this.rowCourseDate.workno = row.workno
              if (this.isTimeOverlap(row.time)) {
                console.log('if (this.isTimeOverlap(row.time))')
                _this.$alert('课程时间冲突', '消息', {
                  confirmButtonText: '确定'
                })
                return
              }
              this.axios.post('http://localhost:8001/student/electCourse', _this.rowCourseDate).then(function (resp) {
                if(resp.data==='success'){
                  _this.$alert('选课成功！', '消息', {
                    confirmButtonText: '确定',
                    callback: action => {
                      window.location.reload()
                    }
                  })
                }
                  else {
                  _this.$alert('选课失败！', '消息', {
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
/*            })
          }*/
      },
      created(){
        const _this = this
        this.axios.get('http://localhost:8001/opening/' + this.termList[0]).then(function(resp) {
          _this.courseData = resp.data
          _this.resultCourseData= resp.data

        })
        this.selectedTerm = this.termList[0]
        const url_prefix = 'http://localhost:8001/student'
        const url_suffix = sessionStorage.getItem("currentUser") + '/' + this.selectedTerm
        this.axios.get(url_prefix + '/schedule/' + url_suffix).then(function (resp) {
          console.log(url_prefix + '/schedule/' + url_suffix)
          _this.courseList = resp.data
          console.log(resp.data)
        })
        _this.updateDialog = false

      }
    }
</script>

<style scoped>

</style>
