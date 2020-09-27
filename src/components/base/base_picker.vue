<template>
  <div class="transition-box piecker">
    <el-row type="flex" justify="end">
      <el-col :span="24" class="pading_none none_title">
        <div>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">编辑</div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple-dark" style="text-align: right;">
              <i class="el-icon-circle-close"></i>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="2">
        <div class="grid-content bg-purple-dark" style="text-align: right;margin:0 auto;"></div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-dark" style="text-align: right;margin:0 auto;">
          <div class="picker_input">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item v-for="(item,index) in lable_list" :key="index" :label="item.name">
                <el-input v-model="formLabelAlign.name">{{item}}</el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content bg-purple-dark" style="text-align: right;margin:0 auto;"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="pading_none" style="padding-bottom:30px;">
        <div class>
          <el-button type="primary" size="small" @click="ok_http">确定</el-button>
          <el-button size="small" @click="sendMsg">取消</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import admin from "@/components/permissions/admin/admin.vue";
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
    };
  },
  props:['sendList','lable_list'],
  methods:{
    sendMsg() {
      this.$emit('sendMessage', false)
    },
    ok_http(){
      
    }
  }
};
</script>
<style scoped>
.piecker {
  width: 50%;
  position: absolute;
  top: 180px;
  left: 50%;
  border-radius: 5px;
  background: #eeeeee;
  margin-left: -25%;
  -webkit-box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3) !important;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3) !important;
}
.pading_none {
  padding: 10px 20px;
}
.none_title {
  background: #2c3e50;
  color: #ffffff;
  margin-bottom: 20px;
}
</style>