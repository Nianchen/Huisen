<template>
  <div class="tree-list">
    <div class="group-left-img">
      <!--      <span class="title">{{ title }}</span>-->
      <div class="tree-list-btn">
        <button :class="checked===1? 'button-active':''" @click="checked=1"><span>{{ btnTitle[0] }}</span></button>
        <button v-show="!deptNone" :class="checked===2? 'button-active':''" @click="checked=2"><span>{{ btnTitle[1] }}</span></button>
      </div>
      <!-- <div class="group-left-input">
        <input type="text" v-model="filterText" placeholder="请输入分组名称">
        <i class="el-icon-search"></i>
      </div> -->
      <div class="custom-tree-container" v-loading="isLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.4)">
        <el-tree
          class="filter-tree"
          :data="checked===1?groupTreeData:deptOptions"
          node-key="id"
          default-expand-all
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          ref="tree"
          @node-click="handleNodeClick" @node-contextmenu="rightClick">
          // eslint-disable-next-line
          <span class="custom-tree-node" slot-scope="{node,data}">
            <span class="custom-tree-node-img">

              <div v-if="checked===1">
                  <img v-if="node.expanded && data.children" :src="imagesNew[1]"/>
                  <img v-else :src="imagesNew[0]"/>
              </div>
              <div v-else>
                  <img v-if="node.expanded && data.children" :src="images[1]"/>
                  <img v-else :src="images[0]"/>
              </div>
              <!-- <span>{{node}}</span> -->
              <span>{{ data.label }}</span>
            </span>
            <!-- <span v-if="checked===1">
              <el-button  type="text" size="mini" @click.stop="() => append(data)" v-hasPermi="['lamp:lampComponent:edit']">
                 <i class="el-icon-plus"></i>
              </el-button>
              <el-button class="buttons" type="text" size="mini" @click.stop="() => update(node, data)" v-hasPermi="['lamp:lampComponent:edit']">
                  <i class="el-icon-edit"></i>
              </el-button>
              <el-button type="text" size="mini" @click.stop="() => remove(node, data)" v-hasPermi="['lamp:lampComponent:edit']">
                <i class="el-icon-delete"></i>
              </el-button>
            </span> -->

          </span>
        </el-tree>
      <!-- <div v-if="checked===1">
          <div id="perTreeMenu" v-if="tmDisplay" class="tree_menu" :style="{...rightMenu}">
          <ul>
            <li @click.stop="() => append(data)" v-hasPermi="['lamp:lampComponent:edit']"><i class="el-icon-tickets"></i> 新建</li>
            <li @click.stop="() => update(node, data)" v-hasPermi="['lamp:lampComponent:edit']"> <i class="el-icon-edit"></i> 修改</li>
            <li @click.stop="() => remove(node, data)" v-hasPermi="['lamp:lampComponent:edit']"><i class="el-icon-edit"></i> 删除</li>
          </ul>
        </div>
      </div> -->
      </div>

    </div>
     <div v-if="checked===1">
          <div id="perTreeMenu" v-if="tmDisplay" class="tree_menu" :style="{...rightMenu}">
          <ul>
            <li @click.stop="() => append(data)" v-hasPermi="['lamp:lampComponent:edit']"><i class="el-icon-tickets"></i> 新建</li>
            <li @click.stop="() => update(node, data)" v-hasPermi="['lamp:lampComponent:edit']"> <i class="el-icon-edit"></i> 修改</li>
            <li @click.stop="() => remove(node, data)" v-hasPermi="['lamp:lampComponent:edit']"><i class="el-icon-edit"></i> 删除</li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
import { listLampGroupTree, getLampGroup, delLampGroup, addLampGroup, updateLampGroup, exportLampGroup } from "@/api/lamp/lampGroup";
import { treeselect } from "@/api/system/dept";
import  floderOpenImg from '@/assets/images/road-close.png'
import folderCloseImg from '@/assets/images/road-open.png'
import folderImgNew from '@/assets/images/order-close.png'
import folderOpenImgNew from '@/assets/images/order-open.png'
import  { MockGroupRoadListData} from '@/utils/MockData'
export default {
  name: "TreeList",
  props: {
    title: {
      type: String,
      default: function () {
        return "设备分组"
      }
    },
    imagesNew:{
      type: Array,
      default: function () {
        return [folderImgNew, folderOpenImgNew]
      }
    },
    images: {
      type: Array,
      default: function () {
        return [folderCloseImg, floderOpenImg]}
    },

    btnTitle: {
      type: Array,
      default: function () {
        return ['分组', '道路']
      }
    },
    isLoading: {
      type: Boolean
    },
    deptNone:{
      require:false
    }
  },
  data() {
    return {
      tmDisplay: false,
      filterText: '',
      isActive: true,
      groupTreeData: null,
      // 表单参数
      form: {},
      // 部门树选项
      deptOptions: undefined,
      checked:1,
      // folderImgNew:require('@/assets/images/camera/folder.png'),
      // folderOpenImgNew:require('@/assets/images/floder_open.png'),
      data: null,
      node: null,
    }
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getGroupTree();
    this.getDeptTree();
  },
  methods: {
      rightClick(e, data, node) {
      console.log("e:", e, "data", data);
      this.rightMenu = { top: e.pageY +250+ "px", left: e.pageX + "px" };
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
    getGroupTree() {
      listLampGroupTree().then(response => {
        this.groupTreeData = response.data
        this.$bus.$emit('ligTreeData',this.groupTreeData)
      });
       
    },
    /** 查询部门下拉树结构 */
    getDeptTree() {
      treeselect().then(response => {
        this.deptOptions = MockGroupRoadListData();
      });
    },
    handleNodeClick(data, node) {
      this.data=data;
      this.node=node;
      console.log(data);
      console.log(node);
      if (!data.children) {
        this.$emit('leafNodeChange', data)
      }
      if(this.checked==1){
        if(this.deptNone){
          this.$bus.$emit('operationGroupId',data.id);
        }else{
          this.$bus.$emit('groupId',data.id)
        }

      }
      if(this.checked ==2){
        this.$bus.$emit('deptId',data.id)
      }

    },
    append(data) {
      this.reset();
      this.$prompt('请输入分组名称', '添加分组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'myClass',
        inputValidator: (val) => {
          if (val === null) {
            return false
          }
        },
        inputErrorMessage: '请输入分组名称'
      }).then(({value}) => {
        if (value) {
          this.form.name = value
          this.form.parentId = data.id;
          this.form.ancestors = data.ancestors + "," + data.id
          addLampGroup(this.form).then(response => {
            this.msgSuccess("新增成功");
            this.getGroupTree();
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
    remove(node, data) {
      if (node.childNodes.length !== 0) {
        this.$message.error('不能删除该分组，请先删除子分组');
        return;
      }
      this.$confirm(
        '是否确认删除分组【'+data.label+'】?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          customClass: 'myClass'
        }

      ).then(() => {
        delLampGroup(data.id).then(response => {
          this.msgSuccess("删除成功");
          this.getGroupTree();
        });
      }).catch(() => {
        this.$message({
          showClose: true,
          message: '删除失败',
          type: 'error'
        });
      })

    },
    update(node, data) {
      this.$prompt('请输入分组名称', '修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue:data.label,
        customClass: 'myClass',
        inputValidator: (val) => {
          if (val === null) {
            return false
          }
        },
        inputErrorMessage: '请输入区域名称'
      }).then(({value}) => {
        if (value) {
          this.form.name = value
          this.form.id = data.id;
          updateLampGroup(this.form).then(response => {
            this.msgSuccess("修改成功");
            this.getGroupTree();
          });
        }
      }).catch(() => {

      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
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
    },
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
      width: 5.4vw;
      height: 5vh;

      &:first-child {
        //border-right: none;
        width: 7vw;
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
    margin-top:0.4vh;
    top:6vh;
    width: 70%;
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
  padding: 10px;
  top: 46%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16vw;
  height: 63vh;
  align-content: center;
  //max-height: 28vh;
  overflow: auto;
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
.myClass{
  background-color: aqua;
}

</style>
