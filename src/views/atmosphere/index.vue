<template>
  <div class="camera">

    <div class="header-navbar">
      <Header></Header>
      <!-- <Navbar :router-arr="routerArr" class="navbar"></Navbar> -->
    </div>
    <!-- <div class="router-view-box"> -->
    <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
    </transition>
    <!-- </div> -->
  </div>
</template>

<script>
import Header from "@/views/components/Header";
import Navbar from "@/views/components/Navbar";

export default {
  name: "index",
  components: {
    Header,
    Navbar,
  },
  data() {
    return {
      // routerArr:[
      //   {
      //     title:'分组',
      //     toPath:'/atmosphere/group',
      //     action:'group'
      //   },


      //   {
      //     title:'故障报警',
      //     toPath:'/atmosphere/warning',
      //     action:'warning'
      //   }
      // ]
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/poleIndex.scss';
.camera {
  overflow: hidden;
  width: 100%;
  //min-width: 1920px;
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
  }

  .router-view-box {
    width: 100%;
  }


}

</style>
