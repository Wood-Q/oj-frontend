<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户注册</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      :style="{}"
      @submit="handleSubmit"
    >
      <a-form-item field="user_account" label="账号">
        <a-input v-model="form.body.user_account" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="password" tooltip="密码不少于八位" label="密码">
        <a-input-password
          v-model="form.body.password"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        field="confirm_password"
        tooltip="请确认密码"
        label="确认密码"
      >
        <a-input-password
          v-model="form.body.confirm_password"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item field="username" label="昵称">
        <a-input v-model="form.body.user_name" placeholder="请输入昵称" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" style="width: 120px" html-type="submit">
          注册
        </a-button>
        <a-form-item>
          <a-button
            style="width: 120px; margin-top: 10px; margin-left: 90px"
            @click="goLogin"
            type="text"
          >
            登录账户
          </a-button>
        </a-form-item>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { postApiV1AuthSignUp, PostApiV1AuthSignUpData } from "../../client";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
/**表单信息 */
const form = reactive<PostApiV1AuthSignUpData>({
  body: {
    user_account: "",
    password: "",
    confirm_password: "", // 确认密码字段
    user_role: "user",
    user_name: "",
  },
});
/**提交表单 */
const handleSubmit = async () => {
  // 校验密码和确认密码是否一致
  if (form.body.password !== form.body.confirm_password) {
    Message.error("密码和确认密码不一致");
    return;
  }

  const res = await postApiV1AuthSignUp(form);
  //注册成功跳转到登录页面
  if (res.status === 200) {
    alert("注册成功" + JSON.stringify(res.data));
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    Message.error("注册失败");
  }
  console.log(res);
};

const goLogin = () => {
  router.push("/user/login");
};
</script>
