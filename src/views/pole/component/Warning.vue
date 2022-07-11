<template>
  <div class="table-list-body">
    <el-table :data="warningTableData" style="width: 95%">
      <el-table-column label="设备名称" align="center" prop="name" />
      <el-table-column
        label="所属区域"
        align="center"
        prop="dept_name"
      ></el-table-column
      >

      <el-table-column
        label="所属灯杆"
        align="center"
        prop="pole_name"
      ></el-table-column>
      <el-table-column
        label="故障描述"
        align="center"
        show-overflow-tooltip="true"
        prop="description"
      ></el-table-column>
      <el-table-column
        label="上报时间"
        align="center"
        prop="report_time"
      ></el-table-column>
      <!-- <el-table-column label="UID" align="center" prop="UID" /> -->
      <el-table-column label="处理阶段" align="center" prop="jd">
        <template slot-scope="scope">
          <el-button
            round
            size="mini"
            v-if="scope.row.jd === 1"
            :style="{ 'background-color': '#49b949' }"
            >已处理</el-button
          >
          <el-button
            round
            size="mini"
            v-if="scope.row.jd === 2"
            :style="{ 'background-color': 'red' }"
            >未处理</el-button
          >
          <el-button
            round
            size="mini"
            v-if="scope.row.jd === 3"
            :style="{ 'background-color': '#da6b0d' }"
            >处理中</el-button
          >
        </template>
      </el-table-column>
      <!-- <el-table-column label="在线状态" align="center" prop="deviceStatus">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.status === '1'"
            :style="{ color: '#5ee89c', border: '1px solid #5ee89c' }"
            >在线</el-button
          >
          <el-button
            size="mini"
            v-if="scope.row.status === '2'"
            :style="{ color: 'red', border: '1px solid red' }"
            >离线</el-button
          >
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="配置参数" align="center" prop="config" /> -->

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
           
            size="mini"
            round
            :style="{
              'background-color': '#1a8cf5',
              border: '1px solid #1a8cf5',
            }"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
    />

    <Dialog :title="title" :DialogVisibleFlag.sync="open">
      <div class="dialog-box">
        <div class="dialog-left">
          <div>灯头模型</div>
          <div class="light-brightness">
            <div @click="decrease" class="el-icon-minus"></div>
            <el-progress
              :stroke-width="20"
              :text-inside="true"
              :percentage="percentage"
              :color="customColorMethod"
            ></el-progress>
            <div @click="increase" class="el-icon-plus"></div>
          </div>
        </div>
        <div class="dialog-right">
          <div class="tree-list-btn">
            <button
              @click="goDetail"
              :class="isActive === 1 ? 'button-active' : ''"
            >
              <span>设备详情</span>
            </button>
            <button
              @click="goControl"
              :class="isActive === 2 ? 'button-active' : ''"
            >
              <span>控制策略</span>
            </button>
          </div>
          <dv-border-box-10>
            <div v-if="checked === 1" class="top">
              <div>开关状态：</div>
              <el-switch
                v-model="value"
                active-color="#1789f3"
                inactive-color="#aaa"
              >
              </el-switch>
            </div>
            <div v-if="checked === 1" class="center">
              <div class="center-left">
                <div class="item">
                  <img src="../../../assets/images/lightning.png" alt="" />
                  <div class="item-num item-num-top">10.5</div>
                  <div>
                    <div class="item-unit item-unit-top">kwh</div>
                    <div>耗电量</div>
                  </div>
                </div>
                <div class="item">
                  <img src="../../../assets/images/light.png" alt="" />
                  <div class="item-num item-num-bottom">10.5</div>
                  <div>
                    <div class="item-unit item-unit-bottom">小时</div>
                    <div>亮灯时长</div>
                  </div>
                </div>
              </div>
              <div class="center-right">
                <div class="item">
                  <div>
                    <img src="../../../assets/images/stream.png" alt="" />
                    <div class="item-num">>2A</div>
                    <div>电流</div>
                  </div>
                </div>
                <div class="item">
                  <div>
                    <img src="../../../assets/images/voltage.png" alt="" />
                    <div class="item-num">>6V</div>
                    <div>电压</div>
                  </div>
                </div>
                <div class="item">
                  <div>
                    <img src="../../../assets/images/power.png" alt="" />
                    <div class="item-num">5W</div>
                    <div>功率</div>
                  </div>
                </div>
              
                <!-- <img src="../../../assets/images/bucket.png" alt="">
                  <img src="../../../assets/images/bucket.png" alt="">
                  <img src="../../../assets/images/bucket.png" alt="">
                  <img src="../../../assets/images/bucket.png" alt=""> -->
              </div>
            </div>
            <div v-if="checked === 1" class="bottom">
              <div class="item">
                <img src="../../../assets/images/light-line.png" alt="" />
                <div class="item-right">
                  <div>
                    <div class="item-time">16:00</div>
                    <div>开始时间</div>
                  </div>
                  <div>
                    <div class="item-time">16:00</div>
                    <div>开始时间</div>
                  </div>
                </div>
              </div>

              <div class="item">
                <img src="../../../assets/images/lightning-line.png" alt="" />
                <div class="item-right">
                  <div>
                    <div class="item-time">16:00</div>
                    <div>开始时间</div>
                  </div>
                  <div>
                    <div class="item-time">16:00</div>
                    <div>开始时间</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="checked === 2">
              <div>
                <el-button type="primary">绑定策略</el-button>
                <el-button type="danger">删除</el-button>
              </div>
              <div class="right-table">
                <el-table
                  ref="singleTable"
                  :data="tableData"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  style="width: 100%"
                  :header-cell-style="{
                    background: '#042038',
                    color: '#ffffff',
                  }"
                >
                  <el-table-column type="selection" width="100">
                  </el-table-column>
                  <el-table-column type="index" width="150"> </el-table-column>

                  <el-table-column
                    property="name"
                    label=" 策略名称"
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="primary"
                        size="mini"
                        @click="goStrategyDialog"
                        >详情</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </dv-border-box-10>
        </div>
      </div>
    </Dialog>

  </div>
</template>
<script>
import Dialog from "@/views/components/Dialog";

import {
  listLampComponent,
  getLampComponent,
  delLampComponent,
  addLampComponent,
  updateLampComponent,
} from "@/api/lamp/lampComponent";
import {listCamera, listStatus, listFault} from "@/api/camera/group";
export default {
  props: {

  },
  components: {
    Dialog,

  },
  data() {
    return {
      title: "",
      open: false,
      total: 0,
      queryParams: {
        // pageNum: 1,
        // pageSize: 10,
        // deptId: null,
        // poleId: null,
        // componentId: null,
        // name: null,
        // mac: null,
        // ip: null,
        // configServerIp: null,
        // configServerPort: null,
        // config: null,
        // status: null,
        // humidity: null,
        // temperture: null,
        // noise: null,
        // pm2: null,
        // pm10: null,
      },
      customColors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
      isActive: {
        type: Number,
        default: function () {
          return 1;
        },
      },
      percentage: 60,
      checked: 1,
      value: true,
      tableData: [
        {
          name: "策略1",
        },
        {
          name: "策略1",
        },
        {
          name: "策略1",
        },
        {
          name: "策略1",
        },
      ],
      openStrategy: false,
      lampComponentList: [],
      statusOptions: [],
      warningTableData:[]
    };
  },
  created() {
    this.getList();
    this.getDicts("lamp_state").then((response) => {
      this.statusOptions = response.data;
    });
    this.handleGetListFault()
  },
  methods: {
    handleDetail(row) {
      console.log(this.open);
      this.open = true;
      this.title = "详情";
    },
    customColorMethod(percentage) {
      if (percentage < 30) {
        return "#909399";
      } else if (percentage < 70) {
        return "#e6a23c";
      } else {
        return "#67c23a";
      }
    },

    increase() {
      this.percentage += 10;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    decrease() {
      this.percentage -= 10;
      if (this.percentage <script ) {
        this.percentage = 0;
      }
    },
    goDetail() {
      console.log(1111111111);
      this.checked = 1;
    },
    goControl() {
      console.log(222222222222);
      this.checked = 2;
    },
    goStrategy() {
      console.log(this.open);
      console.log(111111111111111111);
      this.open = true;
      this.title = "详情";
    },
    goStrategyDialog() {
      console.log(22222222);
      this.openStrategy = true;
    },
    //组件列表
    getList() {
      this.loading = true;
      listLampComponent(this.queryParams).then((response) => {
        this.lampComponentList = response.rows;
        console.log(this.lampComponentList);
        this.total = response.total;
        this.loading = false;
      });
    },
    handleGetListFault() {
      listFault().then(response => {

        this.warningTableData = response.data.cameras
        console.log(this.warningTableData);
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-box {
  width: 100% !important;
  height: 100%;
  display: flex;
  padding: 30px;
  justify-content: space-around;
  .dialog-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #fff;
    padding: 20px 20px;
    width: 40%;
    .el-progress {
      width: 80%;
    }
    .light-brightness {
      display: flex;
      justify-content: space-around;
    }
    // border: 1px solid #eee;
  }
  .dialog-right {
    .tree-list-btn[data-v-1e5c569f][data-v-1e5c569f] {
      border-left: 3px solid #046f94;
      position: absolute;
      top: -3.5vh;
      left: 0vw;
      width: 60%;
      overflow: hidden;
      z-index: 1000;
      font-size: 10px;
    }
    position: relative;
    box-sizing: border-box;
    margin-right: 10px;
    padding: 10px 0px;
    width: 60%;
    .dv-border-box-10 {
      height: 60vh;
    }
    ::v-deep .border-box-content {
      //   display: flex;
      // flex-direction: column;
      // justify-content: space-around;
      padding: 4vh 3vw;
    }
    // border: 1px solid #eee;
    .top {
      display: flex;
      color: #fff;
    }
    .center {
      margin: 7vh 0;
      height: 30%;
      display: flex;
      color: #037da5;
      .center-left {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 40%;
        color: #bbb;
        .item {
          display: flex;
          .item-num {
            margin: 5px 5px;
            font-size: 20px;
          }
          .item-num-top,
          .item-unit-top {
            color: #49b949;
          }
          .item-num-bottom,
          .item-unit-bottom {
            color: rgb(218, 161, 40);
          }
        }
      }
      .center-right {
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        .item {
          display: flex;
          justify-content: center;
          width: 20%;
          align-items: center;
          text-align: center;
          height: 100%;
          background: url("../../../assets/images/bucket.png");
          background-size: 100% 100%;
          color: #fff;
          .item-num {
            color: bule;
          }
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-around;
      .item {
        display: flex;
        .item-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #fff;
          .item-time {
            font-size: 20px;
            color: #037da5;
          }
        }
      }
    }
  }
}
.el-form[data-v-2ad7dfef] {
  margin: 5% 3%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 60px;
}

.tree-list-btn[data-v-1e5c569f] {
  border-left: 3px solid #046f94;
  position: absolute;
  top: -0vh;
  left: 2vw;
  width: 80%;
  overflow: hidden;
  z-index: 1000;
  font-size: 10px;
}
.right-table {
  ::v-deep .el-table__body {
    width: 100% !important;
  }
}
.right-table {
  ::v-deep .el-table__header {
    width: 100% !important;
    box-sizing: border-box;
  }
  .el-table {
    background-color: transparent;
    padding: 10px;
  }
}

.el-table::before {
  height: 0px;
}
.el-radio-group {
  display: flex;
  margin-top: 2vh;

  flex-direction: column;
  ::v-deep .el-radio {
    margin-top: 1vh;

    .el-radio__inner {
      height: 2.3vh;
      width: 1.3vw;
    }
    .el-radio__label {
      font-size: 18px;
      color: #fff;
    }
  }
}
.dialog ::v-deep .el-dialog {
  margin-top: 7vh !important;
}
.table-list {
  position: relative;
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
.group ::v-deep .el-dialog__headerbtn {
  top: 15%;
  left: 96%;
  font-size: 2.5em;
  color: white;
  z-index: 1000000;
}

// .camera ::v-deep .el-dialog{
// 	height: 80% !important;
// 	margin-top: 9vh !important;
// 	.el-dialog__body{
// 		height: 100%;
// 		background-color: #072b4c00;
// 	}
//   }
.el-button {
  background-color: transparent;
}
</style>