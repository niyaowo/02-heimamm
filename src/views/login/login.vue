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
        <el-form :model="formData" :rules="rules" ref="form">
          <!-- 用户名/手机号 -->
          <el-form-item prop="phone">
            <el-input prefix-icon="el-icon-user" v-model="formData.phone" placeholder="请输入内容"></el-input>
          </el-form-item>
          <!-- 密码框 -->
          <el-form-item prop="password">
            <el-input
              show-password
              prefix-icon="el-icon-lock"
              v-model="formData.password"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="code">
            <el-row>
              <el-col :span="16">
                <el-input placeholder="请输入内容" v-model="formData.code" prefix-icon="el-icon-key"></el-input>
              </el-col>
              <el-col :span="7" :offset="1">
                <img :src="imageUrl" @click="getImageUrl" class="imgCode" alt />
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 用户协议 -->
          <el-form-item prop="isCheck">
            <el-checkbox v-model="formData.isCheck">
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-form-item>
        </el-form>
        <!-- 表单按钮 -->
        <el-button type="primary" class="loginUp" @click="loginUp">登入</el-button>
        <br />
        <el-button type="primary" class="loginIn" @click="showRegister">注册</el-button>
      </div>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
    <!-- 注册页面 -->
    <register ref="reg"></register>
  </div>
</template>

<script>
// 导入注册组件
import register from "./register";
// 用户登入请求
import { userLogin } from "@/api/loginUp.js";
// 导入token
import { setToken } from "@/utils/token.js";
export default {
  // 注册子组件
  components: {
    register
  },
  data() {
    return {
      // 验证码图片
      imageUrl: "",
      // 表单数据
      formData: {
        phone: "",
        password: "",
        code: "",
        ischeck: ""
      },
      // 表单校验规则
      rules: {
        phone: [
          { required: true, message: "请输入手机号" },
          {
            max: 11,
            min: 11,
            validator: (rule, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("请输入正确手机号");
              }
            },
            trigge: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码" },
          { max: 10, min: 6, message: "密码不正确" }
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { min: 4, max: 4, message: "验证码不正确" }
        ],
        isCheck: [
          {
            required: true,
            message: "请勾选用户协议和隐私条款",
            validator: (rule, value, callback) => {
              if (value == true) {
                callback();
              } else {
                callback("请勾选用户协议和隐私条款");
              }
            },
            trigge: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 用户注册页面
    showRegister() {
      this.$refs.reg.visible = true;
    },
    // 获取验证码
    getImageUrl() {
      this.imageUrl =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    },
    // 用户登入
    loginUp() {
      // 对表单做全局校验
      this.$refs.form.validate(res => {
        if (res) {
          userLogin(this.formData).then(res => {
            if (res.code == 200) {
              console.log(res);
              this.$message.success("登入成功");
              // 设置本地参数 token
              setToken(res.data.token);
            }
          });
        }
      });
    }
  },
  created() {
    // 获取验证码
    this.imageUrl = process.env.VUE_APP_URL + "/captcha?type=login";
  }
};
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

      .imgCode {
        width: 100%;
        height: 100%;
      }
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