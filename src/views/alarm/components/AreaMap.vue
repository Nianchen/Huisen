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
      center: [112.83464527966484, 32.651482978328715],
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
