<template>
  <div class="group">
    <GoHome title="视频监控" class="group-header"></GoHome>
    <TreeList title="设备分组" :isLoading="isTreeLoading" :rightShowView="rightShowView">
    </TreeList>
    <div class="group-header-line">
      <img :src="HeaderLineImg" alt="">
    </div>
    <div class="group-right">
      <div class="group-right-button">
        <button :class="rightShowView==='group'? 'button-active':''" v-on:click="handleChangeView('group')">
          <span>实时监控</span></button>
        <button :class="rightShowView==='area'? 'button-active':''" v-on:click="handleChangeView('area')">
          <span>地图分布</span></button>
        <button :class="rightShowView==='status'? 'button-active':''" v-on:click="handleChangeView('status')">
          <span>设备状态</span></button>
        <button :class="rightShowView==='warning'? 'button-active':''" v-on:click="handleChangeView('warning')">
          <span>故障报警</span>
        </button>
      </div>
      <!--实时监控-->
      <section v-if="rightShowView==='group'">
        <RealTimeMonitoring class="group-real" :video-obj.sync="videoObj" :video-arr.sync="videoArr"
          @changeDialogVisibleFlag="changeDialogVisibleFlag"></RealTimeMonitoring>
      </section>
      <!--地图分布-->
      <section v-if="rightShowView==='area'">
        <area-map class="group-map" @changeDialogVisibleFlag="changeDialogVisibleFlag"></area-map>
      </section>
      <!--设备状态-->
      <section v-if="rightShowView==='status'">
        <StatusList :tableData="statusTableData" @changeDialogVisibleFlag="changeDialogVisibleFlag" class="group-status-list"></StatusList>
      </section>
      <!--故障报警-->
      <section v-if="rightShowView==='warning'">
        <WarningList :tableData="warningTableData" @changeDialogVisibleFlag="changeDialogVisibleFlag" class="group-warning-list"></WarningList>
       <div class="borderPagination">
       <pagination class="ywpagination" popperClass="ic-pagination" v-show="total>0" :total="total" :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize" @pagination="getListFault" />
      </div>
      </section>
<!--            <img :src="groupRightBgImg" alt="group右侧的背景图片">-->

<!--      <div class="line2">-->
<!--        <img :src="groupLineImg2" alt="">-->
<!--      </div>-->
      <div v-if="rightShowView==='status'||rightShowView==='warning'" class="table-list group-list-pagination-box">
      </div>
    </div>
    <!--    视频监控的详细信息弹窗-->
    <Dialog title="视频监控" :closeOnClickModal="false" :isShowClose="false"
            :DialogVisibleFlag.sync="cameraDialogVisibleFlag" :beforeClose="handleDialogClose">
      <div class="dialog-box">
        <div class="dialog-left">
          <div id="dialogVideoBox" class="dialog-video-box">
            <WebRTCPlayer_v2 v-if="cameraDialogVisibleFlag" :video-id="'dialogVideo'+Math.random()" :dhRTSPServer="dhRTSPServer"
                             :video-obj="dialogVideoObj" ref="dialogVideoRef"></WebRTCPlayer_v2>
            <web-rtc-player class="dialog-webrtcplayer" v-if="isVideoPlayback&&cameraDialogVisibleFlag"
                            :video-id="'dialogVideoBack'+Math.random()"
                            :video-obj="dialogVideoBackObj"></web-rtc-player>
          </div>
          <div class="dialog-operating-box">
            <div class="title">
              <span>云<br />台<br />控<br />制</span>
              <img :src="DialogLine" alt="">
            </div>
            <div class="operator-direction">
              <div class="box">
                <el-button @mousedown.native="handleOperate('moveUp')" @mouseup.native="handleStopOperate('moveStop')">
                  <span></span>
                </el-button>
                <el-button @mousedown.native="handleOperate('moveRight')" @mouseup.native="handleStopOperate('moveStop')"><span></span></el-button>
                <el-button @mousedown.native="handleOperate('moveLeft')" @mouseup.native="handleStopOperate('moveStop')"><span></span></el-button>
                <el-button @mousedown.native="handleOperate('moveDown')" @mouseup.native="handleStopOperate('moveStop')"><span></span></el-button>
              </div>
            </div>

            <div class="operator-other">
              <div class="block">
                <span class="demonstration">步长</span>
                <el-slider :min="1" :max="8" :step="1" v-model="operateData.Iparam2"></el-slider>
              </div>
              <div class="operator-zoom-focus">
                <div>
                  <el-button class="addbtn" circle v-on:click="handleOperate('addZoom')"><img :src="addZoomImg" alt=""></el-button>
                  <el-button class="subbtn" circle v-on:click="handleOperate('decZoom')"><img :src="decZoomImg" alt=""></el-button>
                </div>
<!--                <div>-->
<!--                  <el-button circle v-on:click="handleOperate('addFocus')"><img :src="addFocusImg" alt=""></el-button>-->
<!--                  <el-button circle v-on:click="handleOperate('decFocus')"><img :src="decFocusImg" alt=""></el-button>-->
<!--                </div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-right">
          <div class="dialog-right-btn">
            <div class="btn btn1 " :class="dialogShowView==='info'? 'btn-active':''" v-on:click="handleVideoDialogViewChange('info')">
              <span>设备信息</span>
            </div>
            <div class="btn btn2" :class="dialogShowView==='list'? 'btn-active':''" @click="handleVideoDialogViewChange('list')"><span>监控回放</span>
            </div>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="dialog-right-body">
<!--            <span class="line1"></span>-->
            <span class="line2"></span>
            <section class="dialog-right-info" v-if="dialogShowView==='info'">
              <!--              设备信息{{ dialogVideoObj }}-->
              <div class="new_head">
                <div class="arrow1 left-arrow">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div class="title">设备信息</div>
                <div class="arrow1 right-arrow">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div>
                <span style="margin-right: 4%">用户名:</span>
                <span>{{ dialogVideoObj.username }}</span>
              </div>
              <div>
                <span style="margin-right: 4%">设备:</span>
                <span>{{ dialogVideoObj.name }}</span>
              </div>
              <div>
                <span style="margin-right: 4%">IP:</span>
                <span>{{ dialogVideoObj.ip }}</span>
              </div>
              <div>
                <span style="margin-right: 4%">通道号:</span>
                <span>{{ dialogVideoObj.channel }}</span>
              </div>
              <div>
                <span style="margin-right: 4%">端口号:</span>
                <span>{{ dialogVideoObj.port }}</span>
              </div>
            </section>

            <section class="dialog-right-list table-list" v-else v-loading="isDialogLoading" element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.3)">

              <div class="dialog-el-date-picker">
                <div class="border-input">
                <el-date-picker align="right" popper-class="dialog-date-picker" v-model="dialogVideoTime" type="date" :clearable="false"
                  :editable="false" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy_MM_dd" :picker-options="pickerOptions"
                  @change="handleDialogDatePickerChange">
                </el-date-picker>
                </div>
              </div>
              <!--           <div v-for="item in dialogVideoRecordList">{{ item.startTime }}-{{ item.endTime }}</div>-->
              <div class="dialog-right-list-box">
                <!--                <div class="dialog-right-list-item" v-for="item in 20"><input type="radio"> 2021年4月12日 12:12:00-2021年4月12日-->
                <!--                  13:12:00</div>-->
                <el-radio class="dialog-right-list-item" v-model="DialogVideoRecordRadio" v-for="(item,index) in dialogVideoRecordList" :label="item"
                  :key="index" @change="DialogVideoRecordRadioChange">
                  {{ item.startTimeValue }}-{{ item.endTimeValue }}
                </el-radio>
                <div class="kong" v-if="isShow">回放列表数据为空</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Dialog>
    <!--    设备状态，故障报警的的详细信息弹窗-->
    <Dialog :title="tableDialogTitle" :DialogVisibleFlag.sync="tableDialogVisibleFlag" :isShowClose="false" class="shexiang">
      <template>
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
                  <div class="title" style="color:#fff;font-size:1.1em">灯杆信息</div>
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
                <div class="new_head1">
                  <div class="arrow1 left-arrow">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div class="title" style="color:#fff;font-size:1.1em">{{ dialogView === 'statusTable' ? '组件信息' : '故障信息' }}</div>
                  <div class="arrow1 right-arrow">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <template v-if="rightShowView==='status'">
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="公网IP:">
                    <el-input readonly v-model="form.ip"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="设备状态:">
                    <el-input readonly v-model="form.status"></el-input>
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
                  <el-form-item label="协议:">
                    <el-input readonly v-model="form.name"></el-input>
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
                    <el-input readonly v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="创建人:">
                    <el-input readonly v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="通道号:">
                    <el-input readonly v-model="form.channel"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="30">
                <el-col :span="12">
                  <el-form-item label="创建时间:">
                    <el-input readonly v-model="form.createTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col v-if="form.status===3" :span="12">
                  <el-form-item label="故障描述:">
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
<!--     分组移入移出的弹窗 -->
<!--    <GroupOperation class="groupOperation" :DialogVisibleFlag.sync="GroupDialog" :componentType="GroupType"></GroupOperation>-->
<!--    <el-button class="groupManager_btn" type="primary" @click="handleGroupDialog" v-if="rightShowView==='status'">-->
<!--      <img src="../../../assets/images/button/register-pole.png" alt="" />-->
<!--      <span>分组管理</span>-->
<!--    </el-button>-->
<!--    <div class="groupManager_btn otherBtn" @click="handleGroupDialog" v-if="rightShowView==='status'">-->
<!--      <img src="../../../assets/images/button/register-pole.png" alt="" />-->
<!--            <span>分组管理</span>-->
<!--    </div>-->

    <Dialog title="故障详情" :DialogVisibleFlag.sync="dialogFormVisible" :isShowClose="false">
      <div class="table_expand">
        <div class="table_expand_text">
          <el-form label-position="left" :inline="true" class="demo-table-expand" :model="form1">
            <el-row>
              <el-col :span="10">
                <el-form-item label="区域：">
                  <span>{{ form1.dept.deptName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="地点：">
                  <span>{{ form1.pole.address }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="设备名称：">
                  <span>{{ form1.componentName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="14">
                <el-form-item label="上报时间：">
                  <span>{{ form1.reportTime }}</span>
                </el-form-item>
              </el-col>

            </el-row>
            <br>
          </el-form>
        </div>
        <img src="../../../assets/images/form_line.png">
        <div class="timelinemodle">
          <el-steps :space="430" :active="2">
            <el-step process-status="wait"></el-step>
            <el-step process-status="success"></el-step>
          </el-steps>
          <br>
          <div class="box1">
            <el-card  v-for="task in form1.taskList" :key="task.id" shadow="never">
              <h3>{{task.jdName}}</h3>
              <p>备注：{{ task.content }}</p>
              <p1>提交: {{ task.endDate }}</p1>
            </el-card>
          </div>
          <div class="box2">
            <el-card shadow="never">
              <h3 style="color:rgb( 4,184,51)">处理完成</h3>
              <p>故障描述：</p>
              <p1>提交：</p1>
            </el-card>
          </div>
          <div class="line1"></div>
          <div class="line2"></div>
        </div>

      </div>
    </Dialog>
    <el-dialog
      :title="title"
      custom-class="Dialogshebei"
      :visible.sync="GroupDialog"
      width="30%">
      <treeselect popperClass="ic-pagination"  v-model="treemodel" :options="treeData" :show-count="true" placeholder="请选择分组" @select="queryDeptSet" />
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleConfirm">取 消</el-button>
    <el-button type="primary" @click="closeDialog">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import groupRightBgImg from "@/assets/images/camera/bg_3.png";
import addFocusImg from "@/assets/images/camera/addFocus.png";
import decFocusImg from "@/assets/images/camera/decFocus.png";
import addZoomImg from "@/assets/images/camera/addZoom.png";
import decZoomImg from "@/assets/images/camera/decZoom.png";
import groupLineImg1 from "@/assets/images/camera/line_1.png";
import groupLineImg2 from "@/assets/images/camera/line_2.png";
import groupVideoBg from "@/assets/images/camera/camera_icon_1.png";
import VideoPlayer from "@/views/camera/components/VideoPlayer";
import DialogLine from "@/assets/images/camera/video_dialog_line.png";
import HeaderLineImg from "@/assets/images/header_line.png";
import TreeList from "@/views/camera/components/TreeList";
import GoHome from "@/views/components/GoHome";
import Dialog from "@/views/components/Dialog";
import { videoUrl, videoRecord, stopVideo } from "@/api/camera/videoplayer";
import Map from "@/views/components/Map";
import Socket from "@/utils/socket";
import RealTimeMonitoring from "@/views/camera/components/RealTimeMonitoring";
import StatusList from "@/views/camera/components/StatusList";
import WarningList from "@/views/camera/components/WarningList";
import AreaMap from "@/views/camera/components/AreaMap";
import WebRtcPlayer from "@/views/camera/components/WebRtcPlayer";
import WebRTCPlayer_v2 from "@/views/camera/components/WebRTCPlayer_v2";
import GroupOperation from "@/views/components/GroupManager";
import { GbPlayer } from "@/utils/GbPlayer";
import { listEvent } from "@/api/yw/event";
import ywList1 from "@/views/components/ywList1";
import {updateComponent} from "@/api/camera/component"
export default {
  name: "Group",
  components: {
    Treeselect,
    ywList1,
    VideoPlayer,
    TreeList,
    GoHome,
    Dialog,
    Map,
    RealTimeMonitoring,
    StatusList,
    WarningList,
    AreaMap,
    WebRtcPlayer,
    WebRTCPlayer_v2,
    GroupOperation,
    updateComponent
  },
  data() {
    return {
      timer:null,
      ifLogin:false,
      title:'',
      treemodel:null,
      quertInfo:{
        groupId:'',
        id:''
      },
      treeData:[],
       queryParams: {
        id: "",
        componentType: 3,
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      isShow: false,
      dialogFormVisible: false,
      form1: {
        dept: {},
        pole: {},
      },
      dhRTSPServer:'',
      addFocusImg: addFocusImg,
      decFocusImg: decFocusImg,
      addZoomImg: addZoomImg,
      decZoomImg: decZoomImg,
      groupRightBgImg: groupRightBgImg,
      groupLineImg1: groupLineImg1,
      groupLineImg2: groupLineImg2,
      groupVideoBg: groupVideoBg,
      DialogLine: DialogLine,
      HeaderLineImg: HeaderLineImg,
      cameraDialogVisibleFlag: false,
      tableDialogVisibleFlag: false,
      GroupDialog: false,
      isShowGroupM: false,
      tableDialogTitle: "摄像头状态",
      listData: [],
      treeListType: true,
      treeListLeafData: {},
      isOneVideo: true,
      isVideoPlayback: false,
      groupVideoBgArr: new Array(4),
      videoArr: [],
      videoObj: {
        // id: '',
        url: "",
        isVideoLoad: false,
        // label: ''
      },
      dialogVideoObj: {},
      rightShowView: "group",
      operateData: {
        type:'else',
        operate: "",
        nChannelID: 0,
        Iparam2: 5,
      },
      isTreeLoading: false,
      refArr: [
        "oneOfFourVideoRef",
        "twoOfFourVideoRef",
        "threeOfFourVideoRef",
        "fourOfFourVideoRef",
      ],
      statusTableData: [],
      warningTableData: [],
      currentPage4: 1,
      dialogShowView: "info",
      form: {
        dept: {},
        pole: {},
        group: {},
      },
      dialogVideoRecordList: [],
      dialogVideoBackObj: {},
      getVideoRecordListData: {
        username: "admin",
        password: "admin123",
        ip: "192.168.3.108",
        channel: "1",
        subtype: "0",
        port: "554",
        starttime: "2021_04_02_19_18_00",
        endtime: "2021_04_02_19_19_00",
      },
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      dialogVideoTime: "",
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now();
        },
      },
      DialogVideoRecordRadio: {},
      // isVideoPlaybackShow: true,
      // DialogVideoRecordObj: {
      //   account: 'admin',
      //   password: 'admin123',
      //   ip: '192.168.3.108',
      //   channel: 1,
      //   subtype: 0,
      //   port: 554,
      //   starttime: '',
      //   endtime: '',
      // }
      DialogVideoRecordObj: {},
      ws: null,
      operateTimeoutTimer: null,
      isOperateAlways: false,
      isDialogLoading: false,
      GroupType: "3",
    };
  },
  beforeCreate() {},
  watch: {
    cameraDialogVisibleFlag: {
      handler(val) {
        if (!val) {
          this.$bus.$emit("emitToRealTimeDialogFlag", false);
          if (this.ws !== null) {
            this.ws.close();
          }
        }
      },
    },
  },
  destroyed() {
  },
  created(){
    this.getListFault()
  },
  mounted() {
    this.showDialog();
    this.handleGroupDialog()
    this.handeleTreeData()
  },
  methods: {
    queryDeptSet(e){
      this.quertInfo.groupId = e.id
    },
    handleConfirm(){
      this.GroupDialog = false
      this.treemodel = null
    },
    closeDialog(){
      this.GroupDialog = false
      this.treemodel = null
      updateComponent(this.quertInfo).then(res => {
        console.log(res)
        this.$bus.$emit('shaxinData',res)
        this.$message.success("修改成功")
      },
      err => {
        this.$message.error("修改失败")
      })
      console.log(this.quertInfo)
    },
    handeleTreeData(){
      this.$bus.$on('treeData',res => {
        this.treeData = res
        console.log(this.treeData)
      })
    },
    getListFault() {
    this.isLoading = true;
      listEvent(this.queryParams).then((response) => {
       console.log(response);
        this.warningTableData = response.rows.cameras;
        this.total = response.total;
        this.isLoading = false;
      });
    },
    showDialog(){
      this.$bus.$on('showdialog', res => {
        this.form1 = res
        console.log(this.form1)
        this.dialogFormVisible = true
      })
    },
    handleLoadNode() {},
    handleVideoDialogViewChange(flag) {
      if (flag === "list") {
        this.$nextTick(() => {
        })
        this.$refs.dialogVideoRef.pause()
        // this.isVideoPlaybackShow = false
      } else {
        this.$refs.dialogVideoRef.play()
        // this.isVideoPlaybackShow = true;
        this.isVideoPlayback = false;
      }
      console.log(this.dialogVideoObj)
      this.dialogShowView = flag;
    },

    // 分组管理按钮显示与隐藏
    handleGroupDialog() {
      this.$bus.$on('ShowGroup',res => {
        this.GroupDialog = true;
        this.title = res.name
        let {groupId , id} = res
        this.quertInfo.id = id
      })
    },
    /**
     * 子组件 RealTimeMonitoring的回调函数，是否是一画面
     */
    handleVideoIsOneVideo(flag) {
      this.isOneVideo = flag;
    },
    /**
     * 改变弹窗
     */
    changeDialogVisibleFlag(data) {
      console.log("执行了", data);
      let config = data.data.config.replace(/'/g, '"');
      let tmpconfig = JSON.parse(config);
      let wsUrl = null;
      tmpconfig.find((item)=> {
        if (item.Tname === "serverUrl") {
          wsUrl = item.Tvalue;
        }else if(item.Tname === 'dhRTSPServer'){
          this.dhRTSPServer = item.Tvalue
        }
      });
      console.log(wsUrl);
      console.log(this.dhRTSPServer)
      // this.rightShowView = data.dialogView
      this.cameraDialogVisibleFlag = false;
      this.dialogVideoObj = {}
      switch (data.dialogView) {
        case "cameraView":
          this.cameraDialogVisibleFlag = true;
          this.dialogVideoObj = data.data;
          console.log(this.dialogVideoObj)
          // this.dialogVideoObj.id = "dialog" + data.data.id;
          this.initWs(this.dialogVideoObj);
          break;
        case "statusTable":
          this.tableDialogTitle = "摄像头状态";
          this.isShowGroupM = true;
          this.tableDialogVisibleFlag = true;
          this.form = data.data;
          break;
        case "warningTable":
          this.tableDialogTitle = "故障详情";
          this.tableDialogVisibleFlag = true;
          this.form = data.data;
          break;
      }
    },
    handleDialogDatePickerChange() {
      this.isDialogLoading = true;
      // this.$message.success('日期改变')
      console.log(this.dialogVideoTime);
      this.dialogVideoObj.starttime = `${this.dialogVideoTime}_00_00_00`;
      this.dialogVideoObj.endtime = `${this.dialogVideoTime}_23_59_59`;
      //TODO
      console.log(this.dialogVideoObj)
      let config = (this.dialogVideoObj.config).replace(/'/g, '"')
      let tmpconfig = JSON.parse(config)
      console.log(tmpconfig)
      let queryInfo = {
        type:'record',
        recordIp: '',
        channel:'',
        recordport : '',
        recordUsername: '',
        recordPassword : '',
        starttime : this.dialogVideoObj.starttime,
        endtime : this.dialogVideoObj.endtime
      }
      console.log(queryInfo)
      tmpconfig.find( item => {
        if(item.Tname === 'vcrUsername'){
          queryInfo.recordUsername = item.Tvalue
        }else if(item.Tname === 'vcrIp'){
          queryInfo.recordIp = item.Tvalue
        }else if(item.Tname === 'vcrPassword'){
          queryInfo.recordPassword = item.Tvalue
        }else if(item.Tname === 'vcrPort'){
          queryInfo.recordport = item.Tvalue
        }else if(item.Tname === 'channel'){
          queryInfo.channel = item.Tvalue
        }
      })
      console.log(queryInfo)
      let that = this
      this.ws.send(JSON.stringify(queryInfo))
      this.ws.onmessage = function (event){
        const data = JSON.parse(event.data)
        console.log(data.recordList)
        if (data.recordList.length === 0){
          that.dialogVideoRecordList = []
          that.isDialogLoading = false;
          that.isShow = true
        }else {
          that.isShow = false
          that.dialogVideoRecordList = []
          data.recordList.forEach((item) => {
            let startTimeArr = item.startTime.split("_");
            let endTimeArr = item.endTime.split("_");
            that.dialogVideoRecordList.push({
              startTimeValue: `${startTimeArr[3]}:${startTimeArr[4]}:${startTimeArr[5]}`,
              endTimeValue: `${endTimeArr[3]}:${endTimeArr[4]}:${endTimeArr[5]}`,
              startTime: item.startTime,
              endTime: item.endTime,
            })
            that.isDialogLoading = false;
          });
        }
      }
      // videoRecordList(this.dialogVideoObj)
      //   .then((response) => {
      //     console.log(response);
      //     response.forEach((item) => {
      //       let startTimeArr = item.startTime.split("_");
      //       let endTimeArr = item.endTime.split("_");
      //       this.dialogVideoRecordList.push({
      //         startTimeValue: `${startTimeArr[3]}:${startTimeArr[4]}:${startTimeArr[5]}`,
      //         endTimeValue: `${endTimeArr[3]}:${endTimeArr[4]}:${endTimeArr[5]}`,
      //         startTime: item.startTime,
      //         endTime: item.endTime,
      //       })
      //       this.isDialogLoading = false;
      //     });
      //     console.log(response[0].startTime);
      //     console.log(response[response.length - 1].startTime);
      //     // this.dialogVideoRecordList = response
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     this.dialogVideoRecordList = [];
      //     this.$message.error("请求出错！");
      //     this.isDialogLoading = false;
      //   });
    },

    DialogVideoRecordRadioChange() {
      this.isVideoPlayback = false;
      let uuid = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
      const {account, password, ip, channel} = this.dialogVideoObj
      let config = (this.dialogVideoObj.config).replace(/'/g, '"')
      let tmpconfig = JSON.parse(config)
      console.log(tmpconfig)
      let playbackServe ,vcrUsername ,vcrPassword ,vcrIp,goServer = null
      tmpconfig.find(item => {
        if(item.Tname === 'vcrUsername'){
         vcrUsername = item.Tvalue
        }else if(item.Tname === 'vcrIp'){
         vcrIp = item.Tvalue
        }else if(item.Tname === 'vcrPassword'){
          vcrPassword = item.Tvalue
        }else if(item.Tname === 'goServer'){
          goServer = item.Tvalue
        }
      })
      console.log(goServer)
      playbackServe = 'rtsp://'+vcrUsername+':'+vcrPassword+'@'+vcrIp+':'+'554' + '/cam/playback'
      console.log(playbackServe)
      let rtspUrl =
        playbackServe+`?channel=${channel}&subtype=0&starttime=${this.DialogVideoRecordRadio.startTime}&endtime=${this.DialogVideoRecordRadio.endTime}`
      console.log(rtspUrl)
      GbPlayer.addChannel(uuid, 0, rtspUrl, goServer).then(res => {
        console.log(res)
        if (res.data.status === 1) {
          this.dialogVideoBackObj.uuid = uuid
          this.$nextTick(() => {
            this.isVideoPlayback = true;
          })
        }
      });
      // videoRecord(this.DialogVideoRecordObj).then((response) => {
      //   this.DialogVideoRecordObj.id =
      //     new Date().getTime() + this.DialogVideoRecordObj.id;
      //   this.DialogVideoRecordObj.url = response.msg;
      //   this.$nextTick(() => {
      //     this.isVideoPlaybackShow = false;
      //   });
      //   console.log(this.DialogVideoRecordObj);
      // });
      // this.$message.success('改变了')
    },

    /**
     * TreeList按钮切换的回调函数
     */
    // handleTreeListBtnChange(flag) {
    //   console.log('handleTreeListBtnChange', flag)
    //   if (flag) {
    //     if (this.listData.length === 0)
    //       this.getListCamera()
    //   }
    // },
    /**
     * 获取设备列表
     */
    // getListCamera() {
    //   this.isTreeLoading = true
    //   listCamera().then(response => {
    //     this.listData = response.data
    //     // response.data.result.forEach(item => {
    //     //   item.inputVisible = false
    //     // })
    //     console.log(response)
    //     // this.listData=response.data
    //     this.isTreeLoading = false
    //   })
    // },
    /**
     * 显示弹窗
     */
    // handleShowDialog(data) {
    //     this.$message.error("请先选择一个设备！");
    //   this.$nextTick(() => {
    //     this.DialogVisibleFlag = true;
    //     this.isVideoPlaybackShow = true
    //   })
    //   this.dialogVideoObj = {}
    //   if (data.isVideoLoad) {
    //     this.dialogVideoObj = {...data};
    //   } else {
    //   }
    // },
    /**
     * 弹窗关闭的回调函数
     */
    handleDialogClose() {
      this.cameraDialogVisibleFlag = false
      this.isVideoPlayback = false
      this.dialogVideoObj = {}
      console.log('弹窗关闭')
      this.isShow = false
      this.dialogVideoRecordList = []
      this.dialogShowView = 'info'
      this.dialogVideoTime = ''
      if (this.isOneVideo) {
        this.ws.close();
      }
    },
    /**
     * 云台控制的websocket连接的初始化函数
     */
    initWs(dialogVideoObj) {
      let config = (dialogVideoObj.config).replace(/'/g, '"')
      let tmpconfig = JSON.parse(config)
      let ServerUrl = null
      tmpconfig.find(item => {
        if (item.Tname === 'serverUrl') {
          ServerUrl = item.Tvalue
        }
      })
      console.log(ServerUrl)

      if (window.WebSocket) {
        this.ws = new WebSocket(ServerUrl)
        // if (this.ws.readyState === 3){
        //   this.$message.error('连接失败，重连中')
        //   this.ws = new WebSocket(ServerUrl)
        // }
        this.ws.onopen = this.handleWsOnOpen;         //连接建立时触发
        this.ws.onmessage = this.handleWsOnmessage;   //接收到客户端数据时触发
        this.ws.onclose = this.handleWsOnClose;       //连接关闭时触发
      } else {
        this.$message.error("你的浏览器不支持WebSocket，请更换其他浏览器！");
      }
    },
    handleWsOnOpen() {
      const { username, password, channel, ip } = this.dialogVideoObj;
      let opoperateLogin = this.operateData;
      opoperateLogin.info = {
        type:'conn',
        Username: username,
        password,
        channel,
        ip,
        port: 37777,
      };
      console.log(opoperateLogin)
      this.ws.send(JSON.stringify(opoperateLogin.info));
    },
    handleWsOnmessage(res) {
      console.log("handleWsOnmessage", res.data);
      // let config = (res.data).replace(/'/g, '"')
      // let tmpconfig = JSON.parse(config)
      // console.log(tmpconfig.info)
      // if(tmpconfig.info === "运转成功"){
      //   clearTimeout(this.timer)
      //   this.timer = null
      // }
    },
    handleWsOnClose() {
      this.initWs(this.dialogVideoObj);
    },
    /**
     * 云台控制的websocket发送消息的函数
     */
    handleSend(data) {
      if (data.info) {
        delete data.info;
      }
      console.log(data)
      this.ws.send(JSON.stringify(data));
    },
    handleStopOperate(operate) {
      if (this.isOperateAlways) {
        this.isOperateAlways = false;
        this.operateData.operate = `${operate}`;
        this.handleSend(this.operateData);
      } else if (!this.isOperateAlways) {
        clearTimeout(this.operateTimeoutTimer);
      }
    },
    /**
     * 云台控制的方向函数
     */
    handleOperate(operate) {
      if (!operate.includes("move")) {
        this.operateData.operate = `${operate}`;
        this.handleSend(this.operateData);
        return;
      }
      this.operateTimeoutTimer = setTimeout(() => {
        this.operateData.operate = operate.replace("move", "always");
        this.isOperateAlways = true;
        this.handleSend(this.operateData);
      }, 1000);
      this.operateData.operate = `${operate}`;
      this.handleSend(this.operateData);
    },

    /**
     * 右侧界面的修改函数
     */
    handleChangeView(viewName) {
      this.rightShowView = viewName;
      // if (viewName === 'status') {
      //   // this.handleGetListStatus()
      // } else if (viewName === 'warning') {
      //   // this.handleGetListFault()
      // }
      // if (viewName !== 'group') {

      // this.videoObj = {
      //   url: '',
      //   isVideoLoad: false,
      // }
      // this.videoArr = []
      // this.groupVideoBgArr = new Array(4)
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/poleIndex.scss";
::v-deep .vue-treeselect__control{
  border: 1px solid red;
}
::v-deep .vue-treeselect__input{
  background: white;
}
::v-deep .vue-treeselect div{
  background-color: rgb(5,41,74);
  //background-color: white;
  //color: black;
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
.duoxuanshu{
  background: red;
}
.group ::v-deep .Dialogshebei{
  //color: brown;
  position: relative;
  top:30%;
  background-color: rgb(4,42,78) !important;
  .el-dialog__title{
    color: white !important;
  }
}
::v-deep .el-popover__reference{
  position: relative;
  top: 20% !important;
}
.kong{
  margin-top: 5%;
  margin-left: 35%;
  font-size: 18px;
}
.dialog-el-date-picker{
  ::v-deep .el-input__inner{
    border: 1px solid gainsboro !important;
    padding-left: 10%;
    padding-right: 5%;
  }
  ::v-deep .el-input__prefix{
    position: relative;
    left: 45%;
    top: -3.8vh;
  }
}
.dialog-table-box{
  .title{
    font-weight: bold;
    font-size: 20px !important;
  };
}
.line1{
  width: 80%;
  height: 1px;
  border-top: solid white;
  position: relative;
  left: 1%;
}
.el-steps{
  position: relative;
  left: 7%;
  top: 7%;
}
.ledStatus{
  span{
    position: absolute;
    top: 26%;
    left: 40%;
    font-size: 1em;
  }
}
.system {
  width: 100%;
  height: 100%;
  position: absolute;

  .main-body {
    display: flex;

    .main-body-list {
      width: 72vw;
    }
  }
}

.header-navbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.navbar {
  margin: 4.5vh 1.5vw 0 0;
}

.warning-header {
  position: absolute;
  z-index: 50;
}
.el-table {
  // width: 97%;
  height: 60vh;
  overflow-y: auto;
}
.el-button {
  color: #eef1f6;
  background-color: #0082ec;
  border: 1px solid #014391;
}

.table-list {
  width: 95%;
}
.main-table::-webkit-scrollbar {
  display: none;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 150px;
  color: #cccccc;
}

.demo-table-expand {
  font-size: 0;
  ::v-deep span{
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ::v-deep .el-form-item__label{
    font-size: 18px;
    color: #fff;
    font-weight: normal;
  }
}

.demo-table-expand label {
  font-size: 18px;
  width: 150px;
  //color: #cccccc;
}
.description {
  display: block;
  width: 400px;
}

/*   .el-scrollbar {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0 10px;
  }

/* .warning {
  width: 100%;
  height: calc(100% - 14.8vh);
  color: white;
  display: flex;
  position: relative;
  }    */

.el-scrollbar {
  width: 100%;
}
.ywpagination {
  position: relative;
  left: 34vw;
  top: -1vh;
}
::v-deep .el-scrollbar {
  background: transparent !important;
}.defaultStatus{
   span{
     position: absolute;
     top:27%;
     left: 40.5%;
     font-size: 1em;
   }
 }
.HandleStatus{
  span{
    position: absolute;
    top:29.5%;
    left: 38%;
    font-size: 1em;
  }
  img{
    width: 66%;
    vertical-align: middle;

  }
}
.viewDetail{
  width: 20%;
  cursor: pointer;
}
.table_expand {
  position: relative;
  left: 4%;
  //display: flex;
  width: 80%;
  justify-content: space-around;
  align-items: center;
  //border: solid 1px;
  height: 95%;
  //width: 50%;
  overflow: auto;
}

.table_expand_text {
  width: 100%;
  margin-top: 5%;
  //border: solid 1px red;
  //width: 50%;
  height: 30%;
  padding: 20px 50px;

}

.timelinemodle {
  //background-color: cadetblue;
  padding-left: 30px;
  width: 80%;
  height: 50%;
  // border: 1px red solid;
  align-items: center;
  //overflow-y: auto;
  // overflow-x: hidden;
}
.box{
  position: absolute;
  width: 100%;
}
.el-card{
  width: 48%;
  float: left;
  border: 0;
  background-color: transparent;
  ::v-deep .el-card__body{
    padding-left: 10%;
  }
}
.el-timeline {
  width: 100%;
  font-size: 15px;
  /*   ::v-deep .el-timeline-item__timestamp.is-bottom {
    position: absolute;
    left: -100px;
    top: -5px;
    left: -80px;
    color: #fff;
    width: 50%;
  } */

}

/* ::v-deep .el-form-item__content {
  color: #fff;
  border: none;
} */
p1 {
  color: #cccccc;
  font-size: 15px;
  position: absolute;
  // top: 1px;
}

h3 {
  color: #fff;
  font-size: 18px;
}

p {
  color: #dddddd;
}

.img {
  display: inline-block;
}

::v-deep .el-pager {
  background-color: #03223f;
}

::v-deep .el-card__body {
  //background-color: #003366;
  border: none;
}

::v-deep .el-form-item__label {
  color: #0082ec;
}

::v-deep .el-form-item__content {
  color: #fff;
}

::v-deep .divider {
  width: 100%;
}


::v-deep .el-col-12{
  position: relative;
  left: 15%;
  //padding: 0 10px !important;
}
::v-deep .el-input__inner{
  border: none !important;
  font-size: 15px;
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
.otherBtn {
  cursor: pointer;
  position: absolute;
  top: -5%;
  //left: 30vh;
  img {
    position: relative;
    width: 6vw;
    height: 4.3vh;
    top: 1%;
  }
  span {
    position: absolute;
    top: 18%;
    left: 20%;
    font-size: 1.2em;
    z-index: 11;
  }
}


img {
  pointer-events: none;
}

.group::v-deep .el-dialog__headerbtn {
  top: 150%;
  right: 3%;
  //font-size: 2.5em;
  //color: white;
  //z-index: 1000000;
}

.group {
  position: relative;
  color: white;
  width: 100%;
  height: calc(100% - 14.8vh);
  display: flex;
  .group-header-line {
    position: absolute;
    //top: 3%;
    left: 80%;
    transform: translate(-50%, -50%);
    width: 54vw;
    img {
      width: 100%;
      height: auto;
    }
  }
  .group-header {
    position: fixed;
    top: 4%;
    z-index: 1000;
  }
  .group-right {
    //overflow: hidden;
    //border: 1px solid white;
    padding: 0 1vw 1vh 0;
    width: 71.5vw;
    height: 85.5vh;
    position: relative;
    .group-list-pagination-box {
      position: absolute;
      bottom: 4vh;
      right: 7.5vw;
      z-index: 1000;
    }

    .group-real,
    .group-map,
    .group-status-list,
    .group-warning-list {
      position: absolute;
      top: 47%;
      left: 45.5%;
      transform: translate(-50.5%, -47.5%);
      //width: 92.8%;
      //height: 66vh;
      //z-index: 1000;
      width: 78.3vw;
      height: 80vh;
    }

    .group-right-button {
      border-left: 3px solid rgba(4, 111, 148, 1);
      position: absolute;
      top: 0.5%;
      //top: 4.86vh;
      //left: 0.32vw;
      left: -9.2%;
      width: 80%;
      overflow: hidden;
      z-index: 1000;

      &::after {
        content: "";
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
        border: 3px solid rgb(4, 111, 148);
        //border-bottom: none;

        transform: skew(35deg);
        outline: none;
        color: white;
        font-size: 1.3em;
        width: 7.2vw;
        height: 5vh;
        margin-left: -4px;

        &:first-child {
          //border-right: none;
          width: 9vw;
          margin-left: -30px;
          padding-left: 30px;
        }

        //&:last-child {
        //  margin-left: -4px;
        //}

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

    .group-right-btn {
      z-index: 100;
      position: absolute;
      bottom: 3.5vh;
      right: 13vw;
      display: flex;
      justify-content: space-between;

      .group-right-btn1,
      .group-right-btn4 {
        user-select: none;
        cursor: pointer;
        margin-right: 20px;
        width: 5vw;
        height: 3.4vh;
        line-height: 2.2vh;
        background-color: #10456f;
        text-align: center;
        border-radius: 5px;
        border-style: outset;
        border-width: 3px;
        border-color: #0f6f97;
        box-shadow: 0 0 10px #243c47;

        &:hover {
          box-shadow: 0 0 10px #17619a;
        }
      }
    }

    .group-video {
      width: 66.4vw;
      height: 66.4vh;
      background-color: #163047;
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -48%);
      //.oneVideoBox{
      //  width: 100%;
      //  height: 100%;
      //  video {
      //    width: 100%;
      //    height: 100%;
      //    object-fit: fill;
      //  }
      //}

      .videoBox,
      .oneVideoBox {
        width: 50%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        position: relative;

        .video-player {
          width: 100%;
          height: 100%;
        }

        img {
          width: 20%;
          height: auto;
        }

        .title {
          color: white;
          font-size: 20px;
          font-weight: bold;
          position: absolute;
          z-index: 1000;
          top: 0;
          width: 100%;
          padding-left: 40px;
          height: 40px;
          line-height: 40px;
          background-color: rgba(8, 29, 48, 0.8);
          display: none;
        }

        &:hover .title,
        &:hover .group-video-close {
          display: block;
        }

        .group-video-close {
          cursor: pointer;
          position: absolute;
          right: 20px;
          bottom: 20px;
          width: 20px;
          height: 20px;
          color: rgba(8, 29, 48, 1);
          font-size: 2em;
          font-weight: 700;
          display: none;
          z-index: 1000;
        }
      }

      .oneVideoBox {
        width: 100%;
        height: 100%;
      }

      .videoBox:nth-child(1),
      .videoBox:nth-child(2) {
        border-bottom: 2px solid black;
      }

      .videoBox:nth-child(1),
      .videoBox:nth-child(3) {
        border-right: 2px solid black;
      }
    }

    img {
      position: absolute;
      pointer-events: none;
      top: 50%;
      transform: translateY(-47%);
      width: 98.2%;
      height: 90%;
      z-index: 10;
    }

    .line1 {
      position: absolute;
      bottom: 1.5vh;
      left: -7vw;
      width: 58vw;
      height: 5vh;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .line2 {
      position: absolute;
      //bottom: 2vh;
      //left: -24vw;
      bottom: 2.5vh;
      left: -20vw;
      width: 50vw;
      height: 3vh;
        img {
        height: 100%;
        width: 100%;
      }
    }
  }
}

.dialog-box {
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    //border: 1px solid white;
  }
  .dialog-left {
    width: 40vw;
    height: 60vh;
    .dialog-video-box {
      position: relative;
      width: 100%;
      height: 59%;
      border: 4px solid rgba(1, 153, 171, 0.6);
      video {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }

      .dialog-webrtcplayer {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10000;
      }
    }

    .dialog-operating-box {
      width: 100%;
      height: 41%;
      display: flex;
      padding-top: 30px;
      justify-content: space-around;
      align-items: center;

      .title {
        position: relative;
        width: 4vw;
        height: 20vh;

        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-45%, -50%);
          font-size: 1.8rem;
          color: white;
          text-align: center;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      .operator-direction {
        position: relative;
        left: 20%;
        top: 15%;
        width: 13vw;
        height: 13vw;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #a3a3a3;
        font-size: 0;
        margin-left: 30px;
        background: #ececec;
        //background: no-repeat url("../../../assets/images/camera/video_dialog_bg.png");
        background-size: 100% 100%;
        z-index: 1000;
        .box {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 11vw;
          height: 11vw;
          border-radius: 50%;
          overflow: hidden;

          div,
          .el-button {
            margin: 0;
            padding: 0;
            position: absolute;
            width: 5.5vw;
            height: 5.5vw;
            border-radius: 5.5vw 0 0 0;
            overflow: hidden;
            transform-origin: 5.5vw 5.5vw;
            background-color: rgba(234, 238, 238, 0.9);
            border: 1px solid rgba(54, 53, 53, 0.3);
            z-index: 100000;

            &:nth-child(2) {
              transform: rotate(90deg);
            }

            &:nth-child(3) {
              transform: rotate(-90deg);
            }

            &:nth-child(4) {
              transform: rotate(-180deg);
            }

            span {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              display: block;
              width: 0;
              height: 0;
              border: 15px solid;
              border-color: transparent transparent rgba(149, 151, 151, 0.8);
            }
          }

          div:hover span,
          .el-button:hover span {
            width: 0;
            height: 0;
            border: 15px solid;
            border-color: transparent transparent rgba(111, 187, 248, 0.8);
          }
        }
      }

      .operator-other {
        position: relative;
        top: -20%;
        left: -30%;
        width: 20vw;
        height: 20vh;
        padding: 0 20px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .operator-zoom-focus,
        .block {
          width: 19vw;
          display: flex;
          //flex-direction: column;
          justify-content: space-around;
          align-items: center;
          font-size: 1.8rem;
          color: rgba(149, 196, 242, 1);
          .el-slider {
            width: 10vw;
          }
          .addbtn{
            position: relative;
            left: -150%;
          }
          .subbtn{
            position: relative;
            left: 320%;
            ::v-deep span{
              position: relative;
              top: -165%;
            }
          }
          .el-button {
            width: 50px;
            height: 50px;
            margin: 0 10px;
            background-color: transparent;
            color: white;
            border: none;
            outline: none;
            font-size: 1em;
            img {
              width: 100%;
              height: 100%;
            }
          }

          div {
            display: flex;
            flex-direction: column;
          }
        }

        .block {
          flex-direction: row;
        }
      }
    }
  }

  .dialog-right {
    width: 20vw;
    height: 60vh;
    margin-left: 10px;
    padding-top: 10px;

    .dialog-right-btn {
      display: flex;
      overflow: hidden;
      border-left: 4px solid rgba(1, 153, 171, 0.9);

      .btn {
        cursor: pointer;
        width: 5.3vw;
        height: 50px;
        background-image: radial-gradient(
          rgba(2, 94, 170, 0),
          rgba(2, 94, 170, 0.4),
          rgba(2, 94, 170, 1)
        );
        border: 4px solid rgba(1, 153, 171, 0.6);
        border-bottom: none;
        transform: skew(35deg);
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          font-size: 0.9rem;
          color: white;
          display: block;
          transform: skew(-35deg);
        }
      }

      .btn1 {
        margin-left: -20px;
        width: 6.3vw;
        padding-left: 15px;
        //border-right: none;
      }

      .btn2 {
        margin-left: -4px;
        margin-right: 8px;
      }

      .btn-active {
        background-image: radial-gradient(
          rgba(1, 153, 171, 0),
          rgba(1, 153, 171, 0.4),
          rgba(1, 153, 171, 1)
        );
      }

      & > span {
        display: inline-block;
        height: 25px;
        width: 14px;
        background-image: radial-gradient(
          rgba(1, 153, 171, 0),
          rgba(1, 153, 171, 0.3),
          rgba(1, 153, 171, 0.6)
        );
        transform: skew(35deg);
        margin-left: 8px;
        margin-top: 24px;
        border: 2px solid rgba(1, 153, 171, 0.6);
      }
    }

    .dialog-right-body {
      position: relative;
      border: 4px solid rgba(0, 157, 209, 1);
      width: 106%;
      height: 53.5vh;
      //overflow: auto;
      .dialog-right-info {
        display: flex;
        flex-direction: column;
        margin-left: 12%;
        //justify-content: space-around;
        //color: #0e66ae;
        color: white;
        font-size: 1.3rem;
        width: 100%;
        height: 53.5vh;
        overflow: auto;
        .new_head{
          margin-top: 5%;
          position: relative;
          left: -20%;
          width: 100%;
          display: flex;
          //justify-content: center;
          //align-items: center;
          font-size: 1.3rem;
          margin-bottom: 5%;
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
        & > span {
          position: absolute;
        }

        .arrow {
          //font-size: 0;
          margin-right: 10px;
          span {
            display: inline-block;
          }

          span::before,
          span::after {
            content: "";
            display: block;
            background-color: #0e66ae;
            width: 12px;
            height: 4px;
          }

          span::before {
            transform: rotate(45deg) translateY(-3px) skew(-45deg);
          }

          span::after {
            transform: rotate(-45deg) translateY(3px) skew(45deg);
          }
        }

        & > div {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 50px;
          padding-left: 10px;
        }
      }

      .dialog-right-list {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        padding: 50px 0 0 0;

        .dialog-el-date-picker {
          position: absolute;
          right: 10px;
          top: 10px;
        }

        .dialog-right-list-box {
          width: 100%;
          height: 100%;
          overflow: auto;

          .dialog-right-list-item {
            width: 100%;
            padding: 10px 0 10px 10px;
            color: rgba(255, 255, 255, 1);

            &:hover {
              color: rgba(255, 255, 255, 0.8);
              background-color: #155ea3;
            }
          }

          &::-webkit-scrollbar {
            display: none; /* Chrome Safari */
          }

          & {
            scrollbar-width: none; /* firefox */
            -ms-overflow-style: none; /* IE 10+ */
            overflow-x: hidden;
            overflow-y: auto;
          }
        }
      }

      .line1 {
        position: absolute;
        top: -8px;
        right: -4px;
      }
      .line2 {
        position: absolute;
        left: -8px;
        bottom: 23px;
      }
      & > span::before,
      & > span::after {
        content: "";
        position: absolute;
        display: block;
        width: 4px;
        height: 30px;
        background-color: rgba(0, 211, 229, 1);
      }
      .line1::before {
        top: -13px;
        right: 11px;
        transform: rotate(90deg);
      }

      .line2::before {
        top: 13px;
        right: -19px;
        transform: rotate(90deg);
      }
    }
  }
}

.groupOperation {
  ::v-deep .group-left-img {
    margin-top: 13vh !important;
  }
}

.groupManager_btn {
  position: absolute;
  top: 76vh;
  left: 65vw;
  z-index: 111;
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
.ywpagination {
  position: absolute;
  left: 60vw;
  top: 72.5vh;
  color:#fff;
}
::v-deep .el-pagination__total{
  color: #fff;
}
::v-deep .el-pagination__jump{
  color: #fff;
}
::v-deep .el-pagination__sizes{
  margin-left: 1vw;
}
.borderPagination{
  ::v-deep .el-input--medium{
    border: 1px solid rgb(13,194,217);
    height: 90%;
  }
}
::v-deep .el-cascader{
  .el-input__inner{
    color: black;
    background: white;
    position: relative;
    left: 10%;
  }
}
::v-deep .vue-treeselect{
  border: 2px solid rgb(1,67,145);
  border-radius:10px;
}
</style>
