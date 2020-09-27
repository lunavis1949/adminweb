<template>
  <div class="left" style="height:100vh;">
    <el-row>
      <!-- @open="handleOpen" @close="handleClose" -->
      <el-col :span="24" class="left_list">
        <div class="grid-content bg-purple">
          <el-menu
            style="height:100vh;"
            class="el-menu-vertical-demo"
            :default-active="this.$route.path?this.$route.path:1"
            background-color='#DCDFE6'
            :unique-opened='opened'
            router
            @select="((index,indexPath) => {goToPage(index,indexPath,true)})"
          >
            <div v-for="(item,index) in list" :key="index" style="width:100%;">
              <el-submenu
                :index="index+''"
                v-if="list[index].children!='' && list[index].children!=undefined"
                :span="24"
                style="text-align: left;"
              >
                <template slot="title">
                  <i :class="item.img"></i>
                  <span>{{item.title}}</span>
                </template>
                <el-menu-item-group>
                
                  <el-menu-item
                    v-for="(item_child,index) in list[index].children"
                    :key="index"
                    :index="item_child.route_path"
                    :route="{path:item_child.route_path,query:{pid:item_child.id}}"
                    style="padding:0px 20px 0 40px;min-width:100%;;width:70%;text-align: left;    "

                  >
               
                    <i :class="item_child.img"></i>
                    <span slot="title">{{item_child.title}}</span>
                  </el-menu-item>
                 
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item
                v-else
                :index="item.route_path"
                :route="{path:item.route_path,query:{pid:item.id}}"
                :span="24"
                style="text-align: left;"
              >
                <i :class="item.img"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from "../../../src/api";
// import glaData from "../../../src/glaData";
export default {
  name: "lefts",
  data() {
    return {
      opened:true,
      isCollapse: false,
      list: "",
      getpagelist_id: "",
      url_Path: "unitSelection",
      path:this.$router.history.current.path
    };
  },
  created() {
    let that = this;
    that.$axios
      .post(api.getpagelist)
      .then(res => {
        let chidrens = res.data.data[0].children;
        that.getpagelist_id = res.data.data[0].id;
        that.list = chidrens;
        for (let i = 0; i < chidrens.length; i++) {
          if (chidrens[i].children == undefined) {
          } else {
            let leng = chidrens[i].children;

            for (let j = 0; j < leng.length; j++) {
              if (
                chidrens[i].children[j].status == 1 &&
                chidrens[i].children[j].personal_permissions == 1
              ) {
                console.log("123");
              } else {
               
                chidrens[i].children.splice(j);
            
              }
            }
          }
        }
        console.log(chidrens);
        this.glaData.setname(that.getpagelist_id);
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    handleMenuSelect(index, indexPath) {
      console.log(index, indexPath);
      this.breads = indexPath;
    },
    goToPage(index, indexPath) {
      console.log(index, indexPath);
    },
    handleClose(key, keyPath) {
      console.log("123");
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
@import url("left.css");
</style>