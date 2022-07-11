<template>
  <div class="videoplayer">
<!--    <div class="video-title">-->
<!--      <span>大华摄像头1</span>-->
<!--      <button>-->
<!--        <i class="el-icon-close"></i>-->
<!--      </button>-->
<!--    </div>-->
    <video :id="thisVideoObj.id" class="ic-video"
           controlsList='nofullscreen nodownload'
           disablePictureInPicture autoplay :muted="muted" loop></video>
<!--    <div class="video-controls">-->
<!--      <div class="controls-left">-->
<!--        <button class="video-fullscreen"><i class="el-icon-refresh"></i></button>-->
<!--      </div>-->
<!--      <div class="controls-right">-->
<!--        <button class="video-muted"><i class="icon-jingyin1 iconfont"></i></button>-->
<!--        <button class="video-fullscreen"><i class="el-icon-full-screen"></i></button>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>

import flvjs from 'flv.js'
import {stopVideo} from '@/api/camera/videoplayer'

export default {
  name: "VideoPlayer",
  props: {
    videoObj: {
      type: Object
    },
    muted: {
      type: Boolean,
      default() {
        return true
      }
    },
    controls: {
      type: Boolean,
      default() {
        return true
      }
    },
  },
  data() {
    return {
      videoOption: {
        enableWorker: false,     //浏览器端开启flv.js的worker,多进程运行flv.js
        isLive: true,           //直播模式
        hasAudio: this.videoObj.isHasAudio ? this.videoObj.isHasAudio : false,        //关闭音频
        hasVideo: true,
        stashInitialSize: 128, //缓存大小
        lazyLoad: false,
        enableStashBuffer: true, //播放flv时，设置是否启用播放缓存，只在直播起作用。
        type: 'flv',
        url: this.videoObj.url,
      },
      flvPlayer: null,
      isSupported: true,
      timer: null,
      isVideoPause: false
    }
  },
  watch: {
    // videoObj: {
    //   handler(data) {
    //     this.initFlvPlayer()
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  created() {
    // this.isSupported = flvjs.isSupported()
    // console.log('this.videoOption', this.videoOption)
    // this.flvPlayer = flvjs.createPlayer(this.videoOption)
  },
  computed: {
    thisVideoObj() {
      return this.videoObj
    }
  },

  mounted() {
    const self = this
    if (window.addEventListener) {
      window.addEventListener('beforeunload', function () {
        this.msgError('页面刷新，视频销毁')
        self.destroy()
      })
    } else if (window.attachEvent) {
      // 主要是为了兼容老的IE
      window.attachEvent('onbeforeunload', function () {
        this.msgError('页面刷新，视频销毁')
        self.destroy()
      })
    } else if ("onpagehide" in window) {
      window.addEventListener('pagehide', function () {
        this.msgError('页面刷新，视频销毁')
        self.destroy()
      }, false);
    } else {
      window.onbeforeunload = function () {
        this.msgError('页面刷新，视频销毁')
        self.destroy()
      }
    }
    if (window.onpagehide) {
      window.onpagehide = () => {
        this.pause()
      }
    }
    if (window.onpageshow) {
      window.onpageshow = () => {
        if (this.isVideoPause) {
          this.refresh()
        }
      }
    }
    this.initFlvPlayer()
  },
  beforeDestroy() {
    this.destroy()
    console.log(this.videoObj.ip)
  },
  methods: {
    initFlvPlayer() {
      if (this.timer) {
        clearInterval(this.timer)
      }
      // this.isSupported = flvjs.isSupported()
      if (flvjs.isSupported()) {
        this.flvPlayer = flvjs.createPlayer(this.videoOption)
      }
      console.log('this.videoOption', this.videoOption)
      const oVideo = document.getElementById(this.thisVideoObj.id)
      this.flvPlayer.attachMediaElement(oVideo)
      this.flvPlayer.load();
      this.start()
    },
    // 开始播放
    start() {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.flvPlayer.play()
      this.timer = setInterval(() => {
        if (this.flvPlayer === null) {
          clearInterval(this.timer)
          this.timer = null
        }
        // console.log('this.flvPlayer.buffered', this.flvPlayer.buffered)
        if (this.flvPlayer.buffered && this.flvPlayer.buffered.length) {
          let end = this.flvPlayer.buffered.end(0);//获取当前buffered值
          let diff = end - this.flvPlayer.currentTime;//获取buffered与currentTime的差值
          if (diff >= 10) {//如果差值大于等于0.5 手动跳帧 这里可根据自身需求来定
            this.flvPlayer.currentTime = this.flvPlayer.buffered.end(0);//手动跳帧
          }
        }
      }, 1000);
    },
    // 重新刷新
    refresh: function () {
      this.flvPlayer.load()
      // this.unload()
      this.start()
    },
    // 暂停播放
    pause() {
      if (this.timer) {
        // this.$message.success('暂停中的定时器销毁')
        clearInterval(this.timer)
        this.timer = null
      }
      this.isVideoPause = true
      this.flvPlayer.pause()
      this.flvPlayer.unload()
    },
    // 停止播放
    destroy() {
      stopVideo({ip: this.thisVideoObj.ip}).then(res => {
        this.$message.warning('视频关闭')
      })
      // this.$message.success('flv播放时销毁')
      if (this.flvPlayer) {
        if (this.timer) {
          // this.$message.success('定时器销毁')
          clearInterval(this.timer)
          this.timer = null
        }
        this.flvPlayer.pause()
        this.flvPlayer.unload()
        this.flvPlayer.detachMediaElement()
        this.flvPlayer.destroy()
        this.flvPlayer = null
      }
    }
  },
//进入全屏
  FullScreen() {
    let ele = document.documentElement;
    if (ele.requestFullscreen) {
      ele.requestFullscreen();
    } else if (ele.mozRequestFullScreen) {
      ele.mozRequestFullScreen();
    } else if (ele.webkitRequestFullScreen) {
      ele.webkitRequestFullScreen();
    }
  },

//退出全屏
  exitFullscreen() {
    var de = document;
    if (de.exitFullscreen) {
      de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
      de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
      de.webkitCancelFullScreen();
    }
  }

}
</script>

<style lang="scss" scoped>
//.ic-video-box {
//  width: 100%;
//  height: 100%;
//position: relative;
.videoplayer {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;


  .video-title {
    position: absolute;
    top: 0;
    display: none;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, .1), rgba(0, 0, 0, .3), rgba(0, 0, 0, .5), rgba(0, 0, 0, 1));
    padding: 8px 10px 8px 15px;
    font-size: 1.2rem;
    z-index: 100;

    i {
      cursor: pointer;
    }
  }

  .video-controls {
    position: absolute;
    bottom: 0;
    display: none;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, .1), rgba(0, 0, 0, .3), rgba(0, 0, 0, .5), rgba(0, 0, 0, 1));
    padding: 10px 15px 10px 10px;
  }

  &:hover .video-title, &:hover .video-controls {
    display: flex;
  }

  button {
    outline: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
      color: #c1c1c1;
    }
  }
}

.ic-video {
  //position: absolute;
  width: 100%;
  height: 100%;
  object-fit: fill;
  //z-index: 1;
  //pointer-events: none;

}

//video::media-controls-timeline {
//  display: none;
//}

video::-moz-media-controls-timeline {
  display: none;
}

video::-ms-media-controls-timeline {
  display: none;
}

video::-webkit-media-controls-timeline {
  display: none;
}

video::-o-media-controls-timeline {
  display: none;
}

video::-moz-media-controls-current-time-display {
  display: none;
}

video::-moz-media-controls-fullscreen-button {
  display: none;
}

video::-moz-media-controls-mute-button {
  display: none;
}

video::-moz-media-controls-fullscreen-button {
  display: none;
}

video::-moz-media-controls-play-button {
  display: none;
}

video::-moz-media-controls-time-remaining-display {
  display: none;
}

//}
</style>
