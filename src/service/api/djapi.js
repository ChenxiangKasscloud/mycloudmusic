/** 数据接口:
** author : cx
** time   : 2018/1/10
** getWaitauditList
**/

'use strict'

import Xhttp from '../Xhttp.js'
const api = new Xhttp()

const djApi = {
  // 获取推荐分类电台列表
  getRecommendDjs (params) {
    return new Promise((resolve, reject) => {
      api.get('/dj/recommend/type', params).then(res => {
        resolve(res)
      }).catch(err => {
        resolve(err)
      })
    })
  }
}

export default djApi
