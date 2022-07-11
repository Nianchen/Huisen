<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="在线状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择在线状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开关状态" prop="switchStatus">
        <el-select v-model="queryParams.switchStatus" placeholder="请选择开关状态" clearable size="small">
          <el-option
            v-for="dict in switchStatusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="亮度" prop="brightness">
        <el-input
          v-model="queryParams.brightness"
          placeholder="请输入亮度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电压" prop="voltage">
        <el-input
          v-model="queryParams.voltage"
          placeholder="请输入电压"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电流" prop="current">
        <el-input
          v-model="queryParams.current"
          placeholder="请输入电流"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="功率" prop="power">
        <el-input
          v-model="queryParams.power"
          placeholder="请输入功率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电量" prop="dl">
        <el-input
          v-model="queryParams.dl"
          placeholder="请输入电量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="亮灯时长" prop="ldsc">
        <el-input
          v-model="queryParams.ldsc"
          placeholder="请输入亮灯时长"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总耗电量" prop="zdl">
        <el-input
          v-model="queryParams.zdl"
          placeholder="请输入总耗电量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="理论耗电量" prop="lldl">
        <el-input
          v-model="queryParams.lldl"
          placeholder="请输入理论耗电量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上报时间" prop="reportTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.reportTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择上报时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
          v-hasPermi="['lamp:lampWork:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['lamp:lampWork:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['lamp:lampWork:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['lamp:lampWork:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="lampWorkList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="在线状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="开关状态" align="center" prop="switchStatus" :formatter="switchStatusFormat" />
      <el-table-column label="亮度" align="center" prop="brightness" />
      <el-table-column label="电压" align="center" prop="voltage" />
      <el-table-column label="电流" align="center" prop="current" />
      <el-table-column label="功率" align="center" prop="power" />
      <el-table-column label="电量" align="center" prop="dl" />
      <el-table-column label="亮灯时长" align="center" prop="ldsc" />
      <el-table-column label="总耗电量" align="center" prop="zdl" />
      <el-table-column label="理论耗电量" align="center" prop="lldl" />
      <el-table-column label="上报时间" align="center" prop="reportTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.reportTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['lamp:lampWork:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['lamp:lampWork:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改灯光工作状态对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="灯光组件ID" prop="lampId">
          <el-input v-model="form.lampId" placeholder="请输入灯光组件ID" />
        </el-form-item>
        <el-form-item label="灯头ID" prop="capId">
          <el-input v-model="form.capId" placeholder="请输入灯头ID" />
        </el-form-item>
        <el-form-item label="在线状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开关状态">
          <el-radio-group v-model="form.switchStatus">
            <el-radio
              v-for="dict in switchStatusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="亮度" prop="brightness">
          <el-input v-model="form.brightness" placeholder="请输入亮度" />
        </el-form-item>
        <el-form-item label="电压" prop="voltage">
          <el-input v-model="form.voltage" placeholder="请输入电压" />
        </el-form-item>
        <el-form-item label="电流" prop="current">
          <el-input v-model="form.current" placeholder="请输入电流" />
        </el-form-item>
        <el-form-item label="功率" prop="power">
          <el-input v-model="form.power" placeholder="请输入功率" />
        </el-form-item>
        <el-form-item label="电量" prop="dl">
          <el-input v-model="form.dl" placeholder="请输入电量" />
        </el-form-item>
        <el-form-item label="亮灯时长" prop="ldsc">
          <el-input v-model="form.ldsc" placeholder="请输入亮灯时长" />
        </el-form-item>
        <el-form-item label="总耗电量" prop="zdl">
          <el-input v-model="form.zdl" placeholder="请输入总耗电量" />
        </el-form-item>
        <el-form-item label="理论耗电量" prop="lldl">
          <el-input v-model="form.lldl" placeholder="请输入理论耗电量" />
        </el-form-item>
        <el-form-item label="上报时间" prop="reportTime">
          <el-date-picker clearable size="small"
            v-model="form.reportTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择上报时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listLampWork, getLampWork, delLampWork, addLampWork, updateLampWork } from "@/api/lamp/lampWork";

export default {
  name: "LampWork",
  components: {
  },
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
      // 灯光工作状态表格数据
      lampWorkList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 在线状态字典
      statusOptions: [],
      // 开关状态字典
      switchStatusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        status: null,
        switchStatus: null,
        brightness: null,
        voltage: null,
        current: null,
        power: null,
        dl: null,
        ldsc: null,
        zdl: null,
        lldl: null,
        reportTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("lamp_state").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("lamp_switch").then(response => {
      this.switchStatusOptions = response.data;
    });
  },
  methods: {
    /** 查询灯光工作状态列表 */
    getList() {
      this.loading = true;
      listLampWork(this.queryParams).then(response => {
        this.lampWorkList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 在线状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 开关状态字典翻译
    switchStatusFormat(row, column) {
      return this.selectDictLabel(this.switchStatusOptions, row.switchStatus);
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
        lampId: null,
        capId: null,
        status: "0",
        switchStatus: "0",
        brightness: null,
        voltage: null,
        current: null,
        power: null,
        dl: null,
        ldsc: null,
        zdl: null,
        lldl: null,
        reportTime: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remarks: null,
        delFlag: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加灯光工作状态";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLampWork(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改灯光工作状态";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLampWork(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLampWork(this.form).then(response => {
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
      this.$confirm('是否确认删除灯光工作状态编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delLampWork(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('lamp/lampWork/export', {
        ...this.queryParams
      }, `lamp_lampWork.xlsx`)
    }
  }
};
</script>