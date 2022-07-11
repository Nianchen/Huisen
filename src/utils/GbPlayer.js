/**
 * @project ruoyi-ui
 * @fileName GbPlayer.js
 * @author JiangHongxu
 * @date 2021/4/29 8:43
 */
import axios from "axios";

/**
 * Golang[WebrtcToWeb Server] to Botem Player ...
 *
 */
export class GbPlayer {
  /**
   * Static method, variable area
   */
  DEFAULT_WEBRTC_SERVER_URI = ''
  static DEFAULT_USER_NAME = 'demo'
  static DEFAULT_PASSWORD = 'demo'
  webrtc = null
  stream = null
  webRtcServerUri = ''
  userName = GbPlayer.DEFAULT_USER_NAME
  password = GbPlayer.DEFAULT_PASSWORD

  /**
   * GbPlayer的构造函数
   * @param webRtcServerUri 服务器地址
   * @param userName 请求要用的用户名
   * @param password 请求要用的密码
   */
  constructor(webRtcServerUri = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName = GbPlayer.DEFAULT_USER_NAME, password = GbPlayer.DEFAULT_PASSWORD,) {
    this.webRtcServerUri = webRtcServerUri
    this.userName = userName
    this.password = password
  }

  /**
   * 获取视频流列表
   * @param webRtcServerUri 服务器地址
   * @param userName 请求要用的用户名
   * @param password 请求要用的密码
   * @returns {Promise<AxiosResponse<any>>}
   */
  static getStreams(webRtcServerUri = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName = GbPlayer.DEFAULT_USER_NAME, password = GbPlayer.DEFAULT_PASSWORD,) {
    return axios.get(webRtcServerUri + GbPlayer.GET_STREAMS_URL(), {
      auth: {
        username: userName,
        password: password,
      }
    })
  }

  /**
   * 通过streamId获取视频流详细信息
   * @param streamId 视频流id
   * @param webRtcServerUri 服务器地址
   * @param userName 请求要用的用户名
   * @param password 请求要用的密码
   * @returns {Promise<AxiosResponse<any>>}
   */
  static getStream(streamId, webRtcServerUri = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName = GbPlayer.DEFAULT_USER_NAME, password = GbPlayer.DEFAULT_PASSWORD,) {
    return axios.get(webRtcServerUri + GbPlayer.GET_STREAM_URL(streamId), {
      auth: {
        username: userName,
        password: password,
      }
    })
  }

  /**
   * 添加视频流地址
   * @param streamId 视频流id
   * @param webRtcServerUri 服务器地址
   * @param userName 请求要用的用户名
   * @param password 请求要用的密码
   * @returns {Promise<AxiosResponse<any>>}
   */
  static addStream(streamId, webRtcServerUri = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName = GbPlayer.DEFAULT_USER_NAME, password = GbPlayer.DEFAULT_PASSWORD,) {
    return axios.post(webRtcServerUri + GbPlayer.ADD_STREAM_URL(streamId), {
      name: streamId,
    }, {
      headers: {
        'Content-type': 'application/json'
      },
      auth: {
        username: userName,
        password: password,
      }
    })
  }

  /**
   * 修改视频流信息
   * @param streamId 视频流id
   * @param webRtcServerUri 服务器地址
   * @param userName 请求要用的用户名
   * @param password 请求要用的密码
   * @returns {Promise<AxiosResponse<any>>}
   */
  static editStream(streamId, webRtcServerUri = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName = GbPlayer.DEFAULT_USER_NAME, password = GbPlayer.DEFAULT_PASSWORD,) {
    return axios.post(webRtcServerUri + GbPlayer.EDIT_STREAM_URL(streamId), {
      name: streamId,
    }, {
      headers: {
        'Content-type': 'application/json'
      },
      auth: {
        username: userName,
        password: password,
      }
    })
  }

  /**
   * 重新加载视频流
   * @param streamId 视频流id
   * @param webRtcServerUri 服务器地址
   * @param userName 请求要用的用户名
   * @param password 请求要用的密码
   * @returns {Promise<AxiosResponse<any>>}
   */
  static reloadStream(streamId, webRtcServerUri = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName = GbPlayer.DEFAULT_USER_NAME, password = GbPlayer.DEFAULT_PASSWORD,) {
    return axios.get(webRtcServerUri + GbPlayer.RELOAD_STREAM_URL(streamId), {
      auth: {
        username: userName,
        password: password,
      }
    })
  }

  /**
   * deleteStream - Stream 通过streamId删除视频流.
   * @param streamId 视频流id
   * @param webRtcServerUri 服务器地址
   * @param userName 请求要用的用户名
   * @param password 请求要用的密码
   */
  static deleteStream(streamId, webRtcServerUri = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName = GbPlayer.DEFAULT_USER_NAME, password = GbPlayer.DEFAULT_PASSWORD,) {
    return axios.get(webRtcServerUri + GbPlayer.DELETE_STREAM_URL(streamId), {
      auth: {
        username: userName,
        password: password,
      }
    })
  }

  /**
   * 添加视频流通道
   * @param streamId 视频流id
   * @param channelId 通道号
   * @param rtspUri rtsp地址
   * @param webRtcServerUri 服务器地址
   * @param userName 用户名
   * @param password 用户密码
   * @param isOnDemand
   * @returns {Promise<AxiosResponse<any>>}
   */
  static addChannel(streamId, channelId, rtspUri, webRtcServer, userName = GbPlayer.DEFAULT_USER_NAME, password = GbPlayer.DEFAULT_PASSWORD, isOnDemand = true,) {
    GbPlayer.DEFAULT_WEBRTC_SERVER_URI = webRtcServer
    return axios.post(webRtcServer + GbPlayer.ADD_STREAM_URL(streamId, channelId), {
      name: streamId,
      channels: {
        0: {
          on_demand: isOnDemand,
          url: rtspUri,
          status: 0,
        }
      },
      uuid: streamId,
    }, {
      headers: {
        'Content-type': 'application/json'
      },
      auth: {
        username: userName,
        password: password,
      }
    })
  }

  /**
   * 修改视频流通道信息
   * @param streamId 视频流id
   * @param channelId 通道号
   * @param rtspUri rtsp地址
   * @param webRtcServerUri 服务器地址
   * @param userName 用户名
   * @param password 密码
   * @param isOnDemand
   * @returns {Promise<AxiosResponse<any>>}
   */
  static editChannel(streamId, channelId, rtspUri, webRtcServerUri = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName = GbPlayer.DEFAULT_USER_NAME, password = GbPlayer.DEFAULT_PASSWORD, isOnDemand = true,) {
    return axios.post(webRtcServerUri + GbPlayer.EDIT_CHANNEL_URL(streamId, channelId), {
      name: streamId,
      url: rtspUri,
      on_demand: isOnDemand,
      debug: false,
      status: 0,
    }, {
      headers: {
        'Content-type': 'application/json'
      },
      auth: {
        username: userName,
        password: password,
      }
    })
  }

  /**
   * 重新加载通道
   * @param streamId 视频流id
   * @param channelId 通道号
   * @param webRtcServerUri 服务器地址
   * @param userName 用户名
   * @param password 密码
   * @returns {Promise<AxiosResponse<any>>}
   */
  static reloadChannel(streamId, channelId, webRtcServerUri = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName = GbPlayer.DEFAULT_USER_NAME, password = GbPlayer.DEFAULT_PASSWORD,) {
    return axios.get(webRtcServerUri + GbPlayer.RELOAD_CHANNEL_URL(streamId, channelId), {
      auth: {
        username: userName,
        password: password,
      }
    })
  }

  /**
   * 删除通道
   * @param streamId 视频流id
   * @param channelId 通道号
   * @param webRtcServerUri 服务器地址
   * @param userName 用户名
   * @param password 密码
   * @returns {Promise<AxiosResponse<any>>}
   */
  static deleteChannel(streamId, channelId, webRtcServerUri = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName = GbPlayer.DEFAULT_USER_NAME, password = GbPlayer.DEFAULT_PASSWORD,) {
    return axios.get(webRtcServerUri + GbPlayer.DELETE_CHANNEL_URL(streamId, channelId), {
      auth: {
        username: userName,
        password: password,
      }
    })
  }

  /**
   * 以hls的形式拉流播放
   * @param videoElementId video的id
   * @param streamId 视频流id
   * @param channelId 通道号
   * @param webRtcServerUri 服务器地址
   */
  static playHls(videoElementId, streamId, channelId, webRtcServerUri = GbPlayer.DEFAULT_WEBRTC_SERVER_URI) {
    const videoElement = document.getElementById(videoElementId)
    videoElement.src = webRtcServerUri + GbPlayer.HLS_URL(streamId, channelId)
    videoElement.play().then()
  }

  /**
   * webrtc的形式拉流播放
   * @param videoElementId video的id
   * @param streamId 视频流的id
   * @param channelId 通道号
   * @param webRtcServerUri 服务器地址
   * @param userName 用户名
   * @param password 密码
   */
  playWebrtc(videoElementId, streamId, channelId, webRtcServerUri = GbPlayer.DEFAULT_WEBRTC_SERVER_URI, userName = GbPlayer.DEFAULT_USER_NAME, password = GbPlayer.DEFAULT_PASSWORD,) {
    const videoElement = document.getElementById(videoElementId)
    this.webrtc = new RTCPeerConnection()
    this.webrtc.onnegotiationneeded = async () => {
      const offer = await this.webrtc.createOffer();
      await this.webrtc.setLocalDescription(offer);
      let formData = new FormData();
      formData.append('data', btoa(this.webrtc.localDescription.sdp));
      axios.post(webRtcServerUri + GbPlayer.WEBRTC_URL(streamId, channelId), formData, {
        headers: {'Content-type': 'application/json'},
        auth: {
          username: userName,
          password: password,
        }
      }).then((response) => {
        try {
          this.webrtc.setRemoteDescription(new RTCSessionDescription({
            type: 'answer',
            sdp: atob(response.data)
          }))
        } catch (e) {
          console.warn(e);
        }
      }).catch(error => {
        console.log(error)
      })
    }

    this.webrtc.ontrack = function (event) {
      console.log(event.streams.length + ' track is delivered');
      videoElement.srcObject = event.streams[0];
      videoElement.play().then();
    }

    this.webrtc.addTransceiver('video', {
      direction: 'sendrecv'
    });

    let webrtcSendChannelInterval
    const webrtcSendChannel = this.webrtc.createDataChannel('GtbPLayerChannel');
    webrtcSendChannel.onclose = () => {
      console.log('sendChannel has closed')
      clearInterval(webrtcSendChannelInterval)
    }
    webrtcSendChannel.onopen = () => {
      console.log('sendChannel has opened');
      webrtcSendChannel.send('ping');
      webrtcSendChannelInterval = setInterval(() => {
        webrtcSendChannel.send('ping');
      }, 1000)
    }
    webrtcSendChannel.onmessage = e => console.log(e.data);
    videoElement.addEventListener('loadeddata', () => {
      videoElement.play().then()
      // makePic();
    })
    videoElement.addEventListener('error', () => {
      console.log("VIDEO_ERROR")
    })
  }

  closeWebRtc() {
    this.webrtc.close()
    this.webrtc = null
  }

  //static uris for RtspToWeb Apis ...
  static GET_STREAMS_URL = () => '/streams'
  static GET_STREAM_URL = (streamId) => `/stream/${streamId}/info`
  static ADD_STREAM_URL = (streamId) => `/stream/${streamId}/add`
  static EDIT_STREAM_URL = (streamId) => `/stream/${streamId}/edit`
  static RELOAD_STREAM_URL = (streamId) => `/stream/${streamId}/reload`
  static DELETE_STREAM_URL = (streamId) => `/stream/${streamId}/delete`
  static ADD_CHANNEL_URL = (streamId, channelId) => `/stream/${streamId}/channel/${channelId}/add`
  static EDIT_CHANNEL_URL = (streamId, channelId) => `/stream/${streamId}/channel/${channelId}/edit`
  static RELOAD_CHANNEL_URL = (streamId, channelId) => `/stream/${streamId}/channel/${channelId}/reload`
  static DELETE_CHANNEL_URL = (streamId, channelId) => `/stream/${streamId}/channel/${channelId}/delete`
  static HLS_URL = (streamId, channelId) => `/stream/${streamId}/channel/${channelId}/hls/live/index.m3u8`
  static WEBRTC_URL = (streamId, channelId) => `/stream/${streamId}/channel/${channelId}/webrtc?uuid=${streamId}&channel=${channelId}`

  getStreams() {
    GbPlayer.getStreams(this.webRtcServerUri).then(response => {
      console.log("GET STREAM : ", response)
    })
  }
}
