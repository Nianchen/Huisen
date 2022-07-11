<template>
  <div class="dialog">
    <el-dialog  :show-close="isShowClose" :visible.sync="thisDialogVisible" @close="handleDialogClose" :width="position.percentWidth"
      :close-on-click-modal="closeOnClickModal">
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
      default: "设备绑定",
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
    handleDialogClose() {
      this.$emit("update:DialogVisibleFlag", false);
      // this.$parent.handleDialogClose()
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/poleIndex.scss";
.dialog-box {
  position: absolute;
  // width: 40vw;
  height: 92vh;
  background: no-repeat url("../../../assets/images/camera/dialog_bg.png");
  background-size: 83% 81%;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 7vh;
  left: 8vw;
  top: 16vh;

  .dialog-title {
    display: block;
    position: absolute;
    font-size: 2.5rem;
    color: white;
    margin-left: -2vw;
    margin-top: -1vh;
    top: 10%;
    left: 16%;
    //transform: translate();
  }

  .dialog-close {
    position: absolute;
    top: 5% !important;
    right: 17% !important;
    border: none;
    background: none;
    outline: none;
    color: white;
    font-size: 2rem;
    z-index: 10000;
    cursor: pointer;
  }
}
.dialog ::v-deep .el-dialog {
  margin-top: 0vh !important;
}
::v-deep .el-dialog__body,
::v-deep .el-dialog__header {
  background-color: transparent !important;
}
</style>
