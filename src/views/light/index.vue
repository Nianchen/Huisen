<template>
  <div class="camera">
    <div class="header-navbar">
      <LedHeader></LedHeader>
    </div>

    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <!-- </div>  -->
  </div>
</template>

<script>

import LedHeader from "@/views/components/Header";
export default {
  name: "index",
  data() {
    return {
      DialogVisibleFlag: false,
      bindDeviceDialog: false,
    };
  },
  methods: {
  },
  components: {
    LedHeader,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/poleIndex.scss';
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
    .navbar {
      margin: 4.5vh 1.5vw 0 0;
    }
    .nav-bar {
      margin-left: 100px;
    }
  }
}
.el-dialog__body {
  background-color: transparent;
}

    
</style>
