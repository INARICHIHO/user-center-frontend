<template>
  <div class="register-container">
    <a-card title="注册" style="width: 400px; margin: 100px auto;">
      <a-form :model="form" @finish="handleRegister">
        <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名' }]">
          <a-input v-model:value="form.username" placeholder="用户名" />
        </a-form-item>
        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input v-model:value="form.password" type="password" placeholder="密码" />
        </a-form-item>
        <a-form-item name="confirmPassword" :rules="[
          { required: true, message: '请确认密码' },
          {
            validator: (rule: Rule, value: any, callback: (error?: string) => void) => {
              if (value !== form.password) {
                callback('两次输入的密码不一致');
              } else {
                callback();
              }
            }
          },
        ]">
          <a-input v-model:value="form.confirmPassword" type="password" placeholder="确认密码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loading" block>
            注册
          </a-button>
        </a-form-item>
        <div style="text-align: center;">
          <router-link to="/user/login">已有账号？去登录</router-link>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { userRegister } from '@/api/user';  // 从 api 导入注册函数
import type { Rule } from 'ant-design-vue/es/form';  // 或从 'ant-design-vue' 导入

const router = useRouter();
const loading = ref(false);

const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
});

const handleRegister = async () => {
  loading.value = true;
  try {
    const res = await userRegister({
      username: form.username,
      password: form.password,
    });
    // 注意：因为响应拦截器未统一返回 data，所以 res 是 axios 响应对象，数据在 res.data 里
    if (res.data?.code === 0) {
      message.success('注册成功，请登录');
      router.push('/user/login');
    } else {
      message.error(res.data?.message || '注册失败');
    }
  } catch (error) {
    console.error('注册异常:', error);
    message.error('网络错误');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
}
</style>