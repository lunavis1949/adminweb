<template>
  <div calss="app" style="  height:100vh;overflow-y: hidden;">
    <el-row>
      <el-col :span="24">
        <headers v-if="isRouterAlive_1"></headers>
      </el-col>
      <el-row style="margin-top:50px;height:95vh;">
        <el-col :span="3">
          <lefts v-if="isRouterAlive_2"></lefts>
        </el-col>
        <el-col :span="21" class="contents" style="height: 100%;">
          <router-view v-if="isRouterAlive_3"></router-view>
        </el-col>
      </el-row>
    </el-row>
    <!-- <el-row v-if="$route.path=='/login'">
      <router-view></router-view>
    </el-row> -->
  </div>
</template>

<script>
import headers from "@/components/header/header.vue";
import lefts from "@/components/left/left.vue";

export default {
 
  provide() {
    return {
      reload: this.reload,
      local_Reload: this.local_Reload,
       left_Reload:this.left_Reload
    };
  },
  data() {
    return {
      isRouterAlive_1: true,
      isRouterAlive_2: true,
      isRouterAlive_3: true
    };
  },
  created() {
    let routes = this.$router.options.routes;
    // console.log(routes.showTo);
  },
  components: { headers, lefts },

  methods: {
    reload() {
      this.isRouterAlive_1 = false;
      this.isRouterAlive_2 = false;
      this.isRouterAlive_3 = false;
      this.$nextTick(function() {
        this.isRouterAlive_1 = true;
        this.isRouterAlive_2 = true;
        this.isRouterAlive_3 = true;
      });
    },
    local_Reload() {
      this.isRouterAlive_3 = false;
      this.$nextTick(function() {
        this.isRouterAlive_3 = true;
      });
    },
     left_Reload() {
      this.isRouterAlive_2 = false;
      this.$nextTick(function() {
        this.isRouterAlive_2 = true;
      });
    },
    showTo() {
      this.isRouterAlive_1 = false;
      this.isRouterAlive_2 = false;
      this.isRouterAlive_3 = false;
    }
  }
};
</script>

<style>
/* @import "./components/base/base.css"; */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.contents {
  background: #f1f4f6;
  padding: 20px;
}
.piecker {
  width: 50%;
  position: absolute;
  top: 0px;
  left: 50%;
  border-radius: 5px;
  background: #eeeeee;
  margin-left: -25%;
  -webkit-box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3) !important;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3) !important;
  z-index: 999;
}
.iun_conte {
  height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.pading_none {
  padding: 10px 20px;
}
.none_title {
  background: #2c3e50;
  color: #ffffff;
  margin-bottom: 20px;
}
</style>
  