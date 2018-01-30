/** 数据接口:
** author : cx
** time   : 2018/1/10
** getWaitauditList
**/

'use strict'

import Xhttp from '../Xhttp.js';
const api = new Xhttp();

const SlistApi = {
  // 获取歌单详情
  getPlayDetail (params) {
    return new Promise( (resolve,reject) => {
      api.get('playlist/detail',params).then( res => {
        resolve(res)
      }).catch( err => {
        resolve(res)
      })
    })
  },
}

export default SlistApi
