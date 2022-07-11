<template>
  <div class="alarm">
     <audio preload="auto" src="./4031.wav"  ></audio>
        <audio :src="music"  autoplay loop ></audio>
    <!--    <div class="alarm-websocket-status">-->
    <!--      <el-tag @click="drawer=true">状态</el-tag>-->
    <!--    </div>-->
    <!--    <el-drawer-->
    <!--      title="我是标题"-->
    <!--      size="small"-->
    <!--      effect="plain"-->
    <!--      :visible.sync="drawer">-->
    <!--      <span>我来啦!</span>-->
    <!--    </el-drawer>-->
    <!--    <el-button @click="handleSendData">发送消息</el-button>-->
    <!--    <el-button @click="handleMessage">出现弹窗</el-button>-->

    <Dialog class="dialog" title="一键报警" @beforeClose="handleBeforeClose" :DialogVisibleFlag.sync="DialogVisibleFlag"
            :is-show-close="false"
            :closeOnClickModal="false">
      <template>
        <div class="dialog-box dialog-table-box">
          <div class="dialog-box-left">
            <!--            <VideoPlayer class="dialog-video" :muted="muted" :videoObj="videoObj"></VideoPlayer>-->
            <!--            <web-rtc-player class="dialog-video" :video-obj="videoObj" video-id="alarmVideo"-->
            <!--                            :muted="muted" :controls="false"></web-rtc-player>-->
            <WebRTCPlayer_v2 v-if="DialogVisibleFlag" class="dialog-video" :video-obj="videoObj" :video-id="'alarmVideo_' + Math.random()"
                             :dhRTSPServer="dhRTSPServer" :muted="muted"
            ></WebRTCPlayer_v2>
          </div>
          <div class="dialog-alarm-content">
            <el-form ref="alarmForm" :rules="alarmRules" :model="alarmForm" label-width="80px">
              <el-form-item label="报警事件" prop="title">
                <el-input v-model="alarmForm.title"></el-input>
              </el-form-item>
              <el-form-item label="报警人" prop="contacts">
                <el-input v-model="alarmForm.contacts"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="tel">
                <el-input type="tel" v-model="alarmForm.tel"></el-input>
              </el-form-item>
              <el-form-item label="报警地址" prop="address">
                <el-input type="tel" v-model="alarmForm.address"></el-input>
              </el-form-item>
              <el-form-item label="事件内容" prop="content">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="alarmForm.content"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="medium" @click="submitForm('alarmForm')"
                           :loading="isLoading"><span v-if="isLoading">提交中</span><span v-else>提交</span></el-button>
              </el-form-item>
            </el-form>
            <audio-player v-if="DialogVisibleFlag" ref="audioplayer" :componentData="componentData"
                          @changeMuted="changeMuted"></audio-player>
          </div>
        </div>

      </template>
    </Dialog>
  </div>
</template>
<script>

import Dialog from "@/views/components/Dialog";
import VideoPlayer from "@/views/camera/components/VideoPlayer";
import AudioPlayer from "@/views/camera/components/AudioPlayer";
import {alarmVideoUrl, stopVideo} from "@/api/camera/videoplayer"
import {parseTime} from "@/utils/ruoyi"
import Socket from "@/utils/socket";
import {poleInfo, addEvent} from '@/api/call/event'
import WebRtcPlayer from "@/views/camera/components/WebRtcPlayer";
import WebRTCPlayer_v2 from "../camera/components/WebRTCPlayer_v2";
import store from "@/store";
import {listAllConfig} from "@/api/system/config";

export default {
  name: "AlarmModule",
  components: {
    Dialog,
    VideoPlayer,
    AudioPlayer,
    WebRtcPlayer,
    WebRTCPlayer_v2
  },
  data() {
    let validateTel = (rule, value, callback) => {
      if (!value)
        return callback(new Error('请输入手机号'))
      if (!/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(value))
        callback(new Error('请输入正确的手机号'))
      callback()
    }
    return {
      music:"",
      mpOpen:false,
      dhRTSPServer:'',
      drawer: false,
      // wsConnection: null,
      DialogVisibleFlag: false,
      msg: '',
      videoObj: {
        ip: '',
        id: 'alarmModuleVideo',
        url: '',
        isVideoLoad: false,
        label: '',
        isHasAudio: true,
        uuid: '78a6b54a-8864-41b6-b156-b5df5df104a9'
      },
      muted: true,
      componentData: {
        ip: ''
      },
      isLoading: false,
      isFormSubmit: false,
      alarmForm: {
        title: '',
        contacts: '',
        tel: '',
        content: '',
        address: ''
      },
      messageData: null,
      notify: null,
      alarmRules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        contacts: [
          {required: true, message: '请输入联系人', trigger: 'blur'}
        ],
        tel: [
          {validator: validateTel, trigger: 'blur'}
        ],
        address: [
          {required: true, message: '请输入报警地址', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入事件内容', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    msgData() {
      return this.$store.getters.socketMessage
    }
  },
  watch: {
    msgData: {
      handler(data) {
        if (data !== '') {
          try {
            data = JSON.parse(data)
            console.log('data=', data)
            this.messageData = data
            if (data.type === "1" || data.type === 1) {
              this.videoObj.ip = data.equipIp
              this.componentData.ip = data.equipIp
              this.getPoleInfo();
              // this.music='./4031.wav';
              this.handleMessage();
              // this.mpOpen=true;
            } else if (data.type === '3' || data.type === 3) {
              this.$refs.audioplayer.handleConnectedStatus(false)
            } else if (data.type === "4" || data.type === 4 && data.isSuccess) {
              console.log('开始发送语音')
              this.$refs.audioplayer.handleStartSend()
            }
          } catch (e) {
            console.log(e)
          }
          this.$store.dispatch('GetMessage', '')
        }
      },
      immediate: true,
      deep: true,
    }
  },
  created() {
    this.getSysConfig();
  },
  beforeDestroy() {
    // this.ws.close()
  },
  mounted() {
    // this.handleShowDialog()

  },
  methods: {
    getSysConfig(){
      listAllConfig().then(response => {
        console.log(response)
        this.initWs(response.data.hkCallServer)
      });
    },
    initWs(callServer) {
      this.ws = new Socket({
        url: callServer,
        reconnectStep: 15000,
        reconnectTimes: 10,
        heartBeat: 5000
      })
      this.ws.handleInit()
      this.$store.dispatch('GetSocketConnection', this.ws)
    },
    getPoleInfo() {
      console.log(this.componentData)
      console.log(this.componentData.ip)
      poleInfo({ip: this.componentData.ip}).then(res => {
        console.log(res.data.config)
        let config = (res.data.config).replace(/'/g, '"')
        let tmpconfig = JSON.parse(config)
        tmpconfig.forEach(item => {
          if (item.Tname === 'dhRTSPServer'){
            this.dhRTSPServer = item.Tvalue
          }
        })
        console.log(this.dhRTSPServer)
        const {userName, password, port, channel, address, deptId, poleId, callId, lat, lng, callName} = res.data
        this.componentData.account = userName
        this.componentData.password = password
        this.componentData.port = port
        this.componentData.channel = channel
        this.componentData.subtype = 1
        this.alarmForm.address = address
        this.alarmForm.deptId = deptId
        this.alarmForm.poleId = poleId
        this.alarmForm.callId = callId
        this.alarmForm.lat = lat
        this.alarmForm.lng = lng
        this.alarmForm.callName = callName
        console.log(this.componentData)
        console.log(this.alarmForm)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.isLoading = true
          addEvent(this.alarmForm).then(res => {
            this.$message.success(res.msg)
            this.isFormSubmit = true
            this.isLoading = false
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    changeMuted(flag) {
      console.log(flag)
      console.log("flag的值");
      this.muted = flag
    },
    handleMessage() {
      this.music=require('./4031.wav');
      console.log('zhixinle')
      let message = ''
      if (this.componentData.ip === '192.168.20.110'){
        message = '唐河伏牛西路6号-唐河1号报警器'
      }else if(this.componentData.ip === '192.168.20.167'){
        message = '唐河伏牛西路6号-唐河2号报警器'
      }else if(this.componentData.ip === '192.168.20.229'){
        message = '唐河伏牛西路6号-唐河3号报警器'
      }
      this.$bus.$emit('alarmDetail',this.componentData.ip)
      console.log(this.componentData)
      this.notify = this.$notify({
        customClass: 'ic-notify',
        type: 'warning',
        title: '报警提示',
        duration: 40000,
        // message: `有人报警，请接听！`,
        message: message ,
        onClick: this.handleShowDialog,
        dangerouslyUseHTMLString:true,
      });
    //  this.music='./4031.wav';
      setTimeout(
        this.mpOpen1,40000
      )
    },
    mpOpen1(){
        this.music='';
    },
    handleShowDialog() {
      this.music='';
      // this.mpOpen=false
      this.notify.close()
      this.isFormSubmit = false
      this.DialogVisibleFlag = true
    },
    handleBeforeClose() {
      this.music='';
      if (!this.isFormSubmit) {
        this.DialogVisibleFlag = true
      }
    },
    getVideoUrl() {
      alarmVideoUrl(this.componentData).then(response => {
        this.videoObj.url = response.msg
        this.DialogVisibleFlag = true
        console.log(response)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.alarm-websocket-status {
  position: fixed;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  z-index: 100;
  color: white;
}


.dialog-box {
  padding: 0 15px;
  width: 62vw;
  height: 55vh;
  display: flex;
  justify-content: space-around;

  .dialog-box-left {
    width: 70%;
  }

  .dialog-video {
    border: 1px solid;
    width: 100%;
    height: 100%;
  }

  .dialog-alarm-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
