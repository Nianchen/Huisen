<template>
  <div class="status table-list">
    <div class="status-list table-list" v-loading="isLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.3)">
      <el-table :data="statusTableData" style="width: 100%; cursor:pointer" :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',}"
                >
        <el-table-column align="center" header-align="center" prop="dept.deptName" label="所属区域" />
        <el-table-column align="center" header-align="center" prop="group.name" label="所属分组" />
        <el-table-column align="center" header-align="center" prop="pole.address" label="所在位置" show-overflow-tooltip />
        <el-table-column align="center" header-align="center" prop="pole.name" label="所属灯杆" />
        <el-table-column align="center" header-align="center" prop="name" label="设备名称" />
        <el-table-column align="center" header-align="center" prop="status" label="设备状态">
          <template slot-scope="scope">
<!--            <el-tag type="success" v-if="scope.row.status === '1'">在线</el-tag>-->
<!--            <el-tag type="danger" v-else-if="scope.row.status==='2'">离线</el-tag>-->
<!--            <el-tag type="danger" v-else>故障</el-tag>-->
            <div class="ledStatus" v-if="scope.row.status === '1'">
              <img src="../../../assets/images/button/status-online.png" alt="">
              <span>在线</span>
            </div>
            <div class="ledStatus" v-else-if="scope.row.status === '2'">
              <img src="../../../assets/images/button/status-offline.png" alt="">
              <span>离线</span>
            </div>
            <div class="ledStatus" v-else>
              <img src="../../../assets/images/button/status-fault.png" alt="">
              <span>故障</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center" label="设备操作">
          <template slot-scope="scope">
<!--            <el-tooltip class="item" effect="dark" content="设备详情" placement="top">-->
<!--              <el-button style="background: transparent;border:1px solid; " type="primary" icon="el-icon-view" circle-->
<!--                @click="handleShowDialog(scope.row)"></el-button>-->
<!--            </el-tooltip>-->
            <el-tooltip class="item" effect="dark" content="查看详情" placement="top-start" v-hasPermi="['camera:camera:view']">
              <img class="detail_img" @click="handleShowDialog(scope.row)"  src="../../../assets/images/detail_w.png" alt="">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="管理分组" placement="top-start" v-hasPermi="['camera:camera:edit']">
              <img class="detail_img1" @click="handleShowGroup(scope.row)"  src="../../../assets/images/guanli.png" alt="">
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination class="status-pagination" popperClass="ic-pagination" v-show="total>0" :pagerCount="5" layout='total, sizes, prev, pager, next'
      :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getStatusList" />
    <img class="status-bg" :src="groupRightBgImg" alt="group右侧的背景图片">


  </div>
</template>

<script>
import groupRightBgImg from "@/assets/images/camera/bg_3_4.png";
import { listComponent } from "@/api/camera/component";
import GroupOperation from "@/views/components/GroupManager";

export default {
  name: "StatusList",
  components: {
    GroupOperation,
  },
  data() {
    return {
      groupRightBgImg: groupRightBgImg,
      isLoading: false,
      currentPage4: 1,
      queryParams: {
        id: "",
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      statusTableData: [],
      deviceStatus: [],
      GroupType: "3",
    };
  },
  created() {
    this.getStatusList();
    this.getDicts("device_status").then((response) => {
      this.deviceStatus = response.data;
    });
  },
  mounted() {
    this.handleStatusTableList();
    this.$bus.$on('shaxinData',res => {
      this.getStatusList();
    })
  },
  beforeDestroy() {
    this.$bus.$off("statusTableId");
  },
  methods: {
    handleShowGroup(row){
      this.$bus.$emit('ShowGroup',row)
    },
    getStatusList() {
      this.isLoading = true;
      listComponent(this.queryParams).then((response) => {
        this.total = response.total;
        response.rows.map((item,index)=>{
          console.log(item);
          index++
          item.name="谷城"+index+"号视频监控"
          item.dept.deptName = '谷城县'
          item.pole.address = "谷城谷水路" + index +"号"
          item.pole.name = "谷城"+ index +"号灯杆"
        })
        this.statusTableData = response.rows;
        
        this.isLoading = false;
        console.log(response.rows);
      });
    },
    statusFormat(status) {
      return this.selectDictLabels(this.deviceStatus, status);
    },
    handleStatusTableList() {
      this.$bus.$on("statusTableId", (res) => {
        // console.log(res)
        this.queryParams.id = res;
        this.getStatusList();
      });
    },
    handleShowDialog(data) {
      this.$emit("changeDialogVisibleFlag", {
        dialogView: "statusTable",
        data,
      });
    },
    onSubmit() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style lang="scss" scoped>
.status {
  position: relative;
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

  .status-pagination {
    position: absolute;
    right: 5vw;
    bottom: 2.8vh;
    z-index: 100;
  }

  .status-list {
    width: 94%;
    height: 85%;
    background-color: #03223f;
    transform: translate(0.9%, -1%);

    .el-tag {
      background: none !important;
      cursor: pointer;
    }
  }

  .status-list::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .status-list {
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
  }
  .ledStatus{
    span{
      position: absolute;
      top: 24%;
      left: 42%;
      font-size: 1em;
    }
  }
}
.detail_img{
  width: 17%;
}
.el-table{
  font-size: 15px;
}
.detail_img1{
  width: 20%;
}
</style>
