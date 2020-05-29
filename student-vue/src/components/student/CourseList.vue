<template>
  <h2>123</h2>
<!--
    <el-table :data="courseData">
      <el-table-column  prop="workno" label="工号" width="140" index="1">
      </el-table-column>

    </el-table>
-->

</template>

<script>
    export default {
        name: "CourseList",
    /*  data(){
          let courseData = [];
        return{
          courseData
        }
      },
      created(){
        const _this = this
        this.axios.get('/student/schedule/'+sessionStorage.getItem("currentUser")).then(function(resp) {
          console.log(resp)
          _this.courseData = resp.data

        })
      }*/
    }
</script>

<style scoped>

</style>
