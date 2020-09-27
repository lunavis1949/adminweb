<template>
  <div class="admin">
    <el-row>
      <breadcrumb></breadcrumb>
    </el-row>

    <div class="titles">
      <p>管理员管理</p>
      <p>一个管理员可以有多个角色组,左侧的菜单根据管理员所拥有的权限进行生成</p>
    </div>

    <el-row style="background:#ffffff;padding:15px;">
      <el-row type="flex" class="row-bg" justify="end" style="align-items: center;">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-row style="display: flex;">
              <el-button type="info" size="mini" icon="el-icon-refresh" @click="refls"></el-button>
              <el-button
                v-if="add==true"
                type="info"
                size="mini"
                icon="el-icon-plus"
                @click="openShow"
              >添加</el-button>
              <el-button
                :type="add_but"
                v-if="del==true"
                size="mini"
                icon="el-icon-delete"
                @click="deleter_play"
              >删除</el-button>
              <div class="ZD_sw">
                <span>小程序置顶：</span>
                <el-switch
                  v-model="ZD_switch"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="active_value_"
                  :inactive-value="inactive_value_"
                  @change="ZD_switch_change"
                ></el-switch>
              </div>
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
          border
          style="width:100%;margin-bottom: 20px;"
          row-key="id"
          height="450"
          fit
          size="mini"
          highlight-current-row
          @current-change="handleCurrentChange_tab"
        >
          <el-table-column align="center" prop="name" label="角色名" width="150"></el-table-column>
          <el-table-column align="center" prop="city" label="所属组别" width="150"></el-table-column>

          <el-table-column align="center" prop="state" label="状态" width="70">
            <el-switch value active-color="#13ce66" inactive-color="#ff4949" @change="change"></el-switch>
          </el-table-column>
          <el-table-column align="center" prop="update_time" label="最后登陆" width="150"></el-table-column>
          <el-table-column align="center" prop="create_time" label="创建时间" width="150"></el-table-column>
          <el-table-column align="center" label="操作" v-if="del==true || edit==true">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="handleClick(scope.row)"
                v-if="scope.row.role_type !=100 && edit==true"
              >编辑</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                v-if="scope.row.role_type !=100 && del==true"
                @click="remover_handleClick(scope.row)"
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
                <el-form-item v-for="(item,index) in lable_list" :key="index" :label="item.name">
                  <el-input v-model="formLabelAlign[index]" :placeholder="item.ploader">{{item}}</el-input>
                </el-form-item>

                <el-form-item label="权限">
                  <el-tree
                    :data="data"
                    show-checkbox
                    default-expand-all
                    node-key="id"
                    ref="tree"
                    highlight-current
                    :props="defaultProps"
                    check-strictly
                    :default-checked-keys="checked_arry"
                    style="height: 200px;overflow-y: scroll;"
                  ></el-tree>
                </el-form-item>
                <el-form-item label="状态">
                  <template>
                    <div style="text-align:left">
                      <el-radio @change="radio_change(radio)" v-model="radio" label="1">显示</el-radio>
                      <el-radio @change="radio_change(radio)" v-model="radio" label="2">隐藏</el-radio>
                    </div>
                  </template>
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
  </div>
</template>
<script>
import base_picker from "@/components/base/base_picker.vue";
import breadcrumb from "@/components/base/breadcrumb";
import { fail } from "assert";
import { error } from "util";

export default {
  components: {
    breadcrumb
  },
  data() {
    return {
      icon_url: "",
      input4: "",
      ZD_switch: "",
      active_value_: 1,
      inactive_value_: 0,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      width: 20,
      tableData: [],
      add_but: "info",
      // 弹框配置
      show2: false,
      ed: false,
      labelPosition: "right",
      lable_list: [
        {
          name: "名称",
          ploader: "请填写名称"
        }
      ], //配置编辑Input
      formLabelAlign: ["", ""], //名称 权限

      pid: this.glaData.Level_ID, //默认父模块ID为根模块
      radio: "1", //默认显示
      add_status: 1,
      edit: false, //是否编辑

      defaultProps: {
        children: "children",
        label: "title"
      },
      data: [],
      checked_arry: ["1553597761733738"],
      edit: false, //编辑权限
      del: false, //删除权限
      add: false, //添加权限
      index: false //查看权限
    };
  },
  inject: ["local_Reload"],
  created() {
    this.$axios
      .post(this.api.readrolelist)
      .then(res => {
        console.log(res.data.data);
        this.tableData = res.data.data;
      })
      .catch(error => {});
    this.$axios
      .post(this.api.getWxconfig)
      .then(res => {
        console.log(res.data.data);
        this.ZD_switch = res.data.data;
      })
      .catch(error => {});
    this.$axios
      .post(this.api.getpagelist)
      .then(res => {
        this.data = res.data.data;
      })
      .catch(error => {});
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
  },
  methods: {
    ZD_switch_change() {
      let data = {
        top: this.ZD_switch
      };
      this.$axios
        .post(this.api.setWxconfig, data)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    refls() {
      this.local_Reload();
    },
    openShow() {
      this.show2 = true;
      this.ed = true;
      this.formLabelAlign[0] = "";
    },
    // 编辑模块
    handleClick(row) {
      this.show2 = true;
      this.edit = true;
      this.ed = false;
      console.log(row);
      this.formLabelAlign[0] = row.name; //角色名
      // this.formLabelAlign[2] = row.id;//角色ID
      this.role_ID = row.id; //角色ID
      let data = {
        id: row.id
      };
      this.$axios
        .post(this.api.getUserAuthAndRoleAuth, data)
        .then(res => {
          console.log(res.data);
          this.data = res.data;
          let data = res.data;
          this.checked_arry = res.data[0].check_array;
        })
        .catch(error => {
          console.log(error);
        });
    },

    current_key(e) {
      console.log(e);
    },
    deleter_play() {
      this.remover_handleClick(this.val);
    },
    //删除模块  删除角色
    confirmDelete(row) {
      let that = this;
      let data = {
        id: row
      };
      that.$axios
        .post(this.api.destroyrole, data)
        .then(res => {
          if (res.data.success == true) {
            this.$message({
              message: "删除成功",
              type: "success",
              duration: 500,
              onClose() {
                console.log(123);
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
    async remover_handleClick(row) {
      let that = this;
      this.$confirm("此操作将永久删除该模块, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let msgRet = await this.confirmDelete(row.id);
          console.log("123");
        })
        .catch(() => {
          console.log("cancel");
        });
    },
    // 关闭弹框
    sendMsg() {
      this.show2 = false;
    },
    handleCurrentChange_tab(val) {
      this.add_but = "primary";
      console.log(val);
    },
    //状态 1 显示 2 隐藏
    radio_change(e) {
      this.add_status = e;
    },
    //修改页面状态  打开/关闭
    change(ind, idx) {
      let that = this;
      console.log(ind, idx);
      return false;
      let data = {
        status: ind,
        id: idx
      };
      that.$axios
        .post(api.updatemodule, data)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 添加/修改 模块
    ok_http() {
      let that = this;

      if (this.ed == false) {
        // 修改模块
        let data_2 = {
          roleId: this.role_ID,
          authIds: this.$refs.tree.getCheckedKeys()
        };
        let data = {
          id: this.role_ID,
          name: this.formLabelAlign[0]
        };
        that.$axios
          .post(this.api.saveRoleAuth, data_2)
          .then(res => {
            console.log(res);
            if (res.data.success == true) {
              that.$axios
                .post(this.api.updaterole, data)
                .then(res => {
                  if (res.data.success == true) {
                    this.show2 = false;
                    this.edit = false;
                    this.ed = false;
                    that.local_Reload(); //刷新页面
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        // 添加模块
        let data = {
          name: this.formLabelAlign[0],
          authIds: this.$refs.tree.getCheckedKeys()
        };
        that.$axios
          .post(this.api.createrole, data)
          .then(res => {
            if (res.data.success == true) {
              this.show2 = false;
              this.edit = false;
              this.ed = false;
              that.local_Reload(); //刷新页面
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
<style scoped>
@import url("admin.css");
</style>