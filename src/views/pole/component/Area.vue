<template>
  <div class="table-list-body">
    <div class="mapbox">
      <my-map ref="map" adapter="Amap" :center="center" class="area-map" style="width:100%;height:100%" :zoom="13">
<!--        <my-map-marker  v-for="(pole,index) in poleList" :key="pole.id" :coordinate="[pole.lat,pole.lng]" :src="centerImg" :active-index="index"
                        @click="handleDetail(pole)" />-->

        <my-map-html v-for="(pole,index) in poleList" :key="pole.id" :position="[pole.lat,pole.lng]" @click="handleDetail(pole)">
          <el-popover
            placement="top-start"
            :visible-arrow="false"
            :title="pole.name"
            width="150"
            trigger="hover"
            :content="pole.address">
            <span class="myspan" slot="reference"></span>
          </el-popover>
        </my-map-html>

      </my-map>
    </div>
    <PoleDetail :DialogVisibleFlag.sync="open" :weatherComopnent="weatherComopnent" :poleDetail="poleDetail" :lightComponent="lightComponent"
      :broadcastComponent="broadcastComponent" :cameraComponent="cameraComponent" :ledComponent='ledComponent'/>
  </div>
</template>
<script>
import { MyMap, MyMapMarker,MyMapHtml } from "$ui/map";
import { allList, getPole } from "@/api/base/pole";
import PoleDetail from "@/views/pole/component/poleDetail";
import { getWeatherComponent } from "@/api/weather/weatherComponent";
import { getLampComponent } from "@/api/lamp/lampComponent";
import { getComponent } from "@/api/camera/component";
import { getBCListData } from "@/api/broadcast/broadcastApi";
import{getLedList} from '@/api/led/ledApi'
import {getComponentCall} from "@/api/call/component"
export default {
  components: { MyMap, MyMapMarker,MyMapHtml, PoleDetail },
  data() {
    return {
      center: [111.564234,32.27757],
      centerImg: require("@/assets/images/marker/pole_icon.png"),
      poleList: [],
      // 查询参数
      queryParams: {
        deptId: null,
      },
      open: false,
      lightComponent: {},
      weatherComopnent: {},
      broadcastComponent: {},
      cameraComponent: {},
      poleDetail: null,
      callComponent:{},
      itemDetail: {},
      ledComponent:{},

    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询灯杆列表 */
    getList() {
    
      allList(this.queryParams).then((response) => {
         response.data.map((item) => {
          (item.address = "谷城县谷水路"),
            (item.name = "谷城县灯杆"),
            (item.createBy = "Person"),
            (item.deptName = "谷城县")
        });
        response.data[0].lat=111.564234
        response.data[0].lng=32.277575
        response.data[1].lat=111.565478
        response.data[1].lng=32.277588
        response.data[2].lat=111.566589
        response.data[2].lng=32.277647
        this.poleList = response.data;
       
      });
    },
    handleDetail(row) {
      console.log(row);
      this.$bus.$emit('poleName',row.name)
      this.open = true;
      this.lightComponent = {};
      this.weatherComopnent = {};
      this.callComponent = {};
      this.broadcastComponent = {};
      this.cameraComponent={}
      this.poleId = row.id;
      this.ledComponent={}
      if (row.componentIds) {
        let ids = JSON.parse(row.componentIds);
        ids.forEach((item) => {
          switch (item.type) {
            case "1":
              getLampComponent(parseInt(item.id)).then((res) => {
                this.lightComponent = res.data;
              });
              break;
            case "2":
              getWeatherComponent(parseInt(item.id)).then((res) => {
                this.weatherComopnent = res.data;
              });
              break;
            case "3":
              getComponent(parseInt(item.id)).then((res) => {
                this.cameraComponent = res.data;
              });
              break;
               case '4':
              getLedList(parseInt(item.id)).then((res)=>{
                console.log(res);
                this.ledComponent=res.rows[0]
              });
              break;
            case "5":
              getBCListData(parseInt(item.id)).then((res) => {
                 console.log(res.rows[0]);
                this.broadcastComponent = res.rows[0];
                console.log( this.broadcastComponent);
              });
              break;
            case "6":
              getComponentCall(parseInt(item.id)).then(res => {
                this.callComponent = res.data
                this.$bus.$emit('Detail',res.data)
                console.log(this.callComponent)
              })
              break
          }
        });
      }
      getPole(row.id).then((res) => {
        console.log(res);
        this.poleDetail = res.data[1];
      });
      this.itemDetail = row;
      if (row.switchStatus === null) {
        this.itemDetail.switchStatus = false;
        this.percentage = 0;
      } else {
        this.itemDetail.switchStatus = true;
      }
      let that = this;
      setTimeout(() => {
        that.open = true;
      }, 700);
    },
  },
};
</script>
<style lang="scss" scoped>
.mapbox {
  width: 95%;
  height: 65vh !important;
  border: 2px solid #0188bb;
}

.myspan {
  background: url('../../../assets/images/marker/pole_icon.png') no-repeat;
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-size: 60px 60px;
}
//::v-deep .el-popover{
//  background-color: red !important;
//  color: #ffffff !important;
//}
//::v-deep .el-popover__title{
//  color: #ffffff !important;
//}
</style>
