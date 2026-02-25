<script setup lang="ts">
import { getCurrentUser } from '@/api/user';
import GlobalHeader from '@/components/GlobalHeader.vue';

getCurrentUser().then(res=>{
console.log(res)
});
</script>

<template>
  <div id="basicLayout">
    <a-layout class="main-layout">
      <a-layout-header class="header">
        <global-header />
      </a-layout-header>
      
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      
      <a-layout-footer class="footer">
        <a href="https://space.bilibili.com/522470519">稻荷千穗</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
/* 1. 确保整个布局至少占满一屏高度 */
#basicLayout {
  min-height: 100vh;
}

.main-layout {
  min-height: 100vh;
}

.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background: var(--header-bg, #ffffff);
  color: var(--text-color, #000000);
  
  /* 1. 粘性定位基础 */
  position: sticky;
  top: 0;
  z-index: 100;
  
  /* 2. 强制赋予“大舞台”宽度（这是 sticky 居中的关键） */
  width: 100%; 
  
  /* 3. 开启 Flex 居中 */
  display: flex;
  justify-content: center; 
  align-items: center;
  
  /* 清除 Ant Design 可能自带的左右 padding 干扰 */
  padding: 0; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* 加个阴影更好看 */
}

.content {
  max-width: 1200px;  /* 和导航栏保持一致 */
  margin: 0 auto 28px auto; /* 左右 auto 即可居中 */
  width: 100%;
  padding: 16px;
  background: none; /* 如果背景色想通铺，背景色要写在父级 */
}

.footer {
  background: var(--footer-bg, #ffffff);
  color: var(--text-color, #000000);
  text-align: center;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
}
</style>
