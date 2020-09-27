<template>
  <div class="breadcrumb  headers">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in realList" :to="item.path" :key="index">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
 
<script>
export default {
  name: "lelve-bread",
  created() {
    this.getRoutePath();
  },
  data() {
    return {
      realList: []
    };
  },
  methods: {
    getRoutePath() {
      this.realList = this.$route.meta.routeList;
    
    }
  },
  beforeRouteEnter(to, from, next) {
      console.log(to, from, next)
    next(vm => {
      vm.realList = to.meta.routeList;
    });
  }

};
</script>