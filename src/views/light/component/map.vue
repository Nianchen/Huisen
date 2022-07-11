<template>
  <div class="table-list-body">
    <div class="mapbox">
      <my-map ref="map" adapter="Amap" :center="center" class="area-map" style="width:100%;height:100%" :zoom="14">
        <my-map-marker v-for="(light,index) in lampComponentList" :key="light.id" :coordinate="[light.pole.lat,light.pole.lng]" :src="centerImg"
          :active-index="index" @click="handleDetail(light)" />
      </my-map>
    </div>
     <Dialog :isShowClose="false" title="设备详情" @handleDialogClose="handleDialogClose" :DialogVisibleFlag.sync="open">
      <div class="dialog-box" v-loading="switchLoading" :element-loading-text="text + '中'">
        <div class="dialog-left">
          <div>
            <div class="top">
              <div>开关状态：</div>
              <el-switch class="captcha-img" v-model="this.itemDetail.switchStatus" active-color="#1789f3" inactive-color="#aaa"
                @click.native="changeSwitchStatus"  active-value="1" inactive-value="2">
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
              <el-col :span="20"> 路灯地址：{{   groupName }} </el-col>
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
            <!-- <div class="picRight">
              <div style="color:white;font-size:1.5em;width:6vw">亮灯时长：</div>

              <el-progress :format="format3" type="circle" :percentage="100" :width="115" class="right"
             color="rgba(22,209,110)"
             ></el-progress>
            </div> -->

           <div class="bottom">
               <!-- <div class="picSmalla">
                     <img src="../../../assets/images/stream.png" alt="">
                          <div  style="color:white">{{ itemDetail.current }}mA</div>
                          <div style="color:white"><b>电流</b></div>
               </div>
              <div class="picSmallb">
                     <img src="../../../assets/images/voltage.png" alt="">
                          <div  style="color:white">{{ itemDetail.voltage }}V</div>
                          <div style="color:white"><b>电压</b></div>
              </div>
              <div class="picSmallc">
                     <img src="../../../assets/images/power.png" alt="">
                          <div  style="color:white">{{ itemDetail.power }}W</div>
                          <div style="color:white"><b>功率</b></div>
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
  </div>

</template>
<script>
import { MyMap, MyMapMarker } from "$ui/map";
import Dialog from "@/views/light/component/Dialog";
import { listAllLampComponent } from "@/api/lamp/lampComponent";
export default {
  components: { MyMap, MyMapMarker, Dialog },
  data() {
    return {
      center: [111.564234, 32.27757],
      centerImg: require("@/assets/images/marker/light_icon.png"),
      lampComponentList: [],
      // 查询参数
      queryParams: {
        deptId: null,
      },
      ledDetailVisiable: false,
      open: false,
      switchLoading: false,
      itemDetail: {},
      operationType: null,
      text: null,
      percentage: null,
      percentage: 60,
      strategyList: {},
      strategyName: null,
      startTime: null,
      endTime: null,
      groupName: null,
      serverIP: null,
      serverPort: null,
      power:null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
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
    /** 查询灯杆列表 */
    getList() {
      console.log('map');
      listAllLampComponent(this.queryParams).then((response) => {
        console.log(response.data);
        response.data.map((item)=>{
          item.deptName="谷城县",
          item.name="谷城x号灯光",
          item.poleName="谷城灯杆"
          item.pole.address="谷城县谷水路"
        })
        response.data[0].pole.lat=111.564234
        response.data[0].pole.lng=32.277575
        response.data[1].pole.lat=111.565478
        response.data[1].pole.lng=32.277588
        response.data[2].pole.lat=111.566589
        response.data[2].pole.lng=32.277647
        this.lampComponentList = response.data;
      });

    },
    // getList() {
    //   this.loading = true;
    //   console.log(this.queryParams);
    //   listLampComponent(this.queryParams).then((response) => {

    //     this.lampComponentList = response.rows;
    //     console.log(this.lampComponentList);
    //     console.log("hhhhh");
    //     this.total = response.total;
    //     this.loading = false;
    //   });
    // },

    handleDetail(row) {
      console.log(row);
      this.serverIP = row.configServerIp;
      this.serverPort = row.configServerPort;
      this.percentage = row.brightness;
      this.itemDetail = row;
      this.strategyList = this.itemDetail.lampControl.strategyList;
      this.strategyName = this.itemDetail.lampControl.name;
      this.groupName = this.itemDetail.pole.address;
      this.startTime = this.strategyList[0].startDate;
      this.endTime = this.strategyList[this.strategyList.length - 1].startDate;
      if (row.switchStatus === "2") {
        this.percentage = 0;
      }
      this.open = true;
      this.title = "详情";
      console.log(this.itemDetail.power);
      this.power = this.itemDetail.power.toFixed(1)
      console.log(this.power);
    

    },
    //调光进度条

    customColorMethod(percentage) {
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
  // getList() {
  //     this.loading = true;
  //     console.log(this.queryParams);
  //     listLampComponent(this.queryParams).then((response) => {

  //       this.lampComponentList = response.rows;
  //       console.log(this.lampComponentList);
  //       console.log("hhhhh");
  //       this.total = response.total;
  //       this.loading = false;
  //     });
    // },
    changeLightness(ev) {
      console.log(ev);
      this.operationType = 1;
      this.text = "亮度调节中";
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
          };
          this.send(JSON.stringify(message));
        } else {
          let message = {
            type: "1",
            uid: this.itemDetail.uid.toString(),
            brightness: "50",
            switchStatus: "2",
          };
          this.send(JSON.stringify(message));
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
        // var socket = new WebSocket("ws://123.56.9.116:2002/hello2");
        var socket = new WebSocket(
          `ws://${this.serverIP}:${this.serverPort}/hello2`,
          // `ws://192.168.3.30:2002/hello2`
          // `ws://192.168.20.191:2002/hello2`
        );
        //相当于channelReado, ev 收到服务器端回送的消息
        socket.onmessage = function (ev) {
          that.switchLoading = false;
          console.log(ev);
          let text = "";
          text = that.operationType === 1 ? "调光" : "";

          if (ev.data === "0") {
            that.percentage = 0;
            console.log(this);
            that.itemDetail.switchStatus = "2";
            // that.$message({
            //   showClose: true,
            //   message: that.operationType === 1 ? "调光成功" : "关灯成功",
            //   type: "success",
            // });
          } else {
            console.log(this);
            that.itemDetail.switchStatus = "1";
            that.percentage = parseInt(ev.data);
            // that.$message({
            //   showClose: true,
            //   message: that.operationType === 1 ? "调光成功" : "开灯成功",
            //   type: "success",
            // });
          }
        };
        //相当于连接开启(感知到连接开启)
        socket.onopen = function (ev) {
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
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/poleIndex.scss";
.mapbox {
  margin-top: 3vh;
  width: 73vw;
  height: 66vh;
  border: 2px solid #0188bb;
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
      width: 109%;
      line-height: 5vh;
      color: #fff;
      display: flex;
      margin-top: -1vh;
      margin-left: 1vw;
      flex-wrap: wrap;
      justify-content: space-between;
      // color: #fff;
      font-size: 1.8vh;
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

}
</style>
