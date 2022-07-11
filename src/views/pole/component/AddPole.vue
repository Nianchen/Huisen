<template>
  <div>
    <Dialog :position="position" :title="title" @handleDialogClose="cancel" :DialogVisibleFlag.sync="thisDialogVisibleFlag">
      <div class="dialogbox">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row :gutter="3">
            <el-col :span="8">
              <el-form-item label="选择道路" prop="deptId" width="80%">
                <treeselect popperClass="ic-pagination"  v-model="form.deptId" :options="deptOptions" :show-count="true" placeholder="请选择归属部门" @select="queryDeptSet" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="灯杆名称" prop="name" width="50">
                <el-input v-model="form.name" placeholder="请输入灯杆名称" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="灯杆桩号" prop="no">
                <el-input v-model="form.no" placeholder="请输入灯杆桩号" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="安装位置" prop="address">
                <el-input v-model="form.address" placeholder="请输入安装位置" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="位置坐标" prop="latlng">
                <el-input v-model="form.latlng" placeholder="请标记坐标" readonly style="display:none" />
                <my-map ref="map" adapter="Amap" :center="center">
                  <my-map-draw ref="point" type="Point" :brush="pointBrush" :effect="pointEffect" @drawstart="drawPointStart"
                    @drawend="drawPointEnd" />
                  <my-map-image :coordinate="center" :src="centerImg" v-if="center" />
                </my-map>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item class="dialog-footer">
                <!-- <el-button type="primary" @click="submitPoleForm('form')">确 定</el-button>
                <el-button type="primary" @click="cancel">取 消</el-button> -->
                <img @click="cancel" src="../../../assets/images/button/Dia-confirm.png" alt="">
                <span @click="cancel">取消</span>
                <img @click="submitPoleForm('form')" src="../../../assets/images/button/Dia-confirm.png" alt="">
                <span @click="submitPoleForm('form')" >确定</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      </div>
    </Dialog>
  </div>
</template>
<script>
import Dialog from "@/views/light/component/Dialog";
import { MyMap, MyMapDraw, MyMapImage } from "$ui/map";
import { addPole, updatePole } from "@/api/base/pole";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "AddPole",
  props: {
    title: {
      required: true,
    },
    DialogVisibleFlag: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  components: { Dialog, Treeselect, MyMap, MyMapDraw, MyMapImage },
  data() {
    return {
      form: {},
      queryParams: {},
      rules: {},
      thisDialogVisibleFlag:false,
      deptOptions: undefined,
      position: {
        percentWidth: "44%",
        vWidth: "50vw",
        vHight: "40vh",
        topTitle: "9%",
        leftTitle: "17%",
      },
      center: [112.83464527966484, 32.651482978328715],
      pointBrush: {
        circle: {
          radius: 8,
          fill: "red",
        },
      },
      pointEffect: {},
      centerImg: require("@/assets/images/marker/location_red.png"),

      rules: {
        deptId: [
          { required: true, message: "请选择所属区域", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入灯杆名称", trigger: "blur" }],
        no: [{ required: true, message: "请输入灯杆桩号", trigger: "blur" }],
        address: [
          { required: true, message: "请输入安装位置", trigger: "blur" },
        ],
        latlng: [{ required: true, message: "请标记坐标", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getTreeselect();
    this.getDicts("component_type").then((response) => {
      this.typeOptions = response.data;
    });
  },
  watch:{
     DialogVisibleFlag() {
      this.thisDialogVisibleFlag = this.DialogVisibleFlag;
    },
  },
  methods: {
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then((response) => {
        this.deptOptions = response.data;
      });
    },
    //灯杆新增和修改按钮
    submitPoleForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updatePole(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.$parent.getList();
              this.$refs.form.resetFields();
              // this.cancel();
               this.thisDialogVisibleFlag =false
            });
          } else {
               console.log(this.form);
            addPole(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.$parent.getList();
              this.$refs.form.resetFields();
              // this.cancel();
               this.thisDialogVisibleFlag =false
            });
          }
        }
      });
    },
    handleDialogClose() {
      console.log(6 + 52656565656565);
      this.$parent.getList();
      this.$emit("update:DialogVisibleFlag", false);
    },
    cancel() {
      // 重置表单
      this.$refs.form.resetFields();
      this.$emit("cancelAddPole", false);
    },
    drawPointStart(e) {
      this.$refs.point.clear();
    },
    drawPointEnd(e) {
      const features = e.feature;
      const pointLocation = features.values_.geometry.flatCoordinates;
      this.center = pointLocation;
      this.form.latlng = pointLocation;
      this.form.lat = pointLocation[0];
      this.form.lng = pointLocation[1];
    },
    queryDeptSet(node, instanceId) {
      this.form.deptName = node.label;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/poleIndex.scss";
::v-deep .vue-treeselect div{
  background-color: rgb(5,41,74);
  border: none;
}
::v-deep .vue-treeselect span{
  color: #fff;
}
::v-deep .vue-treeselect__menu{
  color: #fff !important;
}
::v-deep .vue-treeselect__single-value{
  color: #fff;
}
.dialogbox {
  position: absolute;
  top: 18vh;
  left: 5vw;
  width: 105%;
  height: 51vh;
  //  overflow-y: auto;
}

.el-dialog__body {
  background-color: transparent;
}

.dialog ::v-deep .dialog-box {
  height: 75vh !important;
  // overflow-y: auto;
}

.dialog-box .dialog-title {
  top: calc(11vh - 0.4%) !important;
}

.dialog-box .dialog-title {
  padding-left: 2vh;
  position: absolute;
}

.dialogbox ::v-deep .el-input__inner {
  margin-left: 0vw !important;
}

.dialog ::v-deep .el-dialog {
  margin-top: 4vh !important;
}

.dialog ::v-deep .el-dialog__headerbtn {
  top: 13% !important;
  left: 112% !important;
  font-size: 3vh;
}
::v-deep .el-dialog__close{
  color: #fff;
}


.dialogbox ::v-deep .el-form-item__label {
  white-space: nowrap;
}

.dialog ::v-deep .dialog-box {
  position: static;
}

.el-dialog__header {
  display: none !important;
}

.group ::v-deep .el-dialog__body {
  height: 90%;
  // width:50%
  width: 100% !important;
}

.el-form {
  //margin: 2% 3%;
  // width: 29vw;
  position: relative;
  top: 0vh;
  left: -2vw;
  width: 44vw;
  height: 59vh;
}

.group ::v-deep .el-dialog__headerbtn {
  top: 18%;
  right: -5%;
  font-size: 2.5em;
  color: white;
  z-index: 1000000;
}

.group-body {
  margin-top: -22px !important;
}

// .el-dialog__wrapper ::v-deep .el-dialog.is-fullscreen {
//   background: rgba(5,14,31,0.18);
// }

.dialog-box ::v-deep .dialog-title {
  font-size: 2em !important;
}

.dialog-footer{
  position: absolute;
  top: 56vh;
  left: 23vw;
  img{
    width: 40%;
    cursor: pointer;
  }
  span{
    position: absolute;
    color: #fff;
    font-size: 1.4em;
    top: 0.4vh;
    left: 1.3vw;
     cursor: pointer;
  }
  span:last-child{
      position: absolute;
    color: #fff;
    font-size: 1.4em;
    top: 0.4vh;
    left: 6.1vw;
     cursor: pointer;
  }
  span:hover{
    color: #018397;
  }
}
::v-deep .vue-treeselect{
  border: 1px solid rgb(1,67,145);
  border-radius: 5%;
}
</style>
