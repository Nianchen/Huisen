<template>
  <div class="table-list">
    <div class="table-list-body">
      <div class="line"></div>
      <!-- <el-form :inline="true" ref="formMalfunction" :model="formMalfunction" class="demo-form-inline">
        <el-form-item label="分组">
          <el-select v-model="formMalfunction.group" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域">
          <el-select v-model="formMalfunction.area" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">检索</el-button>
          <el-button @click="resetForm('formMalfunction')">重置</el-button>
        </el-form-item>
      </el-form> -->
      <slot></slot>
<!--      <el-table-->
<!--        :data="tableData"-->
<!--        style="width: 95%">-->
<!--        <el-table-column-->
<!--          header-align="center"-->
<!--          prop="date"-->
<!--          label="设备名称">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          header-align="center"-->
<!--          prop="name"-->
<!--          label="设备ID">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          header-align="center"-->
<!--          prop="address"-->
<!--          label="通道号">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          header-align="center"-->
<!--          prop="address"-->
<!--          label="状态">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          header-align="center"-->
<!--          prop="address"-->
<!--          label="操作">-->
<!--        </el-table-column>-->
<!--      </el-table>-->
      <!--  <el-pagination
        class="table-list-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination> -->

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
      currentPage4: 1
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
.table-list {
  width: 100%;
  height: calc(100% - 14.8vh);
  color: white;
  display: flex;
  position: relative;
  left: -2%;
  .table-list-body {
    width: 94%;
    height: 81vh !important;
    margin: 4vh auto;
    padding: 40px 35px 40px 35px;
    background: no-repeat url("../../assets/images/new_tableBG.png") center;
    //background: no-repeat url("../../assets/images/camera/bg_3_4.png") center;
    background-size: 98% 99%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
