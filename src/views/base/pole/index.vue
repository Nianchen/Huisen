<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="区域ID" prop="deptId">
        <el-input
          v-model="queryParams.deptId"
          placeholder="请输入区域ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区域名称" prop="deptName">
        <el-input
          v-model="queryParams.deptName"
          placeholder="请输入区域名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="灯杆名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入灯杆名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="灯杆桩号/编号" prop="no">
        <el-input
          v-model="queryParams.no"
          placeholder="请输入灯杆桩号/编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="安装位置" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入安装位置"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="纬度" prop="lat">
        <el-input
          v-model="queryParams.lat"
          placeholder="请输入纬度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="经度" prop="lng">
        <el-input
          v-model="queryParams.lng"
          placeholder="请输入经度"
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
          v-hasPermi="['base:pole:add']"
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
          v-hasPermi="['base:pole:edit']"
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
          v-hasPermi="['base:pole:remove']"
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
          v-hasPermi="['base:pole:export']"
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
      :data="poleList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="区域ID" align="center" prop="deptId" />

      <el-table-column label="灯杆名称" align="center" prop="name" />
      <el-table-column label="灯杆桩号/编号" align="center" prop="no" />
      <el-table-column label="安装位置" align="center" prop="address" />
      <el-table-column label="纬度" align="center" prop="lat" />
      <el-table-column label="经度" align="center" prop="lng" />
      <el-table-column label="组件ids" align="center" prop="componentIds" />
      <el-table-column label="组件状态" align="center" prop="componentStatus" />
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
            v-hasPermi="['base:pole:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['base:pole:remove']"
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

    <!-- 添加或修改灯杆对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="区域ID" prop="deptId">
          <treeselect
            v-model="form.deptId"
            :options="deptOptions"
            :show-count="true"
            placeholder="请选择归属部门"
          />
        </el-form-item>
        <!-- <el-form-item label="区域名称" prop="deptName">
          <el-input v-model="form.deptName" placeholder="请输入区域名称" />
        </el-form-item> -->
        <el-form-item label="灯杆名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入灯杆名称" />
        </el-form-item>
        <el-form-item label="灯杆桩号/编号" prop="no">
          <el-input v-model="form.no" placeholder="请输入灯杆桩号/编号" />
        </el-form-item>
        <el-form-item label="安装位置" prop="address">
          <el-input v-model="form.address" placeholder="请输入安装位置" />
        </el-form-item>
        <el-form-item label="纬度" prop="lat">
          <el-input v-model="form.lat" placeholder="请输入纬度" />
        </el-form-item>
        <el-form-item label="经度" prop="lng">
          <el-input v-model="form.lng" placeholder="请输入经度" />
        </el-form-item>
        <!-- <el-form-item label="组件ids" prop="componentIds">
          <el-input
            v-model="form.componentIds"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item> -->
        <p>组件状态</p>
        <el-row>
          <el-col :span="10">
            <el-form-item label="类型" prop="type">
              <el-input v-model="form.type" placeholder="请输入类型" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="id" prop="id">
              <el-input v-model="form.id" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="状态" prop="status">
              <el-input v-model="form.status" placeholder="请输入状态" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="dic" prop="dic">
              <el-input v-model="form.dic" placeholder="请输入字典" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <el-form-item label="组件状态" prop="componentStatus">
          <el-input
            v-model="form.componentStatus"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listPole,
  getPole,
  delPole,
  addPole,
  updatePole,
} from "@/api/base/pole";
import { treeselect } from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "Pole",
  components: {
     Treeselect
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
      // 灯杆表格数据
      poleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deptId: null,
        deptName: null,
        name: null,
        no: null,
        address: null,
        lat: null,
        lng: null,
        componentIds: null,
        componentStatus: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      deptOptions:undefined
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询灯杆列表 */
    getList() {
      this.loading = true;
      console.log(this.queryParams);
      listPole(this.queryParams).then((response) => {
        this.poleList = response.rows;
        console.log(this.poleList);
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
        deptName: null,
        name: null,
        no: null,
        address: null,
        lat: null,
        lng: null,
        componentIds: null,
        componentStatus: null,
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
      this.getTreeselect();
      this.open = true;
      this.title = "添加灯杆";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getPole(id).then((response) => {
        let componentIds = JSON.parse(response.data.componentIds);
        let componentStatus = JSON.parse(response.data.componentStatus);
        this.form = response.data;
        this.form.componentIds = componentIds;
        this.form.componentStatus = componentStatus;
        this.open = true;
        this.title = "修改灯杆";
      });
    },
    /** 提交按钮 */
    submitForm() {
      console.log(this.form);
      this.$refs["form"].validate((valid) => {
        this.form.componentIds = `{"type":"${this.form.type}","id":"${this.form.id}"}`;
        this.form.componentStatus = `{"type":"${this.form.type}","id":"${this.form.id}","status":"${this.form.status}","dic":"${this.form.dic}"}`;
        delete this.form.type;
        delete this.form.id;
        delete this.form.status;
        delete this.form.dic;
        if (valid) {
          if (this.form.id != null) {
            updatePole(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPole(this.form).then((response) => {
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
      this.$confirm('是否确认删除灯杆编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delPole(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then((response) => {
        this.deptOptions = response.data;
        
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "base/pole/export",
        {
          ...this.queryParams,
        },
        `base_pole.xlsx`
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container ::v-deep .el-table tr{
  background-color: transparent;
}
.app-container ::v-deep .el-table tr:hover{
  background-color: transparent;
}

.app-container ::v-deep .el-form-item__label{
  color: black;
}
.el-form ::v-deep .el-form-item__label{
  color: black;
}
.app-container ::v-deep .el-table td{
  border-bottom: 1px solid rgb(219, 218, 218);
}
.app-container ::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td{
  background-color: #eee;
}


.el-select-dropdown__list{
  background-color: #fff !important;
}
 .el-select-dropdown__item{
   font-size: 14px;
  background-color:#fff !important;
  color: black;
}
.el-select-dropdown__item:hover{
  background-color:#DAE1F9 !important;
}
</style>