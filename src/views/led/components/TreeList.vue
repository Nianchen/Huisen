<template>
  <div class="tree-list">
    <div class="group-left-img">
      <div class="tree-list-btn">
        <button
          :class="isActive ? 'button-active' : ''"
          @click="handleBtnChange(true)"
        >
          <span>{{ btnTitle[0] }}</span>
        </button>
        <button
          v-show="!deptNone"
          :class="isActive ? '' : 'button-active'"
          @click="handleBtnChange(false)"
        >
          <span>{{ btnTitle[1] }}</span>
        </button>
      </div>

      <!-- 分组 -->

      <div
        v-show="showGroup"
        class="custom-tree-container"
        v-loading="isTreeLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.4)"
      >
        <el-tree
          v-show="showGroup"
          class="filter-tree"
          :data="groupTreeData"
          node-key="id"
          default-expand-all
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          ref="grouptree"
          @node-click="handleNodeClick"
          @node-contextmenu="TreeRightClick"
        >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
            @click="gotogrouplistInfo(data)"
            v-hasPermi="['led:component:edit']"
          >
            <span class="custom-tree-node-img">
              <img
                v-if="data && data.children"
                :src="node.expanded ? folderOpenImg : folderImg"
              />
              <img v-else :src="folderImg" class="ledimg" />
              <span>{{ data.label }}</span>
            </span>
            <!-- <span>
              <el-button type="text" size="mini" @click.stop="() => append(data)" v-hasPermi="['led:component:edit']">
                <i class="el-icon-plus"></i>
              </el-button>
              <el-button class="buttons" type="text" size="mini" @click.stop="() => update(node, data)" v-hasPermi="['led:component:edit']">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button type="text" size="mini" @click.stop="() => remove(node, data)" v-hasPermi="['led:component:edit']">
                <i class="el-icon-delete"></i>
              </el-button>
            </span>-->
          </span>
        </el-tree>


      </div>
      <!-- 道路 -->

      <div
        v-show="showArea"
        class="custom-tree-container"
        v-loading="isTreeLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.4)"
      >
        <el-tree
          v-show="showArea"
          class="filter-tree"
          :data="deptOptions"
          node-key="id"
          default-expand-all
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          ref="tree"
          @node-click="handleNodeClick"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span
              class="custom-tree-node-img"
              @click="gotoareaList(data)"
              v-hasPermi="['led:component:edit']"
            >
              <img
                v-if="data && data.children"
                :src="node.expanded ? folderOpenImgNew : folderImgNew"
              />
              <img v-else :src="folderImgNew" style="font-size: 50px" />
              <span>{{ data.label }}</span>
            </span>
          </span>
        </el-tree>


      </div>
    </div>
      <div
          id="perTreeMenu"
          v-if="tmDisplay"
          class="tree_menu"
          :style="{ ...rightMenu }"
        >
          <ul>
            <li
              @click.stop="() => append(data)"
              v-hasPermi="['led:component:edit']"
            >
              <i class="el-icon-tickets"></i> 新建
            </li>
            <li
              @click.stop="() => update(node, data)"
              v-hasPermi="['led:component:edit']"
            >
              <i class="el-icon-edit"></i> 修改
            </li>
            <li
              @click.stop="() => remove(node, data)"
              v-hasPermi="['led:component:edit']"
            >
              <i class="el-icon-delete"></i> 删除
            </li>
          </ul>
        </div>
  </div>
</template>

<script>
import { groupTree, addGroupList, editTree, delTree } from "@/api/led/ledApi";
import folderImg from "@/assets/images/camera/folder.png";
import LEDImg from "@/assets/images/index-led.png";
import { treeselect } from "@/api/system/dept";
export default {
  name: "TreeList",
  props: {
    images: {
      type: Array,
      default: function () {
        return [folderImg, LEDImg];
      },
    },
    btnTitle: {
      type: Array,
      default: function () {
        return ["分组", "道路"];
      },
    },
    deptNone: {
      require: false,
    },
  },
  data () {
    return {
      tmDisplay: false,
      filterTextGroup: null,
      filterTextArea: null,
      isActive: true,
      groupTreeData: null,
      isTreeLoading: false,
      // 表单参数
      form: {},
      // 部门树选项
      deptOptions: null,
      showGroup: true,
      showArea: false,
      folderOpenImg: require("@/assets/images/order-close.png"),
      folderImg: require("@/assets/images/order-open.png"),
      folderOpenImgNew: require("@/assets/images/road-close.png"),
      folderImgNew: require("@/assets/images/road-open.png"),
      // 子组件向父组件传值的
      data: null,
      node: null,
    };
  },
  watch: {
    filterTextGroup (val) {
      console.log(val);
      this.$refs.grouptree.filter(val);
    },
    filterTextArea (val) {
      this.$refs.tree.filter(val);
    },
  },
  created () {
    this.getGroupTree();
    this.getDeptTree();
  },
  methods: {
    // 右键点击事件
    TreeRightClick (e, data, node) {
      console.log("e:", e, "data", data);
      this.rightMenu = { top: e.pageY + 230+"px", left: e.pageX + "px" };
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

    //获取分组数据
    getGroupTree () {
      this.isTreeLoading = true;
      groupTree().then((response) => {
        console.log('分组数据', response);
        if (response.code === 200) {
          this.groupTreeData = response.data;
          this.$bus.$emit('ledTreeData',this.groupTreeData)
          this.isTreeLoading = false;
        }
      });
    },

    /**区域 查询部门下拉树结构  */
    getDeptTree () {
      this.isTreeLoading = true;
      treeselect().then((response) => {
        console.log('部门下拉', response);
        this.deptOptions = response.data;
        this.isTreeLoading = false;
      });
    },
    // 点击获取到当前分组id，传给兄弟组件
    gotogrouplistInfo (e) {

      if (this.deptNone) {
        this.$bus.$emit("operationGroupId", e.id);
        console.log(e.id);
      } else {
        this.$bus.$emit("groupId", e.id);
        console.log(e.id);
      }
    },
    gotoareaList (e) {
      this.$bus.$emit("deptId", e.id);
      console.log(e.id);
    },
    // 当前点击的分组和区域
    handleBtnChange (flag) {
      console.log(flag);
      if (flag) {
        this.showGroup = true;
        this.showArea = false;
        this.filterTextGroup = null;
        this.filterTextArea = null;
      } else {
        this.showGroup = false;
        this.showArea = true;
        this.filterTextGroup = null;
        this.filterTextArea = null;
      }
      // this.handleTreeListBtnChange(flag);
      this.isActive = flag;
    },

    handleNodeClick (data, node) {
      this.data = data;
      this.node = node;
      if (!data.children) {
        this.$emit("leafNodeChange", data);
      }
    },
    append (data) {
      this.reset();
      this.$prompt("请输入分组名称", "添加分组", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: (val) => {
          if (val === null) {
            return false;
          }
        },
        inputErrorMessage: "请输入分组名称",
      })
        .then(({ value }) => {
          if (value) {
            this.form.name = value;
            this.form.parentId = data.id;
            this.form.ancestors = data.ancestors + "," + data.id;
            addGroupList(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.getGroupTree();
            });
          }
        })
        .catch(() => {
          //   this.$message({
          //   showClose: true,
          //   message: '添加失败',
          //   type: 'error'
          // });
        });
    },
    remove (node, data) {
      if (node.childNodes.length !== 0) {
        this.$message.error("不能删除该分组，请先删除子分组");
        return;
      }
      this.$confirm("是否确认删除分组【" + data.label + "】?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delTree(data.id).then((response) => {
            this.msgSuccess("删除成功");
            this.getGroupTree();
          });
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: "删除失败",
            type: "error",
          });
        });
    },
    update (node, data) {

      this.$prompt("请输入分组名称", "修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: data.label,
        inputValidator: (val) => {
          if (val === null) {
            return false;
          }
        },
        inputErrorMessage: "请输入区域名称",
      })
        .then(({ value }) => {
          if (value) {
            // this.form.parentId=data.parentId
            this.form.name = value;
            this.form.id = data.id;
            console.log(this.form);
            editTree(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.getGroupTree();
            });
          }
        })
        .catch(() => {
          /*this.$message({
          showClose: true,
          message: '修改失败',
          type: 'error'
        });*/
        });
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    reset () {
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
        delFlag: null,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/poleIndex.scss';
.tree-list {
  width: 28.5vw;
  height: 87vh;
  padding-left: 10px;
  position: relative;

  .tree-list-btn {
    border-left: 3px solid rgba(4, 111, 148, 1);
    position: absolute;
    top: -4.3vh;
    left: 0.23vw;
    width: 80%;
    overflow: hidden;
    z-index: 1000;

    &::after {
      content: '';
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

  .group-left-img {
    position: relative;
    margin-top: 0.4vh;
    width: 70%;
    height: 85%;
    top: 2vh;
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
  padding: 10px;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 17vw;
  height: 58vh;
  //max-height: 28vh;
  // overflow: hidden;
  // overflow: scroll;
  // white-space: nowrap;
  //  overflow-x: scroll;
  //  flex-wrap: nowrap;

  //max-width: 300px;
}

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
  font-size: 1.1em;
  padding-right: 8px;

  .custom-tree-node-img {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 1.3vw;
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
</style>
