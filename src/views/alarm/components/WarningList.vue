<template>
  <div class="warning table-list">
    <div class="warning-list table-list" v-loading="isLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.3)">

      <div>
        <yw-list1 class="ywList" :type="'6'" />
      </div>
    </div>
    <img class="warning-bg" :src="groupRightBgImg" alt="group右侧的背景图片">
  </div>
</template>

<script>
import groupRightBgImg from "@/assets/images/camera/bg_3_4.png";
import { listFault } from "@/api/camera/group";
import ywList1 from "@/views/components/ywList1";
export default {
  name: "WarningList",
  components: {
    ywList1,
  },
  props: {},
  data() {
    return {
      groupRightBgImg: groupRightBgImg,
      isLoading: false,
      warningTableData: [],
      queryParams: {
        id: "",
        pageNum: 1,
        pageSize: 10,
      },
      total: 10,
    };
  },
  created() {
    this.getListFault();
  },
  mounted() {
    this.handleWarningTableList();
  },
  beforeDestroy() {
    console.log("销毁");
    this.$bus.$off("warningTableId");
  },
  methods: {
    /**
     * 获取故障报警列表的函数
     */
    getListFault() {
      this.isLoading = true;
      listFault(this.queryParams).then((response) => {
        console.log(response);
        this.warningTableData = response.data.cameras;
         this.isLoading = false;
      });
    },
    //接收右侧兄弟传值
    handleWarningTableList() {
      this.$bus.$on("warningTableId", (res) => {
        this.queryParams.id = res;
        this.getListFault();
      });
    },
    //弹窗
    handleShowDialog(data) {
      this.$bus.$emit("alarmDialogFlag", {
        dialogView: "warningTable",
        data,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table{
  font-size: 15px;
}
.warning {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .warning-bg {
    position: absolute;
    pointer-events: none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .warning-pagination {
    position: absolute;
    right: 5vw;
    bottom: 2.8vh;
    z-index: 100;
  }
  .warning-list {
    width: 94%;
    height: 85%;
    background-color: #03223f;
    transform: translate(0.9%, -1%);
  }

  .warning-list::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .warning-list {
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    overflow-x: hidden;
    overflow-y: auto;
  }
}
.ywList {
  width: 77vw;
  // height: 10vh;
  ::v-deep.el-table {
    height: 65vh;
  }
}
</style>
