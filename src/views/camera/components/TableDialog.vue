<template>
  <Dialog :title="tableDialogTitle" :DialogVisibleFlag.sync="tableDialogVisibleFlag" :isShowClose="false">
    <template>
      <div class="table-list dialog-table-box" style="width: 80%">
        <el-form ref="form" :model="form" label-width="auto">
          <el-row>
            <el-col class="dialog-table-title" :span="24">
              <div class="arrow">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div>灯杆信息</div>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="所属区域">
                <el-input readonly v-model="form.deptName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属分组">
                <el-input readonly v-model="form.groupName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="所在位置">
                <el-input readonly v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属灯杆">
                <el-input readonly v-model="form.polename"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="dialog-table-title">
              <div class="arrow">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div  > {{ rightShowView === 'status' ? '组件信息' : '故障信息' }}</div>
            </el-col>
          </el-row>
          <template v-if="rightShowView==='status'">
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="公网IP">
                  <el-input readonly v-model="form.ip"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备状态">
                  <el-input readonly v-model="form.status"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="用户名">
                  <el-input readonly v-model="form.username"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="协议">
                  <el-input readonly v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="密码">
                  <el-input readonly v-model="form.password"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="协议端口号">
                  <el-input readonly v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="创建人">
                  <el-input readonly v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="通道号">
                  <el-input readonly v-model="form.channel"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="创建时间">
                  <el-input readonly v-model="form.createTime"></el-input>
                </el-form-item>
              </el-col>
              <el-col v-if="form.status===3" :span="12">
                <el-form-item label="故障描述">
                  <el-input readonly type="textarea" v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>
          <template v-else>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="故障状态">
                  <el-input readonly v-model="form.createTime"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处理阶段">
                  <el-input readonly v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="上报时间">
                  <el-input readonly v-model="form.createTime"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处理人">
                  <el-input readonly v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="24">
                <el-form-item label="故障描述">
                  <el-input readonly v-model="form.createTime"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </template>

          <el-row v-if="rightShowView==='warning'">
            <el-steps :active="4" align-center>
              <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
              <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
              <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
              <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
            </el-steps>
          </el-row>
        </el-form>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/views/components/Dialog";

export default {
  name: "TableDialog",
  comments: {
    Dialog
  },
  data() {
    return {
      tableDialogVisibleFlag: false,
      tableDialogTitle: '摄像头状态',
      rightShowView: '',
      form: {}
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-form-item__label{
  color: white;
}
::v-deep .el-input__inner{
  border: none;
}
::v-deep .el-col-12{
  position: relative;
  left: 15%;
  padding: 0 10px !important;
}
</style>
