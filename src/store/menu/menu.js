/** 状态管理
** author : cx
** time   : 2017/11/23
**/

/* 保存已点击的菜单信息--状态管理
	menuname		    string
	menuid		      string
*/

let state = {
  menus : [],
  currentmenu : ''
};

let getters = {
	menus: state => {
		return state.menus
	},
  currentmenu : state =>{
    return state.currentmenu
  }
}

const mutations = {
  setMenu ( state, newValue ) {
    state.currentmenu = newValue
  },
  addMenu ( state, newValue ) {
    state.menus.map( (menu,index) => {
      menu.isselect = false;
      if( menu.menuname == newValue )
        state.menus.splice(index,1)
    })
    let tempMenu = {
      menuname : newValue,
      menuid  : newValue,   // 暂时没有，所以和name相同
      isselect : true
    }
    state.menus.push(tempMenu);
  },
  delMenu ( state, oldValue ) {
    state.menus.map( ( menu, index ) => {
      menu.isselect = false;
      if( menu.menuname == oldValue )
        state.menus.splice(index,1)
    })
  }
}
const actions = {
    // 添加导航菜单
    addMenu({ commit, state }) {
      console.info("addMenu",{ commit, state })
      return new Promise((resolve, reject) => {
        // getInfo(state.token).then(response => {
        //   const data = response.data;
        //   commit('SET_ROLES', data.role);
        //   commit('SET_NAME', data.name);
        //   commit('SET_AVATAR', data.avatar);
        //   commit('SET_UID', data.uid);
        //   commit('SET_INTRODUCTION', data.introduction);
        //   resolve(response);
        // }).catch(error => {
        //   reject(error);
        // });
      });
    }
}

export default {
    getters,
  	state,
  	mutations,
  	actions
  }
