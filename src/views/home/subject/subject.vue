<template>
  <div class="subject">
    <!-- 头部 -->
    <el-card shadow>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="学科编号:">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者:">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="clear">删除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 主题内容表格 -->
    <el-card class="card">
      <el-table :data="subjectList" border>
        <el-table-column label="序号" width="60px" align="center">
          <!-- 序号=(当前页-1)*页面条数+下标+1(scope.$indin+1) -->
          <template slot-scope="scope">{{ (pageData.cPage-1)*pageData.pageSize+scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column prop="rid" label="学科编号" width="150px" align="center"></el-table-column>
        <el-table-column prop="name" label="学科名称" align="center"></el-table-column>
        <el-table-column prop="short_name" label="简称" align="center"></el-table-column>
        <el-table-column prop="username" label="创建者" align="center"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" align="center"></el-table-column>
        <el-table-column label="状态" width="120px" align="center">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?"启用":"禁用"}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            <el-button
              :type="scope.row.status==0?'success':'info'"
              @click="status(scope.row.id)"
            >{{scope.row.status==0?"启用":"禁用"}}</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
          :model="pageData"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageData.cPage"
          :page-sizes="pageData.pageSizeArr"
          :page-size="pageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageData.total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 注册子组件 -->
    <addSubject ref="subject" :mode="mode" @search="search"></addSubject>
  </div>
</template>

<script>
import addSubject from "./addSubject.vue";
import { getSubjectData, setSubjectStatus, delSubject } from "@/api/subject.js";

export default {
  components: {
    addSubject
  },
  data() {
    return {
      mode: "add",
      // 行内表单数据
      form: {
        name: "",
        rid: "",
        username: "",
        status: ""
      },
      // 学科列表
      subjectList: [],
      // 分页数据
      pageData: {
        cPage: 1,
        total: 10,
        pageSize: 2,
        pageSizeArr: [2, 5, 10, 20, 50]
      }
    };
  },
  methods: {
    // 获取学科数据
    getData() {
      // 请求参数
      let _params = {
        page: this.pageData.cPage,
        limit: this.pageData.pageSize,
        ...this.form
      };
      getSubjectData(_params).then(res => {
        this.subjectList = res.data.items;
        this.pageData.total = res.data.pagination.total;
      });
    },
    // 查询按钮事件
    search() {
      // 回到第一页
      this.pageData.cPage = 1;
      this.getData();
    },
    // 清除表单输入框数据
    clear() {
      this.form = {
        name: "",
        rid: "",
        username: "",
        status: ""
      };
    },
    // 当页面容量改变
    handleSizeChange(size) {
      this.pageData.pageSize = size;
      this.search();
    },
    // 当当前页改变
    handleCurrentChange(page) {
      this.pageData.cPage = page;
      this.getData();
    },
    // 修改学科状态
    status(id) {
      setSubjectStatus({ id }).then(() => {
        this.$message.success("修改成功");
        this.getData();
      });
    },
    // 删除学科
    del(id) {
      this.$confirm("此操作将永久删除该学科, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delSubject({ id }).then(() => {
          this.$message.success("删除成功");
          this.getData();
        });
      });
    },
    // 添加学科
    add() {
      this.$refs.subject.form = {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      };
      this.mode = "add";
      this.$refs.subject.dialogVisible = true;
    },
    // 编辑学科
    edit(row) {
      this.$refs.subject.form = JSON.parse(JSON.stringify(row));
      this.mode = "edit";
      this.$refs.subject.dialogVisible = true;
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
.subject {
  .el-form--inline .el-form-item__label {
    margin-left: 16px;
  }
  .card {
    margin-top: 20px;

    .page {
      margin-top: 25px;
      text-align: center;
    }
    .red {
      color: red;
    }
  }
}
</style>