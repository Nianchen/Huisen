<template>
  <div class="webrtc-player">
    <video :id="videoId" class="ic-video" :controls="controls"
           controlsList='nodownload'
           disablePictureInPicture autoplay :muted="muted" loop></video>
  </div>
</template>

<script>
import {GbPlayer} from '@/utils/GbPlayer'
import {listAllConfig} from "@/api/system/config";

export default {
  name: "WebRtcPlayer",
  props: {
    videoObj: {
      type: Object
    },
    videoId: {
      type: String
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
      gbPlayer: null,
      oVideo: null
    }
  },
  beforeDestroy() {
    this.gbPlayer.closeWebRtc()
    this.gbPlayer = null
  },
  mounted() {
    listAllConfig().then(response => {
      // this.initWs(response.data.hkCallServer)
      this.gbPlayer = new GbPlayer(response.data.dhVideoViewServer)
    this.startPlay()
    });
    this.oVideo = document.getElementById(this.videoId)
  },
  methods: {
    startPlay() {
      if (this.videoObj.uuid !== '')
        this.gbPlayer.playWebrtc(this.videoId, this.videoObj.uuid, 0,)
    },
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
