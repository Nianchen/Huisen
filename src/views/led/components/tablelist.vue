<template>
  <div class="tablelist">
    <div class="tablelist-body">
      
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: "TableList",
  data() {
    return {
      formMalfunction: {
        area: '',
        group: ''
      },
      tableData: [],
     
    }
  },
  methods: {
    onSubmit() {
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/poleIndex.scss";
.tablelist {
  width: 111.5%;
  height: calc(100% - 14.8vh);
  color: white;
  display: flex;
  position: relative;

  .tablelist >.el-table tr {
    background: transparent;
    color: white;
  }


  .tablelist-body {
    width: 98%;
    position: relative;
    height: 79vh;
    top: -7.2vh;
    left: -4.45vw;
    margin: 11vh auto;
    padding: 40px 5px 40px 5px;
    background: no-repeat url("../../../assets/images/new_tableBG.png") center;
    background-size: 98% 99%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  
  }
}
</style>
