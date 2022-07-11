<template>
  <div class="dialog">
    <el-dialog :modal-append-to-body='false' @click="click" :before-close="handleDialogClose" :visible.sync="thisDialogVisible" :show-close="false">
      <div class="dialog-box" backgroundColor="rgb(4,38,70)" :color="['#018397']">
        <div class="container">
          <div class="closeicon" @click="handleDialogClose">×</div>
          <div class="box1">

            <div class="weather">
                <img src="../../../assets/images/poleDetail/frame-five.png" alt="" style="position:absolute;top:3%;right:18%;width:57vw" />
              <div v-if="weather.id!=null" class="bottom">

                <div class="item">
                      <span style="font-size:2.5vh;margin-left:-1vw;width:2vw;margin-top:-1vh;position:absolute;right:10vw;color:#fff;user-select:none;">气象</span>
                  <div class="left">
                    <img src="../../../assets/images/poleDetail/temperature.png" alt="" />
                  </div>
                  <div class="right">
                    <div class="title">温度</div>
                    <div class="value">{{ weather.temperture }}
                      <span>℃</span>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="left">
                    <img  src="../../../assets/images/poleDetail/humidity.png" alt="" />
                  </div>
                  <div class="right">
                    <div class="title">湿度</div>
                    <div v-if=" weather.humidity >=30 && weather.humidity<=60"  class="value" style="color:rgb(19,206,102)">{{ weather.humidity }}
                       <span>%</span>
                    </div>
                    <div v-else class="value" style="color:rgb(230,162,60)">{{ weather.humidity }}
                       <span>%</span>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="left">
                    <img src="../../../assets/images/poleDetail/noise.png" alt="" />
                  </div>
                  <div class="right">
                    <div  class="title">噪音</div>
                    <div v-if="weather.noise<=55" class="value" style="color:rgb(19,206,102)">{{ weather.noise }}
                       <span>dB</span>
                    </div>
                     <div v-else-if="weather.noise>55 && weather.noise <=70" class="value" style="color:rgb(230,162,60)">{{ weather.noise }}
                       <span>dB</span>
                    </div>
                     <div v-else-if="weather.noise>70" class="value" style="color:red">{{ weather.noise }}
                       <span>dB</span>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="left">
                    <img src="../../../assets/images/poleDetail/pm2.5.png" alt="" />
                  </div>
                  <div class="right">
                    <div class="title">PM2.5</div>
                    <div v-if="weather.pm2<=75" class="value2" style="color:rgb(19,206,102)">{{ weather.pm2 }}
                      <span>μg/m³</span>
                    </div>
                      <div v-else-if="weather.pm2>=75 && weather.pm2<=120" class="value2" style="color:rgb(230,162,60)">{{ weather.pm2 }}
                      <span>μg/m³</span>
                    </div>
                      <div v-else-if="weather.pm2>=120" class="value2" style="color:red">{{ weather.pm2 }}
                       <span>μg/m³</span>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="left">
                    <img src="../../../assets/images/poleDetail/pm10.png" alt="" />
                  </div>
                  <div class="right">
                    <div class="title">PM10</div>
                    <div v-if="weather.pm10<=75" class="value2" style="color:rgb(19,206,102)">{{ weather.pm10}}
                       <span>μg/m³</span>
                    </div>
                    <div v-else-if="weather.pm10>75 && weather.pm10<=120" class="value2" style="color:rgb(230,162,60)" >{{ weather.pm10}}
                       <span>μg/m³</span>
                    </div>
                    <div v-else-if="weather.pm10>120" class="value2" style="color:red">{{ weather.pm10}}
                       <span>μg/m³</span>
                    </div>
                  </div>
                </div>
                <div style="width:15vw;margin-top:19px;position: relative;left: 7%;top:-2%">
                  <span style="color:#fff;font-size:1.3em;font-weight:400;">气象指数</span>
                      <div class="excellent" v-if="this.countcolor===0">
                      <span>优</span></div>
                      <div class="excellent" v-if="this.countcolor===1">
                      <span >良</span></div>
                      <div class="good" v-else-if="this.countcolor===2">
                      <span >轻度</span></div>
                       <div class="good" v-else-if="this.countcolor===3">
                      <span >中度</span></div>
                      <div class="bad" v-else-if="this.countcolor===4">
                      <span >重度</span></div>
                </div>
              </div>
              <div v-else class="weather-none">暂无气象组件</div>
            </div>
            <div class="broadcast">
              <div class="brotitle">
                <span>广播音柱</span>
              </div>
              <div v-if="broadcast.id!=null" class="top">
                <div>
                  在线状态：
                   <div class="broadcastStatus">
                  <img v-if="broadcast.status === '1'" src="../../../assets/images/poleDetail/btn-online.png" alt="">
                  <span v-if="broadcast.status === '1'" >在线</span>
                  <img v-if="broadcast.status === '2'" src="../../../assets/images/poleDetail/btn-offline.png" alt="">
                  <span v-if="broadcast.status === '2'" >离线</span>
                </div>
                </div>
              </div>
              <div v-if="broadcast.id!=null" class="center">
                <div class="left">
                  <img src="../../../assets/images/broast.png" alt="" />
                  <div class="music">
                    <div class="name">
                    </div>
                  </div>
                </div>
                <div class="right"></div>
              </div>
              <div v-if="broadcast.id!=null" class="bottom">
                <div class="voice">
                  <span>音量</span>
                </div>
                <div class="slider">
                  <el-slider @change="changevolume" v-model="value1" :step="10"></el-slider>
                </div>
              </div>
              <div v-else class="broadcast-none">暂无广播组件</div>
            </div>
          </div>
          <div class="box2">
            <div class="led" v-loading="ledImgLoading"
            element-loading-spinner="el-icon-loading">
             <el-button v-loading="musicLoading"   element-loading-text="加载中"
             type="primary" sizi="mini" class="musicstart" @click="startMusic" v-if="broadcast.id!=null">
                  {{this.ifBoFang === true ? '试听' : '停止'}}
                </el-button>
                <!-- <img src="../../../assets/images/poleDetail/line.png" alt=""> -->
              <div class="LEDp">LED大屏</div>
              <div v-if="this.baseImg===null" class="clickImg" @click="clickImgBtn">点击截图</div>
              <div v-else class="previewimages" @click="clickImgBtn">
                <img :src="baseImg" /></div>
            </div>
          </div>
          <div class="box3">
            <div class="pole">
              <img src="../../../assets/images/pole-model.png" alt="" />
            </div>
            <div class="call">
              <span>一键报警</span>
              <span class="img2">
                 <img src="../../../assets/images/index-warning.png" alt="" :class="[{'r1': changeImg}, {'r2': !changeImg}]"/>
              </span>
            </div>
          </div>
          <div class="box4">
            <div class="light" v-loading="switchLoading" :element-loading-text="text + '中'">
              <div  class="top"><span>灯光管理</span></div>
              <div v-if="light.id!=null" class="center">
                <div class="center-left">
                  <div class="spansw">开关状态:
                  </div>
                   <el-switch class="captcha-img" v-model="this.light.switchStatus" active-color="#1789f3" inactive-color="#aaa"
                @click.native="changeSwitch"   active-value="1" inactive-value="2">
              </el-switch>
                  <img v-if="light.switchStatus === '1'" src="../../../assets/images/poleDetail/opne.png" alt="">
                  <img v-if="light.switchStatus === '2'" src="../../../assets/images/poleDetail/closed.png" alt="">

                </div>
                <div class="center-right">
                  <div>在线状态:</div>
                  <img v-if="light.status === '1'" src="../../../assets/images/poleDetail/btn-online.png" alt="">
                  <span v-if="light.status === '1'" >在线</span>
                  <img v-if="light.status === '2'" src="../../../assets/images/poleDetail/btn-offline.png" alt="">
                  <span v-if="light.status === '2'" >离线</span>
                  <img v-if="light.status === '3'" src="../../../assets/images/button/status-fault.png" alt="">
                  <span v-if="light.status === '3'">故障</span>

                </div>
              </div>
              <div v-if="light.id!=null" class="bottom">
                <div class="radius">{{ value2 }}%</div>
                <div class="brightness">
                  <el-slider class="slider" @change="changeLightness" :step="10"  v-model="value2" vertical >
                  </el-slider>
                </div>
                <div class="status">
                  <div class="item">
                         <img src="../../../assets/images/stream.png" alt="" />
                    <div v-if="light.status === '1'">

                    <div v-if="light.current==0" class="value">423mA</div>
                      <div v-else class="value">{{ light.current }}mA</div>
                    <div  class="label">电流</div></div>
                  </div>
                  <div class="item">
                      <img src="../../../assets/images/voltage.png" alt="" />
                     <div v-if="light.status === '1'">

                    <div v-if="light.voltage==0" class="value">220V</div>
                    <div v-else class="value">{{ light.voltage }}V</div>
                    <div class="label">电压</div></div>
                  </div>
                  <div class="item">
                      <img src="../../../assets/images/power.png" alt="" />
                    <div v-if="light.status === '1'">

                    <div v-if="light.power==0" class="value">92W</div>
                    <div v-else class="value">{{ light.power }}W</div>
                    <div class="label">功率</div></div>
                  </div>
                  <!-- <div class="item">
                    <img src="../../../assets/images/stream.png" alt="" />
                    <div v-if="light.status !== '1'">
                    <div v-if="light.current==0" class="value">423mA</div>
                      <div v-else class="value">{{ light.current }}mA</div>
                    <div  class="label">电流</div></div>
                  </div>
                  <div class="item">
                     <div v-if="light.status !== '1'">
                    <img src="../../../assets/images/voltage.png" alt="" />
                    <div v-if="light.voltage==0" class="value">220V</div>
                    <div v-else class="value">{{ light.voltage }}V</div>
                    <div class="label">电压</div></div>
                  </div>
                  <div class="item">
                    <div v-if="light.status !== '1'">
                    <img src="../../../assets/images/power.png" alt="" />
                    <div v-if="light.power==0" class="value">92W</div>
                    <div v-else class="value">{{ light.power }}W</div>
                    <div class="label">功率</div></div>
                  </div> -->
                </div>
              </div>
              <div v-else class="weather-none">暂无灯光组件</div>
            </div>
            <div class="camera">
              <div class="top">
                <span>视频监控</span>
                <div class="yuntai"><span v-on:click="handleShowDialog">云台控制</span></div>
              </div>
              <div class="bottom">
                <WebRTCPlayer_v2 v-if="dhRTSPServer !==''" :video-id="'poleCameraVideo'+Math.random()" :video-obj="camera" :dhRTSPServer="dhRTSPServer"></WebRTCPlayer_v2>
              </div>
              <div class="kongzhi" v-if="ifShow">
                <div class="operator-other">
                  <div class="block">
                    <span class="demonstration">步长</span>
                    <el-slider :min="1" :max="8" :step="1" v-model="operateData.Iparam2"></el-slider>
                  </div>
                  <div class="operator-zoom-focus">
                    <div>
                      <el-button class="addbtn" circle v-on:click="handleOperate('addZoom')"><img :src="addZoomImg" alt=""></el-button>
                      <el-button class="subbtn" circle v-on:click="handleOperate('decZoom')"><img :src="decZoomImg" alt=""></el-button>
                    </div>
                  </div>
                </div>
                <div class="operator-direction">
                  <div class="box">
                    <el-button @mousedown.native="handleOperate('moveUp')" @mouseup.native="handleStopOperate('moveStop')">
                      <span></span>
                    </el-button>
                    <el-button @mousedown.native="handleOperate('moveRight')" @mouseup.native="handleStopOperate('moveStop')"><span></span></el-button>
                    <el-button @mousedown.native="handleOperate('moveLeft')" @mouseup.native="handleStopOperate('moveStop')"><span></span></el-button>
                    <el-button @mousedown.native="handleOperate('moveDown')" @mouseup.native="handleStopOperate('moveStop')"><span></span></el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <div class="line1"></div>
            <div class="line2"></div>
          <div class="poleName">{{this.poleName}}</div>
        </div>

      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getPole } from "@/api/base/pole";
import { getImg } from "@/api/led/ledApi";
import { startMusic ,changeMusicVolume ,stopMusci ,previewListen} from '@/api/broadcast/broadcastApi'
import WebRTCPlayer_v2 from "../../camera/components/WebRTCPlayer_v2";
import DialogLine from "@/assets/images/camera/video_dialog_line.png";
import addZoomImg from "@/assets/images/camera/addZoom.png";
import decZoomImg from "@/assets/images/camera/decZoom.png";
// import "@/assets/styles/poleIndex.scss"
export default {
  name: "Dialog",
  props: {
    DialogVisibleFlag: {
      type: Boolean,
      required: true,
      default: false,
    },
    lightComponent: {
      required: false,
    },
    weatherComopnent: {
      required: false,
    },
    broadcastComponent: {
      required: false,
    },
    cameraComponent: {
      required: false,
    },
    ledComponent: {
      require: false,
    },
  },
  components: {
    WebRTCPlayer_v2,
  },
  data() {
    return {
      changeImg:false,
      firstChange:false,
      poleName:'',
      musicLoading:false,
      taskId:'',
      ifBoFang:true,
      ifShow: false,
      controls: false,
      DialogLine: DialogLine,
      addZoomImg: addZoomImg,
      decZoomImg: decZoomImg,
      dhRTSPServer:'',
      thisDialogVisible: false,
      value: true,
      value1: 0,
      weather: { id: null },
      light: { id: null },
      led: { id: null },
      broadcast: { id: null },
      camera: undefined,
      Call:undefined,
      callIp:'',
      alaIp:'',
      timer: null ,
      value2: 0,
      detail: undefined,
      queryInfo:{},
      dialogVideoObj:{},
      operateData: {
        type:'else',
        operate: "",
        nChannelID: 0,
        Iparam2: 5,
      },
      isOperateAlways:false,
      operateTimeoutTimer: null,
      ledImgLoading: false,
      // led截图数据
      getScreenimg: {
        serverIp: null,
        serverPort: null,
        cardNo: null,
      },
      baseImg: null,
      cameraVideoObj: {},
      operationType:0,
      text:"",
      switchLoading:false,
       serverIP: null,
      serverPort: null,
      setTimerOut: null,
      sw:"2",
      countcolor:0,
      setTime:null,
    };
  },
  watch: {
    DialogVisibleFlag() {
      console.log(this.DialogVisibleFlag);
      this.thisDialogVisible = this.DialogVisibleFlag;
    },
    lightComponent() {
      console.log(this.lightComponent);
      console.log("灯光！！！");
      this.light = this.lightComponent;
      this.value2 = this.light.brightness;
      this.value = this.light.switchStatus === "1" ? true : false;
      console.log(this.light.id);
    },
    weatherComopnent() {
      this.weather = this.weatherComopnent;
      console.log(this.weather.id);
      this.atmocolor()
    },
    broadcastComponent() {
      this.broadcast = this.broadcastComponent;
      console.log(this.broadcast.id);
    },
    cameraComponent() {
     this.camera = this.cameraComponent;
      this.dialogVideoObj = this.cameraComponent
      let config = (this.camera.config).replace(/'/g, '"')
        let tmpconfig = JSON.parse(config)
        tmpconfig.forEach(item => {
          if (item.Tname === 'dhRTSPServer'){
            this.dhRTSPServer = item.Tvalue
          }
        })
        console.log(this.dhRTSPServer)
        this.initWs(this.dialogVideoObj)
        console.log("this.camera", this.camera);
        console.log(this.dialogVideoObj)
    },
    ledComponent() {
      this.led = this.ledComponent;
      this.getScreenimg.cardNo = this.led.cardNo;
      this.getScreenimg.serverIp = this.led.serverIp;
      this.getScreenimg.serverPort = this.led.serverPort;
      console.log(this.getScreenimg);
      console.log(this.led);
    },
  },
  created() {
  },
  mounted() {
    this.$bus.$on('poleName',res => {
      this.poleName = res
      console.log(this.poleName)
    })
    this.$bus.$on('Detail',res => {
      this.Call = res
      this.callIp = res.ip
      let that = this
      if(that.alaIp !== ''){
        if(that.callIp === that.alaIp){
          that.timer = setInterval(()=>{
            // console.log('start')
            that.changeImg = !that.changeImg
          },200);
          setTimeout(function (){
            console.log('stop')
            clearInterval(that.timer)
            that.changeImg = false
          },40000)
        }
      }
    })
    this.$bus.$on('alarmDetail',res => {
      let that = this
      that.alaIp = res
      if (that.callIp !== ''){
        if(that.callIp === res){
          that.timer = setInterval(()=>{
            // console.log('start')
            that.changeImg = !that.changeImg
          },200);
          setTimeout(function (){
            console.log('stop')
            clearInterval(that.timer)
            that.changeImg = false
          },40000)
        }
      }
    })
    this.$bus.$on('alarmStop',res => {
      console.log('停止')
      this.callIp = ''
      this.alaIp = ''
      let that = this
      clearInterval(that.timer)
      that.changeImg = false
    })
  },
  methods: {
    atmocolor(){
      console.log("dada")
      this.countcolor=0;
      if(this.weather.humidity <30 || this.weather.humidity>60){
          this.countcolor++
        }
      if(this.weather.noise>55 && this.weather.noise <=70){
           this.countcolor++
        }
      if(this.weather.pm2>=75 && this.weather.pm2<=120){
          this.countcolor++
        }
      if(this.weather.pm10>75 && this.weather.pm10<=120){
          this.countcolor++
        }
      if(this.weather.pm10>120 || this.weather.noise>70 || this.weather.pm2>120){
             this.countcolor=4
      }
        console.log(this.countcolor)
    },
    startMusic(){
      this.musicLoading=true
      this.ifBoFang = !this.ifBoFang
      if (this.ifBoFang === false){
        console.log(this.broadcast)
        let ip = this.broadcast.ip
        let config = this.broadcast.config
        let queryInfo = {
          lastTaskId: "",
          audioId: '2',
          mode:'normal_mode',
          ip: ip,
          config: config
        }
        console.log(queryInfo)
        previewListen(queryInfo).then(res => {
          this.taskId = res.msg
          this.value1 = 50
          console.log(res)
          this.musicLoading=false
        })
      }else {
        stopMusci(this.taskId).then(res => {
          console.log(res)
          this.value1 = 0
          this.musicLoading=false
        })
      }
    },
    changevolume(e){
      let volume  = e
      let queryInfo = {
        volume: volume,
        taskId: this.taskId
      }
      console.log(queryInfo)
      changeMusicVolume(queryInfo).then(res => {
        console.log(res)
      })
    },
    handleShowDialog(){
      console.log('www')
      this.ifShow = !this.ifShow
    },
    initWs(dialogVideoObj){
      let config = (dialogVideoObj.config).replace(/'/g, '"')
      let tmpconfig = JSON.parse(config)
      let ServerUrl = null
      tmpconfig.find(item => {
        if (item.Tname === 'serverUrl') {
          ServerUrl = item.Tvalue
        }
      })
      console.log(ServerUrl)
      if (window.WebSocket) {
        console.log('www')
        // this.ws = new WebSocket("ws://192.168.3.73:8033/ptzControl")
        this.ws = new WebSocket(ServerUrl)
        this.ws.onopen = this.handleWsOnOpen;         //连接建立时触发
        this.ws.onmessage = this.handleWsOnmessage;   //接收到客户端数据时触发
        this.ws.onclose = this.handleWsOnClose;       //连接关闭时触发
      } else {
        this.$message.error("你的浏览器不支持WebSocket，请更换其他浏览器！");
      }
    },
    handleWsOnOpen() {
      console.log('连接成功')
      const { username, password, channel, ip } = this.dialogVideoObj;
      this.queryInfo = {
        type:'conn',
        Username: username,
        password,
        channel,
        ip,
        port: 37777,
      };
      console.log(this.queryInfo)
      this.ws.send(JSON.stringify(this.queryInfo));
    },
    handleWsOnmessage(res) {
      console.log("handleWsOnmessage", res);
    },
    handleWsOnClose() {},
    /**
     * 云台控制的websocket发送消息的函数
     */
    handleSend(data) {
      if (data.info) {
        delete data.info;
      }
      console.log(data)
      this.ws.send(JSON.stringify(data));
    },
    handleStopOperate(operate) {
      if (this.isOperateAlways) {
        this.isOperateAlways = false;
        this.operateData.operate = `${operate}`;
        this.handleSend(this.operateData);
      } else if (!this.isOperateAlways) {
        clearTimeout(this.operateTimeoutTimer);
      }
    },
    /**
     * 云台控制的方向函数
     */
    handleOperate(operate) {
      if (!operate.includes("move")) {
        this.operateData.operate = `${operate}`;
        this.handleSend(this.operateData);
        return;
      }
      this.operateTimeoutTimer = setTimeout(() => {
        this.operateData.operate = operate.replace("move", "always");
        this.isOperateAlways = true;
        this.handleSend(this.operateData);
      }, 1000);
      this.operateData.operate = `${operate}`;
      this.handleSend(this.operateData);
    },


    getValue() {
      // this.value1 = this.detail.broadcastVolume;
    },
    click() {},
    handleDialogClose() {
      // this.ws.close()
      if (this.taskId !== ''){
        stopMusci(this.taskId).then(res => {
          console.log(res)
          this.value1 = 0
          this.ifBoFang = true
          this.musicLoading=false
        })
      }
      this.dhRTSPServer = ''
      console.log(this.light);
      this.$emit("update:DialogVisibleFlag", false);
      this.ifShow = false
      this.camera = {}
      //this.$parent.handleDialogClose()
      console.log(this.ifShow);
      this.baseImg=null;
      this.timer = null
    },

    // led截图
    clickImgBtn() {
      this.ledImgLoading = true;
      console.log(this.getScreenimg);
      getImg(this.getScreenimg).then((res) => {
        console.log(res);
         if (this.setTime !== null) {
            clearTimeout(this.setTime);
            this.setTime = null;
          }
        if (res.code === 200) {
          if (res.msg === null) {
            this.ledImgLoading = false;
            this.$message.error("获取截图失败！");
          } else {
            this.ledImgLoading = false;
            this.baseImg = "data:image/png;base64," + res.msg;
            console.log(this.baseImg);
          }
        }
      });
      console.log("求求了！")
      this.setTime = setTimeout(()=>{
          this.ledImgLoading = false;
            this.setTime = null;
            this.msgError("连接失败");
      },3000)
    },
    //灯光亮度调节
    changeLightness(ev) {
      console.log(ev);
      this.operationType = 1;
      this.text = "亮度调节中";
      this.switchLoading = true;
      if (this.value2 === 0) {
        this.light.switchStatus = "2";
      } else {
        this.light.switchStatus = "1";
      }
      console.log(this.value2);
      var message = {
        type: "1",
        uid: this.light.uid.toString(),
        brightness: this.value2.toString(),
      };
      this.send(JSON.stringify(message));
      console.log('1112312321gggg');
      console.log(' this.value2.toString()');
    },

    changeSwitch() {
      this.operationType = 0;
       console.log("12321管");
       console.log(this.light.switchStatus);
      this.light.switchStatus === "1"
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
        if (this.light.switchStatus === "1") {
          let message = {
            type: "1",
            uid: this.light.uid.toString(),
            brightness: "0",
            switchStatus: "1",
            updateTime:this.light.updateTime
          };
          this.send(JSON.stringify(message));
          console.log(JSON.stringify(message));
          console.log("guan");
          this.sw==='1';
        } else {
          let message = {
            type: "1",
            uid: this.light.uid.toString(),
            brightness: "50",
            switchStatus: "2",
            updateTime:this.light.updateTime

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
      console.log(this.light.switchStatus);
      let that = this;
      if (window.WebSocket) {
        var socket = new WebSocket(
          `ws://${this.light.configServerIp}:${this.light.configServerPort}/hello2`,
          // `ws://192.168.3.30:2002/hello2`
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
            that.value2 = 0;
            console.log(this);
            that.light.switchStatus = "2";
            // that.$message({
            //   showClose: true,
            //   message: that.operationType === 1 ? "调光成功" : "关灯成功",
            //   type: "success",
            // });
          } else {
            console.log(this);
            that.light.switchStatus = "1";
            that.value2 = parseInt(ev.data);
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
     },

};
</script>
<style lang="scss" scoped>
.call{
  width: 46%;
  height: 25%;
  padding-top: 5%;
  padding-left: 8%;
  font-size: 1.8em;
  position: absolute;
  background: url("../../../assets/images/poleDetail/frame-two.png");
  background-size: 100% 100%;
  top: 67%;
  left: 54%;
  color: white;
  .img2{
    transform:rotate(-5deg);
    position: relative;
    top: 5%;
    left: -35%;
  }
  .r1 {
    transform:rotate(-6deg);
  }
  .r2 {
    transform:rotate(3deg);
  }

}
.poleName{
  position: fixed;
  left: 15%;
  top: 8%;
  color: white;
  font-size: 1.8rem;
}
.musicstart{
  position: fixed;
  left: 70%;
  top: -33.5%;
}
.kongzhi{
  width: 400px;
  height: 40.5vh;
  position: relative;
  left: 102%;
  top: -110%;
  border: 2px solid rgb(35,120,199);
  border-radius: 3%;
  background-color: rgb(5,25,85);
  z-index: 1000;
}
.operator-other {
  position: relative;
  width: 20vw;
  height: 20vh;
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .operator-zoom-focus,
  .block {
    width: 19vw;
    display: flex;
    //flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 1.8rem;
    color: rgba(149, 196, 242, 1);
    .el-slider {
      width: 10vw;
    }
    .addbtn{
      position: relative;
      left: -180%;
    }
    .subbtn{
      position: relative;
      left: 180%;
      ::v-deep span{
        position: relative;
        top: -165%;
      }
    }
    .el-button {
      width: 50px;
      height: 50px;
      margin: 0 10px;
      background-color: transparent;
      color: white;
      border: none;
      outline: none;
      font-size: 1em;
      img {
        width: 100%;
        height: 100%;
      }
    }

    div {
      display: flex;
      flex-direction: column;
    }
  }

  .block {
    flex-direction: row;
  }
}
.operator-direction {
  position: absolute;
  top: 25%;
  left: 9%;
  width: 13vw;
  height: 13vw;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #a3a3a3;
  font-size: 0;
  margin-left: 30px;
  background: #ececec;
  //background: no-repeat url("../../../assets/images/camera/video_dialog_bg.png");
  background-size: 100% 100%;
  z-index: 1000;
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 11vw;
    height: 11vw;
    border-radius: 50%;
    overflow: hidden;

    div,
    .el-button {
      margin: 0;
      padding: 0;
      position: absolute;
      width: 5.5vw;
      height: 5.5vw;
      border-radius: 5.5vw 0 0 0;
      overflow: hidden;
      transform-origin: 5.5vw 5.5vw;
      background-color: rgba(234, 238, 238, 0.9);
      border: 1px solid rgba(54, 53, 53, 0.3);
      z-index: 100000;

      &:nth-child(2) {
        transform: rotate(90deg);
      }

      &:nth-child(3) {
        transform: rotate(-90deg);
      }

      &:nth-child(4) {
        transform: rotate(-180deg);
      }

      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        display: block;
        width: 0;
        height: 0;
        border: 15px solid;
        border-color: transparent transparent rgba(149, 151, 151, 0.8);
      }
    }

    div:hover span,
    .el-button:hover span {
      width: 0;
      height: 0;
      border: 15px solid;
      border-color: transparent transparent rgba(111, 187, 248, 0.8);
    }
  }
}
.dialog-box {
  background: url("../../../assets/images/poleDetail/poleDetail_bg.png");
  background-size: 100% 100%;
  height: 89vh;
  top: -6vh;
  position: relative;


  .container {
    height: 100%;
    width: 100%;
    display: flex;
    padding: 0vh 1vw 1vh;

    .box1,
    .box2,
    .box3,
    .box4 {
      height: 100%;
      //   border: 1px solid #eee;
      //   margin-top: 4vh;
    }

    .box1 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 5vh 0;
      width: 27%;
      height: 80vh;
      position: relative;
      left: 71%;

      .broadcast {
        position: relative;
        top: -51%;
        width: 82%;
        height: 40.5%;
        background: url("../../../assets/images/poleDetail/frame-one.png");
        background-size: 100% 100%;
      }

      .weather {
        width: 10vw;
        height: 10vh;
        .bottom {
          width: 54vw;
          //height: 26vh;
          display: flex;
          flex-direction: row;
          position: relative;
          left: -40vw;
          top: -3vh;

          .item {
            position: relative;
            width: 50%;
            height: 6vh;
            margin-top: 2vh;
            left: 7%;
            display: flex;

            .left {
              position: relative;

              img {
                position: absolute;
                left: 50%;
                top: 40%;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 110%;
                margin: auto;
              }

              //   position: absolute;
              width: 30%;
              height: 100%;

              z-index: 10000;
            }

            .right {
              margin-left: -1vw;
              display: flex;
              flex-direction: column;
              width: 70%;
              height: 100%;

              .title {
                height: 26%;
                text-align: center;
                color: #fff;
                margin-left: -2vw;
                font-size: 1.3em;
              }

              .value {
                margin-top: 3px;
                color: rgb(37, 120, 320);
                // color: #fff;
                font-size: 2em;
                height: 60%;
                margin-left: 5px;
                line-height: 160%;
                align-items: center;
                text-align: center;
                // border: 1px solid rgb(35, 57, 131);
                &>span{
                  font-size: 0.7em;
                  color: #fff;
                }
              }
             .value2{
                margin-top: 3px;
                color: rgb(37, 120, 320);
                // color: #fff;
                font-size: 2em;
                height: 60%;
                line-height: 160%;
                align-items: center;
                text-align: center;
                // border: 1px solid rgb(35, 57, 131);
                &>span{
                  font-size: 0.76em;
                  color: #fff;
                }
             }
            }
          }
        }

        .weather-none {
          font-size: 2em;
          color: rgb(54, 64, 206);
          width: 100%;
          height: 100%;
          display: flex;
          position: absolute;
          right: 18vw;
          bottom: -5vh;
        }
      }

      .broadcast {
        padding: 4vh 4vh 2vh;
        .top {
          width: 100%;
          height: 15%;
          font-size: 1.1em;
          color: #fff;
        }
.broadcastStatus{
  position: relative;
  img{
    position: relative;
    top: -2.4vh;
    left: 5vw;

  }
  span{
     position: relative;
    top: -3vh;
    left: 2.7vw;
  }
}
        .center {
          height: 40%;

          .left {
            display: flex;
            justify-content: space-around;
            height: 100%;

            img {
              height: 100%;
            }
          }

          .music {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .icon-box {
              span {
                margin-left: 1vw;
                display: inline-block;
                width: 4vw;
                text-align: center;
                border-radius: 1vh;
                background-color: #fff;
                color: black;

              }
              cursor: pointer;
            }

            .name {
              text-align: center;
              margin-top: 1vh;
              color: rgb(27, 56, 182);
            }
          }
        }

        .bottom {
          display: flex;
          width: 100%;
          align-items: center;

          .voice {
            align-items: center;
            color: #fff;
            font-size: 1.1em;
            width: 20%;

            .voice-icon {
              font-size: 2em;
            }
          }

          .slider {
            width: 70%;
          }
        }

        .broadcast-none {
          font-size: 2em;
          color: rgb(54, 64, 206);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 14vh;
        }
      }
    }

    .box2 {
      height: 80vh;
      width: 23%;
      position: relative;
      left: 41%;

      .led {
        z-index: 111;
        position: absolute;
        left: 60%;
        top: 41vh;
        // top:46.5vh;
        bottom: 1vh;
        transform: translate(-50%, 0);
        width: 81%;
        height: 55%;
        // height: 50%;
        background-color: aqua;
        background: url("../../../assets/images/poleDetail/led-borderTop2.png") no-repeat;
        background-size: 100% 100%;
        .LEDp{
          color:#fff ;
          font-size: 1.8em;
          position: relative;
          top: -0.3vh;
          left: 2.3vw;
          // cursor: default;
          user-select:none;
        }
      }

      .clickImg {
        cursor: pointer;
        position: relative;
        top: 15vh;
        left: 4.8vw;
        color: #fff;
        font-size: 2em;
      }

      .previewimages {
        position: absolute;
        border: 1px solid;
        top: 4.9vh;
        left: 2.2vw;
        width: 12vw;
        height: 39vh;
        z-index: 2222;
        border: none;
         clip:rect(0px,214px,415px,0px);
        img{
           width: 92%;
           height: 93%;

        }
      }
    }

    .box3 {
      width: 20%;
      position: relative;
      left: -44%;
      top: 6vh;

      .pole {
        width: 100%;
        z-index: 1000;
        height: 100%;

        img {
          width: 80%;
          height: 78vh;
        }
      }
    }

    .box4 {
      height: 80vh;
      left: -40%;
      position: relative;
      width: 30%;
      // display: flex;
      padding: 6vh 0;
      // flex-direction: column;
      // justify-content: space-around;

      .light,
      .camera {
        // background-color: #3f67bd29;
        // border: 2px solid rgb(54, 70, 212);
        // border-radius: 2vh;
        background: url("../../../assets/images/poleDetail/frame-one.png") no-repeat;
        background-size: 100% 100%;
        width: 96%;
        height: 38%;
      }

      .light {
        //边框
        padding: 2vh 2vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        top: 5vh;
        width: 33.7vw;
        height: 32vh;
        left: -2.8vw;

        .top {
          height: 20%;
          line-height: 100%;
          font-size: 2.5vh;
          color: #ffffff;
          span {
            display: inline-block;
            margin-left: 15%;
            user-select:none;
          }
        }

        .center {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          font-size: 1.1em;
          color: #fff;
          left: -1vw;
        }
        .center-left,.center-right{
          .spansw{
            width: 4vw;
          }
           display: flex;
          flex-direction: row;
          img{
            height: 3vh;
            position: relative;
            left: 1vw;
            top: -0.3vh;
          }

        }
        .center-right{
          height: 2vh;
           &>span{
            position: relative;
            left: -17%;
            top: 3%;

          }
        }

        .bottom {
          display: flex;
          justify-content: space-around;
          width: 100%;
          height: 50%;

          .radius {
            position: relative;
            left: 1vw;
            width: 12vh;
            height: 12vh;
            text-align: center;
            line-height: 12vh;
            font-size: 1.5em;
            color: #fff;
            // border: 1px dotted rgb(50, 33, 206);
            // border-radius: 50%;
            // box-shadow: 0px 0px 15px rgb(27, 55, 218);
            background: no-repeat url('../../../assets/images/poleDetail/decorate.png');
            background-size: 100% 100%;

          }

          .brightness {
            height: 100%;
        position: relative;
        top: -1vh;
        left: -1vw;
            .slider {
              height: 100%;
            }
          }

          .status {
            height: 100%;
            width: 45%;
            display: flex;
            justify-content: space-between;

            .item {
              width: 26%;
              height: 100%;
              background: url("../../../assets/images/bucket.png");
              background-size: 100% 100%;
              display: flex;
              justify-content: space-around;
              padding: 1vh 0;
              flex-direction: column;
              text-align: center;

              img {
                // height: 30%;
                width: 60%;
                margin: 0 auto;
              }

              .value {
                color: aqua;
                font-size: 1.1em;
              }

              .label {
                color: #fff;
                font-size: 0.8em;
              }
            }
          }
        }

        .weather-none {
          font-size: 2em;
          color: rgb(54, 64, 206);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .camera {
          padding: 2vh 2vh;
          background: url("../../../assets/images/poleDetail/frame-three.png") no-repeat;
          background-size: 100% 100%;
          width: 34vw;
          height: 43vh;
          position: relative;
          left: -3vw;
          top: 6vh;
        .top {
          height: 20%;
          line-height: 50%;
          font-size: 2.5vh;
          color: #ffffff;
          span {
            display: inline-block;
            margin-left: 15%;
             user-select:none;
          }
          .yuntai{
            position: relative;
            left: 81.5%;
            top: 12%;
            font-size: 1.2rem;
            user-select: none;
            cursor: pointer;
            margin-right: 40px;
            width: 5.4vw;
            height: 3.2vh;
            line-height: 2.6vh;
            text-align: center;
            border-radius: 5px;
            border-style: outset;
            border-width: 3px;
            border-color: #0f6f97;
            box-shadow: 0 0 10px #243c47;
            span{
              position: relative;
              left: -8%;
            }
          }
          .yuntai:hover{
            box-shadow: 0 0 10px #17619a;
          }
        }
        .bottom {
          position: relative;
          top: -2.5vh;
          left: 0.5vw;
          height: 86% !important;
          width: 97%;
          background-color: rgb(3, 11, 44);

          border: 6px solid rgb(35, 120, 199);
          border-radius: 1vh;
        }
      }
    }
  }
}

.dialog ::v-deep .el-dialog {
  height: 94%;
  width: 85%;
}
.dialog {
  .el-dialog__wrapper {
    background-color: rgba(0, 0, 0, 0.6);
  }
}
.closeicon {
  position: absolute;
  font-size: 3.5em;
  color: rgb(173, 170, 170);
  top: 0.5vh;
  right: 2vh;
  color: #fff;
  cursor: pointer;
}
.line1{
  width: 6vw;
  height: 4vw;
  left: 16vw;
  top: 11vh;
  position: absolute;
  background: no-repeat url('../../../assets/images/poleDetail/line-one.png');
  background-size: 100% 100%;
}
.line2{
  width: 11vw;
  height: 18vw;
  left: 12vw;
  top: 25vh;
  position: absolute;
  background: no-repeat url('../../../assets/images/poleDetail/line-two.png');
  background-size: 100% 100%;
}
.brotitle{
  margin-bottom: 1.3vw;
  span{
    color:#ffffff ;
    font-size: 1.8em;
    position: relative;
    top: -3.5vh;
    right: 0.7vw;
  }
}
 .excellent {
        background-color: rgb(18, 156, 18);
        font-size: 1.25em;
          color: #fff;
          font-weight: 400;
          margin-top: 10px;
          text-align: center;
          border-radius: 11%;
          width: 4vw;

      }
      .good {
        background-color: rgb(235, 192, 113);
        font-size: 1.25em;
         color: #fff;
         font-weight: 400;
          margin-top: 10px;
         text-align: center;
         border-radius: 11%;
          width: 4vw;
      }
      .bad {
        background-color: red;
        font-size: 1.25em;
           color: #fff;
           font-weight: 400;
             margin-top: 10px;
           text-align: center;
           border-radius: 11%;
            width: 4vw;
      }
</style>
