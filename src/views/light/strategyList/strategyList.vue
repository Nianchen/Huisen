<template>

  <div class="table-list-body">
    <!-- <el-button @click="goAddStrategy" class="add-btn" type="primary" v-hasPermi="['lamp:control:edit']">新增</el-button>
     -->
     <div class="addStrategy" @click="goAddStrategy" v-hasPermi="['lamp:control:edit']">
       <img src="../../../assets/images/button/register-pole.png" alt="">
       <span>新增策略</span>
     </div>
    <el-table
      :data="controlList"

    :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',
              }"
    >

     <el-table-column label="序号" align="center" prop="id"/>
      <el-table-column label="策略名称" align="center" prop="name"/>

      <!-- <el-table-column label="创建时间" align="center" prop="createTime"/> -->
      <el-table-column label="生效时间" align="center" prop="strategyList[0].startDate"/>
      <el-table-column label="策略状态" align="center" prop="status">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" v-if="scope.row.status==='1'">启用</el-button>
          <el-button size="mini" type="danger" v-if="scope.row.status==='2'">禁用</el-button> -->
          <div class="strategyStatus" v-if="scope.row.status==='1'">
            <img src="../../../assets/images/button/status-online.png" alt="">
            <span>启用</span>
          </div>
          <div class="strategyStatus" v-if="scope.row.status==='2'">
            <img src="../../../assets/images/button/status-offline.png" alt="">
            <span>禁用</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <img  class="operator_img" @click="goUpdateStrategy(scope.row)" v-hasPermi="['lamp:control:edit']" src="../../../assets/images/edit_icon.png" alt="">
          </el-tooltip>
           <el-tooltip v-if="scope.row.status==='2'" class="item" effect="dark" content="删除" placement="top-start">
            <img style="margin-left:5%" class="operator_img" @click="handleDelete(scope.row)" v-hasPermi="['lamp:control:edit']" src="../../../assets/images/delete_icon.png" alt="">
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination
    class="pagi"
    popperClass="ic-pagination"
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <StrategyAdd :DialogVisibleFlag.sync="addStrategyDialog"></StrategyAdd>
    <StrategyUpdate :detail="updateDetail" :DialogVisibleFlag.sync="UpdateStrategyDialog"></StrategyUpdate>
  </div>

</template>
<script>

import StrategyAdd from '@/views/light/strategyList/strategyOperation'
import StrategyUpdate from '@/views/light/strategyList/strategyOperation'
import {listControl, getControl, delControl, addControl, updateControl} from "@/api/lamp/control";

export default {

  props: {},
  components: {
    StrategyAdd,
    StrategyUpdate
  },
  data() {
    return {
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        deptId: null,
        poleId: null,
        componentId: null,
        name: null,
        mac: null,
        ip: null,
        configServerIp: null,
        configServerPort: null,
        config: null,
        status: null,

      },
      openStrategy: false,
      addStrategyDialog: false,
      detail: {},
      controlList: [],
      type: undefined,
      UpdateStrategyDialog: false,
      updateDetail: {}
    }
  },
  created() {
    this.getList();
    this.getDicts("date_type").then(response => {
      this.dateTypeOptions = response.data;
    });
    this.getDicts("strategy_type").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    goStrategyDialog(row) {
      // console.log(22222222);

      console.log(row);
      this.detail = row;
      this.openStrategy = true;

    },
    goUpdateStrategy(row) {

      console.log(row);
      this.updateDetail = row;
      this.UpdateStrategyDialog = true;
    },
    goAddStrategy() {
      this.addStrategyDialog = true
    },
    getList() {
      this.loading = true;
      listControl(this.queryParams).then(response => {
        console.log(response);
        this.controlList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    //删除策略
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除路灯控制策略编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delControl(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },

  }
}
</script>
<style lang="scss" scoped>
.add-btn {
  // position: absolute;
  margin-left: -90%;
}

// .table-list-body ::v-deep .pagination-container .el-pagination {
//   position: static;
// }
.el-table{
  top: 2.5vh;
  width: 93% !important;
  height: 100% !important;
}

.addStrategy{
  position: relative;
  top:3%;
  left:-39%;
  cursor: pointer;
  &>img{
    position: relative;
    // width: 72%;
    width: 78%;
    height: 100%;
  }
  &>span{
    position: absolute;
    top: 20%;
    left: 10%;
    font-size: 1.3em;
  }
}
.pagination-container{
  height: 51px;
  left: 63vh;
  top: 1vw;
  z-index: 111;

}

.strategyStatus {
  & > span {
    position: absolute;
    top: 25%;
    left: 45%;
    font-size: 1em;
  }
}
.operator_img{
  width: 10%;
  cursor: pointer;
}
.pagi{
  position: relative;
  top: 0%;
  left: 42%;
}
</style>
