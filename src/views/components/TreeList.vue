<template>
  <div class="tree-list">
    <div class="group-left-img">
      <!--      <span class="title">{{ title }}</span>-->
      <div class="tree-list-btn">
        <button :class="isActive===1? 'button-active':''"><span>{{ btnTitle[0] }}</span></button>
        <button :class="isActive===2? 'button-active':''"><span>{{ btnTitle[1] }}</span></button>
      </div>
      <div class="group-left-input">
        <input type="text"  v-model="filterText" placeholder="请输入设备名称">
        <i class="el-icon-search"></i>
      </div>
      <div class="custom-tree-container"
           v-loading="isLoading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.4)">
        <el-tree
        class="filter-tree"
          :data="data"
          node-key="id"
          default-expand-all
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
           ref="tree"
          @node-click="handleNodeClick">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="custom-tree-node-img">
          <img v-if="data && data.children && data.children.length > 0" :src="images[0]"/>
          <img v-else :src="images[1]"/>
        <el-input v-if="node.inputVisible && node.inputVisible===true" size="mini" v-model="data.cat_name"></el-input>
          <span v-else>
          {{ data.label }}
          </span>
        </span>
        <span>
          <el-button v-if="data && data.children && data.children.length > 0"
                     type="text"
                     size="mini"
                     @click.stop="() => append(data)">
             <i class="el-icon-plus"></i>
          </el-button>
          <el-button
            class="buttons"
            type="text"
            size="mini"
            @click.stop="() => update(node, data)">
              <i class="el-icon-edit"></i>
            </el-button>
          <el-button
            type="text"
            size="mini"
            @click.stop="() => remove(node, data)">
            <i class="el-icon-delete"></i>
          </el-button>
        </span>
      </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>

import folderImg from '@/assets/images/camera/folder.png'
import cameraImg from '@/assets/images/camera/camera_2.png'

let id = 1000;
export default {
  name: "TreeList",
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true
    },
    images: {
      type: Array,
      default: function () {
        return [folderImg, cameraImg]
      }
    },
    btnTitle: {
      type: Array,
      default: function () {
        return ['分组', '区域']
      }
    },
    isActive: {
      type: Number,
      default: function () {
        return 1
      }
    },
    isLoading: {
      type: Boolean
    }

  },
  data() {
    return {
      filterText: '',
    }
  },
  watch: {
     filterText(val) {
        this.$refs.tree.filter(val);
      }
  },
  methods: {
    // append(data) {
    //   const newChild = {id: id++, label: 'testtest', children: []};
    //   if (!data.children) {
    //     this.$set(data, 'children', []);
    //   }
    //   data.children.push(newChild);
    // },
    handleNodeClick(data, node) {
      if (!data.children) {
        console.log(data)
        this.$emit('leafNodeChange', data)
      }
    },
    append(data) {
        this.$prompt('请输入区域名', '添加', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator:(val)=>{
            if(val===null){
              return false
            }
          },
          inputErrorMessage: '请输入区域名称'
        }).then(({value})=>{
          if (value) {
        const newChild = {id: id++, label: value, children: []}
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      }
        }).then(()=>{
          this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        });
        }).catch(()=>{
        //   this.$message({
        //   showClose: true,
        //   message: '添加失败',
        //   type: 'error'
        // });
        })
    },

    remove(node, data) {
      console.log(node.childNodes);
      if (node.childNodes.length !== 0) {

        this.$message.error('不能删除');
        return;
      }
      this.$confirm(
        '是否确认删除该区域?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",

        }
      ).then(()=>{
      const parent = node.parent;
      console.log(parent);
      const children = parent.data.children || parent.data;
      console.log(children);
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
      }).then(()=>{
          this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        });
        }).catch(()=>{
          this.$message({
          showClose: true,
          message: '删除失败',
          type: 'error'
        });
        })

    },
    update(node, data) {
       this.$prompt('请输入修改后的区域名', '修改', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator:(val)=>{
            if(val===null){
              return false
            }
          },
          inputErrorMessage: '请输入区域名称'
        }).then(({value})=>{
          if (value) {
        console.log(node);
        node.data.label = value
      }
        }).then(()=>{
          this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
        }).catch(()=>{
          this.$message({
          showClose: true,
          message: '修改失败',
          type: 'error'
        });
        })

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
    left: 0.46vw;
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
    margin-top: 7.4vh;
    width: 96%;
    height: 82%;
    transform: translateY(3%);
    background: no-repeat url('../../assets/images/camera/bg_1_2.png');
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
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 22vw;
  height: 58vh;
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

    img {
      width: 30%;
      height: 30%;
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
