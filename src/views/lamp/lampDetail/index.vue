<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="任务编号" prop="no">
        <el-input
          v-model="queryParams.no"
          placeholder="请输入任务编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="任务开始时间" prop="startDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.startDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择任务开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="亮度-灯头1" prop="brightnessCap1">
        <el-input
          v-model="queryParams.brightnessCap1"
          placeholder="请输入亮度-灯头1"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="亮度-灯头二" prop="brightnessCap2">
        <el-input
          v-model="queryParams.brightnessCap2"
          placeholder="请输入亮度-灯头二"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="亮度-灯头三" prop="brightnessCap3">
        <el-input
          v-model="queryParams.brightnessCap3"
          placeholder="请输入亮度-灯头三"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="亮度-灯头四" prop="brightnessCap4">
        <el-input
          v-model="queryParams.brightnessCap4"
          placeholder="请输入亮度-灯头四"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="亮度-灯头五" prop="brightnessCap5">
        <el-input
          v-model="queryParams.brightnessCap5"
          placeholder="请输入亮度-灯头五"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="亮度-灯头六" prop="brightnessCap6">
        <el-input
          v-model="queryParams.brightnessCap6"
          placeholder="请输入亮度-灯头六"
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
          v-hasPermi="['lamp:lampDetail:add']"
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
          v-hasPermi="['lamp:lampDetail:edit']"
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
          v-hasPermi="['lamp:lampDetail:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['lamp:lampDetail:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="lampDetailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="任务开始时间" align="center" prop="startDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="亮度-灯头1" align="center" prop="brightnessCap1" />
      <el-table-column label="亮度-灯头二" align="center" prop="brightnessCap2" />
      <el-table-column label="亮度-灯头三" align="center" prop="brightnessCap3" />
      <el-table-column label="亮度-灯头四" align="center" prop="brightnessCap4" />
      <el-table-column label="亮度-灯头五" align="center" prop="brightnessCap5" />
      <el-table-column label="亮度-灯头六" align="center" prop="brightnessCap6" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['lamp:lampDetail:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['lamp:lampDetail:remove']"
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

    <!-- 添加或修改路灯控制策略明细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="控制id" prop="controlId">
          <el-input v-model="form.controlId" placeholder="请输入控制id" />
        </el-form-item>
        <el-form-item label="任务编号" prop="no">
          <el-input v-model="form.no" placeholder="请输入任务编号" />
        </el-form-item>
        <el-form-item label="任务开始时间" prop="startDate">
          <el-date-picker clearable size="small"
            v-model="form.startDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择任务开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="亮度-灯头1" prop="brightnessCap1">
          <el-input v-model="form.brightnessCap1" placeholder="请输入亮度-灯头1" />
        </el-form-item>
        <el-form-item label="亮度-灯头二" prop="brightnessCap2">
          <el-input v-model="form.brightnessCap2" placeholder="请输入亮度-灯头二" />
        </el-form-item>
        <el-form-item label="亮度-灯头三" prop="brightnessCap3">
          <el-input v-model="form.brightnessCap3" placeholder="请输入亮度-灯头三" />
        </el-form-item>
        <el-form-item label="亮度-灯头四" prop="brightnessCap4">
          <el-input v-model="form.brightnessCap4" placeholder="请输入亮度-灯头四" />
        </el-form-item>
        <el-form-item label="亮度-灯头五" prop="brightnessCap5">
          <el-input v-model="form.brightnessCap5" placeholder="请输入亮度-灯头五" />
        </el-form-item>
        <el-form-item label="亮度-灯头六" prop="brightnessCap6">
          <el-input v-model="form.brightnessCap6" placeholder="请输入亮度-灯头六" />
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
import { listLampDetail, getLampDetail, delLampDetail, addLampDetail, updateLampDetail } from "@/api/lamp/lampDetail";

export default {
  name: "LampDetail",
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
      // 路灯控制策略明细表格数据
      lampDetailList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        no: null,
        startDate: null,
        brightnessCap1: null,
        brightnessCap2: null,
        brightnessCap3: null,
        brightnessCap4: null,
        brightnessCap5: null,
        brightnessCap6: null,
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
    /** 查询路灯控制策略明细列表 */
    getList() {
      this.loading = true;
      listLampDetail(this.queryParams).then(response => {
        this.lampDetailList = response.rows;
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
        controlId: null,
        no: null,
        startDate: null,
        brightnessCap1: null,
        brightnessCap2: null,
        brightnessCap3: null,
        brightnessCap4: null,
        brightnessCap5: null,
        brightnessCap6: null,
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
      this.title = "添加路灯控制策略明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLampDetail(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改路灯控制策略明细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLampDetail(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLampDetail(this.form).then(response => {
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
      this.$confirm('是否确认删除路灯控制策略明细编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delLampDetail(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('lamp/lampDetail/export', {
        ...this.queryParams
      }, `lamp_lampDetail.xlsx`)
    }
  }
};
</script>