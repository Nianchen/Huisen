<template>
  <div class="table-list-body">
    <div class="list-search">
      <div
        class="addBtn"
        @click="goAddPoleDialog"
        v-hasPermi="['base:pole:edit']"
      >
        <img
          src="../../../assets/images/button/register-pole.png"
          alt=""
          class="addPoleBtn"
        />
        <img
          class="addicon"
          src="../../../assets/images/button/register-icon.png"
          alt=""
        />
        <span>新增灯杆</span>
      </div>
    </div>
    <el-table
      v-loading="loading"
      :data="poleList"
      style="width: 95%"
      :header-cell-style="{
        color: '#0175D4',
        fontSize: '20px',
      }"
    >
      <el-table-column label="灯杆名称" align="center" prop="name" />
      <el-table-column
        label="所属道路"
        align="center"
        prop="deptName"
      ></el-table-column>
      <el-table-column
        label="所在位置"
        align="center"
        prop="address"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="安装人员"
        align="center"
        prop="createBy"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="详情"
            placement="top-start"
            v-hasPermi="['base:pole:view']"
          >
            <img
              class="groupImg"
              @click="handleDetail(scope.row)"
              src="../../../assets/images/detail_w.png"
              alt="详情"
            />
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="注册组件"
            placement="top-start"
            v-hasPermi="['base:pole:edit']"
          >
            <img
              class="groupImg"
              @click="goAddDeviceDialog(scope.row)"
              src="../../../assets/images/add_w.png"
              alt="注册组件"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      popperClass="ic-pagination"
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!--  灯杆详情  -->
    <PoleDetail
      :DialogVisibleFlag.sync="open"
      :weatherComopnent="weatherComopnent"
      :broadcastComponent="broadcastComponent"
      :lightComponent="lightComponent"
      :cameraComponent="cameraComponent"
      :ledComponent="ledComponent"
    />

    <!--  添加组件  -->
    <AddDialog
      class="addcomponent"
      :addDetail="addDetail"
      :DialogVisibleFlag.sync="openStrategy"
      :title="title"
      @cancelAdd="cancelAdd"
    />

    <!--  添加灯杆  -->
    <add-pole
      :DialogVisibleFlag.sync="openPole"
      :title="title"
      @cancelAddPole="cancelAddPole"
    />
  </div>
</template>
<script>
import PoleDetail from "@/views/pole/component/poleDetail";
import AddDialog from "@/views/pole/component/AddDialog";
import AddPole from "@/views/pole/component/AddPole";
import { getWeatherComponent } from "@/api/weather/weatherComponent";
import { getLampComponent } from "@/api/lamp/lampComponent";
import { getComponent } from "@/api/camera/component";
import { getBCListData, broDetail } from "@/api/broadcast/broadcastApi";
import { listPole, getPole } from "@/api/base/pole";
import { getLedList, ledDetail } from "@/api/led/ledApi";
import { getComponentCall } from "@/api/call/component";
import { MockPoleListData } from "@/utils/MockData";

export default {
  props: {},
  components: { PoleDetail, AddDialog, AddPole },
  data() {
    return {
      title: "",
      open: false,
      openPole: false,
      openStrategy: false,
      total: 0,
      form: {},
      deptId: null,
      queryParams: {},
      poleList: [],
      itemDetail: {},
      addDetail: {},
      poleId: null,
      poleDetail: {},
      type: "",
      lightComponent: {},
      weatherComopnent: {},
      broadcastComponent: {},
      callComponent: {},
      cameraComponent: {},
      ledComponent: {},
      loading: false,
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.$bus.$on("chenggong", (res) => {
      this.getList();
    });
    this.$bus.$on("deptId", (res) => {
      this.deptId = res;
      this.getList({ deptId: this.deptId });
    });
  },
  methods: {
    handleDetail(row) {
      console.log("执行了");
      console.log(row);
      this.$bus.$emit("poleName", row.name);
      this.lightComponent = {};
      this.weatherComopnent = {};
      this.broadcastComponent = {};
      this.callComponent = {};
      this.ledComponent = {};
      this.cameraComponent = {};
      this.poleId = row.id;
      if (row.componentIds) {
        let ids = JSON.parse(row.componentIds);
        console.log(ids);
        ids.forEach((item) => {
          switch (item.type) {
            case "1":
              getLampComponent(parseInt(item.id)).then((res) => {
                this.lightComponent = res.data;
              });
              break;
            case "2":
              getWeatherComponent(parseInt(item.id)).then((res) => {
                console.log(res);
                this.weatherComopnent = res.data;
              });
              break;
            case "3":
              getComponent(parseInt(item.id)).then((res) => {
                this.cameraComponent = res.data;
              });
              break;
            case "4":
              ledDetail(parseInt(item.id)).then((res) => {
                console.log(res);
                this.ledComponent = res.data;
                console.log(this.ledComponent);
              });
              break;
            case "5":
              broDetail(parseInt(item.id)).then((res) => {
                this.broadcastComponent = res.data;
                console.log(this.broadcastComponent);
              });
              break;
            case "6":
              getComponentCall(parseInt(item.id)).then((res) => {
                this.callComponent = res.data;
                this.$bus.$emit("Detail", res.data);
                console.log(this.callComponent);
              });
              break;
          }
        });
      }
      this.itemDetail = row;
      if (row.switchStatus === null) {
        this.itemDetail.switchStatus = false;
        this.percentage = 0;
      } else {
        this.itemDetail.switchStatus = true;
      }
      let that = this;
      setTimeout(() => {
        that.open = true;
      }, 400);

      this.title = "详情";
    },
    goAddPoleDialog() {
      this.title = "新增灯杆";
      this.openPole = true;
    },
    goAddDeviceDialog(row) {
      this.addDetail = row;
      this.type = 2;
      this.title = "注册组件";
      this.openStrategy = true;
    },
    //组件列表
    getList(queryParams) {
      this.loading = true;
      if (this.poleList.length == 0) {
        this.poleList = MockPoleListData();
        this.loading = false;
      } else {
        listPole(queryParams).then((response) => {
          this.loading = false;
          this.poleList = response.rows;
          this.total = response.total;
        });
      }
    },
    cancelAdd(open) {
      this.openStrategy = open;
    },
    cancelAddPole(open) {
      this.openPole = open;
    },
  },
};
</script>
<style lang="scss" scoped>
.table-list {
  .table-list-body {
    width: 79vw;
  }
}
.el-form {
  margin: 5% 3%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 60px;
}

.tree-list-btn {
  border-left: 3px solid #046f94;
  position: absolute;
  top: -0vh;
  left: 2vw;
  width: 80%;
  overflow: hidden;
  z-index: 1000;
  font-size: 10px;
}

.el-table {
  position: relative;
  color: #fff;
  overflow: auto;
  font-size: 1.6vh;
  width: 94.5% !important;
  top: 3.4vh;
  left: 0.5vw;
  transform: translate(-0.4%, 0.1%);
  z-index: -1;
}

.el-table::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: rgb(211, 215, 219);
  border-radius: 5px;
}

.el-table::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-color: #037da5;
  border-radius: 5px;
  // box-shadow: inset 0 0 5px #f00;
}

.el-table::before {
  height: 0px;
}

.tree-list-btn {
  border-left: 3px solid rgba(4, 111, 148, 1);
  position: absolute;
  top: -3.5vh;
  left: 0.1vw;
  width: 80%;
  overflow: hidden;
  z-index: 1000;

  &::after {
    content: "";
    position: absolute;
    display: inline-block;
    height: 3.2vh;
    width: 1vw;
    background-image: radial-gradient(
      rgba(4, 111, 148, 0),
      rgba(4, 111, 148, 0.4),
      rgba(4, 111, 148, 1)
    );
    transform: skew(35deg);
    margin-left: 0.5vw;
    margin-top: 1.2vh;
    border: 2px solid rgba(4, 111, 148, 0.6);
  }

  button {
    background-color: transparent;
    background-image: radial-gradient(
      rgba(2, 94, 170, 0.1),
      rgba(2, 94, 170, 0.2),
      rgba(2, 94, 170, 0.4)
    );
    border: 3px solid rgba(4, 111, 148, 1);
    //border-bottom: none;
    transform: skew(35deg);
    outline: none;
    color: white;
    font-size: 1.3em;
    width: 7.2vw;
    height: 5vh;

    &:first-child {
      //border-right: none;
      width: 9vw;
      margin-left: -30px;
      padding-left: 30px;
    }

    &:last-child {
      margin-left: -4px;
    }

    &:active {
      background-image: radial-gradient(
        rgba(2, 94, 170, 0.1),
        rgba(2, 94, 170, 0.5),
        rgba(2, 90, 163, 0.9)
      );
    }
    span {
      display: block;
      transform: skew(-35deg);
    }
  }
  .button-active {
    background-image: radial-gradient(
      rgba(2, 94, 170, 0.1),
      rgba(2, 94, 170, 0.5),
      rgba(2, 90, 163, 0.9)
    );
  }
}

// 新增灯杆的按钮
.addBtn {
  position: absolute;
  cursor: pointer;
  top: 2.3vh;
  .addPoleBtn {
    width: 125px;
    height: 50px;
    position: relative;
    z-index: 11;
    top: -1vh;
    left: -33vw;
    // background-color: transparent;
    // border: 2px solid #018397;
  }
  .addicon {
    top: -2.4vh;
    left: -38.8vw;
    position: relative;
    z-index: 111;
    width: 10%;
  }
  & > span {
    top: -2.6vh;
    left: -38.5vw;
    z-index: 111;
    position: relative;
  }
}

.groupImg {
  width: 10%;
  cursor: pointer;
  margin-left: 0.5vw;
}
::v-deep .el-pagination {
  left: 12vw;
  top: 3vh;
}
</style>
