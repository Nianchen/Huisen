<template>
  <div class="table-list-body area-map">
    <div class="mapbox">
      <my-map ref="map" adapter="Amap" :center="center" class="area-map" style="width:100%;height:100%" :zoom="14">
        <my-map-marker v-for="(call,index) in dataList" :key="call.id" :coordinate="[call.pole.lat,call.pole.lng]"
                       :src="centerImg" :active-index="index" @click="handleDetail(call)"/>
      </my-map>
    </div>
    <img class="status-bg" :src="groupRightBgImg" alt="group右侧的背景图片">
  </div>
</template>
<script>
import groupRightBgImg from "@/assets/images/camera/bg_3_4.png"
import {MyMap, MyMapMarker} from '$ui/map'
import {allListComponent} from "@/api/call/component";

export default {
  components: {MyMap, MyMapMarker,},
  data() {
    return {
      groupRightBgImg,
        center: [111.564234,32.27757],
      centerImg: require('@/assets/images/marker/call_icon.png'),
      dataList: [],
      // 查询参数
      queryParams: {
        deptId: null
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询灯杆列表 */
    getList() {
      allListComponent(this.queryParams).then((response) => {
        this.dataList = response.data;
           response.data[0].basicPole.lat=111.564234
        response.data[0].basicPole.lng=32.277575
        response.data[1].basicPole.lat=111.565478
        response.data[1].basicPole.lng=32.277588
        response.data[2].basicPole.lat=111.566589
        response.data[2].basicPole.lng=32.277647
        console.log(this.dataList)
      });
    },
    handleDetail(row) {
      this.alarmDialogFlag = true
      // this.$bus.$emit('alarmDialogFlag', {
      //   dialogView: 'areaMap',
      //   data: row
      // })
    }
  },
};
</script>
<style lang="scss" scoped>
.area-map {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .status-bg {
    position: absolute;
    pointer-events: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}

.mapbox {
  width: 94%;
  height: 85%;
  transform: translate(0.9%, -1%);
  //width: 66.3vw;
  //height: 63vh;
}

</style>
