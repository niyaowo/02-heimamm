<template>
  <div class="register">
    <!-- 注册对话框 -->
    <el-dialog :visible.sync="visible" width="30%" center :show-close="false">
      <!-- 标题 -->
      <div class="title" slot="title">用户注册</div>
      <!-- 表单 -->
      <el-form
        :rules="rules"
        ref="ruleForm"
        :model="form"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 用户头像上传 -->
        <el-form-item label="头像" prop="avatar">
          <el-upload
            v-model="form.avatar"
            class="avatar-uploader"
            :action="baseUrl+'/uploads'"
            name="image"
            :show-file-list="false"
            :on-success="hanydleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 用户昵称 -->
        <el-form-item label="昵称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" :show-password="true"></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item label="图形码" prop="code" class="yanCode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <img :src="codeUrl" class="img" @click="getCodeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" prop="rcode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.rcode"></el-input>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button @click="phoneCode">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible=false">取 消</el-button>
        <el-button type="primary" @click="userReg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 导入api接口文件
import { getCodeUrl, userRegister } from "@/api/register.js";
export default {
  data() {
    return {
      // 注册页面显示与否
      visible: false,
      // 头像地址
      imageUrl: "",
      // 接口基地址
      baseUrl: process.env.VUE_APP_URL,
      // 图形验证码
      codeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      // 表单验证数据
      form: {
        avatar: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        rcode: "",
        // 图形码
        code: ""
      },
      // 输入框验证规则
      rules: {
        avatar: [{ required: true, message: "请上传头像" }],
        username: [
          { required: true, message: "请输入用户名" },
          { max: 8, min: 6, message: "字符长度在 6~8 位" }
        ],
        email: [
          { required: true, message: "请输入邮箱" },
          {
            validator: (rule, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (reg.test(value)) {
                callback(); // 回调无参正常返回
              } else {
                callback("请输入正确邮箱"); // 返回错误信息
              }
            },
            trigge: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号" },
          {
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
          { max: 10, min: 6, message: "字符长度在 6~10 位" }
        ],
        code: [
          { required: true, message: "请输入图形码" },
          { max: 4, min: 4, message: "图形码不正确" }
        ],
        rcode: [
          { required: true, message: "请输入验证码" },
          { max: 4, min: 4, message: "验证码不正确" }
        ]
      }
    };
  },
  // 数据监听器
  watch: {
    visible(newval) {
      if (newval == false) {
        // 清空表单
        this.$refs.ruleForm.resetFields();
        // 移除图片
        this.imageUrl = "";
      }
    }
  },
  methods: {
    // 用户头像上传
    hanydleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //   设置表单头像参数
      this.form.avatar = res.data.file_path;
      this.$refs.ruleForm.validateField("avatar");
    },
    // 头像上传前的回调函数
    beforeAvatarUpload(file) {
      // 文件格式
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      // 文件大小
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 获取图形验证码
    getCodeUrl() {
      this.codeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    // 获取短信验证
    phoneCode() {
      // 对表单进行校验
      let _date = true;
      this.$refs.ruleForm.validateField(["code", "phone"], err => {
        if (err != "") {
          _date = false;
        }
      });
      if (_date == false) {
        return;
      } else {
        getCodeUrl({ phone: this.form.phone, code: this.form.code }).then(
          res => {
            this.$message.success(res.data.captcha + "");
          }
        );
      }
    },
    // 用户注册
    userReg() {
      this.$refs.ruleForm.validate(res => {
        if (res) {
          userRegister(this.form).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success("注册成功");
              // 关闭注册页
              this.visible = false;
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.register {
  .el-dialog__header {
    padding: 0px;
  }
  .title {
    height: 53px;
    color: #fff;
    line-height: 53px;
    background: linear-gradient(45deg, #00c9e0, #1195f8);
  }
  .avatar-uploader {
    width: 180px;
    margin: 0 auto;
  }
  //   用户头像上传
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  // 验证码
  .yanCode {
    .img {
      width: 100%;
      height: 100%;
      border: 1px dashed #000;
    }
  }
}
</style>