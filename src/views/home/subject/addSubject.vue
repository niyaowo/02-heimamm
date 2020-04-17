<template>
  <div class="addSubject">
    <el-dialog :visible.sync="dialogVisible" width="30%" center>
      <div class="title" slot="title">新增学科</div>

      <el-form label-width="auto" :model="form" ref="form" :rules="rules">
        <el-form-item prop="rid" label="学科编号">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="学科名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="short_name" label="学科简称">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="学科简介">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="学科备注">
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
import { addSubject, editSubject } from "@/api/subject.js";
export default {
  props: ["mode"],
  data() {
    return {
      dialogVisible: false,
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号" }],
        name: [{ required: true, message: "请输入学科名称" }]
      }
    };
  },
  watch: {
    dialogVisible(newVla) {
      if (newVla == false) {
        // 清空表单内容
        this.$refs.form.resetFields();
      }
    }
  },
  methods: {
    add() {
      this.$refs.form.validate(res => {
        if (res) {
          if (this.mode == "add") {
            addSubject(this.form).then(() => {
              this.$message.success("新增成功");
              this.dialogVisible = false;
              // this.$parent.search();
              this.$emit("search");
            });
          } else {
            editSubject(this.form).then(() => {
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
.addSubject {
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