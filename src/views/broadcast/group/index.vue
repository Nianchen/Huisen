<template>
  <div class="group">
    <GoHome title="广播音柱" class="group-header"></GoHome>
    <TreeList></TreeList>
    <div class="group-right">
      <div class="group-right-button">
        <button :class="rightShowType === 'group' ? 'button-active' : ''" v-on:click="handleShowGroup">
          <span>设备</span>
        </button>
        <button :class="rightShowType === 'area' ? 'button-active' : ''" v-on:click="handleShowArea">
          <span>地图</span>
        </button>
        <button :class="rightShowType === 'strategy' ? 'button-active' : ''" v-on:click="handleShowStrategy">
          <span>策略</span>
        </button>
        <button :class="rightShowType === 'resource' ? 'button-active' : ''" v-on:click="handleShowResource">
          <span>资源</span>
        </button>
        <button :class="rightShowType === 'yw' ? 'button-active' : ''" v-on:click="handleShowYw">
          <span>故障报警</span>
        </button>
      </div>
      <TableList v-show="showYwList">
        <ywList class="ywList" :type="'5'" />
      </TableList>
      <!-- 区域地图 -->
      <div class="areaMap" v-show="showAreaMap">
        <div class="areaMap_box">
          <Map />
        </div>
      </div>
      <!-- 设备详情 -->
      <Dialog title="设备详情" :DialogVisibleFlag.sync="detailDeviceDialog" :isShowClose="false" class="dialog-opt-detail">
        <div class="broadcastmodel">
        </div>
        <div class="right">
          <div class="rightbox">
            <!-- 详情 -->
            <!-- <div class="showMalfunctions">
              <span>故障/离线</span>
            </div> -->
            <div class="rightbox_detail">
              <div class="table-list dialog-table-box" style="width: 80%">
                <el-form ref="form" :model="broadCastDetailData" label-width="auto">
                  <el-row>
                    <el-col class="dialog-table-title" :span="24">
                      <!-- <div class="arrow">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div> -->
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
                      <el-form-item label="所属区域:">
                        <!-- <el-input readonly v-model="broadCastDetailData.dept.deptName"></el-input> -->
                        <div style="font-size:18px;color:white">{{broadCastDetailData.dept.deptName}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="服务器IP:">
                        <!-- <el-input readonly v-model="config.serverIp"></el-input> -->
                        <div style="font-size:18px;color:white">{{config.serverIp}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="所在位置:">
                        <!-- <el-input readonly v-model="broadCastDetailData.basicPole.address"></el-input> -->
                        <div style="font-size:18px;color:white">{{broadCastDetailData.basicPole.address}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="所属灯杆:">
                        <!-- <el-input readonly v-model="broadCastDetailData.basicPole.name"></el-input> -->
                        <div style="font-size:18px;color:white">{{broadCastDetailData.basicPole.name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col class="dialog-table-title">
                      <!-- <div class="arrow">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div> -->
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
                        <!-- <el-input readonly v-model="broadCastDetailData.broadcastName"></el-input> -->
                        <div style="font-size:18px;color:white">{{broadCastDetailData.broadcastName}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="所属分组:">
                        <!-- <el-input readonly v-model="broadCastDetailData.group.name"></el-input> -->
                        <div style="font-size:18px;color:white">{{broadCastDetailData.group.name}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="IP地址:">
                        <!-- <el-input readonly v-model="broadCastDetailData.ip"></el-input> -->
                        <div style="font-size:18px;color:white">{{broadCastDetailData.ip}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="端口:">
                        <!-- <el-input readonly v-model="config.port"></el-input> -->
                        <div style="font-size:18px;color:white">{{config.port}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="型号:">
                        <!-- <el-input readonly v-model="config.brandModel"></el-input> -->
                        <div style="font-size:18px;color:white">{{config.brandModel}}</div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="厂商:">
                        <!-- <el-input readonly v-model="config.brandName"></el-input> -->
                        <div style="font-size:18px;color:white">{{config.brandName}}</div>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="开关状态">
                        <!-- <el-input readonly v-model="ledDetailInfo.serverIp"></el-input> -->
                        <el-switch v-model="broadCastDetailData.status" disabled active-text="开" inactive-text="关" active-value="1"
                          inactive-value="0"></el-switch>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- <el-row :gutter="30" v-if="this.acceptData.controlId===null">
                    <el-col :span="12">
                      <el-form-item label="策略">
                        <el-input readonly value="暂无策略"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="30" v-if="this.acceptData.controlId!==null">
                    <el-col :span="24">
                      <el-form-item label="策略名称">
                        // <el-input readonly v-model="ledDetailInfo.serverIp"></el-input>
                        <el-input readonly v-model="bcDetailStrategy.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30" v-if="this.acceptData.controlId!==null">
                    <el-col :span="24">
                      <el-form-item label="策略时间">
                      //   <el-input readonly v-model="ledDetailInfo.serverIp"></el-input>
                        <el-checkbox-group v-model="tmpweek">
                          <el-checkbox v-for="weekitem in weekData" :key="weekitem.id" :label="weekitem.id">{{ weekitem.name }}</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="30" v-if="this.acceptData.controlId!==null">
                    <el-col :span="12">
                      <el-form-item label="开始时间">
                        <el-input readonly v-model="bcDetailStrategy.startDate"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="结束时间">
                        <el-input readonly v-model="bcDetailStrategy.endDate"></el-input>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row :gutter="30" v-if="this.acceptData.controlId!==null">
                    <el-col :span="24">
                      <el-form-item label="音乐文件">
                        <el-select popperClass="ic-pagination" disabled multiple v-model="bcDetailStrategy.tmpAudio" placeholder="请选择节目文件"
                          style="width:29vw">
                          <el-option v-for="musicdata in MusicListData" :key="musicdata.audioId" :label="musicdata.audioName"
                            :value="musicdata.audioId">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row> -->
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <!-- 音乐列表 -->
     <el-upload class="upload-demo" :action="uploadURL" :before-upload="beforeAvatarUpload" :headers="{ Authorization: this.token }"
        :on-success="handleMusicSuccess"  :file-list="fileList" multiple>
        <el-button class="addResource" v-show="showRsource">
          <span>上传文件</span>
          </el-button>
      </el-upload>
      <div class="searchBroadcast" v-show="showRsource">
        <el-input v-model="searchFrom.audioname" placeholder="请输入音乐名称" clearable></el-input>
        <div class="searchBC_btn" @click="searchMusic" v-hasPermi="['broadcast:component:edit']">
          <img src="../../../assets/images/button/register-pole.png" alt="">
          <span>检索</span>
        </div>
      </div>
      <TableList v-show="showRsource">
        <template>
          <div class="status-body table-list">
            <el-table :data="
                MusicListData.slice(
                  (MusicPageNum - 1) * MusicPageSize,
                  MusicPageNum * MusicPageSize
                )
              " style="width: 95%" :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',
              }">
              <el-table-column prop="audioName" label="歌曲名称" align="center">
              </el-table-column>
              <el-table-column prop="duration" label="音乐时长" align="center">
                <template slot-scope="scope">{{
                  scope.row.duration | TimeFormat
                }}</template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="200px">
                <template slot-scope="scope">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="点击播放"
                    placement="top-start">
                    <div class="bofang">
                      <span @click="musicPlay(scope.row)">
                        <el-button size="mini" type="primary">试听</el-button>
<!--                        <img :src="stopbo" v-if="scope.row.success === true">-->
<!--                        <img :src="startbo" v-elif="scope.row.success !== true">-->
                      </span>
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <el-pagination class="musicPagination" popperClass="ic-pagination" :current-page.sync="MusicPageNum" :page-sizes="[10,15,20]"
          :page-size.sync="MusicPageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </TableList>

      <!-- 设备列表 -->
      <!-- 设备列表的查询功能 -->
      <div class="searchBroadcast" v-show="showTableList">

      <el-input v-model="broadQueryParams.broadcastName" placeholder="请输入设备名称" clearable></el-input>
          <!-- <el-button class="searchBC_btn" type="primary" @click="searchBc" v-hasPermi="['broadcast:component:view']"> 检索 </el-button>
        <el-button type="primary" :style="{
          'background-color': '#1a8cf5',
          border: '1px solid #1a8cf5',
        }" class="otherBtn" @click="handleGroupDialog">分组管理</el-button> -->
        <div class="searchBC_btn" @click="searchBc" v-hasPermi="['broadcast:component:view']">
          <img src="../../../assets/images/button/register-pole.png" alt="">
          <span>检索</span>
        </div>
        <!-- <div class="otherBtn"  @click="handleGroupDialog">
          <img src="../../../assets/images/button/register-pole.png" alt="">
          <span>分组管理</span>
        </div> -->
      </div>
      <TableList v-show="showTableList">
        <template>
          <div class="status-body table-list">
            <el-table v-loading="loading" :data="tableData" style="width: 95%" :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',
             }">
              <!-- <el-table-column header-align="center" type="selection" align="center">
              </el-table-column> -->
              <el-table-column header-align="center" prop="broadcastName" label="设备名称" align="center">
              </el-table-column>
              <el-table-column header-align="center" prop="basicPole.name" label="灯杆名称" align="center">
              </el-table-column>
              <el-table-column header-align="center" prop="dept.deptName" label="所属区域" align="center">
              </el-table-column>
              <el-table-column header-align="center" prop="group.name" label="所属分组" align="center">
              </el-table-column>
              <el-table-column header-align="center" prop="status" label="在线状态" align="center">
                <template slot-scope="scope">
                  <!-- <el-tag type="success" v-if="scope.row.status === '1'">在线</el-tag> -->
                  <!-- <el-tag type="danger" v-if="scope.row.status === '2'">离线</el-tag>
                  <el-tag type="warning" v-if="scope.row.status === '3'">故障</el-tag>
                  <el-tag type="warning" v-if="scope.row.status === '99'">任务中</el-tag> -->
                  <div v-if="scope.row.status === '1'" class="broadcast-btn">
                    <img src="@/assets/images/button/status-online.png" alt="">
                    <span>在线</span>
                  </div>
                  <div v-if="scope.row.status === '2'" class="broadcast-btn">
                    <img src="@/assets/images/button/status-offline.png" alt="">
                    <span>离线</span>
                  </div>
                  <div v-if="scope.row.status === '3'" class="broadcast-btn">
                    <img src="@/assets/images/button/status-fault.png" alt="">
                    <span>故障</span>
                  </div>
                  <div v-if="scope.row.status === '99'" class="broadcast-btn">
                    <img src="@/assets/images/button/status-online.png" alt="">
                    <span>任务中</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="contorl" label="操作" align="center">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="查看详情" placement="top-start" v-hasPermi="['broadcast:component:view']">
                    <div class="broadcast-opt" @click="gotoDetail(scope.row)">
                      <img src="@/assets/images/detail_w.png" alt="">
                    </div>
                  </el-tooltip>

                  <el-tooltip class="item" effect="dark" content="管理分组" placement="top-start" v-hasPermi="['broadcast:component:edit']">
                    <div class="broadcast-opt2" @click="handleShow(scope.row)">
                      <img src="../../../assets/images/guanli.png" alt="">
                    </div>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <pagination popperClass="ic-pagination"  :total="broadcasttotal" :page.sync="broadQueryParams.pageNum"
          :limit.sync="broadQueryParams.pageSize" @pagination="getBroacCastListData" />
      </TableList>

      <!-- 策略列表 -->

      <div class="searchBroadcast" v-show="showStategyList">
        <el-input v-model="searchStrategyForm.name" placeholder="请输入策略名称" clearable></el-input>

       <div class="searchBC_btn" @click="searchStrategy" v-hasPermi="['broadcast:control:view']">
          <img src="../../../assets/images/button/register-pole.png" alt="">
          <span>检索</span>
        </div>
        <div class="otherBtn"  @click="DialogVisibleFlag = true" v-hasPermi="['broadcast:control:edit']">
          <img src="../../../assets/images/button/register-pole.png" alt="">
          <span>添加策略</span>
        </div>
        <!-- 策略模块主体部分 -->
      </div>
      <!-- 表格组件，里面设置了一个插槽，用来在父组件中存放数据 -->
      <TableList v-show="showStategyList">
        <template>
          <div class="status-body table-list">
            <el-table :data="statrgytableData" style="width: 95%" :header-cell-style="{
                color: '#0175D4',
                fontSize: '20px',
              }">
              <!-- <el-table-column header-align="center" type="selection" align="center">
              </el-table-column> -->
              <el-table-column header-align="center" prop="name" label="策略名称" align="center">
              </el-table-column>
              <el-table-column header-align="center" prop="createTime" label="创建时间" align="center">
              </el-table-column>

              <el-table-column header-align="center" label="播放模式" align="center">
                <template slot-scope="scope">
                  {{
                    scope.row.playMode === "normal_mode"
                      ? "顺序播放"
                      : "循环播放"
                  }}
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="volume" label="音量" align="center">
                <template slot-scope="scope">
                  <el-input-number class="yinliang" v-model="scope.row.volume" size="mini" :disabled="scope.row.status==='0'?false:true"
                    @change="handleVolumeChange(scope.row)" :min="0" :max="100" :step="5">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="状态" align="center" key="status">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" @change="handleStatusChange(scope.row)"></el-switch>
                </template>
              </el-table-column>
              <el-table-column header-align="center" prop="status" label="是否启用" align="center">
                <template slot-scope="scope">
                  <!-- <el-tag style="cursor: pointer" type="success" v-if="scope.row.status === '0'">执行中</el-tag>
                  <el-tag style="cursor: pointer" type="danger" v-else>未执行</el-tag> -->
                  <div v-if="scope.row.status === '0'" class="broadcast-btn">
                    <img src="@/assets/images/button/status-online.png" alt="">
                    <span class="celue">执行中</span>
                  </div>
                  <div v-else class="broadcast-btn">
                    <img src="@/assets/images/button/status-fault.png" alt="">
                    <span class="celue">未执行</span>
                  </div>
                </template>
              </el-table-column>
              <!-- 三个操作按钮 -->
              <el-table-column header-align="center" prop="contorl" label="操作" align="center">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="点击编辑" placement="top-start" v-if="scope.row.status != '0'" v-hasPermi="['broadcast:control:edit']">
                    <i class="el-icon-edit" style="
                        font-size: 25px;
                        margin-left: 10px;
                        cursor: pointer;
                      " @click="updateStrategy(scope.row)"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="点击删除" placement="top-start" v-if="scope.row.status !='0'" v-hasPermi="['broadcast:control:edit']">
                    <i class="el-icon-delete" style="
                        font-size: 25px;
                        margin-left: 10px;
                        cursor: pointer;
                      " @click="deleteStrategy(scope.row)"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="点击查看详情" placement="top-start" v-else v-hasPermi="['broadcast:control:view']">
                    <!-- <i class="el-icon-view" style="
                        font-size: 20px;
                        margin-left: 10px;
                        cursor: pointer;
                      " @click="gotoStrategyDetail(scope.row)"></i> -->
                    <div class="broadcast-opt" @click="gotoStrategyDetail(scope.row)">
                      <img src="@/assets/images/detail_w.png" alt="">
                    </div>
                  </el-tooltip>
                  <!-- <el-button type="success" >详情</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <pagination class="paginationStyle" popperClass="ic-pagination"  :total="strategytotal"
          :page.sync="strategyQueryParams.pageNum" :limit.sync="strategyQueryParams.pageSize" @pagination="getStrategyList" />
      </TableList>
      <!-- 新增策略 -->
      <bigDialog title="控制策略" :DialogVisibleFlag.sync="DialogVisibleFlag" :isShowClose="false">
        <!-- v-show="playNowflag" -->
        <div class="dialogbox">
          <el-form :model="delayPlayForm" :rules="broadcastRules" ref="delayPlayForm" label-width="120px">
            <el-form-item label="策略名称:" prop="name">
              <el-input class="inputKzcl" v-model="delayPlayForm.name" style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="生效策略:">
              <el-tag @close="handleClose1(index)" type="success" effect="dark" closable v-for="(item, index) in tmpBroadcastName" :key="index">{{tmpBroadcastName[index]}}
              </el-tag>
                <el-button class="bindDevicebtn" style="margin-left:0.2vw" @click="bindDeviceDialog=true">绑定设备</el-button>
            </el-form-item>
            <el-form-item label="时间类型:">
              <el-checkbox-group v-model="tmpweek">
                <el-checkbox v-for="weekitem in weekData" :key="weekitem.id" :label="weekitem.id">{{ weekitem.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="播放方式:" prop="playMode">
              <el-radio-group v-model="delayPlayForm.playMode">
                <el-radio v-for="item in howplayMode" :key="item.value" :label="item.value">{{ item.name }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="音量:" prop="volume">
              <el-slider style="width: 400px" v-model="delayPlayForm.volume"></el-slider>
            </el-form-item>

            <el-form-item label="时间段:">
              <el-time-picker class="inputKzcl" popperClass="ic-pagination" placeholder="起始时间" v-model="delayPlayForm.startDate" format="HH:mm" value-format="HH:mm"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:00',
                }">
              </el-time-picker>
              <el-time-picker class="inputKzcl" popperClass="ic-pagination" placeholder="结束时间" v-model="delayPlayForm.endDate" format="HH:mm" value-format="HH:mm"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:00',
                }">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="节目文件:">
              <div class="optionKzcl">
                <el-select  filterable popperClass="ic-pagination" multiple  v-model="tmpAudio" @change="onSelectedDrug(e)" placeholder="请选择节目文件">
                  <el-option v-for="musicdata in MusicListData" :key="musicdata.audioId" :label="musicdata.audioName" :value="musicdata.audioId">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <!-- </div> -->
            <!-- <el-form-item> -->
            <div class="footerBtn">
              <span slot="footer" class="dialog-footer">
                <el-button class="bindDevicebtn" type="primary" @click="DialogVisibleFlag = false">取 消</el-button>
                <el-button class="bindDevicebtn" type="primary" @click="addstrategysssss(delayPlayForm)" :loading="btnIsLoading">确 定</el-button>
              </span>
            </div>
            <!-- </el-form-item> -->
          </el-form>
        </div>
      </bigDialog>
      <!-- 绑定设备 -->
      <Dialog title="选择设备" :DialogVisibleFlag.sync="bindDeviceDialog" :isShowClose="false">
        <div class="right">
          <div class="rightTop"></div>
        </div>
        <div class="classifyTree">
          <!-- 只要引入这个组件就可以生成树形列表组件 -->
          <TreeList class="classifyTree_tree"></TreeList>
          <littleTree />
        </div>
        <!-- 设置表格布局方框四个角的图形样式 以及表格布局-->
        <div class="rightTable">
          <span class="angle1"></span>
          <span class="angle2"></span>
          <span class="angle3"></span>
          <span class="angle4"></span>
          <div class="search">
            <el-input class="inputXzsb"  v-model="broadQueryParams.broadcastName" placeholder="请输入设备名称" clearable style="width:10vw;margin-right:1vw"></el-input>
            <el-button class="searchBC_btn" type="primary" @click="searchBc" v-hasPermi="['broadcast:component:view']"> 检索 </el-button>
          </div>
          <!-- 设置选择设备表格样式 -->
          <div class="tablelist1 table-list">
            <el-table style="width: 100%" class="statu-body" :data="tableData" @selection-change="handleBindDeviceChange" :header-cell-style="{
                background: '#041F37',
                color: '#0175D4',
                fontSize: '18px',
                borderBottom: '2px solid #041F37',
              }">
              <el-table-column align="center" type="selection">
              </el-table-column>
              <el-table-column prop="broadcastName" label="设备名称" align="center">
              </el-table-column>
              <el-table-column prop="switchStatus" label="设备状态" align="center">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.status==='1'" type="success">开</el-tag>
                  <el-tag v-else type="danger">关</el-tag>
                </template>
              </el-table-column>

              <el-table-column prop="date" label="开关状态" align="center">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.switchStatus==='1'" type="success">在线</el-tag>
                  <el-tag v-else type="danger">离线</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 选择设备底部导航栏 -->
        <div class="fenye1">
          <pagination class="paginationStyle" popperClass="ic-pagination"  :total="broadcasttotal"
            :page.sync="broadQueryParams.pageNum" :limit.sync="broadQueryParams.pageSize" @pagination="getBroacCastListData" />
        </div>
        <!-- 选择设备确定和取消按键 -->
        <div class="footerBtn1">
          <span slot="footer" class="dialog-footer">
            <el-button  type="primary" @click="bindDeviceDialog = false">取 消</el-button>
            <el-button  type="primary" @click="binddeviceClick">确 定</el-button>
          </span>
        </div>

      </Dialog>

      <!-- 查看策略详情 -->
      <bigDialog title="策略详情" :DialogVisibleFlag.sync="showStrategyDialog" :isShowClose="false">
        <div class="dialogbox">
          <el-form :model="strategyDetailData" label-width="120px">
            <el-form-item label="任务名称:">
              <el-input class="inputClxq" style="width: 400px" v-model="strategyDetailData.name"></el-input>
            </el-form-item>
            <el-form-item label="生效策略:">
              <el-tag  v-for="(item, index) in getBroadCastName" :key="index" type="success" effect="dark">{{getBroadCastName[index]}}</el-tag>
            </el-form-item>
            <el-form-item label="时间类型:">
              <el-checkbox-group v-model="getweekData">
                <el-checkbox v-for="weekitem in weekData" :key="weekitem.id" :label="weekitem.id">{{ weekitem.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="播放方式">
              <el-radio-group v-model="strategyDetailData.playMode">
                <el-radio v-for="item in howplayMode" :key="item.value" :label="item.value">{{ item.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="音量">
              <el-slider style="width: 400px" v-model="strategyDetailData.volume"></el-slider>
            </el-form-item>
            <el-form-item label="时间段">
              <el-time-picker class="inputClxq" popperClass="ic-pagination" placeholder="起始时间" v-model="strategyDetailData.startDate" value-format="HH:mm"
                format="HH:mm" :picker-options="{
                  selectableRange: '00:00 - 23:59',
                }">
              </el-time-picker>
              <el-time-picker class="inputClxq" popperClass="ic-pagination" placeholder="结束时间" v-model="strategyDetailData.endDate" value-format="HH:mm" format="HH:mm"
                :picker-options="{
                  selectableRange: '00:00 - 23:59',
                }">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="节目文件:">
              <div>
                  <div class="optionClxq">
                <el-select popperClass="ic-pagination" disabled multiple v-model="getresourceList" placeholder="请选择节目文件">
                  <el-option  v-for="musicdata in MusicListData" :key="musicdata.audioId" :label="musicdata.audioName" :value="musicdata.audioId">
                  </el-option>
                </el-select></div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </bigDialog>
      <!-- 删除策略的弹框 -->

      <!-- 编辑策略 -->
      <bigDialog title="编辑策略" :DialogVisibleFlag.sync="updateDialogVisibleFlag" :isShowClose="false">
        <div class="dialogbox">
          <el-form :model="clickDetailGetInfo" :rules="broadcastRules1" ref="clickDetailGetInfo" label-width="120px">
            <el-form-item label="策略名称:" prop="name">
              <el-input class="inputBjcl" v-model="clickDetailGetInfo.name" style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item label="生效策略:">
              <el-tag @close="handleClose2(index)"  type="success" effect="dark" closable v-for="(item, index) in getStrotegyDevice" :key="index">{{getStrotegyDevice[index]}}
              </el-tag>
              <el-button class="bindDevicebtn" style="margin-left:0.2vw" @click="bindDeviceDialog=true">绑定设备</el-button>
            </el-form-item>

            <el-form-item label="时间类型:">
              <el-checkbox-group v-model="tmpweek">
                <el-checkbox v-for="weekitem in weekData" :key="weekitem.id" :label="weekitem.id">{{ weekitem.name }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="播放方式" prop="playMode">
              <el-radio-group v-model="clickDetailGetInfo.playMode">
                <el-radio v-for="item in howplayMode" :key="item.value" :label="item.value">{{ item.name }}</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="音量" prop="volume">
              <el-slider style="width: 400px" v-model="clickDetailGetInfo.volume"></el-slider>
            </el-form-item>

            <el-form-item label="时间段">
              <el-time-picker popperClass="ic-pagination" placeholder="起始时间" v-model="clickDetailGetInfo.startDate" value-format="HH:mm"
                format="HH:mm" :picker-options="{
                  selectableRange: '00:00:00 - 23:59:00',
                }">
              </el-time-picker>
              <el-time-picker popperClass="ic-pagination" placeholder="结束时间" v-model="clickDetailGetInfo.endDate" value-format="HH:mm" format="HH:mm"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:00',
                }">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="节目文件:">
              <div class="optionBjcl">
                <el-select popperClass="ic-pagination" multiple v-model="tmpAudio" placeholder="请选择节目文件">
                  <el-option v-for="musicdata in MusicListData" :key="musicdata.audioId" :label="musicdata.audioName" :value="musicdata.audioId">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>

            <div class="footerBtn">
              <span slot="footer" class="dialog-footer">
                <el-button class="bindDevicebtn" @click="updateDialogVisibleFlag = false">取 消</el-button>
                <el-button class="bindDevicebtn" type="primary" @click="updateStrategyData(clickDetailGetInfo)" :loading="btnIsLoading"> 确 定</el-button>
              </span>
            </div>
          </el-form>
        </div>
      </bigDialog>

      <el-dialog
        title="选择设备"
        custom-class="Dialogshebei"
        :visible.sync="ishowDialog"
        width="30%">
        <el-select
          :popper-append-to-body="false"
          v-model="yinzhu" placeholder="请选择播放设备"
          popper-class="shebei-input" filterable
          default-first-option
          @change="handleChange">
          <el-option
            v-for="item in yinzhuData"
            :key="item.id"
            :label="item.broadcastName"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
    <el-button @click="ishowDialog = false">取 消</el-button>
    <el-button type="primary" @click="musicConfirm">确 定</el-button>
  </span>
      </el-dialog>
      <GroupOperation :DialogVisibleFlag.sync="GroupDialog" class="groupOperation" :componentType="GroupType"></GroupOperation>
    </div>

    <el-dialog
      :title="title"
      custom-class="Dialogshebei"
      :visible.sync="GroupBroDialog"
      width="30%">
      <treeselect popperClass="ic-pagination"  v-model="treemodel" :options="treeData" :show-count="true" placeholder="请选择分组" @select="queryDeptSet" />
      <span slot="footer" class="dialog-footer">
    <el-button @click="GroupBroDialog= false" type="primary">取 消</el-button>
    <el-button type="primary" @click="closeDialog">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { startMusic ,stopMusci} from '@/api/broadcast/broadcastApi'
import startbo from "@/assets/images/start-bo.png"
import stopbo from "@/assets/images/stop-bo.png"
import TreeList from "@/views/broadcast/components/TreeList";
import GoHome from "@/views/components/GoHome";
import LED from "@/assets/images/LED.png";
import TableList from "@/views/led/components/tablelist";
import Dialog from "@/views/components/Dialog";
import Map from "@/views/broadcast/components/map";
import bigDialog from "@/views/led/components/bigDialog";
import ywList from "@/views/components/ywList";
import GroupOperation from "@/views/components/GroupManager";
import {
  getBCListData,
  getBroadToken,
  getMusicList,
  searchMusicList,
  groupTree,
  getStrategyData,
  addStrategyData,
  searchStrategyDetail,
  delStrategy,
  updateStrategystatus,
  updateVolume,
  editStrategyData,
  updateGroupList,
  broDetail
} from "@/api/broadcast/broadcastApi";
export default {
  name: "Group",
  components: {
    Treeselect,
    TreeList,
    GoHome,
    TableList,
    Map,
    Dialog,
    bigDialog,
    ywList,
    GroupOperation,
  },
  data() {
    const data = [];
    return {
      GroupBroDialog:false,
      title:'',
      treemodel:null,
      queryInfo:{
        groupId:'',
        id:''
      },
      treeData:[],
      configuration:{},
      lastAudioId:'',
      ishowDialog:false,
      taskId:'',
      ifbofang:false,
      row:{},
      startbo:startbo,
      stopbo:stopbo,
      detailDeviceDialog: false,
      DialogVisibleFlag: false,
      bindDeviceDialog: false,
      showStrategyDialog: false,
      showTableList: true,
      showStategyList: false,
      showAreaMap: false,
      showRsource: false,
      playNowflag: false,
      playDelayflag: true,
      updateStrategyBtn: false,
      showbindBtn: false,
      showhandBtn: false,
      showYwList: false,
      loading: false,
      btnIsLoading: false,
      updateDialogVisibleFlag: false,
      rightShowType: "group",
      data: JSON.parse(JSON.stringify(data)),
      srcurl: LED,
      tableData: [],
      yinzhuData:[],
      yinzhu:'',
      getrowdata: [],
      // 绑定设备时的表格数据
      strategyData: [],
      statrgytableData: [],
      // 添加策略的弹框表单
      addStrategyform: {
        type: [],
      },
      //检索设备列表的表单
      searchBCForm: {
        name: "",
      },
      //检索策略的表单
      searchStrategyForm: {
        name: "",
      },
      broadCastDetailData: {
        dept: { deptName: null },
        basicPole: { name: null },
        group: { name: null },
      },
      config: [],
      // 检索音乐的表单
      searchFrom: {
        audioname: "",
      },
      MusicListData: [],
      //多选框周数据
      weekData: [
        { name: "周一", id: 2 },
        { name: "周二", id: 3 },
        { name: "周三", id: 4 },
        { name: "周四", id: 5 },
        { name: "周五", id: 6 },
        { name: "周六", id: 7 },
        { name: "周日", id: 1 },
      ],
      // 策略详情弹框的展示表单
      // 延时播放盒子的表单数据
      tmpweek: [],//时间类型
      tmpAudio: [],
       tmpAudio1: [],
      howplayMode: [
        { name: "循环播放", value: "list_cycle_mode" },
        { name: "顺序播放", value: "normal_mode" },
      ],
      file: [],
      delayPlayForm: {
        name: null,
        dateType: null,
        resourceIds: null,
        startDate: null,
        endDate: null,
        playMode: null,
        status: "0",
        broadcastIds: null,
        volume: 20,
        controlTime: null,
      },
      // 上传音乐
      token: "",
      uploadURL: "",
      // 音乐列表的分页
      musicQueryParams: {
        pageNum: 1,
        pageSize: 5,
        audioName: null,
      },
      musictotal: 0,
      // 设备列表的分页
      broadQueryParams: {
        pageNum: 1,
        pageSize: 20,
        groupId: null,
        deptId: null,
        broadcastName: null,
      },
      broadcasttotal: 0,
      // 策略列表的分页
      strategyQueryParams: {
        pageNum: 1,
        pageSize: 20,
      },
      strategytotal: 0,
      areaId: null,
      groupIds: null,
      // 接受绑定设备时传来的id与音乐名称
      tmpIds: null,
      tmpBroadcastName: [],
      tmpbcName1: [],
      tmpBroadcastdetail: null,
      // 策略详情数据
      strategyDetailData: { name: null },
      getweekData: [],

      // 点击查看与删除时标题的切换
      strategyaTitle: null,

      // 新增策略时的表单验证
      broadcastRules: {
        name: [
          {
            required: true,
            message: "请输入策略名称",
            trigger: "blur",
          },
        ],
      },
      broadcastRules1: {
        name: [
          {
            required: true,
            message: "请输入策略名称",
            trigger: "blur",
          },
        ],
      },
      // 音乐列表前端分页
      MusicPageNum: 1,
      MusicPageSize: 20,
      total: 0,

      // 人工广播
      handBroadCast: {
        receiverList: "",
        initiatorEndPointID: 13,
        volume: null,
      },

      // 点击策略详情获取数据
      clickDetailGetInfo: {
        name: null,
        id: "",
        dateType: null,
        resourceIds: null,
        startDate: null,
        endDate: null,
        playMode: null,
        status: "0",
        broadcastIds: null,
        volume: 0,
        controlTime: null,
      },
      //存放编辑策略详情
      StrategyDetail: null,
      // 存放详情
      StrategyDetail1: null,

      // 接受点击详情后请求的数据
      acceptData: {
        controlId: null,
        id: null,
      },
      // 策略中回显设备名称的数据
      getBroadCastName: [],

      // 存放得到音乐列表的数组
      getresourceList: [],

      // 存放编辑策略时需要用到的设备数组
      getStrotegyDevice: [],
      fileList: [],
      GroupDialog: false,
      GroupType: "5",

      // 设备详情策略数据回显
      bcDetailStrategy: [],
    };
  },
  // 定义时分秒过滤器
  filters: {
    TimeFormat(e) {
      let duration = parseInt(e);
      let m =
        Math.floor(duration / 60) < 10
          ? "0" + Math.floor((duration / 60) % 60)
          : Math.floor((duration / 60) % 60);
      let s =
        Math.floor(duration % 60) < 10
          ? "0" + Math.floor(duration % 60)
          : Math.floor(duration % 60);
      return `${m}:${s}`;
    },
  },
  created() {
    // 调用获取音柱列表的接口
    this.getBroacCastListData();
    // 获取分组数据
    this.getGroup();
    // 获取音乐列表数据
    this.getMusicData();
    // 获取策略列表
    this.getStrategyList();
    // 获取token和url
    this.getTokenAndUrl();
  },

  methods: {
    handleShow(row){
      console.log("123")
      console.log(row)
      this.title = row.broadcastName
      this.queryInfo.id = row.id
      this.GroupBroDialog = true
    },
    closeDialog(){
      this.GroupBroDialog = false
      updateGroupList(this.queryInfo).then(res => {
        console.log(res)
        this.getBroacCastListData()
      })
    },
    queryDeptSet(e){
      this.queryInfo.groupId = e.id
      console.log(this.queryInfo)
    },
    handleChange(e){
      let queryInfo ={
        ip:'',
        config:''
      }
      this.yinzhuData.forEach(item => {
        if (item.id === e){
          console.log(item.ip)
          queryInfo.ip = item.ip
          queryInfo.config = item.config
          console.log(item.config)
        }
      })
      this.configuration = queryInfo
    },
    musicPlay(row){
      if (this.lastAudioId === row.audioId){
        this.stopPlay(row)
        this.ishowDialog = false
        this.yinzhu = ''
        this.lastAudioId = ''
        return
      }
      this.ishowDialog = true
      this.row = row
    },
    musicConfirm(){
      let row = this.row
      this.startPlay(row)
    },
    //开始播放
    startPlay(row){
      if(this.yinzhu === ''){
        this.$message.error('请选择播放设备')
        return
      }
      this.lastAudioId = row.audioId
      console.log('开始播放',row)
      let {config,ip} = this.configuration
      let queryInfo = {
        ip: ip,
        mode:'normal_mode',
        config: config,
        audioId: row.audioId,
        lastTaskId:this.taskId,
      }
      console.log(queryInfo)
      startMusic(queryInfo).then(res => {
        this.$message.success('播放成功')
        this.taskId = res.msg
        console.log(this.taskId)
          this.ifbofang = !this.ifbofang
      },
      err => {
        this.$message.error('播放失败')
        console.log(err)
      })
      this.yinzhu = ''
      this.ishowDialog = false
    },
    //停止播放
    stopPlay(row){
      stopMusci(this.taskId).then(res => {
        this.$message.success('停止播放')
        this.ifbofang = false
      },
      err => {
        this.$message.error('停止播放失败')
      })
      console.log('停止播放',row)
    },
    // 获取策略列表数据
    getStrategyList() {
      getStrategyData(this.strategyQueryParams).then((res) => {
        console.log("策略列表-----------------", res);
        if (res.code === 200) {
          this.statrgytableData = res.rows;
          this.strategytotal = res.total;
        }
      });
    },
    // 切换分组与区域的点击
    handleTreeListBtnChange(flag) {
      console.log(flag);
      if (flag) {
        if (this.data.length !== 0) this.getGroup();
      }
    },
    //获取设备列表

    // 地图模块
    handleShowArea() {
      this.rightShowType = "area";
      // 显示地图视图
      this.showAreaMap = true;
      // 显示设备列表table视图
      this.showTableList = false;
      // 显示这个策略table视图
      this.showStategyList = false;
      // 显示资源视图
      this.showRsource = false;
      // 显示运维视图
      this.showYwList = false;
    },
    handleShowGroup() {
      this.rightShowType = "group";
      this.showTableList = true;
      this.showStategyList = false;
      this.showAreaMap = false;
      this.showYwList = false;
      this.showRsource = false;
    },
    handleShowStrategy() {
      this.rightShowType = "strategy";
      this.showTableList = false;
      this.showStategyList = true;
      this.showAreaMap = false;
      this.showRsource = false;
      this.getMusicData();
      this.showYwList = false;
    },
    handleShowResource() {
      this.rightShowType = "resource";
      this.showTableList = false;
      this.showStategyList = false;
      this.showAreaMap = false;
      this.showRsource = true;
      this.showYwList = false;
    },
    handleShowYw() {
      this.rightShowType = "yw";
      this.showTableList = false;
      this.showStategyList = false;
      this.showAreaMap = false;
      this.showRsource = false;
      this.showYwList = true;
    },
// 设备列表，查看这一行的数据，参数为scope.row
    gotoDetail(e) {
      console.log('wwww')
      this.detailDeviceDialog = true;
      this.broadCastDetailData = e;
      console.log("设备详情列表-------------", e);
      this.acceptData.controlId = e.controlId;
      console.log(this.acceptData);
      console.log(e.config);
      this.config = e.config.replace(/'/g, '"');
      this.config = JSON.parse(this.config);
      console.log(this.config);
      // 调用显示策略数据的接口，参数为点击详情后传入的数据，controlId和id
      getStrategyData(this.acceptData).then((res) => {
        console.log("策略详情输出的数据", res);
        this.bcDetailStrategy = res.rows[0];
        this.tmpweek = res.rows[0].dateType.split("");
        // 转化成整数
        this.tmpweek = this.tmpweek.map(function (item, index, array) {
          return item - 0;
        });
        this.bcDetailStrategy.tmpAudio = res.rows[0].resourceIds
          .split(",")
          .map(function (item, index, array) {
            return item - 0;
          });
      });
    },
    // 获取音柱列表
    getBroacCastListData() {
      this.loading = true;
      getBCListData(this.broadQueryParams).then((res) => {
        console.log("设备列表------", res);
        if (res.code === 200) {
          this.tableData = res.rows;
          this.yinzhuData = res.rows
          console.log(this.tableData)
          this.broadcasttotal = res.total;
          this.loading = false;
        }
      });
    },

    // 获取分组列表
    getGroup() {
      groupTree().then((res) => {
        if (res.code === 200) {
          this.data = res.data;
        }
        console.log("获取分组列表", res);
      });
    },

    //点击跳转到策略详情界面
    gotoStrategyDetail(e) {
      console.log("策略详情-------------", e);
      //打印出来的是策略的所有信息，把能直接用的复制给strategyDetailData对象
      this.strategyDetailData = e;
      this.acceptData.controlId = e.id;
      this.strategyDetailData.name = e.name;
      this.strategyDetailData.startDate = e.startDate;
      this.strategyDetailData.endDate = e.endDate;
      // 周几传到后台是字符串拼接的格式 例如：“456”，下两行是为了把周几转换为数组
      this.tmpweek = e.dateType.split("");
      this.getweekData = this.tmpweek.map(function (item, index, array) {
        return item - 0;
      });

      // 根据策略详情里的设备id查询设备名称
      searchStrategyDetail(this.acceptData).then((res) => {
        console.log("策略详情输出的数据", res);
        this.getBroadCastName = res.data.map((item) => item.broadcastName);
        console.log(this.getBroadCastName);
      });

      console.log(e.dateType);
      console.log(this.tmpweek);
      console.log(this.acceptData);
      console.log(this.getweekData);

      //音乐id是字符串，转换为数组
      this.getresourceList = e.resourceIds
        .split(",")
        .map(function (item, index, array) {
          return item - 0;
        });
      console.log(this.getresourceList);
      this.showStrategyDialog = true;
    },
    //点击编辑策略
    updateStrategy(e) {
      console.log("编辑策略-----------------", e);
      console.log(e.id);

      this.acceptData.controlId = e.id;
      searchStrategyDetail(this.acceptData).then((res) => {
        console.log("策略详情输出的数据", res);
        // 查询设备名称
        this.getStrotegyDevice = res.data.map((item) => item.broadcastName);
        console.log(this.getStrotegyDevice);

        // 把策略绑定的设备id拿到放到clickDetailGetInfo.broadcastIds备用
        this.clickDetailGetInfo.broadcastIds = res.data.map((item) => item.uid);
        console.log(this.clickDetailGetInfo.broadcastIds);
      });

      // 1070-1074行转换日期数据格式
      this.tmpweek = e.dateType.split("");
      console.log("1-------",this.tmpweek);
      this.tmpweek = this.tmpweek.map(function (item, index, array) {
        return item - 0;
      });
      console.log("2==========",this.tmpweek);
      //下几行转换音乐id数据格式
      this.tmpAudio = e.resourceIds
        .split(",")
        .map(function (item, index, array) {
          return item - 0;
        });

        // 把拿到的策略详情里面能用的数据直接赋值给clickDetailGetInfo
      this.clickDetailGetInfo.volume = e.volume;
      this.clickDetailGetInfo.playMode = e.playMode;
      this.clickDetailGetInfo.startDate = e.startDate;
      this.clickDetailGetInfo.endDate = e.endDate;
      this.clickDetailGetInfo.resourceIds = e.resourceIds;
      this.updateDialogVisibleFlag = true;

      this.clickDetailGetInfo.id = e.id;

      this.clickDetailGetInfo.name = e.name;
    },
    // 编辑策略后提交
    updateStrategyData() {
      this.btnIsLoading = false;
      this.clickDetailGetInfo.controlTime = new Date();
      // 后端接收数据：resourceIds字符串类型
      this.clickDetailGetInfo.resourceIds = this.tmpAudio.toString();
        // 后端接收数据：broadcastIds 字符串类型
      this.clickDetailGetInfo.broadcastIds = this.clickDetailGetInfo.broadcastIds.toString();
      // 后端接收数据：dateType 字符串类型 “456”
      this.clickDetailGetInfo.dateType = this.tmpweek
        .toString()
        .replace(/,/g, "");

        // 表单验证
      this.$refs.clickDetailGetInfo.validate((valid) => {
        if (valid) {
          if (this.clickDetailGetInfo.broadcastIds === null) {
            this.$message.error("请至少选择一个设备");
          } else if (this.clickDetailGetInfo.dateType === null) {
            this.$message.error("请选择日期类型");
          } else if (this.clickDetailGetInfo.playMode === null) {
            this.$message.error("请选择播放类型");
          } else if (this.clickDetailGetInfo.volume === null) {
            this.$message.error("请选择音量");
          } else if (
            this.clickDetailGetInfo.startDate === null ||
            this.clickDetailGetInfo.endDate === null
          ) {
            this.$message.error("请选择时间段");
          } else if (this.tmpAudio === []) {
            this.$message.error("请至少选择一首音乐");
          } else {
            console.log("www",this.clickDetailGetInfo.playMode)
            editStrategyData(this.clickDetailGetInfo).then((res) => {
              console.log(res);
              if (res.code === 200) {
                this.$message.success("修改策略成功！");
                this.updateDialogVisibleFlag = false;
                this.btnIsLoading = false;
                this.getStrategyList();
                this.tmpAudio = [];
              }
            });
            console.log(this.clickDetailGetInfo);
          }
        }
      });
    },
    //点击删除策略
    deleteStrategy(e) {
      const id = e.id;
      this.$confirm('是否删除策略编号为"' + id + '"的数据项？', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delStrategy(id);
        })
        .then(() => {
          this.getStrategyList();
          this.msgSuccess("删除成功");
        });
    },

    // 上传音乐
    // 上传音频前校验的钩子
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "mp3";
      if (!extension) {
        this.$message({
          message: "上传文件只能是mp3格式！",
          type: "error",
        });
      }
      return extension;
    },

    handleMusicSuccess(res) {
      console.log(res);
      if (res.return_message === "success") {
        this.$message.success("上传成功");
        this.fileList = this.fileList.slice(0);
        this.getMusicData();
      } else {
        this.$message.error("上传失败");
      }
    },

    // 获取token
    getTokenAndUrl() {
      getBroadToken().then((res) => {
        if (res.result === 200) {
          this.token = res.token;
          this.uploadURL = res.ITC_T_7782A_musicUrl;
          console.log(this.token);
          console.log("uopload");
          console.log(this.uploadURL);
        }
        console.log("token&url-------------------------", res);
      });
    },

    // 获取音乐列表
    getMusicData() {
      getMusicList(this.musicQueryParams).then((res) => {
        console.log("音乐列表-------------------", res);
        if (res.code === 200) {
          this.MusicListData = res.rows;
          this.musictotal = res.total;
          this.total = res.total;
        }
      });
    },

    // 查询音乐
    searchMusic() {
      searchMusicList(this.searchFrom).then((res) => {
        console.log("查询音乐------", res);
        this.MusicListData = res.rows;
        this.searchFrom.audioname = "";
      });
    },
    // 新增策略时点击增加与删除时间段
    addPickerTime() {
      if (this.delayPlayForm.timepicker.length < 6) {
        this.delayPlayForm.timepicker.push({
          timeValue: "",
        });
      } else {
        this.$message.error("只能添加5个！");
      }
    },
    delPickerTime(item, index) {
      this.delayPlayForm.timepicker.splice(index, 1);
    },

    // 策略中绑定设备时列表多选框事件
    handleBindDeviceChange(e) {
      console.log("绑定设备多选事件---------------------", e);
      // 绑定设备时把选中的设备的id放到tmpIds
      this.tmpIds = e.map((item) => item.uid);
      console.log(this.tmpIds);
      this.tmpBroadcastName = e.map((item) => item.broadcastName);
      this.getStrotegyDevice = e.map((item) => item.broadcastName);
    },
    // 点击确定把选中的id传入到表单中
    binddeviceClick() {
      // 绑定设备后点击确定时把刚才拿到的id转换为字符串形式，赋值给下面两个对象里的属性，以便提交表单时使用
      this.delayPlayForm.broadcastIds = this.tmpIds.toString();
      this.clickDetailGetInfo.broadcastIds = this.tmpIds.toString();
      this.bindDeviceDialog = false;
    },

    // HandBroadcast() {
    //   this.handBroadCast.receiverList = this.tmpIds.toString();
    //   console.log(this.handBroadCast.receiverList);
    //   this.bindDeviceDialog = false;
    // },

    // 添加策略的点击事件
    addstrategysssss() {
      this.btnIsLoading = true;
      this.delayPlayForm.controlTime = new Date();
      this.delayPlayForm.resourceIds = this.tmpAudio.toString();
      this.delayPlayForm.dateType = this.tmpweek.toString().replace(/,/g, "");
      console.log(this.delayPlayForm.dateType);
      console.log(this.delayPlayForm.resourceIds);
      this.$refs.delayPlayForm.validate((valid) => {
        if (valid) {
          if (this.delayPlayForm.broadcastIds === null) {
            this.$message.error("请至少选择一个设备");
            this.btnIsLoading = true;
          } else if (this.delayPlayForm.dateType === null) {
            this.$message.error("请选择日期类型");
            this.btnIsLoading = true;
          } else if (this.delayPlayForm.playMode === null) {
            this.$message.error("请选择播放类型");
            this.btnIsLoading = true;
          } else if (this.delayPlayForm.volume === null) {
            this.$message.error("请选择音量");
            this.btnIsLoading = true;
          } else if (
            this.delayPlayForm.startDate === null ||
            this.delayPlayForm.endDate === null
          ) {
            this.$message.error("请选择时间段");
            this.btnIsLoading = true;
          } else if (this.tmpAudio === []) {
            this.$message.error("请至少选择一首音乐");
            this.btnIsLoading = true;
          } else {
            addStrategyData(this.delayPlayForm).then((res) => {
              console.log(res);
              if (res.code === 200) {
                this.$message.success("新增策略成功！");
                this.getStrategyList();
                this.DialogVisibleFlag = false;
                this.btnIsLoading = false;
                // 提交之后清空表单
                this.delayPlayForm = {
                  name: null,
                  dateType: null,
                  resourceIds: null,
                  startDate: null,
                  endDate: null,
                  playMode: null,
                  status: "0",
                  broadcastIds: null,
                  volume: 20,
                  controlTime: null,
                };

                this.tmpAudio = [];
                this.tmpBroadcastName = [];
              }
            });
            console.log(this.delayPlayForm);
          }
        }
      });
    },

    HandlebindDevice() {
      this.bindDeviceDialog = true;
      this.showbindBtn = true;
      this.showhandBtn = false;
    },
    //  人工广播
    // binhandbcdevice() {
    //   this.bindDeviceDialog = true;
    //   this.showbindBtn = false;
    //   this.showhandBtn = true;
    // },

    //开始广播
    // beginBroadcast() {
    //   beginBroadCast(this.handBroadCast).then((res) => {
    //     console.log(res);
    //     if (res.code === 200) {
    //       this.$message.success("广播已开启!");
    //       this.showHandBroadCast = false;
    //     }·
    //   });
    //   console.log(this.handBroadCast);
    // },

    // 查询策略列表
    searchStrategy() {
      getStrategyData(this.searchStrategyForm).then((res) => {
        console.log("查询策略列表", res);
        if (res.code === 200) {
          this.$message.success("查询策略成功");
          this.statrgytableData = res.rows;
          this.searchStrategyForm.name = "";
        }
        console.log(this.searchStrategyForm);
      });
    },

    // 切换策略状态
    handleStatusChange(row) {
      let chageinfo = {
        id: row.id,
        status: row.status,
      };
      console.log( '策略状态+',chageinfo);
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.name + '"的策略吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return updateStrategystatus(chageinfo);
        })
        .then(() => {
          this.msgSuccess(text + "成功");
        })
        .catch(function () {
          row.status = row.status === "0" ? "1" : "0";
        });
    },

    // 搜索设备
    searchBc() {
      getBCListData(this.broadQueryParams).then((res) => {
        if (res.code === 200) {
          this.tableData = res.rows;
          this.broadcasttotal = res.total;
          this.$message.success("查询成功");
          this.broadQueryParams.broadcastName = null;
        }
      });
    },

    // 修改音量
    handleVolumeChange(e) {
      console.log(e);
      let changeVolume = {
        taskId: e.taskId,
        volume: e.volume,
        id: e.id,
      };
      console.log('修改音量',changeVolume);
      updateVolume(changeVolume).then((res) => {
        console.log('音乐接口',res);
        this.getStrategyList();
      });
    },
    handleClose1(index) {
      this.tmpBroadcastName.splice(index, 1);
      this.tmpIds.splice(index, 1);
    },
    handleClose2(index) {
      this.getStrotegyDevice.splice(index, 1);
      this.tmpIds.splice(index, 1);
    },

    //分组管理dialog
    handleGroupDialog() {
      console.log(this.GroupDialog);
      this.GroupDialog = true;
      console.log("huang");
      console.log(this.GroupDialog);
    },
  },
  mounted() {
    this.$bus.$on('broTreeData',res => {
      this.treeData = res
      console.log(this.treeData)
    })
    this.$bus.$on("groupId", (res) => {
      this.broadQueryParams.groupId = res;
      console.log(this.broadQueryParams);
      this.getBroacCastListData();
    });

    this.$bus.$on("deptId", (res) => {
      this.broadQueryParams.deptId = res;
      console.log(this.broadQueryParams);
      this.getBroacCastListData();
    });
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
.group ::v-deep .Dialogshebei{
  position: relative;
  top:30%;
  background-color: rgb(4,42,78) !important;
  .el-dialog__title{
    color: white !important;
  }
}

::v-deep .el-pagination{
  .btn-prev{
     border-radius:10%
  }
  .el-pager{
    color: black;
    .number{
      margin: 0 5px;
      border-radius: 10%;
    }
  }
  .btn-next{
    border: 1px solid #018397;
    border-radius:10%
  }
}
.el-pager li{
  margin: 0 5px;
  color:red !important;
  border-radius: 2px;
  background: none !important;
  //background: white;
}
::v-deep .el-pager li.active{
  color: white;
  background: #1890ff !important;
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
::v-deep .el-select__input{
  color: white;
  margin-bottom: 5%;
}
.bofang{
  width: 14%;
  position: relative;
  left: 36%;
  img{
    width: 100%;
  }
}
.el-tag--light{
  ::v-deep button{
    width: 100% !important;
    position: relative;
    left: -6%;
  }
  ::v-deep span{
    position: relative !important;
    left: 5% !important;
    top: -0.45vh !important;
    color: #1890ff;
  }
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
      top: 1vh;
      left: -6.15vw;
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

    .group-right-btn {
      z-index: 100;
      position: absolute;
      top: 2.5vh;
      left: 4vw;
      display: flex;
      justify-content: space-between;
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
  width: 77vw;
  height: 63vh;
  top: 4%;
  left: 0.4%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //  播放设备选择框
    ::v-deep .el-input__inner{
    border: 2px solid rgb(0,130,236);

  }

}

.broadcastmodel {
  position: absolute;
  left: -2vw;
  width: 28vw;
  height: 58vh;
  background: no-repeat url("../../../assets/images/broadCastModel.png") center;
  background-size: 100% 100%;
}

.right {
  .rightbox {
    position: absolute;
    width: 39vw;
    height: 65vh;
    top: 9.5vh;
    left: 23vw;
    background: no-repeat url("../../../assets/images/detail_downbox.png") center;
    background-size: 100% 100%;
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
    .rightbox_detail {
      width: 39vw;
      display: flex;
      justify-content: space-between;
      height: 59vh;
      margin-top: 4vh;
      margin-left: 7.5vw;
      overflow-y: auto;
      .dialog-table-title{
        justify-content: center;
        position: relative;
        left: -4.8vw;
        // margin-left: -1.5vw;
        // div{
        //   margin-right: 2vw;
        //   margin-left: 1vw;
        // }
      }
    }
  }
}

// 区域地图
// 地图右背景框

.areaMap {
  position: absolute;
  background: no-repeat url("../../../assets/images/new_tableBG.png");
  background-size: 98% 99%;
  width: 79.5vw;
  height: 79.8vh;
  top: 3.85vh;
  left: -6.35vw;
  .areaMap_box {
    width: 73.4vw;
    height: 64.8vh;
    border: 2px solid #017caa;
    position: absolute;
    top: 8vh;
    left: 2.5vw;
  }
}

// 增加资源的按钮  上传文件按钮
.upload-demo {
  position:absolute;
  .addResource {
    position: absolute;
    top: 7.5vh;
    left: 14.1vw;
    width: 6vw;
    height: 4.4vh;
    border:none;
    background: no-repeat url('../../../assets/images/button/register-pole.png');
    background-size: 100% 100%;
    color: #fff;
    font-size: 1.2em;
    background-color: transparent;
    z-index: 11;
    & > span{
          position:absolute;
          top: 1%;
    }
  }
}

// 检索音乐
.searchMusic {
  position: absolute;
  top: 13vh;
  left: 13vw;
  z-index: 11;
  .searchMusic_label {
    color: #fff;
  }
  .searchBtn1 {
    position: relative;
    border: 2px solid #0275d4;
    color: #0275d4;
    top: -6.3vh;
    left: 15vw;
    background-color: transparent;
    z-index: 11;
  }
}

//增加策略的按钮

.addStrategy {
  position: absolute;
  top: 13vh;
  left: 5vw;
  border: 2px solid #0275d4;
  color: #0275d4;
  background-color: transparent;
  z-index: 11;
}
.classifyTree {
  position: absolute;
  top: 6vh;
  width: 23vw;
  height: 75vh;
  left: 1vw;
  overflow: hidden;
  ::v-deep .custom-tree-container {
    width: 14vw;
    top: 28vh;
    left: 9vw;
    height: 51vh;
  }

  .classifyTree_tree {
    width: 114%;
    height: 80%;
    position: absolute;
    top: 5vh;
    left: 1vw;
  }
}

.addJob {
  position: relative;
  margin-bottom: 1vh;
  left: 4.2vw;
  border: 2px solid #0275d4;
  color: #0275d4;
  background-color: transparent;
}
.dialogbox {
  position: absolute;
  top: 11vh;
  left: 11vw;
  height: 56vh;
  width: 60vw;
  word-break: break-all;
  word-wrap: break-word;
  overflow-y: auto;
  .dialogbox_form {
    position: absolute;
    top: 2vh;
    left: 5vw;
  }
}
.footerBtn {
  // ::v-deep button{
  //   // background-color: rgb(24,144,225) !important;
  // }
  position: absolute;
  top: 50vh;
  left: 25vw;
}
.footerBtn1 {
  position: absolute;
  top: 66vh;
  left: 55vw;
}
.bigfooterBtn {
  position: absolute;
  top: 67vh;
  left: 56vw;
}
.rightTable {
  position: absolute;
  left: 23vw;
  top: 16vh;
  width: 41vw;
  height: 48vh;
  border: 2px solid #055a8a;
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
    left: 37.5vw;
  }
  .search {
    position: absolute;
    top: -5vh;
    left: 20vw;
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
}
.fenye1 {
  position: absolute;
  top: 63vh;
  left: 9vw;
}

// 查看策略详情的弹框
.strategyDetailBox {
  width: 36vw;
  height: 57vh;
  position: absolute;
  top: 17vh;
  left: 10vw;
}

// 播放模式

.playMode {
  position: absolute;
  top: 12vh;
  left: 23vw;
}
.playMode_btns {
  border: 2px solid #0275d4;
  color: #0275d4;
  background-color: transparent;
  z-index: 11;
}

//检索设备列表的样式
.searchBroadcast {
  display: flex;
  width: 13vw;
  height: 10vh;
  position: absolute;
  top: 6.7vh;
  left: 0vw;
  z-index: 111;
// 检索按钮
  .searchBC_btn {
    cursor: pointer;
    position: relative;
    // top: -5%;
    left: 2vh;
    top:0.8vh;
    img {
      position: relative;
      width: 4vw;
      height: 4.3vh;
      top: 1%;
    }
    span {
      position: absolute;
      top: 9%;
      left: 24%;
      font-size: 1.2em;
      z-index: 11;
    }
  }
  .otherBtn {
    cursor: pointer;
    position: absolute;
    // top: -5%;
    left: 14vw;
    top: 0.8vh;
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
}

.handlebroadcast {
  cursor: pointer;
  position: absolute;
  top: 2vh;
  left: 54vw;
  width: 11vw;
  height: 8vh;
  background: no-repeat url("../../../assets/images/camera/button_1_action.png");
  background-size: 100% 100%;
  & > span {
    font-size: 1.7em;
    margin-left: 2.5vw;
    line-height: 9vh;
  }
}
.handBroadcastForm {
  position: relative;
  top: -1vh;
  left: 1vw;
  height: 63vh;
  width: 35vw;
  .optionBtns {
    position: relative;
    left: 6vw;
    top: 38vh;
  }
}
.ywList {
  position: absolute;
  top: 5vh;
  left: 3.4vw;
  width: 77vw;
  ::v-deep .el-table{
    height: 65.4vh ;
    top:1.5vh;
  }
  ::v-deep .table-list,
  ::v-deep .table-list-body {
    height: 64vh;
  }
}
::v-deep .ywpagination{
  position: relative;
  left: 27vw;
  top: -1vh;
  z-index: 111;
}
//分页 当前页
::v-deep .el-pagination__jump{
   color: #fff;
   margin-top: -1vh;
}
::v-deep .el-pagination__editor.el-input .el-input__inner{
  position: absolute;
  top:1vh !important;
  left: -0.05vh !important;
}
::v-deep .el-pagination__total,
::v-deep .el-form-item__label {
  color: white;
  font-size: 1.2rem;
  font-weight: 520;
}
::v-deep .el-pagination {
  right: -25vw;
  top: 3vh;
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
}
// 右背景框 除了地图
::v-deep .tablelist {
  width: 115%;
  left: -3.55vw;
  top: -0.3vh;
}
.musicPagination {
  position: relative;
  top: 3vh;
  left: 21vw;
}

.table-list .el-table,
.tablelist .el-table,
.tablebox .el-table {
  overflow-y: auto;
  margin-top: -5px;
}

::v-deep .pagination-container {
  margin-top: 6px;
  width: 18vw;
}
::v-deep .rightTable1 .tablelist {
  width: 100%;
}

// 标题旁边的箭头
// .arrow {
//   margin-right: 10px;

//   span {
//     display: inline-block;
//   }

//   span::before,
//   span::after {
//     content: "";
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
::v-deep .el-switch__label {
  color: #fff;
}
.broadcast-btn{
  position: absolute;
  top: 15%;
  left: 33%;
  font-size: 14px;
  span{
    position: absolute;
    top: 12%;
    left: 28%;
  }
  .celue{
    left: 19%;
  }
}
.broadcast-opt2{
  width: 2vw;
  cursor: pointer;
  position: absolute;
  left: 55%;
  top:10%;
 img{
  width: 100%;
   z-index: 100;
 }
}

.broadcast-opt{
  cursor: pointer;
  position: absolute;
  top:20%;
  left:42%;
  z-index: 100;
  img{
    width:95%;
    height: 90%;
  }
}
.broadcast-opt1{
  cursor: pointer;
  position: absolute;
  top:20%;
  left:60%;
  img{
    width:95%;
    height: 90%;
  }
}
::v-deep .el-input__inner{
  position: absolute;
  top: 1.3vh;
}
::v-deep .el-select{
  top:-3vh
}
//小箭头图标  分页
::v-deep .el-input__suffix{
    top:30px;
    opacity: 0;
}
::v-deep .el-row{
  margin-bottom:1.2vh !important;
}
::v-deep .dialogbox .el-input__inner{
  position: relative;
  top:-0.8vh;
}
// 策略详情时间段圆表图标
::v-deep .el-input__prefix{
    top:-10px;
    left: 3px;
}
// 策略详情对话框  任务名称  时间段输入框
.inputClxq{
  position: relative;
  top:0.7vh
}
// 节目文件
.optionClxq{
  position: absolute;
  top:3.9vh;
  left:0vw
}


// 控制策略对话框
.inputKzcl{
  position: relative;
  top:1vh;
  width: 10vw;
}
.optionKzcl{
  position: relative;
    top:3.5vh;
}
// .yinliang{
//   position: relative;
//   top:-3vh
// }
::v-deep .el-input-number__decrease{
      position: absolute;
      top: -1.8vh;
}
::v-deep .el-input-number__increase{
      position: absolute;
      top: -1.8vh;
}
::v-deep .table-list .el-input__inner{
    position: absolute;
    top: -2vh;
    left: 0vw;
}

// 编辑策略对话框
.inputBjcl{
  position: relative;
  top:0.7vh
}
.optionBjcl{
  position: absolute;
  top: 3vh;
  padding: 3px 0;
}
::v-deep .el-tag.el-tag--info{
  position: relative;
  top: -1vh;
}
::v-deep  .el-scrollbar{
 background:none !important;
}
::v-deep .el-popper{
  margin-top: 50px;
  border: none !important;
  background: white;
}
//选择设备
.inputXzsb{
    position: relative;
    top:-3.5vh
}
::v-deep .el-checkbox{
      color: white;
}
.el-select{
  width: 23vw;
}
.bindDevicebtn{
  background: no-repeat url('../../../assets/images/button/lianjietest.png');
  background-size: 100% 100%
}
::v-deep .el-form-item__content{
  position: absolute;
  //margin-top: 0.3vh;
  font-size: 1.2rem;
}
.shebei-input{
  border: none;
  ::v-deep .el-scrollbar{
     background-color: #083d6d;
  }
}
::v-deep .vue-treeselect{
  border: 2px solid rgb(1,67,145);
  border-radius:10px;
}
</style>
