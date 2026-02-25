<template>
  <a-dropdown
    placement="bottomCenter"
    trigger="hover"
    :overlayClassName="'compact-dropdown'"
  >
    <!-- 按钮显示当前语言名称（固定文字） -->
    <a-button size="small" class="lang-trigger">
      <global-outlined />
      <span style="margin-left: 4px">{{ currentLangName }}</span>
    </a-button>
    <template #overlay>
      <a-menu @click="handleLangChange" :selectedKeys="[settingsStore.language]">
        <!-- 下拉菜单选项使用固定文字（不依赖翻译） -->
        <a-menu-item key="zh">中文</a-menu-item>
        <a-menu-item key="en">English</a-menu-item>
        <a-menu-item key="ja">日本語</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GlobalOutlined } from '@ant-design/icons-vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

// 固定映射：当前语言对应的显示文字
const langNameMap: Record<string, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
}

const currentLangName = computed(() => langNameMap[settingsStore.language])

const handleLangChange = ({ key }: { key: string }) => {
  settingsStore.setLanguage(key as 'zh' | 'en' | 'ja')
}
</script>

<style scoped>
.lang-trigger {
  background: transparent !important;   /* 透明背景 */
  border: none !important;              /* 去除边框 */
  box-shadow: none !important;          /* 去除阴影 */
  color: var(--text-color) !important;  /* 文字颜色使用主题变量 */
  padding: 4px 8px;                     /* 调整内边距，使点击区域舒适 */
  transition: background-color 0.3s;
}

.lang-trigger:hover {
  background-color: rgba(0, 0, 0, 0.1) !important; /* 悬浮时半透明黑色加深 */
  /* 如果是暗色主题，可能需要调整为半透明白色 */
}

/* 如果希望图标也使用主题色，可以额外设置 */
.lang-trigger .anticon {
  color: var(--text-color) !important;
}
</style>