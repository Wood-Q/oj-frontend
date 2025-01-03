// This file is auto-generated by @hey-api/openapi-ts

export type models_User = {
  createdAt?: string;
  deletedAt?: string;
  id?: number;
  openid?: string;
  password?: string;
  unionid?: string;
  updatedAt?: string;
  useraccount?: string;
  useravatar?: string;
  username?: string;
  userprofile?: string;
  userrole?: string;
};

export type PostV1UserSignInData = {
  body: {
    /**
     * UserAccount
     */
    user_account: string;
    /**
     * UserPassword
     */
    password: string;
  };
};

export type PostV1UserSignInResponse = string;

export type PostV1UserSignInError = unknown;

export type PostV1UserSignUpData = {
  body: {
    /**
     * UserAccount
     */
    user_account: string;
    /**
     * Password
     */
    password: string;
    /**
     * UserRole
     */
    user_role: string;
  };
};

export type PostV1UserSignUpResponse = models_User;

export type PostV1UserSignUpError = unknown;