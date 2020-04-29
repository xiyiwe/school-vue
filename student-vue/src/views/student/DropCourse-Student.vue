<template>
  <div>
    <el-table :data="selectedCourse">
      <el-table-column  prop="sno" label="学号" width="140">
      </el-table-column>
      <el-table-column prop="term" label="学期" width="120">
      </el-table-column>
      <el-table-column prop="cno" label="课程号">
      </el-table-column>
      <el-table-column  prop="workno" label="教室工号">
      </el-table-column>
      <el-table-column prop="dailyScore" label="平时成绩">
      </el-table-column>
      <el-table-column prop="testScore" label="考试成绩">
      </el-table-column>
      <el-table-column prop="finalScore" label="总评">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button @click="editStudent(scope.row)" type="text" size="small">退课</el-button>

        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
    export default {
        name: "DropCourse-Student"
    }
</script>

<style scoped>

</style>
