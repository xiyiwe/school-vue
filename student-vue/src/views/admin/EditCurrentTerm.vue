<template>
  <div>
    <span>当前学期:{{ currentTerm }}</span>
    <el-form>
      <el-form-item label="设置当前学期">
        <el-input v-model="term" placeholder="例:2013-2014冬季"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="editTerm()"  size="small">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    export default {
        name: "EditCurrentTerm",
        data(){
          return{
            term:'',
            currentTerm:''
          }
        },
      created() {
          this.currentTerm=localStorage.getItem("currentTerm")
      },
      methods:{
        editTerm(){
          localStorage.setItem("currentTerm",this.term)
          this.$alert('设置成功', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload()
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
