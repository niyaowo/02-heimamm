<template>
  <div id="login">
    <div class="left">
      <!-- 标题 -->
      <div class="title">
        <img src="@/assets/img/indexLogin.png" class="img" alt />
        <span class="txt">黑马面面 | 用户登入</span>
      </div>
      <!-- 表单 -->
      <div class="formData">
        <el-form>
          <!-- 用户名/手机号 -->
          <el-form-item>
            <el-input prefix-icon="el-icon-user" placeholder="请输入内容"></el-input>
          </el-form-item>
          <!-- 密码框 -->
          <el-form-item>
            <el-input show-password prefix-icon="el-icon-lock" placeholder="请输入内容"></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-key"></el-input>
            <img src alt />
          </el-form-item>
          <!-- 用户协议 -->
          <el-form-item>
            <el-checkbox>
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-form-item>
        </el-form>
        <!-- 表单按钮 -->
        <el-button type="primary" class="loginUp">登入</el-button>
        <br />
        <el-button type="primary" class="loginIn">注册</el-button>
      </div>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
#login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(45deg, #1594f8, #04c6fa);
  height: 100%;
  .left {
    padding: 43px 41px 0 44px;
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    .title {
      display: flex;
      justify-items: center;

      .img {
        margin-left: 10px;
        width: 22px;
        height: 17px;
      }

      .txt {
        font-size: 24px;
        margin-left: 16px;
      }
    }

    .formData {
      margin-top: 25px;
    }

    .loginUp,
    .loginIn {
      width: 100%;
    }

    .loginIn {
      margin-top: 26px;
    }
  }
}
</style>