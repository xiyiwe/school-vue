<template>
  <div>
    <el-table :data="courseData">
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

<!--      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button @click="editStudent(scope.row)" type="text" size="small">修改</el-button>

          <el-button @click="deleteStudent(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "ElectCourse-teacher"
    }
</script>

<style scoped>

</style>
