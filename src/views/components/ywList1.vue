<template>
  <div>
    <div class="table-list main-table">
      <el-table v-loading="loading" stripe :data="eventList"
    :cell-style="{padding:'5.2px'}">
        <el-table-column   type="index" />
         <el-table-column   label="设备名称" prop="componentName" align="center" />
          <el-table-column   label="所属灯杆" prop="pole.name" align="center" />
        <el-table-column   label="所属道路" prop="dept.deptName" align="center" />
        <el-table-column   label="设备类型" prop="componentType" align="center" :formatter="typeFormat" />
        <el-table-column   label="故障时间" prop="reportTime" align="center" />
        <el-table-column   label="故障类型" prop="errorCode" width="160" align="center" >
           <template slot-scope="scope">
            <div class="defaultStatus" v-if="scope.row.errorCode === '2'">
              <img src="../../assets/images/button/status-offline.png" alt="">
              <span>离线</span>
            </div>
             <div class="defaultStatus" v-if="scope.row.errorCode === '3'">
              <img src="../../assets/images/button/status-fault.png" alt="">
              <span>故障</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column   label="故障处理状态" align="center">
          <template slot-scope="scope">
            <div class="HandleStatus" v-if="scope.row.jd === '1'">
              <img src="../../assets/images/button/fault-unhandled.png" alt="">
              <span>未处理</span>
            </div>
             <div class="HandleStatus" v-if="scope.row.jd === '2'">
              <img src="../../assets/images/button/fault-unhandled.png" alt="">
              <span>处理中</span>
            </div>
             <div class="HandleStatus" v-if="scope.row.jd === '3'">
              <img src="../../assets/images/button/fault-handled.png" alt="">
              <span>已完成</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column   label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="查看详情" placement="top" :enterable="false">
              <!-- <el-button type="danger" icon="el-icon-view" size="mini"/> -->
              <img class="viewDetail" @click="viewDetail(scope.row)"  src="../../assets/images/detail_w.png" alt="">
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <pagination class="ywpagination" popperClass="ic-pagination" v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize" @pagination="getList" /> -->
  </div>
</template>

<script>
import TableList from "@/views/components/TableList";
import Dialog from "@/views/components/Dialog";
import { listEvent, getEvent } from "@/api/yw/event";
export default {
  name: "ywList",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  components: {
    TableList,
    Dialog,
  },
  data() {
    return {
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
      value: "",
      reverse: true,
      dialogFormVisible: false,
      typeOptions: [],
      // 总条数
      total: 0,
      deptId: null,
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
      this.queryParams.deptId = res;
      this.getList();
    });
    this.$bus.$on("groupId", (res) => {
      this.queryParams.groupId = res;
      this.getList();
    });
  },
  methods: {
    getList() {
      this.loading = true;
      this.queryParams.componentType = this.type;
      listEvent(this.queryParams).then((response) => {
        console.log(response);
        this.eventList = response.rows;
        this.total = response.total;
        this.loading = false;
        // console.log(this.eventList);
      });
    },
    viewDetail(row) {
      console.log(row);
      this.reset();
      this.loading = true;
      this.dialogFormVisible = true;
      getEvent(row.id).then((response) => {
        this.form = response.data;
        this.$bus.$emit('showdialog',this.form)
        console.log(this.form)
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
  top: 8%;
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
// .ywpagination {
//   position: relative;
//   left: 34vw;
//   top: -1vh;
// }
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

.liucheng {
  padding-left: 50px;
}

::v-deep .group-left-img {
  width: 79% !important;
  height: 87% !important;
}

::v-deep .table-list-body {
  width: 79vw !important;
  position: relative;
  left: -2.7vw;
  background-size: 101% 99% !important;
}
.el-table{
  font-size: 15px;
}
::v-deep .table-list .has-gutter .is-leaf{
  color:rgb(1,117,212) !important;
  font-size: 20px ;
}
</style>
