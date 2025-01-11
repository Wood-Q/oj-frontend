<template>
  <div id="user-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/image.png" alt="" class="logo" />
          <div>WoodQ OJ</div>
        </a-space>
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
#user-layout {
  text-align: center;
}
#user-layout .header {
  margin-top: 16px;
  margin-bottom: 16px;
}
#user-layout .content {
  /* background: linear-gradient(to right, #e4e0f7, #fff); */
  margin-bottom: 16px;
  /* padding: 20px; */
}
#user-layout .logo {
  width: 64px;
  height: 64px;
}
#user-layout .footer {
  text-align: center;
  background: #efefef;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

<script setup lang="ts"></script>
