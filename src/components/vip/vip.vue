<template>
  <div class="vip">
    <el-row>
      <breadcrumb></breadcrumb>
    </el-row>
    <el-row style="background:#ffffff;padding:15px;">
      <el-row type="flex" class="row-bg" justify="end" style="align-items: center;">
        <el-col :span="12">
          <div class="grid-content bg-purple">
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
            <div></div>
            <el-input placeholder="请输入微信名" v-model="sach_content">
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
      <el-row>
        <el-table
          :data="vip_List"
          height="67vh"
          style="width: 100%;margin-bottom:25px;"
          row-key="id"
          border
          fit
          size="mini"
          highlight-current-row
          @current-change="handleCurrentChange_tab"
        >
          <el-table-column align="center" prop="id" sortable label="ID" width="70"></el-table-column>
          <el-table-column align="center" prop="nickname"  label="微信名" width="150"></el-table-column>
          <el-table-column align="center" prop="create_type" label="渠道" width="80">
            <slot slot-scope="scope">
              <span v-if="scope.row.create_type==1">小程序</span>
              <span v-if="scope.row.create_type==2">IOS</span>
              <span v-if="scope.row.create_type==3">Andiod</span>
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="avatar" label="头像" width="60">
            <el-avatar slot-scope="scope" :shape="square" :src="scope.row.avatar"></el-avatar>
          </el-table-column>
          <el-table-column align="center" prop="status_work_text" label="用户状态" width="80"></el-table-column>
          <el-table-column align="center" prop="status_noword_text" label="禁言状态" width="70"></el-table-column>
          <el-table-column
            align="center"
            v-if="is_visit!=1"
            prop="updatetime"
            label="注册时间"
            width="200"
          ></el-table-column>
          <el-table-column align="center" prop="route_path" label="查看简历" width="100"  v-if="is_visit!=1">
            <slot slot-scope="scope">
              <a
                :href="'/login.html#/vip_detail?id='+scope.row.vita_id+'&type='+'1'"
                target="_blank"
                v-if="scope.row.vita_id !=''"
              >查看简历</a>
            </slot>
          </el-table-column>
          <el-table-column align="center" label="查看职位" width="250"  v-if="is_visit!=1">
            <slot slot-scope="scope">
              <a
                :href="'/login.html#/vip_detail?id='+scope.row.job_ids[index]+'&type='+'2'"
                target="_blank"
                v-for="(v,index) in scope.row.job_ids"
                :key="index"
                style="padding: 0 5px"
                v-if='scope.row.job_ids !=""'
              >职位{{index}}</a>
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="route_path" label="查看门店" width="250"  v-if="is_visit!=1">
            <slot slot-scope="scope">
              <a
                :href="'/login.html#/vip_detail?id='+scope.row.store_ids[index]+'&type='+'3'"
                target="_blank"
                v-for="(v,index) in scope.row.store_ids"
                :key="index"
                v-if="scope.row.store_ids !=''"
              >门店{{index}}</a>
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="route_path" label="查看供应商" width="250" v-if="is_visit!=1">
            <slot slot-scope="scope">
              <a
                :href="'/login.html#/vip_detail?id='+scope.row.supplier_ids[index]+'&type='+'4'"
                target="_blank"
                v-for="(v,index) in scope.row.supplier_ids"
                :key="index"
                v-if="scope.row.supplier_ids !=''"
                style="padding:0 5px"
              >供应商{{index}}</a>
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="job_access_count" label="职位被浏览次数" width="120">
            <slot slot-scope="scope">
              <a
                :href="'/login.html#/vip_number?id='+scope.row.id+'&type='+'1'"
                target="_blank"
                v-if="scope.row.job_access_count !=''"
                style="padding:0 5px"
              >{{scope.row.job_access_count}}</a>
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="vita_access_count" label="简历被浏览次数" width="120">
            <slot slot-scope="scope">
              <a
                :href="'/login.html#/vip_number?id='+scope.row.id+'&type='+'2'"
                target="_blank"
                v-if="scope.row.vita_access_count !=''"
                style="padding:0 5px"
              >{{scope.row.vita_access_count}}</a>
            </slot>
          </el-table-column>
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
                style="margin:10px 0 0 0"
                v-if="del==true"
              >删除</el-button>
            </div>
          </el-table-column>
        </el-table>
      </el-row>

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
                <el-form-item label="头像" style="text-align: left;">
                  <el-upload
                    class="upload-demo"
                    action="https://upload.qiniup.com"
                    :data="qn"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="over_up"
                    :limit="img_limit"
                    :file-list="fileList"
                    list-type="picture-card"
                    :on-exceed="exceed"
                    :before-upload="beforeAvatarUpload"
                  >
                    <i class="el-icon-plus"></i>
                    <!-- <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>-->
                  </el-upload>
                </el-form-item>

                <el-form-item label="禁言">
                  <template>
                    <div style="text-align:left">
                      <el-radio @change="radio_change(radio)" v-model="radio" label="1">关闭</el-radio>
                      <el-radio @change="radio_change(radio)" v-model="radio" label="2">开启</el-radio>
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
import breadcrumb from "@/components/base/breadcrumb.vue";
import { error } from "util";
import { fail } from "assert";
export default {
  data() {
    return {
      input4: "", //搜索框
      vip_List: [], //数据列表
      square: "square",
      add_but: "info",
      limit: 10,
      page: 1,

      show2: false,
      labelPosition: "right",
      lable_list: [
        {
          name: "微信昵称",
          ploader: ""
        }
      ], //配置编辑Input
      dialogVisible: false,
      dialogImageUrl: "",
      formLabelAlign: ["", ""], //名称 权限
      radio: "1", //默认显示
      avtir_url: "", //头像
      people_url: "", //头像
      srcList: [], //预览头像
      user_id: "", //用户ID
      status_noword: "", //是否禁言
      val: "", //用户信息
      current_page: 0, //默认页码
      page_sizes: [10, 15, 20, 25],
      total: 0,
      edit: false, //编辑权限
      del: false, //删除权限
      add: false, //添加权限
      index: false, //查看权限
      qn: {
        token: "",
        key: ""
      },
      img_limit: 1,
      fileList: [
        {
          name: "",
          url: ""
        }
      ],
      sach_content: "",
      is_visit: 2 //身份判断  2=> 管理员 1=> 媒体账号
    };
  },
  inject: ["local_Reload"],
  components: { breadcrumb },
  created() {
    this.$axios
      .post(this.api.openToken)
      .then(res => {
        this.qn.token = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });
    this.$axios
      .post(this.api.getUserDetail)
      .then(res => {
        console.log(res.data);
        this.is_visit = res.data.is_visit;
      })
      .catch(error => {
        console.log(error);
      });
    this.onLonds(this.page, this.limit);
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
    handleRemove(file, fileList) {
      console.log(file.url);
      // this.romver_img = file.url;
      // for (var i = 0; i < this.imgages.length; i++) {
      //   if (this[i] == file.url) {
      //     return i;
      //   }
      // }
      // let imgbox = this.imgages.splice(i - 1, 1);
    },
    seach() {
      this.onLonds(this.page, this.limit, this.sach_content);
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
      if (fileList.length >= 1) {
        this.$message({
          message: "最多上传1张图片",
          type: "warning"
        });
      }
    },
    over_up: function(res, file, fileList) {
      this.avtir_url = this.api.img_url + res.key;
      console.log(res, file, fileList);
      console.log(this.avtir_url);
      // this.imgages.push(this.imageUrl);
    },
    // 首次渲染
    onLonds(pages, limit, key) {
      let data = {
        limit: limit,
        page: pages,
        nickname: key
      };
      this.$axios
        .post(this.api.member_Index, data)
        .then(res => {
          console.log(res);
          this.vip_List = res.data.data;
          this.total = res.data.count;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //刷新页面
    refresh() {
      this.local_Reload();
    },
    link_royter(row) {
      console.log(row);
    },
    handleCurrentChange_tab(val) {
      this.add_but = "primary";
      this.val = val;
    },
    edit_play() {
      this.handleClick(this.val);
    },
    // 删除按钮
    deleter_play() {
      this.remover_handleClick(this.val);
    },
    //编辑用户 editMember
    handleClick(e) {
      this.show2 = true;
      this.user_id = e.id;
      this.formLabelAlign[0] = e.nickname;
      this.radio = e.status_noword + "";
      this.avtir_url = e.avatar;
      this.people_url = e.avatar;
      this.srcList = [e.avatar];
      this.status_noword = e.status_noword;
      this.fileList[0].name = "12";
      this.fileList[0].url = e.avatar;
    },
    confirmDelete(row) {
      let that = this;
      let data = {
        id: row
      };
      that.$axios
        .post(this.api.delMember, data)
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
    // 提交表单
    ok_http() {
      let data = {
        id: this.user_id,
        nickname: this.formLabelAlign[0],
        status_noword: this.status_noword,
        avatar: this.avtir_url
      };
      this.$axios
        .post(this.api.editMember, data)
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
      this.onLonds(this.page, this.limit, this.sach_content);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.onLonds(this.page, this.limit, this.sach_content);
    }
  }
};
</script>
<style scoped>
  @import url("vip.css");
.el-upload-list--picture-card .el-upload-list__item {
  width: 50px !important;
  height: 50px !important;
}
.el-upload-list--picture-card .el-upload-list__item-actions {
  width: 50px !important;
  height: 50px !important;
}
</style>