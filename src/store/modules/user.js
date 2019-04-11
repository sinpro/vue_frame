import { loginByEmail, logout, getInfo } from 'api/login';
import Cookies from 'js-cookie';

const user = {
  state: {
    token: Cookies.get('Admin-Token'),
    code: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
  },

  actions: {


    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          commit('SET_ROLES', data.role);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },



    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          Cookies.remove('Admin-Token');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('Admin-Token');
        alert("has logout");
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        Cookies.set('Admin-Token', role);
        resolve();
      })
    }
  }
};

export default user;
