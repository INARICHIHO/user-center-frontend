<template>
  <!-- 最外层容器，用于样式控制和居中布局 -->
  <div class="login-container">
    <!-- 使用 Ant Design 的卡片组件作为登录框的容器，设置宽度400px，并让它在页面上居中 -->
    <a-card title="登录" style="width: 400px; margin: 100px auto;">
      <!-- 表单组件，:model 绑定表单数据对象（form），@finish 是表单提交事件，会触发 handleLogin 函数 -->
      <a-form :model="form" @finish="handleLogin">
        <!-- 表单项：用户名输入框 -->
        <a-form-item 
          name="username" 
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <!-- 输入框，v-model:value 双向绑定到 form.username，placeholder 是提示文字 -->
          <a-input v-model:value="form.username" placeholder="用户名" />
        </a-form-item>
        <!-- 表单项：密码输入框 -->
        <a-form-item 
          name="password" 
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <!-- 密码输入框，type="password" 使输入内容隐藏，绑定到 form.password -->
          <a-input v-model:value="form.password" type="password" placeholder="密码" />
        </a-form-item>
        <!-- 表单项：登录按钮 -->
        <a-form-item>
          <a-button 
            type="primary"           
            html-type="submit"       
            :loading="userStore.loading" 
            block                    
          >
            登录
          </a-button>
        </a-form-item>
        <!-- 底部链接：跳转到注册页 -->
        <div style="text-align: center;">
          <router-link to="/user/register">还没有账号？立即注册</router-link>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
// 导入 Vue 的响应式 API，用于创建响应式对象
import { reactive } from 'vue'
// 导入我们之前定义的 user store，用于获取用户状态和登录方法
import { useUserStore } from '@/store/user'
// 导入 Ant Design 的消息提示组件，用于显示成功或失败弹窗
import { message } from 'ant-design-vue'
// 导入 Vue Router 的路由实例，用于页面跳转
import { useRouter } from 'vue-router'

// 创建 store 实例，之后可以通过 userStore 访问 state 和 actions
const userStore = useUserStore()
// 创建路由实例，用于编程式导航
const router = useRouter()

// 使用 reactive 创建一个响应式对象，用于存放表单数据
// 对象中的字段名要与表单项的 name 属性对应
const form = reactive({
  username: '',
  password: '',
})

// 定义登录处理函数（异步，因为要等待网络请求）
const handleLogin = async () => {
  // 调用 store 中的 login 方法，传入表单数据，并等待结果
  const res = await userStore.login(form)
  // 根据后端返回的 code 判断登录是否成功（假设 0 表示成功）
  if (res && res.code === 0) {
    // 登录成功：显示成功提示，并跳转到首页
    message.success('登录成功')
    router.push('/')
  } else {
    // 登录失败：显示错误提示（如果后端有返回 message 就使用它，否则显示默认文本）
    message.error(res.message || '登录失败')
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
  background: #f0f2f5;     /* 背景色 */
}
</style>