<template>
  <div class="ic-map">
    <my-map width="100%" height="100%" :filter="model" :adapter="adapter">
      <my-map-image :coordinate="[113.261999, 23.130592]" :scale="0.3" :src="mapImg"
                    @click="handleClick">
      </my-map-image>
      <my-map-marker :coordinate="[112.261999, 23.130592]" trigger="hover" :scale="0.3"
                     :src="mapImg" @click="handleClick">
        <template v-slot="{marker}">
          坐标：{{marker.coordinate}} <br>
          数据项：{{marker.items}} <br>
          集群: {{marker.cluster}} <br>
        </template>
      </my-map-marker>
    </my-map>
  </div>

</template>

<script>

import Baidu from '$ui/map/sources/preview/Baidu.png'
import Amap from '$ui/map/sources/preview/Amap.png'
import OSM from '$ui/map/sources/preview/OSM.png'
import TDT from '$ui/map/sources/preview/TDT.png'
import cameraImg from '@/assets/images/camera/camera_3.png'
import {MyMap, MyMapIcon, MyMapImage, MyMapPalette, MyMapLayers,MyMapMarker} from '$ui/map'
import {deepBlue, techBlue, black, orange, blue} from '$ui/map/utils/filters'
import ChinaOnlineStreetPurplishBlue from '$ui/map/sources/preview/ChinaOnlineStreetPurplishBlue.png'
import {createLayer} from "@xdh/my/ui/lib/map/utils/layer";


export default {
  name: "Map",
  props: {
    mapImg: {
      type: String,
      default() {
        return cameraImg
      }
    }
  },
  components: {
    MyMap,
    MyMapIcon,
    MyMapImage,
    MyMapPalette,
    MyMapLayers,
    MyMapMarker
  },
  data() {
    return {
      cameraImg: cameraImg,
      filter: blue,
      adapter: null,
      viewOptions: {
        style: 'black'
      },
      layers: [
        {
          title: '百度',
          adapter: 'Baidu',
          preview: Baidu
        },
        {
          title: '高德',
          adapter: 'Amap',
          preview: Amap
        },
        {
          title: 'OSM',
          adapter: 'OSM',
          preview: OSM
        },
        {
          title: '天地图',
          adapter: 'TDT',
          preview: TDT
        }
      ],
      model: {}

    }
  },
  created() {
    this.layers = this.createLayers()
    this.adapter = this.layers.adapter
  },
  methods: {
    change(val) {
      this.model = val
    },
    handleClick() {
      this.$message.success('点击了')
    },
    createLayers() {
      return createLayer(() => {
        return {
          adapter: {
            type: 'XYZ',
            url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
            // url: 'http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=464554f64aa4f4e90e0321c17a57a331',
          },
          preview: ChinaOnlineStreetPurplishBlue
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ic-map {
  //background-color: rgb(70, 99, 153);
  width: 100%;
  height: 100%;

}

</style>
