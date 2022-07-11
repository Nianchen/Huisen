<template>
  <div class="main">
     <audio preload="auto" src="./components/4031.wav"  ></audio>
    <button class="logout-btn" v-on:click="logout">退出登录</button>
    <!--    <img class="main-bg" draggable="false" src="../assets/images/login-rigth-img.png" alt="">-->
    <div class="header">
      <div class="gerui-logon">
        <img :src="geruilogoImg">
      </div>
      <h1>智慧路灯物联网管理云平台</h1>
      <h2>THE PLATFORM OF INTELLLIGENT STREET LIGHT CLOUD</h2>
    </div>
    <div class="body">
      <el-row :gutter="30" v-for="(menuRouteGroup,index) in sysMenuRoutesGroup" v-bind:key="index + '_r'">
        <el-col :span="8" v-for="(menuRoute,colIndex) in menuRouteGroup" v-bind:key="colIndex + '_c'">
          <router-link :to="menuRoute.path">
            <div class="pole box">
              <img draggable="false" :src="menuRoute.img" >
              <span>{{menuRoute.title}}</span>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div class="el-login-footer">
<!--      <span>Copyright © 2018-2021 南阳格瑞光电科技股份有限公司 All Rights Reserved.</span>-->
    </div>
  </div>
</template>

<script>
import geruilogoImg from '@/assets/images/udior/login.png'
import PoleImg from '../assets/images/index_pole1.png'
import LightImg from '../assets/images/index-light.png'
import AtmosphereImg from '../assets/images/index-weather.png'
import CameraImg from '../assets/images/index-camera.png'
import LedImg from '../assets/images/index-led.png'
import BroadcastImg from '../assets/images/index-call.png'
import AlarmImg from '../assets/images/index-warning.png'
import YwImg from '../assets/images/index-yw.png'
import SystemImg from '../assets/images/index-system.png'
export default {
  name: "index_v2",
  data() {
    return {
      geruilogoImg:geruilogoImg,
      sysMenuRoutes:this.$store.getters.sysmenu_routes,
      sysMenuRoutesGroup:[],
      indexMenuMap:new Map([
        ['Pole',{img: PoleImg}],
        ['Light',{ img:LightImg}],
        ['Atmosphere',{ img:AtmosphereImg}],
        ['Camera',{ img:CameraImg}],
        ['Led',{ img:LedImg}],
        ['Broadcast',{ img:BroadcastImg}],
        ['Alarm',{ img:AlarmImg}],
        ['Yw',{ img:YwImg}],
        ['System',{ img:SystemImg,path:'/system/dept'}]
      ])
    }
  },
  created(){
    console.log(this.sysMenuRoutes)
    this.menuGroup(3,this.sysMenuRoutes);
  },
  methods: {
    menuGroup(num,menuRoutes){
      let group = [];
      let child = [];
      menuRoutes = menuRoutes.filter(item=>item.name != 'Monitor' && item.redirect != '/404');
      menuRoutes.forEach((item,index,array)=>{
        if(item.name){
          let childData = this.indexMenuMap.get(item.name)
          item.img = childData.img
          item.path = childData.path
        }else{
          item.img = this.indexMenuMap.get(item.children[0].name).img
          item.path = "/" + item.children[0].path
        }
        item.title = item.meta.title

        if(index != 0 && index % num === 0){
          group.push(child);
          child = [];
        }
        child.push(item)
        if(menuRoutes.length === index+1){
          group.push(child);
        }
      })
      this.sysMenuRoutesGroup = group;
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
//* {
//  margin: 0;
//  padding: 0;
//}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.gerui-logon{
  position: fixed;
  left: 1%;
  img{
    width: 300px;
  }
}
img {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.main {
  position: relative;
  width: 100%;
  height: 100vh;
  //background: #0c297b;
  background: linear-gradient(to bottom, #0c297b, #152a67);
  //background: url("../assets/images/login-rigth-img.png");
  //background: #010f1c url("../assets/images/camera/bg.jpg");
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: space-around;

  .logout-btn {
    position: absolute;
    top: 0;
    right: 0;

    background: transparent;
    outline: none;
    border: 1px solid #0e5da5;
    color: #0e5da5;
    cursor: pointer;

    padding: 5px;

    &:hover {
      color: #0da4d6;
      border: 1px solid #0da4d6;
    }
  }

  .main-bg {
    position: absolute;
    top: 55%;
    left: 47%;
    transform: translate(-50%, -50%);
    width: 105%;
    height: 105%;
  }

  h1, h2 {
    position: relative;
    z-index: 10;
    color: white;
    text-shadow: 0 0 100px #424242;
  }

  h1 {
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: 0.4vw;
  }

  h2 {
    margin-top: -20px;
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.15vw;
  }

  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 27vw;
    height: 22vh;
    border-radius: 6px;
    opacity: 0.85;
    cursor: pointer;
    //box-shadow: 0 0 10px #424242;
    background-color: #0e66ae;
    //background-image: radial-gradient(rgba(2, 94, 170, .1), rgba(2, 94, 170, .2), rgba(2, 94,
    //  170, .4));
    transition: all 0.5s ease;

    &:hover {
      //background-image: radial-gradient(rgba(2, 94, 170, .1), rgba(2, 94, 170, .5), rgba(2, 90, 163, 0.9));
      background-color: #527dce;
      transform: translateY(-5%);
      //transform: scale(1);
      opacity: 1;
    }

    &:hover img {
      width: 50%;
      height: auto;
      transform: translateY(-5%);
    }

    &:hover span {
      font-size: 1.5rem;
      transform: translateY(-40%);
    }

    & > img {
      width: 45%;
      height: auto;
      transition: all 0.5s ease;
    }

    span {
      color: white;
      font-size: 1.4rem;
      letter-spacing: 0.15vw;
      transition: all 0.5s ease;
    }
  }
  .header{
   text-align: center;
  }

  // .pole {
  //   &>img{
  //      width: 50%;
  //   }

  // }
  //
  //.light {
  //  background-color: #3a86e3;
  //}
  //
  //.weather {
  //  background-color: #bb433c;
  //}
  //
  //.camera {
  //background-color: #dbb040;
  //}

  //
  //.led {
  //  background-color: #299911;
  //}
  //
  //.call {
  //  background-color: #0f528c;
  //}
  //
  //.warning {
  //  background-color: #efbbc3;
  //}
  //
  //.yw {
  //  background-color: #159dd7;
  //}
  //
  //.system {
  //  background-color: #6bbf7f;
  //}
  //
  .el-row {
    margin-bottom: 30px;
  }

  //& > img {
  //  position: absolute;
  //  z-index: 0;
  //  //width: 100%;
  //  //width: auto;
  //  height: 1016px;
  //  width: 100vw;
  //}
}
</style>
