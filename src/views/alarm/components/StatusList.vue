<template>
  <div class="status table-list">
    <div class="status-list" v-loading="isLoading" element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.3)">
      <el-table :data="statusTableData" style="width: 100%;cursor:pointer" :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',}">
        <el-table-column align="center" header-align="center" prop="dept.deptName" label="所属区域"/>
        <el-table-column align="center" header-align="center" prop="group.name" label="所属分组"/>
        <el-table-column align="center" header-align="center" prop="pole.address" label="所在位置" show-overflow-tooltip/>
        <el-table-column align="center" header-align="center" prop="pole.name" label="所属灯杆"/>
        <el-table-column align="center" header-align="center" prop="name" label="设备名称"/>
        <el-table-column align="center" header-align="center" label="设备状态">
          <template slot-scope="scope">
<!--            <el-tag effect="plain"-->
<!--                    :type="scope.row.status ==='1' ? 'success' : scope.row.status ==='2' ? 'info' : 'danger'">-->
<!--              {{ statusFormat(scope.row.status) }}-->
<!--            </el-tag>-->
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
<!--              <el-button style="background: transparent;border:1px solid; "-->
<!--                         type="primary"-->
<!--                         icon="el-icon-view"-->
<!--                         circle-->
<!--                         @click="handleShowDialog(scope.row)"-->
<!--              ></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip class="item" effect="dark" content="查看详情" placement="top-start">-->
<!--              <img class="detail_img" @click="handleShowDialog(scope.row)"  src="../../../assets/images/detail_w.png" alt="">-->
<!--            </el-tooltip>-->
            <el-tooltip class="item" effect="dark" content="管理分组" placement="top-start" v-hasPermi="['call:component:edit']">
              <img class="detail_img1" @click="handleShowGro(scope.row)"  src="../../../assets/images/guanli.png" alt="">
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      class="status-pagination"
      popperClass="ic-pagination"
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <img class="status-bg" :src="groupRightBgImg" alt="group右侧的背景图片">

    <el-dialog
      :title="title"
      custom-class="Dialogshebei"
      :visible.sync="GroupDialog"
      width="30%">
      <treeselect popperClass="ic-pagination"  v-model="treemodel" :options="treeData" :show-count="true" placeholder="请选择分组" @select="queryDeptSet" />
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleConfirm" type="primary">取 消</el-button>
    <el-button type="primary" @click="closeDialog">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import groupRightBgImg from "@/assets/images/camera/bg_3_4.png"
import {listComponent,updateComponent} from "@/api/call/component";
import {groupTree } from "@/api/call/group"

export default {
  name: "StatusList",
  components:{
    Treeselect
  },
  data() {
    return {
      title:'',
      treemodel:null,
      GroupDialog:false,
      treeData:[],
      queryInfo:{
        groupId:'',
        id:''
      },
      groupRightBgImg: groupRightBgImg,
      isLoading: false,
      currentPage4: 1,
      queryParams: {
        id: '',
        pageNum: 1,
        pageSize: 10
      },
      total: 10,
      statusTableData: [],
      deviceStatus: []
    }
  },
  created() {
    this.getList()
    this.getTreeData()
    this.getDicts("device_status").then(response => {
      this.deviceStatus = response.data;
    });
  },
  mounted() {
    this.handleStatusTableList()
  },
  beforeDestroy() {
    console.log('销毁')
    this.$bus.$off('statusTableId')
  },
  methods: {
    getTreeData(){
      groupTree().then(res => {
        console.log(res)
        this.treeData = res.data
        console.log(this.treeData)
      })
    },
    handleShowGro(row){
      this.GroupDialog = true
      this.title = row.name
      this.queryInfo.id = row.id
      console.log(row)
    },
    handleConfirm(){
      this.GroupDialog = false
      this.treemodel = null
    },
    closeDialog(){
      updateComponent(this.queryInfo).then(res => {
        console.log(res)
        this.getList()
        this.$message.success('修改成功')
      },err => {
        this.$message.error('修改失败')
      })
      this.treemodel = null
      this.GroupDialog = false
    },
    queryDeptSet(e){
      this.queryInfo.groupId = e.id
    },
    getList() {
      this.isLoading = true
      listComponent(this.queryParams).then(response => {
        console.log(response)
        this.total = response.total
        this.statusTableData = response.rows
        this.isLoading = false
      })
    },
    statusFormat(status) {
      return this.selectDictLabels(this.deviceStatus, status);
    },
    handleStatusTableList() {
      this.$bus.$on('statusTableId', res => {
        // console.log(res)
        this.queryParams.id = res
        this.getList()
      })
    },


    handleShowDialog(data) {
      this.$bus.$emit('alarmDialogFlag', {
        dialogView: 'statusTable',
        data: data
      })
    },
    onSubmit() {

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }
}
</script>

<style lang="scss" scoped>
.detail_img1{
  width: 20%;
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
  top:10%;
  left: -10%;
  background-color: rgb(4,42,78) !important;
  .el-dialog__title{
    color: white !important;
  }
}
.el-table{
  font-size: 15px;
}
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
::v-deep .vue-treeselect{
  border: 2px solid rgb(1,67,145);
  border-radius:10px;
}
</style>
