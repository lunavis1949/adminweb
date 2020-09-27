import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login.vue'
import header_top from '@/components/header/header.vue'
import admin from '@/components/permissions/admin/admin.vue'
import rules from '@/components/permissions/rules/rules.vue'
import user from '@/components/permissions/user/user.vue'
import vip from '@/components/vip/vip.vue'
import recr from '@/components/recr/recr.vue'
import apply_Job from '@/components/apply_Job/apply_Job.vue'
import store from '@/components/store/store.vue'
import supplier from '@/components/supplier/supplier.vue'
import statistical from '@/components/statistical/statistical.vue'
import deta from '@/components/base/deta.vue'
import heade_contet from '@/components/base/heade_contet.vue'
import vip_detail from '@/components/vip_detail/vip_detail.vue'
import statcopy from '@/components/statistical_copy/statistical.vue'
import vip_number from '@/components/base/vip_number.vue'
import acco from '@/components/acco/acco.vue'
import version from '@/components/version/version.vue'
import Balance_with from '@/components/Balance_with/Balance_with.vue'


Vue.use(Router)
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  
  routes: [{
      path: '/login',
      name: '登录',
      component: login,
    },
    {
      path:'/',
      name:'heade_contet',
      component:heade_contet,
      children: [
        {
          path: '/',
          name: '用户中心',
          component: acco,
        },
        {
          path: '/admin',
          name: '角色管理',
          component: admin,
        },
        {
          path: '/rules',
          name: '页面管理',
          component: rules
        },
        {
          path: '/vip',
          name: '会员管理',
          component: vip
        },
        {
          path: '/recr',
          name: '招聘管理',
          component: recr
        },
        {
          path: '/apply',
          name: '求职管理',
          component: apply_Job
        }, {
          path: '/store',
          name: '店面管理',
          component: store
        },
        {
          path: '/supplier',
          name: '供应商',
          component: supplier
        },
        {
          path: '/stat',
          name: '统计',
          component: statistical
        },
        {
          path: '/statcopy',
          name: '媒体统计',
          component: statcopy
        },
        {
          path: '/user',
          name: '账号管理',
          component: user
        },
        {
          path: '/version',
          name: '版本管理',
          component: version
        },
        {
          path: '/Balance',
          name: '余额提现',
          component: Balance_with
        },
      ]

    },
   
    {
      path: '/deta',
      name: 'deta',
      component: deta,
    },
    {
      path: '/vip_detail',
      name: 'vip_detail',
      component: vip_detail,
    },
    {
      path: '/vip_number',
      name: 'vip_number',
      component: vip_number,
    },
    
    
    
  ]
})
