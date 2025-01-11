<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
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
      <a-form-item>
        <a-button type="primary" style="width: 120px" html-type="submit"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { postV1AuthSignIn, PostV1AuthSignInData } from "../../client";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
/**表单信息 */
const form = reactive<PostV1AuthSignInData>({
  body: {
    user_account: "",
    password: "",
  },
});
/**提交表单 */
const handleSubmit = async () => {
  const res = await postV1AuthSignIn(form);
  //登录成功跳转到主页
  if (res.status === 200) {
    alert("登陆成功" + JSON.stringify(res.data));
    router.push({
      path: "/",
      replace: true,
    });
    store.dispatch("user/getLoginUser");
  } else {
    Message.error("登录失败," + res.error.error);
  }
  console.log(res);
  // alert(JSON.stringify(form));
};
</script>
