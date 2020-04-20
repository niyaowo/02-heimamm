<template>
  <div class="addUser">
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <div class="title" slot="title">{{mode=="add"?"新增用户":"编辑用户"}}</div>

      <el-form label-width="auto" :model="form" ref="form" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="role_id" label="角色">
          <el-select v-model="form.role_id">
            <el-option
              v-for="(value,key, index) in $store.state.roleObj"
              :key="index"
              :label="value"
              :value="+key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="form.status">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="remark" label="用户备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addUser, editUser } from "@/api/userList.js";
export default {
  props: ["mode"],
  data() {
    return {
      dialogVisible: false,
      form: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称" }],
        email: [
          { required: true, message: "请输入邮箱" },
          {
            validator: (rule, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("请输入正确的邮箱");
              }
            },
            triger: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入电话" },
          {
            validator: (rule, value, callback) => {
              let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("请输入正确的手机号");
              }
            },
            triger: "change"
          }
        ],
        role_id: [{ required: true, message: "请输入角色" }],
        status: [{ required: true, message: "请输入状态" }]
      }
    };
  },
  watch: {
    dialogVisible(newVla) {
      if (newVla == false) {
        // 清空表单内容
        this.$refs.form.resetFields();
      } else {
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    }
  },
  methods: {
    add() {
      this.$refs.form.validate(res => {
        if (res) {
          if (this.mode == "add") {
            addUser(this.form).then(() => {
              this.$message.success("新增成功");
              this.dialogVisible = false;
              // this.$parent.search();
              this.$emit("search");
            });
          } else {
            editUser(this.form).then(() => {
              this.dialogVisible = false;
              this.$message.success("编辑成功");
              this.$emit("search");
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.addUser {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    height: 53px;
    background: linear-gradient(45deg, #01c5fa, #1394fa);
    color: #fff;
    line-height: 53px;
  }
}
</style>