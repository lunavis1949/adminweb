<template>
  <div class="user">
    <el-row>
      <breadcrumb></breadcrumb>
    </el-row>
    <div class="titles">
      <p>账号管理</p>
      <p>生成不同的权限账号</p>
    </div>
    <el-row style="background:#ffffff;padding:15px;">
      <el-row type="flex" class="row-bg" justify="end" style="align-items: center;">
        <el-col :span="12">
          <div class="grid-content bg-purple titlr_bot" >
            <el-row>
              <el-button type="info" size="mini" icon="el-icon-refresh" @click="refresh"></el-button>
              <el-button v-if="add==true" type="info" size="mini" icon="el-icon-plus" @click="openShow">添加</el-button>
            
              <el-button v-if="del==true" :type="add_but" size="mini" icon="el-icon-delete" @click="deleter_play">删除</el-button>
            </el-row>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          :data="tableData"
         height="450"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          fit
          
          highlight-current-row
          @current-change="handleCurrentChange_tab"
        >
          <el-table-column align="center" prop="usr" label="账户" width="200"></el-table-column>
          <el-table-column align="center" prop="name" label="昵称" width="180"></el-table-column>
          <el-table-column align="center" prop="role_name.name" label="所属组别" width="150"></el-table-column>
          <el-table-column align="center" prop="state" label="状态" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="active"
                :inactive-value="inactive"
                @change="change(scope.row.status,scope.row.id)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="last_login_time" label="最后登陆" width="300"></el-table-column>
          <el-table-column align="center" label="操作" width='200' v-if="del==true || edit ==true">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="handleClick(scope.row)"
                v-if='edit==true'
              >编辑</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="remover_handleClick(scope.row)"
                v-if='del==true'
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-row>

    <!-- 弹框 -->
    <div class="transition-box piecker" v-show="show2">
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
              <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="所属组别">
                  <el-select style="width:100%;" v-model="user_arry_value" placeholder="请选择">
                    <el-option
                      v-for="item in user_arry"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="用户昵称">
                  <el-input v-model="user_name"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                  <el-input v-model="usr" :disabled='disabled'></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                  <el-input placeholder="至少6位数密码包含大小写字母和数字" v-model="pwd" show-password></el-input>
                </el-form-item>
                <!-- <el-form-item label="开启">
                  <template>
                    <div style="text-align:left">
                      <el-radio @change="radio_change(radio)" v-model="radio" label="1">关闭</el-radio>
                      <el-radio @change="radio_change(radio)" v-model="radio" label="2">开启</el-radio>
                    </div>
                  </template>
                </el-form-item>-->
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
  </div>
</template>
<script>
import breadcrumb from "@/components/base/breadcrumb";
import { error } from "util";
export default {
  data() {
    return {
      tableData: [],
      active: 1,
      inactive: 2,
      show2: false,
      add_but: "info",
      radio: "1",
      disabled:false,
      labelPosition: "right",
      user_name: "", //用户名称
      role_id: "", //角色idID
      pwd: "", //密码
      usr: "",
      user_arry: [], //用户组
      user_arry_value: "",
      add_: false,
            edit: false, //编辑权限
      del: false, //删除权限
      add: false, //添加权限
      index: false, //查看权限
    };
  },
  inject: ["local_Reload"],
  components: {
    breadcrumb
  },
  created() {
    this.onlond_http();
      let data = {
      id: this.$route.query.pid
    };
    this.$axios
      .post(this.api.getChildModule, data)
      .then(res => {
        let list_data = res.data;
        for (let i = 0; i < list_data.length; i++) {
          if (list_data[i].route_path == "edit") {
            this.edit = true;
          }
          if (list_data[i].route_path == "add") {
            this.add = true;
          }
          if (list_data[i].route_path == "del") {
            this.del = true;
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.$axios
      .post(this.api.readrolelist)
      .then(res => {
        console.log(res.data.data);
        this.user_arry = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  
  
  },

  methods: {
    refresh() {
      this.local_Reload();
    },
    //   首次渲染
    onlond_http() {
      this.$axios
        .post(this.api.getUserList)
        .then(res => {
          console.log(res.data.data);
          this.tableData = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleClick(row) {
      console.log(row);
      this.show2 = true;
      this.disabled=true
      this.user_name = row.name;
      this.role_id = row.role_id;
      this.pwd = row.pwd;
      this.usr = row.usr;
      this.id = row.id;
      this.user_arry_value = row.role_id;
      //   this.role_id=row.role_name.id
    },
    confirmDelete(row) {
      let that = this;
      let data = {
        id: row
      };
      that.$axios
        .post(this.api.deleteUser, data)
        .then(res => {
          if (res.data.success == true) {
            this.$message({
              message: "删除成功",
              type: "success",
              duration: 500,
              onClose() {
                that.local_Reload(); //刷新页面
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: "删除失败",
            type: "error"
          });
        });
    },
    // 删除用户 delMember
    async remover_handleClick(row) {
      let that = this;
      this.$confirm("此操作将永久删除此用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let msgRet = await this.confirmDelete(row.id);
        })
        .catch(() => {
          console.log("cancel");
        });
    },

    handleCurrentChange_tab(val) {
      this.add_but = "primary";
      this.user_name = val.name;
      this.role_id = val.role_id;
      this.pwd = val.pwd;
      this.usr = val.usr;
      this.id = val.id;
      this.user_arry_value = val.role_id;
    },
    change(e, id) {
      console.log(e, id);
      let data = {
        id: id,
        type: e
      };
      this.$axios
        .post(this.api.disableUser, data)
        .then(res => {
          console.log(res);
          if (res.data.success == true) {
            // this.local_Reload();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    openShow() {
      this.show2 = true;
      this.disabled=false
      this.add_ = true;
      this.user_name = "";
      this.role_id = "";
      this.pwd = "";
      this.usr = "";
      this.id = "";
      this.user_arry_value = "";
    },
    // 删除按钮
    deleter_play() {
      this.remover_handleClick(this.val);
    },
    ok_http() {
        
      if (this.add_ == true) {
        let data = {
          id: this.id,
          usr: this.usr,
          role_id: this.user_arry_value,
          name: this.user_name,
          pwd: this.pwd
        };
        this.$axios
          .post(this.api.createUser, data)
          .then(res => {
            if (res.data.success == true) {
              this.local_Reload();
            }else{
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            console.log(error);

          });
      } else {
        let data = {
          id: this.id,
          usr: this.usr,
          role_id: this.user_arry_value,
          name: this.user_name,
          pwd: this.pwd
        };
        this.$axios
          .post(this.api.updateUser, data)
          .then(res => {
            if (res.data.success == true) {
              this.local_Reload();
            }else{
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    sendMsg() {
      this.show2 = false;
    },
    select_change(value) {
      console.log(value);
    }
  }
};
</script>
<style scoped>
@import url("/user");
</style>