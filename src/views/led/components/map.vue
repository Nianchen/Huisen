<template>
  <div class="table-list-body">
    <div class="mapbox">
      <my-map ref="map" adapter="Amap" :center="center" class="area-map" style="width:100%;height:100%" :zoom="14">
        <my-map-marker v-for="(led,index) in ledList" :key="led.id" :coordinate="[led.basicPole.lat,led.basicPole.lng]" :src="centerImg" :active-index="index"  @click="handleDetail(led)"/>
      </my-map>
    </div>

       <!-- 设备详情 -->
      <Dialog title="LED详情" :DialogVisibleFlag.sync="ledDetailVisiable" :isShowClose="false">
        <!-- 左侧预览框 -->
        <div v-loading="previewImg" element-loading-text="获取截图中" element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.9)" class="leftcontainer">
          <!-- <span style="font-size: 40px">暂无节目</span> -->
          <div class="previewimages"><img :src="baseImg" width="287vw" /></div>
        </div>
        <!-- 右侧大操作框 -->
       <div class="rightcontainer">
          <span class="Angle1"></span>
          <span class="Angle2"></span>
          <!-- 右上方按钮 -->
          <div class="rightbtns"></div>
          <!-- 右边操作框 -->
          <div class="rightbox">
            <!-- 设备详情 -->
            <div class="ledDetail">
               <div class="table-list dialog-table-box" style="width: 80%">
              <el-form  ref="form" :model="ledDetailInfo" label-width="auto">
                <div class="Dialogfont1">
            <el-row>
                <el-col class="dialog-table-title" :span="24">
                 <!-- <div class="arrow">
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
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.dept.deptName"
                        ></el-input> -->
                         <div style="font-size:18px;color:white">{{ledDetailInfo.dept.deptName}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="所属分组:">
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.group.name"
                        ></el-input> -->
                         <div style="font-size:18px;color:white">{{ledDetailInfo.group.name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="所在位置:">
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.basicPole.address"
                        ></el-input> -->
                         <div style="font-size:18px;color:white">{{ledDetailInfo.basicPole.address}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="所属灯杆:">
                        <!-- readonly只读属性 -->
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.basicPole.name"
                        ></el-input> -->
                         <div style="font-size:18px;color:white">{{ledDetailInfo.basicPole.name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col class="dialog-table-title">
                      <!-- <div class="arrow">
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
                      <el-form-item label="设备名称">
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.componentName"
                        ></el-input> -->
                          <div style="font-size:18px;color:white">{{ledDetailInfo.componentName}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="所属分组:">
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.group.name"
                        ></el-input> -->
                            <div style="font-size:18px;color:white">{{ledDetailInfo.group.name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="IP地址:">
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.serverIp"
                        ></el-input> -->
                            <div style="font-size:18px;color:white">{{ledDetailInfo.serverIp}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="端口:">
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.serverPort"
                        ></el-input> -->
                            <div style="font-size:18px;color:white">{{ledDetailInfo.serverPort}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="开关状态:">
                        <el-switch
                          v-model="ledDetailInfo.switchStatus"
                          disabled
                          active-text="开"
                          inactive-text="关"
                          active-value="1"
                          inactive-value="2"
                        ></el-switch>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="设备状态:">
                        <el-switch
                          v-model="ledDetailInfo.status"
                          disabled
                          active-text="在线"
                          inactive-text="离线故障"
                          active-value="1"
                          inactive-value="2"
                        >
                        </el-switch>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30" v-if="ledDetailInfo.controlId === null">
                    <el-col :span="12">
                      <el-form-item label="策略">
                        <el-input readonly value="暂无策略"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- <el-row :gutter="30">
                    <el-col :span="24">
                      <el-form-item
                        label="策略时间"
                        v-if="ledDetailInfo.controlId != null"
                      >
                        <el-checkbox-group v-model="timeweeks">
                          <el-checkbox
                            v-for="weekitem in weekData"
                            :key="weekitem.id"
                            :label="weekitem.id"
                            >{{ weekitem.name }}
                          </el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="30">
                    <el-col
                      :span="18"
                      v-for="(item, index) in timeAndProgram"
                      :key="index"
                    >
                      <el-form-item
                        label="节目:"
                        v-if="ledDetailInfo.controlId != null"
                      >
                     //   <div>
                     //     <span class="ledDetail_program">
                     //       {{item.name}}---{{item.startTime}}-{{item.endTime}}
                     //    </span>
                     //   </div>
                        <el-input
                          readonly
                          :value="
                            item.name +
                            '-----' +
                            item.startTime +
                            '-' +
                            item.endTime
                          "
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row> -->
                  </div>
              </el-form>
               </div>
              <div v-if="ledDetailInfo.status != '1'" class="showMalfunctions">
                <span>故障/离线</span>
              </div>
              <el-button type="primary" @click="getLedImg" class="clickGetImg">点击获取LED截图</el-button>
            </div>
          </div>
        </div>
      </Dialog>
  </div>
</template>
<script>
import {MyMap, MyMapMarker} from '$ui/map'
import {ledAllList,getImg,getLedDetail} from "@/api/led/ledApi";
import Dialog from "@/views/components/Dialog";
export default {
  components: {MyMap,MyMapMarker,Dialog},
  data() {
    return {
      center: [111.564234,32.27757],
      centerImg: require('@/assets/images/marker/led_icon.png'),
      ledList: [],
      // 查询参数
      queryParams: {
        deptId: null
      },
       baseImg: "",
      ledDetailVisiable:false,
      previewImg:false,
    ledDetailInfo: {dept:{deptName:null},basicPole:{name:null,address:null},group:{name:null}},
        timeAndProgram: [],
        getScreenimg: {
        serverIp: null,
        serverPort: null,
        cardNo: null,
      },
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
  },
  methods: {
    /** 查询灯杆列表 */
    getList() {
      ledAllList(this.queryParams).then((response) => {
        console.log(response);
         response.data[0].basicPole.lat=111.564234
        response.data[0].basicPole.lng=32.277575
        response.data[1].basicPole.lat=111.565478
        response.data[1].basicPole.lng=32.277588
        response.data[2].basicPole.lat=111.566589
        response.data[2].basicPole.lng=32.277647
        this.ledList = response.data;
      });
    },
    handleDetail(e) {
      // this.open = true
      let id = e.id;
      console.log(id);
      getLedDetail(id).then((res) => {
        console.log(res);
        this.timeAndProgram = res.data[0].ledProgramList;
        this.timeweeks = res.data[0].weekFilter.split(",");
        this.timeweeks = this.timeweeks.map(function (item, index, array) {
          return item - 0;
        });
        console.log(this.timeAndProgram);
        console.log(this.timeweeks);
      });
      this.ledDetailInfo = e;
      console.log("led详情", e);
      this.getScreenimg.serverIp = e.serverIp;
      this.getScreenimg.serverPort = e.serverPort;
      this.getScreenimg.cardNo = e.cardNo;

      // if (this.ledDetailInfo.controlId != null) {
      //   this.timeAndProgram = e.ledControlDetails.ledProgramList;
      //   this.timeweeks = e.ledControlDetails.weekFilter.split(",");
      //   console.log(this.timeweeks);
      // }

      console.log(this.ledDetailInfo);

      console.log(e);
       this.ledDetailVisiable = true
      // console.log(row)
    },
      // 获取屏幕截图
    getLedImg() {
      this.previewImg = true;
      console.log(this.getScreenimg);
      getImg(this.getScreenimg).then((res) => {
        console.log(res);
        if (res.code === 200) {
          if (res.msg === null) {
            this.previewImg = false;
            this.$message.error("屏幕未开启");
          } else {
            this.previewImg = false;
            this.baseImg = "data:image/png;base64," + res.msg;
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.mapbox{
  width: 75.3vw;
  height: 64.4vh;
  // border: 2px solid #0188BB;

}

// 设备详情
.leftcontainer {
  width: 19vw;
  height: 64vh;

  background: no-repeat url("../../../assets/images/led_bg.png") center;
  background-size: 99% 99%;
  position: absolute;
  // border: 2px solid #2b66af;
  top: 10vh;
  left: 3vw;
  // 左边预览图
  .previewimages {
    position: absolute;
    // width: 40vw;
    // height: 70vh;
    clip: rect(0 324px 573px 0);
    width: 110vw;
    top: 3vh;
    // height: 1vw;
    height: 108vh;
    left: 2vw;
     img{
      margin-left:0.3vw;
    }
  }
}
.rightcontainer {
  .Angle1 {
    width: 3.5vw;
    height: 7vh;
    position: absolute;
    border-top: 3px solid #00f5f8;
    border-right: 3px solid #00f5f8;
    top: 11.6vh;
    left: 60.7vw;
  }
  .Angle2 {
    width: 3.5vw;
    height: 7vh;
    position: absolute;
    border-bottom: 3px solid #00f5f8;
    border-left: 3px solid #00f5f8;
    top: 66.4vh;
    left: 22.8vw;
  }
  .rightbox {
       width: 41vw;
    height: 61vh;
    position: absolute;
    border: 3px solid #2b66af;
    top: 12vh;
    left: 23vw;
   .ledDetail {
      width: 48vw;
      height: 61vh;
      display: flex;
      justify-content: center;
      overflow-y: auto;
      // border: 1px solid;
     .ledDetail_program{
       color: #1890ff;
       font-size: 1.2em;
     }
    }
  }
  .controlStrategy {
    .controlStrategy_btns {
      height: 3vh;
      .controlStrategy_btns_change {
        position: absolute;
        border: 2px solid #034376;
        background-color: #04579a;
        top: 1vh;
        left: 2vw;
        color: #fff;
      }
    }
  }
  // 点击截图
.clickGetImg {
  position: absolute;
  top: -5vh;
  left: 1vw;
  z-index: 1111111111111111111;
}
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

}
  //  .arrow {
  //         //font-size: 0;
  //         margin-right: 10px;

  //         span {
  //           display: inline-block;
  //         }

  //         span::before, span::after {
  //           content: '';
  //           display: block;
  //           background-color: #0e66ae;
  //           width: 12px;
  //           height: 4px;
  //         }

  //         span::before {
  //           transform: rotate(45deg) translateY(-3px) skew(-45deg);
  //         }

  //         span::after {
  //           transform: rotate(-45deg) translateY(3px) skew(45deg);
  //         }

  //       }
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
// ::v-deep .el-input__inner{
//   position: absolute;
//   top: 1.3vh;
// }
// ::v-deep .el-select{
//   top:-3vh
// }
// ::v-deep .el-input__suffix{
//     top:30px
// }
// ::v-deep .el-row{
//   // margin-bottom:1vh !important;
// }
::v-deep .dialog-table-box .dialog-table-title{
  margin-top: 4vh;
  position: relative;
  left: 3vw;
  //  margin-right:10vw ;
  // div{
  //   margin-right:1vw ;
  //   margin-left:1.3vw ;
  // }
}

</style>
