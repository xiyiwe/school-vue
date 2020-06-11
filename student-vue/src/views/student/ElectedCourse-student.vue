<template>
  <div>
    <el-form style="width: 60%"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="学期: " >
        <el-select  v-model="selectedTerm" default-first-option>
          <el-option @click.native="queryElected()"
            v-for="item in termList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
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
        <el-table-column prop="daily_score" label="平时成绩">
        </el-table-column>
        <el-table-column prop="test_score" label="测试成绩">
        </el-table-column>
        <el-table-column prop="final_score" label="最终成绩">
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
    <h1>课程表</h1>
    <div>
      <el-table :data="courseList" :span-method="objectSpanMethod" border stripe>
        <el-table-column  type="index" label="时间" width="80" align="center">
        </el-table-column>
        <el-table-column  prop="一" label="星期一" align="center">
        </el-table-column>
        <el-table-column prop="二" label="星期二" align="center">
        </el-table-column>
        <el-table-column prop="三" label="星期三" align="center">
        </el-table-column>
        <el-table-column prop="四" label="星期四" align="center">
        </el-table-column>
        <el-table-column prop="五" label="星期五" align="center">
        </el-table-column>
      </el-table>
    </div>


  </div>

</template>

<script>

  import CourseList from "../../components/student/CourseList";

  export default {
    name: "ElectedCourseStudent",
    data(){
      var courseData = [];
      var resultCourseData = [];
      return {
        courseData,
        resultCourseData,
        courseList:[],
        schedulePadding: [-1, -1, -1, -1, -1],
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
        errorMessage : '',
        termList: ['2012-2013冬季', '2012-2013秋季'],
        selectedTerm: ''
      }
    },
    methods:{
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex + columnIndex === 0) {
          this.schedulePadding = [-1, -1, -1, -1, -1];
        }
        columnIndex --;
        let week = this.week[columnIndex];
        if (rowIndex < this.schedulePadding[columnIndex]) { return [0, 0]; }
        if (columnIndex === -1 || rowIndex === 7) { return; }
        if (this.courseList[rowIndex][week].length===0) { return; }
        let count = 1;
        while (this.courseList[rowIndex][week] === this.courseList[rowIndex+count][week]) {
          count ++;
          if (rowIndex+count > 7) {break;}
        }
        this.schedulePadding[columnIndex] = rowIndex + count;
        // console.log("this.schedulePadding[columnIndex]  " + this.schedulePadding[columnIndex]);
        if (count > 1) {
          // console.log({rowspan: count, colspan: 1});
          return [count, 1];
        }
      },
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
          this.axios.post('/student/removeElected', _this.rowCourseDate).then(function (resp) {
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
      },
      queryElected(){
        const _this = this
        const url_suffix = sessionStorage.getItem("currentUser") + '/' + this.selectedTerm
        this.axios.get(  '/student/elected/' + url_suffix)
          .then(function (resp) {
          _this.courseData = resp.data
          _this.resultCourseData = resp.data
        })
        _this.updateDialog = false
        this.axios.get(  '/student/schedule/' + url_suffix).then(function (resp) {
          _this.courseList = resp.data
        })
      }
    },
    created() {
      const _this = this
      this.selectedTerm = this.termList[0]
      const url_prefix = '/student'
      const url_suffix = sessionStorage.getItem("currentUser") + '/' + this.selectedTerm
      this.axios.get(url_prefix + '/elected/' + url_suffix).then(function (resp) {
        _this.courseData = resp.data
        _this.resultCourseData = resp.data
      })
      _this.updateDialog = false
      this.axios.get(url_prefix + '/schedule/' + url_suffix).then(function (resp) {
        _this.courseList = resp.data
      })
    }

  }
</script>

<style scoped>

</style>
