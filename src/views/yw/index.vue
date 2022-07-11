<template>
  <div class="system">
    <div class="header-navbar">
      <Header></Header>
    </div>
    <div class="line2"></div>
    <div class="line1"></div>
    <div class="line3"></div>
    <div class="line-left"></div>
    <div class="table-list-right">
      <div class="table--list-btn">
        <button class="button-active"><span>故障列表</span></button>
      </div>
    </div>
    <div class="main-body">
      <tree-list class="tree-list"/>
      <GoHome title="故障列表" class="warning-header"></GoHome>
      <TableList class="main-body-list" >
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
          <el-form-item label="区域ID" prop="deptId">
            <el-input v-model="queryParams.deptId" placeholder="请输入区域ID" clearable size="small" @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="组件名称" prop="componentName">
            <el-input v-model="queryParams.componentName" placeholder="请输入组件名称" clearable size="small" @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handleQuery" round class="btnhover">搜索
            </el-button>
            <el-button icon="el-icon-refresh"  @click="resetQuery" round class="btnhover">重置
            </el-button>
          </el-form-item>
        </el-form>
        <div class="table-list main-table">
          <el-table v-loading="loading" stripe style="width: 100% ;cursor:pointer" :data="eventList"
                    :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',}" :cell-style="{padding:'0px'}" size="mini" >
            <el-table-column type="index" />
            <el-table-column label="区域" prop="dept.deptName" align="center" />
            <el-table-column label="设备名称" prop="componentName" align="center" />
            <el-table-column label="设备类型" prop="componentType" align="center" :formatter="typeFormat" />
            <el-table-column label="上报时间" prop="reportTime" align="center" />
            <el-table-column label="故障码" prop="errorCode" width="160" align="center" />
            <el-table-column label="处理阶段" align="center">
              <template slot-scope="scope">
<!--                <el-tag v-if="scope.row.jd === '1'" effect="dark" type="danger">未处理</el-tag>-->
<!--                <el-tag v-if="scope.row.jd === '2'" effect="dark" type="warning">处理中</el-tag>-->
<!--                <el-tag v-if="scope.row.jd === '3'" effect="dark" type="success">已完成</el-tag>-->
                <div class="ledStatus" v-if="scope.row.jd === '1'">
                  <img src="../../assets/images/button/fault-unhandled.png" alt="">
                  <span>未处理</span>
                </div>
                <div class="ledStatus" v-else-if="scope.row.jd === '2'">
                  <img src="../../assets/images/button/fault-unhandled.png" alt="">
                  <span>处理中</span>
                </div>
                <div class="ledStatus" v-else>
                  <img src="../../assets/images/button/fault-handled.png" alt="">
                  <span>已完成</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="详情" align="center">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="查看详情" placement="top-start">
<!--                  <el-button type="danger" icon="el-icon-view" size="mini" @click="viewDetail(scope.row)" />-->
                  <img class="detail_img" @click="viewDetail(scope.row)"  src="../../assets/images/detail_w.png" alt="">
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

        </div>
        <pagination   class="status-pagination" popperClass="ic-pagination" v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />
      </TableList>

      <Dialog title="故障详情" :DialogVisibleFlag.sync="dialogFormVisible" :isShowClose="false">

        <div class="table_expand">
          <div class="table_expand_text">
            <el-form label-position="left" :inline="true" class="demo-table-expand" :model="form">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="区域：">
                    <span>{{ form.dept.deptName }}</span>
                  </el-form-item>
                </el-col>
               <el-col :span="14">
                 <el-form-item label="地点：">
                   <span>{{ form.pole.address }}</span>
                 </el-form-item>
               </el-col>
              </el-row>
             <el-row>
               <el-col :span="10">
                 <el-form-item label="设备名称：">
                   <span>{{ form.componentName }}</span>
                 </el-form-item>
               </el-col>
              <el-col :span="14">
                <el-form-item label="上报时间：">
                  <span>{{ form.reportTime }}</span>
                </el-form-item>
              </el-col>

             </el-row>
              <br>
<!--              <el-form-item label="故障描述：">-->
<!--                <span class="description">{{form.description }}</span>-->
<!--              </el-form-item>-->
            </el-form>
          </div>
<!--          <div class="liucheng">-->
<!--            <p>时间线</p>-->
<!--          </div>-->
          <img src="../../assets/images/form_line.png">
          <div class="timelinemodle">
            <el-steps :space="430" :active="2">
              <el-step process-status="wait"></el-step>
              <el-step process-status="success"></el-step>
            </el-steps>
            <br>
            <div class="box1">
              <el-card  v-for="task in form.taskList" :key="task.id" shadow="never">
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
            <div class="line4"></div>
            <div class="line5"></div>
<!--            <el-timeline>-->
<!--              <el-timeline-item placement="top" v-for="task in form.taskList" :key="task.id" >-->
<!--                <el-card>-->
<!--                  <h3>{{task.jdName}}</h3>-->
<!--                  <p>故障描述：{{ task.content }}</p>-->
<!--                  <p1>提交于: {{ task.endDate }}</p1>-->
<!--                </el-card>-->
<!--              </el-timeline-item>-->
<!--              <el-timeline-item placement="top">-->
<!--                <el-card>-->
<!--                  <h3>处理完成</h3>-->
<!--                  <p>备注：</p>-->
<!--                  <p1>提交于: </p1>-->
<!--                </el-card>-->
<!--              </el-timeline-item>-->
<!--            </el-timeline>-->
          </div>

        </div>
      </Dialog>
    </div>
  </div>
</template>

<script>
import GoHome from "@/views/components/GoHome";
import TableList from "@/views/components/TableList";
import Header from "@/views/components/Header";
import Navbar from "@/views/components/Navbar";
import TreeList from "@/views/pole/component/TreeList";
import Dialog from "@/views/components/Dialog";
import { listEvent, getEvent } from "@/api/yw/event";

export default {
  name: "index",
  components: {
    GoHome,
    TableList,
    Header,
    Navbar,
    TreeList,
    Dialog,
  },

  data() {
    return {
      // 表单参数
      form: {
        dept: {},
        pole: {},
      },
      eventList: [],
      detailedForm: [],
      loading: true,
      showSearch: true,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deptId: null,
        componentId: null,
        componentType: null,
        componentName: null,
        description: null,
        errorCode: null,
        reportTime: null,
        jd: null,
        jdName: null,
      },
      deptId: null,
      value: "",
      reverse: true,
      dialogFormVisible: false,
      typeOptions: [],
      // 总条数
      total: 0,
    };
  },
  created() {
    this.getList();
    this.getDicts("component_type").then((response) => {
      this.typeOptions = response.data;
    });
  },
  mounted() {
    this.$bus.$on("deptId", (res) => {
      this.deptId = res;
      console.log(this.deptId);
      this.getList({ deptId: this.deptId });
    });
  },
  methods: {
    /** 查询运维工单列表 */
    getList() {
      this.loading = true;
      listEvent(this.queryParams).then((response) => {
        console.log(response);
        this.eventList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    viewDetail(row) {
      this.reset();
      this.loading = true;
      this.dialogFormVisible = true;

      getEvent(row.id).then((response) => {
        this.form = response.data;
        console.log(this.form);
      });
      this.loading = false;
    },
    // 类型(字典：1、灯光，2、气象监测，3、视频监控，4、LED大屏，5、广播，6、一键报警)字典翻译
    typeFormat(row, column) {
      return this.selectDictLabels(this.typeOptions, row.componentType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        deptId: null,
        componentId: null,
        componentType: null,
        componentName: null,
        description: null,
        errorCode: null,
        reportTime: null,
        jd: null,
        jdName: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
      };
      this.resetForm("form");
    },
  },
};
</script>

<style lang="scss" scoped>

.btnhover:hover{
  background-color: #e8f4ff !important;
  color: deepskyblue !important;
}
.line-left{
  position: absolute;
  left: 21.9%;
  top: 21.4%;
  width: 0.09%;
  height: 15.2%;
  background-color: rgb(3,116,154);
}
.table--list-btn{
  border-left: 3px solid rgba(4, 111, 148, 1);
  position: absolute;
  left: 21.9%;
  width: 80%;
  overflow: hidden;
  z-index: 10;
  &::after {
    content: "";
    position: absolute;
    display: inline-block;
    height: 3.2vh;
    width: 1vw;
    background-image: radial-gradient(
        rgba(4, 111, 148, 0),
        rgba(4, 111, 148, 0.4),
        rgba(4, 111, 148, 1)
    );
    transform: skew(35deg);
    margin-left: 0.5vw;
    margin-top: 1.2vh;
    border: 2px solid rgba(4, 111, 148, 0.6);
  }
  button{
    background-color: transparent;
    background-image: radial-gradient(
        rgba(2, 94, 170, 0.1),
        rgba(2, 94, 170, 0.2),
        rgba(2, 94, 170, 0.4)
    );
    border: 3px solid rgba(4, 111, 148, 1);
    //border-bottom: none;
    transform: skew(35deg);
    outline: none;
    color: white;
    font-size: 1.3em;
    width: 7.2vw;
    height: 5vh;
    &:first-child {
      width: 9vw;
      margin-left: -30px;
      padding-left: 30px;
    }

    &:last-child {
      margin-left: -4px;
    }

    &:active {
      background-image: radial-gradient(
          rgba(2, 94, 170, 0.1),
          rgba(2, 94, 170, 0.5),
          rgba(2, 90, 163, 0.9)
      );
    }
  }
  span {
    display: block;
    transform: skew(-35deg);
  }
  .button-active {
    position: relative;
    left: -1%;
    background-image: radial-gradient(
        rgba(2, 94, 170, 0.1),
        rgba(2, 94, 170, 0.5),
        rgba(2, 90, 163, 0.9)
    );
  }
}
.status-pagination {
  position: relative;
  left: 36vw;
  top:1vh ;
  z-index: 100;
}
.line2 {
  background: url("../../assets/images/camera/line_2.png");
  z-index: 11;
  width: 63vw;
  height: 5vh;
  top: 95vh;
  position: absolute;
  left: 4vw;
  background-size: 100% 100%;
}
.line1 {
  background: url("../../assets/images/camera/line_1.png");
  width: 66vw;
  height: 5vh;
  top: 94vh;
  position: absolute;
  left: 18vw;
  background-size: 100% 100%;
}
.line3 {
  width: 58vw;
  height: 7vh;
  position: absolute;
  top: 14vh;
  left: 50vw;
  background: no-repeat url("../../assets/images/header_line.png");
  background-size: 100% 100%;
}
.tree-list{
  //padding: 15vh;
  //padding-top: 5vh;
  height: 84vh;
  ::v-deep .custom-tree-container{
    position: absolute;
    top: 49%;
    left: 50%;
  }
}
.line4{
  width: 80%;
  height: 1px;
  border-top: solid white;
  position: relative;
  left: 1%;
}
.el-steps{
  position: relative;
  left: 7%;
  top: 7% !important;
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
  //display: flex;
  width: 100%;
  overflow: hidden;
  // min-width: 1920px;
  height: 100%;
  background: #010f1c url(../../assets/images/camera/bg.jpg);
  position: absolute;

  .main-body {
    display: flex;
    .main-body-list {
      width: 78vw;
      position: relative;
      left: 1%;
      top: -10px;
      font-size:20px;
      ::v-deep .el-form-item__label{
        font-size: 18px;
        width: 120px
      }
      ::v-deep .el-form-item{
        margin-right: 20px;
        position: relative;
        top: -35%;
        left: -20%;
      }
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

.el-button {
  color: #eef1f6;
  background-color: #0082ec;
  border: 1px solid #014391;
}
.table-list {
  width: 99.3%;
  //height: 76vh;
}

.main-table::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

/* .main-table {
  height: 100%;
  scrollbar-width: none;  firefox
  -ms-overflow-style: none; IE 10+
  overflow-x: hidden;
  overflow-y: auto;
} */
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

/* .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
} */
.description {
  display: block;
  width: 400px;
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

//.el-scrollbar {
//  width: 100%;
//}

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

/* .mb8 {
  display: flex;
  justify-content: flex-start;
  border: solid 1px;
} */
.liucheng {
  padding-left: 50px;
}

::v-deep .group-left-img {
  width: 90% !important;
  height: 88% !important;
  position: relative;
  top: -1%;
}

::v-deep .table-list-body {
  width: 83vw !important;
  height: 78vh !important;
  position: relative;
  left: -1vw;
  background-size: 101% 99% !important;
}
.el-table{
  height: 112.5%;
  top: -5.9%;
  left: 2.4%;
  font-size: 15px;
  overflow:auto;
}
// ::v-deep .el-table__row{
//   height: 30px;
// }
</style>
