import ACCESS_ENUM from "@/access/accessEnum";
import { getV1LoginUser, getV1Users } from "@/client";
import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      username: "未登录",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await getV1Users();
      const users = res.data;
      console.log("响应", users);
      if (res.status === 200) {
        commit("updateUser", res.data.users[0]);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
      console.log("用户信息", state.loginUser.username);
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
