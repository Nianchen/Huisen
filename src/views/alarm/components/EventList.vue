<template>
  <div class="event table-list">
    <div class="event-list " v-loading="isLoading" element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.3)">
      <el-table :data="eventListData" style="width: 100%;cursor:pointer" :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',}">
        <el-table-column align="center" header-align="center" prop="dept.deptName" label="所属区域"/>
<!--        <el-table-column align="center" header-align="center" prop="group.name" label="所属分组"/>-->
        <el-table-column align="center" header-align="center" prop="contacts" label="报警人" />
          <el-table-column align="center" header-align="center" prop="address" label="所在位置" show-overflow-tooltip/>
        <el-table-column align="center" header-align="center" prop="tel" label="联系电话"/>
        <el-table-column align="center" header-align="center" prop="content" label="事件内容" show-overflow-tooltip/>
        <el-table-column align="center" header-align="center" prop="createTime" label="报警时间"/>
        <!--        <el-table-column align="center" header-align="center" label="设备状态">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-tag effect="plain"-->
        <!--                    :type="scope.row.status ==='1' ? 'success' : scope.row.status ==='2' ? 'info' : 'danger'">-->
        <!--              {{ statusFormat(scope.row.status) }}-->
        <!--            </el-tag>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!-- <el-table-column align="center" header-align="center" label="设备操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="故障详情" placement="top">
              <img class="detail_img" @click="handleShowDialog(scope.row)"  src="../../../assets/images/detail_w.png" alt=""> 
             <el-button style="background: transparent;border:1px solid; "-->
<!--                         type="primary"-->
<!--                         icon="el-icon-view"-->
<!--                         circle-->
<!--                         @click="handleShowDialog(scope.row)"-->
<!--              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <pagination
      class="event-pagination"
      popperClass="ic-pagination"
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getEventList"
    />
    <img class="event-bg" :src="groupRightBgImg" alt="group右侧的背景图片">
  </div>

</template>

<script>
import groupRightBgImg from "@/assets/images/camera/bg_3_4.png"
import {listEvent} from '@/api/call/event'
import Dialog from "@/views/components/Dialog";
export default {
  name: "EventList",
  components: {Dialog},
  data() {
    return {
      groupRightBgImg,
      isLoading: false,
      queryParams: {
        id: 0,
        pageNum: 1,
        pageSize: 10
      },
      total: 10,
      eventListData: []
    }
  },
  created() {
    this.getEventList()
  },
  mounted() {
    this.handleEventList()
  },
  beforeDestroy() {
    console.log('销毁')
    this.$bus.$off('eventListId')
  },
  methods: {
    //获取数据
    getEventList() {
      this.isLoading = true
      listEvent(this.queryParams).then(response => {
        console.log(response)
        this.total = response.total
        this.eventListData = response.rows
        this.isLoading = false
      })
    },
    //接收右侧兄弟传值
    handleEventList() {
      this.$bus.$on('eventListId', res => {
        // this.$message.success(res.toString())
        console.log(res)
        this.queryParams.id = res
        //重新获取数据
        this.getEventList()
      })
    },
    //弹窗
    handleShowDialog(data) {
      console.log(data)
      this.dialogFormVisible = true
      this.$bus.$emit('alarmDialogShow', {
        data: data
      })
    },
    handleDialogClose(){

    },
  }
}
</script>

<style lang="scss" scoped>
.el-table{
  font-size: 15px;
}
.event {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .event-bg {
    position: absolute;
    pointer-events: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .event-pagination {
    position: absolute;
    right: 5vw;
    bottom: 2.8vh;
    //bottom: 0;
    z-index: 100;
  }

  .event-list {
    width: 94%;
    height: 85%;
    background-color: #03223f;
    transform: translate(0.9%, -1%);

    .el-tag {
      background: none !important;
      cursor: pointer;
    }
  }

  .event-list::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .event-list {
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
