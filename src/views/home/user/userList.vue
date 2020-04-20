<template>
  <div class="userList">
    <!-- 头部 -->
    <el-card shadow>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="用户名称:">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱:">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select placeholder="请选择角色" v-model="form.role_id">
            <el-option
              v-for="(value,key, index) in $store.state.roleObj"
              :key="index"
              :label="value"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="clear">删除</el-button>
          <el-button type="primary" @click="add">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 主题内容表格 -->
    <el-card class="card">
      <el-table :data="userList" border>
        <el-table-column label="序号" width="60px" align="center">
          <!-- 序号=(当前页-1)*页面条数+下标+1(scope.$indin+1) -->
          <template slot-scope="scope">{{ (pageData.cPage-1)*pageData.pageSize+scope.$index+1 }}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="150px" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="role" label="角色" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
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
    <addUser ref="user" :mode="mode" @search="search"></addUser>
  </div>
</template>

<script>
import addUser from "./addUser.vue";
import { getUserList, setUserStatus, delUser } from "@/api/userList.js";

export default {
  components: {
    addUser
  },
  data() {
    return {
      mode: "add",
      // 行内表单数据
      form: {
        username: "",
        email: "",
        role_id: ""
      },
      // 学科列表
      userList: [],
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
    // 获取企业数据
    getData() {
      // 请求参数
      let _params = {
        page: this.pageData.cPage,
        limit: this.pageData.pageSize,
        ...this.form
      };
      getUserList(_params).then(res => {
        this.userList = res.data.items;
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
        username: "",
        email: "",
        role_id: ""
      };
      this.search();
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
    // 修改用户状态
    status(id) {
      setUserStatus({ id }).then(() => {
        this.$message.success("修改成功");
        this.getData();
      });
    },
    // 删除用户
    del(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delUser({ id }).then(() => {
          this.$message.success("删除成功");
          this.getData();
        });
      });
    },
    // 添加用户
    add() {
      this.$refs.user.form = {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      };
      this.mode = "add";
      this.$refs.user.dialogVisible = true;
    },
    // 编辑用户
    edit(row) {
      this.$refs.user.form = JSON.parse(JSON.stringify(row));
      this.mode = "edit";
      this.$refs.user.dialogVisible = true;
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
.userList {
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