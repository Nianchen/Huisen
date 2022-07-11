<template>
  <div class="group">
    <GoHome title="一键报警" class="group-header"></GoHome>
    <TreeList title="设备分组"
              :rightShowView="rightShowView">
    </TreeList>
    <div class="group-header-line">
      <img :src="HeaderLineImg" alt="">
    </div>
    <div class="group-right">
      <div class="group-right-button">
        <button :class="rightShowView==='eventList'? 'button-active':''"
                v-on:click="handleChangeView('eventList')"><span>事件列表</span></button>
        <button :class="rightShowView==='area'? 'button-active':''"
                v-on:click="handleChangeView('area')"><span>地图分布</span></button>
        <button :class="rightShowView==='status'? 'button-active':''"
                v-on:click="handleChangeView('status')"><span>设备状态</span></button>
        <button :class="rightShowView==='warning'? 'button-active':''"
                v-on:click="handleChangeView('warning')"><span>故障报警</span></button>
      </div>
      <!--事件列表-->
      <section>
        <event-list class="event-list" v-if="rightShowView==='eventList'"></event-list>
      </section>
      <!--地图分布-->
      <section v-if="rightShowView==='area'">
        <area-map class="group-map"></area-map>
      </section>
      <!--设备状态-->
      <section v-if="rightShowView==='status'">
        <status-list class="group-status-list"></status-list>
      </section>
      <!--故障报警-->
      <section v-if="rightShowView==='warning'">
        <warning-list class="group-warning-list"></warning-list>
         <div class="borderPagination">
       <pagination class="ywpagination" popperClass="ic-pagination" v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize" @pagination="getListFault" />
      </div>
      </section>
<!--      <div class="line2">-->
<!--        <img :src="groupLineImg2" alt="">-->
<!--      </div>-->
    </div>
    <alarm-dialog rightShowView=""></alarm-dialog>
    <Dialog title="故障详情" :DialogVisibleFlag.sync="dialogFormVisible" :isShowClose="false">
      <div class="table_expand">
        <div class="table_expand_text">
          <el-form label-position="left" :inline="true" class="demo-table-expand" :model="form1">
            <el-row>
              <el-col :span="10">
                <el-form-item label="区域：">
                  <span>{{ form1.dept.deptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="地点：">
                  <span>{{ form1.pole.address }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="设备名称：">
                  <span>{{ form1.componentName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="上报时间：">
                  <span>{{ form1.reportTime }}</span>
                </el-form-item>
              </el-col>

            </el-row>
            <br>
          </el-form>
        </div>
        <img src="../../../assets/images/form_line.png">
        <div class="timelinemodle">
          <el-steps :space="430" :active="2">
            <el-step process-status="wait"></el-step>
            <el-step process-status="success"></el-step>
          </el-steps>
          <br>
          <div class="box1">
            <el-card  v-for="task in form1.taskList" :key="task.id" shadow="never">
              <h3>{{task.jdName}}</h3>
              <p>备注：{{ task.content }}</p>
              <p1>提交: {{ task.endDate }}</p1>
            </el-card>
          </div>
          <div class="box2">
            <el-card shadow="never">
              <h3 style="color:rgb( 4,184,51)">处理完成</h3>
              <p>故障描述：</p>
              <p1>提交：</p1>
            </el-card>
          </div>
          <div class="line1"></div>
          <div class="line2"></div>
        </div>

      </div>
    </Dialog>

    <Dialog title="报警详情" :closeOnClickModal="false"
            :isShowClose="false"
            :DialogVisibleFlag.sync="dialogFormVisible1">
      <div class="table-list dialog-table-box" style="width: 80%">
        <el-form v-model="data" label-width="auto">
          <el-row>
            <el-col class="dialog-table-title" :span="24">
              <div class="new_head">
                <div class="arrow1 left-arrow">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div class="title" style="color: #ffffff">报警信息</div>
                <div class="arrow1 right-arrow">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="报警人：">
                <span>{{ data.contacts }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="报警地点：">
                <span>{{ data.address }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="报警电话：">
                <span>{{ data.tel }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="报警时间：">
                <span>{{ data.createTime }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" class="shijiancontent">
              <el-form-item label="事件内容：">
                <span>{{ data.content }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <br>
        </el-form>
      </div>
    </Dialog>
  </div>
</template>

<script>
import HeaderLineImg from "@/assets/images/header_line.png"
import groupLineImg2 from "@/assets/images/camera/line_2.png"
import TreeList from "@/views/alarm/components/TreeList";
import GoHome from "@/views/components/GoHome";
import Dialog from "@/views/components/Dialog";
import AreaMap from "@/views/alarm/components/AreaMap";
import StatusList from "@/views/alarm/components/StatusList";
import WarningList from "@/views/alarm/components/WarningList";
import EventList from "@/views/alarm/components/EventList";
import AlarmDialog from "@/views/alarm/components/AlarmDialog";
import { listEvent } from "@/api/yw/event";
import ywList1 from "@/views/components/ywList1";
export default {
  name: "Group",
  components: {
    AreaMap,
    TreeList, GoHome, Dialog,
    StatusList, WarningList,
    EventList,
    AlarmDialog,
    ywList1
  },
  data() {
    return {
       queryParams: {
        id: "",
        componentType: 6,
        pageNum: 1,
        pageSize: 10,
      },
      data:{},
      total: 0,
      dialogFormVisible1:false,
      dialogFormVisible: false,
      form1: {
        dept: {},
        pole: {},
      },
      groupLineImg2: groupLineImg2,
      HeaderLineImg: HeaderLineImg,
      rightShowView: 'eventList',
      alarmDialogFlag: false,
      alarmData: {},
    }
  },
  beforeCreate() {
  },
  created() {
    this.getListFault()
  },
  destroyed() {

  },
  mounted() {
    this.showDialog1()
    this.showDialog()

  },
  methods: {
    getListFault() {
    this.isLoading = true;
      listEvent(this.queryParams).then((response) => {
        console.log(response);
        this.warningTableData = response.rows.cameras;
        this.total = response.total;
        this.isLoading = false;
      });
    },
    showDialog(){
      this.$bus.$on('showdialog', res => {
        this.form1 = res
        console.log(this.form1)
        this.dialogFormVisible = true
      })
    },
    showDialog1(){
      this.$bus.$on('alarmDialogShow',res => {
        this.data = res.data
        this.dialogFormVisible1 = true
        console.log(this.data)
      })
    },
    handleChangeView(viewName) {
      this.rightShowView = viewName
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .dialog-box{
  width: 55vw !important;
  position: relative;
  left: 7%;
}
.shijiancontent{
  position: relative;
  left: -12.5%;
}
.dialog-table-box{
  ::v-deep .el-form-item__label{
    font-size: 16px;
    color: #fff;
    font-weight: normal;
  }
  ::v-deep .el-form-item__label-wrap{
    position: relative;
    left: 30%;
  }
  ::v-deep .el-form-item__content{
    position: relative;
    font-size: 16px;
    left: 30%;
  }
}
.table-list{
  position: relative;
  left: -3%;
  top: -17%;
}
.new_head{
  //margin-top: 2%;
  position: relative;
  left: -2%;
  width: 100%;
  display: flex;
  //justify-content: center;
  //align-items: center;
  font-size: 1.3rem;
  margin-bottom: 2%;
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
  .left-arrow{
    flex: 2;
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
    flex: 2;
    transform: skew(-45deg);
    :nth-child(2){
      opacity: 0.5;
    }
    :nth-child(3){
      opacity: 0.3;
    }
  }
}
.line1{
  width: 80%;
  height: 1px;
  border-top: solid white ;
  position: relative;
  left: 1%;
  //left: -5%;
}
.el-steps{
  position: relative;
  left: 7%;
  top: 7%;
}
.ledStatus{
  span{
    position: absolute;
    top: 26%;
    left: 40%;
    font-size: 1em;
  }
}
.system {
  width: 100%;
  height: 100%;
  position: absolute;

  .main-body {
    display: flex;

    .main-body-list {
      width: 72vw;
    }
  }
}

.header-navbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.navbar {
  margin: 4.5vh 1.5vw 0 0;
}

.warning-header {
  position: absolute;
  z-index: 50;
}
.el-table {
  // width: 97%;
  height: 60vh;
  overflow-y: auto;
}
.el-button {
  color: #eef1f6;
  background-color: #0082ec;
  border: 1px solid #014391;
}

.table-list {
  width: 95%;
}
.main-table::-webkit-scrollbar {
  display: none;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 150px;
  color: #cccccc;
}

.demo-table-expand {
  font-size: 0;
  ::v-deep span{
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ::v-deep .el-form-item__label{
    font-size: 18px;
    color: #fff;
    font-weight: normal;
  }
}

.demo-table-expand label {
  font-size: 18px;
  width: 150px;
  //color: #cccccc;
}
.description {
  display: block;
  width: 400px;
}

/*   .el-scrollbar {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0 10px;
  }

/* .warning {
  width: 100%;
  height: calc(100% - 14.8vh);
  color: white;
  display: flex;
  position: relative;
  }    */

.el-scrollbar {
  width: 100%;
}
.ywpagination {
  position: relative;
  left: 34vw;
  top: -1vh;
}
::v-deep .el-scrollbar {
  background: transparent !important;
}.defaultStatus{
   span{
     position: absolute;
     top:27%;
     left: 40.5%;
     font-size: 1em;
   }
 }
.HandleStatus{
  span{
    position: absolute;
    top:29.5%;
    left: 38%;
    font-size: 1em;
  }
  img{
    width: 66%;
    vertical-align: middle;

  }
}
.viewDetail{
  width: 20%;
  cursor: pointer;
}
.table_expand {
  position: relative;
  left: 4%;
  //display: flex;
  width: 80%;
  justify-content: space-around;
  align-items: center;
  //border: solid 1px;
  height: 95%;
  //width: 50%;
  overflow: auto;
}

.table_expand_text {
  width: 100%;
  margin-top: 5%;
  //border: solid 1px red;
  //width: 50%;
  height: 30%;
  padding: 20px 50px;

}

.timelinemodle {
  //background-color: cadetblue;
  padding-left: 30px;
  width: 80%;
  height: 50%;
  // border: 1px red solid;
  align-items: center;
  //overflow-y: auto;
  // overflow-x: hidden;
}
.box{
  position: absolute;
  width: 100%;
}
.el-card{
  width: 48%;
  float: left;
  border: 0;
  background-color: transparent;
  ::v-deep .el-card__body{
    padding-left: 10%;
  }
}
.el-timeline {
  width: 100%;
  font-size: 15px;
  /*   ::v-deep .el-timeline-item__timestamp.is-bottom {
    position: absolute;
    left: -100px;
    top: -5px;
    left: -80px;
    color: #fff;
    width: 50%;
  } */

}

/* ::v-deep .el-form-item__content {
  color: #fff;
  border: none;
} */
p1 {
  color: #cccccc;
  font-size: 15px;
  position: absolute;
  // top: 1px;
}

h3 {
  color: #fff;
  font-size: 18px;
}

p {
  color: #dddddd;
}

.img {
  display: inline-block;
}

::v-deep .el-pager {
  background-color: #03223f;
}

::v-deep .el-card__body {
  //background-color: #003366;
  border: none;
}

::v-deep .el-form-item__label {
  color: #0082ec;
}

::v-deep .el-form-item__content {
  color: #fff;
}

::v-deep .divider {
  width: 100%;
}



img {
  pointer-events: none;
}

.group {
  position: relative;
  color: white;
  width: 100%;
  height: calc(100% - 14.8vh);
  display: flex;

  .group-header-line {
    position: absolute;
    //top: 1%;
    left: 80%;
    transform: translate(-50%, -50%);
    width: 54vw;

    img {
      width: 100%;
      height: auto;
    }
  }

  .group-header {
    position: fixed;
    top: 4%;
    z-index: 1000;
  }

}

.group-right {
  padding: 0 1vw 1vh 0;
  width: 71.5vw;
  height: 85.5vh;
  position: relative;

  .group-map, .group-status-list, .group-warning-list, .event-list {
    position: absolute;
    top: 47%;
    left: 45.5%;
    transform: translate(-50.5%, -47.5%);
    //width: 92.8%;
    //height: 66vh;
    //z-index: 1000;
    width: 78vw;
    height: 80vh;
  }

  .group-right-button {
    border-left: 3px solid rgba(4, 111, 148, 1);
    position: absolute;
    top: 0.5%;
    //top: 4.86vh;
    //left: 0.30vw;
    left: -8.9%;
    width: 80%;
    overflow: hidden;
    z-index: 1000;

    &::after {
      content: '';
      position: absolute;
      display: inline-block;
      height: 3.2vh;
      width: 1vw;
      background-image: radial-gradient(rgba(4, 111, 148, 0), rgba(4, 111, 148, .4), rgba(4, 111, 148, 1));
      transform: skew(35deg);
      margin-left: 0.5vw;
      margin-top: 1.2vh;
      border: 2px solid rgba(4, 111, 148, .6);
    }

    button {
      background-color: transparent;
      background-image: radial-gradient(rgba(2, 94, 170, .1), rgba(2, 94, 170, .2), rgba(2, 94,
        170, .4));
      border: 3px solid rgba(4, 111, 148, 1);

      transform: skew(35deg);
      outline: none;
      color: white;
      font-size: 1.3em;
      width: 7.2vw;
      height: 5vh;
      margin-left: -4px;

      &:first-child {
        width: 9vw;
        margin-left: -30px;
        padding-left: 30px;
      }


      &:active {
        background-image: radial-gradient(rgba(2, 94, 170, .1), rgba(2, 94, 170, .5), rgba(2, 90, 163, 0.9));
      }

      span {
        display: block;
        transform: skew(-35deg);
      }
    }

    .button-active {
      background-image: radial-gradient(rgba(2, 94, 170, .1), rgba(2, 94, 170, .5), rgba(2, 90, 163, 0.9));
    }
  }

  .line2 {
    position: absolute;
    //bottom: 2vh;
    //left: -24vw;
    bottom: 2vh;
    left: -20vw;
    width: 50vw;
    height: 3vh;

    img {
      height: 100%;
      width: 100%;
    }
  }
}
.ywpagination {
  position: absolute;
  left: 60vw;
  top: 74vh;
  color:#fff;
}
::v-deep .el-pagination__total{
  color: #fff;
}
::v-deep .el-pagination__jump{
  color: #fff;
}
::v-deep .el-pagination__sizes{
  margin-left: 1vw;
}
.borderPagination{
  ::v-deep .el-input--medium{
    // border: 1px solid rgb(13,194,217);
    height: 90%;
  }
}
</style>
