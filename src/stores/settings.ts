// src/stores/settings.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export type ThemeName = 'light' | 'dark' | 'blue' // 你可以自由添加

export const useSettingsStore = defineStore('settings', () => {
  const { locale } = useI18n()

  const language = ref<'zh' | 'en' | 'ja'>(
    (localStorage.getItem('language') as 'zh' | 'en' | 'ja') || 'zh'
  )
  const themeName = ref<ThemeName>(
    (localStorage.getItem('themeName') as ThemeName) || 'light'
  )

  watch(language, (newVal) => {
    locale.value = newVal
    localStorage.setItem('language', newVal)
  }, { immediate: true })

  watch(themeName, (newVal) => {
    localStorage.setItem('themeName', newVal)
    // 这里可以触发主题变更后的其他操作（如更新 CSS 变量）
  }, { immediate: true })

  function setLanguage(lang: 'zh' | 'en' | 'ja') {
    language.value = lang
  }

  function setTheme(name: ThemeName) {
    themeName.value = name
  }

  return { language, themeName, setLanguage, setTheme }
})