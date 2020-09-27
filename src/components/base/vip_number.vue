<template>
  <div class="vip_number">
    <el-table :data="data_list" style="width: 100%">
      <el-table-column align="center" prop="uid" label="用户ID    " width="180"></el-table-column>
      <el-table-column align="center" prop="nickname" label="用户昵称" width="180"></el-table-column>
      <el-table-column align="center" prop="create_time" label="浏览时间"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { error } from "util";
export default {
  data() {
    return {
        data_list:[],
    };
  },
  created() {
    let id = this.$route.query.id;
    let type = this.$route.query.type;
    this.onlond_http(id, type);
  },
  methods: {
    onlond_http(id, type) {
      let that = this;
      let data = {
        id: id,
        type: type
      };
      that.$axios
        .post(this.api.accessCount, data)
        .then(res => {
          console.log(res.data.data);
          this.data_list = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>