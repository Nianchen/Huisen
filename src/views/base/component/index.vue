<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="queryParams.name" placeholder="请输入名称" clearable size="small" @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="厂商" prop="providerName">
        <el-input v-model="queryParams.providerName" placeholder="请输入厂商" clearable size="small" @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择类型" clearable size="small">
          <el-option v-for="dict in typeOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue"/>
        </el-select>
      </el-form-item>
      <el-form-item label="型号" prop="model">
        <el-input v-model="queryParams.model" placeholder="请输入型号" clearable size="small" @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['base:component:edit']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate" v-hasPermi="['base:component:edit']">修改</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="componentList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="类型" align="center" prop="type" :formatter="typeFormat"/>
      <el-table-column label="名称" align="center" prop="name"/>
       <el-table-column label="厂商" align="center" prop="providerName" />
      <el-table-column label="型号" align="center" prop="model"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" v-hasPermi="['base:component:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" v-hasPermi="['base:component:edit']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList"/>

    <!-- 添加或修改基础组件对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="50%" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择类型" @change="typeChange">
                <el-option v-for="dict in typeOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="厂商" prop="providerId">
              <el-select v-model="form.providerId" placeholder="请选择厂商" @change="getProviderName">
                <el-option v-for="provider in providerList" :key="provider.id" :label="provider.name" :value="provider.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="型号" prop="model">
              <el-input v-model="form.model" placeholder="请输入型号"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="开发文档">
          <el-upload
            class="upload-demo"
            multiple
            :headers="headers"
            :action="uploadFileUrl"
            show-file-list
            :before-upload="beforeUpload"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove"
            :on-preview="handlePreview"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">
              文件
              <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
              <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
            </div>
          </el-upload>
        </el-form-item>
        <div v-for="(item, index) in domainForm" :key="index">
          <el-form :model="item" :rules="domainRules" label-width="80px">

            <p>配置参数{{ index + 1 }}  <i v-if="index!=0" @click="delDomainClick(item,index)" class="el-icon-delete" style="font-size:20px;cursor:pointer;color:red"></i></p>

            <el-row>
              <el-col :span="6">
                <el-form-item label="名称" prop="Tname">
                  <el-input v-model="item.Tname" placeholder="请输入名称"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="标签" prop="Tlabel">
                  <el-input v-model="item.Tlabel" placeholder="请输入标签"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="数据类型" prop="Ttype">
                  <el-select v-model="item.Ttype" placeholder="请选择类型">
                    <el-option label="String" value="String"/>
                    <el-option label="Number" value="Number"/>
                    <el-option label="IP" value="IP"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="值" prop="Tvalue">
                  <el-input @focus="getIndex(index)" v-model="item.Tvalue" placeholder="请输入值"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <el-form-item>
          <el-button @click="domainClick">新增参数</el-button>
        </el-form-item>
      </el-form>

      <!-- </el-form> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {listComponent, getComponent, delComponent, addComponent, updateComponent,getProviderModelData} from "@/api/base/component";
import {listProvider} from "@/api/base/provider";
import {getToken} from "@/utils/auth";


export default {
  name: "BaseComponent",
  data() {
    var vaildValue = (rule, value, callback) => {
      let type = this.domainForm[this.index].Ttype;

      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (type === "Number") {
        if (!Number(value)) {
          callback(new Error("请输入Number类型的值"));
        }
      }
      if (type === "IP") {
        if (!reg.test(value)) {
          callback(new Error("请输入正确的ip地址"));
        }
      }
    };

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
      // 基础组件表格数据
      componentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 类型(字典：1、灯光，2、气象监测，3、视频监控，4、LED大屏，5、广播，6、一键报警)字典
      typeOptions: [],
      // 类型   字典
      controlTypeOptions: [],
      list: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: null,
        name: null,
        providerId: null,
        providerName: null,
        controlType: null,
        model: null,
        url: null,
        configTemplate: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        type: [{required: true, message: "请选择类型", trigger: "blur"}],
        name: [{required: true, message: "请输入名称", trigger: "blur"}],
        providerId: [
          {required: true, message: "请输入选择厂商", trigger: "blur"},
        ],
        model: [{required: true, message: "请输入型号", trigger: "blur"}],
      },
      domainRules: {
        Tvalue: [{validator: vaildValue, trigger: "blur"}],
        Tname: [{required: true, message: "请输入参数名称", trigger: "blur"}],
        Tlabel: [{required: true, message: "请输入标签", trigger: "blur"}],
        Ttype: [{required: true, message: "请选择数据类型", trigger: "blur"},],
      },
      providerList: [],
      domainForm: [],
      index: 0,
      uploadFileUrl: process.env.VUE_APP_BASE_API + "/file/upload", // 上传的图片服务器地址
      fileList: [],
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      fileType:["doc", "docx", "xls", "xlsx", "ppt", "txt", "pdf"],
      fileSize:10
    };
  },
  created() {
    this.getList();
    this.getDicts("component_type").then((response) => {
      this.typeOptions = response.data;
    });
  },
  methods: {
    /** 查询基础组件列表 */
    getList() {
      this.loading = true;
      listComponent(this.queryParams).then((response) => {
        this.componentList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 类型(字典：1、灯光，2、气象监测，3、视频监控，4、LED大屏，5、广播，6、一键报警)字典翻译
    typeFormat(row, column) {
      return this.selectDictLabels(this.typeOptions, row.type);
    },
    /****************************** 文件上传 start *************************************/
    //上传之前校验
    beforeUpload(file){
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$message.error(`文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`);
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      return true;
    },
    //上传成功
    handleUploadSuccess(res, file, fileList) {
      this.fileList = fileList;
      this.$message.success("文件上传成功!");
    },
    //删除
    handleRemove(res, fileList) {
      this.fileList = fileList;
    },
    handlePreview(file){
      window.open(file.response.data.url)
    },
    /****************************** 文件上传 end *************************************/
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        type: null,
        name: null,
        providerId: null,
        providerName: null,
        controlType: null,
        model: null,
        url: null,
        configTemplate: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remarks: null,
        delFlag: null
      };
      this.domainForm = [{Tname: null, Tlabel: null, Ttype: null, Tvalue: null}];
      this.fileList = [];
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
      this.title = "添加基础组件";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getComponent(id).then((response) => {
        let configTemplate = JSON.parse(response.data.configTemplate);
        this.form = response.data;
        if(this.form.url) this.fileList = JSON.parse(this.form.url);
        this.domainForm = configTemplate;
        this.open = true;
        this.title = "修改基础组件";
      });
    },
    //得到index
    getIndex(index) {
      this.index = index;
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        this.form.configTemplate = JSON.stringify(this.domainForm);
        if (valid) {
          if (this.fileList) this.form.url = JSON.stringify(this.fileList);
          if (this.form.id != null) {
            updateComponent(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addComponent(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
              this.form.url = "";
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm(
        '是否确认删除基础组件编号为"' + ids + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          return delComponent(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        });
    },
    getProviderList(type) {
      listProvider({type:type}).then((response) => {
        this.providerList = response.rows;
        this.total = response.total;
      });
    },
    getProviderName(value){
      let node = this.providerList.find((item)=>{
        return item.id === value;
      });
      this.form.providerName = node.name;
    },
    typeChange() {
      this.form.providerName = "";
      this.form.providerId = "";
      this.getProviderList(this.form.type);
    },
    domainClick() {
      this.domainForm.push({
        name: "",
        label: "",
        type: "",
        value: "",
      });
    },

    // 删除参数项
    delDomainClick(item,index){
      this.domainForm.splice(index,1)
    }
  },
};
</script>
<style lang="scss" scoped>
.app-container ::v-deep .el-table tr {
  background-color: transparent;
}

.app-container ::v-deep .el-table tr:hover {
  background-color: transparent;
}

.app-container ::v-deep .el-form-item__label {
  color: black;
}

.el-form ::v-deep .el-form-item__label {
  color: black;
}

.app-container ::v-deep .el-table td {
  border-bottom: 1px solid rgb(219, 218, 218);
}

.app-container
::v-deep
.el-table--enable-row-hover
.el-table__body
tr:hover
> td {
  background-color: #eee;
}

.el-message-box__wrapper ::v-deep .el-message-box {
  background-color: #fff !important;
  // border: none;
  color: black !important;
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
// .el-select-dropdown__empty{
//   background-color: #fff !important;
// }
</style>
