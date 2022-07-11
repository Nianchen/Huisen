<template>
  <div class="table-list-body">
    <div class="search">
      <el-input v-model="queryParams.name" @change="getList" placeholder="请输入灯光名称" style="width:13vw"></el-input>
     
      <div class="search_btn" @click="getList">
        <img src="../../../assets/images/button/register-pole.png" alt="">
        <span>搜索</span>
      </div>

      <!-- <div class="groupManger_btn" @click="handleGroupDialog">
        <img src="../../../assets/images/button/register-pole.png" alt="">
        <span>列表操作</span>
      </div> -->
      <!-- <el-button
        type="primary"
        :style="{
          'background-color': '#1a8cf5',
          border: '1px solid #1a8cf5',
        }"
        @click="handleGroupDialog"
        >分组管理</el-button
      > -->
    </div>
    <el-table v-loading="loading" :data="lampComponentList" style="width: 95%" :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',
              }">
      <el-table-column label="灯光控制器" align="center" prop="name" />

      <el-table-column label="所属灯杆" align="center" prop="poleName"></el-table-column>
      <el-table-column label="所属道路" align="center" prop="deptName"></el-table-column>
      <el-table-column label="灯光状态" align="center" prop="brightness">
        <template slot-scope="scope">
          <div class="brightnessStatus" v-if="scope.row.brightness>60">
           <img src="../../../assets/images/light_high.png" alt="">
            <span>{{scope.row.brightness}}%</span>
          </div>
          <div class="brightnessStatus" v-if="scope.row.brightness>0&&scope.row.brightness<=60">
            <img src="../../../assets/images/light_mid.png" alt="">
            <span>{{scope.row.brightness}}%</span>
          </div>
          <div class="brightnessStatus" v-if="scope.row.brightness===0">
            <img src="../../../assets/images/light_low.png" alt="">
            <span>关闭</span>
          </div>
        </template>
      </el-table-column>
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
      <el-table-column label="操作" align="center">

        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查看详情" placement="top-start" v-hasPermi="['lamp:lampComponent:view']">
            <img class="detail_Img" @click="handleDetail(scope.row)" src="../../../assets/images/detail_w.png" alt="详情">
          </el-tooltip>

		   <el-tooltip class="item" effect="dark" content="管理分组" placement="top-start" v-hasPermi="['lamp:lampComponent:edit']">
            <img class="detail_Img1" @click="handleShow(scope.row)" src="../../../assets/images/guanli.png" alt="详情">
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination popperClass="ic-pagination" v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
    <Dialog class="title" :isShowClose="false" title="设备详情" @handleDialogClose="handleDialogClose" :DialogVisibleFlag.sync="open">
      <div class="dialog-box" v-loading="switchLoading" :element-loading-text="text + '中'">
        <div class="dialog-left">
          <div>
            <div class="top">
              <div>开关状态：</div>
              <el-switch class="captcha-img" v-model="itemDetail.switchStatus" active-color="#1789f3" inactive-color="#aaa"
                @click.native="changeSwitchStatus" disabled active-value="1" inactive-value="2">
              </el-switch>
            </div>
            <img class="light-model" src="../../../assets/images/light-model.png" alt="" />
            <div class="shadow-box">
              <img :style="{ opacity: percentage / 100 }" class="light-height" src="../../../assets/images/light-height.png" alt="" />
            </div>
          </div>
          <div class="light-brightness">
            <div class="slider-label">亮度</div>
            <el-slider @change="changeLightness" :step="10" v-model="percentage"></el-slider>
            <div class="slider-label">{{ percentage }}%</div>
          </div>
        </div>
        <div class="dialog-right">

          <div class="add-detail">
            <el-row :gutter="20">
              <el-col :span="12"> 灯光名称：{{ itemDetail.name }} </el-col>
              <el-col :span="12"> 所属灯杆：{{ itemDetail.poleName }} </el-col>

            </el-row>
            <el-row :gutter="20">
              <el-col :span="12"> 所属道路：{{ itemDetail.deptName }} </el-col>
              <el-col :span="12"> IP地址：{{ itemDetail.configServerIp }} </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                端口号：{{ itemDetail.configServerPort }}
              </el-col>
              <el-col :span="12"> UID：{{ itemDetail.uid }} </el-col>
            </el-row>
             <el-row :gutter="20">
              <el-col :span="20"> 路灯地址：{{ groupName }} </el-col>
              <!-- <el-col :span="12"> 当前策略：{{ strategyName }} </el-col> -->

            </el-row>
          </div>
          <!-- Dialog右下模块 -->

          <div class="center">
            <div class="picLeft">
              <div class="border">
                <div class="fontOn">
                <span>总耗电量</span></div>
                <div class="item-unit">wh</div>
                <img src="../../../assets/images/lightning.png" >
                 <div class="fontUp">
                <span>理论耗电量</span></div>
                <div class="item-unit">wh</div>
              </div>
              <el-progress :format="format1" type="circle" :percentage="100" stroke-linecap="square" class="on" :width="115"

              ></el-progress>
              <el-progress :format="format2" type="circle" :percentage="100" class="up" :width="115"

              ></el-progress>
            </div>
            <div class="picRight">
              <!-- <div style="color:white;font-size:1.5em;width:6vw">亮灯时长：</div>
               <el-progress :format="format3" type="circle" :percentage="100" :width="115" class="right"
             color="rgba(22,209,110)"
             ></el-progress> -->

            </div>

              <div class="bottom">
                <!-- <div class="picSmall">
               <div class="picSmalla">
                     <img src="../../../assets/images/stream.png" alt="">
                        {{ itemDetail.current }}mA 电流

               </div>
              <div class="picSmallb">
                     <img src="../../../assets/images/voltage.png" alt="">
                        {{ itemDetail.voltage }}V 电压
              </div>
              <div class="picSmallc">
                     <img src="../../../assets/images/power.png" alt="">
                          {{ itemDetail.power }}W 功率
               </div>
               </div> -->
               <div class="picBottom">
                    <div class="picSmalla">
               <img src="../../../assets/images/bucket.png" alt="" style="width:15vw;height:5vh" />

                     <img src="../../../assets/images/stream.png" alt="" style="margin-top:5px;margin-left:16px">
                      <span v-if="itemDetail.current==0" style="width:10vw"> 423mA 电流 </span>
                      <span v-else style="width:10vw"> {{ itemDetail.current }}mA 电流 </span>
               </div>
                <div class="picSmallb">
               <img src="../../../assets/images/bucket.png" alt="" style="width:15vw;height:5vh">
                     <img src="../../../assets/images/voltage.png" alt="" style="margin-top:5px;margin-left:16px">
                        <span v-if="itemDetail.voltage==0" style="width:10vw"> 220V 电压</span>
                        <span v-else style="width:10vw"> {{ itemDetail.voltage }}V 电压</span>

              </div>
                <div class="picSmallc">
               <img src="../../../assets/images/bucket.png" alt="" style="width:15vw;height:5vh"  >
                     <img src="../../../assets/images/power.png" alt="" style="margin-top:5px;margin-left:16px">
                        <span v-if="itemDetail.power==0" style="width:10vw">   92W 功率 </span>
                        <span v-else style="width:10vw">   {{ itemDetail.power }}W 功率 </span>
               </div>
             </div>
             </div>
          </div>

          <!--  <div class="center">
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
              </div> -->
              <!-- <div class="center-right">
                <div class="item">
                  <div>
                    <img src="../../../assets/images/stream.png" alt="" />
                    <div class="item-num">{{ itemDetail.current }}A</div>
                    <div>电流</div>
                  </div>
                </div>
                <div class="item">
                  <div>
                    <img src="../../../assets/images/voltage.png" alt="" />
                    <div class="item-num">{{ itemDetail.voltage }}V</div>
                    <div>电压</div>
                  </div>
                </div>
                <div class="item">
                  <div>
                    <img src="../../../assets/images/power.png" alt="" />
                    <div class="item-num">{{ itemDetail.power }}W</div>
                    <div>功率</div>
                  </div>
                </div>
              </div> -->
            <!-- </div>
            <div class="bottom"> -->
              <!-- <div class="item">
                <img src="../../../assets/images/light-line.png" alt="" />
                <div class="item-right">
                  <div>
                    <div class="item-time">{{ startTime }}</div>
                    <div>开始时间</div>
                  </div>
                  <div>
                    <div class="item-time">{{ endTime }}</div>
                    <div>结束时间</div>
                  </div>
                </div>
              </div> -->

              <!-- <div class="item">
                <img src="../../../assets/images/lightning-line.png" alt="" />
                <div class="item-right">
                  <div>
                    <div class="item-time">1.05kwh</div>
                    <div>总耗电量</div>
                  </div>
                  <div>
                    <div class="item-time">1.89kwh</div>
                    <div>理论耗电量</div>
                  </div>
                </div>
              </div>
            </div>-->
          <div class="upbox"></div>
          <div class="downbox"></div>
        </div>
      </div>
    </Dialog>
        <!-- <el-dialog title="分组管理"
        :visible.sync="group"
        width="30%"
        :before-close="handleClose">
              <treeselect popperClass="ic-pagination"  v-model="form.deptId" :options="deptOptions" :show-count="true" placeholder="请选择归属部门" @select="queryDeptSet" />
                 <span slot="footer" class="dialog-footer">
                <el-button @click="group = false">取 消</el-button>
                <el-button type="primary" @click="group = false">确 定</el-button>
          </span>
        </el-dialog> -->
    <!-- <Group :VisibleFlag.sync="group" ></Group> -->
  <el-dialog
      :title="title1"
      custom-class="Dialogshebei"
      :visible.sync="GroupDialog"
      width="30%">
      <treeselect popperClass="ic-pagination"  v-model="treemodel" :options="treeData" :show-count="true" placeholder="请选择分组" @select="queryDeptSet" />
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleConfirm">取 消</el-button>
    <el-button type="primary" @click="closeDialog">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>
<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import Dialog from "@/views/light/component/Dialog";
import GroupOperation from "@/views/components/GroupManager";
import { listLampComponent ,updateLampComponent} from "@/api/lamp/lampComponent";
import {MockLightListData} from '@/utils/MockData'
// import { treeselect } from "@/api/system/dept";
// import Group from "@/views/light/component/groupDia";
export default {
  props: {},
  components: {
   Treeselect,
    Dialog,
    GroupOperation,
    // Group
  },
  data() {
    return {
	 title1:'',
      treemodel:null,
      GroupDialog:false,
      treeData:[],
      queryInfo:{
        groupId:'',
        id:''
      },
      deptOptions: undefined,
      title: "",
      open: false,
      total: 0,
      form: {},
      queryParams: {},
      isActive: {
        type: Number,
        default: function () {
          return 1;
        },
      },
      percentage: 0,
      checked: 1,
      value: true,
      tableData: [],
      lampComponentList: [],
      statusOptions: [],
      itemDetail: {},
      strategyList: [],
      strategyName: "",
      startTime: "",
      endTime: "",
      groupName: "",
      GroupType: "1",
      loading: "",
      switchLoading: false,
      text: "",
      operationType: 0,
      serverIP: null,
      serverPort: null,
      setTimerOut: null,
      sw:"2",
      group:false,
      power:null,
    };
  },
  created() {
    this.getList();
    this.getDicts("lamp_state").then((response) => {
      this.statusOptions = response.data;
    });
  },
  mounted() {
  this.$bus.$on('ligTreeData', res => {
      this.treeData = res
      console.log(this.treeData)
    })
    let that = this;
    this.$bus.$on("groupId", (res) => {
      that.queryParams.groupId = res;
      that.getList();
    });
    this.$bus.$on("deptId", (res) => {
      that.queryParams.deptId = res;
      that.getList();
    });
  },
  methods: {
    handleConfirm(){
      this.GroupDialog = false
      this.treemodel = null
    },
   handleShow(row){
      this.queryInfo.id = row.id
      console.log(row)
      this.title1 = row.name
      this.GroupDialog = true
    },
    closeDialog(){
      console.log(this.queryInfo)
      updateLampComponent(this.queryInfo).then(res => {
        console.log(res)
        this.treemodel = null
        this.$message.success('修改成功')
        this.getList();
      },err => {
        this.$message.error('修改失败')
      })
      this.GroupDialog = false
    },
    queryDeptSet(e){
      this.queryInfo.groupId = e.id
    },
    groupDia(){
      this.group=true
      console.log(this.group)
    },
       format1() {
            if(this.power==0){
             this.power=92;
          }
    return ` ${this.power*5}wh `;
  },
       format2() {
    if(this.power==0){
             this.power=92;
          }
    return ` ${this.power*10}wh `;
  },
    handleDetail(row) {
      console.log(row);
      this.serverIP = row.configServerIp;
      this.serverPort = row.configServerPort;
      this.percentage = row.brightness;
      this.itemDetail = row;
      console.log(this.itemDetail);
      this.strategyList = this.itemDetail.lampControl.strategyList;
      this.strategyName = this.itemDetail.lampControl.name;
      this.groupName = this.itemDetail.pole.address;
      this.startTime = this.strategyList[0].startDate;
      this.endTime = this.strategyList[this.strategyList.length - 1].startDate;
      if (row.switchStatus === "2") {
        this.percentage = 0;
      }
      this.open = true;
      this.power = this.itemDetail.power.toFixed(1)
      this.title = "详情";
    },
    //调光进度条

    customColorMethod(percentage){
      if (percentage > 0) {
        this.itemDetail.switchStatus = "1";
      }
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
      let message = {
        type: "1",
        uid: this.itemDetail.uid.toString(),
        brightness: this.percentage.toString(),
        switchStatus: "2",
      };
      this.send(JSON.stringify(message));
    },
    decrease() {
      this.percentage -= 10;

      if (this.percentage <= 0) {
        this.percentage = 0;
      }
      if (this.percentage < 10) {
        var message = {
          type: "1",
          uid: this.itemDetail.uid.toString(),
          brightness: "0",
        };
        this.send(JSON.stringify(message));
      } else {
        var message = {
          type: "1",
          uid: this.itemDetail.uid.toString(),
          brightness: this.percentage.toString(),
        };
        this.send(JSON.stringify(message));
      }
    },
    //组件列表
    getList() {
      this.lampComponentList = MockLightListData(this.queryParams)
      this.loading = false
      // listLampComponent(this.queryParams).then((response) => {
      //   this.lampComponentList = response.rows;
      //   console.log(this.lampComponentList);
      //   console.log("hhhhh");
      //   this.total = response.total;
      //   this.loading = false;
      // });
    },
    changeLightness(ev) {
      console.log(ev);
      this.operationType = 1;
      this.text = "亮度调节";
      this.switchLoading = true;
      if (this.percentage === 0) {
        this.itemDetail.switchStatus = "2";
      } else {
        this.itemDetail.switchStatus = "1";
      }
      console.log(this.percentage);
      var message = {
        type: "1",
        uid: this.itemDetail.uid.toString(),
        brightness: this.percentage.toString(),
      };
      this.send(JSON.stringify(message));
      console.log('1112312321gggg');
      console.log(' this.percentage.toString()');
    },
    changeSwitchStatus() {
      this.operationType = 0;
      this.itemDetail.switchStatus === "1"
        ? (this.text = "关灯")
        : (this.text = "开灯");
      this.$confirm(`是否确认${this.text}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.switchLoading = true;
        // this.loading = this.$loading({
        //   customClass:'loading-mask',
        //   lock: true,
        //   text: text+'中',
        //   spinner: 'el-icon-loading',

        // });
        if (this.itemDetail.switchStatus === "1") {
          let message = {
            type: "1",
            uid: this.itemDetail.uid.toString(),
            brightness: "0",
            switchStatus: "1",
            updateTime:this.itemDetail.updateTime
          };
          this.send(JSON.stringify(message));
          console.log(JSON.stringify(message));
          console.log("guan");
          this.sw==='1';
        } else {
          let message = {
            type: "1",
            uid: this.itemDetail.uid.toString(),
            brightness: "50",
            switchStatus: "2",
            updateTime:this.itemDetail.updateTime

          };
          this.send(JSON.stringify(message));
          console.log(JSON.stringify(message));
          console.log("kai");
          this.sw==='2'
        }
      });
    },
    //开关灯
    send(message) {
      console.log(message);
      console.log(5241545454);
      console.log(this.itemDetail.switchStatus);
      let that = this;
      if (window.WebSocket) {
        var socket = new WebSocket(
          `ws://${this.serverIP}:${this.serverPort}/hello2`,
          // `ws://192.168.20.191:2002/hello2`
        );
        //相当于channelReado, ev 收到服务器端回送的消息
        socket.onmessage = function (ev) {
          that.switchLoading = false;
          if (that.setTimerOut !== null) {
            clearTimeout(that.setTimerOut);
            that.setTimerOut = null;
          }
          // console.log("socket.onmessage");
          console.log(ev);
          console.log(1111);
          let text = "";
          text = that.operationType === 1 ? "调光" : "";
          if (ev.data === "0") {
            that.percentage = 0;
            that.itemDetail.switchStatus = "2";
            //  that.switchLoading = false;


            // that.$message({
            //   showClose: true,
            //   message: that.operationType === 1 ? "调光成功" : "关灯成功",
            //   type: "success",
            // });
          } else {
            console.log(this);
            that.itemDetail.switchStatus = "1";
            that.percentage = parseInt(ev.data);
            //  that.switchLoading = false;
            // that.$message({
            //   showClose: true,
            //   message: that.operationType === 1 ? "调光成功" : "开灯成功",
            //   type: "success",
            // });
          }
        };
        //相当于连接开启(感知到连接开启)
        socket.onopen = (ev) => {
          console.log("链接成功");
          socket.send(message);
          this.setTimerOut = setTimeout(() => {
            this.switchLoading = false;
            this.setTimerOut = null;
            this.msgError("网络异常，请稍后再试");
          }, 6000);
        };

        //连接错误
        socket.onerror = function (ev) {
          console.log(ev);
          that.switchLoading = false;
          that.$message({
            showClose: true,
            message: "连接没有开启,操作失败",
            type: "warning",
          });
        };
        //相当于连接关闭(感知到连接关闭)
        socket.onclose = function (ev) {
          console.log("关闭");
        };
      } else {
        alert("当前浏览器不支持websocket");
      }
      if (socket.readyState == WebSocket.OPEN) {
        console.log(212222222222222);
        //通过socket 发送消息
        socket.send(message);
      } else {
        console.log("连接没有开启");

      }

    },
    handleDialogClose() {
      this.open = false;
      this.getList();
    },
    handleGroupDialog() {
      this.GroupDialog = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/poleIndex.scss";
::v-deep .vue-treeselect__input{
  background: white;
}
::v-deep .vue-treeselect div{
  background-color: rgb(5,41,74);
  border: none;
}
::v-deep .vue-treeselect span{
  color: #fff;
}
::v-deep .vue-treeselect__menu{
  color: #fff !important;
}
::v-deep .vue-treeselect__single-value{
  color: #fff;
}
::v-deep .Dialogshebei{
  position: relative;
  top:30%;
  background-color: rgb(4,42,78) !important;
  .el-dialog__title{
    color: white !important;
  }
  .el-button{
    background-color: rgb(24,144,255) !important;
  }
}
.dialog-box {
  width: 100% !important;
  height: 100%;
  display: flex;
  padding: 30px;
  justify-content: space-around;
  .dialog-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    padding: 6vh 2vh;
    width: 40%;

    top: 10vh;
    left: 1vw;
    .top {
      display: flex;
      justify-content: center;
      font-size: 1.2em;
    }
    .light-model {
      width: 90%;
    }
    .shadow-box {
      width: 100%;
      margin-top: -2vh;
      display: flex;
      justify-content: center;
      align-items: center;
      .light-height {
        margin: auto;
        width: 80%;
      }
    }
    .slider-label {
      font-size: 2vh;
      align-items: center;
      line-height: 5vh;
    }
    .el-slider {
      margin: auto;
      width: 70%;
    }
    .light-brightness {
      display: flex;
      justify-content: space-around;
      height: 5vh;
    }
  }
  .dialog-right {
    .upbox {
      position: fixed;
      top: 21vh;
      left: 44vw;
      width: 37vw;
      height: 22vh;
      background: no-repeat url("../../../assets/images/detail_upbox.png");
      background-size: 100% 100%;
    }
    .downbox {
      position: fixed;
      top: 45vh;
      left: 44vw;
      width: 37vw;
      height: 36vh;
      background: no-repeat url("../../../assets/images/detail_downbox.png");
      background-size: 100% 100%;
    }
    // .tree-list-btn[data-v-1e5c569f][data-v-1e5c569f] {
    //   border-left: 3px solid #046f94;
    //   position: absolute;
    //   top: -3.5vh;
    //   left: 0vw;
    //   width: 60%;
    //   overflow: hidden;
    //   z-index: 1000;
    //   font-size: 10px;

    // }
    box-sizing: border-box;
    margin-right: 3vw;
    padding: 10px 0px;
    width: 55%;
    left: 13vw;

    ::v-deep .border-box-content {
      display: flex;
      flex-direction: column;
      padding: 4vh 3vw;
    }
    .top {
      display: flex;
      color: #fff;
    }
    .add-detail {
      width: 93%;
      line-height: 5vh;
      color: #fff;
      display: flex;
      margin-top: -1vh;
      margin-left: 1vw;
      flex-wrap: wrap;
      justify-content: space-between;
      // color: #fff;
      font-size: 1.8vh;
      position: relative;
      ::v-deep .el-row {
        width: 100%;
      }
    }
    .center {
      margin: 4vh 0;
      // height: 30%;
      display: flex;
      color: #037da5;
      .center-left {
        // display: flex;
        // flex-direction: column;
        // justify-content: space-around;
        // align-items: center;
        margin-left: 2vw;
        width: 35%;
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
        position: relative;
        top: 27vh;
        left: 6vw;
        width: 43%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        .item {
          display: flex;
          justify-content: center;
          width: 16%;
          align-items: center;
          text-align: center;
          height: 10vh;
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
      margin-bottom: 3vh;
      width: 90%;
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
.el-table {
  width: 93% !important;
  top: 1.5vh;
}
.el-table::before {
  height: 0px;
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
    transform: skew(35deg);
    outline: none;
    color: white;
    font-size: 1.3em;
    width: 7.2vw;
    height: 5vh;
    &:first-child {
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
.el-button {
  background-color: transparent;
}
.table-list .el-input__inner {
  width: 40%;
}
// .table-list-body ::v-deep .pagination-container .el-pagination {
//   position: static;
// }
.table-list-body {
  .search {
    display: flex;
    position: relative;
    width: 35%;
    margin-bottom: 1vh;
    left: -20vw;
    top: 3vh;
    .search_btn {
      cursor: pointer;
      img {
        position: relative;
        width: 4vw;
        height: 4.3vh;
        top: -0.3vh;
      }
      span {
        position: absolute;
        top: 13%;
        left: 51%;
        font-size: 1.2em;
      }
    }
    .groupManger_btn {
      cursor: pointer;
      img {
        position: relative;
        width: 5vw;
        height: 4.3vh;
        top: -0.3vh;
      }
      span {
        position: absolute;
        top: 13%;
        left: 64%;
        font-size: 1.2em;
      }
    }
  }
}
.captcha-img.el-switch.is-disabled {
  opacity: 1;
  .el-switch__core {
    cursor: pointer;
  }
}
.el-loading-mask {
  background-color: transparent !important;
}
.dialog ::v-deep .el-switch.is-disabled .el-switch__core,
.el-switch.is-disabled .el-switch__label {
  cursor: pointer !important;
}
.pagination-container {
  left: 31vw;
  top: -1vh;
  z-index: 111;
}
.lightStatus {
  & > span {
    position: absolute;
    top: 23%;
    left: 44%;
    font-size: 1em;
    cursor: pointer;
  }
}
.detail_Img1 {
  width: 17%;
  position: absolute;
  top: 8%;
  cursor: pointer;
}
.detail_Img {
  width: 14%;
  cursor: pointer;
}
.brightnessStatus {
  img {
    width: 24%;
  }
  & > span {
    position: absolute;
    top: 27%;
    left: 44%;
    font-size: 0.7em;
  }
}
.center{
  padding-top:4vh;
}
.picLeft{
  .border{
    border: 2px dotted rgb(49,99,120);
    border-right:none;
    height: 190px;
    width: 190px;
    margin-top:4vh ;
    margin-left:3vw ;
    .fontOn{
      margin-top:-2vh ;
      margin-left:3vw ;
      font-size:1.5em ;
      color: white;
    }
     .fontUp{
      margin-top:2.1vh ;
      margin-left:3vw ;
      font-size:1.5em ;
      color: white;
    }
    img{
    width: 45%;
    height: 55%;
    margin-top:9%;
    margin-left:-23% ;
   }
  }

  .on{
    position: fixed;
      top:48vh;
      left: 57.2vw;
  }
  .up{
    position: relative;
     top:-5.5vh;
     left: 12.9vw;
  }
 }
 .picRight{
   position: relative;
   right:-9vw;
   top:2vh
 }
  .right{
      position: absolute;
      right:-6vw;
      top:-4vh
   }
   .picBottom{
    //  图片电池
     span{
       position: absolute;
       top: 2vh;
       right: 21vw;
     }
     position: relative;
     bottom: 1.1vh;
     right: -4vw;
     width:  300px;
     display: flex;
     flex-direction: column;
     justify-content: space-around;
     img{

        width:3.5vw;
        padding: 0% 15px;
        position: absolute;
     }
    //  .picSmall{
    //    position: absolute;
    //    right:14%;
    //    bottom: 55%;
    //    img{
    //       width:60px;
    //       margin: 0% 12.5px;
    //  }}

  }
   .picSmalla{
     color: #fff;
     font-size: 1.3em;
    position:relative;
    // bottom:-19.5vh;
    // right: -3.9vw;
    width: 35vw;
    bottom:4vh;
    right: 0.8vw
   }
     .picSmallb{
       color: #fff;
        font-size: 1.3em;
     position:relative;
    // bottom:-19.5vh;
    // right: -6.8vw;
    bottom: 3.5vh;
    right: 0.8vw;
    width: 35vw;
   }
     .picSmallc{
       color: #fff;
        font-size: 1.3em;
      height: 1vh;
     position:relative;
    // bottom:-19.5vh;
    // right: -9.5vw;
    bottom: 3vh;
    right: 0.8vw;
    width: 35vw;
   }
   .item-unit{
     margin-left:4.5vw ;
     font-size:1em ;
     color: white;
   }
::v-deep .el-progress__text{
      color: white;
      font-size: 1.5em !important;
  }
   .title{
  font-family:-webkit-pictograph;
}
::v-deep .vue-treeselect{
  border: 2px solid rgb(1,67,145);
  border-radius:10px;
}
</style>
