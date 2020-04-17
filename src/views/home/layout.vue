<template>
  <div class="layout">
    <el-container>
      <!-- 头部 -->
      <el-header class="head">
        <div class="left">
          <i class="el-icon-s-fold icon" @click="collapse=!collapse"></i>
          <img src="@/assets/img/indexLogin.png" class="img" alt />
          <span class="leftTxt">黑马面面</span>
        </div>
        <div class="right">
          <img :src="userInfo.avatar" class="img" alt />
          <span class="rightText">{{userInfo.username}}</span>
          <el-button type="primary" @click="logOut">退出</el-button>
        </div>
      </el-header>
      <!-- 主体部分 -->
      <el-container>
        <!-- 导航栏 -->
        <el-aside width="auto" class="aside">
          <el-menu
            :router="true"
            :default-active="$route.fullPath"
            :collapse="collapse"
            class="transition"
          >
            <el-menu-item index="/home/chart">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>
            <el-menu-item index="/home/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/home/question">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/home/business">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/home/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主体内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUserInfo, userLogOut } from "@/api/home.js";
import { removeToken } from "@/utils/token.js";
export default {
  data() {
    return {
      // 用户信息
      userInfo: "",
      // 导航栏折叠与否
      collapse: false
    };
  },
  methods: {
    // 用户退出
    logOut() {
      this.$confirm("您确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      }).then(() => {
        userLogOut().then(() => {
          this.$message.success("成功退出");
          removeToken();
          this.$router.push("/login");
        });
      });
    }
  },
  created() {
    getUserInfo().then(res => {
      this.userInfo = res.data;
      // 用户头像需要基地址 配合图片地址才能获取
      this.userInfo.avatar = process.env.VUE_APP_URL + "/" + res.data.avatar;
      // 将用户数据信息 保存到数据管理器 store
      this.$store.state.userInfo = this.userInfo;
      // 将用户角色/身份保存到数据共享中
      this.$store.state.role = res.data.role;
    });
  }
};
</script>

<style lang="less" >
.layout {
  height: 100%;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .aside {
    width: 200px;
    background: #fff;
    .transition:not(.el-menu--collapse) {
      width: 200px;
    }
  }
  .left,
  .right {
    display: flex;
    align-items: center;
  }
  .left {
    .icon {
      font-size: 25px;
    }
    .img {
      width: 33px;
      height: 28px;
      margin-left: 20px;
      margin-right: 11px;
    }
    .leftTxt {
      width: 92px;
      font-size: 22px;
      color: rgba(73, 161, 255, 1);
    }
  }
  .right {
    .img {
      width: 50px;
      height: 43px;
    }
    .rightText {
      margin: 0 15px;
    }
  }

  .el-header,
  .el-footer {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .aside {
    height: 100%;
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 200px;
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);

    .transition:not(.el-menu--collapse) {
      width: 200px;
    }
  }

  // .el-main {
  //   height: 100%;
  //   background-color: #e9eef3;
  //   color: #333;
  //   text-align: center;
  // }
  .el-container {
    height: 100%;
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>