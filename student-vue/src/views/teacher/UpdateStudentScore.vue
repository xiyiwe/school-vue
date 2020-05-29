<template>
<div>
  <h1>开课信息</h1>
  <el-table :data="openingList">
    <el-table-column  prop="cno" label="课号" width="140">
    </el-table-column>
    <el-table-column prop="cname" label="课程名称" >
    </el-table-column>
    <el-table-column prop="term" label="学期">
    </el-table-column>
    <el-table-column prop="count" label="选课人数">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="100"
    >
      <template slot-scope="scope">
        <el-button @click="queryElected(scope.row)" type="text" size="small">管理</el-button>

      </template>
    </el-table-column>
  </el-table>
  <h1>学生信息</h1>
  <el-table :data="courseData">
    <el-table-column  prop="sno" label="学号" width="140">
    </el-table-column>
    <el-table-column prop="cno" label="课程号" width="120">
    </el-table-column>
    <el-table-column prop="workno" label="工号" width="120">
    </el-table-column>
    <el-table-column prop="term" label="学期">
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
        <el-button @click="editStudent(scope.row)" type="text" size="small">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--更新窗口-->
  <el-dialog
    title="修改"
    :visible.sync="updateDialog"
    width="60%"
    v-if='updateDialog'
    :destroy-on-close="true">
<el-form>
  <el-form-item  prop="sno" label="学号" width="140">
    <el-input :disabled="true" v-model="rowCourseData.sno"></el-input>
  </el-form-item>
  <el-form-item  prop="cno" label="课程号" width="120">
    <el-input :disabled="true" v-model="rowCourseData.cno"></el-input>
  </el-form-item >
  <el-form-item  prop="workno" label="工号" width="120">
    <el-input :disabled="true" v-model="rowCourseData.workno"></el-input>
  </el-form-item >
  <el-form-item  prop="term" label="学期">
    <el-input :disabled="true" v-model="rowCourseData.term"></el-input>
  </el-form-item >
  <el-form-item  prop="daily_score" label="平时成绩">
    <el-input v-model="rowCourseData.dailyScore"></el-input>
  </el-form-item >
  <el-form-item  prop="test_score" label="测试成绩">
    <el-input v-model="rowCourseData.testScore"></el-input>
  </el-form-item>
  <el-form-item  prop="final_score" label="最终成绩">
    <el-input v-model="rowCourseData.finalScore"></el-input>
  </el-form-item>
<!--
 <span>
  最终成绩： {{rowCourseData.dailyScore*0.6+rowCourseData.testScore*0.4}}
 </span>
-->


  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
  </el-form-item>
</el-form>


    <span slot="footer" class="dialog-footer" >
        <el-button @click="updateDialog = false">取 消</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script>
    export default {
      name: "UpdateStudentScore",
      data() {
        return {
          updateDialog: false,
          selectedOpening:'',
          courseData:[],
          scoreList: [],
          openingList:[],
          rowOpeningData:{
              cno:'',
              workno:0,
              time:'',
              count:0,
              term:''
          },
          rowCourseData: {
            sno: '',
            term: '',
            cno: '',
            workno: '',
            dailyScore: 0,
            testScore: 0,
            finalScore: 0
          },
          rules: {
            dailyScore: [
              { required: true, message: '分数不能为空', trigger: 'blur' }
            ],
            testScore:[
              { required: true, message: '分数不能为空', trigger: 'blur' }
            ],
            finalScore:[
              { required: true, message: '分数不能为空', trigger: 'blur' }
            ],
          }
        }
      },
      methods: {
        editStudent(row) {
          this.updateDialog = true
          this.rowCourseData.sno=row.sno
          this.rowCourseData.workno=row.workno
          this.rowCourseData.term=row.term
          this.rowCourseData.dailyScore=row.daily_score
          this.rowCourseData.testScore=row.test_score
          this.rowCourseData.finalScore=row.final_score
          this.rowCourseData.cno=row.cno
        },
        submitForm(formName) {
          // this.rowCourseDate.finalScore=Math.round(this.rowCourseData.dailyScore*0.6+this.rowCourseData.testScore*0.4)
          // console.log(this.rowCourseDate.finalScore)
          const _this = this
              this.axios.post('/teacher/electing/update',this.rowCourseData).then(function(resp){
                if(resp.data === 'success'){
                  _this.$alert(' 修改成功！', '消息', {
                    confirmButtonText: '确定'
                    ,
                    callback: action => {
                      _this.updateDialog = false
                      const __this = _this
                      _this.axios.post('/teacher/electing',__this.rowOpeningData)
                        .then(function (resp) {
                          console.log(resp)
                          __this.courseData = resp.data
                        })
                    }
                  })
                }
              });
        },
        queryElected(row) {
          this.rowOpeningData.cno = row.cno
          this.rowOpeningData.workno = row.workno
          this.rowOpeningData.term = row.term
          this.rowOpeningData.time = row.time
          // this.rowOpeningData.count = row.count
          const _this = this
          this.axios.post('/teacher/electing',this.rowOpeningData)
            .then(function (resp) {
              console.log(resp)
              _this.courseData = resp.data
            })
        }
      },
      created() {
        const _this = this
        this.axios.get('/teacher/opening/' + sessionStorage.getItem("currentUser"))
          .then(function (resp) {
            _this.openingList = resp.data
          })
        //根据opening查一门课的学生信息
/*        this.axios.post('/teacher/electing')
          .then(function (resp) {
            console.log(resp)
            _this.courseData = resp.data
          })*/
      }
    }
</script>

<style scoped>

</style>
