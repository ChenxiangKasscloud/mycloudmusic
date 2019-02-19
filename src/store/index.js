/* 全局store管理(存储数据和管理数据的仓库)
 * author : cx
 * time : 2017/11/23
 */

'use strict'

import Vue from 'vue';
import Vuex from 'vuex';
import SAPI from '../service/api/storeapi.js'

Vue.use(Vuex);

/**
 * 全局函数，供调用
 * 返回一个规定范围内的随机数
 * @param startRange 最小范围
 * @param endRange 最大范围
 * @returns {number}
 */
function randomRange(startRange, endRange) {
  return Math.floor(Math.random() * (endRange + 1 - startRange) + startRange)
}

const store = new Vuex.Store({
  state: {
    /*
     * 新的数据管理字段
     */
    AUDIO : null,   // 音频对象
    phoneInfo: {}, // 手机物理参数
    scrolltop: 0,
    music: {
			al: {},
			ar: [{}],
			artists: [{}],
			album: {}
		},
    audiotype: null,    // 音频类型 （ 1：音乐， 2：电台）
    playtype : 1,       // 播放方式 （ 1：顺序， 2：单曲， 3：随机 ）
    playurl: '',
    playing: false,
    playtime: 0,
    lrcObj : {},
    commentscount: 0,
    list_song: [],
    index_song: 0,
    favorites : [],
    iscycle : false,
    modelSelected: 'find_music' // find_music, my_music, friends, account
  },
  actions:{
    // 异步获获取红心歌曲，用户创建的歌单列表
    async getFavorites({commit, state}) {
			SAPI.getfavs().then( res => {
				commit("SETFAVS", (res.data.ids || []).join(","))
			});
			state.user.account && (await api.user_playlist(state.user.account.id, 0).then(res => {
				commit("SETPLAYLIST", res.data.playlist || [])
			}))
		},
    toNextAudio( {commit,state,dispatch},opt) {
      let audiolist = [],
          audioindex = 0;
      // 音乐
      if( state.audiotype == 1 ){
        audiolist = state.list_song;
        audioindex = state.index_song
      }
      // 电台
      if( state.audiotype == 2 ){
        audiolist = state.list_fm;
        audioindex = state.index_fm;
      }
      // 顺序播放
      if( state.playtype == 1 )
        commit("SETPLAYINDEX",audioindex + 1)
      // 单曲循环
      if( state.playtype == 2 )
        opt ? commit("SETPLAYINDEX",audioindex + 1) : commit("SETPLAYINDEX",audioindex)
      // 随机播放
      if( state.playtype == 3 )
        commit("SETPLAYINDEX",randomRange(0,audiolist.length) )
			// commit("setbgmchange", true);
			// if(state.audiotype == 2) {
			// 	dispatch("next_fm")
			// } else {
			// 	commit("next", true); //音乐播放完毕下一曲，播放完毕状态为musicend=true
			// 	dispatch("only_murl");
			// }
		},
    toPrevAudio( {commit,state,dispatch} ){
      let audiolist = [],
          audioindex = 0;
      // 音乐
      if( state.audiotype == 1 ){
        audiolist = state.list_song;
        audioindex = state.index_song
      }
      // 电台
      if( state.audiotype == 2 ){
        audiolist = state.list_fm;
        audioindex = state.index_fm;
      }
      // 随机播放
      if( state.playtype == 3 ){
        commit("SETPLAYINDEX",randomRange(0,audiolist.length) )
      }else {
        if( audioindex - 1 < 0 )
          commit("SETPLAYINDEX",audioindex)
        else
          commit("SETPLAYINDEX",audioindex-1)
      }
    }
  },
  mutations : {
    SETTABBAR (state, modelKey ){
      state.modelSelected = modelKey
    },
    SETAUDIO (state, audio) {
      state.AUDIO = audio
    },
    //  设置手机分辨率宽度
    SETREALDPR(state, dpr) {
      state.phoneInfo = {
        DPR : dpr,
        resolutionWidth : document.body.clientWidth * dpr,
        resolutionHeight : document.body.clientHeight * dpr
      }
    },
    // 设置滚动条高度
    SETSCROLL(state, st) {
			state.scrolltop = st;
		},
    // 设置播放音频类型
    SETAUDIOTYPE (state, type) {
      // type ( 1 : 'song' , 2 : 'dj'  )
      state.audiotype = type;
    },
    // 设置播放列表
    SETPLAYLIST(state, arr) {
			state.audiotype == 1 ? (state.list_song = arr) : (state.list_dj = arr);
		},
    // 设置播放位置
    SETPLAYINDEX(state, i) {
			if(state.audiotype == 1) {
				state.index_song = i;
				state.music = state.music.id == state.list_song[i].id ? state.music : state.list_song[i];
        console.info("state.music",state.music)
			} else {
				state.index_dj = i;
				state.music = state.music.id == state.list_dj[i].id ? state.music : state.list_dj[i]
			}
		},
    // 初始化音乐
    INITMUSIC(state) {
      // 暂停当前音频播放
			document.querySelector('audio').pause()
      // 重置所有播放参数
			state.commentscount = 0;
			state.playurl = ""
			state.playing = false;
			state.lrcObj = {
				lrc: [{}]
			};
			state.playloading = true;
			state.playtime = 0;
		},
    // 设置播放地址
    SETPLAYURL(state, url) {
			state.playurl = url
  	},
    // 设置播放时间
    SETPLAYTIME(state, time){
      state.playtime = time;
    },
    // 设置评论数
    SETCOMMENTSCOUNT(state, num) {
  		state.commentscount = num;
  	},
    // 设置是否播放
    SETPLAYING(state, value) {
			state.playing = value;
			if(value) {
        // 会报资源错误---待解决
				state.AUDIO.play()
			} else {
				state.AUDIO.pause()
			}
		},
    // 设置播放类型
    SETPLAYTYPE(state, type) {
      // 播放类型：（ 1 ：顺序播放，2 ：单曲循环， 3 ：随机播放 ）
      state.playtype = type
    },
    // 设置为等待加载状态
    SETWAITING(state, value) {
			state.playloading = value;
		},
  },
  getters : {
    getRankList: (state, getters) => {
      return state.ranklist.length;
    },
    getDjList: (state, getters) => {
      return state.DJlist.length;
    },
    getMusic ( state, getters ) {
      return state.music
    }
  }
});

export default store
