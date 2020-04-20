<template>
  <div class="addBusiness">
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <div class="title" slot="title">{{mode=="add"?"新增企业":"编辑企业"}}</div>

      <el-form label-width="auto" :model="form" ref="form" :rules="rules">
        <el-form-item prop="eid" label="企业编号">
          <el-input v-model="form.eid"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="企业名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="short_name" label="企业简称">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="企业简介">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="企业备注">
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
import { addBusiness, editBusiness } from "@/api/business.js";
export default {
  props: ["mode"],
  data() {
    return {
      dialogVisible: false,
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号" }],
        name: [{ required: true, message: "请输入企业名称" }],
        short_name: [{ required: true, message: "请输入企业简称" }],
        intro: [{ required: true, message: "请输入企业简介" }]
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
            addBusiness(this.form).then(res => {
              console.log(res);
              this.$message.success("新增成功");
              this.dialogVisible = false;
              // this.$parent.search();
              this.$emit("search");
            });
          } else {
            editBusiness(this.form).then(() => {
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
.addBusiness {
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