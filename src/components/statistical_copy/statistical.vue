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
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick_tabs(activeName)">
        <el-tab-pane label="全部" name></el-tab-pane>
      </el-tabs>
      <el-row v-if="edit==true">
        <el-table
          :data="vip_List"
          height="60vh"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          size="small"
          highlight-current-row
        >
          <el-table-column align="center" prop="days" sortable label="日期" width="100"></el-table-column>
          <el-table-column align="center" prop="promotion" label="推广次数" width="100">
            <slot slot-scope="scope">
              <input
                v-model="scope.row.promotion"
                @blur="blur(scope.row)"
                style="width: 100%;border: none;text-align:center;"
              />
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="users" label="新增用户" width="170">
            <slot slot-scope="scope">
              <span style="width: 100%;border: none;text-align:center;">{{scope.row.users}}</span>
              <br />
              <div style="display: flex;justify-content: center">
                <label>小程序:</label>
                <input
                  v-model="scope.row.add_user_channel_array[0]"
                  @blur="blur(scope.row)"
                  type="number"
                  style="width: 30%;border: none;text-align:center;margin-left:5px;"
                />
              </div>
            <div style="display: flex;justify-content: center">
                <label>苹果:</label>
                <input
                  v-model="scope.row.add_user_channel_array[1]"
                  @blur="blur(scope.row)"
                  type="number"
                  style="width: 30%;border: none;text-align:center;margin-left:15px;"
                />
              </div>
            <div style="display: flex;justify-content: center">
                <label>安卓:</label>
                <input
                  v-model="scope.row.add_user_channel_array[2]"
                  @blur="blur(scope.row)"
                  type="number"
                  style="width: 30%;border: none;text-align:center;margin-left:15px;"
                />
              </div>
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="worker" label="新增求职" width="70">
            <slot slot-scope="scope">
              <input
                v-model="scope.row.worker"
                @blur="blur(scope.row)"
                style="width: 100%;border: none;text-align:center;"
              />
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="boss" label="新增招聘" width="70">
            <slot slot-scope="scope">
              <input
                v-model="scope.row.boss"
                @blur="blur(scope.row)"
                style="width: 100%;border: none;text-align:center;"
              />
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="store" label="新增店面" width="70">
            <slot slot-scope="scope">
              <input
                v-model="scope.row.store"
                @blur="blur(scope.row)"
                style="width: 100%;border: none;text-align:center;"
              />
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="supplier" label="新增供应商" width="85">
            <slot slot-scope="scope">
              <input
                v-model="scope.row.supplier"
                @blur="blur(scope.row)"
                style="width: 100%;border: none;text-align:center;"
              />
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="supplier_message" label="新增供应消息" width="95">
            <slot slot-scope="scope">
              <input
                v-model="scope.row.supplier_message"
                @blur="blur(scope.row)"
                style="width: 100%;border: none;text-align:center;"
              />
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="visits" label="通过二维码分享访问次数" width="160">
            <slot slot-scope="scope">
              <input
                v-model="scope.row.visits"
                @blur="blur(scope.row)"
                style="width: 100%;border: none;text-align:center;"
              />
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="top" label="新增置顶" width="70">
            <slot slot-scope="scope">
              <input
                v-model="scope.row.top"
                @blur="blur(scope.row)"
                style="width: 100%;border: none;text-align:center;"
              />
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="search" label="新增搜索人数/次数" width="130">
            <slot slot-scope="scope">
              <input
                v-model="scope.row.search"
                @blur="blur(scope.row)"
                style="width: 100%;border: none;text-align:center;"
              />
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="template" label="模板消息发送次数" width="120">
            <slot slot-scope="scope">
              <input
                v-model="scope.row.template"
                @blur="blur(scope.row)"
                style="width: 100%;border: none;text-align:center;"
              />
            </slot>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row v-if="edit==false">
        <el-table
          :data="vip_List"
          height="60vh"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          size="small"
          highlight-current-row
        >
          <el-table-column align="center" prop="days" sortable label="日期" width="100"></el-table-column>
          <el-table-column align="center" prop="promotion" label="推广次数" width="100"></el-table-column>
          <el-table-column align="center" prop="users" label="新增用户" width="170">
            <slot slot-scope="scope">
              <span>{{scope.row.users}}</span>
              <br />
              <span v-if="scope.row.add_user_channel">({{scope.row.add_user_channel}})</span>
            </slot>
          </el-table-column>
          <el-table-column align="center" prop="worker" label="新增求职" width="70"></el-table-column>
          <!-- <el-table-column align="center" prop="vitas" label="新增简历" width="70"></el-table-column> -->
          <el-table-column align="center" prop="boss" label="新增招聘" width="70"></el-table-column>
          <!-- <el-table-column align="center" prop="jobs" label="新增职位" width="70"></el-table-column> -->
          <el-table-column align="center" prop="store" label="新增店面" width="70"></el-table-column>
          <el-table-column align="center" prop="supplier" label="新增供应商" width="85"></el-table-column>
          <el-table-column align="center" prop="supplier_message" label="新增供应消息" width="95"></el-table-column>
          <el-table-column align="center" prop="visits" label="通过二维码分享访问次数" width="160"></el-table-column>
          <!-- <el-table-column align="center" prop="top" label="新增置顶" width="70"></el-table-column> -->
          <el-table-column align="center" prop="search" label="新增搜索人数/次数" width="130"></el-table-column>
          <el-table-column align="center" prop="template" label="模板消息发送次数" width="120"></el-table-column>
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
  </div>
</template>
<script>
import breadcrumb from "@/components/base/breadcrumb";
import { error } from "util";
export default {
  components: {
    breadcrumb
  },
  data() {
    return {
      input4: "", //搜索框
      vip_List: [], //数据列表
      labelPosition: "right",
      add_but: "info",
      activeName: "", //tab切换 默认显示第一个
      current_page: 0, //默认页码
      limit: 15,
      page: 1,
      page_sizes: [15, 20, 25, 30],
      total: 0,
      top_date: "", //查询详情日期
      formLabelAlign: [],
      data_con: [],
      edit: false
    };
  },
  inject: ["local_Reload"],
  created() {
    this.onLonds(this.page, this.limit);
    let arry_length = this.vip_List.length;
    let datys = this.$route.query.id;
    let type = this.$route.query.type;

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
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    // 首次渲染
    onLonds(pages, limit, status) {
      let data = {
        limit: limit,
        page: pages,
        status: status
      };
      this.$axios
        .post(this.api.visitList_Index, data)
        .then(res => {
          this.vip_List = res.data.data;
          this.total = res.data.count;
          let list= res.data.data;
          for(let i=0;i<=list.length-1;i++){
            if(!list[i].add_user_channel_array){
              list[i].add_user_channel_array=['0','0','0']
            }
            // for(let j=0;j<=list[i].add_user_channel_array;j++){
            //   list[i].add_user_channel_array[j]=Number(list[i].add_user_channel_array[j])
            // }
          }
          console.log(res.data.data)
        })
        .catch(error => {
          console.log(error);
        });
    },

    // tab切换
    handleClick_tabs(activeName) {
      this.status = activeName;
      this.add_but = "info";
      this.onLonds(this.page, this.limit, this.status);
    },
    //刷新页面
    refresh() {
      this.local_Reload();
    },
    blur(row) {
      this.data_con = row;
      this.$axios
        .post(this.api.visitSave, this.data_con)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    edit_play() {
      console.log(12);
    },
    top(row) {
      console.log(row);
      this.top_date = row.days;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.add_but = "info";
      this.onLonds(this.page, this.limit, this.status);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.add_but = "info";
      this.onLonds(this.page, this.limit, this.status);
      console.log(this.vip_List);
    }
  }
};
</script>
<style scoped>
.buttonText {
  color: red;
}
</style>