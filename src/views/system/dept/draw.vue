<template>
  <div class="app-container">
    <my-map ref="map" adapter="Amap" :center="center" height="840px">
      <my-map-placement placement="right-top" style="padding: 10px;" theme="dark">
        <el-button size="small" :disabled="mode==='drawPoint'" @click="drawPoint">中心标注</el-button>
        <el-button size="small" :disabled="mode==='draw'" @click="draw">区域绘制</el-button>
        <el-button size="small" :disabled="mode==='modify'" @click="modify">边界细化</el-button>
        <el-button size="small" type="primary" @click="save">保存</el-button>
        <el-button size="small" @click="clear">清空</el-button>
      </my-map-placement>
      <my-map-draw ref="draw" type="Polygon" @ready="handleReady" manual/>
      <my-map-draw ref="point" type="Point" :brush="pointBrush" :effect="pointEffect" @drawstart="drawPointStart" @drawend="drawPointEnd" manual/>
      <my-map-image :coordinate="center" :src="centerImg" v-if="center"/>
    </my-map>
  </div>
</template>
<script>
import {MyMap,MyMapDraw,MyMapPlacement,MyMapImage} from '$ui/map'
import {saveGis, getGIS} from "@/api/system/dept";

  export default {
    name: "DeptDraw",
    components: {MyMap,MyMapDraw,MyMapPlacement,MyMapImage},
    data() {
      return {
        deptId:undefined,
        deptName:undefined,
        // 表单参数
        gisForm: {},
        zoom:13,
        center:[112.838492,32.687892],
        centerImg: require('@/assets/images/marker/location_red.png'),
        // 是否新增数据
        isNew: true,
        mode: 'finish',
        pointBrush: {
          circle: {
            radius: 8,
            fill: 'red'
          }
        },
        pointEffect:{}
      };
    },
    created() {
      this.deptId = Number(this.$route.params && this.$route.params.deptId);
      this.deptName = this.$route.params && this.$route.params.deptName;
      if(this.$route.params && this.$route.params.center.length !== 0) this.center = this.$route.params.center;
    },
    methods: {
      handleReady() {
        getGIS(this.deptId).then(response => {
          this.gisForm = response.data;
          if (this.gisForm && this.gisForm.boundary) {
            this.$refs.draw.fromJSON(this.gisForm.boundary);
            this.center = [this.gisForm.centerLat,this.gisForm.centerLng]
            this.$refs.map.moveTo(this.center);
            this.isNew = false;
          }else{
            this.reset();
            this.gisForm.id = this.deptId;
            this.isNew = true;
          }
        });
      },
      draw() {
        this.$refs.draw.finish()
        this.$refs.point.finish()
        this.$refs.draw.draw()
        this.mode = 'draw'
      },
      drawPoint(){
        this.$refs.draw.finish()
        this.$refs.point.finish()
        this.$refs.point.clear()
        this.$refs.point.draw()
        this.mode = 'drawPoint'
      },
      modify() {
        this.$refs.draw.finish()
        this.$refs.point.finish()
        this.$refs.draw.modify()
        this.mode = 'modify'
      },
      finish() {
        this.$refs.draw.finish()
        this.$refs.point.finish()
        this.mode = 'finish'
      },
      clear() {
        this.$refs.draw.clear()
        this.$refs.point.clear()
      },
      drawPointStart(e) {
        this.$refs.point.clear()
      },
      drawPointEnd(e){
        const features = e.feature
        const pointLocation = features.values_.geometry.flatCoordinates;
        this.center = pointLocation;
        this.gisForm.centerLat = pointLocation[0];
        this.gisForm.centerLng = pointLocation[1];
      },
      save() {
        //区域边界
        const json = this.$refs.draw.toJSON()
        if(json && JSON.parse(json).features.length !== 0 && this.gisForm.centerLat && this.gisForm.centerLng){
          this.gisForm.boundary = json;
          this.gisForm.flag = this.isNew ? "NEW" : "";
          saveGis(this.gisForm).then(response => {
            this.finish();
            this.isNew = false;
            this.msgSuccess("保存成功");
            this.$refs.map.moveTo(this.center);
          });
        }else{
          if(!this.gisForm.centerLat || !this.gisForm.centerLng){
            this.msgError("请标注中心位置！");
          }else{
            this.msgError("请绘制区域！");
          }
        }
      },
      // 表单重置
      reset() {
        this.gisForm = {
          id: undefined,
          boundary: undefined,
          centerLat: undefined,
          centerLng: undefined,
          color: undefined,
          zoom: undefined,
          flag:undefined
        };
        this.resetForm("gisForm");
      },
    }
  };
</script>
<style scoped>
.my-map-placement.is-dark{
  background: rgba(37, 46, 30, 0.6);
}
</style>
