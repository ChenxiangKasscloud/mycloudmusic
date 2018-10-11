/** 入口文件:
** 引入各种全局库
** author : cx
** time   : 2017/06/07
**/

'use strict'

import 'babel-polyfill' // 模拟ES6环境
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index'
import iView from 'iview'
import filters from './filters/index'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/index.css'
import 'normalize.css/normalize.css'// normalize.css 样式格式化
// import vconsole from 'vconsole' // 引入手机调试板
// import API from "@/js/MusicApi"

Vue.use(Mint);

let FastClick = require('FastClick')
if('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

// 混入全局对象
Vue.mixin({ filters })

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
}).$mount('#app')
