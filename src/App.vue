<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import { useRoute } from "vue-router";
import BasicLayout from "./layouts/BasicLayout.vue";

import { onMounted } from "vue";
const doInit = () => {
  console.log("hello欢迎来到我的项目");
};
const route = useRoute();

onMounted(() => {
  doInit();
});
</script>
