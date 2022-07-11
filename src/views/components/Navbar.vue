<template>
  <div class="box">
    <div class="nav-bar">
      <router-link v-for="(item,index) in routerArr" :to="item.toPath" :key="index">
        <div class="btn group">
          <span>{{ item.title }}</span>
          <img
            :src="isShowActionImg(item.action) ? buttonActionImg : buttonImg"
            :alt="item.title "
          />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>

import buttonImg from "@/assets/images/camera/button_1.png";
import buttonActionImg from "@/assets/images/camera/button_1_action.png";

export default {
  name: "Navbar",
  props: {
    routerArr: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      buttonImg,
      buttonActionImg,
    };
  },
  methods: {
    isShowActionImg(action){
      return this.$route.path.indexOf(action) !== -1;
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-bar {
    display: flex;

    .btn {
      position: relative;
      font-size: 1.4em;
      color: rgba(255, 255, 255, 0.5);
      width: 8.9vw;
      height: 6.4vh;
      //text-align: center;
      //line-height: 6.4vh;

      img {
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      span {
        width: 8.9vw;
        text-align: center;
        position: absolute;
        letter-spacing: 2px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
