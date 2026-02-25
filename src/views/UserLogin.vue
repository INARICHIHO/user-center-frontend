<template>
  <!-- 最外层容器，用于样式控制和居中布局 -->
  <div class="login-container">
    <!-- 使用 Ant Design 的卡片组件作为登录框的容器，设置宽度400px，并让它在页面上居中 -->
    <a-card :title="$t('login')" style="width: 400px; margin: 100px auto;">
      <!-- 表单组件，:model 绑定表单数据对象（form），@finish 是表单提交事件，会触发 handleLogin 函数 -->
      <a-form :model="form" @finish="handleLogin">
        <!-- 表单项：用户名输入框 -->
        <a-form-item 
          name="username" 
          :rules="[{ required: true, message: $t('rules.username.required') }]"
        >
          <!-- 输入框，v-model:value 双向绑定到 form.username，placeholder 是提示文字 -->
          <a-input v-model:value="form.username" :placeholder="$t('username')" />
        </a-form-item>
        <!-- 表单项：密码输入框 -->
        <a-form-item 
          name="password" 
          :rules="[{ required: true, message: $t('rules.password.required') }]"
        >
          <!-- 密码输入框，type="password" 使输入内容隐藏，绑定到 form.password -->
          <a-input v-model:value="form.password" type="password" :placeholder="$t('password')" />
        </a-form-item>
        <!-- 表单项：登录按钮 -->
        <a-form-item>
          <a-button 
            type="primary"           
            html-type="submit"       
            :loading="userStore.loading" 
            block                    
          >
            {{ $t('login') }}
          </a-button>
        </a-form-item>
        <!-- 底部链接：跳转到注册页 -->
        <div style="text-align: center;">
          <router-link to="/user/register">{{ $t('noAccount') }}</router-link>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const router = useRouter()
const { t } = useI18n()

const form = reactive({
  username: '',
  password: '',
})

const handleLogin = async () => {
  const res = await userStore.login(form)
  if (res && res.code === 0) {
    message.success(t('loginSuccess'))
    router.push('/')
  } else {
    message.error(res?.message || t('loginFailed'))
  }
}
</script>

<style scoped>
/* 登录容器样式，让内容垂直水平居中，并铺满整个视口高度 */
.login-container {
  display: flex;          /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  min-height: 100vh;       /* 最小高度占满整个屏幕 */
  background: var(--content-bg, #f0f2f5); /* 背景色，跟随主题 */
}
</style>