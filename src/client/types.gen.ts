// This file is auto-generated by @hey-api/openapi-ts

export type models_Question = {
  acceptednum?: number;
  answer?: string;
  content?: string;
  createdAt?: string;
  deletedAt?: string;
  /**
   * gorm.Model
   */
  id?: number;
  judge_case?: {
    input: string;
    output: string;
  }[]; // judge_case 是包含 input 和 output 字符串的对象数组
  judge_config?: {
    memoryLimit: number;
    stackLimit: number;
    timeLimit: number;
  }; // judge_config 是一个包含限制字段的对象
  question_id?: number;
  submitnum?: number;
  tags?: string[]; // tags 是一个字符串数组
  title?: string;
  updatedAt?: string;
  user_id?: number;
};

export type models_QuestionSubmit = {
  code?: string;
  content?: string;
  createdAt?: string;
  deletedAt?: string;
  /**
   * gorm.Model
   */
  id?: number;
  judgeInfo?: string;
  language?: string;
  question_id?: number;
  status?: string;
  updatedAt?: string;
  user_id?: number;
};

export type models_User = {
  createdAt?: string;
  deletedAt?: string;
  /**
   * gorm.Model
   */
  id?: number;
  openid?: string;
  password?: string;
  unionid?: string;
  updatedAt?: string;
  user_account?: string;
  useravatar?: string;
  username?: string;
  userprofile?: string;
  userrole?: string;
};

export type GetApiV1AuthLoginUserResponse = any;

export type GetApiV1AuthLoginUserError = unknown;

export type PostApiV1AuthSignInData = {
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

export type PostApiV1AuthSignInResponse = any;

export type PostApiV1AuthSignInError = unknown;

export type PostApiV1AuthSignUpData = {
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
    user_name: string;
  };
};

export type PostApiV1AuthSignUpResponse = any;

export type PostApiV1AuthSignUpError = unknown;

export type GetApiV1QuestionsResponse = any;

export type GetApiV1QuestionsError = any;

export type PostApiV1QuestionsData = {
  /**
   * Question Information
   */
  body: models_Question;
};

export type PostApiV1QuestionsResponse = any;

export type PostApiV1Questany = any;

export type GetApiV1QuestionsByQuestionIdData = {
  path: {
    /**
     * Question ID
     */
    question_id: string;
  };
};

export type GetApiV1QuestionsByQuestionIdResponse = any;

export type GetApiV1QuestionsByQuestionIdError = any;

export type PostApiV1QuestionsError = any;

export type PutApiV1QuestionsByQuestionIdData = {
  /**
   * Updated Question Information
   */
  body: models_Question;
  path: {
    /**
     * Question ID
     */
    question_id: string;
  };
};

export type PutApiV1QuestionsByQuestionIdResponse = any;

export type PutApiV1QuestionsByQuestionIdError = any;

export type DeleteApiV1QuestionsByQuestionIdData = {
  path: {
    /**
     * Question ID
     */
    question_id: string;
  };
};

export type DeleteApiV1QuestionsByQuestionIdResponse = any;

export type DeleteApiV1QuestionsByQuestionIdError = any;

export type GetApiV1QuestionsubmitResponse = any;

export type GetApiV1QuestionsubmitError = unknown;

export type PostApiV1QuestionsubmitData = {
  /**
   * Question Information
   */
  body: models_QuestionSubmit;
};
export type PostApiV1QuestionsubmitResponse = any;

export type PostApiV1QuestionsubmitError = unknown;

export type GetApiV1QuestionsubmitByQuestionIdData = {
  path: {
    /**
     * Question ID
     */
    question_id: string;
  };
};

export type GetApiV1QuestionsubmitByQuestionIdResponse = any;

export type GetApiV1QuestionsubmitByQuestionIdError = unknown;

export type PutApiV1QuestionsubmitByQuestionIdData = {
  /**
   * Updated QuestionSubmit Information
   */
  body: models_QuestionSubmit;
  path: {
    /**
     * Question ID
     */
    question_id: string;
  };
};

export type PutApiV1QuestionsubmitByQuestionIdResponse = any;

export type PutApiV1QuestionsubmitByQuestionIdError = unknown;

export type DeleteApiV1QuestionsubmitByQuestionIdData = {
  path: {
    /**
     * Question ID
     */
    question_id: string;
  };
};

export type DeleteApiV1QuestionsubmitByQuestionIdResponse =
  models_QuestionSubmit;

export type DeleteApiV1QuestionsubmitByQuestionIdError = any;

export type GetApiV1UsersResponse = any;

export type GetApiV1UsersError = unknown;

export type GetApiV1UsersByIdData = {
  path: {
    /**
     * user ID
     */
    id: string;
  };
};

export type GetApiV1UsersByIdResponse = any;

export type GetApiV1UsersByIdError = unknown;
