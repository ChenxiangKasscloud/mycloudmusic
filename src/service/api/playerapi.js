/** 数据接口:
** author : cx
** time   : 2017/11/30
** getWaitauditList
**/

'use strict'

import Xhttp from '../Xhttp.js';
const api = new Xhttp();

const PlayerApi = {
  // 获取歌单详情
  getLrc (params) {
    return new Promise( (resolve,reject) => {
      api.get('/lyric',params).then( res => {
        resolve(res)
      }).catch( err => {
        resolve(res)
      })
    })
  },
  getComments (params){
    return new Promise( (resolve,reject) => {
      api.get('/comment/music',params).then( res => {
        resolve(res)
      }).catch( err => {
        resolve(res)
      })
    })
  },
  getPlayUrls (params) {
    return new Promise( (resolve,reject) => {
      api.get('/music/url',params).then( res => {
        resolve(res)
      }).catch( err => {
        resolve(res)
      })
    })
  }
}

export default PlayerApi
