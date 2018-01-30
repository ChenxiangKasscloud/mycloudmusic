/* 全局store管理(存储数据和管理数据的仓库)
 * 管理数据 : user
 * author : cx
 * time : 2017/11/23
 */

'use strict'

import Vue from 'vue';
import Vuex from 'vuex';

import user from './user/user';
import menus from './menu/menu'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    menus
  }
});

export default store
