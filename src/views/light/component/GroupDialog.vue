<template>
  <Dialog
    title="分组管理"
    :position="position"
    :isShowClose="false"
    @handleDialogClose="handleDialogClose"
    :DialogVisibleFlag.sync="thisbindDeviceDialog"
  >
    <div class="Tree-box">
      <TreeList1 :deptNone="1"></TreeList1>
    </div>

    <div class="rightTable1">
      <div class="search">
        <!-- <el-select filterable>
          <el-option value="1"> </el-option>
        </el-select> -->
        <div class="label">当前分组设备</div>
        <el-button
          :disabled="multipleOff"
          type="primary"
          @click="handleDevice('off')"
          >确认移出</el-button
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
          @selection-change="handleSelectionChangeLeft"
        >
          <el-table-column align="center" type="selection"> </el-table-column>
          <el-table-column prop="name" label="设备名称" align="center">
          </el-table-column>
          <el-table-column prop="poleName" label="所属灯杆" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleOff(scope.row)"
                size="mini"
                round
                :style="{
                  'background-color': '#1a8cf5',
                  border: '1px solid #1a8cf5',
                }"
                >移出</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="fenye1"></div>
      </div>
    </div>
    <div class="rightTable1 rightTable2">
      <div class="search">
        <el-input
          v-model="allQueryParams.name"
          @change="getAllList"
          placeholder="请输入灯光名称"
        ></el-input>
        <!-- <el-select filterable>
          <el-option value="1"> </el-option>
        </el-select> -->
        <el-button class="searchBtn" @click="getAllList">检索</el-button>
        <el-button
          :disabled="multipleOn"
          type="primary"
          @click="handleDevice('on')"
          >确认移入</el-button
        >
      </div>

      <div class="tablelist">
        <el-table
          style="width: 100%"
          class="statu-body"
          :data="allLampList"
          :header-cell-style="{
            background: '#041F37',
            color: '#0175D4',
            fontSize: '18px',
            borderBottom: '2px solid #041F37',
          }"
          @selection-change="handleSelectionChangeRight"
        >
          <el-table-column align="center" type="selection"> </el-table-column>
          <el-table-column prop="name" label="设备名称" align="center">
          </el-table-column>
          <el-table-column prop="poleName" label="所属灯杆" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleOn(scope.row)"
                size="mini"
                round
                :style="{
                  'background-color': '#1a8cf5',
                  border: '1px solid #1a8cf5',
                }"
                >移入</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="fenye1">
          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getAllList"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>
<script>
import TreeList1 from "@/views/light/component/TreeList";
import Dialog from "@/views/light/component/Dialog";
import { listLampComponent,fliterLampComponent }from "@/api/lamp/lampComponent";
import { moveInLampGroup, moveOutLampGroup } from "@/api/lamp/lampGroup";

export default {
  props: {
    DialogVisibleFlag: {
      require: true,
    },
  },
  components: {
    TreeList1,
    Dialog,
  },
  data() {
    return {
      thisbindDeviceDialog: false,
      currentPage4: 1,
      lampComponentList: "",
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
      allLampList: "",
      allQueryParams:{},
    };
  },
  created() {
    this.getList();
    this.getDicts("lamp_state").then((response) => {
      this.statusOptions = response.data;
    });
    this.getAllList();
  },
  mounted() {
    let that = this;
    this.$bus.$on("operationGroupId", (res) => {
      that.queryParams.groupId = res;
      this.allQueryParams.groupId = res;
      this.getAllList()
      that.getList();
    });
  },
  watch: {
    DialogVisibleFlag() {
      this.thisbindDeviceDialog = this.DialogVisibleFlag;
    },
  },
  methods: {
    handleOff() {},
    handleOn() {},
    addStrategyClick() {},
    handleDialogClose() {
      this.$emit("update:DialogVisibleFlag", false);
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    getList() {
      this.loading = true;
    
      listLampComponent(this.queryParams).then((response) => {
        this.lampComponentList = response.rows;
        console.log(response.rows);
        this.loading = false;
      });
    },
    getAllList() {
      this.loading = true;
      console.log(this.allQueryParams);
      fliterLampComponent(this.allQueryParams).then((response) => {
        this.allLampList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 多选框选中数据
    handleSelectionChangeLeft(selection) {
      console.log(11111111111);
      console.log(selection);
      this.offIds = selection.map((item) => item.id);
      this.multipleOff = !selection.length;
    },
    handleSelectionChangeRight(selection) {
      console.log(2222222222);
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
        var interFace = moveInLampGroup;
        var obj = {
          lampIds: "" + ids,
          groupId: this.queryParams.groupId,
        };
        var params = JSON.stringify(obj);
        var message = "设备移入成功";
      } else {
        console.log("offfffffffff");
        var ids = this.offIds;
        var text = "移出";
        var interFace = moveOutLampGroup;
        var params = "" + ids;
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
      // margin-left: 4vw;
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