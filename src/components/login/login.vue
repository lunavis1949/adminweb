<template>
  <div class="login">
    <div class="login_con">
      <div class="login_content">
        <el-avatar :src="circleUrl" class="avter"></el-avatar>
        <el-form :model="dynamicValidateForm" cstatus-icon ref="ruleForm">
          <el-form-item>
            <el-input
              prefix-icon="el-icon-s-custom"
              placeholder="请输入用户名"
              v-model="dynamicValidateForm.username"
              class="inputs"
            ></el-input>
          </el-form-item>
          <el-form-item :required="true">
            <el-input
              class="inputs"
              show-password
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              v-model="dynamicValidateForm.password"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-row class="Verification_con">
              <el-col :span="16">
                <el-input
                  class="inputs"
                  prefix-icon="el-icon-unlock"
                  placeholder="请输入验证码"
                  v-model="dynamicValidateForm.ver_Con"
                  style="width:100%;"
                ></el-input>
              </el-col>
              <el-col :span="8">
                <img :src="Verification" class="verification" />
              </el-col>
            </el-row>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="onSubmit(dynamicValidateForm)" class="buttons">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../../src/api";
export default {
  data() {
    return {
      circleUrl: "https://cdn.moshou.site/assets/img/avatar.png", //头像
      dynamicValidateForm: {
        // username: "admin", //用户名
        // password: "moshou", //密码
        username: "", //用户名
        password: "", //密码
        ver_Con: "" //验证码
      },
      Verification: "https://test.moshou.site/index.php?s=/captcha" //验证码
    };
  },
  methods: {
    onSubmit(dynamicValidateForm) {
      let data = {
        usr: dynamicValidateForm.username,
        pwd: dynamicValidateForm.password
      };
      let username = dynamicValidateForm.username;
      let password = dynamicValidateForm.password;
      if (username == "" || username == undefined) {
        this.$message({
          showClose: true,
          message: "账号不能为空！",
          type: "warning"
        });
        return false;
      }
      if (password == "" || password == undefined) {
        this.$message({
          showClose: true,
          message: "密码不能为空！",
          type: "warning"
        });
        return false;
      }

    
      let that = this;
      that.$axios
        .post(api.login, data)
        .then(res => {
          console.log(res.data);
          if (res.data.success == true) {
            this.$message({
              message: "登录成功",
              type: "success",
              duration: 500,
              onClose() {
                that.$router.push("/");
              }
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
@import url("login.css");
</style>