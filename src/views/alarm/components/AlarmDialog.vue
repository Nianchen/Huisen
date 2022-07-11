<template>
  <div class="alarm-dialog">
    <Dialog :title="tableDialogTitle" @handleDialogClose="handleDialogClose" :closeOnClickModal="false"
            :isShowClose="false"
            :DialogVisibleFlag.sync="thisDialogVisibleFlag">
      <template v-if="dialogView!==''">
        <div class="table-list dialog-table-box" style="width: 80%">
          <el-form ref="form" :model="form" label-width="auto">
            <el-row>
              <el-col class="dialog-table-title" :span="24">
                <div class="new_head">
                  <div class="arrow1 left-arrow">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div class="title">灯杆信息</div>
                  <div class="arrow1 right-arrow">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="所属区域:">
                  <el-input readonly v-model="form.dept.deptName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属分组:">
                  <el-input readonly v-model="form.group.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="12">
                <el-form-item label="所在位置:">
                  <el-input readonly v-model="form.pole.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属灯杆:">
                  <el-input readonly v-model="form.pole.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="dialog-table-title">
<!--                <div class="arrow">-->
<!--                  <span></span>-->
<!--                  <span></span>-->
<!--                  <span></span>-->
<!--                </div>-->
<!--                <div> {{ dialogView === 'statusTable' ? '组件信息' : '故障信息' }}</div>-->
                <div class="new_head1">
                  <div class="arrow1 left-arrow">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div class="title">{{ dialogView === 'statusTable' ? '组件信息' : '故障信息' }}</div>
                  <div class="arrow1 right-arrow">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <template v-if="dialogView==='statusTable'||'areaMap'">
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="公网IP:">
                    <el-input readonly v-model="form.ip"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="设备状态:">
                    <el-input readonly value="在线" v-if="form.status==='1'"></el-input>
                    <el-input readonly value="离线" v-if="form.status==='0'"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="用户名:">
                    <el-input readonly v-model="form.username"></el-input>
                  </el-form-item>
                </el-col>
                 <el-col :span="12">
                  <el-form-item label="创建时间:">
                    <el-input readonly v-model="form.createTime"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="密码:">
                    <el-input readonly v-model="form.password"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="协议端口号:">
                    <el-input readonly v-model="form.port"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="创建人:">
                    <el-input readonly v-model="form.createBy"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="通道号:">
                    <el-input readonly v-model="form.channel"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30">

                <el-col v-if="form.status===3" :span="12">
                  <el-form-item label="故障描述:">
                    <el-input readonly type="textarea" v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <template v-else>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="故障状态:">
                    <el-input readonly v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="处理阶段:">
                    <el-input readonly v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="上报时间:">
                    <el-input readonly v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="处理人:">
                    <el-input readonly v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30">
                <el-col :span="24">
                  <el-form-item label="故障描述:">
                    <el-input readonly v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>

            <el-row v-if="dialogView==='warning'">
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
      {{ showData }}
    </Dialog>
  </div>
</template>

<script>
import Dialog from "@/views/components/Dialog";

export default {
  name: "AlarmDialog",
  components: {Dialog},
  props: {},
  data() {
    return {
      thisDialogVisibleFlag: false,
      position: {
        percentWidth: "44%",
        vWidth: "50vw",
        topTitle: "3%",
        leftTitle: "12%",
      },
      showData: null,
      dialogView: '',
      form: {
        address: '',
        componentId: 0,
        dept: null,
        deptId: 0,
        group: null,
        groupId: 0,
        id: 0,
        ip: '',
        name: '',
        params: null,
        pole: null,
        port: 0,
        status: '0',
        username: '',
        password: '',
        uuid: '',
        channel: 1,
        createTime: '',
        eventTime: '',
        tel: '',
        title: '',
        content: '',
        contacts: '',
      }
    }
  },
  watch: {
    DialogVisibleFlag() {
      console.log(this.DialogVisibleFlag)
      this.thisDialogVisibleFlag = this.DialogVisibleFlag
      console.log(this.thisDialogVisibleFlag)
    }
  },
  computed: {
    tableDialogTitle() {
      let title = ''
      switch (this.dialogView) {
        case "eventList":
          title = '事件详情'
          break
        case "areaMap":
          title = '设备详情'
          break
        case "statusTable":
          title = '设备状态'
          break
        case "warningTable":
          title = '故障详情'
          break
      }
      return title
    }
  },
  beforeDestroy() {
    this.$bus.$off('alarmDialogFlag')
    this.DialogVisibleFlag = false
  },
  mounted() {
    this.handleDialogShow()
  },
  methods: {
    handleDialogShow() {
      console.log('www')
      this.$bus.$on('alarmDialogFlag', res => {
        // this.$message.success(res.dialogView)
        this.dialogView = res.dialogView
        this.thisDialogVisibleFlag = true
        this.form = res.data
        // console.log(this.form)
      })
    },
    handleDialogClose() {

    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  font-size: 20px !important;
  font-weight: bold;
  color: white !important;
}::v-deep .table-list{
   position: relative;
   left: -3%;
 }

::v-deep .dialog-box{
  width: 63vw !important;
}
.alarm-dialog {
  //position: absolute;
  //top: 20vh;
  //left: 10vw;
  //transform: translate(-50%,-50%);
  //z-index: 1000;
  font-size: 14px;
}
.new_head{
  //margin-top: 2%;
  position: relative;
  left: -2%;
  width: 100%;
  display: flex;
  //justify-content: center;
  //align-items: center;
  font-size: 1.3rem;
  margin-bottom: 2%;
  .arrow1{
    display: flex;
    justify-content: center;
    align-items: center;
    div{
      display: block;
      margin-right: 6px !important;
      margin-top: 4px;
      background-color: #0e66ae;
      width: 20px;
      height: 7px;
    }
  }
  .left-arrow{
    flex: 2;
    transform: skew(45deg);
    margin-left: 64px;
    :nth-child(1){
      opacity: 0.3;
    }
    :nth-child(2){
      opacity: 0.5;
    }
  }
  .right-arrow{
    flex: 2;
    transform: skew(-45deg);
    :nth-child(2){
      opacity: 0.5;
    }
    :nth-child(3){
      opacity: 0.3;
    }
  }
}
.new_head1{
  margin-top: 2%;
  position: relative;
  left: -2%;
  width: 100%;
  display: flex;
  //justify-content: center;
  //align-items: center;
  font-size: 1.3rem;
  margin-bottom: 2%;
  .arrow1{
    display: flex;
    justify-content: center;
    align-items: center;
    div{
      display: block;
      margin-right: 6px !important;
      margin-top: 4px;
      background-color: #0e66ae;
      width: 20px;
      height: 7px;
    }
  }
  .left-arrow{
    flex: 2;
    transform: skew(45deg);
    margin-left: 64px;
    :nth-child(1){
      opacity: 0.3;
    }
    :nth-child(2){
      opacity: 0.5;
    }
  }
  .right-arrow{
    flex: 2;
    transform: skew(-45deg);
    :nth-child(2){
      opacity: 0.5;
    }
    :nth-child(3){
      opacity: 0.3;
    }
  }
}
::v-deep .el-form-item{
  display: flex;
}
::v-deep .el-form-item__label{
  color: white !important;
  font-weight: normal;
  font-size: 18px;
}
::v-deep .el-input__inner{
  border: none;
  font-size: 18px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  position: relative;
  left: -40%;
}
::v-deep .el-col-12{
  position: relative;
  top:3%;
  left: 15%;
}
</style>
