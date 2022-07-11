<template>
  <div class="camera">
    <!--  header  -->
    <Header />

    <!--  home  -->
    <GoHome title="灯杆管理" class="group-header" />
    <!-- 装饰 -->
    <div class="line2"></div>
    <div class="line1"></div>
    <div class="line3"></div>
    <div class="group">
      <!--   树   -->
      <TreeList class="group-body"></TreeList>

      <div class="table-list">
        <div class="tree-list-btn">
          <button @click="checkList=1" :class="checkList === 1 ? 'button-active' : ''">
            <span>灯杆列表</span>
          </button>
          <button @click="checkList=2" :class="checkList === 2 ? 'button-active' : ''">
            <span>地图分布</span>
          </button>
        </div>
        <GroupList v-if="checkList===1" ></GroupList>
        <Area v-if="checkList===2"></Area>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/views/components/Header";
import TreeList from "@/views/pole/component/TreeList";
import GoHome from "@/views/components/GoHome";
import GroupList from "@/views/pole/component/GroupList";
import Area from "@/views/pole/component/Area";

export default {
  name: "index",

  data() {
    return {
         checkList:1,
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "") {
      }
    },
  },
  components: { Header, GoHome, TreeList, GroupList, Area },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/poleIndex.scss";
html{
  overflow: scroll !important;
}
.camera {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: #104c85 url("../../assets/images/camera/bg.jpg");
  // opacity:0.5;
  .header-navbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .navbar {
      margin: 4.5vh 1.5vw 0 0;
    }
    .nav-bar {
      margin-left: 100px;
    }
  }
}

.tabs-box {
  width: 20vw;
  height: 20vh;
}

.group {
  display: flex;
}
::v-deep .el-table {
  height: 100%;
}
.table-list {
  width: 100%;
  height: calc(100% - 14.8vh);
  color: white;
  display: flex;
  position: relative;
  .table-list-body {
    position: relative;
    width: 78.5vw;
    left: 0.5vw;
    top: 0vh;
    height: 78vh;
    box-sizing: border-box;
    margin: 4vh auto;
    padding: 40px 5px 40px 5px;
    background: no-repeat url("../../assets/images/new_tableBG.png") center;
    background-size: 100% 102%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 11;

    .table-list-pagination {
      margin-top: 10px;
      color: white;
    }
  }
}
.table-list {
  position: relative;
}
.tree-list-btn {
  border-left: 3px solid rgba(4, 111, 148, 1);
  position: absolute;
  top: 0vh;
  left: 0.75vw;
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
.group-body {
  margin-top: -5px !important;
}

::v-deep .el-tabs__nav-wrap::after {
  height: 0;
}

::v-deep .el-tabs__item.is-top:nth-child(2) {
  padding-left: 16px;
  border-left: 3px solid #046f94;
}

::v-deep .el-tabs__active-bar {
  background-color: transparent !important;
}

::v-deep .el-tabs__content {
  position: relative;
  top: -6.4vh !important;
  left: -1vw !important;
}

::v-deep .el-tabs__item {
  width: 6vw;
  height: 5.2vh;
  line-height: 5.2vh;
  font-size: 1.2em;
  color: #fff;
  // font-weight: bold;
  border: 3px solid #046f94;
  border-left: none;
  background-image: radial-gradient(
    rgba(4, 111, 148, 0),
    rgba(4, 111, 148, 0.4),
    rgba(4, 111, 148, 1)
  );
}

::v-deep .el-tabs__item.is-active {
  background-image: radial-gradient(
    rgba(2, 94, 170, 0.1),
    rgba(2, 94, 170, 0.5),
    rgba(2, 90, 163, 0.9)
  );
  color: #fff;
}
.line2 {
  background: url("../../assets/images/camera/line_2.png");
  width: 63vw;
  height: 5vh;
  top: 94vh;
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
  width: 50vw;
  height: 7vh;
  overflow-x: hidden !important;
  position: absolute;
  top: 14vh;
  left: 50vw;
  background: no-repeat url("../../assets/images/header_line.png");
  background-size: 100% 100%;
}
</style>
