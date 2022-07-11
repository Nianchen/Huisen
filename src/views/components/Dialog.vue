<template>
  <div class="ic-dialog">
    <el-dialog @click="click" :show-close="isShowClose" :visible.sync="thisDialogVisible" @close="handleDialogClose" :width="position.percentWidth"
      :close-on-click-modal="closeOnClickModal" modal >
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
        return {
          percentWidth: "67%",
          vWidth: "66vw",
          topTitle: "3%",
          leftTitle: "13%",
        };
      },
    },
    isShowClose: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    closeOnClickModal: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    beforeClose: Function,
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
  created() {},
  methods: {
    click() {
      console.log(this.thisDialogVisible);
      console.log(this.DialogVisible);
    },
    handleDialogClose() {
      if (typeof this.beforeClose === "function") this.beforeClose();
      else this.$emit("update:DialogVisibleFlag", false);
      // this.$parent.handleDialogClose()
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-box {
  position: absolute;
  // width: 66vw;
  width: 100%;
  height: 80vh;
  background: no-repeat url("../../assets/images/camera/dialog_bg.png");
  background-size: 100% 100%;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 7vh;
  // visibility: visible;

  .dialog-title {
    display: block;
    position: absolute;
    font-size: 2.5rem;
    color: white;
    top: 10%;
    left: 16%;
    //transform: translate();
  }

  .dialog-close {
    cursor: pointer;
    position: absolute;
    top: 6%;
    right:0.3%;
    border: none;
    background: none;
    outline: none;
    color: white;
    font-size: 2.5rem;
    z-index: 10000;

    &:hover {
      color: #a09e9e;
    }
  }
}
::v-deep .el-dialog__body,
::v-deep .el-dialog__header {
  background-color: transparent !important;
}
</style>
