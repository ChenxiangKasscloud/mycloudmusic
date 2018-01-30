/** vue-router:
** dashboard
** errorpage
** author : cx
** time   : 2017/11/23
**/

'use strict'

// 引入基础依赖模块
import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview';
// 引入模块
import Index from '@/views/index'
import RecmdList from '@/views/music/index' //  推荐
import OrderList from '@/views/order/index' //  歌单
import DjList from '@/views/dj/index' //  电台
// import SongList from '@/views/songlist/songlist' //  歌单列表
// import MvList from '@/components/index/MvList' //  MV列表
// import RankingList from '@/components/index/RankingList' //  排行榜

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes : [
    {
      path : '/Index',
      name : 'Index',
      redirect : '/Index/RecmdList',
      component : Index,
      children : [
        {
          path: 'RecmdList',
          name: 'RecmdList',
          component: RecmdList
        },
        {
          path: 'OrderList',
          name: 'OrderList',
          component: OrderList
        },
        {
          path: 'DjList',
          name: 'DjList',
          component: DjList
        }
      ]
    },
    {
      path : '/PlayList/:id',
      name : 'PlayList',
      component : resolve => require(['@/views/playdetail/playdetail'], resolve)
    },
    {
      path : '/Player/:id',
      name : 'Player',
      component : resolve => require(['@/views/player/index'], resolve)
    },
    {
      path : '/Search',
      name : 'Search',
      component : resolve => require(['@/views/search/index'], resolve)
    },
    {
      path: '*',
      redirect: '/Index'
    },
  ]
})

router.beforeEach((to, from, next) => {
  next()
})
router.afterEach( route => {
  // 定位滚动条到顶部
  window.scrollTo(0, 0)
});

export default router
