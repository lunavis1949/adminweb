<template>
  <div class="vip_deatil">
    <el-row v-if="type=='1'" type="flex" class="iun_conte" justify="end" style="height:auto">
      <el-col :span="2">
        <div class="grid-content bg-purple-dark" style="text-align: right;margin:0 auto;"></div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-dark" style="text-align: right;margin:0 auto;">
          <div class="picker_input">
            <el-form :label-position="labelPosition" label-width="80px">
              <el-form-item label="工作年限">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.work_year"></el-input>
              </el-form-item>
              <el-form-item label="工作图片">
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
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                  <!-- <el-button :plain="true">错误</el-button> -->
                </div>
              </el-form-item>
              <el-form-item label="简历名">
                <el-input
                  id="uinu"
                  style="height:30px;"
                  class="uinu"
                  v-model="vip_List.worker_name"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.phone"></el-input>
              </el-form-item>
              <el-form-item label="最低薪资">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.salary_min"></el-input>
              </el-form-item>

              <el-form-item label="最高薪资">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.salary_max"></el-input>
              </el-form-item>
              <el-form-item label="浏览次数 ">
                <el-input
                  id="uinu"
                  style="height:30px;"
                  class="uinu"
                  v-model="vip_List.browse_times"
                ></el-input>
              </el-form-item>
              <el-form-item label="应聘岗位">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.job"></el-input>
              </el-form-item>
              <el-form-item label="求职城市">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.area"></el-input>
              </el-form-item>
              <el-form-item label="简历描述">
                <template>
                  <div style="text-align:left">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="vip_List.description"
                    ></el-input>
                  </div>
                </template>
              </el-form-item>
              <!-- <el-form-item label="修改时间">
                <template>
                  <div style="text-align:left">
                    <el-date-picker
                      v-model="vip_List.update_time"
                      type="datetime"
                      @change="change_date"
                      placeholder="选择修改时间"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                  </div>
                </template>
              </el-form-item>
              <el-form-item label="创建时间">
                <template>
                  <div style="text-align:left">
                    <el-date-picker
                      v-model="vip_List.create_time"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="选择创建时间"
                    ></el-date-picker>
                  </div>
                </template>
              </el-form-item> -->
              <el-form-item label="状态">
                <template>
                  <div style="text-align:left">
                    <el-radio
                      @change="radio_change(radio)"
                      v-model="radio"
                      label="1"
                    >显示</el-radio>
                    <el-radio
                      @change="radio_change(radio)"
                      v-model="radio"
                      label="2"
                    >关闭</el-radio>
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

    <el-row v-if="type=='2'" type="flex" class="iun_conte" justify="end" style="height:auto">
      <el-col :span="2">
        <div class="grid-content bg-purple-dark" style="text-align: right;margin:0 auto;"></div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-dark" style="text-align: right;margin:0 auto;">
          <div class="picker_input">
            <el-form :label-position="labelPosition" label-width="80px">
              <el-form-item label="职位名">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.job_name"></el-input>
              </el-form-item>
              <el-form-item label="招聘图片">
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
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </div>
              </el-form-item>
              <el-form-item label="地区">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.area"></el-input>
              </el-form-item>
              <el-form-item label="公司名">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.company"></el-input>
              </el-form-item>
              <el-form-item label="工作地点">
                <el-input
                  id="uinu"
                  style="height:30px;"
                  class="uinu"
                  v-model="vip_List.company_address"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.phone"></el-input>
              </el-form-item>
              <el-form-item label="最低薪资">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.salary_min"></el-input>
              </el-form-item>

              <el-form-item label="最高薪资">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.salary_max"></el-input>
              </el-form-item>
              <el-form-item label="浏览次数 ">
                <el-input
                  id="uinu"
                  style="height:30px;"
                  class="uinu"
                  v-model="vip_List.browse_times"
                ></el-input>
              </el-form-item>

              <el-form-item label="职位描述">
                <template>
                  <div style="text-align:left">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="vip_List.description"
                    ></el-input>
                  </div>
                </template>
              </el-form-item>
           
              <el-form-item label="状态">
                <template>
                  <div style="text-align:left">
                    <el-radio
                      @change="radio_change(radio)"
                      v-model="vip_List.status+''"
                      label="1"
                    >显示</el-radio>
                    <el-radio
                      @change="radio_change(radio)"
                      v-model="vip_List.status+''"
                      label="2"
                    >关闭</el-radio>
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
    <el-row v-if="type=='3'" type="flex" class="iun_conte" justify="end" style="height:auto">
      <el-col :span="2">
        <div class="grid-content bg-purple-dark" style="text-align: right;margin:0 auto;"></div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-dark" style="text-align: right;margin:0 auto;">
          <div class="picker_input">
            <el-form :label-position="labelPosition" label-width="85px">
              <el-form-item label="面积（m²）">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.space"></el-input>
              </el-form-item>
              <el-form-item label="价格">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.price"></el-input>
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
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </div>
              </el-form-item>
              <el-form-item label="地区">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.area"></el-input>
              </el-form-item>

              <el-form-item label="地址">
                <el-input
                  id="uinu"
                  style="height:30px;"
                  class="uinu"
                  v-model="vip_List.company_address"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.phone"></el-input>
              </el-form-item>
              <el-form-item label="浏览次数 ">
                <el-input
                  id="uinu"
                  style="height:30px;"
                  class="uinu"
                  v-model="vip_List.browse_times"
                ></el-input>
              </el-form-item>
              <el-form-item label="门店描述">
                <template>
                  <div style="text-align:left">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="vip_List.description"
                    ></el-input>
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
    <el-row v-if="type=='4'" type="flex" class="iun_conte" justify="end" style="height:auto">
      <el-col :span="2">
        <div class="grid-content bg-purple-dark" style="text-align: right;margin:0 auto;"></div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-dark" style="text-align: right;margin:0 auto;">
          <div class="picker_input">
            <el-form :label-position="labelPosition" label-width="85px">
              <el-form-item label="标题">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.title"></el-input>
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
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </div>
              </el-form-item>
              <el-form-item label="地区">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.area"></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input id="uinu" style="height:30px;" class="uinu" v-model="vip_List.phone"></el-input>
              </el-form-item>
              <el-form-item label="浏览次数 ">
                <el-input
                  id="uinu"
                  style="height:30px;"
                  class="uinu"
                  v-model="vip_List.browse_times"
                ></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <template>
                  <div style="text-align:left">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="vip_List.description"
                    ></el-input>
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
      <el-col :span="24" class="pading_none" style="padding-bottom:10px;padding-left:100px;">
        <div class>
          <el-button type="primary" size="small" @click="ok_http">确定</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { error } from "util";
import { type } from "os";
export default {
  data() {
    return {
      labelPosition: "right",
      job_true: true,
      radio: "1", //默认显示
      status: "", //简历列表 1开启 2关闭
      textarea: "", //简历描述
      value1: "", //修改时间
      value2: "", //创建时间
      vip_List: [],
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
      imgages: []
    };
  },
  created() {
    let that = this;
    let datys = this.$route.query.id;
    let type = this.$route.query.type;
    this.type = type;
    this.$axios
      .post(this.api.openToken)
      .then(res => {
        this.qn.token = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });
    switch (type) {
      case "1":
        this.onlond_http(datys);
        break;
      case "2":
        this.job_detail(datys);
        break;
      case "3":
        this.getStoreDetail(datys);
        break;
      case "4":
        this.getSupplierDetail(datys);
        break;
    }
  },
  methods: {
    // 简历详情
    radio_change(radio){
      console.log(radio)
      // this.radio=radio

      this.vip_List.status=radio+''
      console.log(this.vip_List.status)
    },
    onlond_http(id) {
      let data = {
        id: id
      };
      this.$axios
        .post(this.api.getVitaDetail, data)
        .then(res => {
          console.log(res);
          this.vip_List = res.data.data;
          this.radio  =res.data.data.status+''
          let arr = this.vip_List.image_list;

          var json = [];
          if (arr[0] != "") {
            this.imgages = this.vip_List.image_list;
            this.lengTH_ = arr.length;
            for (var i = 0; i < arr.length; i++) {
              var j = {};
              j.name = "fimg" + i;
              j.url = arr[i];
              // 这里还可以继续添加属性 j.属性 = 值
              json.push(j);
            }
            this.fileList = json;
          }
          if (
            this.vip_List.work_year == "" ||
            this.vip_List.work_year == undefined
          ) {
            this.vip_List.work_year = "无";
          }
          if (
            (this.vip_List.salary_min == "" ||
              this.vip_List.salary_min == undefined) &&
            (this.vip_List.salary_max == "" ||
              this.vip_List.salary_max == undefined)
          ) {
            this.vip_List.salary_min = "面议";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 职位详情
    job_detail(id) {
      let data = {
        id: id
      };
      this.$axios
        .post(this.api.getJobDetail, data)
        .then(res => {
          console.log(res.data.data);
          this.vip_List = res.data.data;
          let arr = this.vip_List.image_list;
          this.lengTH_ = arr.length;
          var json = [];
          console.log(this.vip_List);
          for (var i = 0; i < arr.length; i++) {
            var j = {};
            j.name = "fimg" + i;
            j.url = arr[i];
            // 这里还可以继续添加属性 j.属性 = 值
            json.push(j);
          }
          this.fileList = json;

          if (
            this.vip_List.work_year == "" ||
            this.vip_List.work_year == undefined
          ) {
            this.vip_List.work_year = "无";
          }
          if (
            (this.vip_List.salary_min == "" ||
              this.vip_List.salary_min == undefined) &&
            (this.vip_List.salary_max == "" ||
              this.vip_List.salary_max == undefined)
          ) {
            this.vip_List.salary_min = "面议";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 门店详情
    getStoreDetail(id) {
      let data = {
        id: id
      };
      this.$axios
        .post(this.api.getStoreDetail, data)
        .then(res => {
          console.log(res.data.data);
          this.vip_List = res.data.data;
          let arr = this.vip_List.image_list;
          this.lengTH_ = arr.length;
          var json = [];
          console.log(this.vip_List);
          for (var i = 0; i < arr.length; i++) {
            var j = {};
            j.name = "fimg" + i;
            j.url = arr[i];
            // 这里还可以继续添加属性 j.属性 = 值
            json.push(j);
          }
          this.fileList = json;
          console.log(this.fileList);
          if (
            this.vip_List.work_year == "" ||
            this.vip_List.work_year == undefined
          ) {
            this.vip_List.work_year = "无";
          }
          if (
            (this.vip_List.salary_min == "" ||
              this.vip_List.salary_min == undefined) &&
            (this.vip_List.salary_max == "" ||
              this.vip_List.salary_max == undefined)
          ) {
            this.vip_List.salary_min = "面议";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 供应商详情
    getSupplierDetail(id) {
      let data = {
        id: id
      };
      this.$axios
        .post(this.api.getSupplierDetail, data)
        .then(res => {
          console.log(res.data.data);
          this.vip_List = res.data.data;
          let arr = this.vip_List.image_list;
          this.lengTH_ = arr.length;
          var json = [];
          console.log(this.vip_List);
          for (var i = 0; i < arr.length; i++) {
            var j = {};
            j.name = "fimg" + i;
            j.url = arr[i];
            // 这里还可以继续添加属性 j.属性 = 值
            json.push(j);
          }
          this.fileList = json;
          if (
            this.vip_List.work_year == "" ||
            this.vip_List.work_year == undefined
          ) {
            this.vip_List.work_year = "无";
          }
          if (
            (this.vip_List.salary_min == "" ||
              this.vip_List.salary_min == undefined) &&
            (this.vip_List.salary_max == "" ||
              this.vip_List.salary_max == undefined)
          ) {
            this.vip_List.salary_min = "面议";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    change_date(value1) {
      console.log(value1);
    },

    handlePreview(file) {
      console.log(file);
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
    over_up: function(res, file, fileList) {
      this.imageUrl = this.api.img_url + res.key;
      this.imgages.push(this.imageUrl);
    },
    exceed(files, fileList) {
      if (fileList.length >= 3) {
        this.$message({
          message: "最多上传3张图片",
          type: "warning"
        });
      }
    },
    ok_http() {
      let fileList = this.imgages;
      let url_ = "";
      let url_2 = "";
      for (let i = 0; i < fileList.length; i++) {
        url_ = fileList[i];
        url_2 += url_ + ",";
      }
      let basic = url_2.substring(0, url_2.length - 1);
      this.vip_List.images = basic;
      let type = this.type;
      switch (type) {
        case "1":
          this.$axios
            .post(this.api.editVita, this.vip_List)
            .then(res => {
              console.log(res);
              if (res.data.success == true) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 500,
                  onClose() {
                    // console.log(123);
                    // that.local_Reload(); //刷新页面
                  }
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
          break;
        case "2":
          this.$axios
            .post(this.api.editJob, this.vip_List)
            .then(res => {
               if (res.data.success == true) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 500,
                  onClose() {
                    // console.log(123);
                    // that.local_Reload(); //刷新页面
                  }
                });
              }
              console.log(res);
            })
            .catch(error => {
              console.log(error);
            });
          break;
        case "3":
          this.$axios
            .post(this.api.editStore, this.vip_List)
            .then(res => {
               if (res.data.success == true) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 500,
                  onClose() {
                    // console.log(123);
                    // that.local_Reload(); //刷新页面
                  }
                });
              }
              console.log(res);
            })
            .catch(error => {
              console.log(error);
            });
          break;
        case "4":
          this.$axios
            .post(this.api.editSupplier, this.vip_List)
            .then(res => {
               if (res.data.success == true) {
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 500,
                  onClose() {
                    // console.log(123);
                    // that.local_Reload(); //刷新页面
                  }
                });
              }
              console.log(res);
            })
            .catch(error => {
              console.log(error);
            });
          break;
      }
    }
  }
};
</script>
<style scoped>
@import url("vip_detail.css");
</style>