<template>
  <div class="dialog">
    <el-dialog
      @click="click"
      :show-close="isShowClose"
      :visible.sync="thisDialogVisible"
      @close="handleDialogClose"
      :width="position.percentWidth"
      :close-on-click-modal="closeOnClickModal"
       :modal-append-to-body='false'>
      <div class="dialog-box" :style="{ width: position.vWidth }">
        <span class="dialog-title" :style="{top:position.topTitle,left:position.leftTitle}">{{ title }}</span>
        <button v-if="!isShowClose" @click="handleDialogClose" class="dialog-close"><i class="el-icon-close"></i>
        </button>
        <slot></slot>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Dialog",
  props: {
    title: {
      type: String,
      required: true,
    },
    DialogVisibleFlag: {
      type: Boolean,
      required: true,
      default: false,
    },
    position: {
      type: Object,
      required: false,
      default: () => {
        return {percentWidth: "67%", vWidth: "66vw", topTitle: "2%", leftTitle: "13%"};
      },
    },
    isShowClose: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    closeOnClickModal: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      // thisDialogVisible:this.visible
      thisDialogVisible: false,
    };
  },
  watch: {
    DialogVisibleFlag() {
      this.thisDialogVisible = this.DialogVisibleFlag;
    },
  },
  created() {
  },
  methods: {
    click() {
      console.log(this.thisDialogVisible);
      console.log(this.DialogVisible);
    },
    handleDialogClose() {
      // this.$emit("update:DialogVisibleFlag", false);
      this.$parent.handleDialogClose()
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog{
    .el-dialog__wrapper{
        background-color:rgba(0,0,0,0.6);
    }
}
.dialog-box {
  position: absolute;
  // width: 66vw;
  width: 100%;
  height: 76vh;
  background: no-repeat url("../../../assets/images/camera/dialog_bg.png");
  background-size: 100% 100%;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 7vh;

  .dialog-title {
    display: block;
    position: absolute;
    font-size: 2.3rem;
    color: white;
    top: 10%;
    left: 16%;
    //transform: translate();
  }

  .dialog-close {
    cursor: pointer;
    position: absolute;
    top: 6% !important;
    right: -0.1% !important;
    border: none;
    background: none;
    outline: none;
    color: white;
    font-size: 2.5em;
    z-index: 10000;
    &:hover {
      color: #a09e9e;
    }
  }
}

</style>
