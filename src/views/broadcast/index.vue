<template>
  <div class="camera">
    <div class="header-navbar">
      <LedHeader></LedHeader>
    </div>
    <div class="line1"></div>
    <div class="line2"></div>
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
import { title } from "process";

export default {
  name: "index",
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
    LedHeader,
  },
};
</script>

<style lang="scss" scoped>
.camera {
  overflow: hidden;
  width: 100%;
  // min-width: 1920px;
  height: 100%;
  background: #010f1c url("../../assets/images/camera/bg.jpg");
  .header-navbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    // .navBtn {
    //   // position: absolute;
    //   margin-left: 800px;
    // }
  }
  .router-view-box {
    width: 100%;
  }
}

.dialogbox {
  position: absolute;
  top: 25vh;
  left: 10vw;
  height: 1vh;
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
  top: 14vh;
  left: 39vw;
  background: no-repeat url("../../assets/images/header_line.png");
  background-size: 100% 100%;
}
.el-table{
  font-size: 15px;
}

</style>
