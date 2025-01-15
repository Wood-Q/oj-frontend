import ACCESS_ENUM from "@/access/accessEnum";
import { getApiV1AuthLoginUser } from "@/client";
import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: JSON.parse(
      sessionStorage.getItem("loginUser") || '{"userRole": "notLogin"}'
    ),
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const res = await getApiV1AuthLoginUser();
      const users = res.data;
      if (res.status === 200) {
        commit("updateUser", users?.user);
        sessionStorage.setItem("loginUser", JSON.stringify(users?.user));
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
