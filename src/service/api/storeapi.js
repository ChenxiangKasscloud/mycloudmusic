/** 数据接口:
** author : cx
** time   : 2018/1/10
** getWaitauditList
**/

'use strict'

import Xhttp from '../Xhttp.js';
const api = new Xhttp();

const StoreApi = {
  // 获取喜欢的歌曲
  getfavs () {
    return new Promise( (resolve,reject) => {
      api.get('/likelist',null).then( res => {
        resolve(res)
      }).catch( err => {
        resolve(res)
      })
    })
  }
}

export default StoreApi
