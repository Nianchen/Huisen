<template>
  <div class="audioplayer">
    <!--    <audio controls>您的浏览器不支持 audio 标签。</audio>-->
    <el-button @click="handleStartVoice" :disabled="startDisabled" type="success" icon="el-icon-phone-outline"
               :loading="isLoading"><span v-if="isLoading">接听中</span><span v-else>接听</span>
    </el-button>
    <el-button @click="handleStopVoice" :disabled="stopDisabled" type="danger">挂断</el-button>
  </div>
</template>

<script>
export default {
  name: "AudioPlayer",
  props: {
    componentData: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      chunks: [],
      constraints: {
        audio: true
      },
      options: {
        mimeType: 'audio/webm'
      },
      mediaRecorder: null,
      wsConnection: this.$store.getters.socketConnection,
      voiceStatus: false,
      voiceTitle: '开始通话',
      flag: 1,
      isStop: false,
      messageData: null,
      startDisabled: false,
      stopDisabled: true,
      isConnected: true,
      isLoading: false
    }
  },
  computed: {
    msgData() {
      return this.$store.getters.socketMessage
    },
  },
  watch: {
    // msgData: {
    //   handler(data) {
    //     if (data !== '') {
    //       try {
    //         data = JSON.parse(data)
    //         console.log('aduioPlayer--data=', data)
    //         this.messageData = data
    //         if (data.messageType === 3 || data.messageType === '3') {
    //           // this.componentData.ip = data.equipIp
    //           // this.handleMessage()
    //           // this.handleStartVoice(true)
    //         }
    //       } catch (e) {
    //         console.log(e)
    //       }
    //       this.$store.dispatch('GetMessage', '')
    //     }
    //   },
    //   immediate: true,
    //   deep: true,
    // }
  },
  created() {
    if (navigator.mediaDevices) {
      this.initMediaRecorder()
    }
  },
  beforeDestroy() {
    this.startDisabled = false
    this.stopDisabled = true
    this.handleStopVoice()
  },
  methods: {
    initMediaRecorder() {
      navigator.mediaDevices.getUserMedia(this.constraints)
        .then(stream => {
          this.mediaRecorder = new MediaRecorder(stream, this.options)
        })
    },
    handleSend() {
      console.log(this.flag++)
      this.mediaRecorder.start()
      this.mediaRecorder.ondataavailable = (event) => {
        console.log(event.data, this.$store.getters.socketStatus)
        this.wsConnection.handleSendData(event.data)
        if (!this.$store.getters.socketStatus || this.isStop) {
          if (this.isStop) {
            this.wsConnection.handleSendData(JSON.stringify({
              type: 'stop',
              equipIp: this.componentData.ip
            }))
          }
          if (!this.isConnected) {
            this.$message.error('警报已被他人接听')
          }
          this.isStop = false
          return
        }
        this.handleSend()
      }
      setTimeout(() => {
        if(this.mediaRecorder.state != 'inactive'){
          this.mediaRecorder.stop()
        }
      }, 500)
    },
    handleStartSend() {
      setTimeout(() => {
        if (!this.isConnected) {
          this.$message.error('警报已被他人接听')
          this.startDisabled = true
          return
        }
        this.startDisabled = true
        this.stopDisabled = false
        this.isLoading = false
        this.handleSend()
      }, 1000)
    },
    handleConnectedStatus(flag) {
      this.isConnected = flag
      this.isStop = true
      this.stopDisabled = true
    },
    handleStartVoice() {
      this.$bus.$emit('alarmStop',false)
      this.$emit('changeMuted', false)
      this.isLoading = true
      this.wsConnection.handleSendData(JSON.stringify({
        type: 'start',
        equipIp: this.componentData.ip,
        username: this.componentData.account,
        password: this.componentData.password,
        port: this.componentData.port
      }))
      this.stopDisabled = false
      this.mute = false
    },
    handleStopVoice() {
      this.$emit('changeMuted', true)
      if (!this.isStop) {
        this.isStop = true
      }
      this.mediaRecorder.stop()
      this.startDisabled = true
      this.stopDisabled = true
    }
  }
}
</script>

<style lang="scss" scoped>
.audioplayer {
  display: flex;
  justify-content: center;
  align-items: center;

  .el-button {
    cursor: pointer;
    z-index: 1000000;
    color: white;
    font-size: 1.3rem;
    border: none;
    outline: none;
    width: 150px;
    height: 50px;
    //background: no-repeat url(../../../assets/images/camera/audio_btn.png);
  }
}
</style>
