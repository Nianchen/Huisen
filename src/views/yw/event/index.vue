<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="区域ID" prop="deptId">
        <el-input
          v-model="queryParams.deptId"
          placeholder="请输入区域ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="组件ID" prop="componentId">
        <el-input
          v-model="queryParams.componentId"
          placeholder="请输入组件ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="组件类型" prop="componentType">
        <el-select v-model="queryParams.componentType" placeholder="请选择组件类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="组件名称" prop="componentName">
        <el-input
          v-model="queryParams.componentName"
          placeholder="请输入组件名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障描述" prop="description">
        <el-input
          v-model="queryParams.description"
          placeholder="请输入故障描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障码" prop="errorCode">
        <el-input
          v-model="queryParams.errorCode"
          placeholder="请输入故障码"
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
      <el-form-item label="处理阶段" prop="jd">
        <el-input
          v-model="queryParams.jd"
          placeholder="请输入处理阶段"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="阶段名" prop="jdName">
        <el-input
          v-model="queryParams.jdName"
          placeholder="请输入阶段名"
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
          v-hasPermi="['yw:event:add']"
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
          v-hasPermi="['yw:event:edit']"
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
          v-hasPermi="['yw:event:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['yw:event:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="eventList" @selection-change="handleSelectionChange" height="200">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="区域ID" align="center" prop="deptId" />
      <el-table-column label="组件ID" align="center" prop="componentId" />
      <el-table-column label="组件类型" align="center" prop="componentType" />
      <el-table-column label="组件名称" align="center" prop="componentName" />
      <el-table-column label="故障描述" align="center" prop="description" />
      <el-table-column label="故障码" align="center" prop="errorCode" />
      <el-table-column label="上报时间" align="center" prop="reportTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.reportTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理阶段" align="center" prop="jd" />
      <el-table-column label="阶段名" align="center" prop="jdName" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['yw:event:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['yw:event:remove']"
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

    <!-- 添加或修改运维工单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="区域ID" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入区域ID" />
        </el-form-item>
        <el-form-item label="组件ID" prop="componentId">
          <el-input v-model="form.componentId" placeholder="请输入组件ID" />
        </el-form-item>
        <el-form-item label="组件类型" prop="componentType">
          <el-select v-model="form.componentType" placeholder="请选择组件类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="组件名称" prop="componentName">
          <el-input v-model="form.componentName" placeholder="请输入组件名称" />
        </el-form-item>
        <el-form-item label="故障描述" prop="description">
          <el-input v-model="form.description" placeholder="请输入故障描述" />
        </el-form-item>
        <el-form-item label="故障码" prop="errorCode">
          <el-input v-model="form.errorCode" placeholder="请输入故障码" />
        </el-form-item>
        <el-form-item label="上报时间" prop="reportTime">
          <el-date-picker clearable size="small"
            v-model="form.reportTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择上报时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="处理阶段" prop="jd">
          <el-input v-model="form.jd" placeholder="请输入处理阶段" />
        </el-form-item>
        <el-form-item label="阶段名" prop="jdName">
          <el-input v-model="form.jdName" placeholder="请输入阶段名" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listEvent, getEvent, delEvent, addEvent, updateEvent } from "@/api/yw/event";

export default {
  name: "Event",
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
      // 运维工单表格数据
      eventList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deptId: null,
        componentId: null,
        componentType: null,
        componentName: null,
        description: null,
        errorCode: null,
        reportTime: null,
        jd: null,
        jdName: null,
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
  },
  methods: {
    /** 查询运维工单列表 */
    getList() {
      this.loading = true;
      listEvent(this.queryParams).then(response => {
        this.eventList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
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
        componentId: null,
        componentType: null,
        componentName: null,
        description: null,
        errorCode: null,
        reportTime: null,
        jd: null,
        jdName: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
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
      this.title = "添加运维工单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getEvent(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改运维工单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateEvent(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addEvent(this.form).then(response => {
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
      this.$confirm('是否确认删除运维工单编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delEvent(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('yw/event/export', {
        ...this.queryParams
      }, `yw_event.xlsx`)
    }
  }
};
</script>