<template>
  <div>
    <el-table :data="courseList">
      <el-table-column  prop="cno" label="课号" width="140">
      </el-table-column>
      <el-table-column prop="name" label="课程名称" width="120">
      </el-table-column>
      <el-table-column prop="credit" label="学分">
      </el-table-column>
      <el-table-column prop="period" label="课时">
      </el-table-column>
      <el-table-column prop="dname" label="院系">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button @click="openCourse(scope.row)" type="text" size="small">开课</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog
        title="开课页面"
        :visible.sync="openDialog"
        width="60%"
        v-if='openDialog'
        :destroy-on-close="true"
      >
        <router-view></router-view>
        <span slot="footer" class="dialog-footer">
    <el-button @click="openDialog = false">取 消</el-button>
          <!--<el-button type="primary" @click="updateDialog = false">确 定</el-button>-->
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
        name: "OpeningCourseTeacher",
        data(){
          return{
            courseList: [],
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
        openCourse(row) {
          this.openDialog = true
          this.$router.push({
            path: '/openingCourse',
            query:{
              courseData: row
              /*  updateDialog: true*/
            }
          })
        }
      },
      created(){
        const _this = this
        this.axios.get('/searchByCourseName/all').then(function(resp) {
          console.log(resp)
          _this.courseList = resp.data
        })

        _this.updateDialog = false

      }
    }
</script>

<style scoped>

</style>
