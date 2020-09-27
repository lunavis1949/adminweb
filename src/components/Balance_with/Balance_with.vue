<template>
  <div class="Balance_with">
    <el-row>
      <breadcrumb></breadcrumb>
    </el-row>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="未通过" name="1">
        <div>
          <el-table :data="tableData" height="70vh" border style="width: 100%">
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="wechat_id" label="微信号" width="180"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="amount" label="提现金额"></el-table-column>
            <el-table-column prop="amount" label="状态">
              <slot slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="active_value"
                  :inactive-value="inactive_value"
                  @change="change_(scope.row)"
                ></el-switch>
              </slot>
            </el-table-column>
            <el-table-column prop="create_time" label="申请时间"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已通过" name="2">
        <div>
          <el-table :data="tableData" height="70vh" border style="width: 100%">
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="wechat_id" label="微信号" width="180"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="amount" label="提现金额"></el-table-column>
            <el-table-column prop="amount" label="状态">
              <slot slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="active_value"
                  :inactive-value="inactive_value"
                  @change="change_(scope.row)"
                ></el-switch>
              </slot>
            </el-table-column>
            <el-table-column prop="create_time" label="申请时间"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
  
      :page-size="limit"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import breadcrumb from "@/components/base/breadcrumb";
export default {
  data() {
    return {
      tableData: [],
      activeName: "1",
      active_value: 2,
      inactive_value: 1,
      page: 1,
      limit: 10,
      total: 0
    };
  },
  components: {
    breadcrumb
  },
  created() {
    this.onlond(this.page, this.limit, this.activeName);
  },
  methods: {
    handleClick(tab, event) {
      this.page=1
      this.limit=10
      console.log(tab);
      this.onlond(this.page, this.limit, this.activeName);
    },
    onlond(page, limit, status) {
      let data = {
        page: page,
        limit: limit,
        status: status
      };
      this.$axios
        .post(this.api.getWithdrawList, data)
        .then(res => {
          console.log(res);
          this.total = res.data.total;
          this.tableData = res.data.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    change_(row) {
      let data = {
        id: row.id,
        status: row.status
      };
      this.$axios
        .post(this.api.enableWithdraw, data, "post")
        .then(res => {
          console.log(res);
         this.onlond(this.page, this.limit, this.activeName);
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.onlond(this.page, this.limit, this.activeName);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.onlond(this.page, this.limit, this.activeName);
    }
  }
};
</script>
<style scoped>
.el-is-top{
    background: #ffffff !important;
}
.el-pagination{
  padding: 20rpx 0 !important;
    background: #ffffff !important;
}
</style>