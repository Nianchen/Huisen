<template>
  <div class="camera">
    <div class="header-navbar">
      <LedHeader/>
    </div>
    
<div class="line2"></div>
    <div class="line1"></div>
    <div class="line3"></div>
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import LedHeader from "@/views/components/Header";
import buttonImg from "@/assets/images/camera/button_1.png";
import buttonActionImg from "@/assets/images/camera/button_1_action.png";

export default {
  name: "index",
  data() {
    return {
      buttonImg,
      buttonActionImg,
    };
  },

  components: {
    LedHeader,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/poleIndex.scss";
.camera {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: #010f1c url("../../assets/images/camera/bg.jpg");
}
.line2 {
  background: url("../../assets/images/camera/line_2.png");
  z-index: 11;
  width: 63vw;
  height: 5vh;
  top: 95vh;
  position: absolute;
  left: 4vw;
  background-size: 100% 100%;
}
.line1 {
  background: url("../../assets/images/camera/line_1.png");
  width: 66vw;
  height: 5vh;
  top: 94vh;
  position: absolute;
  left: 18vw;
  background-size: 100% 100%;
}
.line3 {
  width: 58vw;
  height: 7vh;
  position: absolute;
  top: 13vh;
  left: 39vw;
  background: no-repeat url("../../assets/images/header_line.png");
  background-size: 100% 100%;
}
.el-table{
  font-size: 15px;
}
</style>
