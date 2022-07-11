<template>
  <div class="tree-list">
    <div class="group-left-img">
      <div class="tree-list-btn">
        <button :class="checked===1? 'button-active':''" ><span>{{ btnTitle[1] }}</span></button>
      </div>
      <!-- <div class="group-left-input">
        <input type="text" v-model="filterText" :placeholder="'请输入' + btnTitle[1] + '名称'">
        <i class="el-icon-search" style="font-size:20px;color:#fff;cursor:pointer"></i>
      </div> -->
      <div class="custom-tree-container" v-loading="isLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.4)">
        <el-tree
          class="filter-tree"
          :data="deptOptions"
          node-key="id"
          default-expand-all
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          ref="tree"
          @node-click="handleNodeClick">
          <span class="custom-tree-node" slot-scope="{ node,data }">
            <span class="custom-tree-node-img">
              <img v-if="data && data.children" :src="node.expanded?folderOpenImg:folderImg"  class="poleImg"/>
              <img v-else :src="folderImg" class="poleImg"/>
              <span>{{ data.label }}</span>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
import {MockGroupRoadListData} from '@/utils/MockData'


export default {
  name: "TreeList",
  props: {
    btnTitle: {
      type: Array,
      default: function () {
        return ['分组', '道路']
      }
    },
  },
  data() {
    return {
      folderImg:require('@/assets/images/road-open.png'),
      folderOpenImg:require('@/assets/images/road-close.png'),
      filterText: '',
      isActive: true,
      // 部门树选项
      deptOptions: undefined,
      checked:1,
       isLoading:false

    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getDeptTree();
  },
  methods: {
    /** 查询部门下拉树结构 */
    getDeptTree() {
      this.isLoading=true
      this.deptOptions=MockGroupRoadListData()
      this.isLoading=false
      // treeselect().then(response => {
      //   console.log("tree");
      //   this.deptOptions = response.data;
      //    this.isLoading=false
      // });
    },
    handleNodeClick(data, node) {
      console.log('clickclickclikc');
      console.log(data,node);
      if (!data.children) {
        this.$emit('leafNodeChange', data)
      }
      this.$bus.$emit('deptId',data.id)
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-list {
  width: 28.5vw;
  height: 87vh;
  padding-left: 10px;
  position: relative;

  .tree-list-btn {
    border-left: 3px solid rgba(4, 111, 148, 1);
    position: absolute;
    top: -4.25vh;
    left: 0.3vw;
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
        margin-left: -19px;
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

  .group-left-img {
    position: relative;
    margin-top: 3vh;
    width: 94%;
    height: 85%;
    transform: translateY(3%);
    background: no-repeat url('../../../assets/images/tree-bac.png');
    background-size: 100% 98%;

    .title {
      position: absolute;
      top: 5%;
      left: 22%;
      font-size: 1.5em;
      color: rgba(255, 255, 255, 0.5);
    }

    .group-left-input {
      position: absolute;
      top: 5%;
      right: 10%;
      width: 55%;
      height: 5%;
      display: flex;
      align-items: center;
      border: 2px solid rgba(14, 93, 160, 0.5);
      border-radius: 30px;
      padding-right: 0.8vw;

      input {
        width: 95%;
        height: 100%;
        background: none;
        outline: none;
        border: none;
        padding: 0 0.8vw;
        color: white;
        font-size: 1em;
      }

      input::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: rgba(255, 255, 255, 0.3);
      }

      input::-moz-placeholder {
        /* Firefox 19+ */
        color: rgba(255, 255, 255, 0.3);
      }

      input:-ms-input-placeholder {
        /* IE 10+ */
        color: rgba(255, 255, 255, 0.3);
      }

      input:-moz-placeholder {
        /* Firefox 18- */
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}

.custom-tree-container {
  //border: 1px solid;
  position: absolute;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16vw;
  height: 63vh;
  //max-height: 28vh;
  // overflow: auto;
  overflow-x: auto;
  //max-width: 300px;
}

/*.custom-tree-container::-webkit-scrollbar {
  display: none; !* Chrome Safari *!
}

.custom-tree-container {
  scrollbar-width: none; !* firefox *!
  -ms-overflow-style: none; !* IE 10+ *!
  overflow-x: hidden;
  overflow-y: auto;
}*/

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  border-radius: 1em;
  background-color: rgba(56, 104, 153, 0.3);
}

::-webkit-scrollbar-track {
  border-radius: 1em;
  background-color: rgba(56, 104, 153, 0.1);
}

.custom-tree-node {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1em;
  padding-right: 8px;

  .custom-tree-node-img {
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width:  1.3vw;
    }


  }

  .buttons {
    padding-left: 5px;
  }
}

.el-tree {
  background-color: transparent;

  .el-button {
    color: #fff;
    font-size: 1em;
  }

  .el-icon-s-order {
    font-size: 17px;
  }

  .custom-tree-node {
    color: #fff;
  }
}
.myClass{
  background-color: aqua;
}
// .poleImg{
//   padding-left: 1vw;
//   width: 10%;
// }
</style>
