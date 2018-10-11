/** 数据接口:
** author : cx
** time   : 2018/1/10
** getWaitauditList
**/

'use strict'

import Xhttp from '../Xhttp.js';
const api = new Xhttp();

const OrderApi = {
  // 获取精品歌单
  getHQList () {
    return new Promise( (resolve,reject) => {
      api.get('/top/playlist/highquality',null).then( res => {
        resolve(res)
      }).catch( err => {
        resolve(res)
      })
    })
  },
  // 获取歌曲分类
  getCateList () {
    return new Promise( (resolve,reject) => {
      api.get('/playlist/catlist',null).then( res => {
        resolve(res)
      }).catch( err => {
        resolve(res)
      })
    })
  },
  // 获取分类歌曲列表
  getPlayList (params) {
    return new Promise( (resolve,reject) => {
      api.get('/top/playlist',params).then( res => {
        resolve(res)
      }).catch( err => {
        resolve(res)
      })
    })
  }
}

export default OrderApi
