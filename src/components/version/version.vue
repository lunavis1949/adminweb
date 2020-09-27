<template>
  <div class="version">
    <!-- 面包屑导航 -->
    <el-row>
      <breadcrumb></breadcrumb>
    </el-row>
    <!-- 操作按钮 -->
    <el-row type="flex" class="row-bg" justify="end" style="align-items: center;">
      <el-col :span="12">
        <div class="grid-content bg-purple titlr_bot">
          <el-row>
            <el-button type="info" size="mini" icon="el-icon-refresh" @click="refresh"></el-button>
            <el-button type="info" size="mini" icon="el-icon-plus" @click="openShow">添加</el-button>
            <el-button
              v-if="edit==true"
              :type="add_but"
              size="mini"
              icon="el-icon-edit"
              @click="edit_play"
            >编辑</el-button>
            <el-button
              v-if="del==true"
              :type="add_but"
              size="mini"
              icon="el-icon-delete"
              @click="deleter_play"
            >删除</el-button>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light" style="display:flex"></div>
      </el-col>
    </el-row>
    <!-- 数据列表 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick_tabs(activeName)">
      <el-tab-pane label="IOS" name="1"></el-tab-pane>
      <el-tab-pane label="Android" name="2"></el-tab-pane>
    </el-tabs>
    <!-- 表格 -->
    <el-row>
      <el-table
        :data="list_ul"
        height="60vh"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        fit
        size="mini"
        highlight-current-row
        @current-change="handleCurrentChange_tab"
      >
        <el-table-column align="center" prop="version" sortable label="版本号" width="200"></el-table-column>
        <el-table-column align="center   " prop="status" label="是否发布" width="200">
          <slot slot-scope="scope">
            <div>{{scope.row.status==1?'已发布':'未发布'}}</div>
          </slot>
        </el-table-column>
        <el-table-column align="center   " prop="create_time" label="上传时间" width="200"></el-table-column>
        <el-table-column align="center   " prop="create_time" label="发布" width="200">
          <slot slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="change_a(scope.row,scope.row.status)"
              :active-value="active_value"
              :inactive-value="inactive_value"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </slot>
        </el-table-column>
        <el-table-column align="center   " prop="create_time" label="禁用" width="200">
          <slot slot-scope="scope">
            <el-switch
              v-model="scope.row.disable"
              @change="change_b(scope.row,scope.row.disable)"
              :active-value="active_value"
              :inactive-value="inactive_value"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </slot>
        </el-table-column>

        <el-table-column align="center" label="操作" width="220" v-if="edit==true || del==true">
          <div slot-scope="scope" style="margin:0">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="handleClick(scope.row)"
              v-if="edit==true"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="remover_handleClick(scope.row)"
              v-if="del==true"
            >删除</el-button>
          </div>
        </el-table-column>
      </el-table>
    </el-row>

    <!-- 弹框 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current_page"
      :page-sizes="page_sizes"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
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
            <div class="picker_input">
              <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="版本号">
                  <el-input v-model="val_version"></el-input>
                </el-form-item>
                <el-form-item label="版本详情">
                  <el-input v-model="description" type="textarea" :rows="2" placeholder="请输入版本详情">></el-input>
                </el-form-item>
                <el-form-item label="是否发布" v-if="add==true">
                  <el-radio v-model="val_status" label="1">已发布</el-radio>
                  <el-radio v-model="val_status" label="2">未发布</el-radio>
                </el-form-item>
                <el-form-item label="是否禁用" v-if="add==true">
                  <el-radio v-model="val_status_2" label="1">否</el-radio>
                  <el-radio v-model="val_status_2" label="2">是</el-radio>
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
import breadcrumb from "@/components/base/breadcrumb";
import { error } from "util";
export default {
  data() {
    return {
      del: true,
      edit: true,
      add_but: "info",
      activeName: "1",
      list_ul: [],
      val: {
        version: "",
        status: ""
      },
      labelPosition: "right",
      show2: false,
      status: "",
      edit_: false,
      val_version: "",
      val_status: "",

      add: true,
      current_page: 0, //默认页码
      limit: 10,
      page: 1,
      page_sizes: [10, 15, 20, 25],
      total: 0,
      active_value: 1,
      inactive_value: 2,
      val_status_2: "",
      description: ""
    };
  },
  components: {
    breadcrumb
  },
  inject: ["local_Reload"],
  created() {
    this.onlond_req(this.activeName, this.page, this.limit);
  },
  methods: {
    refresh() {
      this.local_Reload();
    },
    onlond_req(activeName, page, limit) {
      let that = this;
      let data = {
        type: activeName,
        page: page,
        limit: limit
      };
      that.$axios
        .post(this.api.getVersion, data)
        .then(res => {
          console.log(res.data.data);
          this.list_ul = res.data.data;
          this.total = res.data.count;
        })
        .catch(error => {
          console.log(error);
        });
    },
    edit_play() {
      console.log(this.val);

      if (!this.val.status && !this.val.val_status) {
        console.log("12313");
      } else {
        this.show2 = true;
        this.val_version = this.val.version;
        this.val_status = this.val.status + "";
        this.val_status_2 = this.val.disable + "";
        this.add = true;
        this.description=this.val.description;
        //        this.val_status = row.status + "";
        // this.val_status_2 = row.disable + "";
      }
    },
    change_a(row, stat) {
      let that = this;
      console.log(row, stat);
      row.status = stat;

      that.$axios
        .post(this.api.editVersion, row)
        .then(res => {
          if (res.data.success == true) {
            that.$message({
              message: res.data.msg,
              type: "success",
              duration: 800,
              onClose() {
                that.show2 = false;
                that.onlond_req(that.activeName, that.page, that.limit);
                that.edit_ = false;
              }
            });
          } else {
            that.$message.error(res.data.msg);
            that.show2 = false;
            that.edit_ = false;
          }
        })
        .catch(eror => {
          console.log(error);
        });
    },

    change_b(row, stat) {
      let that = this;
      console.log(row, stat);
      row.disable = stat;

      that.$axios
        .post(this.api.editVersion, row)
        .then(res => {
          if (res.data.success == true) {
            that.$message({
              message: res.data.msg,
              type: "success",
              duration: 800,
              onClose() {
                that.show2 = false;
                that.onlond_req(that.activeName, that.page, that.limit);
                that.edit_ = false;
              }
            });
          } else {
            that.$message.error(res.data.msg);
            that.show2 = false;
            that.edit_ = false;
          }
        })
        .catch(eror => {
          console.log(error);
        });
    },
    async deleter_play() {
      if (!this.val.status && !this.val.val_status) {
      } else {
        let that = this;
        this.$confirm("此操作将永久删除版本信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            let msgRet = await this.reo(this.val.id);
          })
          .catch(() => {
            console.log("cancel");
          });
      }
    },
    
    handleClick_tabs(activeName) {
      console.log(activeName);
      this.activeName = activeName;
      this.page = 1;
      this.limit = 10;
      this.onlond_req(this.activeName, this.page, this.limit);
    },
    handleClick(row) {
      this.val = row;
      this.show2 = true;
      this.val_version = row.version;
      this.val_status = row.status + "";
      this.val_status_2 = row.disable + "";
       this.description = row.description;
      this.add = true;
    },
    async remover_handleClick(row) {
      let that = this;
      this.$confirm("此操作将永久删除版本信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let msgRet = await this.reo(row.id);
        })
        .catch(() => {
          console.log("cancel");
        });
    },

    reo(id) {
      console.log(id);
      let data = {
        id: id
      };
      let that = this;
      that.$axios
        .post(this.api.delVersion, data)
        .then(res => {
          if (res.data.success == true) {
            that.$message({
              message: res.data.msg,
              type: "success",
              duration: 800,
              onClose() {
                that.onlond_req(that.activeName, that.page, that.limit);

                that.add_but = "info";
              }
            });
          } else {
            that.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleCurrentChange_tab(val) {
      this.add_but = "primary";
      this.val = val;
      this.val.status2 = val.status + "";
      this.val.status2 = val.status + "";
    },
    ok_http() {
      let that = this;
      console.log(that.edit);

      if (that.edit_ == true) {
        let data = {
          type: this.activeName,
          version: this.val_version,
          status: this.val_status,
          disable: this.val_status_2,
          description: this.description
        };
        that.$axios
          .post(this.api.addVersion, data)
          .then(res => {
            if (res.data.success == true) {
              that.$message({
                message: res.data.msg,
                type: "success",
                duration: 800,
                onClose() {
                  that.show2 = false;
                  that.onlond_req(that.activeName, that.page, that.limit);
                  that.add_but = "info";
                  that.edit_ = false;
                  console.log(that.edit_);
                }
              });
            } else {
              that.$message.error(res.data.msg);
              that.show2 = false;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        let data = {
          id: that.val.id,
          status: that.val_status,
          version: that.val_version,
          type: that.val.type,
          disable: this.val_status_2,
          description: this.description
        };
        that.$axios
          .post(this.api.editVersion, data)
          .then(res => {
            if (res.data.success == true) {
              that.$message({
                message: res.data.msg,
                type: "success",
                duration: 800,
                onClose() {
                  that.show2 = false;
                  that.onlond_req(that.activeName, that.page, that.limit);
                  that.edit_ = false;
                }
              });
            } else {
              that.$message.error(res.data.msg);
              that.show2 = false;
              that.edit_ = false;
            }
          })
          .catch(eror => {
            console.log(error);
          });
      }
    },
    sendMsg() {
      this.show2 = false;
    },
    openShow() {
      this.show2 = true;
      this.edit_ = true;
      this.val_version = "";
      this.val_status = "";
      this.description='';
      this.add = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.onlond_req(this.activeName, this.page, this.limit);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.onlond_req(this.activeName, this.page, this.limit);
    }
  }
};
</script>