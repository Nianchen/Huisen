<template>
  <div class="group" @click="hiddenPreviewImg">
    <GoHome title="LED大屏" class="group-header"></GoHome>
    <TreeList v-show="showTreeList"></TreeList>
    <littleTree
      v-show="showResourceClassify"
      :data="resourceTreeData"
    ></littleTree>
    <div class="group-right">
      <div class="group-right-button">
        <button
          :class="rightShowType === 'group' ? 'button-active' : ''"
          v-on:click="handleShowGroup"
        >
          <span>设备</span>
        </button>
        <button
          :class="rightShowType === 'area' ? 'button-active' : ''"
          v-on:click="handleShowArea"
        >
          <span>地图</span>
        </button>
        <button
          :class="rightShowType === 'resource' ? 'button-active' : ''"
          v-on:click="handleShowResource"
        >
          <span>资源</span>
        </button>
        <button
          :class="rightShowType === 'program' ? 'button-active' : ''"
          v-on:click="handleShowProgram"
        >
          <span>节目</span>
        </button>
        <button
          :class="rightShowType === 'strategy' ? 'button-active' : ''"
          v-on:click="handleShowStrategy"
        >
          <span>策略</span>
        </button>
        <button
          :class="rightShowType === 'yw' ? 'button-active' : ''"
          v-on:click="handleShowyw"
        >
          <span>故障报警</span>
        </button>
      </div>

      <!-- 运维 -->
      <TableList v-show="showYwList">
        <ywList class="ywList" :type="'4'" />
      </TableList>

      <!-- 区域地图 -->
      <div class="areaMap" v-show="showAreaMap">
        <div class="areaMap_box">
          <Map />
        </div>
      </div>
      <!-- 设备列表 -->
      <div class="searchLed" v-show="showTableList">
        <el-input
          v-model="ledQueryParams.componentName"
          placeholder="请输入设备名称"
        ></el-input>
        <div
          class="searchLed_btn"
          @click="searchLed"
          v-hasPermi="['led:component:view']"
        >
          <img src="../../../assets/images/button/register-pole.png" alt="" />
          <span>检索</span>
        </div>
<!--         <div class="otherBtn" @click="handleGroupDialog">-->
<!--          <img src="../../../assets/images/button/register-pole.png" alt="" />-->
<!--          <span>分组管理</span>-->
<!--        </div>-->
      </div>
      <TableList v-show="showTableList">
        <template>
          <div class="status-body table-list">
            <el-table
              v-loading="loading"
              :data="tableData"
              style="width: 100%"
              :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',
              }"
            >
              <el-table-column
                header-align="center"
                prop="componentName"
                label="设备名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="basicPole.name"
                label="所属灯杆"
                align="center"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="dept.deptName"
                label="所属区域"
                align="center"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="group.name"
                label="分组名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="screenSize"
                label="屏幕尺寸"
                align="center"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="status"
                label="在线状态"
                align="center"
              >
                <template slot-scope="scope">
                  <div class="ledStatus" v-if="scope.row.status === '1'">
                    <img
                      src="../../../assets/images/button/status-online.png"
                      alt=""
                    />
                    <span>在线</span>
                  </div>
                  <div class="ledStatus" v-else-if="scope.row.status === '2'">
                    <img
                      src="../../../assets/images/button/status-offline.png"
                      alt=""
                    />
                    <span>离线</span>
                  </div>
                  <div class="ledStatus" v-else>
                    <img
                      src="../../../assets/images/button/status-fault.png"
                      alt=""
                    />
                    <span>故障</span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                header-align="center"
                prop="switchStatus"
                label="屏幕开关"
                align="center"
              >
                <template slot-scope="scope">
                  <div class="ledSwitch" v-if="scope.row.switchStatus === '1'">
                    <img
                      src="../../../assets/images/button/status-online.png"
                      alt=""
                    />
                    <span>开</span>
                  </div>
                  <div class="ledSwitch" v-else>
                    <img
                      src="../../../assets/images/button/status-offline.png"
                      alt=""
                    />
                    <span>关</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="contorl"
                label="操作"
                align="center"
              >
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="查看详情"
                    placement="top-start"
                    v-hasPermi="['led:component:view']"
                  >
                    <!-- <i class="el-icon-view" style="font-size: 20px; cursor: pointer" @click="gotoDetail(scope.row)"></i> -->
                    <div @click="gotoDetail(scope.row)" class="setting">
                      <img
                        src="../../../assets/images/detail_w.png"
                        alt=""
                        style="width: 100%"
                      />
                    </div>
                  </el-tooltip>

                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="管理分组"
                    placement="top-start"
                    v-hasPermi="['led:component:edit']"
                  >
                    <!-- <i class="el-icon-view" style="font-size: 20px; cursor: pointer" @click="gotoDetail(scope.row)"></i> -->
                    <div @click="handleDetail(scope.row)" class="setting3">
                      <img
                        src="../../../assets/images/guanli.png"
                        alt=""
                        style="width: 100%"
                      />
                    </div>
                  </el-tooltip>
                  <!-- <el-button type="success" >详情</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <pagination
          class="paginationStyle"
          popperClass="ic-pagination"
          :total="ledtotal"
          :page.sync="ledQueryParams.pageNum"
          :limit.sync="ledQueryParams.pageSize"
          @pagination="getData"
        />
      </TableList>

      <!-- 设备详情 -->
      <Dialog
        class="standardDialog"
        title="LED详情"
        :DialogVisibleFlag.sync="ledDetailVisiable"
        :isShowClose="false"
      >
        <!-- 左侧预览框 -->
        <div
          v-loading="previewImg"
          element-loading-text="获取截图中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.9)"
          class="leftcontainer"
        >
          <div class="previewimages"><img :src="baseImg" width="287vw" /></div>
        </div>

        <!-- 右侧大操作框 -->
        <div class="rightcontainer">
          <span class="Angle1"></span>
          <span class="Angle2"></span>
          <!-- 右上方按钮 -->
          <div class="rightbtns"></div>
          <!-- 右边操作框 -->
          <div class="rightbox">
            <!-- 设备详情 -->
            <div class="ledDetail">
              <div class="table-list dialog-table-box" style="width: 81%;">
                <el-form ref="form" :model="ledDetailInfo" label-width="auto">
                  <el-row>
                    <el-col class="dialog-table-title" :span="24">
                      <!-- <div class="arrow">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div>灯杆信息</div> -->
                        <div class="arrow left-arrow">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div class="title" style="color:#fff;font-size:1.1em">灯杆信息</div>
                      <div class="arrow right-arrow">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </el-col>
                  </el-row>

                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="所属区域:"  >
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.dept.deptName"
                        ></el-input> -->
                         <div style="font-size:18px;color:white">{{ledDetailInfo.dept.deptName}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="所属分组:">
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.group.name"
                        ></el-input> -->
                         <div style="font-size:18px;color:white">{{ledDetailInfo.group.name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="所在位置:">
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.basicPole.address"
                        ></el-input> -->
                         <div style="font-size:18px;color:white">{{ledDetailInfo.basicPole.address}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="所属灯杆:">
                        <!-- readonly只读属性 -->
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.basicPole.name"
                        ></el-input> -->
                         <div style="font-size:18px;color:white">{{ledDetailInfo.basicPole.name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col class="dialog-table-title">
                      <!-- <div class="arrow">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div>灯杆信息</div> -->
                        <div class="arrow left-arrow">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <div class="title" style="color:#fff;font-size:1.1em">设备信息</div>
                      <div class="arrow right-arrow">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="设备名称:">
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.componentName"
                        ></el-input> -->
                          <div style="font-size:18px;color:white">{{ledDetailInfo.componentName}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="所属分组:">
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.group.name"
                        ></el-input> -->
                            <div style="font-size:18px;color:white">{{ledDetailInfo.group.name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="IP地址:">
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.serverIp"
                        ></el-input> -->
                            <div style="font-size:18px;color:white">{{ledDetailInfo.serverIp}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="端口:">
                        <!-- <el-input
                          readonly
                          v-model="ledDetailInfo.serverPort"
                        ></el-input> -->
                            <div style="font-size:18px;color:white">{{ledDetailInfo.serverPort}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="开关状态:">
                        <el-switch
                          v-model="ledDetailInfo.switchStatus"
                          disabled
                          active-text="开"
                          inactive-text="关"
                          active-value="1"
                          inactive-value="2"
                        ></el-switch>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="设备状态:">
                        <el-switch
                          v-model="ledDetailInfo.status"
                          disabled
                          active-text="在线"
                          inactive-text="离线故障"
                          active-value="1"
                          inactive-value="2"
                        >
                        </el-switch>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30" v-if="ledDetailInfo.controlId === null">
                    <el-col :span="12">
                      <el-form-item label="策略">
                        <el-input readonly value="暂无策略"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- <el-row :gutter="30">
                    <el-col :span="24">
                      <el-form-item
                        label="策略时间"
                        v-if="ledDetailInfo.controlId != null"
                      >
                        <el-checkbox-group v-model="timeweeks">
                          <el-checkbox
                            v-for="weekitem in weekData"
                            :key="weekitem.id"
                            :label="weekitem.id"
                            >{{ weekitem.name }}
                          </el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="30">
                    <el-col
                      :span="18"
                      v-for="(item, index) in timeAndProgram"
                      :key="index"
                    >
                      <el-form-item
                        label="节目:"
                        v-if="ledDetailInfo.controlId != null"
                      >
                     //   <div>
                     //     <span class="ledDetail_program">
                     //       {{item.name}}---{{item.startTime}}-{{item.endTime}}
                     //    </span>
                     //   </div>
                        <el-input
                          readonly
                          :value="
                            item.name +
                            '-----' +
                            item.startTime +
                            '-' +
                            item.endTime
                          "
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row> -->
                </el-form>
              </div>
              <div v-if="ledDetailInfo.status != '1'" class="showMalfunctions">
                <span>故障/离线</span>
              </div>
              <el-button type="primary" @click="getLedImg" class="clickGetImg"
                >点击获取LED截图</el-button
              >
            </div>
          </div>
        </div>
      </Dialog>

      <!-- 文件上传前选择分组 -->
      <el-dialog
        class="groupDialog"
        title="上传资源"
        :visible.sync="beforeSelectGroup"
        width="30%"
      >
        <el-cascader
          popperClass="ic-pagination"
          :show-all-levels="false"
          v-model="resourceTypeId"
          :options="resourceTreeData"
          :props="optionProps"
          @change="resourceChange"
        >
        </el-cascader>
        <el-upload
          action="aaa"
          class="upload-demo"
          multiple
          :on-change="change"
          :on-success="success"
          :http-request="uploadFile"
          show-file-list
          :file-list="fileList"
        >
          <el-button
            type="primary"
            class="uploadFileBtn"
            :loading="upLoadBtnLoading"
            v-hasPermi="['led:component:edit']"
            >点击上传</el-button
          >

          <el-progress
            :percentage="progressPercent"
            :text-inside="true"
            :stroke-width="3"
            v-show="progress"
            class="progressClass"
          ></el-progress>
        </el-upload>
      </el-dialog>

      <div class="searchLed" v-show="showResource">
        <el-input
          v-model="resoureQueryParams.name"
          placeholder="请输入资源名称"
        ></el-input>
        <div
          class="searchLed_btn"
          @click="searchResource"
          v-hasPermi="['led:component:view']"
        >
          <img src="../../../assets/images/button/register-pole.png" alt="" />
          <span>检索</span>
        </div>
        <div class="otherBtn" @click="beforeSelectGroup = true">
          <img src="../../../assets/images/button/register-pole.png" alt="" />
          <span>上传资源</span>
        </div>
      </div>

      <!-- 资源列表 -->
      <TableList v-show="showResource">
        <template>
          <div class="status-body table-list">
            <el-table
              :loading="resourceLoading"
              :data="resourceList"
              style="width: 100%"
              :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',
              }"
            >
              <!-- <el-table-column
                header-align="center"
                type="selection"
                align="center"
              >
              </el-table-column> -->
              <el-table-column
                header-align="center"
                prop="name"
                label="文件名称"
                align="center"
              >
              </el-table-column>
              <!-- <el-table-column header-align="center" prop="createTime" label="上传时间" align="center">
              </el-table-column> -->
              <el-table-column
                header-align="center"
                prop="size"
                label="文件大小"
                align="center"
              >
                <template slot-scope="scope">{{
                  scope.row.size | resourceSize
                }}</template>
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="fileExt"
                label="文件类型"
                align="center"
              >
                <template slot-scope="scope">
                  {{ scope.row.fileExt === '.mp4' ? '视频' : '图片' }}
                </template>
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="contorl"
                label="操作"
                align="center"
              >
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="点击查看详情"
                    placement="top-start"
                  >
                    <!-- <i
                      class="el-icon-view"
                      style="font-size: 20px; cursor: pointer"
                      @click="previewResource(scope.row)"
                    ></i> -->

                    <div
                      @click="previewResource(scope.row)"
                      class="setting setting_1"
                    >
                      <img
                        src="../../../assets/images/detail_w.png"
                        style="width: 100%"
                      />
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <pagination
          class="paginationStyle"
          popperClass="ic-pagination"
          :total="resouretotal"
          :page.sync="resoureQueryParams.pageNum"
          :limit.sync="resoureQueryParams.pageSize"
          @pagination="getResourceData"
        />
      </TableList>
      <div v-if="previewType === '.jpg' || 'zhucezujian.png' || '.gif' || '.jpeg'">
        <el-image
          @error="previewerror"
          id="previewimgid"
          v-if="previewImage"
          class="previewImage"
          :src="Resourceimageurl"
        ></el-image>
      </div>
      <div
        v-show="previewVideo"
        class="previewVideo"
        v-if="previewType === '.mp4'"
      >
        <div class="closeVideo">
          <i class="el-icon-close" @click="closePreviewVideo"></i>
        </div>
        <video
          class="resourcepreviewvideo"
          :src="videoUrl"
          autoplay
          controls
        ></video>
      </div>

      <!-- 节目列表 -->
      <div class="searchLed" v-show="showEditProgram">
        <el-input
          v-model="programQueryParams.name"
          placeholder="请输入节目名称"
        ></el-input>
        <!-- <el-button class="searchLed_btn" type="primary" @click="searchProgram" v-hasPermi="['led:component:view']">检索</el-button>
        <el-button @click="showAddProgramDIalog = true" class="otherBtn" v-show="showEditProgram" v-hasPermi="['led:component:edit']">新增节目
        </el-button> -->
        <div
          class="searchLed_btn"
          @click="searchProgram"
          v-hasPermi="['led:component:view']"
        >
          <img src="../../../assets/images/button/register-pole.png" alt="" />
          <span>检索</span>
        </div>
        <div
          class="otherBtn"
          @click="showEditDialog"
          v-hasPermi="['led:component:edit']"
        >
          <img src="../../../assets/images/button/register-pole.png" alt="" />
          <span>编辑节目</span>
        </div>
      </div>
      <TableList v-show="showEditProgram">
        <template>
          <div class="status-body table-list">
            <el-table
              :data="ProgramList"
              style="width: 100%"
              :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',
              }"
            >
              <!-- <el-table-column
                header-align="center"
                type="selection"
                align="center"
              >
              </el-table-column> -->
              <el-table-column
                header-align="center"
                prop="name"
                label="节目名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="createTime"
                label="上传时间"
                align="center"
              >
              </el-table-column>
               <el-table-column
                header-align="center"
                prop="screenSize"
                label="节目尺寸"
                align="center"
              >
              </el-table-column>
              <el-table-column

                   prop="cerateBy"
                label="审核状态"
                align="center"
              >
                <template slot-scope="scope">
                  <!-- <el-tag type="success" v-if="scope.row.status === '2'"
                    >已审核</el-tag
                  >
                  <el-tag type="danger" v-else>未审核</el-tag> -->
                  <div v-if="scope.row.status === '2'" class="shebeiStatus">
                    <img
                      src="../../../assets/images/button/status-online.png"
                      alt=""
                    />
                    <span>已审核</span>
                  </div>
                  <div v-else class="shebeiStatus">
                    <img
                      src="../../../assets/images/button/status-offline.png"
                      alt=""
                    />
                    <span>未审核</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="contorl"
                label="操作"
                align="center"
              >
                <template slot-scope="scope">
<!--                  <el-tooltip-->
<!--                    v-if="scope.row.status === '1'"-->
<!--                    class="item"-->
<!--                    effect="dark"-->
<!--                    content="点击编辑节目"-->
<!--                    placement="top-start"-->
<!--                  >-->
<!--                    <div-->
<!--                      @click="gotoEditProgram(scope.row)"-->
<!--                      class="zhuce"-->
<!--                      v-hasPermi="['led:component:edit']"-->
<!--                    >-->
<!--                      <img-->
<!--                        src="../../../assets/images/edit_icon.png"-->
<!--                        width="100%"-->
<!--                      />-->
<!--                    </div>-->
<!--                  </el-tooltip>-->
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="点击查看详情"
                    placement="top-start"
                  >
                    <div
                      @click="gotoDetailProgram(scope.row)"
                      class="setting add"
                    >
                      <img
                        src="../../../assets/images/detail_w.png"
                        width="100%"
                      />
                    </div>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="点击删除"
                    placement="top-start"
                  >
                    <div
                      @click="DeleteProgram(scope.row)"
                      class="zhuce1"
                    >
                      <img
                        src="../../../assets/images/delete_icon.png"
                        width="100%"
                      />
                    </div>
                  </el-tooltip>

<!--                  <div class="deleteBtn">-->
<!--                    <i class="el-icon-delete"></i>-->
<!--                  </div>-->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <pagination
          class="paginationStyle"
          popperClass="ic-pagination"
          :total="programtotal"
          :page.sync="programQueryParams.pageNum"
          :limit.sync="programQueryParams.pageSize"
          @pagination="getProgramListData"
        />
      </TableList>
      <!-- 查看节目详情 -->

      <el-dialog
        class="lookProgramDetail"
        @close="restProgramDetail"
        title="节目详情"
        :visible.sync="programDetailDialig"
      >
        <el-button
          @click="auditsuccess"
          class="auditBtn"
          type="primary"
          v-if="auditStatus === '1'"
          >通过审核</el-button
        >
        <el-button type="primary" class="auditBtn1" @click="previewConfim1">节目预览</el-button>
        <el-button type="primary" class="auditBtn2" :disabled="ifConfirm" @click="previewClear">取消预览</el-button>
        <div class="detailText">
          <span class="detailText_span" v-html="tmpTextContent">{{
            tmpTextContent
          }}</span>
        </div>
        <div class="detailVideo">
          <video
            controls
            autoplay
            class="detailVideo_video"
            :src="tmpVideoUrl"
          ></video>
        </div>
        <div class="detailImg">
          <el-image class="detailImg_img" :src="tmpImgUrl"></el-image>
        </div>
      </el-dialog>

      <!-- 新增节目的弹窗 -->

      <!-- 编辑节目 -->

      <Dialog
        class="standardDialog"
        title="新增节目"
        :DialogVisibleFlag.sync="showAddProgramDIalog"
        :isShowClose="false"
      >
        <div class="editProgram">
          <!-- 上方按钮 -->
          <div class="editProgram_box">
            <!-- 搜索节目和下拉框 -->
            <div>
              <el-input
                class="addPrograminput"
                v-model="name"
                placeholder="请输入节目名称"
                clearable
              >
              </el-input>
              <!-- <el-dropdown class="DropDown">
                <el-button type="primary" class="dropDownButton">
                  更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>200*400</el-dropdown-item>
                  <el-dropdown-item>1280*640</el-dropdown-item>
                  <el-dropdown-item>400*800</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
              <el-select v-model="value1" placeholder="请选择" class="DropDown" clearable @change="dropdownChange">
                <el-option
                  v-for="item1 in led_size"
                  :key="item1.dictSort"
                  :label="item1.dictLabel"
                  :value="item1.dictValue"
                >
                </el-option>
              </el-select>
            </div>

            <div class="editProgram_innerbox">
              <el-button
                class="changeupbtns changeupbtns2 changeupbtns4"
                icon="el-icon-upload"
                @click="previewClear"
                v-hasPermi="['led:component:edit']"
                :disabled="ledCancel"
              >取消预览
              </el-button>
              <el-button
                class="changeupbtns changeupbtns2 changeupbtns3"
                icon="el-icon-upload"
                @click="previewProgramok"
                v-hasPermi="['led:component:edit']"
                :disabled="btnDisable"
              >预览
              </el-button>
              <!-- 左侧按钮 -->
              <div class="leftupBtns">
                <el-button
                  class="changeupbtns changeupbtns1"
                  icon="el-icon-refresh"
                  @click="resetEdit"
                  >重置</el-button
                >
                <el-button
                  class="changeupbtns changeupbtns2"
                  icon="el-icon-upload"
                  @click="editProgramok"
                  v-hasPermi="['led:component:edit']"
                  :disabled="btnDisable"
                  >保存
                </el-button>
              </div>
              <!-- 下放内容框 -->
              <div class="downBox">
                <!-- 左边 -->
                <div class="downbox_left">
                  <!-- <span class="tuceng">>>>图层</span> -->
                  <div class="tuceng">
                    <div class="arrow">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="tucengLocation">图层</div>
                  </div>
                  <div
                    class="downbox_left_text"
                    @click="changeColor(Tcitem, index)"
                    v-for="(Tcitem, index) in tucengList"
                    :key="index"
                  >

                    <!-- <i class="el-icon-ciecle-check"></i> -->
                    <!-- <i class="el-icon-ciecle-check">
                      <span :class="flag == index ? 'activecolor' : ''">
                        {{Tcitem.name}}
                      </span>
                    </i> -->
                    <!-- <div icon="el-icon-ciecle-check">
                      <span :class="flag == index ? 'activecolor' : ''">
                        {{Tcitem.name}}
                      </span>
                    </div> -->
                    <!-- <div :class="flag === index ? '' : 'ishide'">
                      <i
                        class="el-icon-error"
                        style="
                          padding-right: 10px;
                          cursor: pointer;
                          color: #fff;
                          font-size: 20px;
                        "
                        @click="hiddenEditprogram(index)"
                      >
                      </i>
                    </div> -->
                    <div :class="flag === index ? 'ischange' : ''">
                      <!-- <div v-if=""></div> -->
                      <i class="el-icon-success"></i>
                    </div>


                      <span :class="flag == index ? 'activecolor' : ''">
                        {{Tcitem.name}}
                      </span>

                      <div :class="flag === index ? '' : 'ishide'">
                        <i
                         class="el-icon-error"
                          @click="hiddenEditprogram(index)"
                        >
                        </i>
                      </div>

                  </div>
                </div>
                <!-- 中间 -->
                <div class="downbox_mid">
                  <!-- >>>图标 -->
                  <div class="previewprogram">
                    <div class="arrow">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="programView">节目预览 [{{sizevalue}}]</div>
                  </div>
                  <!-- 文本 -->
                  <draggable v-model="list" @end="end" animation="100">
                    <div
                      v-for="(item, index) in list"
                      :key="index"
                      animation="100"
                    >
                      <div
                        v-if="item.id === 'list1'"
                        class="listdataaaa"
                        :style="textStyle()"
                        v-show="showtextstyle"
                      >
                        <span v-html="markdownValue">{{ markdownValue }}</span>
                      </div>
                      <div
                        v-else-if="item.id === 'list2'"
                        class="listdataaaa"
                        :style="videoStyle()"
                        v-show="showvideostyle"
                      >
                        <video
                          class="mid_video_video"
                          :src="editVideoUrl"
                          controls
                        ></video>
                      </div>
                      <div
                        v-else-if="item.id === 'list3'"
                        class="listdataaaa"
                        :style="imgStyle()"
                        v-show="showimgstyle"
                      >
                        <el-image
                          class="imagesize"
                          :src="editImgUrl"
                        ></el-image>
                      </div>
                    </div>
                    <!-- </transition-group> -->
                  </draggable>
                  <!-- </div> -->
                </div>
                <!-- 右边 -->
                <div class="downbox_right">
                  <!-- <span class="tcsetting">>>>图层设置</span> -->
                   <div class="tcsetting">
                    <div class="arrow">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="tucengSet">图层设置</div>
                  </div>
                  <div class="downbox_right_container">
                    <!-- v-if="tucengFlag === 2" -->
                    <div class="markdownbox" v-show="handleShowMarkdown">
                      <markdown v-on:getContent="getContent"></markdown>
                    </div>
                    <div class="selectresource" v-if="tucengFlag === 1">
                      <!-- <el-button class="selectresource_btn" @click="selectVideo"
                        >点击选择视频</el-button
                      > -->
                      <el-select
                        popperClass="ic-pagination"
                        class="selectresource_res"
                        v-model="sourceId_video"
                        placeholder="请选择视频"
                        value-key="sourcesId"
                        @change="videochange"
                      >
                        <el-option
                          v-for="item in EditVideo"
                          :key="item.sourcesId"
                          :label="item.name"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                    </div>

                    <div class="selectresource" v-else-if="tucengFlag === 3">
                      <!-- <el-button class="selectresource_btn" @click="selectImg"
                        >点击选择图片</el-button
                      > -->
                      <!-- <template slot-scope="scope"> -->
                      <el-select
                        popperClass="ic-pagination"
                        class="selectresource_res"
                        v-model="sourceId_img"
                        placeholder="请选择图片"
                        @change="imgchange"
                        value-key="sourcesId"
                      >
                        <el-option
                          v-for="item in EditImg"
                          :key="item.sourcesId"
                          :label="item.name"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                      <!-- </template> -->
                    </div>

                    <el-form :model="textForm" v-if="tucengFlag === 2">
                      <div class="optionBtns">
                        <!-- 播放时间 -->
                        <div class="playtime">
                          <span class="playTitle">
                            播放时间   (单位：秒)
                          </span>
                          <!-- 下拉框
                           -->
                          <el-form-item>
                            <!-- <el-input v-model="textForm.palyTime"></el-input> -->
                              <el-select v-model="textForm.palyTime" placeholder="请选择" class="playTimes" style="font-family: cursive;">
                                  <el-option
                                    v-for="item in optionsPlaytime"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                              </el-select>
                          </el-form-item>
                        </div>

                        <!-- 播放速度 -->

                        <!-- 显示位置 -->
                        <div class="playposition">
                          <span class="playTitle">
                            显示位置 (单位：像素)
                          </span>

                          <el-form-item>
                            <!-- <el-input v-model="textForm.palyTime"></el-input> -->
                              <el-select v-model="locationSelect" placeholder="请选择" class="playTimes">
                                  <el-option
                                    v-for="item in optionsLocation"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                              </el-select>
                          </el-form-item>
                          <span class="showLocation">
                            显示位置
                          </span>
                          <div class="setUpDown">
                            <el-form-item>
                            <span
                              style="position: absolute; top: 3vh; left: 0vw"
                              >上</span
                            >
                            <el-input-number
                              class="numberLeft"
                              v-model="textForm.top"
                              :min="0"
                              :max="800"
                            >
                            </el-input-number>
                          </el-form-item>

                          <el-form-item>
                            <span
                              style="position: absolute; top: 1vh; left: 9vw"
                              >左</span
                            >
                            <el-input-number
                              class="numberTop"
                              v-model="textForm.left"
                              :min="0"
                              :max="200"
                            >
                            </el-input-number>
                            </el-form-item>
                          </div>

                        </div>
                        <!-- 显示尺寸 -->
                        <div class="playsize">

                          <span class="showSize">
                            显示尺寸
                          </span>
                          <el-form-item>
                            <span
                              style="position: absolute; top: 1vh; left: 0vw"
                              >宽</span
                            >
                            <el-input-number
                              class="numberWidth"
                              v-model="this.value1.split('*')[1]"
                              label="宽度"
                              :max="this.value1.split('*')[1]"
                              :disabled="true"
                            ></el-input-number>
                          </el-form-item>
                          <el-form-item>
                            <span
                              style="position: absolute; top: -1vh; left: 9vw"
                              >高</span
                            >
                            <el-input-number
                              class="numberHeight"
                              v-model="HeightX1"
                              :min="0"
                              :max="maxHeight1"
                              label="高度"
                              @change="numChange1"
                            >
                            </el-input-number>
                          </el-form-item>
                        </div>
                      </div>
                    </el-form>

                    <el-form :model="imgForm" v-else-if="tucengFlag === 3">
                      <div class="optionBtns">
                        <!-- 播放时间 -->
                        <div class="playtime">
                          <span class="playTitle">
                            播放时间   (单位：秒)
                          </span>
                          <el-form-item>
                            <!-- <el-input v-model="imgForm.palyTime"></el-input> -->
                            <el-select v-model="imgForm.palyTime" placeholder="请选择" class="playTimes" style="font-family: cursive;">
                                  <el-option
                                    v-for="item in optionsPlaytime"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                              </el-select>
                          </el-form-item>
                        </div>
                        <!-- 播放速度 -->

                        <!-- 显示位置 -->
                        <div class="playposition">
                          <span class="playTitle">
                            显示位置 (单位：像素)
                          </span>
                           <el-form-item>
                            <!-- <el-input v-model="textForm.palyTime"></el-input> -->
                              <el-select v-model="locationSelect" placeholder="请选择" class="playTimes">
                                  <el-option
                                    v-for="item in optionsLocation"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                              </el-select>
                          </el-form-item>
                          <span class="showLocation">
                            显示位置
                          </span>
                          <div class="setUpDown">
                          <el-form-item>
                            <span
                              style="position: absolute; top: 3vh; left: 0vw"
                              >上</span
                            >
                            <el-input-number
                              class="numberLeft"
                              v-model="imgForm.top"
                              :min="0"
                              :max="800"
                              label="上方距离"
                            >
                            </el-input-number>
                          </el-form-item>

                          <el-form-item>
                            <span
                              style="position: absolute; top: 1vh; left: 9vw"
                              >左</span
                            >
                            <el-input-number
                              class="numberTop"
                              v-model="imgForm.left"
                              :min="0"
                              :max="200"
                              label="下方距离"
                            >
                            </el-input-number>
                          </el-form-item>
                          </div>
                        </div>
                        <!-- 显示尺寸 -->
                        <div class="playsize">
                          <span class="showSize">
                            显示尺寸
                          </span>
                          <el-form-item>
                            <span
                              style="position: absolute; top: 1vh; left: 0vw"
                              >宽</span
                            >
                            <el-input-number
                              class="numberWidth"
                              v-model="this.value1.split('*')[1]"
                              label="宽度"
                              :disabled="true"
                            >
                            </el-input-number>
                          </el-form-item>
                          <el-form-item>
                            <span
                              style="position: absolute; top: -1vh; left: 9vw"
                              >高</span
                            >
                            <el-input-number
                              class="numberHeight"
                              v-model="HeightX2"
                              :min="0"
                              :max="maxHeight2"
                              label="高度"
                              @change="numChange2"
                            ></el-input-number>
                          </el-form-item>
                        </div>
                      </div>
                    </el-form>

                    <el-form :model="videoForm" v-else-if="tucengFlag === 1">
                      <div class="optionBtns">
                        <!-- 播放时间 -->
                        <div class="playtime">
                          <span class="playTitle">
                            播放时间   (单位：秒)
                          </span>
                          <el-form-item>
                            <!-- <el-input v-model="videoForm.palyTime"></el-input> -->
                            <el-select v-model="videoForm.palyTime" placeholder="请选择" class="playTimes" style="font-family: cursive;">
                                  <el-option
                                    v-for="item in optionsPlaytime"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                              </el-select>
                          </el-form-item>
                        </div>

                        <!-- 播放速度 -->

                        <!-- 显示位置 -->
                        <div class="playposition">
                          <span class="playTitle">
                            显示位置 (单位：像素)
                          </span>
                          <el-form-item>
                            <!-- <el-input v-model="textForm.palyTime"></el-input> -->
                              <el-select v-model="locationSelect" placeholder="请选择" class="playTimes">
                                  <el-option
                                    v-for="item in optionsLocation"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                              </el-select>
                          </el-form-item>

                          <span class="showLocation">
                            显示位置
                          </span>

                          <div class="setUpDown">
                            <el-form-item>
                            <span
                              style="position: absolute; top: 3vh; left: 0vw"
                              >上</span
                            >
                            <el-input-number
                              class="numberLeft"
                              v-model="videoForm.top"
                              :min="0"
                              :max="800"
                              label="上方距离"
                            ></el-input-number>
                          </el-form-item>

                          <el-form-item>
                            <span
                              style="position: absolute; top: 1vh; left: 9vw"
                              >左</span
                            >
                            <el-input-number
                              class="numberTop"
                              v-model="videoForm.left"
                              :min="0"
                              :max="200"
                              label="下方距离"
                            ></el-input-number>
                          </el-form-item>
                          </div>
                        </div>
                        <!-- 显示尺寸 -->
                        <div class="playsize">
                          <span class="showSize">
                            显示尺寸
                          </span>
                          <el-form-item>
                            <span
                              style="position: absolute; top: 1vh; left: 0vw"
                              >宽</span
                            >
                            <el-input-number
                              class="numberWidth"
                              v-model="this.value1.split('*')[1]"
                              label="宽度"
                              :disabled="true"
                            ></el-input-number>
                          </el-form-item>
                          <el-form-item>
                            <span
                              style="position: absolute; top: -1vh; left: 9vw"
                              >高</span
                            >
                            <el-input-number
                              class="numberHeight"
                              v-model="HeightX3"
                              :min="0"
                              :max="maxHeight3"
                              label="高度"
                              @change="numChange3"
                            >
                            </el-input-number>
                          </el-form-item>
                        </div>
                      </div>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <!-- 策略列表 -->

      <div class="searchLed" v-show="showStategyList">
        <el-input
          v-model="strategyQueryParams.name"
          placeholder="请输入策略名称"
        ></el-input>
        <div
          class="searchLed_btn"
          @click="searchStrategy"
          v-hasPermi="['led:detail:view']"
        >
          <img src="../../../assets/images/button/register-pole.png" alt="" />
          <span>检索</span>
        </div>
        <div class="otherBtn" @click="DialogVisibleFlag = true" v-hasPermi="['led:detail:edit']">
          <img src="../../../assets/images/button/register-pole.png" alt="" />
          <span>添加策略</span>
        </div>
      </div>
      <TableList v-show="showStategyList">
        <template>
          <div class="status-body table-list">
            <el-table
              v-loading="programloading"
              :data="statrgytableData"
              style="width: 100%"
              :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',
              }"
            >
              <!-- <el-table-column
                header-align="center"
                type="selection"
                align="center"
              >
              </el-table-column> -->
              <el-table-column
                header-align="center"
                prop="name"
                label="策略名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="createTime"
                label="创建时间"
                align="center"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="detailList.length"
                label="任务数"
                align="center"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                label="是否启用"
                align="center"
                key="status"
              >
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.status"
                    active-value="1"
                    inactive-value="2"
                    :disabled="scope.row.status === '1' ? false : true"
                    @change="handleStatusChange(scope.row)"
                    v-hasPermi="['led:detail:edit']"
                  ></el-switch>
                </template>
              </el-table-column>
              <!-- <el-table-column
                header-align="center"
                prop="status"
                label="当前状态"
                align="center"
              >
                <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.status === '1'"
                    >启用</el-tag
                  >
                  <el-tag type="danger" v-else>未启用</el-tag>
                  <div v-if="scope.row.status === '1'" class="NowStatus">
                    <img
                      src="../../../assets/images/button/status-online.png"
                      alt=""
                    />
                    <span>在线</span>
                  </div>
                  <div v-else class="NowStatus">
                    <img
                      src="../../../assets/images/button/status-offline.png"
                      alt=""
                    />
                    <span>离线</span>
                  </div>
                </template>
              </el-table-column> -->

              <el-table-column
                header-align="center"
                prop="contorl"
                label="操作"
                align="center"
              >
                <template slot-scope="scope">
                  <el-tooltip
                    v-if="scope.row.status === '2'"
                    class="item"
                    effect="dark"
                    content="点击下发节目"
                    placement="top-start"
                    v-hasPermi="['led:detail:edit']"
                  >
                    <i
                      class="el-icon-monitor pos"
                      style="
                        font-size: 21px;
                        margin-left: 10px;
                        cursor: pointer;
                      "
                      @click="PlayStrtegy(scope.row)"
                      v-hasPermi="['led:detail:edit']"
                    ></i>
                  </el-tooltip>
                  <el-tooltip
                    v-if="scope.row.status === '2'"
                    class="item"
                    effect="dark"
                    content="点击编辑策略"
                    placement="top-start"
                    v-hasPermi="['led:detail:edit']"
                  >
                    <!-- <i class="el-icon-edit" style="
                        font-size: 20px;
                        margin-left: 10px;
                        cursor: pointer;
                      " @click="updateStrtegy(scope.row)" v-hasPermi="['led:detail:edit']"></i> -->
                    <div
                      @click="updateStrtegy(scope.row)"
                      class="editIcon"
                      v-hasPermi="['led:detail:edit']"
                    >
                      <img
                        src="../../../assets/images/edit_icon.png"
                        width="100%"
                      />
                    </div>
                  </el-tooltip>
                  <el-tooltip
                    v-if="scope.row.status === '2'"
                    class="item"
                    effect="dark"
                    content="点击删除"
                    placement="top-start"
                    v-hasPermi="['led:detail:edit']"
                  >
                    <!-- <i
                      class="el-icon-delete"
                      style="
                        font-size: 20px;
                        margin-left: 10px;
                        cursor: pointer;
                      "
                      @click="delStrategy(scope.row)"
                      v-hasPermi="['led:detail:edit']"
                    ></i> -->
                    <div
                      @click="delStrategy(scope.row)"
                      class="deleteIcon"
                      v-hasPermi="['led:detail:edit']"
                    >
                      <img
                        src="../../../assets/images/delete_icon.png"
                        width="100%"
                      />
                    </div>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="点击查看详情"
                    placement="top-start"
                    v-hasPermi="['led:detail:view']"
                  >
                    <!-- <i
                      class="el-icon-view"
                      style="
                        font-size: 20px;
                        margin-left: 10px;
                        cursor: pointer;
                      "
                      @click="gotoStrategyDetail(scope.row)"
                      v-hasPermi="['led:detail:edit']"
                    ></i> -->
                    <div
                      @click="gotoStrategyDetail(scope.row)"
                      class="setting setting_2"
                      v-hasPermi="['led:detail:edit']"
                    >
                      <img
                        src="../../../assets/images/detail_w.png"
                        alt="查看详情"
                        width="100%"
                      />
                    </div>
                  </el-tooltip>

                  <!-- <el-button type="success" >详情</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <pagination
          class="paginationStyle"
          popperClass="ic-pagination"
          :total="strategytotals"
          :page.sync="strategyQueryParams.pageNum"
          :limit.sync="strategyQueryParams.pageSize"
          @pagination="getStrategyList"
        />
      </TableList>

      <!-- 新增策略 -->
      <bigDialog
        title="控制策略"
        :DialogVisibleFlag.sync="DialogVisibleFlag"
        :isShowClose="false"
      >
        <div class="dialogbox">
          <el-form
            :model="ledControlDetail"
            label-width="120px"
            :rules="ledControlRules"
            ref="ledControlDetail"
          >
            <el-form-item label="策略名称:" prop="name">
              <el-input
                v-model="ledControlDetail.name"
                style="width: 500px"
              ></el-input>
            </el-form-item>

            <el-form-item label="绑定设备:">
              <div class="showbackdeptName">
                <el-tag
                  effect="dark" type="success"
                  @close="handleClose1(index)"
                  closable
                  v-for="(item, index) in tmpLedName"
                  :key="index"
                  >{{ tmpLedName[index] }}</el-tag
                >
                  <el-button
                    class="bindDeviceBtn"
                    @click="bindDeviceDialog = true"
                  >绑定设备
                  </el-button>

              </div>
            </el-form-item>

            <el-form-item label="时间类型:">
              <el-checkbox-group v-model="tmpweek">
                <el-checkbox
                  v-for="weekitem in weekData"
                  :key="weekitem.id"
                  :label="weekitem.id"
                  >{{ weekitem.name }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- <i>只能添加五个</i> -->
            <el-button
              @click="addPickerTime"
              v-hasPermi="['led:detail:edit']"
              class="addJob"
              >新增任务</el-button
            >
            <div
              v-for="(item, index) in ledControlDetail.timeAndId"
              :key="index"
              class="timepicker"
            >

              <el-form-item  :label="'时间段' + [index==0 ? '' : (index+1)] +':'">
                <div>
                  <el-time-picker
                    popperClass="ic-pagination"
                    placeholder="起始时间"
                    v-model="item.startTime"
                    value-format="HH:mm"
                    format="HH:mm"
                    :picker-options="{
                      selectableRange: '00:00:00-23:59:00',
                    }"
                  >
                  </el-time-picker>
                  <el-time-picker
                    popperClass="ic-pagination"
                    placeholder="结束时间"
                    v-model="item.endTime"
                    value-format="HH:mm"
                    format="HH:mm"
                    :picker-options="{
                      selectableRange: '00:00:00-23:59:00',
                      minTime: item.startTime,
                    }"
                  >
                  </el-time-picker>

                  <i
                    v-if="index !== 0"
                    class="el-icon-delete"
                    style="
                      font-size: 25px;
                      color: #fff;
                      margin-left: 15px;
                      cursor: pointer;
                    "
                    @click="delPickerTime(item, index)"
                  ></i>
                </div>
                </el-form-item>

              <el-form-item label="节目文件:">
                <el-select
                  popperClass="ic-pagination"
                  v-model="item.programmeId"
                  placeholder="请选择节目文件"
                >
                  <el-option
                    v-for="programItem in allProgramInfo"
                    :key="programItem.id"
                    :label="programItem.name"
                    :value="programItem.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item>
              <div class="footerBtn">
                <span slot="footer" class="dialog-footer celuofooter">
                  <el-button @click="handleDialog"
                             class="bindDeviceBtn"
                    >取 消</el-button
                  >
                  <el-button

                    @click="addStrategyClick(ledControlDetail)"
                    class="bindDeviceBtn"
                    v-hasPermi="['led:detail:edit']"
                    :loading="btnIsLoading"
                    >确 定
                  </el-button>
                </span>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </bigDialog>

      <!-- 绑定设备 -->
      <Dialog
        class="standardDialog"
        title="选择设备"
        :DialogVisibleFlag.sync="bindDeviceDialog"
        :isShowClose="false"
      >
        <div class="right">
          <div class="rightTop"></div>
        </div>
        <div class="classifyTree">
          <TreeList class="classifyTree_tree"></TreeList>
        </div>
        <div class="search">
          <el-input
            v-model="ledQueryParams.componentName"
            placeholder="请输入设备名称"
            clearable
            style="width: 10vw; margin-right: 1vw"
          ></el-input>
          <el-button
            class="searchLed_btn"
            type="primary"
            @click="searchLed"
            v-hasPermi="['led:component:view']"
            >检索</el-button
          >
        </div>
        <div class="rightTable">
          <span class="angle1"></span>
          <span class="angle2"></span>
          <span class="angle3"></span>
          <span class="angle4"></span>
          <div class="tablelist1 table-list">
            <el-table
              style="width: 100%"
              class="statu-body"
              :data="tableData"
              @selection-change="handleBindDeviceChange"
            >
              :header-cell-style="{ background: '#041F37', color: '#0175D4',
              fontSize: '18px', borderBottom: '2px solid #041F37', }" >
              <el-table-column align="center" type="selection">
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="componentName"
                label="设备名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="basicpole.name"
                label="所属灯杆"
                align="center"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="dept.deptName"
                label="所属区域"
                align="center"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="group.name"
                label="分组名称"
                align="center"
              >
              </el-table-column>
              <el-table-column
                header-align="center"
                prop="switchStatus"
                label="屏幕开关"
                align="center"
              >
                <template slot-scope="scope">
                  <el-tag
                    type="success"
                    round
                    v-if="scope.row.switchStatus === '1'"
                    >开</el-tag
                  >
                  <el-tag type="danger" round v-else>关</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="fenye1">
          <pagination
            class="paginationStyle paginationStyle1"
            popperClass="ic-pagination"
            :total="ledtotal"
            :page.sync="ledQueryParams.pageNum"
            :limit.sync="ledQueryParams.pageSize"
            @pagination="getData"
          />
        </div>
        <div class="bigfooterBtn">
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="bindDeviceDialog = false"
              >取 消</el-button
            >
            <el-button type="primary" @click="binddeviceClick">确 定</el-button>
          </span>
        </div>
      </Dialog>

      <!-- 查看策略详情 -->
      <bigDialog
        title="设备详情"
        :DialogVisibleFlag.sync="showStrategyDialog"
        :isShowClose="false"
      >
        <div class="dialogbox">
          <el-form :model="strategyList" label-width="100px">
            <el-form-item label="任务名称:">
              <el-input
                v-model="strategyList.name"
                style="width: 500px"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备名称:">
              <!-- <div style="showbackdeptName" v-for="(item, index) in getStrategyProgram" :key="index">
                <el-input readonly v-model="item.componentName" style="width: 200px">
                </el-input>
              </div> -->
              <div class="showbackdeptName">
                <el-tag
                  effect="dark" type="success"
                  v-for="(item, index) in getStrategyProgram"
                  :key="index"
                  >{{ item.componentName }}</el-tag
                >
              </div>
            </el-form-item>

            <el-form-item label="时间类型:">
              <el-checkbox-group v-model="getweekData">
                <el-checkbox
                  v-for="weekitem in weekData"
                  :key="weekitem.id"
                  :label="weekitem.id"
                  >{{ weekitem.name }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <div v-for="(item, index) in strategyList.detailList" :key="index">
              <el-form-item
                :label="'时间段' + index+1+':'"
                :prop="'timeAdetailListndId.' + index + '.timeValue'"
              >
                <el-time-select placeholder="起始时间" v-model="item.startTime">
                </el-time-select>
                <el-time-select placeholder="结束时间" v-model="item.endTime">
                </el-time-select>
              </el-form-item>
              <el-form-item label="节目文件:">
                <el-select
                  popperClass="ic-pagination"
                  v-model="item.programmeId"
                >
                  <el-option
                    readonly
                    v-for="programItem in ProgramList"
                    :key="programItem.id"
                    :label="programItem.name"
                    :value="programItem.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </bigDialog>

      <!-- 编辑策略 -->
      <bigDialog
        title="编辑策略"
        :DialogVisibleFlag.sync="updateDialogVisibleFlag"
        :isShowClose="false"
      >
        <div class="dialogbox">
          <el-form
            :model="updateledControlDetail"
            label-width="120px"
            :rules="updateledControlDetail"
            ref="updateledControlDetail"
          >
            <el-form-item label="策略名称:" prop="name">
              <el-input
                v-model="updateledControlDetail.name"
                style="width: 500px"
              ></el-input>
            </el-form-item>
            <el-form-item label="绑定设备:">
              <div class="showbackdeptName">
                <!-- <el-row :gutter="10">
                  <el-col :span="10">
                    <div v-for="(item, index) in tmpLedName" :key="index">
                      <el-input type="textarea"
                        autosize readonly v-model="tmpLedName[index]" style="width: 200px">
                      </el-input>

                    </div>

                  </el-col>
                </el-row> -->
                <el-tag
                  @close="handleClose2(index)"
                  closable
                  v-for="(item, index) in getStrategyProgram1"
                  :key="index"
                  effect="dark"
                  type="success"
                >
                  {{ getStrategyProgram1[index] }}
                </el-tag>
                <el-button
                  style="margin-left: 0.2vw"
                  @click="bindDeviceDialog = true"
                  class="bindDeviceBtn"
                  >绑定设备</el-button
                >
              </div>
            </el-form-item>

            <el-form-item label="时间类型:">
              <el-checkbox-group v-model="getweekData">
                <el-checkbox
                  v-for="weekitem in weekData"
                  :key="weekitem.id"
                  :label="weekitem.id"
                  >{{ weekitem.name }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- <i>只能添加五个</i> -->
            <el-button
              @click="addPickerTime1"
              v-hasPermi="['led:detail:edit']"
              class="addJob"
              >新增任务</el-button
            >
            <div
              v-for="(items, index) in updateledControlDetail.timeAndId"
              :key="index"
            >
              <el-form-item :label="'时间段' + index">
                <el-time-picker
                  popperClass="ic-pagination"
                  placeholder="起始时间"
                  v-model="items.startTime"
                  value-format="HH:mm"
                  format="HH:mm"
                  :picker-options="{
                    selectableRange: '00:00:00-23:59:00',
                  }"
                >
                </el-time-picker>
                <el-time-picker
                  popperClass="ic-pagination"
                  placeholder="结束时间"
                  v-model="items.endTime"
                  value-format="HH:mm"
                  format="HH:mm"
                  :picker-options="{
                    selectableRange: '00:00:00-23:59:00',
                  }"
                >
                </el-time-picker>

                <i
                  v-if="index !== 0"
                  class="el-icon-delete"
                  style="
                    font-size: 25px;
                    color: #fff;
                    margin-left: 15px;
                    cursor: pointer;
                  "
                  @click="delPickerTime1(items, index)"
                ></i>
              </el-form-item>
              <el-form-item label="节目文件:">
                <el-select
                  popperClass="ic-pagination"
                  v-model="items.programmeId"
                  placeholder="请选择节目文件"
                >
                  <el-option
                    v-for="programItem in allProgramInfo"
                    :key="programItem.id"
                    :label="programItem.name"
                    :value="programItem.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-form-item>
              <div class="footerBtn">
                <span slot="footer" class="dialog-footer celuofooter">
                  <el-button @click="updateDialogVisibleFlag = false"
                             class="bindDeviceBtn"
                    >取 消</el-button
                  >
                  <el-button
                    @click="updateStrategyClick(ledControlDetail)"
                    v-hasPermi="['led:detail:edit']"
                    :loading="btnIsLoading"
                    class="bindDeviceBtn"
                    >确 定</el-button
                  >
                </span>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </bigDialog>
    </div>

<!--    <GroupOperation-->
<!--      :DialogVisibleFlag.sync="GroupDialog"-->
<!--      class="groupOperation"-->
<!--      :componentType="GroupType"-->
<!--    ></GroupOperation>-->

    <el-dialog
      title="选择设备"
      custom-class="Dialogshebei"
      :visible.sync="ifShowDialog"
      width="30%">
      <el-select
        v-model="ledSheBei" placeholder="请选择预览设备"
        popper-class="shebei-input" filterable
        default-first-option>
        <el-option
          v-for="item in shebeiData"
          :key="item.id"
          :label="item.componentName + '-' + item.screenSize"
          :value="item.config"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
    <el-button @click="ifShowDialog = false">取 消</el-button>
    <el-button type="primary" @click="previewConfim">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      :title="title"
      custom-class="Dialogshebei"
      :visible.sync="GroupDialog"
      width="30%">
      <treeselect popperClass="ic-pagination"  v-model="treemodel" :options="treeData" :show-count="true" placeholder="请选择分组" @select="queryDeptSet" />
      <span slot="footer" class="dialog-footer">
    <el-button @click="GroupDialog = false" type="primary">取 消</el-button>
    <el-button type="primary" @click="closeDialog">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import TreeList from "@/views/led/components/TreeList";
import GoHome from "@/views/components/GoHome";
import LED from "@/assets/images/LED.png";
import TableList from "@/views/led/components/tablelist";
import Map from "@/views/led/components/map";
import littleTree from "@/views/led/components/littleTree";
import {
  getLedList,
  upLoadFiles,
  getResourcess,
  getProgramList,
  addStrategy,
  groupTree,
  getImg,
  getStrategyListData,
  getEditImg,
  getEditVideo,
  editProgram,
  palyProgram,
  resourceGroupdata,
  updateStrategy,
  delStrategydata,
  selectDetailProgram,
  successAudit,
  clearProgram,
  updateProgram,
  getLedDetail,
  deleteProgram,
  proviewClear,
  proviewProgram,
  editTree,
  playProgramDetail
} from "@/api/led/ledApi";

import Dialog from "@/views/components/Dialog";
import markdown from "@/views/led/components/markdown";
import bigDialog from "@/views/led/components/bigDialog";
import draggable from "vuedraggable"; //拖动插件
import ywList from "@/views/components/ywList";
import GroupOperation from "@/views/components/GroupManager";
export default {
  name: "Group",
  components: {
    Treeselect,
    TreeList,
    GoHome,
    TableList,
    littleTree,
    markdown,
    Dialog,
    Map,
    bigDialog,
    draggable,
    ywList,
    GroupOperation,
  },
  data () {
    const data = [];
    return {
      number: 0,
      programId:'',
      ifConfirm: true,
      title:'',
      treemodel:null,
      GroupDialog:false,
      treeData:[],
      queryInfo:{
        groupId:'',
        id:''
      },
      ledparams:{},
      ledCancel: true,
      ifShowDialog:false,
      ledSheBei:'',
      HeightX1: 0,
      HeightX2: 0,
      HeightX3: 0,
      maxHeight1:0,
      maxHeight2:0,
      maxHeight3:0,
      X1:0,
      X2:0,
      X3:0,
      bilu1:0,
      bilu2:0,
      bilu3:0,
      // 上传资源前的分组
      resourceTypeId: "",
      flag: 0,
      ledDetailVisiable: false,
      showLedDetail: true,
      showEditLed: false,
      showStrategy: false,
      showStategyList: false,
      DialogVisibleFlag: false,
      bindDeviceDialog: false,
      showStrategyDialog: false,
      showAreaMap: false,
      showYwList: false,
      showResource: false,
      showReosurceList: false,
      showTreeList: true,
      showResourceClassify: false,
      showAddProgramDIalog: false,
      previewImage: false,
      previewVideo: false,
      isTreeLoading: false,
      beforeSelectGroup: false,
      addProgramName: false,
      isPalyLodaing: false,
      // 判断节目内容的flag
      showtextstyle: false,
      showvideostyle: false,
      showimgstyle: false,
      stratrgyUpdateBtn: false,
      updateDialogVisibleFlag: false,
      resourceLoading: false,
      previewImg: false,
      programloading: false,
      programDetailDialig: false,
      btnIsLoading: false,
      data: JSON.parse(JSON.stringify(data)),
      srcurl: LED,
      tableData: [],
      shebeiData:[],
      getrowdata: [],
      rightShowType: "group",
      // 策略绑定设备的表单数据
      strategyData: [],
      showTableList: true,
      showEditProgram: false,
      statrgytableData: [],
      form: { type: "" },
      markdownValue: "预览文本信息",
      // 策略详情列表  策略编辑列表
      strategyList: {},
      loading: "",
      // 文件上传
      length: 0,
      fileList: [], //文件存储中间量
      resourceList: [],
      addPrograminput: "",
      // 图片预览路径
      Resourceimageurl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      // 视频预览路径
      videoUrl: "",
      // 预览文件类型
      previewType: null,
      playmodelflag: 1,
      tmpweek: [],
      value1:'',
      maxX: 0,
      maxY: 0,
      sizevalue:'200*400',
      iconView:false,
      locationSelect:'',
      ledControlDetail: {
        timeAndId: [
          {
            startTime: null,
            endTime: null,
            programmeId: null,
          },
        ],
        weeks: null,
        ids: null,
      },
      cardno11: [1, 2, 3, 4],
      CardNo: null,
      // 图层列表
      tucengList: [{ name: "文本" }, { name: "视频" }, { name: "图片" }],
      tucengFlag: 2,
      value: "",
      name: null,
      // 选择分组并上传资源
      options: [],
      // 节目编辑的表单
      // 文本
      textForm: {
        screenSize:'',
        layerType: 1,
        id: 11,
        programmeId: null,
        // playTime: 0,
        timeSpan: 60,
        speed: 10,
        content: "",
        width: 200,
        height: 50,
        left: 0,
        top: 0,
        lineHeight: 1.4,
        entryEffect: "None",
        exitEffect: "None",
        entryEffectTimeSpan: 0,
        exitEffectTimeSpan: 0,
        playTime:''
      },
      // 图片
      imgForm: {
        screenSize:'',
        programmeId: null,
        layerType: 2,
        // _type: "Image",
        resourceId: null,
        // playTime: 0,
        timeSpan: 60, //持续显示时长，单位秒
        left: 0, //素材显示的左上角坐标，单位像素
        top: 300,
        width: 200,
        height: 100,
        //进出场特效，特效类型请参考文末
        entryEffect: "None",
        exitEffect: "None",
        //进出场特效时长，单位秒
        entryEffectTimeSpan: 0,
        exitEffectTimeSpan: 0,
        playTime:''
      },
      // 视频
      videoForm: {
        screenSize:'',
        programmeId: null,
        layerType: 3,
        // _type: "Video",
        resourceId: null,
        playTime: 0,
        timeSpan: 60, //持续显示时长，单位秒
        left: 0, //素材显示的左上角坐标，单位像素
        top: 50,
        width: 200,
        height: 250,
        //进出场特效，特效类型请参考文末
        entryEffect: "None",
        exitEffect: "None",
        //进出场特效时长，单位秒
        entryEffectTimeSpan: 0,
        exitEffectTimeSpan: 0,
        playTime:''
      },
      // 节目列表数据
      ProgramList: [{ name: 11 }],

      // -----------------------------分页
      // 设备列表的分页
      ledQueryParams: {
        pageNum: 1,
        pageSize: 10,
        groupId: null,
        deptId: null,
        componentName: null,
      },
      ledtotal: 0,
      // 节目列表的分页
      programQueryParams: {
        pageNum: 1,
        pageSize: 20,
        name: null,
      },
      programtotal: 0,
      // 策略列表的分页
      strategyQueryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
      },
      strategytotals: 0,
      // 资源列表的分页
      resoureQueryParams: {
        pageNum: 1,
        pageSize: 20,
        resourceTypeId: null,
        name: null,
      },
      resouretotal: 0,
      // -----------------------------表单校验
      // 新增节目表单
      ProrgramformRules: {
        name: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
        ],
      },
      // 上传资源分组的校验
      selectGrouprules: {
        region: [{ required: true, message: "请选分组", trigger: "change" }],
      },
      // 新增策略的校验
      ledControlRules: {
        name: [{ required: true, message: "策略不能为空", trigger: "blur" }],
      },
      updateledControlRules: {
        name: [{ required: true, message: "策略不能为空", trigger: "blur" }],
      },

      weekData: [
        { name: "周一", id: 1 },
        { name: "周二", id: 2 },
        { name: "周三", id: 3 },
        { name: "周四", id: 4 },
        { name: "周五", id: 5 },
        { name: "周六", id: 6 },
        { name: "周日", id: 0 },
      ],
      getweekData: [],
      // 新增节目时选择图片与视频的下拉框数据
      EditImg: [],
      EditVideo: [],
      sourceId_img: null,
      sourceId_video: null,
      // test
      id: null,
      baseImg: "",
      //拖拽元素的测试数据
      list: [
        { name: "文本", id: "list1" },
        { name: "视频", id: "list2" },
        { name: "图片", id: "list3" },
      ],
      // 存放绑定设备列表的临时数组
      tmpIds: [],
      // 存放绑定设备名称的临时数组
      tmpLedName: [],

      //存放编辑节目的图片id
      tmpImgIds: null,
      tmpVideo: null,
      // 节目id
      programmeId: null,
      // 编辑节目是实时预览的图片和视频路径
      editVideoUrl: "",
      editImgUrl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",

      // 传参是的大数组
      tmpList: [],

      // 下发节目时临时id
      tmpPlayId: null,

      selectStyle: ["textStyle()", "videoStyle()", "imgStyle()"],
      showStyel: ["showtextstyle", "showvideostyle", "editVideoUrl"],

      // 设备详情的列表
      ledDetailInfo: {
        dept: { deptName: null },
        basicPole: { name: null, address: null },
        group: { name: null },
      },
      ledDetailInfo1: [],

      timeAndProgram: [],
      // 节目周几
      timeweeks: [],
      // 编辑于查看标题的切换
      strategyTitle: null,

      // 富文本编辑器的显示与隐藏
      handleShowMarkdown: true,

      //资源分类树的列表数据
      resourceTreeData: null,

      // 存放策略详情里节目名称的数据
      getStrategyProgram: [],
      getStrategyProgram1: [],

      // 更新策略的表单
      updateledControlDetail: {
        timeAndId: [
          {
            startTime: null,
            endTime: null,
            programmeId: null,
          },
        ],
        name: null,
        controlId: null,
        weeks: null,
        ids: null,
      },

      // 存放完整节目列表
      allProgramInfo: null,

      //截图的数据
      getScreenimg: {
        serverIp: null,
        serverPort: null,
        cardNo: null,
      },

      // 查看设备详情的临时路径
      tmpImgUrl: null,
      tmpVideoUrl: null,
      tmpTextContent: null,
      auditStatus: false,

      optionProps: {
        value: "id",
        label: "label",
        children: "children",
      },
      GroupType: "4",

      //上传进度条
      progressPercent: 0,
      progress: false,

      // 上传时按钮loading
      upLoadBtnLoading: false,
      // 编辑节目保存按键禁用
      btnDisable: false,
      led_size:[],
      maxWidth: 200,
      sizeOpetions:[{value:'200*400',label:'200*400'},{value:'400*800',label:'400*800'},{value:'1620*1080',label:'1620*1080'}],
      optionsPlaytime:[{value:'10', label:'10'},{value:'20', label:'20'},{value:'30', label:'30'}],
      optionsLocation:[{value:'10', label:'10'},{value:'50', label:'50'},{value:'100', label:'100'}]
    };
  },
  filters: {
    resourceSize (value) {
      if (null == value || value == "") {
        return "0 Bytes";
      }
      var unitArr = new Array("B", "KB", "MB");
      var index = 0,
        srcsize = parseFloat(value);
      index = Math.floor(Math.log(srcsize) / Math.log(1024));
      var size = srcsize / Math.pow(1024, index);
      //  保留的小数位数
      size = size.toFixed(2);
      return size + unitArr[index];
    },
  },
  created () {
    // 获取资源分组树
    this.getResourceTree();
    // 获取分组数据
    this.getGroupData();
    // 获取设备列表
    this.getData();
    // 获取策略列表数据
    this.getStrategyList();
    //获取资源列表
    this.getResourceData();
    // 获取节目列表数据
    this.getProgramListData();
    // 获取新增节目时选择视频与图片的数据
    this.getAddImg();
    this.getAddVideo();
    // 获取完整节目列表
    this.getAllProgramList();
    this.getDicts("led_size").then(response => {
      this.led_size = response.data
      console.log(this.led_size)
    });
  },
  methods: {
    queryDeptSet(e){
      this.queryInfo.groupId = e.id
      console.log(this.queryInfo)
    },
    closeDialog(){
      editTree(this.queryInfo).then(res => {
        console.log(res)
        this.getData()
      })
      this.GroupDialog = false
    },
    handleDetail(row){
      this.GroupDialog = true
      this.queryInfo.id = row.id
      this.title = row.componentName
      console.log(row)
    },
    showEditDialog(){
      this.showAddProgramDIalog = true
      this.btnDisable = false
      this.resetEdit();
    },
    handleDialog(){
      this.tmpList = null
      this.DialogVisibleFlag = false
    },
    DeleteProgram(row){
      console.log(row.id)
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type:'warning'
      }).then(res => {
        deleteProgram(row.id).then(res => {
          console.log(res)
          if (res.msg !== '操作成功'){
            this.$message.error(res.msg)
          }
          this.$message.success('删除成功')
          this.getProgramListData()
        })
      })
    },
    getResourceTree () {
      resourceGroupdata().then((res) => {
        console.log("资源分类树-----------------", res);
        this.resourceTreeData = res.data;
      });
    },

    // 获取分组数据
    getGroupData () {
      groupTree().then((res) => {
        if (res.code === 200) {
          console.log(res);
          this.data = res.data;
          console.log(this.data);
        }
      });
    },
    // ---------------------数据的请求
    // 获取资源列表
    getResourceData () {
      this.resourceLoading = true;
      getResourcess(this.resoureQueryParams).then((res) => {
        if (res.code === 200) {
          this.resourceLoading = false;
          this.resourceList = res.rows;
          this.resouretotal = res.total;
          console.log(this.resouretotal);
        }
        console.log("资源列表", res);
      });
    },
    //获取设备列表
    getData () {
      this.loading = true;
      getLedList(this.ledQueryParams).then((res) => {
        console.log("设备列表---", res);
        this.tableData = res.rows;
        this.shebeiData = res.rows
        console.log(this.shebeiData)
        this.ledtotal = res.total;
        this.loading = false;
      });
    },
    // 获取节目列表
    getProgramListData () {
      getProgramList(this.programQueryParams).then((res) => {
        if (res.code === 200) {
          this.ProgramList = res.rows;
          this.programtotal = res.total;
        }
        console.log("节目列表", res);
      });
    },
    // 获取策略列表数据
    getStrategyList () {
      getStrategyListData(this.strategyQueryParams).then((res) => {
        console.log("策略列表", res);
        if (res.code === 200) {
          this.statrgytableData = res.rows;
          this.strategytotals = res.total;
        }
      });
    },

    // ------------------首页按钮点击切换
    handleShowGroup () {
      this.rightShowType = "group";
      this.showEditProgram = false;
      this.showTableList = true;
      this.showStategyList = false;
      this.showAreaMap = false;
      this.showResource = false;
      this.showTreeList = true;
      this.showResourceClassify = false;
      this.showYwList = false;
    },
    handleShowArea () {
      this.rightShowType = "area";
      this.showEditProgram = false;
      this.showTableList = false;
      this.showAreaMap = true;
      this.showStategyList = false;
      this.showResource = false;
      this.showTreeList = true;
      this.showYwList = false;
      this.showResourceClassify = false;
    },
    handleShowProgram () {
      this.rightShowType = "program";
      this.showEditProgram = true;
      this.showTableList = false;
      this.showAreaMap = false;
      this.showStategyList = false;
      this.showResource = false;
      this.showTreeList = true;
      this.showResourceClassify = false;
      this.getAddImg();
      this.getAddVideo();
      this.showYwList = false;
    },
    handleShowStrategy () {
      this.rightShowType = "strategy";
      this.showEditProgram = false;
      this.showTableList = false;
      this.showStategyList = true;
      this.showAreaMap = false;
      this.showResource = false;
      this.showTreeList = true;
      this.showResourceClassify = false;
      this.showYwList = false;
    },
    handleShowResource () {
      this.rightShowType = "resource";
      this.showEditProgram = false;
      this.showTableList = false;
      this.showStategyList = false;
      this.showAreaMap = false;
      this.showResource = true;
      this.showTreeList = false;
      this.showResourceClassify = true;
      this.showYwList = false;
    },
    handleShowyw () {
      this.rightShowType = "yw";
      this.showEditProgram = false;
      this.showTableList = false;
      this.showStategyList = false;
      this.showAreaMap = false;
      this.showResource = false;
      this.showTreeList = true;
      this.showResourceClassify = false;
      this.showYwList = true;
    },
    // 查看详情
    gotoDetail (e) {
      this.baseImg = null;
      let id = e.id;
      console.log(id);
      getLedDetail(id).then((res) => {
        console.log("获取详情+", res);
        if (e.controlId != null) {
          this.timeAndProgram = res.data[0].ledProgramList;
          this.timeweeks = res.data[0].weekFilter.split(",");
          this.timeweeks = this.timeweeks.map(function (item, index, array) {
            return item - 0;
          });
          console.log(this.timeAndProgram);
          console.log(this.timeweeks);
        }
      });
      this.ledDetailInfo = e;
      console.log("led详情", e);
      this.getScreenimg.serverIp = e.serverIp;
      this.getScreenimg.serverPort = e.serverPort;
      this.getScreenimg.cardNo = e.cardNo;
      console.log(this.ledDetailInfo);
      console.log(e);
      this.ledDetailVisiable = true;
    },
    // 点击下发节目
    PlayStrtegy (e) {
      this.programloading = true;
      console.log(e);
      console.log(e.id);
      this.tmpPlayId = e.id;
      palyProgram(this.tmpPlayId).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.programloading = false;
          this.$message.success("节目下发成功！");
          this.getStrategyList();
        }
      },
        err => {
          console.log(err)
          this.programloading = false
        });
    },
    //点击跳转到策略详情界面
    gotoStrategyDetail (e) {
      console.log("策略详情", e);
      this.getweekData = e.dateType.split(",");
      this.getweekData = this.getweekData.map(function (item, index, array) {
        return item - 0;
      });
      console.log(this.getweekData);
      this.getStrategyProgram = e.ledComponentList;
      console.log(this.getStrategyProgram);
      this.strategyList = e;
      this.showStrategyDialog = true;
    },
    //编辑策略
    updateStrtegy (e) {
      console.log(e);
      this.updateledControlDetail.name = e.name;
      this.updateledControlDetail.controlId = e.id;
      this.updateledControlDetail.timeAndId = e.detailList;
      this.updateledControlDetail.ids = e.ledComponentList.map(
        (item) => item.id
      );
      console.log(this.updateledControlDetail.ids);
      this.updateDialogVisibleFlag = true;
      this.getweekData = e.dateType.split(",");
      this.getweekData = this.getweekData.map(function (item, index, array) {
        return item - 0;
      });
      console.log(this.getweekData);
      this.getStrategyProgram1 = e.ledComponentList.map(
        (item) => item.componentName
      );
    },
    // 删除
    delStrategy (e) {
      const id = e.id;
      console.log(id);
      console.log(e);
      this.$confirm('是否删除策略编号为"' + id + '"的数据项？', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delStrategydata(id);
        })
        .then(() => {
          this.getStrategyList();
          this.msgSuccess("删除成功");
        });
    },
    // 添加策略按钮

    //-------编辑节目
    //切换颜色
    changeColor (e, index) {
      console.log(e);
      console.log(index);
      if (e.name === "视频") {
        this.tucengFlag = 1;
        this.showvideostyle = true;
        this.handleShowMarkdown = false;

        console.log("点击了视频");
      } else if (e.name === "文本") {
        this.showtextstyle = true;
        this.tucengFlag = 2;
        this.handleShowMarkdown = true;
        console.log("点击了文本");
      } else {
        this.tucengFlag = 3;
        this.showimgstyle = true;
        console.log("点击了图片");
        this.handleShowMarkdown = false;
      }
      this.flag = index;
    },
    hiddenEditprogram (e) {
      console.log(e + "11111");
      if (e === 1) {
        this.showvideostyle = false;
      } else if (e === 0) {
        this.showtextstyle = false;
      } else if (e === 2) {
        this.showimgstyle = false;
      }
    },
    resetEdit () {
      this.name = null
      this.value1 = ""
      this.showtextstyle = false;
      this.showimgstyle = false;
      this.showvideostyle = false;
      this.editVideoUrl = "";
      this.editImgUrl = "";
      this.markdownValue = "预览文本信息";
      this.sourceId_img = null;
      this.sourceId_video = null;
      if (this.textForm.content !== ""){
        let content = ""
        this.$bus.$emit("clearContent", content);
      }
    },

    // 获取富文本编辑器文字
    getContent (content) {
      console.log(content)
      this.markdownValue = content;
      this.textForm.content = this.markdownValue;
    },
    success (res, file, fileList) { },

    // 文件上传
    uploadFile (param) {
      this.upLoadBtnLoading = true;
      this.progressPercent = 0;
      const uploadProgressEvent = (progressEvent) => {
        this.progressPercent = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
      };
      this.progress = true;
      console.log(param);
      //  console.log(param.file);
      let formData = new FormData();
      if (this.fileList.length > 0) {
        console.log("fileList+++", this.fileList);
        this.fileList.forEach((file) => {
          formData.append("files", file);
          formData.append("resourceTypeId", this.resourceTypeId);
          param.file.md5 = "md555555555555";
        });
        if (formData.getAll("files").length == this.length && this.length > 0) {
          //	调接口
          console.log("上传接口调用参数", formData);
          upLoadFiles(formData, uploadProgressEvent)
            .then((res) => {
              this.progress = false;
              this.$message.success("文件上传成功！");
              this.upLoadBtnLoading = false;
              this.fileList = [];
              this.beforeSelectGroup = false;
              this.getResourceData();
            })
            .catch(() => {
              this.upLoadBtnLoading = false;
              this.fileList = [];
              this.progress = false;
            });
        }
      }
    },

    change () {
      //判断上传文件数量
      this.length = document.querySelector("input[type=file]").files.length;
      if (this.length > 0) {
        Array.from(document.querySelector("input[type=file]").files).forEach(
          (file) => {
            if (this.fileList.indexOf(file) == -1) {
              this.fileList.push(file);
            }
          }
        );
      }
      return false;
    },

    // 跳转到编辑节目的详情界面
    gotoEditProgram (e) {
      this.textForm.programmeId = e.id;
      this.imgForm.programmeId = e.id;
      this.videoForm.programmeId = e.id;
      console.log("编辑节目", e);
      this.showAddProgramDIalog = true;
      this.btnDisable = false;
    },

    // 查看节目详情
    gotoDetailProgram (e) {
      console.log("节目详情", e);
      this.programId = e.id
      this.auditStatus = e.status;
      let programmeId = e.id;
      this.programmeId = e.id;
      selectDetailProgram(programmeId).then((res) => {
        console.log("点击后显示节目详情", res);
        this.programDetailDialig = true;
        if (res.code === 200) {
          this.tmpTextContent = res.data[0].content;
          this.tmpImgUrl = res.data[1].ledResource.url;
          this.tmpVideoUrl = res.data[2].ledResource.url;
        }
        console.log(this.tmpTextContent, this.tmpImgUrl, this.tmpVideoUrl);
      });
    },
    // 通过审核
    auditsuccess () {
      console.log(this.programmeId);
      successAudit(this.programmeId).then((res) => {
        if (res.code === 200) {
          this.$message.success("审核成功");
          this.programDetailDialig = false;

          this.getProgramListData();
          this.getAllProgramList();
        }
      });
    },
    // 关闭弹框清空数据
    restProgramDetail () {
      this.tmpTextContent = "";
      this.tmpImgUrl = "";
      this.tmpVideoUrl = "";
    },

    // 预览的按钮
    previewResource (e) {
      console.log("资源预览", e);
      this.previewType = e.fileExt.toLowerCase();
      if (e.fileExt === ".mp4") {
        this.videoUrl = e.url;
        this.previewVideo = true;
      } else {
        this.Resourceimageurl = e.url;
        this.previewImage = true;
      }
    },
    // 预览图片失败
    previewerror (e) {
      console.log(e);
      this.Resourceimageurl =
        "https://wx2.sinaimg.cn/images/default_d_w_mw1024.gif#101";
    },

    // 关闭video节目的预览
    closePreviewVideo () {
      this.previewVideo = false;
      this.videoUrl = "";
      this.previewImage = false;
    },

    // 关闭预览的按钮
    hiddenPreviewImg (e) {
      var e = document.getElementById("previewimgid");
      if (e) {
        if (!e.contains(e.target)) {
          this.previewImage = false;
        }
      }
    },

    // 控制节目的播放模式
    modeFlagsNow () {
      this.playNowflag = false;
      this.playDelayflag = true;
    },
    modeFlagsDelay () {
      this.playNowflag = true;
      this.playDelayflag = false;
    },

    // 新增策略时点击增加与删除时间段

    addPickerTime () {
      if (this.ledControlDetail.timeAndId.length < 6) {
        this.ledControlDetail.timeAndId.push({
          // timeValue: "",
        });
      } else {
        this.$message.error("只能添加5个！");
      }
    },
    delPickerTime (item, index) {
      this.ledControlDetail.timeAndId.splice(index, 1);
    },
    addPickerTime1 () {
      console.log(this.updateledControlDetail.timeAndId.length);
      if (this.updateledControlDetail.timeAndId.length < 6) {
        this.updateledControlDetail.timeAndId.push({
          timeValue: "",
        });
      } else {
        this.$message.error("只能添加5个！");
      }
    },
    delPickerTime1 (item, index) {
      this.updateledControlDetail.timeAndId.splice(index, 1);
    },

    // 添加策略的点击事件
    addStrategyClick (ledControlDetail) {
      this.btnIsLoading = true;
      this.$refs.ledControlDetail.validate((valid) => {
        if (valid) {
          this.ledControlDetail.weeks = this.tmpweek.toString();
          this.CardNo = this.cardno11.toString();
          // this.TimeProgram = this.timeAndId.toString();
          if (this.ledControlDetail.ids === null) {
            this.$message.error("请至少绑定一个设备");
            this.btnIsLoading = false;
          } else if (this.ledControlDetail.weeks === "") {
            this.$message.error("请选择日期");
            this.btnIsLoading = false;
          } else if (
            this.ledControlDetail.timeAndId[0].programmeId === null ||
            this.ledControlDetail.timeAndId[0].startTime === null ||
            this.ledControlDetail.timeAndId[0].endtTime === null
          ) {
            this.$message.error("请至少选择一个时间段和节目");
            this.btnIsLoading = false;
          } else {
            console.log("新增策略的表单", this.ledControlDetail);
            addStrategy(this.ledControlDetail).then((res) => {
              console.log("新增策略的表单", this.ledControlDetail);
              console.log(res);
              if (res.code === 200) {
                this.$message.success("新增策略成功！");
                this.getStrategyList();
                this.DialogVisibleFlag = false;
                this.btnIsLoading = false;
                this.ledControlDetail = {
                  timeAndId: [
                    {
                      startTime: null,
                      endTime: null,
                      programmeId: null,
                    },
                  ],
                  weeks: null,
                  ids: null,
                };
                this.tmpIds = [];
                this.tmpLedName = null;
                this.tmpweek = [];
              }
            });
          }
        } else {
          console.log("error");
          return false;
        }
      });
    },
    // 预览节目
    previewProgramok(){
      if (this.name === null) {
        this.$message.error("请输入节目名称");
        this.btnDisable = false;
      } else{
        this.ifShowDialog = true
      }
    },
    previewClear(){
      console.log(this.ledparams)
      proviewClear(this.ledparams).then(res => {
        console.log(res)
        this.$message.success('取消成功')
        this.ledCancel = true
          this.ifConfirm = true
      },
      err => {
        this.$message.success('取消失败')
      })
    },
    previewConfim1(){
      this.ifShowDialog = true
      this.number = 1
      console.log(this.programId)
    },
    previewConfim(){
      this.tmpList = []
      let config = (this.ledSheBei).replace(/'/g, '"')
      let tmpconfig = JSON.parse(config)
      let cardNo ,ip ,port
      tmpconfig.forEach( item => {
        if (item.Tname === 'cardNo'){
          cardNo = item.Tvalue
        }else if(item.Tname === 'serverIp'){
          ip = item.Tvalue
        }else if(item.Tname === 'serverPort'){
          port = item.Tvalue
        }
      })
      this.ledparams = {
        ip : ip,
        port :port,
        cardNo :cardNo
      }
      if (this.number === 1){
        let params = {
          ip : this.ledparams.ip,
          port : this.ledparams.port,
          cardNo : this.ledparams.cardNo,
          id : this.programId
        }
        playProgramDetail(params).then(res => {
          console.log(res)
          this.$message.success('预览成功')
          this.ifConfirm = false
        },err => {
          console.log(err)
          this.$message.error('预览失败')
        })
        this.ifShowDialog = false
      }
      console.log(cardNo ,ip , port)
      this.textForm.screenSize = this.value1
      this.textForm.name = this.name;
      this.imgForm.name = this.name;
      this.videoForm.name = this.name;

      const textForm1 =  this.textForm
      textForm1.width = this.value1.split('*')[1]
      textForm1.height = this.HeightX1
      textForm1.textName = 'SingleText'
      textForm1.sourceId = '文本'
      textForm1.cardNo = cardNo
      textForm1.ip = ip
      textForm1.port = port
      console.log(textForm1)

      const imgForm1 =  this.imgForm
      imgForm1.width = this.value1.split('*')[1]
      imgForm1.height =this.HeightX2
      imgForm1.picName = this.sourceId_img.id
      imgForm1.sourceId = this.sourceId_img.id
      imgForm1.size = this.sourceId_img.size
      imgForm1.fileExt = this.sourceId_img.fileExt
      imgForm1.md5 = this.sourceId_img.md5
      imgForm1.mime = this.sourceId_img.mime
      imgForm1.url = this.editImgUrl
      console.log(imgForm1.url)

      const videoForm1 =  this.videoForm
      videoForm1.width = this.value1.split('*')[1]
      videoForm1.height =this.HeightX3
      videoForm1.videoName = this.sourceId_video.id
      videoForm1.sourceId = this.sourceId_video.id
      videoForm1.md5 = this.sourceId_video.md5
      videoForm1.fileExt = this.sourceId_video.fileExt
      videoForm1.size = this.sourceId_video.size
      videoForm1.mime = this.sourceId_video.mime
      videoForm1.url = this.editVideoUrl
      console.log(this.sourceId_video)
      this.tmpList.push(textForm1);
      this.tmpList.push(imgForm1);
      this.tmpList.push(videoForm1);
      console.log(this.tmpList);
      proviewProgram(this.tmpList).then(res => {
        console.log(res)
        this.$message.success('预播成功')
        this.ledCancel = false
        this.ifShowDialog = false
      },
      err => {
        this.$message.error('预播失败')
      })
    },
    // 保存编辑好的节目
    editProgramok () {
      this.tmpList = []
      console.log(this.value1)
      this.textForm.screenSize = this.value1
      this.btnDisable = true;
      this.textForm.name = this.name;
      this.imgForm.name = this.name;
      this.videoForm.name = this.name;

      const textForm1 =  this.textForm
      textForm1.width = this.value1.split('*')[1]
      textForm1.height = this.HeightX1

      const imgForm1 =  this.imgForm
      imgForm1.width = this.value1.split('*')[1]
      imgForm1.height =this.HeightX2

      const videoForm1 =  this.videoForm
      videoForm1.width = this.value1.split('*')[1]
      videoForm1.height =this.HeightX3

      this.tmpList.push(textForm1);
      this.tmpList.push(imgForm1);
      this.tmpList.push(videoForm1);
      console.log(this.tmpList);
      if (this.name === null) {
        this.$message.error("请输入节目名称");
        this.btnDisable = false;
      } else {
        if (this.textForm.programmeId != null) {
          updateProgram(this.tmpList).then((res) => {
            if (res.code === 200) {
              this.name = null;
              this.$message.success("编辑节目成功！");
              this.showAddProgramDIalog = false;
              // this.btnDisable=false;
              this.getAllProgramList();
              this.getProgramListData();
            }
            this.btnDisable = false;
          });
        } else {
          editProgram(this.tmpList).then((res) => {
            console.log(res);
            if (res.code === 200) {
              this.name = null;
              this.$message.success("新增节目成功！");
              this.showAddProgramDIalog = false;
              // this.btnDisable=false;
              this.getProgramListData();
              this.getAllProgramList();
              this.resetEdit();
            }
            this.btnDisable = false;
            this.resetEdit();
          });
        }

      }
    },

    handleChangeleft (e) {
      console.log(e);
    },

    // 获取屏幕截图
    getLedImg () {
      this.previewImg = true;
      getImg(this.getScreenimg).then((res) => {
        console.log(res);
        if (res.code === 200) {
          if (res.msg === null) {
            this.previewImg = false;
            this.$message.error("获取截图失败");
          } else {
            this.previewImg = false;
            this.baseImg = "data:image/png;base64," + res.msg;
            console.log("图图图");
            console.log(res.msg);
          }
        }
      });
    },

    // 新增节目时选择图片的列表
    getAddImg () {
      getEditImg().then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.EditImg = res.data;
        }
      });
    },
    // 改变选择的事件
    imgchange (event) {
      console.log(event);
      this.editImgUrl = event.url;
      this.imgForm.resourceId = event.sourcesId;
    },
    // 新增节目是选择视频的列表
    getAddVideo () {
      getEditVideo().then((res) => {
        if (res.code === 200) {
          this.EditVideo = res.data;
        }
        console.log(res);
      });
    },
    // 改变视频的事件
    videochange (e) {
      this.editVideoUrl = e.url;
      this.videoForm.resourceId = e.sourcesId;
    },

    //拖拽事件
    end (e) {
      console.log(this.list[0]);
      if (this.list[0].id === "list1" && this.list[1].id === "list2") {
        console.log("文本，视频，图片");
        this.textForm.top = 0;
        this.videoForm.top = this.textForm.height;
        this.imgForm.top = this.textForm.height + this.videoForm.height;
      } else if (this.list[0].id === "list2" && this.list[1].id === "list1") {
        console.log("视频，文本，图片");
        this.textForm.top = this.videoForm.height;
        this.videoForm.top = 0;
        this.imgForm.top = this.textForm.height + this.videoForm.height;
      } else if (this.list[0].id === "list1" && this.list[1].id === "list3") {
        console.log("文本，图片，视频");
        this.textForm.top = 0;
        this.videoForm.top = this.textForm.height + this.videoForm.height;
        this.imgForm.top = this.textForm.height;
      } else if (this.list[0].id === "list2" && this.list[1].id === "list3") {
        console.log("视频，图片，文本");
        this.videoForm.top = 0;
        this.imgForm.top = this.this.videoForm.height;
        this.textForm.top = this.this.videoForm.height + this.videoForm.height;
      } else if (this.list[0].id === "list3" && this.list[1].id === "list1") {
        console.log("图片，文本，视频");
        this.imgForm.top = 0;
        this.textForm.top = this.imgForm.height;
        this.videoForm.top = this.imgForm.height + this.textForm.height;
      } else if (this.list[0].id === "list2" && this.list[1].id === "list3") {
        console.log("图片，视频，文本");
        this.imgForm.top = 0;
        this.videoForm.top = this.imgForm.height;
        this.textForm.top = this.imgForm.height + this.videoForm.height;
      }
    },

    // 策略中绑定设备时列表多选框事件
    handleBindDeviceChange (e) {
      console.log(e);
      this.tmpIds = e.map((item) => item.id);
      console.log(this.tmpIds);
      this.tmpLedName = e.map((item) => item.componentName);
      console.log(this.tmpLedName);
      this.getStrategyProgram1 = e.map((item) => item.componentName);
      console.log(this.getStrategyProgram1);
    },

    // 点击确定把选中的id传入到表单中
    binddeviceClick () {
      this.ledControlDetail.ids = this.tmpIds.toString();
      this.updateledControlDetail.ids = this.tmpIds.toString();
      console.log(this.ledControlDetail.ids);
      this.bindDeviceDialog = false;
    },

    updateStrategyClick () {
      this.btnIsLoading = false;
      this.updateledControlDetail.weeks = this.getweekData.toString();
      this.updateledControlDetail.ids =
        this.updateledControlDetail.ids.toString();
      if (this.updateledControlDetail.ids === null) {
        this.$message.error("请至少绑定一个设备");
        this.btnIsLoading = false;
      } else if (
        this.updateledControlDetail.timeAndId[0].programmeId === null ||
        this.updateledControlDetail.timeAndId[0].startTime === null ||
        this.updateledControlDetail.timeAndId[0].endtTime === null
      ) {
        this.$message.error("请至少选择一个时间段和节目");
        this.btnIsLoading = false;
      } else {
        updateStrategy(this.updateledControlDetail).then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.$message.success("修改策略成功！");
            this.updateDialogVisibleFlag = false;
            this.btnIsLoading = false;
            this.getStrategyList();
          }
        });
        this.tmpLedName = []
        console.log(this.updateledControlDetail);
      }
      console.log(this.updateledControlDetail);
    },

    // 新增策略获取完整的节目列表
    getAllProgramList () {
      let tmpstatus = {
        status: "2",
      };
      getProgramList(tmpstatus).then((res) => {
        this.allProgramInfo = res.rows;
      });
    },

    // 上传资源前选择分组
    resourceChange (e) {
      console.log("监听资源分组的变化", e);
      this.resourceTypeId = e[e.length - 1];
      console.log(this.resourceTypeId);
    },

    // 切换策略状态
    handleStatusChange (row) {
      console.log(row);
      let id = row.id;
      let text = row.status === "1" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.name + '"的策略吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return clearProgram(id);
        })
        .then(() => {
          this.msgSuccess(text + "成功");
        })
        .catch(function () {
          row.status = row.status === "1" ? "2" : "1";
        });
    },

    //led检索
    searchLed () {
      console.log(this.ledQueryParams);
      getLedList(this.ledQueryParams).then((res) => {
        console.log("led检索表单", res);
        this.tableData = res.rows;
        this.ledtotal = res.total;
      });
    },
    // 节目检索
    searchProgram () {
      getProgramList(this.programQueryParams).then((res) => {
        if (res.code === 200) {
          this.ProgramList = res.rows;
          this.programtotal = res.total;
        }
      });
    },
    // 策略检索
    searchStrategy () {
      getStrategyListData(this.strategyQueryParams).then((res) => {
        if (res.code === 200) {
          this.statrgytableData = res.rows;
          this.strategytotals = res.total;
        }
      });
    },
    //资源检索
    searchResource () {
      getResourcess(this.resoureQueryParams).then((res) => {
        if (res.code === 200) {
          this.resourceList = res.rows;
          this.resouretotal = res.total;
        }
      });
    },
    //分组管理dialog
    handleGroupDialog () {
      console.log(this.GroupDialog);
      this.GroupDialog = true;
    },
    //
    handleClose1 (index) {
      this.tmpLedName.splice(index, 1);
      this.tmpIds.splice(index, 1);
      //
    },
    handleClose2 (index) {
      this.tmpIds.splice(index, 1);
      this.getStrategyProgram1.splice(index, 1);
    },
     dropdownChange(sizevalue){
       this.textForm.height = 50
       this.imgForm.height = 100
       this.videoForm.height = 250
       this.HeightX1 = this.value1.split('*')[0]/8
       this.maxHeight1= this.value1.split('*')[0]/8
       this.HeightX2 = this.value1.split('*')[0]/4
       this.maxHeight2 = this.value1.split('*')[0]/4
       this.HeightX3 = this.value1.split('*')[0]*0.625
       this.maxHeight3 = this.value1.split('*')[0]*0.625
       this.videoForm.top =  this.HeightX1
       this.imgForm.top = this.HeightX1 + this.HeightX3
       this.X1 = this.maxHeight1
       this.X2 = this.maxHeight2
       this.X3 = this.maxHeight3
       this.sizevalue= sizevalue;
       console.log(this.sizevalue)
       if (this.sizevalue === '256*128'){
         this.bilu3 = 1.56
       }else if (this.sizevalue === '768*384'){
         this.bilu3 = 0.52
       }else if(this.sizevalue === '1280*640'){
         this.bilu3 = 0.31
       }
    },
    numChange1(e){
      let multiple
      if(e < this.X1){
        multiple = this.X1 - e
        this.textForm.height = this.textForm.height - this.bilu3 * multiple
      }else {
        multiple = e - this.X1
        this.textForm.height = this.textForm.height + this.bilu3 * multiple
      }
      this.videoForm.top = this.HeightX1
      this.imgForm.top = this.HeightX1 + this.HeightX3
      this.X1 = e
    },
    numChange2(e){
      let multiple
      if(e < this.X2){
        multiple = this.X2 - e
        this.imgForm.height = this.imgForm.height - this.bilu3 * multiple
      }else {
        multiple = e - this.X2
        this.imgForm.height = this.imgForm.height + this.bilu3 * multiple
      }
      this.X2 = e
    },
    numChange3(e){
      let multiple
      if(e < this.X3){
        multiple = this.X3 - e
        this.videoForm.height = this.videoForm.height - this.bilu3 * multiple
      }else {
        multiple = e - this.X3
        this.videoForm.height = this.videoForm.height + this.bilu3 * multiple
      }
      this.imgForm.top = this.HeightX1 + this.HeightX3
      this.X3 = e
    }
  },
  mounted () {
    this.$bus.$on('ledTreeData',res => {
      this.treeData = res
    })
    this.$bus.$on("groupId", (res) => {
      this.ledQueryParams.groupId = res;
      this.getData();
    });
    this.$bus.$on("deptId", (res) => {
      this.ledQueryParams.deptId = res;
      console.log(this.ledQueryParams);
      this.getData();
    });
    this.$bus.$on("littlegroupmessage", (res) => {
      this.resoureQueryParams.resourceTypeId = res;
      this.getResourceData();
    });
  },
  watch: {},
  computed: {
    textStyle () {
      console.log();
      return function () {
        return {
          width: this.textForm.width * 2.5 + "px",
          height: this.textForm.height * 1.5 + "px",
        };
      };
    },
    videoStyle () {
      return function () {
        return {
          width: this.videoForm.width * 2.5 + "px",
          height: this.videoForm.height * 1.5 + "px",
        };
      };
    },
    imgStyle () {
      return function () {
        return {
          width: this.imgForm.width * 2.5 + "px",
          height: this.imgForm.height * 1.5 + "px",
        };
      };
    },
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/poleIndex.scss';
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
.group ::v-deep .Dialogshebei{
  position: relative;
  top:30%;
  background-color: rgb(4,42,78) !important;
  .el-dialog__title{
    color: white !important;
  }
}
.changeupbtns4{
  position: absolute;
  left: 4%;
  top: 1.35%;
}
.changeupbtns3{
  position: absolute;
  left: 14%;
  top: 1.35%;
}
.deleteBtn{
  font-size: 1.5em;
  position: relative;
  left:12%;
  margin-bottom: 0.7vh;
  cursor: pointer;
}

.celuofooter{
  button{
  //  background-color: rgb(24,144,225) !important;
  }
}
.bindDeviceBtn{
  background: no-repeat url('../../../assets/images/button/lianjietest.png');
  background-size: 100% 100%
}
.addJob:hover{
  color: #018397;
}
.bindDeviceBtn:hover{
  color: #018397;
}
img {
  pointer-events: none;
}

.group {
  color: white;
  width: 100%;
  height: calc(100% - 14.8vh);
  display: flex;

  .group-header {
    position: absolute;
    z-index: 1000;
  }

  .group-right {
    padding: 0 1vw 1vh 0;
    width: 71.5vw;
    height: 85.5vh;
    position: relative;

    .group-right-button {
      border-left: 3px solid rgba(4, 111, 148, 1);
      position: absolute;
      top: 1.4%;
      left: -9.3%;
      width: 80%;
      overflow: hidden;
      z-index: 1000;

      &::after {
        content: '';
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
        border: 3px solid rgba(4, 111, 148, 1);
        transform: skew(35deg);
        outline: none;
        color: white;
        font-size: 1.3em;
        width: 7.2vw;
        height: 5vh;

        &:first-child {
          width: 9vw;
          margin-left: -30px;
          padding-left: 30px;
        }

        &:last-child {
          margin-left: -4px;
        }

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

    // img {
    //   position: absolute;
    //   pointer-events: none;
    //   width: 98.2%;
    //   height: 94%;
    //   z-index: 10;
    // }
  }
}
.status-body {
  position: relative;
  width: 74vw;
  height: 64vh;
  top: 4%;
  left: 0.4%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// 设备详情
.leftcontainer {
  width: 19vw;
  height: 64vh;

  background: no-repeat url('../../../assets/images/led_bg.png') center;
  background-size: 99% 99%;
  position: absolute;
  top: 10vh;
  left: 3vw;
  // 左边预览图
  .previewimages {
    position: absolute;
   // clip: rect(0 324px 573px 0);
    clip: rect(0 404px 700px 0);
    width: 110vw;
    // top: 2.3vh;
    top: 3.8vh;
    height: 108vh;
    // left: 2vw;
    left: 1.5vw;
    img{
      margin-left:0.3vw;
      height: 52%;
      width: auto;
    }
  }
}
.rightcontainer {
  .Angle1 {
    width: 3.5vw;
    height: 7vh;
    position: absolute;
    border-top: 3px solid #00f5f8;
    border-right: 3px solid #00f5f8;
    top: 11.6vh;
    left: 60.7vw;
  }
  .Angle2 {
    width: 3.5vw;
    height: 7vh;
    position: absolute;
    border-bottom: 3px solid #00f5f8;
    border-left: 3px solid #00f5f8;
    top: 66.4vh;
    left: 22.8vw;
  }
  .rightbox {
    .ledDetail {
      width: 48vw;
      height: 61vh;
      display: flex;
      justify-content: center;
      overflow-y: auto;
      .ledDetail_program {
        color: #1890ff;
        font-size: 1.2em;
      }
    }
    width: 41vw;
    height: 61vh;
    position: absolute;
    border: 3px solid #2b66af;
    top: 12vh;
    left: 23vw;
  }
  .controlStrategy {
    .controlStrategy_btns {
      height: 3vh;
      .controlStrategy_btns_change {
        position: absolute;
        border: 2px solid #034376;
        background-color: #04579a;
        top: 1vh;
        left: 2vw;
        color: #fff;
      }
    }
  }
}

// 区域地图
.areaMap {
  position: absolute;
  background: no-repeat url('../../../assets/images/new_tableBG.png');
  background-size: 98% 99%;
  width: 80vw;
  height: 79.8vh;
  top: 4.3vh;
  left: -6.85vw;

  .areaMap_box {
    width: 73.9vw;
    height: 64vh;
    border: 2px solid #017caa;
    position: absolute;
    top: 8vh;
    left: 2.5vw;
    overflow: hidden;
  }
}

// 添加节目的输入框
.addPrograminputclass {
  position: absolute;
  width: 10vw;
  top: 14vh;
  left: 3vw;
  z-index: 1111;
  color: aliceblue;
}

// 编辑节目
.addPrograminput {
  position: absolute;
  width: 15vw;
  top: 3%;
  left: 20vw;
  z-index: 111;
}
.DropDown {
  position: absolute;
  width: 9.6%;
  top: 3%;
  left: 56%;

}

.editProgram_box {
  position: absolute;
  width: 64.5vw;
  height: 63.8vh;
  top: 9.5vh;
  left: 1.7vw;
  overflow-y: scroll;
  // 左侧按钮
  .editProgram_innerbox {
    max-height: 60vh;
    .changeupbtns {
      background-color: transparent;
      color: #fff;
      border: 2px solid #0275d4;
      border-radius: 30px;
      font-size: 14px;
    }
    .changeupbtns1 {
      color: #0073ff;
    }
    .changeupbtns2 {
      background: url('../../../assets/images/button/btn-detail.png') no-repeat;
      background-size: 120% 120%;
      background-position: 50% 50%;
    }
    .leftupBtns {
      position: absolute;
      top: 1vh;
      left: 52vw;
    }
    // 右侧按钮
    .rightupBtns {
      position: absolute;
      top: 1vh;
      left: 16vw;
    }

    // 下放内容框
    .downBox {
      // 左边
      .downbox_left {
        border-top: 3px solid #0073ff;
        position: absolute;
        width: 14vw;
        height: 55vh;
        top: 6vh;
        left: 1vw;
        .tuceng {
          height: 4vh;
          width: 14vw;
          position: absolute;
          top: 0vh;
          left: 0vw;
          background-color: #0E355D;
          color: aliceblue;
          padding-left: 1vw;
          line-height: 4vh;
          font-size: 1.5em;
            .tucengLocation{
              position: absolute;
              top: 6%;
              left: 23%;
              font-family: serif;
          }
        }

        .downbox_left_text {
          position: relative;
          border-top: 2px solid #0D5593;
          top: 4vh;
          background-color: #154273;
          // opacity: 0.6;
          display: flex;
          height: 5vh;
          line-height: 5vh;
          flex-direction: row;
          justify-content: space-between;
            span{
              position: absolute;
              color: #fff;
              font-size: 16px;
              line-height: 5vh;
              left: 26%;
              top: 0%;
              font-family: serif
            }
           .el-icon-success{
            //  position: absolute;
            //  top: 10%;
            //  left: 0%;
            //  font-size: 20px;
            padding-left:44px;
                          line-height: 50px;
                          cursor: pointer;
                          color: #fff;
                          font-size: 20px;
           }
            .el-icon-error{

              padding-right: 10px;
                          line-height: 50px;
                          cursor: pointer;
                          color: #fff;
                          font-size: 20px;


            }
          // & > i {
          //   & > span {
          //     margin-left: 3vw;
          //     line-height: 5vh;
          //     color: aliceblue;
          //     font-size: 16px;
          //   }
          // }
          .activecolor {
            color: #1CBFE1;
            font-size: 20px;

          }
        }
        .ishide {
          display: none;
        }

        .downbox_left_text:visited .ishide {
          display: block;
        }
        .ischange {
           .el-icon-success{
             color:#1CBFE1;
          }
        }
      }
      .downbox_mid {
        border-top: 3px solid #0073ff;
        border-bottom: 1px solid transparent;
        position: absolute;
        background-color: #2A66AF;
        width: 26vw;
        height: 64vh;
        top: 6vh;
        left: 16vw;
        .draggable_list {
          position: absolute;
        }
        .previewprogram {
          height: 4vh;
          width: 500px;
          position: absolute;
          color: aliceblue;
          left: 0vw;
          background-color: #0f345b;
          padding-left: 1vw;
          line-height: 4vh;
          font-size: 1.5em;
        }
        .programView{
          position: absolute;
          top: 5%;
          left: 13%;
          font-family: serif
        }

        .mid_text {
          word-break: break-all;
          word-wrap: break-word;
          overflow-y: auto;
          overflow: hidden;
          & > span {
            line-height: 16vh;
            height: 16vh;
            color: #ffffff;
          }
        }

        .mid_img {
          .mid_img_img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .downbox_right {
        border-top: 3px solid #0073ff;
        position: absolute;
        width: 19vw;
        height: 86vh;
        top: 6vh;
        left: 43vw;
        .tcsetting {
          height: 4vh;
          width: 19vw;
          position: absolute;
          color: aliceblue;
          left: 0vw;
          background-color: #0f345b;
          padding-left: 2vw;
          line-height: 4vh;
          font-size: 1.5em;
        }
        .tucengSet{
          position: absolute;
          top: 8%;
          left: 23%;
          font-family: serif
        }
        .downbox_right_container {
          position: absolute;
          width: 19vw;
          border: 2px solid #0057a4;
          height: 56vh;
          top: 4vh;
          .markdownbox {
            position: absolute;
            width: 18.8vw;
            top: 0vh;
            left: 0vw;
          }
          .selectresource {
            position: relative;
            height: 8vw;
            width: 18.8vw;
            border-bottom: 3px solid #0057a4;
            .selectresource_btn {
              position: relative;
              top: 5vh;
              left: 5vw;
              color: aliceblue;
              background: transparent;
              border: 2px solid #0057a4;
            }
            .selectresource_res {
              position: absolute;
              top: 5vh;
              left: 3.5vw;
            }
          }
          .optionBtns {
            .playtime {
              color: #fff;
              position: absolute;
              top: 16vh;
              left: 0vw;
              width: 9vw;
              font-family: serif;
              & > el-input {
                background-color: transparent;
              }
            }
            .playposition {
              color: #fff;
              position: absolute;
              top: 24vh;
              left: 0vw;
              width: 10vw;
              font-family: serif;
              .numberLeft {
                position: absolute;
                top: 3vh;
                width: 7vw;
                left: 1vw;
              }
              .numberTop {
                position: absolute;
                top: 1vh;
                width: 7vw;
                left: 10vw;
              }
              .playinput {
                position: absolute;
                margin-left: 2vw;
              }
            }
            .playsize {
              color: #fff;
              position: absolute;
              top: 43vh;
              left: 0.5vw;
              width: 9vw;
              .numberWidth {
                position: absolute;
                top: 1vh;
                width: 7vw;
                left: 1vw;
              }
              .numberHeight {
                position: absolute;
                top: -1vh;
                width: 7vw;
                left: 10vw;
              }
              .playinput {
                position: absolute;
                margin-left: 2vw;
              }
            }
            .inplay {
              color: #fff;
              position: absolute;
              top: 41vh;
              left: 1vw;
              width: 7vw;
            }
            .outplay {
              color: #fff;
              position: absolute;
              top: 41vh;
              left: 9vw;
              width: 7vw;
            }
            .inplaytime {
              color: #fff;
              position: absolute;
              top: 49vh;
              left: 1vw;
              width: 7vw;
            }
            .outplaytime {
              color: #fff;
              position: absolute;
              top: 49vh;
              left: 9vw;
              width: 7vw;
            }
          }
        }
      }
    }
  }
}

// 策略列表
.strategyList {
  position: absolute;
  background: no-repeat url('../../../assets/images/new_tableBG.png');
  background-size: 98% 99%;
  width: 71.5vw;
  height: 70.8vh;
  top: 11.5vh;
  left: 0.7vw;
  .strategyList_box {
    position: absolute;
    border: 2px solid #036d91;
    width: 66.5vw;
    height: 62.8vh;
    top: 2.5vh;
    left: 1.7vw;
  }
}

// 上传前选择下拉列表
.beforeselectGroup {
  position: absolute;
  top: 5vh;
  left: 1vw;
}

.groupDialog {
  ::v-deep .el-dialog__body {
    height: 14vh;
  }
}
.upload-demo {
  position: absolute;
  left: 15vw;
  top: 9vh;
  width: 13vw;
  height: 11vh;
  .progressClass {
    width: 13vw;
    position: relative;
    top: 4vh;
  }
  ::v-deep .el-upload-list {
    margin-top: 5vh;
  }
  .uploadFileBtn {
    position: absolute;
    top: 0vh;
    left: 0vw;
  }
}

// 策略弹框里新增任务的按钮
.addJob {
  max-height: 4vh;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  margin-bottom: 1vh;
  left: 6.3vw;
  //border: 2px solid #0275d4;
  color: #0275d4;
  background-size: 100% 100%;
  background: no-repeat url('../../../assets/images/button/lianjietest.png');
  span{
    position: relative;
    top:10%
  }
}

.dialogbox {
  position: absolute;
  top: 11vh;
  left: 10vw;
  height: 63vh;
  width: 45vw;
  overflow-y: auto;
  .showbackdeptName {
    width: 34vw;
    max-height: 4vh;
    overflow: hidden;
    overflow-y: auto;
  }
  .bindDevice {
    position: absolute;
    top: 1vh;
    left: 21vw;
    z-index: 11111;
  }
  .el-form-item__label {
    font-size: 1.3em;
    line-height: 20px;
  }
  .dialogbox_form {
    position: absolute;
    top: 2vh;
    left: 5vw;
  }
}
.footerBtn {
  position: relative;
  top: 4vh;
  left: 23vw;
}
.bigfooterBtn {
  position: absolute;
  top: 64vh;
  left: 55vw;
}
.classifyTree {
  position: absolute;
  // border: 1px solid;
  // top: 2vh;
  // width: 23vw;
  // height: 75vh;
  // left: 1vw;
  top: 9vh;
  width: 24vw;
  height: 68vh;
  left: 2vw;
  overflow: hidden;
  ::v-deep .custom-tree-container {
    // width: 18vw;
    // top: 32vh;
    // left: 11vw;
    // height: 51vh;
    width: 16vw;
    top: 26vh;
    left: 9vw;
    height: 46vh;
    // ::v-deep .tree-list .group-left-img{
    //   margin-top:7vh ;
    //   width: 66% !important;
    //   height: 66% !important;
    //   left: -2% !important;
    // }
  }
  // ::v-deep .

  .classifyTree_tree {
    width: 114%;
    height: 100%;
  }
}

.rightTable {
  position: absolute;
  left: 22vw;
  top: 15vh;
  width: 42.3vw;
  height: 48.5vh;
  border: 2px solid #055a8a;
  overflow-y: auto;
  .angle1 {
    width: 3.5vw;
    height: 7vh;
    position: absolute;
    border-bottom: 3px solid #009dd1;
    border-left: 3px solid #009dd1;
    top: 41vh;
    left: -0.2vw;
  }
  .angle2 {
    width: 3.5vw;
    height: 7vh;
    position: absolute;
    border-top: 3px solid #009dd1;
    border-left: 3px solid #009dd1;
    top: -0.6vh;
    left: -0.2vw;
  }
  .angle3 {
    width: 3.5vw;
    height: 7vh;
    position: absolute;
    border-top: 3px solid #009dd1;
    border-right: 3px solid #009dd1;
    top: -0.6vh;
    left: 37.5vw;
  }
  .angle4 {
    width: 3.5vw;
    height: 7vh;
    position: absolute;
    border-bottom: 3px solid #009dd1;
    border-right: 3px solid #009dd1;
    top: 41vh;
    left: 38.5vw;
  }
}
.search {
  position: absolute;
  top: 9vh;
  left: 46vw;
  z-index: 111;
  .searchBtn {
    color: aliceblue;
    border: 1px solid #04579a;
    background-color: #04579a;
    margin-left: 1vw;
  }
  .el-select .el-input__inner {
    background-color: transparent;
  }
}
.fenye1 {
  position: absolute;
  top: 65vh;
  left: 37vw;
}
// 关闭图表
.closeVideo {
  position: absolute;
  top: 0vh;
  left: 31vw;
  font-size: 55px;
  font-weight: bold;
  color: black;
  z-index: 22222222;
  cursor: pointer;
}
// 预览图片
.previewImage {
  position: absolute;
  width: 31vw;
  height: 36vh;
  top: -6vh;
  left: 15vw;
  z-index: 1111111;
}

//预览视频
.previewVideo {
  position: absolute;
  top: -7vh;
  left: 14vw;
  width: 35vw;
  height: 36vh;
  z-index: 11111111;
  .resourcepreviewvideo {
    width: 100%;
  }
}

.playMode {
  position: absolute;
  top: 12vh;
  left: 22vw;
}
.playMode_btns {
  border: 2px solid #0275d4;
  color: #0275d4;
  background-color: transparent;
  z-index: 11;
}
.searchLed {
  display: flex;
  width: 13vw;
  height: 10vh;
  position: absolute;
  top: 7.5vh;
  left: 0vw;
  z-index: 111;

  .searchLed_btn {
    cursor: pointer;
    position: absolute;
    top: -5%;
    left: 28vh;
    img {
      position: relative;
      width: 4vw;
      height: 4.3vh;
      top: 1%;
    }
    span {
      position: absolute;
      top: 21%;
      left: 26%;
      font-size: 1.2em;
      z-index: 11;
    }
  }
  .otherBtn {
    cursor: pointer;
    position: absolute;
    top: -5%;
    left: 36vh;
    img {
      position: relative;
      width: 6vw;
      height: 4.3vh;
      top: 1%;
    }
    span {
      position: absolute;
      top: 21%;
      left: 19%;
      font-size: 1.2em;
      z-index: 11;
    }
  }
}
// 点击截图
.clickGetImg {
  position: absolute;
  top: -5vh;
  left: 1vw;
  z-index: 1111111111111111111;
}
// 详情显示故障报警
.showMalfunctions {
  position: absolute;
  top: -5vh;
  left: 28vw;
  z-index: 111111111;
  & > span {
    color: red;
    font-size: 1.5em;
    font-weight: bold;
  }
}

.list {
  position: relative;
  border: 1px solid red;
  top: 4vh;
  height: 70px;
}
.listdataaaa {
  position: relative;
  top: 4vh;
  background-color: skyblue;
  overflow: hidden;
  .imagesize {
    width: 100%;
    height: 100%;
  }
  .mid_video_video {
    width: 100%;
    height: 100%;
  }
}

.table-list .el-table,
.tablelist .el-table,
.tablebox .el-table {
  overflow-y: auto;
}

.el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.6);
}
.lookProgramDetail {
  .auditBtn {
    position: relative;
    top: -6vh;
    left: 18vw;
  }
  .auditBtn1 {
    position: relative;
    top: -6vh;
    left: 18vw;
  }
  .auditBtn2 {
    position: relative;
    top: -6vh;
    left: 18vw;
  }
  .detailText {
    position: relative;
    left: 4vw;
    top: -4vh;
    background-color: #009dd1;
    line-height: 5vw;
    font-size: 22px;
    width: 80vh;
    height: 6vw;
  }
  .detailVideo {
    top: -4vh;
    position: relative;
    left: 4vw;
    width: 80vh;
    height: 22vw;
    .detailVideo_video {
      width: 100%;
    }
  }
  .detailImg {
    position: relative;
    top: -4vh;
    left: 4vw;
    width: 80vh;
    height: 10vw;
    .detailImg_img {
      width: 100%;
      height: 100%;
    }
  }
}

.group ::v-deep .el-dialog__headerbtn {
  top: 1%;
}
::v-deep .el-dialog__header,
::v-deep .el-dialog__body {
  background-color: #052846;
}

::v-deep .el-dialog__title {
  color: #fff;
  font-size: 1.5em;
}
::v-deep .el-dialog__headerbtn {
  font-size: 1.5em;
}

::v-deep .pagination-container {
  margin-top: 6px;
  width: 10vw;
}
::v-deep .el-pagination__jump,
::v-deep .el-pagination__total,
::v-deep .el-form-item__label {
  color: white;
  font-size: 1.3em;
  font-weight: 520;
}
::v-deep .el-pagination {
  right: -30vw;
  top: 3vh;
  .btn-next{
    border: 1px solid #018397;
  }
}
.ywList {
  position: absolute;
  top: 9vh;
  left: 3.4vw;
  width: 79vw;
  ::v-deep .el-table {
    width: 73.5vw;
    height: 63.5vh;
  }
  ::v-deep .table-list,
  ::v-deep .table-list-body {
    height: 64vh;
}
  ::v-deep .el-pagination {
    right: -28vw;
    top: 1.5vh;

  }
}
.el-table {
  font-size: 15px;
}

.groupOperation {
  ::v-deep .Tree-box .tree-list .group-left-img {
    margin-top: 12vh;
  }
  ::v-deep .el-dialog__header,
  ::v-deep .el-dialog__body {
    background-color: transparent;
  }
  ::v-deep .el-dialog__title {
    color: #fff;
    font-size: 1.5em;
  }
  ::v-deep .el-pagination {
    top: 1vh;
    left: 1%;
  }
  ::v-deep .label {
    margin-right: 10vw;
    width: 95px;
  }
}
::v-deep .tablelist {
  width: 115.5%;
  left: -4vw;
}
::v-deep .rightTable1 .tablelist {
  width: 100%;
}
// .arrow {
//   //font-size: 0;
//   margin-right: 10px;
//   span {
//     display: inline-block;
//   }
//   span::before,
//   span::after {
//     content: '';
//     display: block;
//     background-color: #0e66ae;
//     width: 12px;
//     height: 4px;
//   }
//   span::before {
//     transform: rotate(45deg) translateY(-3px) skew(-45deg);
//   }
//   span::after {
//     transform: rotate(-45deg) translateY(3px) skew(45deg);
//   }
// }
.arrow{
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
  transform: skew(-45deg);
  :nth-child(2){
    opacity: 0.5;
  }
  :nth-child(3){
    opacity: 0.3;
  }
}
.standardDialog {
  ::v-deep .el-dialog__body,
  ::v-deep .el-dialog__header {
    background-color: transparent !important;
  }
  ::v-deep .el-pagination {
    right: -25vw;
    top: -1vh;
  }
}
::v-deep .el-switch__label {
  color: #fff;
}
::v-deep .dialog-close {
  top: 7% ;
  right: 0 ;
}
::v-deep .ywpagination {
  position: relative;
  left: 31vw;
  top: -3vh;
  z-index: 111;
}

.ledStatus {
  img {
    position: absolute;
    top: 15%;
    left: 32%;
  }
  span {
    position: absolute;
    top: 22%;
    left: 41%;
    font-size: 1em;
  }
}

.ledSwitch {
  img {
    position: absolute;
    top: 15%;
    left: 32%;
  }
  span {
    position: absolute;
    top: 24%;
    left: 47%;
    font-size: 1em;
  }
  cursor: pointer;
}
// .setting{
//   img{
//     width: 12%;
//     cursor: pointer;
//   }
// }

.setting {
  width: 16%;
  cursor: pointer;
  position: absolute;
  left: 44%;
  top: 26%;
}
.setting3 {
  width: 20%;
  cursor: pointer;
  position: absolute;
  left: 60%;
  top: 20%;
}
.setting_1 {
  width: 8%;
  left: 46%;
  top:20%
}
.add {
  width: 9%;
  margin-left: 15px;
}
.zhuce {
  position: absolute;
  margin-right: 2%;
  width: 9%;
  left: 39%;
  top: 27%;
  cursor: pointer;
}
.zhuce1 {
  // font-size: 20px;
  margin-left: 2%;
  position: absolute;
  width: 10%;
  left: 57%;
  top: 22%;
  cursor: pointer;
}
.shebeiStatus {
  span {
    position: absolute;
    top: 25%;
    left: 42%;
  }
}
.NowStatus {
  margin-top: 4px;
  span {
    position: absolute;
    top: 26%;
    left: 44%;
  }
}
.pos {
  position: absolute;
  left: 15%;
  top: 31%;
}
.editIcon {
  position: absolute;
  width: 9%;
  left: 33%;
  top: 28%;
  cursor: pointer;
}
.deleteIcon {
  position: absolute;
  width: 10%;
  left: 57%;
  top: 20%;
  cursor: pointer;
}
.setting_2 {
  font-size: 21px;
  width: 10%;
  left: 45%;
  top: 28%;
}
.paginationStyle1 {
  right: 19vw;
}
::v-deep .el-input__inner {
  border: 1px solid #0082ec;
}
.playTimes{
  width: 17.7vw;
}
::v-deep .el-form-item{
  margin-top: 10px;
  //margin-bottom: 10px;
}
.playTitle{
  margin-left: 3%;
  margin-top: 5%;
  font-family: cursive;
  font-size: larger;
}
.showLocation{
  position: absolute;
   top: 107%;
    left: 17%;
    font-family: cursive;
    font-size: larger;
}
.showSize{
    position: absolute;
    top: 1%;
    left: 13%;
    font-family: cursive;
    font-size: larger;
}
.setUpDown{
   position: absolute;
    top: 86%;
    left: 5%;
}
// ::v-deep .el-input__inner{
//   position: absolute;
//   top: 1.3vh;
// }
// ::v-deep .el-select{
//   top:-3vh
// }
// ::v-deep .el-input__suffix{
//     top:30px
// }
// ::v-deep .el-row{
//   // margin-bottom:0vh !important;
// }
::v-deep .dialog-table-box .dialog-table-title{
  margin-top: 4vh;
  position: relative;
  left: 3vw;
  // margin-right:10vw ;
  // div{
  //   margin-right:1vw ;
  //   margin-left:1.3vw ;
  // }
}
::v-deep .el-checkbox{
      color: white;
}
::v-deep .vue-treeselect{
  border: 2px solid rgb(1,67,145);
  border-radius:10px;
}

</style>
