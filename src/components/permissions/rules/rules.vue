<template>
  <div class="rules">
    <el-row>
      <breadcrumb></breadcrumb>
    </el-row>
    <div class="titles">
      <p>页面管理</p>
      <p>左侧的菜单根据页面管理进行生成 add=添加、del=删除、edit=编辑</p>
    </div>
    <el-row style="background:#ffffff;padding:15px;">
      <el-row type="flex" class="row-bg" justify="end" style="align-items: center;">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-row>
              <el-button type="info" size="mini" icon="el-icon-refresh" @click="refls"></el-button>
              <el-button
                v-if="edits==true"
                type="info"
                size="mini"
                icon="el-icon-plus"
                @click="openShow"
              >添加</el-button>
              <el-button :type="add_but" size="mini" icon="el-icon-delete" @click="deleter_play">删除</el-button>
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
        <el-col :span="16">
          <el-table
            :data="list"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            height="450"
            :indent="indent"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            @current-change="handleCurrentChange_tab"
            highlight-current-row
          >
            <el-table-column align="left  " prop="title" sortable label="标题" width="150"></el-table-column>
            <el-table-column align="center" prop="sort" label="权重" width="120"></el-table-column>

            <el-table-column align="center" prop="route_path" label="路由" width="200"></el-table-column>
            <el-table-column align="center" label="状态" width="70">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  :active-value="active"
                  :inactive-value="inactive"
                  @change="change(scope.row.status,scope.row.id)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="210" v-if="del==true || edits ==true">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  v-if="edits==true"
                  @click="handleClick(scope.row)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  v-if="del==true"
                  @click="remover_handleClick(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="8">
          <div class="right_content" style="width:95%;margin: 0 auto;position: relative;  ">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick_tab">
              <el-tab-pane label="权限列表" name="first">
                <el-button
                  v-if="titlw==true"
                  v-show="show_eadit!=true"
                  style="display:block;margin: 0 auto;"
                  type="primary"
                  @click="add_prem"
                  size="mini"
                >新增权限</el-button>
                <div v-else class="titlew">请选择模块进行编辑/添加</div>
                <el-form
                  label-width="40px"
                  style="width:95%;margin: 0 auto;padding:15px 0;"
                  v-for="(item,index) in handleC"
                  :key="index"
                  v-show="show_eadit!=true"
                >
                  <div class="perm_list" @click="remark(item)">{{item.remark}}</div>
                </el-form>
              </el-tab-pane>
            </el-tabs>
            <div class="none_from" v-show="show_eadit!=false">
              <el-form label-width="40px" style="width:95%;margin: 0 auto;padding:25px 0;">
                <el-form-item label="路由">
                  <el-input v-model="router_url"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="note"
                  ></el-input>
                </el-form-item>
                <div style="display:flex">
                  <el-button
                    style="display:block;margin: 0 auto;"
                    size="mini"
                    icon="el-icon-s-promotion"
                    type="success"
                    @click="perm"
                  >提交</el-button>
                  <el-button
                    style="display:block;margin: 0 auto;"
                    type="danger"
                    size="mini"
                    @click="perm_move"
                    icon="el-icon-delete"
                  >删除</el-button>
                  <el-button
                    style="display:block;margin: 0 auto;"
                    type="info "
                    size="mini"
                    icon="el-icon-s-fold"
                    @click="perm_none"
                  >取消</el-button>
                </div>
              </el-form>
            </div>
          </div>
        </el-col>
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
                <i class="el-icon-circle-close" @click="sendMsg"></i>
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
            <el-form :label-position="labelPosition" label-width="80px">
              <el-form-item label="父级模块">
                <el-tree
                  :data="data"
                  default-expand-all
                  node-key="id"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                  check-strictly
                  :default-checked-keys="checked_arry"
                  @node-click="handleNodeClick"
                  style="height: 200px;overflow-y: scroll;"
                ></el-tree>
              </el-form-item>
              <el-form-item v-for="(item,index) in lable_list" :key="index" :label="item.name">
                <el-input v-model="formLabelAlign[index]" :placeholder="item.ploader">{{item}}</el-input>
              </el-form-item>

              <el-form-item label="权重">
                <el-input v-model="sort"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-input v-model="icon_url"></el-input>
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

import api from "../../../../src/api";
import { error } from "util";

export default {
  inject: ["left_Reload", "local_Reload"],
  components: {
    breadcrumb
  },
  data() {
    return {
      icon_url: "",
      icon: "",
      edits: false, //编辑权限
      del: false, //删除权限
      add: false, //添加权限
      index: false, //查看权限
      input4: "", //搜索框内容
      width: 20,
      indent: 16,
      show2: false, //弹框默认关闭
      active: 1, //表格状态 1 打开
      inactive: 2, //表格状态 2 关闭
      list_2: [],
      labelPosition: "right",
      lable_list: [
        {
          name: "标题",
          ploader: "请填写导航标题"
        },

        {
          name: "路由地址",
          ploader: "父级菜单"
        }
      ], //配置编辑Input
      value: [],
      checkStrictly: true,
      props: { label: "title", value: "id" },
      formLabelAlign: ["", "", "", "", "", ""], //标题 图标  路由
      command: "", //下拉选择父模块
      list: [], //数据列表
      pid: this.glaData.Level_ID, //默认父模块ID为根模块
      radio: "1", //默认显示
      add_status: 1,
      edit: false, //是否编辑
      activeName: "first",
      router_url: "", //权限路由
      note: "", //权限名称
      nick_name: "", //权限备注
      sort: "",
      handleC: [],
      show_eadit: false,
      edit_play: false,
      data: [],
      checked_arry: [""],
      checked_arry_2: "",
      defaultProps: {
        children: "children",
        label: "title"
      },
      add_but: "info",
      titlw: false
    };
  },
  created() {
    let that = this;
    let data = {
      id: this.$route.query.pid
    };
    this.$axios
      .post(this.api.getChildModule, data)
      .then(res => {
        let list_data = res.data;
        for (let i = 0; i < list_data.length; i++) {
          if (list_data[i].route_path == "edit") {
            this.edits = true;
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
    that.$axios
      .post(api.getpagelist)
      .then(res => {
        let chidrens = res.data.data[0].children;
        this.pid = res.data.data[0].id;
        this.list = chidrens;
        this.list_2 = chidrens;
        this.data = res.data.data;
        console.log(this.list_2);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    async perm_move() {
      let that = this;
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let msgRet = await this.perm_move_del(this.Child_id);
        })
        .catch(() => {
          console.log("cancel");
        });
    },
    perm_move_del(id) {
      let data = {
        id: id
      };
      this.$axios
        .post(this.api.delAuthUri, data)
        .then(res => {
          console.log(res);
          if (res.data.success == true) {
            this.$message({
              message: "删除成功",
              type: "success",
              duration: 500
            });
            this.edit_play = false;
            this.show_eadit = false;
            this.getAuthUri(this.module_id);
            
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    refls() {
      this.local_Reload();
    },
    handleChange(value) {
      console.log(value);
    },
    expand_change(value) {
      console.log(value);
    },
    openShow() {
      this.show2 = true;
      this.edit = false;
    },
    handleClick_tab(tab, event) {
      console.log();
    },
    add_prem() {
      this.show_eadit = true;
      this.edit_play = false;
      this.router_url = ""; //权限路由
      this.note = ""; //权限名称
      this.nick_name = ""; //权限备注
    },
    remark(item) {
      console.log(item);
      this.show_eadit = true;
      this.Child_id = item.id;
      this.router_url = item.uri;
      this.sort = item.sort;
      this.nick_name = item.remark;
      (this.note = item.remark), (this.edit_play = true);
    },
    // 编辑模块
    handleClick(row) {
      this.show2 = true;
      this.edit = true;
      console.log(row);
      this.command = row.pid;
      this.formLabelAlign[0] = row.title;
      this.icon_url = row.img;
      this.formLabelAlign[1] = row.route_path;
      this.checked_arry = [row.pid];
      this.add_status = row.status;
      this.radio = row.status + "";
      this.edit_id = row.id;
      this.pid = row.pid;
      this.sort = row.sort;

    },
    deleter_play() {
      this.remover_handleClick(this.val);
    },
    //删除模块
    confirmDelete(row) {
      let that = this;
      let data = {
        id: row
      };
      that.$axios
        .post(api.destroymodule, data)
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
        })
        .catch(() => {
          console.log("cancel");
        });
    },
    // 关闭弹框
    sendMsg() {
      this.show2 = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //下拉选择模块
    handleCommand(e) {
      if (e == 0) {
        this.pid = this.pid;
        this.command = this.list_2[e].title;
      } else {
        this.pid = this.list_2[e].id;
        this.command = this.list_2[e].title;
      }
    },
    //状态 1 显示 2 隐藏
    radio_change(e) {
      this.add_status = e;
    },
    //修改页面状态
    change(ind, idx) {
      let that = this;
      let data = {
        status: ind,
        id: idx
      };
      that.$axios
        .post(api.updatemodule, data)
        .then(res => {
          console.log(res);
          this.left_Reload();
          this.local_Reload();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleNodeClick(data) {
      this.pid = data.id;
    },
    // 添加模块
    ok_http() {
      let that = this;

      if (this.edit == true) {
        // 修改模块

        let data = {
          id: this.edit_id,
          pid: this.pid,
          title: this.formLabelAlign[0],
          img: this.icon_url,
          route_path: this.formLabelAlign[1],
          status: this.add_status,
          sort: this.sort
        };

        that.$axios
          .post(api.updatemodule, data)
          .then(res => {
            if (res.data.success == true) {
              this.show2 = false;
              this.edit = false;
              that.local_Reload(); //刷新页面
              that.left_Reload()
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        // 添加模块
        console.log(123);
        let data = {
          id: "",
          pid: this.pid,
          title: this.formLabelAlign[0],
          // img: this.formLabelAlign[1],
          route_path: this.formLabelAlign[1],
          status: this.add_status,
          sort: this.sort,
          img: this.icon_url
        };

        that.$axios
          .post(api.register, data)
          .then(res => {
            if (res.data.success == true) {
              this.show2 = false;
              this.edit = false;
              that.local_Reload(); //刷新页面
              that.left_Reload()
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    handleCurrentChange_tab(row) {
      // console.log(row);
      this.add_but = "primary";
      this.module_id = row.id;
      this.titlw = true;
      // uri
      this.getAuthUri(this.module_id);
    },
    getAuthUri(id) {
      let data = {
        module_id: id
      };
      this.$axios
        .post(this.api.getAuthUri, data)
        .then(res => {
          this.handleC = res.data.data;
          console.log(res.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    perm() {
      let that = this;
      if (this.edit_play == true) {
        console.log("编辑");
        let data = {
          uri: this.router_url,
          id: this.Child_id,
          remark: this.note,
          module_id: this.module_id
        };
        this.$axios
          .post(this.api.editAuthUri, data)
          .then(res => {
            this.edit_play = false;
            this.show_eadit = false;
            console.log(res);
            if (res.data.success == true) {
              that.getAuthUri(that.module_id);
              this.$message({
                message: "修改成功",
                type: "success"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log("新建");
        let data = {
          uri: this.router_url,
          remark: this.note,
          module_id: this.module_id
        };
        this.$axios
          .post(this.api.addAuthUri, data)
          .then(res => {
            this.edit_play = false;
            if (res.data.success == false) {
              this.$message.error(res.data.msg);
            } else {
              that.getAuthUri(that.module_id);
              this.$message({
                message: "添加成功",
                type: "success"
              });
            }
            this.show_eadit = false;
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    perm_none() {
      this.show_eadit = false;
    }
  }
};
</script>
<style scoped>
@import url("rules.css");
</style>