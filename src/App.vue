<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>
import headers from "@/components/header/header.vue";
import lefts from "@/components/left/left.vue";
import login from "@/components/login/login.vue";

import heade_contet from '@/components/base/heade_contet.vue'
import { error } from 'util';
export default {
  name: "app",
 
  data() {
    return {
     
    };
  },
  created() {
    let routes = this.$router.options.routes;
    this.$axios.post(this.api.getpagelist).then(res=>{
      if(res.data.code==300000){
        this.$router.push('/login')
      }
    }).catch(error=>{
      console.log(error)
    })
  },
  components: { headers, lefts, login,heade_contet },

  methods: {
   
  }
};
</script>

<style>
@import "./components/base/base.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* background: #f1f4f6; */
}
.contents {
  background: #f1f4f6;
  padding: 20px;
}
.piecker {
  width: 50%;
  position: absolute;
  top: 6%;
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
  