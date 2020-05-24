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
    <!--<el-table-column
      fixed="right"
      label="操作"
      width="100"
    >
      <template slot-scope="scope">
        <el-button @click="electCourse(scope.row)" type="text" size="small">退课</el-button>
      </template>
    </el-table-column>-->
  </el-table>
</div>
</template>

<script>
    export default {
      name: "UpdateStudentScore",
      data() {
        return {
          scoreList: [],
          rowCourseData: {
            sno: '',
            term: '',
            cno: '',
            workno: '',
            dailyScore: 0,
            testScore: 0,
            finalScore: 0,
          },
        }
      },
      methods: {
        queryElected() {
          const _this = this
          this.axios.get('http://localhost:8001/student/elected/' + sessionStorage.getItem("currentUser") + this.selectedTerm)
            .then(function (resp) {
              _this.courseData = resp.data
              _this.resultCourseData = resp.data
            })
        }
      },
      created() {
        const _this = this
        this.selectedTerm = this.termList[0]
        this.axios.get('http://localhost:8001/student/elected/' + sessionStorage.getItem("currentUser") + this.selectedTerm)
          .then(function (resp) {
            _this.courseData = resp.data
            _this.resultCourseData = resp.data
          })
      }
    }
</script>

<style scoped>

</style>
