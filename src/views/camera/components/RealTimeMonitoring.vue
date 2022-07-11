<template>
  <div class="real-time-mon">
    <img class="real-time-mon-bg" :src="groupRightBgImg" alt="group右侧的背景图片">
    <div class="group-right-btn">
      <div class="group-right-btn2 btn" v-on:click="handleShowDialog(thisVideoObj.videoInfo)" v-if="!changehuamian">云台控制</div>
      <div class="group-right-btn1 btn" v-on:click="handleShowOneVideo" v-if="changehuamian">一画面</div>
      <div class="group-right-btn4 btn" v-on:click="handleShowFourVideo" v-else>四画面</div>
    </div>
    <div class="real-video-box">
      <div v-if="isOneVideo" class="group-video">
        <div ref="oDialogVideoBox" id="oneVideoBox" class="oneVideoBox">
          <div v-if="thisVideoObj.isShow" class="title">
            <span>{{ thisVideoObj.videoInfo.name }}</span>
            <i class="el-icon-close group-video-close"
               v-on:click.stop="handleVideoClose(thisVideoObj)"></i>
          </div>
          <img v-if="!thisVideoObj.isShow" :src="groupVideoBg" alt="">
          <!--          <VideoPlayer-->
          <!--            v-else-->
          <!--            class="video-player"-->
          <!--            :videoObj="thisVideoObj.videoInfo"-->
          <!--            ref="oneVideoRef"></VideoPlayer>-->
          <WebRTCPlayer_v2 :videoId="'thisVideoObj'+Math.random()" v-else class="video-player"
                           :videoObj="thisVideoObj.videoInfo" :dhRTSPServer="dhRTSPServer" ref="oneVideoRef"></WebRTCPlayer_v2>
<!--          <web-rtc-player videoId="thisVideoObj" v-else class="video-player"-->
<!--                          :videoObj="thisVideoObj.videoInfo" ref="oneVideoRef"></web-rtc-player>-->
        </div>
      </div>
      <div v-else class="group-video">
        <!--      <div class="videoBox" v-for="(item,index) in thisVideoArr" :key="item.id">
                <span class="title" v-on:click.stop="handleShowDialog(item)">{{ item.label }}</span>
                <i class="el-icon-close group-video-close" v-on:click.stop="handleVideoClose(item,index)"></i>
                <VideoPlayer class="video-player" :videoObj="item" :ref="refArr[index]"></VideoPlayer>
              </div>-->
        <div class="videoBox">
          <template v-if="videoBox1.isShow">
            <div class="title">
              <span>{{ videoBox1.videoInfo.name }}</span>
              <i class="el-icon-close group-video-close" v-on:click.stop="handleVideoClose(videoBox1)"></i>
            </div>
            <WebRTCPlayer_v2 :videoId="'videoBox1'+Math.random()" class="video-player" :dhRTSPServer="dhRTSPServer" :videoObj="videoBox1.videoInfo" :ref="refArr[0]"></WebRTCPlayer_v2>
<!--            <web-rtc-player videoId="videoBox1" class="video-player" :videoObj="videoBox1.videoInfo" :ref="refArr[0]"></web-rtc-player>-->
            <!--            <VideoPlayer class="video-player" :videoObj="videoBox1.videoInfo" :ref="refArr[0]"></VideoPlayer>-->
          </template>
          <img v-else :src="groupVideoBg" alt="">
        </div>
        <div class="videoBox">
          <template v-if="videoBox2.isShow">
            <div class="title">
              <span>{{ videoBox2.videoInfo.name }}</span>
              <i class="el-icon-close group-video-close" v-on:click.stop="handleVideoClose(videoBox2)"></i>
            </div>
            <WebRTCPlayer_v2 :videoId="'videoBox2'+Math.random()" class="video-player" :dhRTSPServer="dhRTSPServer" :videoObj="videoBox2.videoInfo"
                             :ref="refArr[1]"></WebRTCPlayer_v2>
          </template>
          <img v-else :src="groupVideoBg" alt="">
        </div>
        <div class="videoBox">
          <template v-if="videoBox3.isShow">
            <div class="title">
              <span>{{ videoBox3.videoInfo.name }}</span>
              <i class="el-icon-close group-video-close" v-on:click.stop="handleVideoClose(videoBox3)"></i>
            </div>
            <WebRTCPlayer_v2 :videoId="'videoBox3'+Math.random()" :dhRTSPServer="dhRTSPServer" class="video-player" :videoObj="videoBox3.videoInfo"
                              :ref="refArr[2]"></WebRTCPlayer_v2>
<!--            <web-rtc-player videoId="videoBox3" class="video-player" :videoObj="videoBox3.videoInfo"-->
<!--                            :ref="refArr[2]"></web-rtc-player>-->
            <!--            <VideoPlayer class="video-player" :videoObj="videoBox3.videoInfo" :ref="refArr[2]"></VideoPlayer>-->
          </template>
          <img v-else :src="groupVideoBg" alt="">
        </div>
        <div class="videoBox">
          <template v-if="videoBox4.isShow">
            <div class="title">
              <span>{{ videoBox4.videoInfo.name }}</span>
              <i class="el-icon-close group-video-close" v-on:click.stop="handleVideoClose(videoBox4)"></i>
            </div>
            <WebRTCPlayer_v2 :videoId="'videoBox4'+Math.random()" class="video-player" :dhRTSPServer="dhRTSPServer" :videoObj="videoBox4.videoInfo"
                             :ref="refArr[3]"></WebRTCPlayer_v2>
<!--            <web-rtc-player videoId="videoBox4" class="video-player" :videoObj="videoBox4.videoInfo"-->
<!--                            :ref="refArr[3]"></web-rtc-player>-->
            <!--            <VideoPlayer class="video-player" :videoObj="videoBox4.videoInfo" :ref="refArr[3]"></VideoPlayer>-->
          </template>
          <img v-else :src="groupVideoBg" alt="">
        </div>
        <div class="videoBox" v-for="(item,index) in noVideoNum" :key="index">
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import {stopVideo, videoUrl} from "@/api/camera/videoplayer";
import groupVideoBg from "@/assets/images/camera/camera_icon_1.png";
import VideoPlayer from "@/views/camera/components/VideoPlayer";
import groupRightBgImg from "@/assets/images/camera/bg_3_4.png"
import WebRtcPlayer from "@/views/camera/components/WebRtcPlayer";
import WebRTCPlayer_v2 from "@/views/camera/components/WebRTCPlayer_v2";

export default {
  name: "RealTimeMonitoring",
  props: {
    // videoObj: {
    //   type: Object,
    // },
    // videoArr: {
    //   type: Array
    // }
  },
  components: {
    VideoPlayer,
    WebRtcPlayer,
    WebRTCPlayer_v2
  },
  data() {
    return {
      changehuamian:false,
      ifShowDialog: false,
      dialogVisibleFlag: false,
      groupRightBgImg: groupRightBgImg,
      groupVideoBg: groupVideoBg,
      isOneVideo: true,
      noVideoNum: 4,
      dhRTSPServer:'',
      thisVideoObj: {
        isShow: false,
        videoInfo: {}
      },
      refArr: [
        "oneOfFourVideoRef",
        "twoOfFourVideoRef",
        "threeOfFourVideoRef",
        "fourOfFourVideoRef"
      ],
      videoBox1: {isShow: false, videoInfo: {}},
      videoBox2: {isShow: false, videoInfo: {}},
      videoBox3: {isShow: false, videoInfo: {}},
      videoBox4: {isShow: false, videoInfo: {}},
      // thisVideoArr: [this.videoBox1, this.videoBox2, this.videoBox3, this.videoBox4],
      videoNum: 0
    }
  },
  computed: {
    thisVideoArr: function () {
      return [
        this.videoBox1,
        this.videoBox2,
        this.videoBox3,
        this.videoBox4,
      ]
    }
  },
  watch: {
    videoObj() {
      this.thisVideoObj = this.videoObj;
    },
    videoArr() {
      this.thisVideoArr = this.videoArr
    },
  },
  mounted() {
    this.handleEmitToRealTimeDialogFlag()
    this.handleVideoPlaying()
  },
  methods: {
    /**
     * 控制视频播放的函数
     */
    handleVideoPlaying() {
      this.$bus.$on('leafNodeData', leafNodeData => {
        this.thisVideoObj.isShow = true
        let config = (leafNodeData.config).replace(/'/g, '"')
        let tmpconfig = JSON.parse(config)
        tmpconfig.forEach(item => {
          if (item.Tname === 'dhRTSPServer'){
            this.dhRTSPServer = item.Tvalue
          }
        })
        console.log(this.dhRTSPServer)
        console.log("leafNodeData",leafNodeData)
        this.handleVideoUrl(leafNodeData)
        // this.thisVideoObj.videoInfo = {...leafNodeData}
        // this.thisVideoObj.videoInfo.uuid = '287efed6-adbf-4768-b50a-292d190a4ed6'
      })
      this.ifShowDialog = true
    },
    /**
     * 获取视频的url
     */
    handleVideoUrl(leafNodeData) {
      leafNodeData.account = leafNodeData.username
      let {videoBox1, videoBox2, videoBox3, videoBox4} = this
      const videoObj = ({...leafNodeData})
      console.log("videoObj",videoObj)
      if (this.isOneVideo) {
        this.thisVideoObj.isShow = false
        this.thisVideoObj.videoInfo = videoObj
        this.$nextTick(() => {
          this.thisVideoObj.isShow = true
        })
      } else {
        if (!videoBox1.isShow) {
          videoBox1.videoInfo = videoObj
          videoBox1.isShow = true
        } else if (!videoBox2.isShow) {
          videoBox2.videoInfo = videoObj
          videoBox2.isShow = true
        } else if (!videoBox3.isShow) {
          videoBox3.videoInfo = videoObj
          videoBox3.isShow = true
        } else if (!videoBox4.isShow) {
          videoBox4.videoInfo = videoObj
          videoBox4.isShow = true
        } else {
          let flag = this.videoNum % this.thisVideoArr.length
          this.thisVideoArr[flag].isShow = false
          this.thisVideoArr[flag].videoInfo = videoObj
          this.$nextTick(() => {
            this.thisVideoArr[flag].isShow = true
          })
        }
        this.videoNum++
      }
      // if (!this.isOneVideo) {
      //   if (this.groupVideoBgArr.length > 0) {
      //     this.groupVideoBgArr.pop()
      //     this.videoArr.push({...this.videoObj})
      //   } else {
      //     this.videoArr.shift()
      //     this.videoArr.push({...this.videoObj})
      //   }
      // }
      // })
    },
    handleEmitToRealTimeDialogFlag() {
      this.$bus.$on('emitToRealTimeDialogFlag', res => {
        if (this.isOneVideo) {
          this.$refs.oneVideoRef.play()
        } else {
          this.thisVideoArr.forEach((item, index) => {
            if (item.isShow) {
              this.handlePlayVideo(index)
            }
          })
        }
      })
    },
    /**
     * 显示弹窗
     */
    handleShowDialog(data) {
      if (this.ifShowDialog !== true){
        return
      }
      this.$emit('changeDialogVisibleFlag', {
        dialogView: 'cameraView',
        data
      })
      if (this.isOneVideo) {
        // this.thisVideoObj.isShow = false
        this.$refs.oneVideoRef.pause()
      } else {
        this.thisVideoArr.forEach((item, index) => {
          if (item.isShow) {
            this.handlePauseVideo(index)
            // item.isShow = false
          }
        })
      }
      this.dialogVideoObj = {...data}
      this.dialogVideoObj.id = 'dialogVideo'
      // this.dialogVideoObj.isShow = true
      console.log(this.dialogVideoObj)
    },

    /**
     * 显示一画面
     */
    handleShowOneVideo() {
      this.changehuamian = false
      this.$bus.$emit('isOneVideo', {isOneVideo: true, id: this.videoBox1.isShow ? this.videoBox1.videoInfo.id : ''})

      this.videoNum = 0
      if (this.videoBox1.isShow) {
        this.thisVideoArr.forEach(item => {
          item.isShow = false
        })
        this.thisVideoObj = this.videoBox1
        this.thisVideoObj.isShow = true
        this.noVideoNum = 4
      }
      this.isOneVideo = true
      this.$emit('handleVideoIsOneVideo', true)
    },
    /**
     * 显示四画面
     */
    handleShowFourVideo() {
      //TODO:视频播放的四画面问题
      this.changehuamian = true
      this.$bus.$emit('isOneVideo', {isOneVideo: false})
      if (this.thisVideoObj.isShow) {
        this.videoNum = 1
        this.noVideoNum = 3
        this.thisVideoObj.isShow = false
        this.videoBox1 = this.thisVideoObj
        this.videoBox1.isShow = true
      }
      this.isOneVideo = false
      this.$emit('handleVideoIsOneVideo', false)
    },
    handleVideoClose(item) {
      this.$bus.$emit('videoClose', item.videoInfo.id)
      if (this.isOneVideo) {
        this.thisVideoObj.isShow = false
        this.thisVideoObj.videoInfo = {}
      } else {
        item.isShow = false
        item.videoInfo = {}
        this.videoNum--
        this.noVideoNum++
      }
    },
    handlePlayVideo(index) {
      switch (index + 1) {
        case 1:
          this.$refs.oneOfFourVideoRef.play()
          break;
        case 2:
          this.$refs.twoOfFourVideoRef.play()
          break
        case 3:
          this.$refs.threeOfFourVideoRef.play()
          break
        case 4:
          this.$refs.fourOfFourVideoRef.play()
          break
      }
    },
    handlePauseVideo(index) {
      switch (index + 1) {
        case 1:
          this.$refs.oneOfFourVideoRef.pause()
          break;
        case 2:
          this.$refs.twoOfFourVideoRef.pause()
          break
        case 3:
          this.$refs.threeOfFourVideoRef.pause()
          break
        case 4:
          this.$refs.fourOfFourVideoRef.pause()
          break
      }
    },

  }
}
</script>

<style lang="scss" scoped>
.real-time-mon {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .real-time-mon-bg {
    position: absolute;
    pointer-events: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .real-video-box {
    width: 94%;
    height: 85%;
    background-color: #03223f;
    transform: translate(0.9%, -1%);
  }

}

.group-right-btn {
  z-index: 100;
  position: absolute;
  bottom: 2vh;
  right: 13vw;
  display: flex;
  justify-content: space-between;

  .group-right-btn2{
    position: relative;
    left: 0%;
    top: 5% !important;
    user-select: none;
    cursor: pointer;
    margin-right: 40px;
    width: 5.4vw;
    height: 3.4vh;
    line-height: 2.6vh;
    background-color: #10456f;
    text-align: center;
    border-radius: 5px;
    border-style: outset;
    border-width: 3px;
    border-color: #0f6f97;
    box-shadow: 0 0 10px #243c47;
  }
  .group-right-btn2:hover{
    box-shadow: 0 0 10px #17619a;
  }
  .group-right-btn1, .group-right-btn4{
    user-select: none;
    cursor: pointer;
    margin-right: 40px;
    width: 5.4vw;
    height: 3.4vh;
    line-height: 2.6vh;
    background-color: #10456f;
    text-align: center;
    border-radius: 5px;
    border-style: outset;
    border-width: 3px;
    border-color: #0f6f97;
    box-shadow: 0 0 10px #243c47;

    &:hover {
      box-shadow: 0 0 10px #17619a;
    }
  }
}

.group-video {
  width: 100%;
  height: 100%;
  z-index: 1;

  .videoBox, .oneVideoBox {
    width: 50%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    float: left;
    position: relative;

    .video-player {
      width: 100%;
      height: 100%;
    }

    img {
      width: 20%;
      height: auto;
    }

    .title {
      color: white;
      font-size: 1.2rem;
      position: absolute;
      top: 0;
      width: 100%;
      padding-left: 3%;
      height: 40px;
      background-color: rgba(8, 29, 48, 0.8);
      display: none;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
    }

    &:hover .title {
      display: flex;
    }

    .group-video-close {
      cursor: pointer;
      margin-right: 1%;
      color: rgba(255, 255, 255, 1);
      font-weight: 700;
      z-index: 1000;
    }
  }

  .oneVideoBox {
    width: 100%;
    height: 100%;
  }

  .videoBox:nth-child(1), .videoBox:nth-child(2) {
    border-bottom: 2px solid black;
  }

  .videoBox:nth-child(1), .videoBox:nth-child(3) {
    border-right: 2px solid black;
  }


}
</style>
