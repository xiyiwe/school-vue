<template>
  <div>
    <el-table :data="pageData">
      <el-table-column prop="sno" label="学号" width="140">
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
      <el-table-column prop="dno" label="院系">
      </el-table-column>

<!--      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      -->
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="pageTotal"
      @current-change="page"
    >
    </el-pagination>
  </div>
</template>
<script >
    export default {
        name: "SelectAllStudent",
      methods: {
     /*   deleteBook(row){
          const _this = this
          this.axios.delete('http://localhost:8181/book/deleteById/'+row.id).then(function(resp){
            _this.$alert('《'+row.name+'》删除成功！', '消息', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.reload()
              }
            })
          })
        },
        edit(row) {
          this.$router.push({
            path: '/update',
            query:{
              id:row.id
            }
          })
        },*/
        page(currentPage) {
          const _this = this
          this.axios.get('http://localhost:8001/student/selectStudent/'+currentPage).then(
            function (resp) {
              console.log(resp)
              _this.pageData=resp.data.records
              _this.pageTotal=resp.data.total
              _this.pageSize = resp.data.size
            }
          )
        },

      },
      data() {

        let  pageTotal = 100;
        let  pageData =[] ;
        let  pageSize = 10 ;

        return {
          pageData,
          pageTotal,
          pageSize
        }
      },
      created(){
        const _this = this
        this.axios.get('http://localhost:8001/student/selectStudent/1').then(function(resp){
          console.log(resp)
          _this.pageData = resp.data.records
          _this.pageTotal=resp.data.total
          _this.pageSize = resp.data.size

        })
      }
    }
</script>

<style scoped>

</style>
