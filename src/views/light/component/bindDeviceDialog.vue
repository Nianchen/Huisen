<template>
  <Dialog
    title="绑定设备"
    :isShowClose="false"
    @handleDialogClose="handleDialogClose"
    :DialogVisibleFlag.sync="thisbindDeviceDialog"
  >
    <div class="classifyTree">
      <TreeList></TreeList>
    </div>

    <div class="rightTable">
      <div class="search">
        <el-button class="bindeviceBtn" :disabled="multiple" type="primary" @click="handleDevice"
          >确认绑定</el-button
        >
      </div>

      <div class="tablelist">
        <el-table
          style="width: 100%"
          class="statu-body"
          :data="lampComponentList"
          :header-cell-style="{
            background: '#041F37',
            color: '#0175D4',
            fontSize: '18px',
            borderBottom: '2px solid #041F37',
          }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" type="selection"> </el-table-column>
          <el-table-column prop="name" label="灯光控制器" align="center">
          </el-table-column>
          <el-table-column prop="poleName" label="所属灯杆" align="center">
          </el-table-column>
          <!-- <el-table-column label="灯光状态" align="center" prop="openStatus">
        <template slot-scope="scope">
          <div class="brightnessStatus" v-if="scope.row.brightness>6">
            <img src="../../../assets/images/light_high.png" alt="">
            <span>{{percentage}}%</span>
          </div>
          <div class="brightnessStatus" v-if="scope.row.brightness>0&&scope.row.brightness<=6">
            <img src="../../../assets/images/light_mid.png" alt="">
            <span>{{percentage}}%</span>
          </div>
          <div class="brightnessStatus" v-if="scope.row.brightness===0">
            <img src="../../../assets/images/light_low.png" alt="">
            <span>{{percentage}}%</span>
          </div>

        </template>
      </el-table-column> -->
      <el-table-column label="设备状态" align="center" prop="deviceStatus">
        <template slot-scope="scope">
          <div class="lightStatus" v-if="scope.row.status === '1'">
           
            <img src="../../../assets/images/button/status-online.png" alt="">
            <span>在线</span>
          </div>
          <div class="lightStatus" v-if="scope.row.status === '2'">
         
            <img src="../../../assets/images/button/status-offline.png" alt="">
            <span>离线</span>
          </div>
          <div class="lightStatus" v-if="scope.row.status === '3'">
           
            <img src="../../../assets/images/button/status-fault.png" alt="">
            <span>故障</span>
          </div>

        </template>
      </el-table-column>
        </el-table>
        <div class="fenye1">
      <pagination
      popperClass="ic-pagination"
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
      />
    </div>
      </div>
    </div>

  </Dialog>
</template>
<script>
import TreeList from "@/views/light/component/TreeList";
import Dialog from "@/views/light/component/Dialog";
import {MockLightListData} from '@/utils/MockData'
import {
  listLampComponent
} from "@/api/lamp/lampComponent";
export default {
  props: {
    DialogVisibleFlag: {
      require: true,
    },
  },
  components: {
    TreeList,
    Dialog,
  },
  data() {
    return {
      title: "设备绑定",
      thisbindDeviceDialog: false,
      tableData: [
        {
          date: 1,
        },
        {
          date: 1,
        },
        {
          date: 1,
        },
      ],
      currentPage4: 1,
      lampComponentList: "",
      listData: [],
      queryParams: {},
      total: 0,
      multiple: true,
      ids: "",
      names:'',
      position: {
        percentWidth: "60%",
        vWidth: "61vw",
        topTitle: "10%",
        leftTitle: "15%",
      },
    };
  },
  created() {
    this.getList();
    this.getDicts("lamp_state").then((response) => {
      this.statusOptions = response.data;

    });
  },
    mounted () {
    let that = this
    this.$bus.$on('groupId',res=>{
      that.queryParams.groupId = res
      that.getList()
    })
  },
  watch: {
    DialogVisibleFlag() {
      this.thisbindDeviceDialog = this.DialogVisibleFlag;
    },
  },
  methods: {
    addStrategyClick() {
    },
    handleDialogClose() {
      this.$emit("update:DialogVisibleFlag", false);
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    getList() {
      this.loading = true;
    this.lampComponentList = MockLightListData()
      listLampComponent(this.queryParams).then((response) => {
        // this.lampComponentList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.names = selection.map((item) => item.name)
      this.multiple = !selection.length;
    },
    //绑定设备
    handleDevice() {
      const names = this.names;
      let that = this;
      this.$confirm('是否确认绑定灯光组件' + names + '?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        that.$emit("bindDevice", that.ids,that.names);
      });
    },
  },
};
</script>
<style lang="scss">
.classifyTree {
  position: absolute;
  left: 2vw;
  .tree-list .group-left-img {
    height: 50%;
  }
  .tree-list .group-left-img {
    margin-top: 12vh;
    width: 66%;
    left: -2%;
  }
  .custom-tree-container{
    height: 39vh;
    width: 17vw;
  }

}
.tree-list[data-v-088a4681] {
  overflow: hidden !important;
}
.rightTable {
  position: absolute;
  left: 23.5vw;

  width: 28vw;
  height: 51vh;
  top: 12.5vh;
  // border: 2px solid #055a8a;

  .search {
    position: absolute;
    // padding-left: 25vw;
    // padding-top: 2vh;
    top: 47.4vh;
    left: 22.3vw;

    .bindeviceBtn{
      background-color: transparent !important;
   
      background: no-repeat url('../../../assets/images/button/register-pole.png');
    }

    .el-select .el-input__inner {
      background-color: transparent;
    }
  }

  .tablelist {

    height: 98%;
    .el-table::before {
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0px;
    }

    margin-top: 2vh;
    background: no-repeat url("../../../assets/images/camera/bg_5.png") center;
    // .el-table__empty-block {
    //   background-color: transparent;
    // }
    .el-table{
      height: 90%;
    }
    .fenye1{
      height: 5vh;
      width:66%;
      .pagination-container{
        width:100%;
        height: 100%;
      margin-top: 0;
      right: 143px;

      .el-pagination{
        width: 60%;
        margin: auto;
      }
    }
    }


  }
}
// .fenye1 {
//   position: absolute;
//      top: 62vh;
//     left: 32vw;
// }


.dialogbox ::v-deep .el-input__inner {
  margin-left: 0vw !important;
}
.dialog ::v-deep .el-dialog {
  margin-top: 0vw;
}

.el-tag {
  background-color: transparent;
}
.task-box::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: rgba(233, 237, 241, 0.774);
  border-radius: 5px;
}
.task-box::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-color: #078ab6;
  border-radius: 5px;
  // box-shadow: inset 0 0 5px #f00;
}
.table-list .el-button {
  border: none;
}
.table-list-body ::v-deep .pagination-container .el-pagination{
  position: static;
}
::v-deep .dialog-box{
  width: 65vw !important;
  left: 8%;
}
.lightStatus {
  & > span {
    position: absolute;
    top: 23%;
    left: 44%;
    font-size: 1em;
  }
}

.brightnessStatus{
  img{
    width: 24%;
  }
  &>span{
    position:absolute;
    top: 25%;
    left: 45%;
  }
}
</style>
