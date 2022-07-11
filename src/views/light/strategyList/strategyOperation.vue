<template>
  <div>
    <Dialog
      title="控制策略"
      @handleDialogClose="handleDialogClose"
      :DialogVisibleFlag.sync="thisDialogVisibleFlag"
      :isShowClose="false"
    >
      <div class="dialogbox">
        <el-form
          label-position="left"
          ref="form"
          :model="form"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="策略名称:" prop="name">
            <el-input v-model="form.name" class="input1"></el-input>
          </el-form-item>
          <el-form-item label="设备绑定:">
            <span v-if="ids">
              <el-tag effect="dark" type="success" @close="handleCloseTag(index)" closable v-for="(item,index) in names" :key="index">
                {{item}}
              </el-tag>
              </span
            ><el-button class="bindDeviceBtn" style="margin-left:1vh" type="primary" @click="handBindDevice">
             选择设备
            </el-button>
          </el-form-item>
          <el-form-item v-if="detail" label="是否启用">
          <el-switch active-value="1" inactive-value="2" disabled v-model="isEffect" @click.native="changeEffect"></el-switch>
          </el-form-item>
          <el-form-item label="时间类型:" prop="dateType">
            <el-checkbox-group v-model="form.dateType">
              <el-checkbox label="周一" name="1"></el-checkbox>
              <el-checkbox label="周二" name="2"></el-checkbox>
              <el-checkbox label="周三" name="3"></el-checkbox>
              <el-checkbox label="周四" name="4"></el-checkbox>
              <el-checkbox label="周五" name="5"></el-checkbox>
              <el-checkbox label="周六" name="6"></el-checkbox>
              <el-checkbox label="周日" name="7"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="策略任务:" prop="strategyList">
            <div class="task-check">
              <el-button class="bindDeviceBtn" type="primary" size="mini" @click="addTask"
                >新增策略</el-button
              >
            </div>
            <div class="task-box">
              <div
                class="item"
                v-for="(item, index) in form.strategyList"
                :key="index"
              >
                <div class="top">
                  <div>任务{{ index + 1 }}</div>
                  <div class="item-right">
                    <div class="item-right-title">亮度</div>
                    <div class="el-icon-minus" @click="decrease(index)"></div>
                    <el-progress
                      :text-inside="true"
                      :stroke-width="15"
                      :percentage="item.brightnessCap1"
                      :color="customColors"
                    ></el-progress>
                    <div class="el-icon-plus" @click="increase(index)"></div>
                  </div>
                  <el-form-item label="" :inline-message="true">
                    <el-time-picker
                  popperClass="ic-pagination"
                    value-format="HH:mm"
                    format="HH:mm"

                    :picker-options="{
                    selectableRange: '00:00:00-23:59:00',
                  }"
                    v-model="item.startDate"
                    placeholder="请选择时间点"
                  >
                  </el-time-picker>
                  </el-form-item>

                  <span
                  v-show="index"
                    :style="index ? '' : { opacity: 0 }"
                    class="el-icon-error delete-icon"
                    @click="strategyDelete(index)"
                  ></span>
                </div>
                <div class="bottom"></div>
              </div>
            </div>
          </el-form-item>
          <el-form-item class="formConfirm">
            <el-button type="primary" @click="submitForm" class="bindDeviceBtn">{{
              detail ? "修改" : "立即创建"
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>
    <bindDeviceDialog
      @bindDevice="handBindDetail"
      :DialogVisibleFlag.sync="bindDeviceDialog"
    ></bindDeviceDialog>
  </div>
</template>
<script>
import Dialog from "@/views/light/component/Dialog";
import bindDeviceDialog from "@/views/light/component/bindDeviceDialog";
import { addControl, updateControl,startControl,stopControl } from "@/api/lamp/control";
export default {
  props: {
    DialogVisibleFlag: {
      type: Boolean,
      required: true,
      default: false,
    },

    detail: {
      required: false,
    },
  },
  components: {
    Dialog,
    bindDeviceDialog,
  },

  data() {
    return {
      thisDialogVisibleFlag: false,
      form: {
        name: "",
        dateType: [],
        strategyList: [
          {
            brightnessCap1: 50,
            startDate: "",
          },
        ],
      },
      bindDeviceDialog: false,
      customColors: [
        { color: "#1A8CF5", percentage: 20 },
        { color: "#1A8CF5", percentage: 40 },
        { color: "#1A8CF5", percentage: 60 },
        { color: "#1A8CF5", percentage: 80 },
        { color: "#1A8CF5", percentage: 100 },
      ],
      rules: {
        name: [
          { required: true, message: "请输入策略名称", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
        dateType: [
          { required: true, message: "请选择时间类型", trigger: "blur" },
        ],

      },
      dataType: [],
      ids: "",
      isEffect:''
    };
  },
  watch: {
    DialogVisibleFlag() {
      this.thisDialogVisibleFlag = this.DialogVisibleFlag;
    },
    detail() {
      this.form = this.detail;
      if(this.form.status){
        this.isEffect = this.form.status;
      }

      this.dataTypeChange();
    },
  },
  methods: {
    handleDialogClose() {
      this.$emit("update:DialogVisibleFlag", false);
      this.$parent.getList();

      if (this.detail) {
        this.form = this.detail;
      } else {
        this.form = {
          name: "",
          dateType: [],
          strategyList: [
            {
              brightnessCap1: 50,
              startDate: "",
            },
          ],
        };
      }
    },
    handBindDevice() {
      this.bindDeviceDialog = true;
    },
    handleDeviceClose() {
      this.$emit("update:DialogVisibleFlag", false);
    },
    //进度条
    customColorMethod(brightnessCap1) {
      if (brightnessCap1 < 30) {
        return "#1A8CF5";
      } else if (brightnessCap1 < 70) {
        return "#1A8CF5";
      } else {
        return "#1A8CF5";
      }
    },
    increase(index) {
      this.form.strategyList[index].brightnessCap1 += 10;
      if (this.form.strategyList[index].brightnessCap1 > 100) {
        this.form.strategyList[index].brightnessCap1 = 100;
      }
    },
    decrease(index) {
      this.form.strategyList[index].brightnessCap1 -= 10;
      if (this.form.strategyList[index].brightnessCap1 < 0) {
        this.form.strategyList[index].brightnessCap1 = 0;
      }
    },
    //任务新增
    addTask() {
      this.form.strategyList.push({
        startDate: "",
        brightnessCap1: 50,
      });
    },
    addStrategy() {},
    //新增和修改按钮
    submitForm() {
      let typeList = "";
      this.form.lampId = this.ids.toString();
      console.log(this.ids);
      console.log('111111111232331231231231312321');
      console.log(this.form);
      console.log(this.form.dateType);
      this.form.dateType.forEach((item, index) => {
        switch (item) {
          case "周一":
            typeList += 1;
            break;
          case "周二":
            typeList += 2;
            break;
          case "周三":
            typeList += 3;
            break;
          case "周四":
            typeList += 4;
            break;
          case "周五":
            typeList += 5;
            break;
          case "周六":
            typeList += 6;
            break;
          case "周日":
            typeList += 7;
            break;

          default:
            break;
        }
      });

      this.form.dateType = typeList;

      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
             console.log(this.form);
            updateControl(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.$emit("update:DialogVisibleFlag", false);
              this.$parent.getList();
            });
          } else {
            console.log(this.form);
            addControl(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.$emit("update:DialogVisibleFlag", false);
              this.$parent.getList();
              this.form = {
                name: "",
                dateType: [],
                strategyList: [
                  {
                    brightnessCap1: 50,
                    startDate: "",
                  },
                ],
              };
              // this.getList();
            });
          }
        }
      });
    },
    handBindDetail(ids,names) {
      this.names = names;
      console.log("names");
      console.log(this.names);
      this.ids = ids;
      this.bindDeviceDialog = false;
    },
    dataTypeChange() {
      let typeList = [];
      let str = this.form.dateType;
      let arr = str.split("");
      arr.forEach((item) => {
        switch (item) {
          case "1":
            typeList.push("周一");
            break;
          case "2":
            typeList.push("周二");
            break;
          case "3":
            typeList.push("周三");
            break;
          case "4":
            typeList.push("周四");
            break;
          case "5":
            typeList.push("周五");
            break;
          case "6":
            typeList.push("周六");
            break;
          case "7":
            typeList.push("周日");
            break;

          default:
            break;
        }
      });
      this.form.dateType = typeList;
      console.log("gaigaiiaigigaigaigai");
      console.log(this.form.dateType );
    },
    strategyDelete(index) {
      this.form.strategyList.splice(index, 1);
    },
    //删除设备标签
    handleCloseTag(index){
      console.log(this.ids);
     this.names.splice(index,1)
     this.ids.splice(index,1)
     console.log("删除");
     
    },
    //控制策略是否启用
    changeEffect(){
      let text = '';
      let effectInterface = '';
      let status = '';
      if(this.isEffect==='1'){
        text='禁用'
        effectInterface = stopControl;
        status='2'
      }else{
        text='启用'
        effectInterface =startControl;
        status="1"
      }
      this.$confirm(`是否确认${text}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{

        effectInterface(this.form.id).then(res=>{
          this.isEffect = status
          this.$message({
              showClose: true,
              message: `${text}成功`,
              type: "success",
            });
        }).catch(()=>{
        this.$message({
              showClose: true,
              message: `${text}失败`,
              type: "warning",
            });
      })
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.dialogbox {
  position: absolute;
  top:12.5vh;
  left: 10vw;
  height: 1vh;
}

.el-dialog__body {
  background-color: transparent;
}

.dialog ::v-deep .dialog-box[data-v-0bbe9357] {
  height: 70vh !important;
}
.task-check {
  display: flex;
  .el-tag--medium {
    margin-left: 0.5vw;
  }
}
.task-box {
  color: #009dd1;
  height: 26vh;
  overflow-y: auto;
  .delete-icon {
    margin-left: 1vw;
    cursor: pointer;
    font-size: 2.6vh;
  }
  .item {
    padding: 0.5vh;
    // height: 10vh;
    background-color: hsla(207, 95%, 31%, 0.388);
    border-radius: 2px;
    .top {
      display: flex;
      // margin-bottom: 2vh;
      // justify-content: space-between;
      .item-right {
        margin: 0 3vw;
        align-items: center;
        display: flex;
        .item-right-title {
          margin-right: 0.5vw;
        }
      }
      .el-progress {
        width: 10vw;
        margin: 0 0.5vw;
      }
    }
    .bottom {
      display: flex;
      justify-content: center;
    }
  }
}
.dialogbox ::v-deep .el-input__inner {
  margin-left: 0vw !important;
}

.dialog ::v-deep .el-dialog {
  margin-top: 4vh !important;
}
.dialog ::v-deep .el-dialog__headerbtn {
  // top: 17% ;
  // left: 106% ;
  font-size: 3vh;
}
.formConfirm {
  margin-top: 3vh;
}
.dialogbox ::v-deep .el-form-item__label {
  white-space: nowrap;
}
.dialogbox .input1{
  width: 34vw;
}
.dialog ::v-deep .dialog-box[data-v-0bbe9357] {
  position: static;
}
.dialog ::v-deep .el-input.is-disabled .el-input__inner {
  background-color: #0b0c2273 !important;
  border-color: #175890 !important;
}
.formConfirm ::v-deep .el-form-item__content {
  width: 5vw !important;

  margin: auto !important;
}
.dialogbox ::v-deep .el-switch.is-disabled .el-switch__core, .el-switch.is-disabled .el-switch__label {
    cursor: pointer  !important;
}
::v-deep .dialog-box{
  width: 54vw !important;
  left: 13%;
  .el-form{
    position: relative;
    left: -8%;
  }
}
.bindDeviceBtn{
   background: no-repeat url('../../../assets/images/button/lianjietest.png');
  background-size: 100% 100%;
}
::v-deep .el-checkbox{
  color: white;
}
</style>
