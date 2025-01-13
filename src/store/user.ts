import ACCESS_ENUM from "@/access/accessEnum";
import { getApiV1AuthLoginUser } from "@/client";
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
      const res = await getApiV1AuthLoginUser();
      const users = res.data;
      console.log("响应", users);
      if (res.status === 200) {
        commit("updateUser", users?.user);
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
