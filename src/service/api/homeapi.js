/** 数据接口:
** author : cx
** time   : 2018/1/10
** getWaitauditList
**/

'use strict'

import Xhttp from '../Xhttp.js'
const api = new Xhttp()

const homeApi = {
  // 获取banner图
  getBanners () {
    return new Promise((resolve, reject) => {
      api.get('/banner', {}).then(res => {
        resolve(res)
      }).catch(err => {
        resolve(err)
      })
    })
  },
  // 获取推荐歌单
  getRecommendsList () {
    return new Promise((resolve, reject) => {
      api.get('/personalized', {}).then(res => {
        resolve(res)
      }).catch(err => {
        resolve(err)
      })
    })
  },
  // 获取独家放送内容
  getPriContentList () {
    return new Promise((resolve, reject) => {
      api.get('/personalized/privatecontent', {}).then((res) => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取最新音乐
  getAlbumsList () {
    return new Promise((resolve, reject) => {
      api.get('/personalized/mv', {}).then((res) => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取推荐mv
  getRecommendMvs () {
    return new Promise((resolve, reject) => {
      api.get('/personalized/mv', {}).then((res) => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取推荐电台
  getRecommendDjs () {
    return new Promise((resolve, reject) => {
      api.get('/personalized/djprogram', {}).then((res) => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default homeApi
