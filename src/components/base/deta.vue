<template>
  <div class="deta">
    <el-table :data="tableData" style="width: 100%" v-if="type==1">
      <el-table-column align="center" prop="uid" label="用户ID" width="180"></el-table-column>
      <el-table-column align="center" prop="nickname" label="用户昵称" width="180"></el-table-column>
      <el-table-column align="center" prop="cnt" label="访问次数"></el-table-column>
      <el-table-column align="center" prop="vita_id" label="查看简历">
        <a href>简历0</a>
      </el-table-column>
      <el-table-column align="center" prop="job_ids" label="查看职位">
        <slot slot-scope="scope">
          <a href v-for="(item,index) in scope.row.job_ids">职位{{index}}</a>
        </slot>
      </el-table-column>
      <el-table-column align="center" style="height:40px;" prop="store_ids" label="查看门店">
        <slot slot-scope="scope">
          <a href v-for="(item,index) in scope.row.store_ids">职位{{index}}</a>
        </slot>
      </el-table-column>
      <el-table-column align="center" prop="supplier_ids" label="查看供应商">
        <slot slot-scope="scope">
          <a href v-for="(item,index) in scope.row.supplier_ids">职位{{index}}</a>
        </slot>
      </el-table-column>
    </el-table>
    <el-table :data="tableData" style="width: 100%" v-if="type==2">
      <el-table-column align="center" prop="uid" label="用户ID" width="180"></el-table-column>
      <el-table-column align="center" prop="nickname" label="用户昵称" width="180"></el-table-column>
      <el-table-column align="center" prop="three" label="置顶3天">
        <template slot-scope="scope">
          <a href v-for="item in scope.row.three" v-html="item" style="display:block;"></a>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="seven" label="置顶一周">
        <template slot-scope="scope">
          <a href v-for="item in scope.row.seven" v-html="item" style="display:block;"></a>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="tableData" style="width: 100%" v-if="type==3">
      <el-table-column align="center" prop="uid" label="用户ID" width="180"></el-table-column>
      <el-table-column align="center" prop="nickname" label="用户昵称" width="180"></el-table-column>
      <el-table-column align="center" prop="keyword" label="搜索关键字">
        <template slot-scope="scope">
          <div v-for="item in scope.row.keyword" v-html="item" style="display:block;">{{item}}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-table :data="tableData" style="width: 100%" v-if="type==4">
      <el-table-column align="center" prop="uid" label="用户ID" width="180"></el-table-column>
      <el-table-column align="center" prop="nickname" label="用户昵称" width="180"></el-table-column>
      <el-table-column align="center" prop="three" label="访问次数">
        <div slot-scope="scope">1</div>
      </el-table-column>
      <el-table-column align="center" prop="seven" label="异常访问次数">
        <template slot-scope="scope">
          <div style="display:block;">{{scope.row.p}}</div>
        </template>
      </el-table-column>
    </el-table>
    <div></div>
  </div>
</template>
<script>
import { error } from "util";
export default {
  data() {
    return {
      datys: "", //传过来的日期
      type: "", //传过来的类型
      tableData: [], //数据列表
      tab_: [] //t表格标签
    };
  },
  created() {
    let that = this;
    let datys = this.$route.query.datys;
    let type = this.$route.query.type;
    this.type = type;

    let data = {
      type: type,
      date: datys
    };
    this.$axios
      .post(this.api.statisDetail, data)
      .then(res => {
        console.log(res.data.data);
        this.tableData = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });
    switch (type) {
      case "1":
        break;
    }

    console.log(typeof type);
    console.log(data);
  }
};
</script>