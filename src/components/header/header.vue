<template>
  <div class="hello">
    <el-row class="header">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-col :span="3">
            <div class="grid-content bg-purple-dark" style="background:#15a589;">厨厨招聘</div>
          </el-col>
          <el-col
            :span="21"
            style="background:#18bc9c;"
            type="flex"
            class="row-bg"
            justify="space-between"
          >
            <div class="grid-content bg-purple-dark">
              <el-col :span="18" style="height:50px;">
                <div class="grid-content bg-purple-dark"></div>
              </el-col>
              <el-col :span="6">
                <div
                  class="grid-content bg-purple-dark"
                  style="display:flex;justify-content: center;"
                >
                  <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link" style="display:flex">
                      <el-avatar :src="circleUrl" style="margin-top:5px;"></el-avatar>
                      <span style="display:block;margin-left:10px;color:#fff;">{{name}}</span>
                      <i
                        class="el-icon-arrow-down el-icon--right"
                        style="line-height: 50px;color:#fff;"
                      ></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="is_dark">注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { Button, Select } from 'element-ui';
import lefts from "@/components/left/left.vue";
import api from "../../../src/api";
import { error } from "util";
export default {
  name: "headers",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      name: "",
      is_dark: ""
    };
  },
  component: { lefts },
  created() {
    let that = this;
    that.$axios
      .post(api.getUserDetail)
      .then(res => {
        console.log(res.data.usr);
        this.name = res.data.name;
        this.is_dark = res.data.id;
        if (res.data.code == 300000) {
          this.$router.push("/login");
        }
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    handleCommand(command) {
      let data = {
        id: command
      };
      let that = this;
      this.$axios
        .post(this.api.logout, data)
        .then(res => {
          if (res.data.success == true) {
            this.$message({
              message: "成功退出",
              type: "success",
              duration: 500,
              onClose() {
                that.$router.push("/login");
              }
            });
            // if(res)
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
@import "header.css";
</style>
