import {getInfo, login, register} from "@/api/login";
import {getToken, removeToken, setToken} from "@/api/auth";


const user = {
  state: {
    token: getToken(),
    user: sessionStorage.user ? JSON.parse(sessionStorage.user) : {},
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      setToken(token);
    },

    SET_USER: (state, user) => {
      state.user = user;
      sessionStorage.user = JSON.stringify(user)
    },

    UPDATE_USER: (state, user) => {
      Object.assign(state.user, user);
      sessionStorage.user = JSON.stringify(state.user);
    },

    CLEAR_INFO: state => {
      state.token = '';
      state.user = {};
      removeToken();
      sessionStorage.removeItem('user')
      // state.roles = {};
    }
  },

  actions: {
    Login({ commit }, userInfo) {
      userInfo.username = userInfo.username.trim();
      return new Promise(((resolve, reject) => {
        login(userInfo).then(response => {
          commit('SET_USER', response);
          resolve()
        }).catch(error => {
          reject(error)
        })
      }))
    },

    Register({ commit }, userInfo) {
      userInfo.username = userInfo.username.trim();
      userInfo.nickName = userInfo.nickName.trim();
      return new Promise((resolve, reject) => {
        register(userInfo).then(() => {
          commit('CLEAR_INFO');
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          commit('SET_USER', response);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({ commit }) {
      return new Promise((resolve) => {
        commit('CLEAR_INFO');
        resolve()
        /*logout().then(() => {
          commit('CLEAR_INFO');
          resolve()
        }).catch(error => {
          reject(error)
        })*/
      })
    }
  }
};

export default user;