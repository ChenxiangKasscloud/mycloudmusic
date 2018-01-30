/** 状态管理
** author : cx
** time   : 2017/11/23
**/

/* 保存个人信息--状态管理
	username		    string
	userId		      string
*/

let state = {
  user : null
};
const mutations = {
    setUserInfo (state, newValue) {
      state.user = newValue;
    }
}
const actions = {
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          commit('SET_ROLES', data.role);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_UID', data.uid);
          commit('SET_INTRODUCTION', data.introduction);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
}

export default {
	state,
	mutations,
	actions
}
