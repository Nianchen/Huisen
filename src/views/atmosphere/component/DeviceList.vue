<template>
  <div class="table-list-body">
    <div  class="search">
      <el-input v-model="queryParams.name" @change="getList" placeholder="请输入灯光名称" style="width:13vw"></el-input>

         <div class="search_btn" @click="getList">
        <img src="../../../assets/images/button/register-pole.png" alt="">
        <span>搜索</span>
      </div>

      <!-- <div class="groupManger_btn" @click="handleGroupDialog">
        <img src="../../../assets/images/button/注册灯杆.png" alt="">
        <span>列表操作</span>
      </div> -->
    </div>
    <el-table v-loading="loading" :data="weatherComponentList" style="width: 95%"  :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',
              }">

      <el-table-column label="所属道路" align="center" prop="dept.deptName" />
      <el-table-column label="所属灯杆" align="center" prop="pole.name" />
      <!-- <el-table-column
              label="所属分组"
              align="center"

              prop="componentId"
            /> -->
      <el-table-column label="气象名称" align="center" prop="name" />

      <el-table-column align="center" label="气象状态" prop="status">
        <template slot-scope="scope">
<!--          <el-button v-if="scope.row.status" :style="{ color: '#5ee89c', border: '1px solid #5ee89c' }" type="primary">在线</el-button>-->
<!--          <el-button v-else :style="{ color: 'red', border: '1px solid #ff0000' }" type="primary">离线</el-button>-->
          <div class="atmStatus" v-if="scope.row.status === '1'">
            <img src="../../../assets/images/button/status-online.png" alt="">
            <span>在线</span>
          </div>
          <div class="atmStatus" v-if="scope.row.status === '2'">
            <img src="../../../assets/images/button/status-offline.png" alt="">
            <span>离线</span>
          </div>
          <div class="atmStatus" v-if="scope.row.status === '3'">
            <img src="../../../assets/images/button/status-fault.png" alt="">
            <span>故障</span>
          </div>

        </template>
      </el-table-column>
      <!-- <el-table-column label="配置参数" align="center" prop="config" /> -->

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-tooltip content="状态查看" placement="top" v-hasPermi="['weather:weatherComponent:view']">
            <!-- <el-button size="mini" type="text" icon="el-icon-view" @click="handleStatus(scope.row)" v-hasPermi="['weather:weatherComponent:edit']">详情
            </el-button> -->
            <img class="detail_Img" @click="handleStatus(scope.row)" src="../../../assets/images/detail_w.png" alt="详情">
          </el-tooltip>

          <el-tooltip content="管理分组" placement="top" v-hasPermi="['weather:weatherComponent:edit']">
            <!-- <el-button size="mini" type="text" icon="el-icon-view" @click="handleStatus(scope.row)" v-hasPermi="['weather:weatherComponent:edit']">详情
            </el-button> -->
            <img class="detail_Img1" @click="handleShow(scope.row)" src="../../../assets/images/guanli.png" alt="详情">
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination popperClass="ic-pagination" v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />
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
                <div class="pole-detail">
                  <el-row :gutter="10" class="row1">
                    <el-col :span="9" v-if="pole.name">所属灯杆：{{ pole.name }}</el-col>
                    <el-col :span="8" v-if="pole.deptName">所属道路：{{ pole.deptName }}</el-col>
                  </el-row></div>
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
                   </el-row><el-row :gutter="10">
                    <el-col class="col2" :span="12">所属分组：{{ groupName}}</el-col>
                    <el-col class="col3" :span="12">服务器端口：{{ checkedItem.configServerPort }}</el-col></el-row>


                  <el-row :gutter="10">
                    <el-col class="col4" :span="14">MAC：{{ checkedItem.mac }}</el-col>
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
                    <el-col :span="8">湿度：{{ checkedItem.humidity +"%"}}</el-col>
                  </el-row>
                  <el-row :gutter="10" style="margin-left:-3vw;margin-right:-2vw">
                    <el-col :span="16">噪音：{{ checkedItem.noise +"dB" }}</el-col>
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
                  <!-- <div style="width:15vw;margin-top:19px">
                  <span style="color:#fff;font-size:1.3em;font-weight:400;">气象指数</span>
                      <div class="excellent" v-if="this.countcolor===0">
                      <span>优</span></div>
                      <div class="excellent" v-if="this.countcolor===1">
                      <span >良</span></div>
                      <div class="good" v-else-if="this.countcolor===2">
                      <span >轻度</span></div>
                       <div class="good" v-else-if="this.countcolor===3">
                      <span >中度</span></div>
                      <div class="bad" v-else-if="this.countcolor===4">
                      <span >重度</span></div>
                </div> -->
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
    <div class="Dialogcl">
    <el-dialog
      :title="title1"
      custom-class="Dialogshebei"
      :visible.sync="GroupDialog"
      width="30%">
      <treeselect popperClass="ic-pagination"  v-model="treemodel" :options="treeData" :show-count="true" placeholder="请选择分组" @select="queryDeptSet" />
      <span slot="footer" class="dialog-footer">
    <el-button @click="handeleConfirm" type="primary">取 消</el-button>
    <el-button type="primary" @click="closeDialog">确 定</el-button>
  </span>
    </el-dialog>
    </div>
<!--    <GroupOperation class="groupManager" :DialogVisibleFlag.sync="GroupDialog" :componentType="GroupType"></GroupOperation>-->
  </div>
</template>
<script>
import {
  listWeatherComponent,
  getWeatherComponent,
  delWeatherComponent,
  addWeatherComponent,
  updateWeatherComponent
} from "@/api/weather/weatherComponent";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import Dialog from "@/views/light/component/Dialog";
import TableList from "@/views/components/TableList";
import GroupOperation from "@/views/components/GroupManager";
import {updateWeatherGroup} from "@/api/weather/weatherGroup"
import {MocklistWeatherComponent} from '@/utils/MockData'

export default {
  props: {},
  components: {
    Dialog,
    TableList,
    GroupOperation,
    Treeselect
  },
  data() {
    return {
      title1:'',
      treemodel:null,
      treeData:[],
      queryInfo:{
        groupId:'',
        id:''
      },
      weatherComponentList: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deptId: null,
        poleId: null,
        componentId: null,
        name: null,
        mac: null,
        ip: null,
        configServerIp: null,
        configServerPort: null,
        config: null,
        status: null,
        humidity: null,
        temperture: null,
        noise: null,
        pm2: null,
        pm10: null,
      },
      position: {
        percentWidth: "50%",
        vWidth: "53vw",
        topTitle: "1%",
        leftTitle: "17%",
      },
      title: "",
      open: false,
      openStatus: false,
      form: {},
      total: 0,
      checkedItem: "",
      pole: {},
      loading: true,
      GroupDialog: false,
      GroupType: "2",
      groupName: null,
      countcolor:0,
    };
  },
  created() {
    this.getList();

  },
  mounted() {
    this.$bus.$on('atmTreeData',res => {
      this.treeData = res
      console.log(this.treeData)
    })
    this.$bus.$on("groupId", (res) => {
      this.queryParams.groupId = res;
      this.getList();
    });
    this.$bus.$on("deptId", (res) => {
      this.queryParams.deptId = res;
      this.getList();
    });
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
    handeleConfirm(){
      this.GroupDialog = false
      this.treemodel = null
    },
    queryDeptSet(e){
      this.queryInfo.groupId = e.id
    },
    handleShow(row){
      this.GroupDialog = true
      this.queryInfo.id = row.id
      this.title1 = row.name
      console.log(row)
    },
    closeDialog(){
      updateWeatherGroup(this.queryInfo).then(res => {
        console.log(res)
        this.treemodel = null
        this.$message.success('修改成功')
      },err => {
        console.log(err)
        this.$message.error('修改失败')
      })
      this.getList();
      this.GroupDialog = false;
    },
    getList() {
      this.loading = true;
      console.log(this.queryParams);
      this.weatherComponentList = MocklistWeatherComponent(this.queryParams)
      listWeatherComponent(this.queryParams).then((response) => {
        // console.log(response.rows);
        // this.weatherComponentList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    onSubmit() {},
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    handleSizeChange() {},
    handleCurrentChange() {},

    change() {
      this.$forceUpdate();
    },
    //查看状态
    handleStatus(row) {
      console.log(row);
      this.open = true;
      this.checkedItem = row;
      // this.checkedItem.pole = JSON.parse(this.checkedItem)
      this.pole = this.checkedItem.pole;
      this.groupName = this.checkedItem.weatherGroup.name;
      this.atmocolor()
      console.log(this.pole.lat);
    },
    handleDialogClose() {
      this.open = false;
      this.getList();
    },
    /** 提交按钮 */
    submitForm() {
      console.log(this.form);
      // this.form.config = new Array.push(this.form.mac).push(this.form.ip).push(this.form.configServerIp).push(this.form.configServerPort)
      console.log(this.form);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.config = `{"servletId":"${this.form.servletId}","mac":"${this.form.mac}","ip":"${this.form.ip}","serverIp":"${this.form.configServerIp}","serverPort":"${this.form.configServerPort}"}`;
          console.log(11111111111111111);
          this.form.status = this.form.status.join(",");
          console.log(22222222222222222);
          if (this.form.id != null) {
            updateWeatherComponent(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.form.config = `{"servletId":"${this.form.servletId}","mac":"${this.form.mac}","ip":"${this.form.ip}","serverIp":"${this.form.configServerIp}","serverPort":"${this.form.configServerPort}"}`;
            addWeatherComponent(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        deptId: null,
        poleId: null,
        componentId: null,
        name: null,
        mac: null,
        ip: null,
        configServerIp: null,
        configServerPort: null,
        config: null,
        status: [],
        humidity: null,
        temperture: null,
        noise: null,
        pm2: null,
        pm10: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remarks: null,
        delFlag: null,
        servletId: null,
      };
      this.resetForm("form");
    },

    closeStatusDialog() {
      this.openStatus = false;
    },
    handleGroupDialog() {
      this.GroupDialog = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.Dialogcl{
  ::v-deep .el-dialog__close::before{
  position: fixed;
  left:63%;
  top: 37% !important;
  font-size: 1.2rem;
}
}
::v-deep .vue-treeselect__input{
  background: white;
}
::v-deep .vue-treeselect div{
  background-color: rgb(5,41,74);
  border: none;
}
::v-deep .vue-treeselect span{
  color: #fff;
}
::v-deep .vue-treeselect__menu{
  color: #fff !important;
}
::v-deep .vue-treeselect__single-value{
  color: #fff;
}
::v-deep .Dialogshebei{
  position: relative;
  top:30%;
  background-color: rgb(4,42,78) !important;
  .el-dialog__title{
    color: white !important;
  }
  .el-button{
    background-color: rgb(24,144,255) !important;
  }
}
.group {
  display: flex;
}
.table-list-body{
   .search {
    display: flex;
    position: relative;
    width: 35%;
    margin-bottom: -1vh;
    left: -20vw;
    top: 0vh;
    .search_btn {
      cursor: pointer;
      img {
        position: relative;
        width: 4vw;
        height: 4.3vh;
        top: -0.3vh;
      }
      span {
        position: absolute;
        top: 13%;
        left: 51%;
        font-size: 1.2em;
      }
    }
    .groupManger_btn {
      cursor: pointer;
      img {
        position: relative;
        width: 5vw;
        height: 4.3vh;
        top: -0.3vh;
      }
      span {
        position: absolute;
        top: 13%;
        left: 64%;
        font-size: 1.2em;
      }
    }
  }
}
.table-list {
  width: 100%;
  height: calc(100% - 14.8vh);
  color: white;
  display: flex;
  position: relative;
}

.el-dialog:not(.is-fullscreen) {
  margin-top: 10vh !important;
}
.el-table {
  color: #fff;
  overflow: auto;
  font-size: 1em;
  width: 93% !important;
  top: 1.3vh;
}
.el-table::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: rgb(211, 215, 219);
  border-radius: 5px;
}
.el-table::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-color: #037da5;
  border-radius: 5px;
  // box-shadow: inset 0 0 5px #f00;
}

.el-table .fixed-width .el-button--mini {
  color: #fff;
  font-size: 1.5vh;
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
      width: 80%;
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
      margin-top: 2vh;
      width: 21vw;

    }
    .el-col {
      margin-top: 2vh;
    }
    span {
      color: #fff;
      display: inline-block;
      height: 3vh;
      width: 5vh;
      text-align: center;
      line-height: 3vh;

      // border: 1px solid #eee;
    }
    .device-detail {
      .device-online {
        background-color: rgb(18, 156, 18);
      }
      .device-outline {
        background-color: rgb(213, 224, 57);
      }
      margin-top: 1.2vh;
      width: 21vw;
    }
    .weather-detail {
      .excellent {
        background-color: rgb(18, 156, 18);
      }
      .good {
        background-color: rgb(235, 192, 113);
      }
      .bad {
        background-color: red;
      }
      width: 21vw;
    }

  }
}
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
  background: rgba(5, 14, 31, 0.18);
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
.table-list-body ::v-deep .element-loading-background {
  color: transparent !important;
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
  width: 10%;
  cursor: pointer;
}
.detail_Img1{
  position: absolute;
  margin-left: 2%;
  top: 8%;
  width: 13%;
}
.title{
  font-family:-webkit-pictograph ;
  margin-left: 7.6vw;
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
.el-input{
  margin-top: 0.08vw !important;
}
::v-deep .vue-treeselect{
  border: 2px solid rgb(1,67,145);
  border-radius:10px;
}
</style>
