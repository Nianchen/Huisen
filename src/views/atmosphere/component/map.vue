<template>
  <div class="table-list-body">
    <div class="mapbox">
      <my-map ref="map" adapter="Amap" :center="center" class="area-map" style="width:100%;height:100%" :zoom="14">
        <my-map-marker v-for="(weather,index) in weatherComponentList"
                       :key="weather.id"
                       :coordinate="[weather.pole.lat,weather.pole.lng]"
                       :src="centerImg"
                       :active-index="index"
                       @click="handleDetail(weather)"/>
      </my-map>
    </div>

     <Dialog :isshowClose="false"  title="实时气象" @handleDialogClose="handleDialogClose" :DialogVisibleFlag.sync="open" class="title">
      <div class="status-box">
        <!-- <dv-border-box-11 :color="['#018397']" backgroundColor="rgba(4,38,70)" title="实时气象"> -->
<!--
          <i @click="closeStatusDialog" :style="{
                'font-size': '3vh',
                'position': 'absolute',
                'top':'0',
                'right': '0',
                'cursor': 'pointer',
              }" class="el-icon-close"></i> -->

          <div class="status-container">
            <div class="status-left">
              <img src="../../../assets/images/weather.png" alt="" />
            </div>
            <div  class="rightfont">
            <div class="status-right">
              <img src="" alt="">
              <div class="right-pole">
                <div class='dgxx'>
                    <div class="arrow left-arrow">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div class="title" style="font-size:1em;font-weight:600">灯杆信息</div>
                      <div class="arrow right-arrow">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                <!-- <dv-decoration-7 style="width: 150px; height: 30px; margin: auto; color: #fff ">灯杆信息</dv-decoration-7> -->
                <div class="pole-detail"></div>
                  <el-row :gutter="10" class="row1">
                    <el-col :span="9" v-if="pole.name">所属灯杆：{{ pole.name }}</el-col>
                    <el-col :span="8" v-if="pole.deptName">所属道路：{{ pole.deptName }}</el-col>
                  </el-row>
                </div>
              </div>
              <div class="right-device">
                 <div class="arrow1 left-arrow1">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div class="title" style="font-size:1em;font-weight:600">设备信息</div>
                      <div class="arrow1 right-arrow1">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                <!-- <dv-decoration-7 style="
                    width: 150px;
                    height: 30px;
                    margin: auto;
                    color: #fff;
                    margin-top: 3vh;
                  ">设备信息</dv-decoration-7> -->
                <div class="device-detail">
                  <el-row :gutter="10">
                    <el-col :span="12" class="col1">在线状态：
                      <span  v-if="checkedItem.status === '1'" class='zaixian'>

                        <img src="../../../assets/images/button/status-online.png" alt="">
                        <span>在线</span>
                      </span>
                      <span class="zaixian" v-else >
                         <img src="../../../assets/images/button/status-offline.png" alt="">
                         <span>离线</span>
                      </span>
                    </el-col>
                    <el-col></el-col></el-row><el-row :gutter="10">
                    <el-col class="col2" :span="12">所属分组：{{ groupName}}</el-col>
                    <el-col class="col3" :span="12">服务器端口：{{ checkedItem.configServerPort }}</el-col></el-row>


                  <el-row :gutter="10">
                    <el-col class="col4" :span="14" style="font-size:0.98em">MAC：{{ checkedItem.mac }}</el-col>
                    <el-col class="col5" :span="10">IP：{{ checkedItem.configServerIp }}</el-col>

                  </el-row>
                </div>
              </div>
              <div class="right-weather" v-if="checkedItem">
                 <div class="arrow2 left-arrow2">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div class="title" style="font-size:1em;font-weight:600">实时气象</div>
                      <div class="arrow2 right-arrow2">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                <!-- <dv-decoration-7 style="
                    width: 150px;
                    height: 30px;
                    margin: auto;
                    color: #fff;
                    margin-top: 3vh;
                  ">实时气象</dv-decoration-7> -->
                <div class="weather-detail">
                  <el-row :gutter="10" style="margin-left:-3vw;margin-right:-2vw">
                    <el-col :span="16">温度：{{ checkedItem.temperture+"­°C" }}</el-col>
                    <el-col :span="8">湿度：{{ checkedItem.humidity+"%" }}</el-col>
                  </el-row>
                  <el-row :gutter="10" style="margin-left:-3vw;margin-right:-2vw">
                    <el-col :span="16">噪音：{{ checkedItem.noise+"dB"}}</el-col>
                    <el-col :span="8">PM2.5：{{ checkedItem.pm2+"μg/m³" }}</el-col>
                  </el-row>
                  <el-row :gutter="10" style="margin-left:-3vw;margin-right:-2vw">
                    <el-col :span="16">PM10：{{ checkedItem.pm10+"μg/m³" }}</el-col>
                    <el-col :span="8">气象指数：
                      <span class="excellent" v-if="this.countcolor===0">优</span>
                        <span class="excellent" v-else-if="this.countcolor===1">良</span>
                      <span class="good" v-else-if="this.countcolor===2">轻度</span>
                       <span class="good" v-else-if="this.countcolor===3">中度</span>
                      <span class="bad" v-else-if="this.countcolor===4">重度</span>
                        <!-- <span class="excellent" v-if="checkedItem.pm2>='0' && checkedItem.pm2<'35'">优</span>
                      <span class="good" v-else-if="checkedItem.pm2>'35' && checkedItem.pm2<='75'">良</span>
                      <span class="bad" v-else-if="checkedItem.pm2>'75'">差</span> -->

                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
            </div>
            <!-- </dv-border-box-13> -->

          </div>
          <div class="upbox"></div>
        <!-- </dv-border-box-11> -->
      </div>
    </Dialog>
  </div>
</template>
<script>
import {MyMap, MyMapMarker} from '$ui/map'
import {weatherAllList, getWeatherComponent} from "@/api/weather/weatherComponent";
import Dialog from "@/views/light/component/Dialog";
export default {
  components: {MyMap,MyMapMarker,Dialog,},
  data() {
    return {
       center: [111.564234, 32.27757],
      centerImg: require('@/assets/images/marker/atmosphere_icon.png'),
      weatherComponentList: [],
      // 查询参数
      queryParams: {
        deptId: null
      },
      open:false,
      openStatus: false,
        checkedItem: "",
      pole: {},
      countcolor:0,
      groupName:''
    };
  },
  created() {
    this.getList();
   
  },
  methods: {
    atmocolor(){
      console.log("dada")
      this.countcolor=0;
      if(this.checkedItem.humidity <30 || this.checkedItem.humidity>60){
          this.countcolor++
        }
      if(this.checkedItem.noise>55 && this.checkedItem.noise <=70){
           this.countcolor++
        }
      if(this.checkedItem.pm2>=75 && this.checkedItem.pm2<=120){
          this.countcolor++
        }
      if(this.checkedItem.pm10>75 && this.checkedItem.pm10<=120){
          this.countcolor++
        }
      if(this.checkedItem.pm10>120 || this.checkedItem.noise>70 || this.checkedItem.pm2>120){
             this.countcolor=4
      }
        console.log(this.countcolor)
    },
    /** 查询灯杆列表 */
    getList() {
      weatherAllList(this.queryParams).then((response) => {
        console.log(response.data);
        response.data.map((item)=>{
          item.name="谷城气象"
          item.pole.deptName="谷城县"
          item.pole.name="谷城灯杆"
        })
        response.data[0].pole.lat=111.564234
        response.data[0].pole.lng=32.277575
        response.data[1].pole.lat=111.565478
        response.data[1].pole.lng=32.277588
        response.data[2].pole.lat=111.566589
        response.data[2].pole.lng=32.277647
        this.weatherComponentList = response.data;
      });
    },
    handleDetail(row) {
       this.checkedItem = row;
      // this.checkedItem.pole = JSON.parse(this.checkedItem)
      this.pole = this.checkedItem.pole;
      this.groupName = this.checkedItem.weatherGroup.name
       this.atmocolor();
      // console.log(row)
      this.open = true
    },
    handleDialogClose(){
      this.open = false;
      this.getList();
    },
     closeStatusDialog() {
      this.open = false;
      this.getList();
    },
  },
};
</script>
<style lang="scss" scoped>
.mapbox{
  width: 73vw;
  height: 68vh;
  border: 2px solid #0188BB;

}
.dialog-box {
  width: 30vw !important;
}
.status-box {
  margin-top: 5%;
  margin-left: 22%;
  width: 57%;
  height: 80%;

  .status-top {
    color: #037da5;
    i {
      cursor: pointer;
    }
    .status-top-left {
      width: 80%;
      display: flex;
      justify-content: space-around;
      color: #fff;
    }
    font-size: 2vh;
    display: flex;
    justify-content: space-between;

    height: 20px;
    line-height: 20px;

  }
}
.dv-border-box-11 {
  // padding: 50px 50px;
  padding: 4.5vh 3vh 2.5vh;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
.status-container {
  width: 100%;
  height: 100%;
  padding: 3.5vh 0 0 0;
  // padding: 40px 30px;
  box-sizing: border-box;
  display: flex;

  justify-content: space-between;
  .status-left {
    width: 38%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 3%;
    left: 5%;
    img {
      width:80%;
      margin: auto;
    }
  }
  .status-right {
    width: 60%;
    height: 100%;
    padding: 4vh;
    color: white;
    font-size: 1.75vh;
    .pole-detail {
      // margin-top: 2vh;
    }
    .el-col {
      margin-top: 2vh;
    }
    span{
        color: #fff;
        display: inline-block;
        height: 3vh;
        width: 5vh;
        text-align: center;
        line-height: 3vh;

        // border: 1px solid #eee;
      }
    .device-detail{

      .device-online{
        background-color: rgb(18, 156, 18);
      }
      .device-outline{
        background-color: rgb(213, 224, 57);
      }
      margin-top: 1.2vh;
    }
    .weather-detail{
      .excellent{
        background-color: rgb(18, 156, 18);
      }
      .good{
        background-color: rgb(235, 192, 113);
      }
      .bad{
        background-color: red;
      }
    }
  }
}
  // .el-dialog__wrapper{
  //       background-color:rgba(0,0,0,0.6);
  //   }
.el-dialog__header {
  display: none !important;
}
.group ::v-deep .el-dialog__body {
  height: 90%;
  // width:50%
  width: 100% !important;
}
.group-body {
  margin-top: -22px !important;
}
.table-list {
  position: relative;
}
.el-dialog__wrapper ::v-deep .el-dialog.is-fullscreen {
  background: rgba(5,14,31,0.18);
}
.dialog-box ::v-deep .dialog-title[data-v-0bbe9357] {
  font-size: 2em !important;
}
.el-button {
  background-color: transparent;
}
.dialog .table-list .el-button {
  border: 1px solid #018397;
}
.table-list-body ::v-deep .element-loading-background{
  color: transparent  !important;
  background-color: transparent !important;
}
.clickBtn1 {
  position: absolute;
  top: 3vh;
  left: 44vw;
}
.clickBtn2 {
  position: absolute;
  top: 3vh;
  left: 19vw;
}
.upbox {
      position: relative;
      top: -110%;
      left: 24%;
      width: 32vw;
      height: 55vh;
      background: no-repeat url("../../../assets/images/detail_downbox.png");
      background-size: 100% 100%;
    }
    .rightfont{
      position: relative;
      top: -22%;
      left: 38%;
      width: 80vh;
    }
::v-deep element.style{
    margin-left: -5px;
    margin-right: -5px;
    position: fixed;
    top: 35%;
    right: 18%;
    width: 35vw;
}
::v-deep .el-dialog__headerbtn .el-dialog__close{
  color: white !important;
}
::v-deep .el-icon-close:before{
  position: fixed;
  top:17vh;
}
::v-deep .el-dialog__headerbtn .el-dialog__close:hover {
    color: #a09e9e !important;
}

::v-deep .pagination-container .el-pagination{
  right: -31vw;
  z-index: 1111;
}
.groupManager{
   ::v-deep .pagination-container .el-pagination{
     right: 0;
   }
}
.atmStatus{
  img{
    position: absolute;
   width: 22%;
    top: 19%;
    left: 40%;
  }
 &>span{
   position: absolute;
   top:25%;
   left: 46%;
   font-size: 1em;
 }

}
.detail_Img {
  width: 9%;
  cursor: pointer;
}
.title{
  font-family:-webkit-pictograph ;
   margin-left: 7.4vw;
}
::v-deep  .el-col-8 {
      padding-left: 5px;
    padding-right: 5px;
    position: absolute;
    left: 62%;
    top: 5%;
    width: 20vw;
    height: 1vh;
}
::v-deep  .el-col-9 {
      padding-left: 5px;
    padding-right: 5px;
    position: relative;
    left: -12%;
    top: 9%;
    width: 20vw;
    height: 1vh;
}
::v-deep .el-col-24 {
    width: 50%;
}
// ::v-deep  .el-col-12 {
//       padding-left: 5px;
//     padding-right: 5px;
//     position: absolute;
//     left: -12%;
//     top: 9%;
//     width: 20vw;
//     height: 1vh;
// }
.col1{
  position: relative;
  top: 17%;
  left: -12%;
}
.col3{
  position: relative ;
  top: -65%;
  right:62%;
}
.col5{
  position: relative;
  top: 100%;
  left: 4%;
}
.col2{
  position: relative;
  top: 100%;
  left: 62%;
}
.col4{
  position: relative;
  top: 18%;
  left: -12%;

}
.right-device{
  height: 20vh;
  margin-top: 4vh;
}
.zaixian{
 &>span{
  position: absolute;
  top: 0.4vh;
  left: 5vw;
  font-size:0.75em ;
   }
   img{
     position: relative;
     top: 22%;
     left: -8%;
     width: 105%;
   }
  }
 //灯杆信息两边符号
 .arrow{
  display: flex;
  justify-content: center;
  align-items: center;
  div{
    display: block;
    margin-right: 6px !important;
    margin-top: 4px;
    background-color: #0e66ae;
    width: 20px;
    height: 7px;
  }
}
.left-arrow{
  transform: skew(45deg);
  margin-left: 64px;
  :nth-child(1){
    opacity: 0.3;
  }
  :nth-child(2){
    opacity: 0.5;
  }
  position: absolute;
  top: 14%;
  left: 0.5%;
}
.right-arrow{
  transform: skew(-45deg);
  :nth-child(2){
    opacity: 0.5;
  }
  :nth-child(3){
    opacity: 0.3;
  }
  position: absolute;
  right: 48%;
  top: 14%;
}
.row1{
  margin-top: 2vh;
}
//设备信息两边符号
 .arrow1{
  display: flex;
  justify-content: center;
  align-items: center;
  div{
    display: block;
    margin-right: 6px !important;
    margin-top: 4px;
    background-color: #0e66ae;
    width: 20px;
    height: 7px;
  }
}
.left-arrow1{
  transform: skew(45deg);
  margin-left: 64px;
  :nth-child(1){
    opacity: 0.3;
  }
  :nth-child(2){
    opacity: 0.5;
  }
  position: absolute;
  top: 35.5%;
  left: 0.5%;
}
.right-arrow1{
  transform: skew(-45deg);
  :nth-child(2){
    opacity: 0.5;
  }
  :nth-child(3){
    opacity: 0.3;
  }
  position: absolute;
  right: 48%;
  top: 35.5%;
}
//实时气象两边符号
 .arrow2{
  display: flex;
  justify-content: center;
  align-items: center;
  div{
    display: block;
    margin-right: 6px !important;
    margin-top: 4px;
    background-color: #0e66ae;
    width: 20px;
    height: 7px;
  }
}
.left-arrow2{
  transform: skew(45deg);
  margin-left: 64px;
  :nth-child(1){
    opacity: 0.3;
  }
  :nth-child(2){
    opacity: 0.5;
  }
  position: absolute;
  top: 74.5%;
  left: 0.5%;
}
.right-arrow2{
  transform: skew(-45deg);
  :nth-child(2){
    opacity: 0.5;
  }
  :nth-child(3){
    opacity: 0.3;
  }
  position: absolute;
  right: 48%;
  top: 74.5%;
}
</style>
