<template>
  <div class="area table-list-body">
    <div class="mapbox table-list" v-loading="isLoading" element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.3)">
      <my-map ref="map" adapter="Amap" :center="center" class="area-map" style="width:100%;height:100%" :zoom="14">
        <my-map-marker v-for="(camera,index) in dataList" :key="camera.id" :scale="0.25"
                       :coordinate="[camera.pole.lat,camera.pole.lng]" :src="centerImg" :active-index="index"
                       @click="handleDetail(camera)"/>
      </my-map>
    </div>
    <img class="area-bg" :src="groupRightBgImg" alt="group右侧的背景图片">
  </div>
</template>
<script>
import groupRightBgImg from "@/assets/images/camera/bg_3_4.png"
import {MyMap, MyMapMarker} from '$ui/map'
import {listAllComponent} from "@/api/camera/component";

export default {
  components: {MyMap, MyMapMarker},
  data() {
    return {
      isLoading: false,
      groupRightBgImg,
      center: [111.564234, 32.27757],
      centerImg: require('@/assets/images/camera/camera_3.png'),
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
      this.isLoading = true
      listAllComponent(this.queryParams).then((response) => {
        response.data[0].pole.lat=111.564234
        response.data[0].pole.lng=32.277575
        response.data[1].pole.lat=111.565478
        response.data[1].pole.lng=32.277588
        response.data[2].pole.lat=111.566589
        response.data[2].pole.lng=32.277647
       this.dataList = response.data;
        console.log(this.dataList)
        this.isLoading = false
      });
    },
    handleDetail(row) {
      // console.log('config:',row.config)
      this.$emit('changeDialogVisibleFlag', {
        dialogView: 'cameraView',
        data: row
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.area {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .area-bg {
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
  background-color: #03223f;
  transform: translate(0.9%, -1%);
}
</style>
