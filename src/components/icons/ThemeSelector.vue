<template>
  <a-dropdown
    placement="bottomCenter"
    trigger="hover"
    :overlayClassName="'compact-dropdown'"
  >
    <!-- 触发器按钮：显示当前主题名称，带主题图标 -->
    <a-button size="small" class="theme-trigger">
      <bg-colors-outlined />
      <span style="margin-left: 4px">{{ currentThemeName }}</span>
    </a-button>
    <template #overlay>
      <a-menu @click="handleThemeChange" :selectedKeys="[settingsStore.themeName]">
        <a-menu-item key="light">☀️ {{ $t('theme.light') }}</a-menu-item>
        <a-menu-item key="dark">🌙 {{ $t('theme.dark') }}</a-menu-item>
        <a-menu-item key="blue">💙 {{ $t('theme.blue') }}</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BgColorsOutlined } from '@ant-design/icons-vue'
import { useSettingsStore, type ThemeName } from '@/stores/settings'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const settingsStore = useSettingsStore()

const currentThemeName = computed(() => {
  const key = settingsStore.themeName
  return t(`theme.${key}`)
})

const handleThemeChange = ({ key }: { key: string }) => {
  settingsStore.setTheme(key as ThemeName)
}
</script>

<style scoped>
.theme-trigger {
  background: transparent !important;   /* 透明背景 */
  border: none !important;              /* 去除边框 */
  box-shadow: none !important;          /* 去除阴影 */
  color: var(--text-color) !important;  /* 文字颜色使用主题变量 */
  padding: 4px 8px;                     /* 调整内边距，使点击区域舒适 */
  transition: background-color 0.3s;
}

.theme-trigger:hover {
  background-color: rgba(0, 0, 0, 0.1) !important; /* 悬浮时半透明黑色加深 */
  /* 如果是暗色主题，可能需要调整为半透明白色 */
}

/* 如果希望图标也使用主题色，可以额外设置 */
.theme-trigger .anticon {
  color: var(--text-color) !important;
}
</style>