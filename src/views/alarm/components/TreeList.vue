<template>
  <div class="tree-list camera-tree-list">
    <div class="group-left-img">
      <div class="tree-list-btn">
        <button :class="isActive? 'button-active':''" @click="handleBtnChange(true)"><span>{{ btnTitle[0] }}</span>
        </button>
        <button :class="isActive? '':'button-active'" @click="handleBtnChange(false)"><span>{{ btnTitle[1] }}</span>
        </button>
      </div>
      <!-- <div class="group-left-input">
        <input type="text" v-model="filterText" placeholder="请输入设备名称">
        <i class="el-icon-search"></i>
      </div> -->
      <div class="custom-tree-container" v-loading="isTreeLoading" element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.3)">
        <el-tree
          class="filter-tree"
          :data="treeData"
          node-key="id"
          :filter-node-method="filterNode"
          :default-expand-all="true"
          :check-on-click-node="true"
          :expand-on-click-node="false"
          :check-strictly="true"
          ref="tree"
          @node-click="handleNodeClick"
          @node-contextmenu="rightClick">
          <div class="custom-tree-node" slot-scope="{ node, data }">
           <span class="custom-tree-node-img" v-if="change">
              <img v-if="rightShowView==='group'&&data.type==='c'" :src="images[3]" />
              <img v-else :src="node.expanded?folderOpenImg1:folderImg1" />
              <span type="g">{{ data.label }}</span>
            </span>

            <span class="custom-tree-node-img" v-if="!change">
              <img v-if="data && data.children" :src="node.expanded?folderOpenImg:folderImg" />
              <img v-else :src="folderImg" />
              <span>{{ data.label }}</span>
            </span>
<!--            <span v-if="isActive">-->
<!--          <el-button v-if="data && data.children && data.children.length > 0"-->
<!--                     type="text"-->
<!--                     size="mini"-->
<!--                     @click.stop="() => append(data)"-->
<!--                     v-hasPermi="['call:component:edit']">-->
<!--             <i class="el-icon-plus"></i>-->
<!--          </el-button>-->
<!--          <el-button v-if="data && data.children && data.children.length > 0"-->
<!--                     class="buttons"-->
<!--                     type="text"-->
<!--                     size="mini"-->
<!--                     @click.stop="() => update(node, data)"-->
<!--                     v-hasPermi="['call:component:edit']">-->
<!--              <i class="el-icon-edit"></i>-->
<!--            </el-button>-->
<!--          <el-button v-if="data.type==='g'"-->
<!--                     type="text"-->
<!--                     size="mini"-->
<!--                     @click.stop="() => remove(node, data)"-->
<!--                     v-hasPermi="['call:component:edit']">-->
<!--            <i class="el-icon-delete"></i>-->
<!--          </el-button>-->
<!--        </span>-->
          </div>
        </el-tree>
        <div v-if="change">
        <div id="perTreeMenu" v-if="tmDisplay" class="tree_menu" :style="{...rightMenu}">
          <ul>
            <li @click.stop="() => append(data)" v-hasPermi="['call:component:edit']"><i class="el-icon-tickets"></i> 新建</li>
            <li @click.stop="() => update(node, data)" v-hasPermi="['call:component:edit']"> <i class="el-icon-edit"></i> 修改</li>
            <li @click.stop="() => remove(node, data)" v-hasPermi="['call:component:edit']"><i class="el-icon-edit"></i> 删除</li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import folderImg1 from '@/assets/images/order-close.png';
import cameraImg1 from "@/assets/images/camera/camera_2.png";
import folderImg from '@/assets/images/road-close.png'
import cameraImg from '@/assets/images/road-open.png'
import {treeselect} from "@/api/system/dept";
import {groupTree, delGroup, updateGroup, addGroup} from '@/api/call/group'

export default {
  name: "TreeList",
  props: {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default: function () {
        return  [folderImg, cameraImg, folderImg1 , cameraImg1];
      }
    },
    btnTitle: {
      type: Array,
      default: function () {
        return ['分组', '道路']
      }
    },
    rightShowView: {
      type: String,
      default: '',
    }

  },
  data() {
    return {
      tmDisplay: false,
      filterText: '',
      change: true,
      isActive: true,
      videoPlayingArr: [],
      treeData: null,
      isTreeLoading: false,
      isShowCheckbox: true,
      isOneVideo: true,
      form: {},
      folderImg:require('@/assets/images/road-open.png'),
      folderOpenImg:require('@/assets/images/road-close.png'),
      folderImg1:require('@/assets/images/order-close.png'),
      folderOpenImg1:require('@/assets/images/order-open.png'),
      data: null,
      node: null,
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    rightShowView(val) {
      this.rightShowView = val
      // this.handleRightViewChange(false, val)
    }
  },
  created() {
    this.getGroupTreeData()
    // this.handleTreeDataChange()
  },
  mounted() {
    // this.handleIsOneVideo()
    // this.handleVideoClose()
  },
  methods: {
    rightClick(e, data, node) {
      console.log("e:", e, "data", data);
      this.rightMenu = { top: e.pageY + "px", left: e.pageX + "px" };
      this.tmDisplay = true;
      const self = this;
      document.onclick = function (ev) {
        if (ev.target !== document.getElementById("perTreeMenu")) {
          self.tmDisplay = false;
        }
      };
      this.data = data;
      this.node = node;
    },
    /**
     * 获取区域树形列表
     * */
    getDeptTree() {
      this.isTreeLoading = true
      treeselect().then(response => {
        console.log(response)
        this.treeData = response.data;
        // console.log(response)
        this.handleRightViewChange(response.data[0].id, this.rightShowView)
        this.isTreeLoading = false
      });
    },

    /**
     * 获取分组树形列表
     */
    getGroupTreeData() {
      this.isTreeLoading = true
      groupTree().then(response => {
        this.treeData = response.data
        // console.log(this.treeData)
        this.handleRightViewChange(response.data[0].id, this.rightShowView)
        this.isTreeLoading = false
        console.log(this.treeData)
      })
    },
    /**
     * 分组，区域切换
     * @param flag true为分组，false为区域
     */
    handleBtnChange(flag) {
      this.change = !this.change
      this.isActive = flag
      if (flag) {
        this.getGroupTreeData()
      } else {
        this.getDeptTree()
      }
    },

    handleRightViewChange(id, rightView) {
      switch (rightView) {
        case 'eventList':
          this.$bus.$emit('eventListId', id)
          break
        case 'area':
          this.$bus.$emit('areaXDHId', id)
          break
        case 'status':
          this.$bus.$emit('statusTableId', id)
          break
        case 'warning':
          this.$bus.$emit('warningTableId', id)
          break
      }
    },
    /**
     * 节点的点击事件的回调函数
     * @param data
     * @param node
     */
    handleNodeClick(data, node) {
      const {id} = data
      switch (this.rightShowView) {
        case 'eventList':
          console.log(this.rightShowView)
          this.$bus.$emit('eventListId', id)
          break
        case 'area':
          this.$bus.$emit('areaXDHId', id)
          break
        case 'status':
          this.$bus.$emit('statusTableId', id)
          break
        case 'warning':
          this.$bus.$emit('warningTableId', id)
          break
      }
    },

    /**
     * 添加分组
     * @param data
     */
    append(data) {
      this.reset();
      this.$prompt('请输入分组名称', '添加分组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: (val) => {
          if (val === null) {
            return false
          }
        },
        inputErrorMessage: '请输入分组名称'
      }).then(({value}) => {
        if (value) {
          this.form.name = value
          this.form.type = 'g'
          this.form.parentId = data.id;
          this.form.ancestors = data.ancestors + "," + data.id
          addGroup(this.form).then(response => {
            this.msgSuccess("新增成功");
            this.getGroupTreeData()
            // this.handleTreeDataChange()
          });
        }
      }).catch(() => {
        //   this.$message({
        //   showClose: true,
        //   message: '添加失败',
        //   type: 'error'
        // });
      })
    },
    /**
     * 删除分组
     * @param node
     * @param data
     */
    remove(node, data) {
      if (node.childNodes.length !== 0) {
        this.$message.error('不能删除该分组，请先删除子分组');
        return;
      }
      this.$confirm(
        '是否确认删除分组【' + data.label + '】?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        delGroup(data.id).then(response => {
          this.msgSuccess("删除成功");
          this.getGroupTreeData()
          this.handleTreeDataChange();
        });
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '删除失败',
          type: 'error'
        });
      })

    },
    /**
     * 修改分组名称
     * @param node
     * @param data
     */
    update(node, data) {
      this.$prompt('请输入分组名称', '修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: data.label,
        inputValidator: (val) => {
          if (val === null) {
            return false
          }
        },
        inputErrorMessage: '请输入分组名称'
      }).then(({value}) => {
        if (value) {
          this.form.name = value
          this.form.id = data.id;
          updateGroup(this.form).then(response => {
            this.msgSuccess("修改成功");
            this.getGroupTreeData()
            this.handleTreeDataChange()
          });
        }
      }).catch(() => {
        // this.$message({
        //   showClose: true,
        //   message: '修改失败',
        //   type: 'error'
        // });
      })
    },
    /**
     * 过滤器
     * @param value
     * @param data
     * @returns {boolean}
     */
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /**
     * 重置表单
     */
    reset() {
      this.form = {
        id: null,
        name: null,
        code: null,
        parentId: null,
        ancestors: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remarks: null,
        delFlag: null
      };
    }
  }
}
</script>

<style lang="scss" scoped>

.tree_menu{
  width: 80px;
  li{
    width: 100%;
  }
}
.tree-list {
  width: 28.5vw;
  height: 87vh;
  padding-left: 10px;
  position: relative;

  .tree-list-btn {
    border-left: 3px solid rgba(4, 111, 148, 1);
    position: absolute;
    top: -4.25vh;
    left: 0.28vw;
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
      width: 6vw;
      height: 5vh;

      &:first-child {
        //border-right: none;
        width: 7.5vw;
        margin-left: -30px;
        padding-left: 30px;
      }

      &:last-child {
        margin-left: -4px;
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
    //margin-top: 7.4vh;
    //width: 96%;
    //height: 82%;
    margin-top: 0.4vh;
    top: 2vh;
    width: 70%;
    height: 85%;
    transform: translateY(3%);
    background: no-repeat url("../../../assets/images/tree-bac.png");
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
  padding: 10px;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 17vw;
  height: 58vh;
  //max-height: 28vh;
  //overflow: auto;
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

    img {
      width:  1.3vw;
      //width: 30%;
      //height: 100%;
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

::v-deep .el-tree-node__expand-icon{
    font-size: 20px;
}
</style>
