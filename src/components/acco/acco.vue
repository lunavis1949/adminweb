<template>
  <div class="acco">
    <el-row>
      <breadcrumb></breadcrumb>
    </el-row>
    <!-- <div class="titles">
      <p>账号中心</p>
      <p>可以查看当前账号的信息</p>
    </div>-->
    <div class="username">
      <div class="title_name">基本信息</div>
      <div class="user_">
        <ul class="list_user">
          <li>
            <label>账号名称 ：</label>
            <span>{{user.name}}</span>
          </li>
          <li>
            <label>创建时间 ：</label>
            <span>{{user.createTime}}</span>
          </li>
          <li>
            <label>登录次数 ：</label>
            <span>{{user.loginCount}}</span>
          </li>
          <li>
            <label>最近登录时间 ：</label>
            <span>{{user.lastLoginTime}}</span>
          </li>
          <li>
            <label>最近登录IP ：</label>
            <span>{{user.lastLoginIp}}</span>
          </li>
        </ul>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" height="43vh">
      <el-table-column align="center" prop="time" label="最近登录时间"></el-table-column>
      <el-table-column align="center" prop="ip" label="最近登录IP"></el-table-column>
      <el-table-column align="center" prop="site" label="最近登录地区"></el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="limit"
        :page-sizes=" page_sizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
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
      user: "",
      limit: 10,
      page: 1,
      page_sizes: [10, 15, 25, 35],
      total:0,
    };
  },
  inject: ["local_Reload"],
  components: {
    breadcrumb
  },
  created() {
    this.onlond(this.page, this.limit);

    this.$axios
      .post(this.api.getUserDetail)
      .then(res => {
        this.user = res.data;
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onlond(page, linmit) {
      let data = {
        page: page,
        limit: linmit
      };
      this.$axios
        .post(this.api.getLoginIpHistory, data)
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.total = res.data.total;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit=val
       this.onlond(this.page, this.limit);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page=val
       this.onlond(this.page, this.limit);
    }
  }
};
</script>
<style scoped>
@import url("/acco.css");
</style>