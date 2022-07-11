<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <!--<el-form-item label="区域ID" prop="deptId">
        <el-input
          v-model="queryParams.deptId"
          placeholder="请输入区域ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="灯杆ID" prop="poleId">
        <el-input
          v-model="queryParams.poleId"
          placeholder="请输入灯杆ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <!--<el-form-item label="组件ID" prop="componentId">
        <el-input
          v-model="queryParams.componentId"
          placeholder="请输入组件ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="串口MAC" prop="mac">
        <el-input
          v-model="queryParams.mac"
          placeholder="请输入串口IMEI/串口MAC地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="串口IP" prop="ip">
        <el-input
          v-model="queryParams.ip"
          placeholder="请输入串口IP"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务器IP" prop="configServerIp">
        <el-input
          v-model="queryParams.configServerIp"
          placeholder="请输入服务器IP"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务器端口" prop="configServerPort">
        <el-input
          v-model="queryParams.configServerPort"
          placeholder="请输入服务器端口"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="湿度" prop="humidity">
        <el-input
          v-model="queryParams.humidity"
          placeholder="请输入湿度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="温度" prop="temperture">
        <el-input
          v-model="queryParams.temperture"
          placeholder="请输入温度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="噪声值" prop="noise">
        <el-input
          v-model="queryParams.noise"
          placeholder="请输入噪声值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="pm2.5" prop="pm2">
        <el-input
          v-model="queryParams.pm2"
          placeholder="请输入pm2.5"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="pm10" prop="pm10">
        <el-input
          v-model="queryParams.pm10"
          placeholder="请输入pm10"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['weather:weatherComponent:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['weather:weatherComponent:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['weather:weatherComponent:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['weather:weatherComponent:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="weatherComponentList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id"  />
      <el-table-column label="区域ID" align="center" prop="deptId" />
      <el-table-column label="灯杆ID" align="center" prop="poleId" />
      <el-table-column label="组件ID" align="center" prop="componentId" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="串口IMEI/串口MAC地址" align="center" prop="mac" />
      <el-table-column label="串口IP" align="center" prop="ip" />
      <el-table-column label="服务器IP" align="center" prop="configServerIp" />
      <el-table-column
        label="服务器端口"
        align="center"
        prop="configServerPort"
      />
      <el-table-column label="配置参数" align="center" prop="config" />
      <el-table-column
        label="状态"
        align="center"
        prop="status"
        :formatter="statusFormat"
      />
      <el-table-column label="湿度" align="center" prop="humidity" />
      <el-table-column label="温度" align="center" prop="temperture" />
      <el-table-column label="噪声值" align="center" prop="noise" />
      <el-table-column label="pm2.5" align="center" prop="pm2" />
      <el-table-column label="pm10" align="center" prop="pm10" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['weather:weatherComponent:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['weather:weatherComponent:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改气象组件对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <div class="dialog-box">
        <span class="dialog-title">{{ title }}</span>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="区域ID" prop="deptId">
            <el-input v-model="form.deptId" placeholder="请输入区域ID" />
          </el-form-item>
          <el-form-item label="灯杆ID" prop="poleId">
            <el-input v-model="form.poleId" placeholder="请输入灯杆ID" />
          </el-form-item>
          <el-form-item label="组件ID" prop="componentId">
            <el-input v-model="form.componentId" placeholder="请输入组件ID" />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="串口IMEI/串口MAC地址" prop="mac">
            <el-input
              v-model="form.mac"
              placeholder="请输入串口IMEI/串口MAC地址"
            />
          </el-form-item>
          <el-form-item label="串口IP" prop="ip">
            <el-input v-model="form.ip" placeholder="请输入串口IP" />
          </el-form-item>
          <el-form-item label="服务器IP" prop="configServerIp">
            <el-input
              v-model="form.configServerIp"
              placeholder="请输入服务器IP"
            />
          </el-form-item>
          <el-form-item label="服务器端口" prop="configServerPort">
            <el-input
              v-model="form.configServerPort"
              placeholder="请输入服务器端口"
            />
          </el-form-item>
          <el-form-item label="配置参数" prop="config">
            <el-input
              v-model="form.config"
              type="textarea"
              placeholder="请输入内容"
            />
          </el-form-item>
           <el-form-item label="状态">
          <el-checkbox-group v-model="form.status">
            <el-checkbox
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue">
              {{dict.dictLabel}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
          <el-form-item label="湿度" prop="humidity">
          <el-input v-model="form.humidity" placeholder="请输入湿度" />
        </el-form-item>
        <el-form-item label="温度" prop="temperture">
          <el-input v-model="form.temperture" placeholder="请输入温度" />
        </el-form-item>
        <el-form-item label="噪声值" prop="noise">
          <el-input v-model="form.noise" placeholder="请输入噪声值" />
        </el-form-item>
        <el-form-item label="pm2.5" prop="pm2">
          <el-input v-model="form.pm2" placeholder="请输入pm2.5" />
        </el-form-item>
        <el-form-item label="pm10" prop="pm10">
          <el-input v-model="form.pm10" placeholder="请输入pm10" />
        </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="test">链接测试</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listWeatherComponent,
  getWeatherComponent,
  delWeatherComponent,
  addWeatherComponent,
  updateWeatherComponent,
} from "@/api/weather/weatherComponent";

export default {
  name: "WeatherComponent",
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 气象组件表格数据
      weatherComponentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deptId: null,
        poleId: null,
        componentId: null,
        name: null,
        mac: null,
        ip: null,
        configServerIp: null,
        configServerPort: null,
        config: null,
        status: null,
        humidity: null,
        temperture: null,
        noise: null,
        pm2: null,
        pm10: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        deptId: [
          { required: true, message: "区域ID不能为空", trigger: "blur" },
        ],
        poleId: [
          { required: true, message: "灯杆ID不能为空", trigger: "blur" },
        ],
        componentId: [
          { required: true, message: "组件ID不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
    this.getDicts("weather_status").then((response) => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询气象组件列表 */
    getList() {
      this.loading = true;
      listWeatherComponent(this.queryParams).then((response) => {
        console.log(response);
        this.weatherComponentList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabels(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        deptId: null,
        poleId: null,
        componentId: null,
        name: null,
        mac: null,
        ip: null,
        configServerIp: null,
        configServerPort: null,
        config: null,
        status: [],
        humidity: null,
        temperture: null,
        noise: null,
        pm2: null,
        pm10: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remarks: null,
        delFlag: null,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加气象组件";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getWeatherComponent(id).then((response) => {
        this.form = response.data;
        this.form.status = this.form.status.split(",");
        this.open = true;
        this.title = "修改气象组件";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.status = this.form.status.join(",");
          if (this.form.id != null) {
            updateWeatherComponent(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWeatherComponent(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除气象组件编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delWeatherComponent(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "weather/weatherComponent/export",
        {
          ...this.queryParams,
        },
        `weather_weatherComponent.xlsx`
      );
    },
    test() {

      console.log(56565565656);
      let websocket = new WebSocket("ws://192.168.3.47:2000/hellow2");

      websocket.onerror = function () {
        alert("服务器连接失败，请检查网路，或联系技术支持人员。");
      };
      websocket.onopen = function () {

        console.log("WebSocket连接成功");
        // websocket.send(123);
      };
//       websocket.addEventListener('open', function (event) {
//         console.log(222222222222);
//   websocket.send('Hello Server!');
// });
      websocket.open = function () {
        console.log(11111111111111);
      }
      //接收消息
      websocket.onmessage = function (event) {
        console.log(event.data);
      };

      websocket.onclose = function () {
        console.log("WebSocket连接关闭");
      };
      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function () {
        websocket.close();
      };


    },
  },
};
</script>
