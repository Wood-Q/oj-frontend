import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "./accessEnum";
import checkAccess from "./checkAccess";
router.beforeEach(async (to, from, next) => {
  console.log("用户登录信息", store.state.user.loginUser);
  const loginUser = store.state.user.loginUser;

  // if (!loginUser || !loginUser.userRole) {
  //   await store.dispatch("user/getLoginUser");
  // }

  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  //要跳转的页面需要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    //如果没登录，跳转到登录页面
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    //如果已经登录但是权限不足跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
