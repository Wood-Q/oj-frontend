import ACCESS_ENUM from "./accessEnum";

/**
 * 判断当前用户是否具有某个权限
 * @param loginUser
 * @param needAccess
 * @returns boolean
 */
const checkAccess = (
  loginUser: any,
  needAccess: string = ACCESS_ENUM.NOT_LOGIN
) => {
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  if (needAccess === ACCESS_ENUM.USER) {
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
