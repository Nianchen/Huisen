<template>
  <div class="table-list-body">
    <div class="mapbox">
      <my-map ref="map" adapter="Amap" :center="center" class="area-map" style="width:100%;height:100%" :zoom="14">
        <my-map-marker v-for="(bc,index) in dataList" :key="bc.id" :coordinate="[bc.basicPole.lat,bc.basicPole.lng]" :src="centerImg" :active-index="index"  @click="handleDetail(bc)"/>
      </my-map>
    </div>
    <Dialog title="设备详情" :DialogVisibleFlag.sync="detailDeviceDialog" :isShowClose="false">
        <div class="broadcastmodel">
        </div>
        <div class="right">
          <div class="rightbox">
            <!-- 详情 -->
            <!-- <div class="showMalfunctions">
              <span>故障/离线</span>
            </div> -->
            <div class="rightbox_detail">
              <div class="table-list dialog-table-box" style="width: 80%">
                <el-form ref="form" :model="broadCastDetailData" label-width="auto">
                  <el-row>
                    <el-col class="dialog-table-title" :span="24">
                      <!-- <div class="arrow left-arrow">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div>灯杆信息</div> -->
                         <div class="arrow left-arrow">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div class="title" style="color:#fff;font-size:1.1em">灯杆信息</div>
                      <div class="arrow right-arrow">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="所属区域:">
                        <!-- <el-input readonly v-model="broadCastDetailData.dept.deptName"></el-input> -->
                        <div style="font-size:18px;color:white">{{broadCastDetailData.dept.deptName}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="服务器IP:">
                        <!-- <el-input readonly v-model="config.serverIp"></el-input> -->
                        <div style="font-size:18px;color:white">{{config.serverIp}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="所在位置:">
                        <!-- <el-input readonly v-model="broadCastDetailData.basicPole.address"></el-input> -->
                        <div style="font-size:18px;color:white">{{broadCastDetailData.basicPole.address}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="所属灯杆:">
                        <!-- <el-input readonly v-model="broadCastDetailData.basicPole.name"></el-input> -->
                        <div style="font-size:18px;color:white">{{broadCastDetailData.basicPole.name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col class="dialog-table-title">
                      <!-- <div class="arrow">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div> -->
                      <div class="arrow left-arrow">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div class="title" style="color:#fff;font-size:1.1em">设备信息</div>
                      <div class="arrow right-arrow">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="设备名称:">
                        <!-- <el-input readonly v-model="broadCastDetailData.broadcastName"></el-input> -->
                        <div style="font-size:18px;color:white">{{broadCastDetailData.broadcastName}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="所属分组:">
                        <!-- <el-input readonly v-model="broadCastDetailData.group.name"></el-input> -->
                        <div style="font-size:18px;color:white">{{broadCastDetailData.group.name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="IP:">
                        <!-- <el-input readonly v-model="broadCastDetailData.ip"></el-input> -->
                        <div style="font-size:18px;color:white">{{broadCastDetailData.ip}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="端口:">
                        <!-- <el-input readonly v-model="config.port"></el-input> -->
                        <div style="font-size:18px;color:white">{{config.port}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="型号:">
                        <!-- <el-input readonly v-model="config.brandModel"></el-input> -->
                        <div style="font-size:18px;color:white">{{config.brandModel}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="厂商:">
                        <!-- <el-input readonly v-model="config.brandName"></el-input> -->
                        <div style="font-size:18px;color:white">{{config.brandName}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="开关状态">
                        <!-- <el-input readonly v-model="ledDetailInfo.serverIp"></el-input> -->
                        <el-switch v-model="broadCastDetailData.status" disabled active-text="开" inactive-text="关" active-value="1"
                          inactive-value="0"></el-switch>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- <el-row :gutter="30" v-if="this.acceptData.controlId===null">
                    <el-col :span="12">
                      <el-form-item label="策略">
                        <el-input readonly value="暂无策略"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="30" v-if="this.acceptData.controlId!==null">
                    <el-col :span="24">
                      <el-form-item label="策略名称">
                        // <el-input readonly v-model="ledDetailInfo.serverIp"></el-input>
                        <el-input readonly v-model="bcDetailStrategy.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30" v-if="this.acceptData.controlId!==null">
                    <el-col :span="24">
                      <el-form-item label="策略时间">
                      //   <el-input readonly v-model="ledDetailInfo.serverIp"></el-input>
                        <el-checkbox-group v-model="tmpweek">
                          <el-checkbox v-for="weekitem in weekData" :key="weekitem.id" :label="weekitem.id">{{ weekitem.name }}</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30" v-if="this.acceptData.controlId!==null">
                    <el-col :span="12">
                      <el-form-item label="开始时间">
                        <el-input readonly v-model="bcDetailStrategy.startDate"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="结束时间">
                        <el-input readonly v-model="bcDetailStrategy.endDate"></el-input>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row :gutter="30" v-if="this.acceptData.controlId!==null">
                    <el-col :span="24">
                      <el-form-item label="音乐文件">
                        <el-select popperClass="ic-pagination" disabled multiple v-model="bcDetailStrategy.tmpAudio" placeholder="请选择节目文件"
                          style="width:29vw">
                          <el-option v-for="musicdata in MusicListData" :key="musicdata.audioId" :label="musicdata.audioName"
                            :value="musicdata.audioId">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row> -->
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
  </div>
</template>
<script>
import {MyMap, MyMapMarker} from '$ui/map'
import {getBCAllListData,getMusicList,getStrategyData} from "@/api/broadcast/broadcastApi";
import Dialog from "@/views/components/Dialog";
export default {
  components: {MyMap,MyMapMarker,Dialog},
  data() {
    return {
      center: [112.83464527966484, 32.651482978328715],
      centerImg: require('@/assets/images/marker/broadcast_icon.png'),
      dataList: [],
      // 查询参数
      queryParams: {
        deptId: null
      },
      open:false,
        detailDeviceDialog: false,
           broadCastDetailData: {
        dept: { deptName: null },
        basicPole: { name: null },
        group: { name: null },
      },
        config:{},
        bcDetailStrategy:[],
        MusicListData:{},
        acceptData:{id:null},
        musicQueryParams:{

        },
        tmpweek:[],
         weekData: [
        { name: "周一", id: 2 },
        { name: "周二", id: 3 },
        { name: "周三", id: 4 },
        { name: "周四", id: 5 },
        { name: "周五", id: 6 },
        { name: "周六", id: 7 },
        { name: "周日", id: 1 },
      ],
    };
  },
  created() {
    this.getList();
    this.getMusicData()
  },
  methods: {
    /** 查询灯杆列表 */
    getList() {
      getBCAllListData(this.queryParams).then((e) => {
        this.dataList=e.data
        console.log(this.dataList);
      });
    },
    handleDetail(e) {
      this.detailDeviceDialog = true
      this.broadCastDetailData = e;
      console.log("设备详情列表-------------", e);
      this.acceptData.controlId = e.controlId;
      this.config=e.config.replace(/'/g,'"')
      this.config=JSON.parse(this.config)
      getStrategyData(this.acceptData).then((res) => {
        console.log("策略详情输出的数据", res);
        this.bcDetailStrategy = res.rows[0];
        this.tmpweek = res.rows[0].dateType.split("");
        this.tmpweek = this.tmpweek.map(
          function (item, index, array) {
            return item - 0;
          }
        );
        this.bcDetailStrategy.tmpAudio = res.rows[0].resourceIds
          .split(",")
          .map(function (item, index, array) {
            return item - 0;
          });
      });
    },
     getMusicData() {
      getMusicList(this.musicQueryParams).then((res) => {
        console.log("音乐列表-------------------", res);
        if (res.code === 200) {
          this.MusicListData = res.rows;
        }
      });
    },
  },

  mounted(){
      this.$bus.$on("areamessage", (res) => {
      // console.log(res);
      this.queryParams.deptId = res;
      console.log(this.queryParams);
      this.getList();
    });
  }
};
</script>
<style lang="scss" scoped>
.mapbox{
  width: 73.4vw;
  height: 64.4vh;
  //width: 100%;
  //height: 100%;
  // border: 2px solid #0188BB;
}
.broadcastmodel {
  position: absolute;
  // top: 5vh;
  left: -2vw;
  width: 29vw;
  height: 62vh;
  background: no-repeat url("../../../assets/images/broadCastModel.png") center;
  background-size: 100% 100%;
}

.right {
  .rightbox {
    position: absolute;
    width: 39vw;
    height: 65vh;
    top: 9.5vh;
    left: 23vw;
    background: no-repeat url("../../../assets/images/detail_downbox.png") center;
    background-size: 100% 100%;
    // border: 3px solid #0075a9;
    // 详情显示故障报警
    .showMalfunctions {
      position: absolute;
      top: -5vh;
      left: 28vw;
      z-index: 111111111;
      & > span {
        color: red;
        font-size: 1.5em;
        font-weight: bold;
      }
    }
    .rightbox_detail {
      width: 39vw;
      display: flex;
      justify-content: space-between;
      height: 59vh;
      // border: 1px solid;
      margin-top: 4vh;
      margin-left: 7.5vw;
      overflow-y: auto;
      .dialog-table-title{
        justify-content: center;
        position: relative;
        left: -4.8vw;
    }
  }
}
}
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
}
.right-arrow{
  transform: skew(-45deg);
  :nth-child(2){
    opacity: 0.5;
  }
  :nth-child(3){
    opacity: 0.3;
  }
}
::v-deep .el-switch__label {
  color: #fff;
}
.broadcast-btn{
  position: absolute;
  top: 15%;
  left: 33%;
  font-size: 14px;
  span{
    position: absolute;
    top: 12%;
    left: 28%;
  }
  .celue{
    left: 19%;
  }
}
.broadcast-opt{
  cursor: pointer;
  position: absolute;
  top:20%;
  left:42%;
  img{
    width:80%;
    height: 80%;
  }
}
::v-deep .el-input__inner{
  position: absolute;
  top: 1.3vh;
}
::v-deep .el-select{
  top:-3vh
}
::v-deep .el-input__suffix{
    top:30px
}
::v-deep .el-row{
  margin-bottom:1.2vh !important;
}
</style>
