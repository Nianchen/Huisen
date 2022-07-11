<template>

    <Map></Map>
    <!-- <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
    </el-dialog> -->
</template>
<script>
import Map from "@/views/light/component/map";
export default {
  components: {
    Map
  },
  data() {
    return {

    };
  },
  created() {

  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.group {
  display: flex;
}
.table-list {
  width: 100%;
  height: calc(100% - 14.8vh);
  color: white;
  display: flex;
  position: relative;
}
.table-list-body {
  width: 70vw;
  height: 78vh;
  overflow: hidden;
  box-sizing: border-box;
  margin: 4vh auto;
  padding: 40px 5px 40px 5px;
  background: no-repeat url("../../../assets/images/camera/bg_5.png") center;
  background-size: 98% 99%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
.area-map{
    // position: absolute;
    width: 96%;
    height: 98%;

    // z-index: 1000;
}
  .table-list-pagination {
    margin-top: 10px;
    color: white;
  }
}
.el-dialog:not(.is-fullscreen) {
  margin-top: 10vh !important;
}
.el-table {
  color: #fff;
  overflow: auto;
  font-size: 1.8vh;
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
    //   margin-top: 30px;
    //   margin-left: 20px;
    i {
      cursor: pointer;
    }
    .status-top-left {
      display: flex;
    }
    font-size: 2vh;
    display: flex;
    justify-content: space-between;
    color: #fff;
    height: 20px;
    line-height: 20px;
    .status-work {
      font-size: 13px;
      background: red;
      border-radius: 10px;
      width: 60px;
      text-align: center;
    }
  }
  .status-bottom {
    margin-top: 15px;
    height: 80%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .status-card {
    //   padding: 30px 10px;
    box-sizing: border-box;
    width: 28%;
    height: 38%;
    margin-top: 20px;
    border: 1px solid #1c84c6;
    background: linear-gradient(#186697, transparent);
    display: flex;
    justify-content: space-around;
    .card-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        font-size: 23px;
        color: #fff;
      }
      .value {
        margin-top: 10px;
        font-size: 30px;
        color: #8fd2fc;
      }
    }
  }
}
.dv-border-box-11 {
  padding: 50px 50px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
.status-container {
  width: 100%;
  height: 100%;
  // padding: 40px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.el-dialog__header {
  display: none !important;
}
.group ::v-deep .el-dialog__body {
  height: 90%;
  // width:50%
  width: 100% !important;
}
.el-form {
  margin: 5% 3%;
}
.group ::v-deep .el-dialog__headerbtn {
  top: 18%;
  right: -5%;
  font-size: 2.5em;
  color: white;
  z-index: 1000000;
}
.group-body {
  margin-top: -22px !important;
}
.table-list {
  position: relative;
}

.el-form[data-v-2ad7dfef] {
  margin: 5% 3%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  // margin-top: 60px;
}
.el-dialog__wrapper ::v-deep .el-dialog.is-fullscreen {
  background: rgba(5,14,31,0.18);
}
.dialog-box ::v-deep .dialog-title[data-v-0bbe9357] {
  font-size: 2em !important;
}
.el-button {
  background-color: transparent;
}
.dialog ::v-deep .el-dialog__headerbtn {
  top: 17% !important;
  left: 101% !important;
  font-size: 3vh;
}
</style>
