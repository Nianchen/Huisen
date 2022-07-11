<template>
  <div>
    <Dialog :position="position" :title="title" @handleDialogClose="cancel" :DialogVisibleFlag.sync="thisDialogVisibleFlag">
      <div v-loading="loading" class="dialogbox">
        <!-- <div class="poleDetail"> -->
        <el-form :model="detail" class="poleDetail" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="6" :offset="6">
              <el-form-item label="灯杆名称:">
                <span class="poleLabel">{{detail.name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="6">
              <el-form-item label="区域名称:">
                <span class="poleLabel">{{detail.deptName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="20" :offset="6">
              <el-form-item label="灯杆地址:">
                <span class="poleLabel">{{detail.address}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- 装饰线 -->
        <div class="line_up"></div>
        <div class="line_down"></div>
        <!-- </div> -->
        <div class="form-bottom">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row :gutter="14">
            <el-col :span="12">
              <el-form-item label="类型" prop="type">
                <el-select popperClass="ic-pagination" style="width:9vw" v-model="form.type" placeholder="请选择类型" @change="typeChange">
                  <el-option v-for="dict in typeOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="厂商" prop="providerId">
                <el-cascader popperClass="ic-pagination" style="width:10.5vw" v-model="queryParams.type" :options="providerModelData"
                  @change="provederChange" ref="cascader">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称">
                <el-input v-model="form.name" placeholder="请输入名称" />
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="isShowForm">
              <el-form-item v-for="(item, index) in config" :key="index" :label="item.Tlabel">
                <el-input v-model="item.Tvalue" :placeholder="'请输入'+item.Tlabel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <div class="testAndAddBtn">
                  <!-- 灯光 -->
                  <div v-if="form.type === '1'">
                    <el-button class="testbtn" v-if="changeBtn != 1" type="primary" @click="lightTest" :loading="lightLoading">
                      <span v-if="lightLoading">测试中</span>
                      <span v-else>连接测试</span>
                    </el-button>
                    <el-button class="saveBtn" v-if="changeBtn === 1" type="primary" @click="saveLight" :loading="lightsaveLoading">
                        <span v-if="lightsaveLoading">保存中</span>
                        <span v-else>保存</span>
                    </el-button>
                  </div>

                  <!-- 气象 -->
                  <div v-else-if="form.type === '2'">
                    <el-button class="testbtn" type="primary" v-if="changeBtn === 0" @click="atmosphereTest" :loading="lightLoading">
                       <span v-if="lightLoading">测试中</span>
                      <span v-else>连接测试</span>
                    </el-button>
                    <el-button class="saveBtn" v-else type="primary" @click="atmosphereSave" :loading="lightsaveLoading">
                        <span v-if="lightsaveLoading">保存中</span>
                        <span v-else>保存</span>
                    </el-button>
                  </div>
                  <!-- 摄像头 -->
                  <div v-else-if="form.type === '3'">
                    <el-button class="testbtn" v-if="changeBtn === 0" type="primary" @click="handleTestCamera" :loading="isTestLoading">
                      <span v-if="isTestLoading">测试中</span>
                      <span v-else>测试</span>
                    </el-button>
                    <el-button class="saveBtn" v-else type="primary" :loading="isSaveLoading" @click="handleAddCamera">
                      <span v-if="isSaveLoading">保存中</span>
                      <span v-else>保存</span>
                    </el-button>
                  </div>

                  <!-- led组件新增 -->
                  <div v-else-if="form.type === '4'">
                    <el-button class="testbtn" v-if="changeBtn == 0" type="primary" @click="ledTest" :loading='testLoading'>
                      连接测试
                    </el-button>
                    <el-button class="saveBtn" v-else type="primary" @click="ledAdd" :loading='saveLoading'>
                      保存
                    </el-button>
                  </div>

                  <!-- 广播 -->
                  <div v-else-if="form.type === '5'">
                    <el-button class="testbtn" v-if="changeBtn == 0"  @click="braodcasTest" :loading='testLoading'>
                      连接测试
                    </el-button>
                    <el-button class="saveBtn" v-else type="primary" @click="braodcastAdd" :loading='saveLoading'>
                      保存
                    </el-button>
                  </div>

                  <!-- 一键报警 -->
                  <div v-else-if="form.type === '6'">
                    <el-button class="testbtn" v-if="changeBtn == 0" type="primary" :loading="isTestLoading" @click="warningTest">
                      <span v-if="isTestLoading">测试中</span>
                      <span v-else>测试</span>
                    </el-button>
                    <el-button class="saveBtn" type="primary" :loading="isSaveLoading" @click="warningSave" v-else>
                      <span v-if="isSaveLoading">保存中</span>
                      <span v-else>保存</span>
                    </el-button>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import Dialog from "@/views/light/component/Dialog";
import { getProviderModelData } from "@/api/base/component";
import { addLampComponent } from "@/api/lamp/lampComponent";
// import WsConnection from "@/utils/websocket";
import Socket from "@/utils/socket";
import { addCameraComponent } from "@/api/camera/component";
import { addLed, closeProgram } from "@/api/led/ledApi";
import { addBroadCast, testBroadCast } from "@/api/broadcast/broadcastApi";
import { addWarning, testWarning } from "@/api/call/component";
import { addWeatherComponent } from "@/api/weather/weatherComponent";
import { GbPlayer } from "@/utils/GbPlayer";
import WebRtcPlayer from "@/utils/WebRTC";
import { listAllConfig } from "@/api/system/config";

export default {
  props: {
    title: {
      required: true,
    },
    DialogVisibleFlag: {
      type: Boolean,
      required: true,
      default: false,
    },
    type: {
      require: false,
    },
    addDetail: {
      require: true,
    },
  },
  components: { Dialog },
  data() {
    return {
      lightLoading:false,
      lightsaveLoading:false,
      ifshow: false,
      isShowForm: false,
      wsConnection: this.$store.getters.socketConnection,
      thisDialogVisibleFlag: false,
      providerModelData: [],
      form: {},
      queryParams: {},
      rules: {},
      ids: "",
      deptOptions: undefined,
      position: {
        percentWidth: "44%",
        vWidth: "50vw",
        topTitle: "3%",
        leftTitle: "12%",
      },
      typeOptions: [],
      list: [],
      config: {},
      changeBtn: 0,
      isResponse: "",
      detail: "",
      testForm: { config: {} },
      addBroadCast: {},
      broadform: {
        config: {},
        configs: {},
      },
      atmosphere: { config: {} },
      loading: false,
      ws: null,
      atmo1:{},
      tmpconfig:{},
      isTestLoading: false,
      isSaveLoading: false,
      saveLoading: false,
      testLoading: false,
      serverIp: null,
      serverPort: null,
      humidity:null,
      temperture:null,
      Trusted:true,
    };
  },
  watch: {
    DialogVisibleFlag() {
      this.thisDialogVisibleFlag = this.DialogVisibleFlag;
    },
    addDetail() {
      console.log(this.addDetail);
      this.detail = this.addDetail;
    },
  },
  created() {
    this.getDicts("component_type").then((response) => {
      this.typeOptions = response.data;
    });
  },
  beforeDestroy() {
    this.DialogVisibleFlag = false;
  },
  methods: {
    handleTestCamera() {
      this.isTestLoading = true;
      let config = [];
      console.log(this.config);
      this.config.forEach((item) => {
        config.push({
          [item.Tname]: item.Tvalue,
        });
      });
      let obj = Object.assign(...config);
      console.log(obj);
      if (
        !/^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/.test(
          obj.ip
        )
      ) {
        this.$message.error("请输入正确的ip地址!");
        this.isTestLoading = false;
        return;
      }

      this.form = Object.assign(this.form, obj);
      let operate = {
        operate: "alwaysLeft",
        nChannelID: 0,
        Iparam2: 6,
      };
      const { username, password, channel, ip } = this.form;
      let opoperateLogin = {
        type:'test',
        Username: username,
        password,
        // channel,
        ip,
        port: 37777,
        nChannelID: 0,
        Iparam2: 5,
      };
      // opoperateLogin = {
      //   type:'test',
      //   Username: username,
      //   password,
      //   channel,
      //   ip,
      //   port: 37777,
      // };
      // let opoperateLogin = {
      //   info: {
      //     username: this.form.username,
      //     password: this.form.password,
      //     channel: this.form.channel,
      //     ip: this.form.ip,
      //     port: this.form.port,
      //   },
      //   operate: "moveLeft",
      //   nChannelID: 0,
      //   Iparam2: 1,
      // };
      if (window.WebSocket) {
        // let wsUrl = this.form.serverUrl;
        let socket = new WebSocket(this.form.serverUrl);
        // console.log(this.form.serverUrl);
        // let socket = new WebSocket("ws://192.168.3.122:8033/ptzControl")
        let that = this;
        //相当于连接开启(感知到连接开启)
        socket.onopen = (ev) => {
          console.log("链接成功");
          console.log(ev);
          socket.send(JSON.stringify(opoperateLogin));
          // setTimeout(() => {
          //   socket.send(JSON.stringify(operate));
          // }, 1000);
          // setTimeout(() => {
          //   socket.send(
          //     JSON.stringify({
          //       operate: "moveStop",
          //       nChannelID: 0,
          //       Iparam2: 6,
          //     })
          //   );
          //   this.$confirm("摄像头是否转动？", "提示", {
          //     confirmButtonText: "已转动",
          //     cancelButtonText: "未转动",
          //     type: "warning",
          //   })
          //     .then(() => {
          //       this.changeBtn = 1;
          //     })
          //     .catch(() => {
          //       this.$message.error("请检查信息是否填写正确！");
          //     });
          // }, 6000);
          let that = this
          socket.onmessage = function (ev){
            const data = JSON.parse(ev.data)
            console.log(data)
            if (data.info !== '连接成功'){
              if (data.info === '测试成功'){
                that.changeBtn = 1
                that.isTestLoading = false
                that.$message.success('测试成功')
              }
              else {
                that.isTestLoading = false
                that.$message.error('测试失败，请检查')
              }
            }
          }
        };
        //相当于连接关闭(感知到连接关闭)
        socket.onclose = function (ev) {
          console.log("连接关闭");
        };
      } else {
        alert("当前浏览器不支持websocket");
      }
    },
    handleAddCamera(form) {
      this.isSaveLoading = true;
      //this.gbPlayer = new GbPlayer();
      // let uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      //   (
      //     c ^
      //     (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      //   ).toString(16)
      // );
      let config = [];
      console.log(this.config);
      this.config.forEach((item) => {
        config.push({
          [item.Tname]: item.Tvalue,
        });
      });
      console.log(config);
      let RTSPServer = ''
      RTSPServer = config[11].dhRTSPServer
      let obj = Object.assign(...config);
      this.form = Object.assign(this.form, obj);
      this.form.config = JSON.stringify(this.config).replace(/\"/g, "'");
      this.form.deptId = this.addDetail.deptId;
      this.form.poleId = this.addDetail.id;
      this.form.componentId = this.providerModelData[0].value;
      this.form.groupId = 100;
      this.form.status = "1";
      // this.form.uuid = uuid;
      console.log(this.form);
      // let rtspUrl = `rtsp://${this.form.username}:${this.form.password}@${this.form.ip}/cam/realmonitor?channel=1&subtype=0`
      // console.log(rtspUrl)
      addCameraComponent(this.form)
        .then((response) => {
          console.log(response)
          listAllConfig().then((response) => {
            // this.initWs(response.data.hkCallServer)
            this.gbPlayer = new GbPlayer(response.data.dhVideoViewServer);
            this.gbPlayer.getStreams();
          });
          if (response.code === 200) {
            WebRtcPlayer.setServer(RTSPServer); //TODO: 添加WEBRTC服务器地址
            WebRtcPlayer.addStream(this.form.ip + "@dh");
            this.$message.success("保存成功");
            this.$bus.$emit('chenggong',true)
            this.thisDialogVisibleFlag = false;
            return
          }
        })
      this.isSaveLoading = false;
        // .then((res) => {
        //   if (res.code === 200) {
        //     this.$message.success("保存成功");
        //     this.thisDialogVisibleFlag = false;
        //   }
        // })
        // .catch((err) => {
        //   this.$message.error(err);
        // })
        // .finally(() => {
        //   this.isSaveLoading = false;
        // });
    },
    handleDialogClose() {
      // this.$parent.getList();
      this.form = {};
      this.config = {};
      this.saveLoading = false;
      this.providerModelData=[]
      this.changeBtn = 0;
      this.$emit("update:DialogVisibleFlag", false);
    },
    cancel() {
      // 重置表单
      this.form = {};
      this.config = {};
      this.$parent.getList();
      this.isTestLoading = false;
      this.isSaveLoading = false;
      this.$emit("cancelAdd", false);
    },
    //厂商和型号
    getProviderModelData() {
      this.queryParams.type = this.form.type;
      console.log(this.queryParams);
      getProviderModelData(this.queryParams).then((response) => {
        this.providerModelData = response.data;
        console.log("providerModelData=", this.providerModelData);
      });
    },
    //类型选择变换
    typeChange() {
      var list = [];
      this.isShowForm = false
      console.log('1')
      this.getProviderModelData();
      // this.config=false
    },
    //厂商变化获取配置参数
    provederChange(value) {
      // 获取label 值
      console.log('2')
      this.isShowForm = true
      let config = this.$refs["cascader"].getCheckedNodes()[0].data.config;
      this.config = JSON.parse(JSON.stringify(config));
    },
    lightTest() {
      this.lightLoading=true;
      let config = [];
      console.log(this.config);
      this.config.forEach((item) => {
        config.push({
          [item.Tname]: item.Tvalue,
        });
      });
      let obj = Object.assign(...config);
      this.form = Object.assign(this.form, obj);
      this.serverIP = this.form.configServerIp;
      this.serverPort = this.form.configServerPort;
      let message = {
        type: "1",
        uid: this.form.uid,
        brightness: "0",
        switchStatus: "1",
      };
      this.send(JSON.stringify(message));
    
    },
    saveLight() {
      this.lightsaveLoading=true;
      let config = [];
      console.log(this.config);
      this.config.forEach((item) => {
        config.push({
          [item.Tname]: item.Tvalue,
        });
      });
      let obj = Object.assign(...config);
      this.form = Object.assign(this.form, obj);
      // this.form.config=this.config
      this.form.config = JSON.stringify(this.config).replace(/\"/g, "'");
      this.form.deptId = this.addDetail.deptId;
      this.form.poleId = this.addDetail.id;
      this.form.deptName = this.addDetail.deptName;
      this.form.poleName = this.addDetail.name;
      this.form.componentId = this.providerModelData[0].value;
      this.form.groupId = 100;
      this.lightsaveLoading=false;
      console.log(this.form);
      this.loading = true;
      addLampComponent(this.form).then((response) => {
        this.loading = false;
        this.msgSuccess("新增成功");
        this.$bus.$emit('chenggong',true)
        this.cancel();
      });
    },
    send(message) {
      if (window.WebSocket) {
        var socket = new WebSocket(
          `ws://${this.serverIP}:${this.serverPort}/hello2`
        );
        //相当于channelReado, ev 收到服务器端回送的消息
        let that = this;
        that.isTrusted = true;
        socket.onmessage = function (ev) {
          that.isTrusted = false;
          console.log(ev);
          that.lightLoading=false;
          that.changeBtn = 1;
          console.log(that.form);
        };
      //    if(that.isTrusted){
      //         setTimeout(()=>{
      //             that.$message.error("测试未通过");
      //         },4000)
      //  }
        //相当于连接开启(感知到连接开启)
        socket.onopen = function (ev) {
          console.log("链接成功");
          socket.send(message);
        };
        //相当于连接关闭(感知到连接关闭)
        socket.onclose = function (ev) {
          console.log("关闭");
        };
      } else {
        alert("当前浏览器不支持websocket");
      }
      if (socket.readyState === WebSocket.OPEN) {
        console.log(212222222222222);
        //通过socket 发送消息
        socket.send(message);
      } else {
        console.log("连接没有开启");
      }
    },

    //led新增
    ledTest() {
      this.testLoading = true;
      console.log(this.config);
      let ledConfig = [];
      this.config.forEach((item) => {
        ledConfig.push({
          [item.Tname]: item.Tvalue,
        });
      });
      console.log(ledConfig);
      let obj = Object.assign(...ledConfig);
      this.form = Object.assign(this.form, obj);
      console.log(this.form);
      console.log(this.addDetail);

      let testForm = {
        ip: this.form.serverIp,
        port: this.form.serverPort,
        status: "false",
        cardNo: this.form.cardNo,
      };
      console.log(testForm);
      closeProgram(testForm)
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("测试通过!");
            this.testLoading = false;
            this.changeBtn = 1;
          } else {
            this.$message.error("测试未通过，请检查");
            this.testLoading = false;
            this.changeBtn = 0;
          }
        })
        .catch((error) => {
          this.testLoading = false;
        });
    },
    ledAdd() {
      this.saveLoading = true;
      console.log(this.config);
      let ledConfig = [];
      this.config.forEach((item) => {
        ledConfig.push({
          [item.Tname]: item.Tvalue,
        });
      });
      console.log(ledConfig);
      let obj = Object.assign(...ledConfig);
      this.form = Object.assign(this.form, obj);
      console.log(this.form);

      this.form.config = JSON.stringify(this.config).replace(/\"/g, "'");
      this.form.groupId = 100;
      this.form.componentName = this.form.name;
      this.form.componentId = this.providerModelData[0].value;
      this.form.status = 1;
      this.form.switchStatus = 1;

      this.form.deptId = this.addDetail.deptId;
      this.form.poleId = this.addDetail.id;
      console.log(this.form);
      addLed(this.form)
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("新增成功!");
            this.$bus.$emit('chenggong',true)
            this.thisDialogVisibleFlag = false;
            this.saveLoading = false;
            this.form = {};
            this.config = {};
          } else {
            this.$message.error("添加失败,请检查!");
            this.saveLoading = false;
          }
        })
        .catch((error) => {
          this.saveLoading = false;
        });
    },

    // 广播注册
    braodcasTest() {
      this.testLoading = true;
      let braodcastconfig = [];
      this.config.forEach((item) => {
        braodcastconfig.push({
          [item.Tname]: item.Tvalue,
        });
      });
      let obj = Object.assign(...braodcastconfig);
      this.form = Object.assign(this.form, obj);
      console.log(this.form);
      // 测试广播
      let tmpbrandName = {
        brandname: this.providerModelData[0].label,
        brandmodel: this.providerModelData[0].children[0].label,
      };
      this.testForm.ip = this.form.ip;
      this.testForm.config.brandName = tmpbrandName.brandname;
      this.testForm.config.brandModel = tmpbrandName.brandmodel;
      this.testForm.config.port = this.form.port;
      this.testForm.config.serverIp = this.form.serverIp;
      this.testForm.config.username = this.form.username;
      this.testForm.config.password = this.form.password;
      this.testForm.config = JSON.stringify(this.testForm.config).replace(
        /\"/g,
        "'"
      );

      // 新增广播
      // this.broadform.groupId=104
      // console.log(this.addDetail)
      console.log(this.testForm);
      testBroadCast(this.testForm)
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            setTimeout(() => {
              this.$message.success("测试通过");
            }, 2000);
            this.broadform.uid = res.msg;
            this.changeBtn = 1;
            this.testLoading = false;
          } else {
            this.$message.error("测试未通过，请检查");
            this.changeBtn = 0;
            this.testLoading = false;
          }
        })
        .catch((error) => {
          this.testLoading = false;
        });
    },
    braodcastAdd() {
      this.saveLoading = true;
      // console.log(this.broadform);
      let braodcastconfig = [];
      this.config.forEach((item) => {
        braodcastconfig.push({
          [item.Tname]: item.Tvalue,
        });
      });
      let obj = Object.assign(...braodcastconfig);
      this.form = Object.assign(this.form, obj);
      // console.log(this.form);
      // 测试广播

      let tmpbrandName = {
        brandname: this.providerModelData[0].label,
        brandmodel: this.providerModelData[0].children[0].label,
      };
      this.broadform.configs = JSON.stringify(this.config).replace(/\"/g, "'");
      this.broadform.deptId = this.addDetail.deptId;
      this.broadform.poleId = this.addDetail.id;

      this.broadform.config.brandName = tmpbrandName.brandname;
      this.broadform.config.brandModel = tmpbrandName.brandmodel;
      this.broadform.config.port = this.form.port;
      this.broadform.config.serverIp = this.form.serverIp;
      this.broadform.config.username = this.form.username;
      this.broadform.config.password = this.form.password;
      this.broadform.broadcastName = this.form.name;
      this.broadform.ip = this.form.ip;
      this.broadform.groupId = 100;
      this.broadform.componentId = this.providerModelData[0].value;
      this.broadform.config = JSON.stringify(this.broadform.config).replace(
        /\"/g,
        "'"
      );
      this.broadform.status = "1";
      console.log(this.broadform);
      addBroadCast(this.broadform)
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.$message.success("新增成功!");
            this.$bus.$emit('chenggong',true)
            this.thisDialogVisibleFlag = false;
            this.saveLoading = false;
            this.changeBtn = 0;
            this.form = {};
            this.queryParams.type = "";
            this.config = {};
          }
        })
        .catch((error) => {
          this.saveLoading = false;
        });
    },

    // 一键报警注册
    warningTest() {
      this.isTestLoading = true;
      let config = [];
      console.log(this.config);
      this.config.forEach((item) => {
        config.push({
          [item.Tname]: item.Tvalue,
        });
      });
      let obj = Object.assign(...config);
      console.log(obj);
      if (
        !/^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/.test(
          obj.ip
        )
      ) {
        this.$message.error("请输入正确的ip地址!");
        this.isTestLoading = false;
        return;
      }
      this.form = Object.assign(this.form, obj);
      console.log(this.form);
      this.form.channel = parseInt(this.form.channel);
      console.log(this.form.channel)
      let query = {
        type: 'test',
        equipIp: this.form.ip,
        username: this.form.username,
        password: this.form.password,
        port: this.form.port
      }
      //建立连接
      if(window.WebSocket){
        console.log(this.form.wsServer)
        let socket = new WebSocket(this.form.wsServer)
        socket.onopen = function (){
          console.log('连接建立')
          socket.send(JSON.stringify(query))
        }
        let that = this
        //接收到消息的回调方法
        socket.onmessage = function (event){
          const data = JSON.parse(event.data)
          console.log(data)
          if (data.msg !== '连接建立成功'){
            if (data.msg === '测试成功'){
              that.changeBtn = 1;
              console.log("测试通过")
              that.isTestLoading = false;
              that.$message.success("测试通过");
            }else{
              console.log("测试失败")
              that.changeBtn = 0;
              that.isTestLoading = false;
              that.$message.error('测试未通过,请检查')
            }
          }
        }
        socket.onclose = function (){
          console.log("连接关闭")
        }

        //连接失败
        socket.onerror = function (err){
          console.log(err)
        }
      }

      // this.wsConnection.handleSendData(JSON.stringify({
      //   type: 'test',
      //   equipIp: this.form.ip,
      //   username: this.form.username,
      //   password: this.form.password,
      //   port: this.form.port
      // }))

      // testWarning(this.form).then((res) => {
      //   console.log(res);
      //   if (res.code === 200) {
      //     this.$message.success("测试通过!");
      //     this.isTestLoading = false;
      //     this.changeBtn = 1;
      //   } else {
      //     this.$message.error("测试未通过，请检查");
      //     this.children = 0;
      //   }
      // });
    },
    warningSave(form) {
      this.isSaveLoading = true;
      this.gbPlayer = new GbPlayer();
      let uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
      let config = [];
      console.log(this.config);

      this.config.forEach((item) => {
        config.push({
          [item.Tname]: item.Tvalue,
        });
      });
      console.log(config);
      let obj = Object.assign(...config);
      this.form = Object.assign(this.form, obj);
      // console.log(warningForm);
      this.form.config = JSON.stringify(this.config).replace(/\"/g, "'");
      this.form.groupId = 100;
      this.form.deptId = this.addDetail.deptId;
      this.form.poleId = this.addDetail.id;
      this.form.componentId = this.providerModelData[0].value;
      this.form.status = 1;
      let rtsp = `rtsp://${this.form.username}:${this.form.password}@${this.form.ip}:554/cam/realmonitor?channel=1&subtype=0`;

      addWarning(this.form)
        .then((res) => {
          console.log('res:',res)
          listAllConfig().then((response) => {
            // this.initWs(response.data.hkCallServer)
            console.log('response:',response)
            WebRtcPlayer.setServer(response.data.dhVideoViewServer); //TODO: 添加WEBRTC服务器地址
          });
          if (res.code === 200) {
            WebRtcPlayer.addStream(this.form.ip + "@hk");
            this.$message.success("新增成功!");
                this.$bus.$emit('chenggong',true)
            this.thisDialogVisibleFlag = false;
            this.thisDialogVisibleFlag = false;
            this.$refs.form.resetFields();
            this.form = {};
            return
          }
        })
      this.isSaveLoading = false;
        // .then((res) => {
        //   console.log(res)
        //   if (res.code === 200) {
        //     console.log('www')
        //     this.$message.success("新增成功!");
        //     this.thisDialogVisibleFlag = false;
        //     this.$refs.form.resetFields();
        //     this.form = {};
        //   }
        //   console.log(res);
        // })
        // .catch((err) => {
        //   this.$message.error(err);
        // })
        // .finally(() => {
        //   this.isSaveLoading = false;
        // });
    },

    atmosphereTest() {
      this.lightLoading=true;
      let config = [];
      //用户注册输入的数据
      console.log(this.config);
      this.config.forEach((item) => {
        config.push({
          [item.Tname]: item.Tvalue,
        });
      });
      console.log(config);
      let obj = Object.assign(...config);
      this.form = Object.assign(this.form, obj);
      this.serverIP = this.form.configServerIp;
      this.serverPort = this.form.configServerPort;
      let message = {
        type: "0",
        mac: this.form.mac,
        slaveId: this.form.slaveId,
      };
      console.log(message);
      this.send1(JSON.stringify(message));
    },
    send1(message) {
      if (window.WebSocket) {
        var socket = new WebSocket(
          `ws://${this.serverIP}:${this.serverPort}/hello2`
        // `ws://192.168.20.191:2002/hello2`
        );
        //相当于channelReado, ev 收到服务器端回送的消息
        console.log(socket);
        let that = this;
        that.Trusted=true;
        // var flag =true
        socket.onmessage = function (ev) {
          that.Trusted=false;
          // flag=false;
           console.log(that.Trusted)
          console.log("打印执行");
          console.log(ev);
          this.atmo1=ev.data
          that.tmpconfig = JSON.parse(this.atmo1);
          console.log(that.tmpconfig)
          console.log(that.tmpconfig.isTrusted)
          if (that.tmpconfig.isTrusted!=="false") {
            that.$message.success("测试通过！");
             that.lightLoading=false;
            that.changeBtn = 1;

          } 
          else {
            that.$message.error("测试未通过");
             that.lightLoading=false;
            console.log("执行吧 ~~")
          }
          
        };
      
      //  console.log(that.Trusted)
      //  if(that.Trusted){
      //         setTimeout(()=>{
      //             that.$message.error("测试未通过");
      //              that.lightLoading=false;
      //         },4000)
      //  }        
       //相当于连接开启(感知到连接开启)
        socket.onopen = function (ev) {
          console.log("链接成功");
          
          socket.send(message);
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
        this.$message.error("连接没有开启");
        this.lightLoading=false;
        console.log("连接没有开启");
        
      }
    },
    atmosphereSave(form) {
      this.lightsaveLoading=true;
      let braodcastconfig = [];
      this.config.forEach((item) => {
        braodcastconfig.push({
          [item.Tname]: item.Tvalue,
        });
      });
      let obj = Object.assign(...braodcastconfig);
      this.form = Object.assign(this.form, obj);
      console.log(this.form)
      console.log(this.tmpconfig)
      this.form.config = JSON.stringify(this.config).replace(/\"/g, "'");
      this.form.groupId = 100;
      this.form.deptId = this.addDetail.deptId;
      this.form.poleId = this.addDetail.id;
      this.form.deptName = this.addDetail.deptName;
      this.form.componentId = this.providerModelData[0].value;
      let form1 = this.form
      console.log(form1)
      console.log(this.tmpconfig.temperture)
      form1.temperture = this.tmpconfig.temperture
      form1.pm10=this.tmpconfig.pm10
      form1.noise=this.tmpconfig.noise
      form1.humidity=this.tmpconfig.humidity
      form1.status=this.tmpconfig.status
      form1.pm2 = this.tmpconfig.pm2
      console.log(form1);
      addWeatherComponent(form1).then((response) => {
        console.log(121212121212121);
        this.lightsaveLoading=false;
        if (response.code === 200) {
          this.msgSuccess("新增成功");
          this.$bus.$emit('chenggong',true)
          // this.thisDialogVisibleFlag = false;
          this.thisDialogVisibleFlag = false;
          this.config = {};
          this.form = {};
          console.log(this.form)
        }

        //  .$emit("update:DialogVisibleFlag", false);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/poleIndex.scss";
.form-bottom{
  position: relative;
  top: 6%;
  .el-form-item{
    margin-bottom: 3vh;
  }
}
.camera {
  overflow: hidden;
  width: 100%;
  // min-width: 1920px;
  height: 100%;
  background: #010f1c url("../../../assets/images/camera/bg.jpg");
}

.dialogbox {
  position: absolute;
  top: 10vh;
  left: 2vw;
  width: 95%;
  height: 63vh;
  overflow-y: auto;
}

.el-dialog__body {
  background-color: transparent;
}

.dialog ::v-deep .dialog-box[data-v-0bbe9357] {
  height: 75vh !important;
}

.dialog-box .dialog-title[data-v-0bbe9357] {
  top: calc(11vh - 0.4%) !important;
}

.dialog-box .dialog-title[data-v-0bbe9357] {
  padding-left: 2vh;
  position: absolute;
}

.task-check {
  display: flex;

  .el-tag--medium {
    margin-left: 0.5vw;
  }
}

.task-box {
  color: #009dd1;
  height: 20vh;
  overflow-y: auto;

  .item {
    padding: 0.5vh;
    margin-top: 1vh;
    // height: 10vh;
    background-color: hsla(207, 95%, 31%, 0.388);
    border-radius: 2px;

    .top {
      display: flex;
      // margin-bottom: 2vh;
      justify-content: space-between;

      .item-right {
        margin: 0 3vw;
        align-items: center;
        display: flex;

        .item-right-title {
          margin-right: 0.5vw;
        }
      }

      .el-progress {
        width: 10vw;
        margin: 0 0.5vw;
      }
    }

    .bottom {
      display: flex;
      justify-content: center;
    }
  }
}

.dialogbox ::v-deep .el-input__inner {
  margin-left: 0vw !important;
}

.dialog ::v-deep .el-dialog {
  margin-top: 4vh !important;
}

.dialog ::v-deep .el-dialog__headerbtn {
  top: 116% !important;
  left: 111% !important;
  font-size: 4vh;
}
::v-deep .el-dialog__close {
  color: #fff;
}

.formConfirm {
  margin-top: 2vh;
}

.dialogbox ::v-deep .el-form-item__label {
  white-space: nowrap;
}

.dialog ::v-deep .dialog-box[data-v-0bbe9357] {
  position: static;
}

.testAndAddBtn {
  position: absolute;
  left: 11vw;
}

.status-box {
  margin-top: 5%;
  margin-left: 22%;
  width: 57%;
  height: 80%;

  .status-top {
    color: #037da5;
    //   margin-top: 30px;
    //   margin-left: 20px;
    i {
      cursor: pointer;
    }

    .status-top-left {
      width: 80%;
      display: flex;
      justify-content: space-around;
      color: #fff;
    }

    font-size: 2vh;
    display: flex;
    justify-content: space-between;

    height: 20px;
    line-height: 20px;

    .status-work {
      font-size: 13px;
      background: red;
      border-radius: 10px;
      width: 60px;
      text-align: center;
    }
  }

  .status-bottom {
    margin-top: 5vh;
    height: 70%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .status-card {
    //   padding: 30px 10px;
    box-sizing: border-box;
    width: 28%;
    height: 38%;
    margin-top: 20px;
    border: 1px solid #1c84c6;
    background: linear-gradient(#186697, transparent);
    display: flex;
    justify-content: space-around;

    .card-left {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        font-size: 23px;
        color: #fff;
      }

      .value {
        margin-top: 2vh;
        font-size: 4vh;
        color: #8fd2fc;
        text-align: center;
      }
    }
  }
}

.dv-border-box-11 {
  padding: 50px 50px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}

.status-container {
  width: 100%;
  height: 100%;
  // padding: 40px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.el-dialog__header {
  display: none !important;
}

.group ::v-deep .el-dialog__body {
  height: 90%;
  // width:50%
  width: 100% !important;
}

.el-form {
  // margin: 2% 3%;
  // width: 29vw;
  position: relative;
  width: 34vw;
  height: 58vh;
  margin-left: 3vw;
  //margin-top: 3vw;
}

.group ::v-deep .el-dialog__headerbtn {
  top: 18%;
  right: -5%;
  font-size: 2.5em;
  color: white;
  z-index: 1000000;
}

.group-body {
  margin-top: -22px !important;
}

.table-list {
  position: relative;
}

// .el-form[data-v-2ad7dfef] {
//   margin: 5% 3%;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
//   // margin-top: 60px;
// }

// .el-dialog__wrapper ::v-deep .el-dialog.is-fullscreen {
//   background: rgba(5, 14, 31, 0.18);
// }

.dialog-box ::v-deep .dialog-title[data-v-0bbe9357] {
  font-size: 2em !important;
}

.savebtn {
  position: relative;
  top: -6vh;
  left: 69vw;
}

// 灯杆详情
.poleDetail {
  width: 47vw;
  left: -8vw;
  height: 8vh;
}

.poleLabel {
  color: #fff;
  font-size: 1.3em;
}
.line_up{
  width: 80vh;
  height: 1vw;
  position: absolute;
  top: 12vh;
  left: 1vw;
  background:no-repeat url('../../../assets/images/form_line.png');
  background-size: 100% 100%;
}.line_down{
  width: 80vh;
  height: 1vw;
  position: absolute;
  top: 26vh;
  left: 1vw;
  background:no-repeat url('../../../assets/images/form_line.png');
  background-size: 100% 100%;
}
.testbtn{
  background: no-repeat url('../../../assets/images/button/lianjietest.png');
  background-size: 100% 100%;
}
.saveBtn{
 background: no-repeat url('../../../assets/images/button/register-pole.png');
  background-size: 100% 100%;
}
</style>
