<template>
  <Dialog title="分组管理" :position="position" :isShowClose="false" @handleDialogClose="handleDialogClose"
    :DialogVisibleFlag.sync="thisbindDeviceDialog">
    <div class="Tree-box">
      <TreeList1 v-if="componentType === '1'" :deptNone="1"></TreeList1>
      <TreeList2 v-if="componentType === '2'" :deptNone="1"></TreeList2>
      <TreeList4 v-if="componentType === '4'" :deptNone="1"></TreeList4>
      <TreeList5 v-if="componentType === '5'" :deptNone="1"></TreeList5>
      <TreeList3 title="分组管理"  v-if="componentType === '3'" :deptNone="1"></TreeList3>
    </div>

    <div class="rightTable1">
      <div class="search">
        <!-- <el-select filterable> 
          <el-option value="1"> </el-option>
        </el-select> -->
        <div class="label">当前分组设备</div>
        <el-button :disabled="multipleOff" type="primary" @click="handleDevice('off')" size="mini">确认移出</el-button>
      </div>

      <div class="tablelist">
        <el-table style="width: 100%" class="statu-body" :data="lampComponentList" :header-cell-style="{
            background: '#041F37',
            color: '#0175D4',
            fontSize: '18px',
            borderBottom: '2px solid #041F37',
          }" @selection-change="handleSelectionChangeLeft">
          <el-table-column align="center" type="selection"> </el-table-column>
          <el-table-column v-if="componentType==='4'" prop="componentName" label="设备名称" align="center">
          </el-table-column>
          <el-table-column v-else-if="componentType==='5'" prop="broadcastName" label="设备名称" align="center">
          </el-table-column>
          <el-table-column v-else prop="name" label="设备名称" align="center">
          </el-table-column>
          <el-table-column  prop="poleName" label="所属灯杆" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleOff(scope.row)" size="mini" round :style="{
                  'background-color': '#1a8cf5',
                  border: '1px solid #1a8cf5',
                }">移出</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="fenye1"></div> -->
      </div>
    </div>
    <div class="rightTable1 rightTable2">
      <div class="search right_search">
        <el-input v-model="allQueryParams.name" @change="getAllList" placeholder="请输入灯光名称"></el-input>
        <!-- <el-select filterable>
          <el-option value="1"> </el-option>
        </el-select> -->
        <el-button class="searchBtn" @click="getAllList" size="mini">检索</el-button>
        <el-button :disabled="multipleOn" type="primary" @click="handleDevice('on')" size="mini" class="querenyiru-btn">确认移入</el-button>
      </div>

      <div class="tablelist">
        <el-table style="width: 100%" class="statu-body" :data="allLampList" :header-cell-style="{
            background: '#041F37',
            color: '#0175D4',
            fontSize: '18px',
            borderBottom: '2px solid #041F37',
          }" @selection-change="handleSelectionChangeRight">
          <el-table-column align="center" type="selection"> </el-table-column>
          <el-table-column v-if="componentType==='4'" prop="componentName" label="设备名称" align="center">
          </el-table-column>
          <el-table-column v-else-if="componentType==='5'" prop="broadcastName" label="设备名称" align="center">
          </el-table-column>
          <el-table-column v-else prop="name" label="设备名称" align="center">
          </el-table-column>
          <el-table-column prop="poleName" label="所属灯杆" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleOn(scope.row)" size="mini" round :style="{
                  'background-color': '#1a8cf5',
                  border: '1px solid #1a8cf5',
                }">移入</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="fenye1">
          <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getAllList" class="fenzu-pagination" />
        </div>
      </div>
    </div>
  </Dialog>
</template>
<script>
import TreeList1 from "@/views/light/component/TreeList";
import TreeList2 from "@/views/atmosphere/component/TreeList";
import TreeList4 from "@/views/led/components/TreeList";
import TreeList5 from "@/views/broadcast/components/TreeList";
import TreeList3 from "@/views/camera/components/TreeList";
import Dialog from "@/views/light/component/Dialog";
import {
  listLampComponent,
  fliterLampComponent,
} from "@/api/lamp/lampComponent";
import { moveInLampGroup, moveOutLampGroup } from "@/api/lamp/lampGroup";
import {
  listWeatherComponent,
  fliterWeatherComponent,
} from "@/api/weather/weatherComponent";
import {
  moveInWeatherGroup,
  moveOutWeatherGroup,
} from "@/api/weather/weatherGroup";
import {
  getLedList,
  fliterLedComponent,
  moveInLedGroup,
  moveOutLedGroup,
} from "@/api/led/ledApi";
import {
  getBCListData,
  fliterBroadcastComponent,
  moveInBroadcastGroup,
  moveOutBroadcastGroup,
} from "@/api/broadcast/broadcastApi";
import { listComponent, fliterListComponent } from "@/api/camera/component";
import {
  cameraAllList,
  moveInCameraGroup,
  moveOutCameraGroup,
} from "@/api/camera/group";
export default {
  props: {
    DialogVisibleFlag: {
      require: true,
    },
    componentType: {
      require: true,
    },
  },
  components: {
    TreeList1,
    TreeList2,
    TreeList4,
    TreeList5,
    TreeList3,
    Dialog,
  },
  watch: {
    DialogVisibleFlag() {
      console.log(1111111111);
      this.thisbindDeviceDialog = this.DialogVisibleFlag;
    },
  },
  data() {
    return {
      listComponent: undefined,
      listAllComponent: undefined,
      moveInGroup: undefined,
      moveOutLampGroup: undefined,
      thisbindDeviceDialog: false,
      currentPage4: 1,
      lampComponentList: [],
      listData: [],
      queryParams: {},
      total: 0,
      multipleOff: true,
      multipleOn: true,
      offIds: "",
      onIds: "",
      position: {
        percentWidth: "73%",
        vWidth: "75vw",
        topTitle: "2%",
        leftTitle: "15%",
      },
      allLampList: [],
      allQueryParams: {},
      ids: "",
    };
  },
  created() {},
  mounted() {
    let that = this;
    this.interfaceComfire();
    console.log(this.componentType);
    this.$bus.$on("operationGroupId", (res) => {
      that.queryParams.groupId = res;
      this.allQueryParams.groupId = res;

      this.getAllList();
      that.getList();
    });
  },

  methods: {
    interfaceComfire() {
      switch (this.componentType) {
        case "1":
          console.log(65656565);
          this.listComponent = listLampComponent;
          this.listAllComponent = fliterLampComponent;
          this.moveInGroup = moveInLampGroup;
          this.moveOutGroup = moveOutLampGroup;
          this.ids = "lampIds";
          break;
        case "2":
          this.listComponent = listWeatherComponent;
          this.listAllComponent = fliterWeatherComponent;
          this.moveInGroup = moveInWeatherGroup;
          this.moveOutGroup = moveOutWeatherGroup;
          this.ids = "weatherIds";
          break;
        case "3":
          this.listComponent = listComponent;
          this.listAllComponent = fliterListComponent;
          this.moveInGroup = moveInCameraGroup;
          this.moveOutGroup = moveOutCameraGroup;
          this.ids = "cameraIds";
          break;
        case "4":
          console.log("led");
          this.listComponent = getLedList;
          this.listAllComponent = fliterLedComponent;
          this.moveInGroup = moveInLedGroup;
          this.moveOutGroup = moveOutLedGroup;
          this.ids = "ledIds";
          break;
        case "5":
          console.log("broadcast");
          this.listComponent = getBCListData;
          this.listAllComponent = fliterBroadcastComponent;
          this.moveInGroup = moveInBroadcastGroup;
          this.moveOutGroup = moveOutBroadcastGroup;
          this.ids = "broadcastIds";
          break;
        default:
          break;
      }
      this.getList();
      this.getAllList();
    },
    handleOff() {},
    handleOn() {},
    addStrategyClick() {},
    handleDialogClose() {
      this.$emit("update:DialogVisibleFlag", false);
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    getList() {
      console.log(this.componentType);
      this.loading = true;
      this.listComponent(this.queryParams).then((response) => {
        console.log(response);
        this.lampComponentList = response.rows;
        // this.total = response.total;
        this.loading = false;
      });
    },
    getAllList() {
      this.loading = true;
      console.log(this.componentType);
      console.log(this.allQueryParams);
      this.listAllComponent(this.allQueryParams).then((response) => {
        console.log(response);
        this.allLampList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 多选框选中数据
    handleSelectionChangeLeft(selection) {
      console.log('offids多选框选中数据',selection);
      this.offIds = selection.map((item) => item.id);
      this.multipleOff = !selection.length;
    },
    handleSelectionChangeRight(selection) {
      console.log(selection);
      this.onIds = selection.map((item) => item.id);
      console.log(this.onIds);
      this.multipleOn = !selection.length;
    },
    //绑定设备
    handleDevice(type) {
      console.log(type);
      if (type === "on") {
        var ids = this.onIds;
        console.log(ids);
        var text = "移入";
        var interFace = this.moveInGroup;
        var obj = {
          [this.ids]: "" + ids,
          groupId: this.queryParams.groupId,
        };
        var params = JSON.stringify(obj);
        var message = "设备移入成功";
      } else {
        console.log("offfffffffff");
        var ids = this.offIds;
        var text = "移出";
        var interFace = this.moveOutGroup;
        var params = "" + ids;
        console.log(params);
        var message = "设备移出成功";
      }
      console.log(params);
      let that = this;
      this.$confirm(`是否确认${text}组件编号为${ids}的设备?`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        // that.$emit("bindDevice", that.ids);
        console.log(params);
        interFace(params).then((res) => {
          console.log(res);
          that.getList();
          that.getAllList();
          that.$message({
            showClose: true,
            message: message,
            type: "success",
          });
        });
      });
    },
  },
};
</script>
<style lang="scss">
.Tree-box {
  position: absolute;
  left: 2vw;
  .tree-list .group-left-img {
    height: 70% !important;
  }
  .tree-list .group-left-img {
    margin-top: 35vh;
    width: 65% !important;
  }
  .custom-tree-container {
    height: 54vh;
    width: 16vw !important;
    top: 49% ;
  }
}
.tree-list {
  overflow: hidden;
}
.rightTable1 {
  position: absolute;
  left: 23vw;
  width: 23vw;
  height: 60vh;
  border: 2px solid #055a8a;
  .search {
    display: flex;
    position: absolute;
    align-items: center;
    // padding-left: 25vw;
    // padding-top: 2vh;
    top: -5vh;
    // left: 8vw;
    .label {
      margin-right: 11vw;
      font-size: 1vw;
      color: #d0e1ee;
    }
    .searchBtn {
      color: aliceblue;
      border: 1px solid #04579a;
      background-color: #04579a;
      margin: 0 2%;
    }
    .querenyiru-btn{
      margin: 0 -3px;
    }
    .el-select .el-input__inner {
      background-color: transparent;
    }
  }
  .right_search{
    top: -6vh;
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
    // background: no-repeat url("../../../assets/images/camera/bg_5.png") center;
    // .el-table__empty-block {
    //   background-color: transparent;
    // }
    .el-table {
      height: 90%;
    }
    .fenye1 {
      height: 5vh;
      width: 100%;
      .pagination-container {
        width: 100%;
        height: 100%;
        margin-top: 0;

        .el-pagination {
          width: 100%;
          height: 100%;
          right: 5vw;
          top: 6vh;
        }
      }
    }
  }
}
.rightTable2 {
  left: 49vw;
}
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
.table-list-body ::v-deep .pagination-container .el-pagination {
  position: static;
}

</style>