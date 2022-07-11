<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="区域名称" prop="deptName">
        <el-input
          v-model="queryParams.deptName"
          placeholder="请输入区域名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="灯杆名称" prop="poleName">
        <el-input
          v-model="queryParams.poleName"
          placeholder="请输入灯杆名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="控制类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择控制类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="组件uid" prop="uid">
        <el-input
          v-model="queryParams.uid"
          placeholder="请输入组件uid"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="服务器ip" prop="configServerIp">
        <el-input
          v-model="queryParams.configServerIp"
          placeholder="请输入服务器ip"
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
      <el-form-item label="交互模式" prop="configInteractive mode">
        <el-input
          v-model="queryParams.configInteractiveMode"
          placeholder="请输入交互模式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="当前灯头数量" prop="capNum">
        <el-input
          v-model="queryParams.capNum"
          placeholder="请输入当前灯头数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['lamp:lampComponent:add']"
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
          v-hasPermi="['lamp:lampComponent:edit']"
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
          v-hasPermi="['lamp:lampComponent:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['lamp:lampComponent:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="lampComponentList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="区域名称" align="center" prop="deptName" />
      <el-table-column label="灯杆名称" align="center" prop="poleName" />
      <el-table-column label="名称" align="center" prop="name" />
      <el-table-column label="路灯地址" align="center" prop="address" />
      <el-table-column label="控制类型" align="center" prop="type" />
      <el-table-column label="组件uid" align="center" prop="uid" />
      <el-table-column label="服务器ip" align="center" prop="configServerIp" />
      <el-table-column label="服务器端口" align="center" prop="configServerPort" />
      <el-table-column label="交互模式" align="center" prop="configInteractive mode" />
      <el-table-column label="配置参数" align="center" prop="config" />
      <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="当前灯头数量" align="center" prop="capNum" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['lamp:lampComponent:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['lamp:lampComponent:remove']"
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

    <!-- 添加或修改灯光组件对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="区域id" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入区域id" />
        </el-form-item>
        <el-form-item label="区域名称" prop="deptName">
          <el-input v-model="form.deptName" placeholder="请输入区域名称" />
        </el-form-item>
        <el-form-item label="灯杆id" prop="poleId">
          <el-input v-model="form.poleId" placeholder="请输入灯杆id" />
        </el-form-item>
        <el-form-item label="灯杆名称" prop="poleName">
          <el-input v-model="form.poleName" placeholder="请输入灯杆名称" />
        </el-form-item>
        <el-form-item label="组件id" prop="componentId">
          <el-input v-model="form.componentId" placeholder="请输入组件id" />
        </el-form-item>
        <el-form-item label="分组id" prop="groupId">
          <el-input v-model="form.groupId" placeholder="请输入分组id" />
        </el-form-item>
        <el-form-item label="生效策略id" prop="controlId">
          <el-input v-model="form.controlId" placeholder="请输入生效策略id" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="路灯地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入路灯地址" />
        </el-form-item>
        <el-form-item label="控制类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择控制类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="组件uid" prop="uid">
          <el-input v-model="form.uid" placeholder="请输入组件uid" />
        </el-form-item>
        <el-form-item label="服务器ip" prop="configServerIp">
          <el-input v-model="form.configServerIp" placeholder="请输入服务器ip" />
        </el-form-item>
        <el-form-item label="服务器端口" prop="configServerPort">
          <el-input v-model="form.configServerPort" placeholder="请输入服务器端口" />
        </el-form-item>
        <el-form-item label="交互模式" prop="configInteractive mode">
          <el-input v-model="form.configInteractiveMode" placeholder="请输入交互模式" />
        </el-form-item>
        <el-form-item label="配置参数" prop="config">
          <el-input v-model="form.config" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前灯头数量" prop="capNum">
          <el-input v-model="form.capNum" placeholder="请输入当前灯头数量" />
        </el-form-item>
        <el-form-item label="灯头ids" prop="capIds">
          <el-input v-model="form.capIds" placeholder="请输入灯头ids" />
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
import { listLampComponent, getLampComponent, delLampComponent, addLampComponent, updateLampComponent } from "@/api/lamp/lampComponent";

export default {
  name: "LampComponent",
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
      // 灯光组件表格数据
      lampComponentList: [],
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
        deptName: null,
        poleName: null,
        name: null,
        type: null,
        uid: null,
        configServerIp: null,
        configServerPort: null,
        configInteractiveMode: null,
        config: null,
        status: null,
        capNum: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        deptId: [
          { required: true, message: "区域id不能为空", trigger: "blur" }
        ],
        poleId: [
          { required: true, message: "灯杆id不能为空", trigger: "blur" }
        ],
        componentId: [
          { required: true, message: "组件id不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("lamp_state").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询灯光组件列表 */
    getList() {
      this.loading = true;
      listLampComponent(this.queryParams).then(response => {
        this.lampComponentList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
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
        deptName: null,
        poleId: null,
        poleName: null,
        componentId: null,
        groupId: null,
        controlId: null,
        name: null,
        address: null,
        type: null,
        uid: null,
        configServerIp: null,
        configServerPort: null,
        configInteractiveMode: null,
        config: null,
        status: null,
        capNum: null,
        capIds: null,
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
      this.title = "添加灯光组件";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLampComponent(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改灯光组件";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLampComponent(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLampComponent(this.form).then(response => {
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
      this.$confirm('是否确认删除灯光组件编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delLampComponent(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('lamp/lampComponent/export', {
        ...this.queryParams
      }, `lamp_lampComponent.xlsx`)
    }
  }
};
</script>
