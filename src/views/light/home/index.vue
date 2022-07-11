<template>
  <div class="group">
    <div>
      <GoHome title="灯光管理" class="group-header"></GoHome>
      <TreeList class="group-body"  ></TreeList>
    </div>
    <div class="line2"></div>
    <div class="line1"></div>
    <div class="line3"></div>
    <div>
      <div class="table-list">
        <div class="tree-list-btn">
          <button @click="checkList=1" :class="checkList === 1 ? 'button-active' : ''">
            <span>设备列表</span>
          </button>
          <button @click="checkList=2" :class="checkList === 2 ? 'button-active' : ''">
            <span>地图展示</span>
          </button>
          <button
            @click="checkList=3"
            :class="checkList === 3 ? 'button-active' : ''"
          >
            <span>控制策略</span>
          </button>
          <button
            @click="checkList=4"
            :class="checkList === 4 ? 'button-active' : ''"
          >
            <span>故障报警</span>
          </button>
        </div>
        <DeviceList v-show="checkList===1" ></DeviceList>
        <Map v-show="checkList===2">  </Map>
        <StrategyList v-show="checkList===3" ></StrategyList>
        <div class="ywList" v-show="checkList===4"  >
        <ywList  class="table-list-body"  :type="'1'" ></ywList>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TreeList from "@/views/light/component/TreeList";
import GoHome from "@/views/components/GoHome";
import DeviceList from '@/views/light/deviceList/DeviceList';
import Warning from '@/views/light/warning/Warning';
import StrategyList from '@/views/light/strategyList/strategyList.vue';
import Map from '@/views/light/map/Map'
import ywList from '@/views/components/ywList'
export default {
  components: {
    GoHome,
    TreeList,
    DeviceList,
    StrategyList,
    Warning,
    Map,
    ywList,
  },
  data() {
    return {
      openStrategy:false,
      checkList:1,
      open: false,
      title: "",
    };
  },
   created () {
  },
  mounted() {},
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.group {
  display: flex;
  .group-header{
    position:absolute;
    z-index:1000;
  }
}
.table-list {
  width: 100%;
  height: calc(100% - 14.8vh);
  color: white;
  display: flex;
  position: relative;

  .table-list-body {
    width: 80.2vw;
    position: relative;
    left: -7.7vw;
    top: -3vh;
    height: 84vh;
    box-sizing: border-box;
    margin: 4vh auto;
    padding: 22px 5px 40px 5px;
    background: no-repeat url("../../../assets/images/new_tableBG.png") center;
    background-size: 98% 94%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .table-list-pagination {
      margin-top: 10px;
      color: white;
    }
  }
}

.el-table {
  color: #fff;
  overflow: auto;
  top: 2vh;
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
}
.dialog-box {
  width: 30vw !important;
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


.group-body {
  margin-top: -38px !important;
}
.table-list {
  position: relative;
}
.tree-list-btn {
  border-left: 3px solid rgba(4, 111, 148, 1);
  position: absolute;
  top: 0vh;
  left: -6.6vw;
  top: 0.5vh;
  width: 80%;
  overflow: hidden;
  z-index: 1000;

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

  button {
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
      //border-right: none;
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

    span {
      display: block;
      transform: skew(-35deg);
    }
  }

  .button-active {
    background-image: radial-gradient(
      rgba(2, 94, 170, 0.1),
      rgba(2, 94, 170, 0.5),
      rgba(2, 90, 163, 0.9)
    );
  }
}

::v-deep .ywpagination{
  left: 7vw;
}
.line2 {
  background: url("../../../assets/images/camera/line_2.png");
  z-index: 111;
  width: 63vw;
  height: 5vh;
  top: 95vh;
  position: absolute;
  left: 4vw;
  background-size: 100% 100%;
}
.line1 {
  background: url("../../../assets/images/camera/line_1.png");
  z-index: 111;
  width: 66vw;
  height: 5vh;
  top: 94vh;
  position: absolute;
  left: 18vw;
  background-size: 100% 100%;
}
.line3 {
  width: 45vw;
  height: 6vh;
  position: absolute;
  top: 14vh;
  left: 54vw;
  background: no-repeat url("../../../assets/images/header_line.png");
  background-size: 100% 100%;
}

// ::v-deep .dialog-box .dialog-close{
//   top: 7%;
//   right: 0;
// }

.ywList{
  ::v-deep .el-table{
    width: 98%;
    height: 65vh;
    top: 3.5vh;
    left: 1%;
  }
  ::v-deep .pagination-container .el-pagination{
    right: -27vw;
    top: 2.9vh;
  }
}
::v-deep .el-table{
  font-size: 15px;
}
</style>
