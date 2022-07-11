<template>
  <div class="group-left-top">
    <div class="arrow">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div>
      <router-link to="/">
        <div class="home-img">
          <img :src="groupHomeImg" alt="回到主页">
        </div>
      </router-link>
    </div>
    <div class="img-logo">
      <img :src="smalllogo1">
    </div>
    <div class="title">{{title}}</div>
  </div>
</template>

<script>
import groupHomeImg from "@/assets/images/camera/home.png";
import smalllogo1 from '@/assets/images/udior/main.png';
export default {
  name: "HomeHeader",
  props:{
    title:{
      type:String,
      required: true
    }
  },
  data() {
    return {
      groupHomeImg: groupHomeImg,
      smalllogo1:smalllogo1
    }
  }
}
</script>

<style lang="scss" scoped>
.img-logo{
  position: fixed;
  left: 87.5%;
}
.group-left-top {
  position: absolute;
  left: 69vw;
  top: 4vh;
  width: 19.3vw;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .arrow {
    position: relative;
    left: 10%;
    span {
      display: inline-block;
    }

    span::before, span::after {
      content: '';
      display: block;
      background-color: #0e66ae;
      width: 16px;
      height: 4px;

    }

    span::before {
      transform: rotate(45deg) translateY(-5px) skew(-45deg);
    }

    span::after {
      transform: rotate(-45deg) translateY(5px) skew(45deg);
    }

  }

  .home-img {
    position: relative;
    cursor: pointer;
    width: 2vw;
    height: 3.6vh;
    left: 39%;
    top: 0.5vh;
    img{
      width: 70%;
      height: 70%;
    }
  }
  .title {
    position: relative;
    font-size: 1.4em;
    color: #0175D4;
    margin: 0;
    left: -5%;
  }

  .title::after {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    border-radius: 5px;
    background-color: #007cb6;
  }

}
</style>
