<template>
  <div class="header">
    <div class="header-left">
      <div class="header-left-title">
        <span class="title-ch">智慧路灯管理平台</span>
        <span class="title-en English">The Platform Of Intelligent Street Light Cloud</span>
      </div>
      <img class="headerImg" :src="headerImg" alt="头部logo背景"/>
    </div>
    <div class="header-right">
      <div class="header-right-title">
<!--         <span>{{ parseTime(time) }}</span>-->
      </div>
      <img class="headerImg" :src="HeaderBg" alt="">
    </div>
    <!--    <div>-->
    <!--    <div class="title">-->
    <!--    </div>-->
    <!--    </div>-->
    <!--    <div class="header-right">-->
    <!--      <div class="header-right-title">-->
    <!--        <span><i class="el-icon-location-outline"></i>宛城区</span>-->
    <!--        <span>{{ parseTime(time) }}</span>-->
    <!--      </div>-->
    <!--      <img :src="HeaderBg" alt="">-->
    <!--    </div>-->
  </div>
</template>

<script>
import headerImg from "@/assets/images/camera/header_1.png";
import HeaderBg from "@/assets/images/header_bg.png"

export default {
  name: "Header",
  data() {
    return {
      headerImg: headerImg,
      HeaderBg: HeaderBg,
      time: ''
    };
  },
  mounted() {
    setInterval(() => {
      this.time = new Date().getTime()
    }, 1000)
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: space-between;

  .header-left {
    position: relative;
    width: 60.5vw;
  left: -0.2vw;
    .headerImg {
      pointer-events: none;
      width: 100%;
      height: 100%;
    }

    .header-left-title {
      position: absolute;
      top: 3.5vh;
      left: 4.5vw;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      color: white;

      .title-ch {
        text-align: left;
        font-size: 2.6em;
        letter-spacing: 1vw;
        margin-bottom: 0.3vw;
      }

      .title-en {
        text-align: left;
        width: 100%;
        font-size: 1.2em;
        letter-spacing: 0.1vw;
      }
    }
  }

  .header-right {
    position: absolute;
    top: 0vh;
    right: -3vw;
    //height: 100%;
    width: 34vw;

    img {
      pointer-events: none;
      width: 90%;
      height: auto;
    }

    .header-right-title {
      position: absolute;
      top: 50%;
      left: 81%;
      transform: translate(-40%, -60%);
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 24vw;
      font-size: 1.3rem;
      color: #006db5;

      span {
        display: block;
      }
    }
  }
  // user-select: none;
  // min-width: 900px;
  // width: 700px;
  //height: 140px;
  //width: 100vw;
  //position: relative;
  //overflow: hidden;
  //width: 60.5vw;
  //height: auto;
  //display: flex;
  //justify-content: space-between;
  //
  //.headerImg {
  //  pointer-events: none;
  //  width: 100%;
  //  height: 100%;
  //}
  //
  //.header-right {
  //  position: relative;
  //
  //  .header-right-title {
  //    position: absolute;
  //    top: 50%;
  //    left: 50%;
  //    transform: translate(-40%, -90%);
  //    display: flex;
  //    justify-content: space-between;
  //    align-items: center;
  //    width: 24vw;
  //    color: #006db5;
  //    font-size: 1.5rem;
  //
  //    span {
  //      display: block;
  //    }
  //  }
  //}
  //
  //.title {
  //  color: white;
  //  width: 26vw;
  //  //height: 7.5vh;
  //  position: absolute;
  //  top: 3.5vh;
  //  left: 4.5vw;
  //  display: flex;
  //  flex-direction: column;
  //  justify-content: flex-end;
  //
  //  .title-ch {
  //    text-align: left;
  //    font-size: 2.6em;
  //    letter-spacing: 0.3vw;
  //    margin-bottom: 0.3vw;
  //  }
  //
  //  .title-en {
  //    text-align: left;
  //    font-size: 1.2em;
  //    letter-spacing: 0.1vw;
  //  }
  //}
}
</style>
