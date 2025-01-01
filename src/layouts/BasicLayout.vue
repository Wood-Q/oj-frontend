<template>
  <div id="basic-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content"> <router-view /></a-layout-content>
      <a-layout-footer class="footer"
        ><a href="http://shannna.online" target="_blank"
          >Wood Q
        </a></a-layout-footer
      >
    </a-layout>
  </div>
</template>

<style scoped>
#basic-layout {
}
#basic-layout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}
#basic-layout .content {
  background: linear-gradient(to right, #e4e0f7, #fff);
  margin-bottom: 16px;
  padding: 20px;
}
#basic-layout .footer {
  text-align: center;
  background: #efefef;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
