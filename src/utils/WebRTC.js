/**
 * @project: ruoyi-ui
 * @file:    WebRTC.js
 * @author:  JiangHongxu
 * @date:    2021/5/17 15:13
 */

class WebRtcPlayer {
  static server = '';
  webrtc = null;
  video = null;
  server = null;
  codecLink = null;
  rsdpLink = null;
  stream = new MediaStream();
  uuid = null;

  constructor(id, uuid) {   //构造函数
    this.server = WebRtcPlayer.server;
    this.video = document.getElementById(id);
    this.uuid = uuid;
    this.createLinks();
    this.play();
  }

  createLinks() {
    this.codecLink = this.server + "/stream/codec/" + this.uuid
    this.rsdpLink = this.server + "/stream/receiver/" + this.uuid
  }
  play() {
    this.webrtc = new RTCPeerConnection({
      iceServers: [{
        urls: ["stun:49.232.223.84:35879"]
      }]
    });
    this.webrtc.onnegotiationneeded = this.handleNegotiationNeeded.bind(this);
    this.webrtc.ontrack = this.onTrack.bind(this);
    console.log(this.codecLink)
    fetch(this.codecLink)
      .then((response) => {
        console.log(response)
        response.json().then((data) => {
          data.forEach((item,) => {
            this.webrtc.addTransceiver(item.Type, {
              'direction': 'recvonly'
            });
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async handleNegotiationNeeded() {
    let offer = await this.webrtc.createOffer();
    await this.webrtc.setLocalDescription(offer);
    let formData = new FormData();
    formData.append('suuid', this.uuid);
    formData.append('data', btoa(this.webrtc.localDescription.sdp));
    fetch(this.rsdpLink, {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        response.text().then((data) => {
          this.webrtc.setRemoteDescription(new RTCSessionDescription({
            type: 'answer',
            sdp: atob(data)
          }))
        });
      })
      .catch((err) => {
        console.error(err)
      })
  }

  onTrack(event) {
    console.log(event)
    this.stream.addTrack(event.track);
    this.video.srcObject = this.stream;
    this.video.play();
  }

  load(uuid) {
    this.destroy();
    this.uuid = uuid;
    this.createLinks();
    this.play();
  }

  destroy() {
    console.log('webrtc已关闭')
    this.webrtc.close();
    this.webrtc = null;
    this.video.srcObject = null;
    this.stream = new MediaStream();
  }

  getImageUrl() {
    let canvas = document.createElement("canvas");
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    // eslint-disable-next-line no-undef
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let dataURL = canvas.toDataURL();
    canvas.remove();
    return dataURL;
  }

  static setServer(serv) {
    this.server = serv;
  }

  static addStream(streamIp) {
    return fetch(`//${this.server}/add/${streamIp}`, {
      method: 'get'
    })
  }
}

export default WebRtcPlayer
