<template>
  <div class="vip">
    <!-- 面包屑 -->
    <el-row>
      <breadcrumb></breadcrumb>
    </el-row>
    <el-row style="background:#ffffff;padding:15px;">
      <!-- 操作按钮 -->
      <el-row type="flex" class="row-bg" justify="end" style="align-items: center;">
        <el-col :span="12">
          <div class="grid-content bg-purple titlr_bot">
            <el-row>
              <el-button type="info" size="mini" icon="el-icon-refresh" @click="refresh"></el-button>
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
          <div class="grid-content bg-purple-light" style="display:flex">
            <el-input placeholder="请输入内容" v-model="sach_content">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="seach"
              style="margin-left:10px;"
            >搜索</el-button>
          </div>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick_tabs(activeName)">
        <el-tab-pane label="全部" name></el-tab-pane>
        <el-tab-pane label="开启状态" name="1"></el-tab-pane>
        <el-tab-pane label="关闭状态" name="2"></el-tab-pane>
      </el-tabs>
      <!-- 表格 -->
      <el-row>
        <el-table
          :data="vip_List"
          height="60vh"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          fit
          size="mini"
          highlight-current-row
          @current-change="handleCurrentChange_tab"
        >
          <el-table-column align="center" prop="id" sortable label="职位ID" width="100"></el-table-column>
          <el-table-column align="center" prop="uid" sortable label="用户ID" width="100"></el-table-column>
          <el-table-column align="center" prop="nickname" label="用户微信名" width="100"></el-table-column>
          <el-table-column align="center" prop="job_name" label="职位名" width="130"></el-table-column>
          <el-table-column align="center" prop="salary_min" label="最低薪资" width="80"></el-table-column>
          <el-table-column align="center" prop="salary_max" label="最高薪资" width="80"></el-table-column>
          <el-table-column
            align="center"
            v-if="is_visit!=1"
            prop="update_time"
            label="最近编辑时间"
            width="160"
          ></el-table-column>
          <el-table-column align="center" prop="browse_times" label="浏览次数" width="80"></el-table-column>
          <el-table-column align="center" prop="area" label="地区" width="110"></el-table-column>
          <el-table-column align="center" prop="status_text" label="简历状态" width="90"></el-table-column>
          <el-table-column align="center" prop="company" label="公司名" width="70"></el-table-column>
          <el-table-column align="center" prop="company_address" label="工作地点" width="200"></el-table-column>
          <el-table-column align="center" prop="phone" label="联系方式" width="200"></el-table-column>
          <el-table-column align="center" prop="updatetime" label="图片" width="240">
            <slot slot-scope="scope">
              <el-image
                :preview-src-list="scope.row.image_list"
                style="width: 50px; height: 50px;margin:0 5px"
                v-if="scope.row.image_list[0] !=''"
                v-for="(img,index) in scope.row.image_list"
                :key="index"
                :src="img"
              ></el-image>
            </slot>
          </el-table-column>
          <el-table-column
            align="center"
            v-if="is_visit!=1"
            prop="create_time"
            label="创建时间"
            width="200"
          ></el-table-column>
          <el-table-column label="操作" width="100" v-if="edit==true || del==true">
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
                style="margin:10px 0 0 0"
              >删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current_page"
        :page-sizes="page_sizes"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
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
            <div class="picker_input">
              <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item v-for="(item,index) in lable_list" :key="index" :label="item.name">
                  <el-input v-model="formLabelAlign[index]" :placeholder="item.ploader">{{item}}</el-input>
                </el-form-item>
                <el-form-item label="门店图片">
                  <div style="text-align: left;display:flex">
                    <el-upload
                      action="https://upload.qiniup.com"
                      :data="qn"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :on-success="over_up"
                      :file-list="fileList"
                      :limit="up_limit"
                      :on-exceed="exceed"
                      :before-upload="beforeAvatarUpload"
                      id="imgs"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>
                  </div>
                </el-form-item>
                <el-form-item label="修改时间" v-if="is_visit!=1">
                  <template>
                    <div style="text-align:left">
                      <el-date-picker
                        v-model="update_time"
                        type="datetime"
                        placeholder="选择修改时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      ></el-date-picker>
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
import breadcrumb from "@/components/base/breadcrumb";
import { error } from "util";
export default {
  data() {
    return {
      update_time: "",
      input4: "", //搜索框
      vip_List: [], //数据列表
      labelPosition: "right",
      //   square: "square",
      add_but: "info",
      value1: "",
      activeName: "", //tab切换 默认显示第一个
      show2: false,
      lable_list: [
        {
          name: "职位名",
          ploader: ""
        },
        {
          name: "最低薪资",
          ploader: ""
        },
        {
          name: "最高薪资",
          ploader: ""
        },
        {
          name: "浏览次数",
          ploader: ""
        },
        {
          name: "职位描述",
          ploader: ""
        }
        // {
        //   name: "用户ID",
        //   ploader: ""
        // },
        // {
        //   name: "地区",
        //   ploader: ""
        // }
      ], //配置编辑Input
      formLabelAlign: [], //弹框数据
      radio: "1", //默认显示
      avtir_url: "", //头像
      people_url: "", //头像
      srcList: [], //预览头像
      user_id: "", //用户ID
      status_noword: "", //是否禁言
      val: "", //用户信息
      current_page: 0, //默认页码
      limit: 10,
      page: 1,
      page_sizes: [10, 15, 20, 25],
      total: 0,
      status: "", //职位状态 1开启 2关闭

      dialogImageUrl: "",
      dialogVisible: false,
      lengTH_: "", //图片长度
      fileList: [], //默认图片
      up_limit: 3, //最大上传数
      type: "",
      auto_upload: false,
      qn: {
        token: "",
        key: ""
      },
      imgages: [],
      edit: false, //编辑权限
      del: false, //删除权限
      add: false, //添加权限
      index: false, //查看权限
      sach_content: "",
      is_visit: 2 //身份判断  2=> 管理员 1=> 媒体账号
    };
  },
  components: { breadcrumb },
  inject: ["local_Reload"],
  created() {
    this.onLonds(this.page, this.limit);
    let ary_leg = this.lable_list.length;
    this.formLabelAlign = new Array(ary_leg).join(",").split(",");
    this.$axios
      .post(this.api.openToken)
      .then(res => {
        this.qn.token = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });
    let data = {
      id: this.$route.query.pid
    };
    this.$axios
      .post(this.api.getUserDetail)
      .then(res => {
        console.log(res.data);
        this.is_visit = res.data.is_visit;
      })
      .catch(error => {
        console.log(error);
      });
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
    seach() {
      this.onLonds(this.page, this.limit, this.status, this.sach_content);
    },
    // 首次渲染
    onLonds(pages, limit, status, key) {
      let data = {
        limit: limit,
        page: pages,
        status: status,
        job_name: key
      };
      this.$axios
        .post(this.api.getJobList, data)
        .then(res => {
          this.vip_List = res.data.data;
          this.total = res.data.count;
        })
        .catch(error => {
          console.log(error);
        });
    },

    handleRemove(file, fileList) {
      console.log(file.url);
      this.romver_img = file.url;
      for (var i = 0; i < this.imgages.length; i++) {
        if (this[i] == file.url) {
          return i;
        }
      }
      let imgbox = this.imgages.splice(i - 1, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeAvatarUpload: function(file) {
      this.qn.key = file.name;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.error("图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
        return false;
      }
    },
    exceed(files, fileList) {
      if (fileList.length >= 3) {
        this.$message({
          message: "最多上传3张图片",
          type: "warning"
        });
      }
    },
    over_up: function(res, file, fileList) {
      this.imageUrl = this.api.img_url + res.key;
      this.imgages.push(this.imageUrl);
    },
    // tab切换
    handleClick_tabs(activeName) {
      console.log(activeName);
      this.status = activeName;

      this.onLonds(this.page, this.limit, this.status, this.sach_content);
    },
    //刷新页面
    refresh() {
      this.local_Reload();
    },
    handleCurrentChange_tab(val) {
      this.add_but = "primary";
      this.val = val;
    },
    edit_play() {
      if (this.add_but != "primary") {
        return false;
      } else {
        this.handleClick(this.val);
      }
    },
    // 删除按钮
    deleter_play() {
      this.remover_handleClick(this.val);
    },
    //编辑用户 editMember
    handleClick(e) {
      console.log(e);
      this.show2 = true;
      this.user_id = e.id;
      this.formLabelAlign[0] = e.job_name;
      this.formLabelAlign[1] = e.salary_min;
      this.formLabelAlign[2] = e.salary_max;
      this.formLabelAlign[3] = e.browse_times;
      this.formLabelAlign[4] = e.description;
      this.update_time = e.update_time;
      // this.formLabelAlign[5] = e.uid;
      // this.formLabelAlign[6] = e.area;
      let arr = e.image_list;
      if (e.image_list[0] == '') {
        this.fileList = [];
      } else {
        var json = [];
        if (arr[0] != "") {
          this.imgages = e.image_list;
          this.lengTH_ = arr.length;
          for (var i = 0; i < arr.length; i++) {
            var j = {};
            j.name = "fimg" + i;
            j.url = arr[i];
            // 这里还可以继续添加属性 j.属性 = 值
            json.push(j);
          }
          this.fileList = json;
          console.log(this.fileList);
        }
      }
    },
    confirmDelete(row) {
      let that = this;
      let data = {
        id: row
      };
      that.$axios
        .post(this.api.delJob, data)
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

    // 状态切换
    radio_change(e) {
      console.log(e);
      this.status_noword = e;
    },
    // 提交修改表单
    ok_http() {
      let fileList = this.imgages;
      let url_ = "";
      let url_2 = "";
      for (let i = 0; i < fileList.length; i++) {
        url_ = fileList[i];
        url_2 += url_ + ",";
      }
      let basic = url_2.substring(0, url_2.length - 1);
      let data = {
        id: this.user_id,
        job_name: this.formLabelAlign[0],
        salary_min: this.formLabelAlign[1],
        salary_max: this.formLabelAlign[2],
        browse_times: this.formLabelAlign[3],
        description: this.formLabelAlign[4],
        update_time: this.update_time,
        // uid: this.formLabelAlign[5],
        // area: this.formLabelAlign[6],
        images: basic
      };
      this.$axios
        .post(this.api.editJob, data)
        .then(res => {
          console.log(res);
          if (res.data.success == true) {
            this.show2 = false;
            this.local_Reload();
          }
        })
        .catch(error => {
          console.log(error);
        });
      console.log(data);
    },
    //取消提交
    sendMsg() {
      this.show2 = false;
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.onLonds(this.page, this.limit, this.status, this.sach_content);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.onLonds(this.page, this.limit, this.status, this.sach_content);
    }
  }
};
</script>
<style>
@import url("recr.css");

</style>