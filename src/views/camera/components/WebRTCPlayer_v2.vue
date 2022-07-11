<template>
<!--  <iframe height="100%" width="100%" src="http://61.163.231.201:8088/play/10.208.208.201"></iframe>-->
  <video :id="videoId" class="ic-video" :controls="controls"
         controlsList='nodownload'
         disablePictureInPicture autoplay :muted="muted" loop></video>
</template>

<script>
import WebRtcPlayer from '@/utils/WebRTC'
import {listAllConfig} from "@/api/system/config";

export default {
  name: "WebRTCPlayer_v2",
  props: {
    dhRTSPServer:{
      type: String,
    },
    videoId: {
      type: String
    },
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
      player: null
    }
  },
  beforeDestroy() {
    this.player.destroy()
    this.player=null
    this.oVideo=null
  },
  created() {
  },
  mounted() {
      // this.dhRTSPServer ='http://'+ this.dhRTSPServer
      console.log(this.dhRTSPServer)
      WebRtcPlayer.setServer(this.dhRTSPServer)
      this.player=new WebRtcPlayer(this.videoId,this.videoObj.ip)
      this.oVideo = document.getElementById(this.videoId)
  },
  methods: {
    play() {
      this.oVideo.play()
    },
    pause() {
      this.oVideo.pause()
    },
  }
}
</script>

<style lang="scss" scoped>
.webrtc-player {
  width: 100%;
  height: 100%;
  display: flex;
}

.ic-video {
  //position: absolute;
  width: 100%;
  height: 100%;
  object-fit: fill;
  //z-index: 1;
  //pointer-events: none;
}

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

//video::-webkit-media-controls-play-button {
//  display: none;
//}

video::-moz-media-controls-time-remaining-display {
  display: none;
}
</style>
