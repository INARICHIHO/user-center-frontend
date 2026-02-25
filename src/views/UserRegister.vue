<template>
  <div class="register-container">
    <a-card :title="$t('register')" style="width: 400px; margin: 100px auto;">
      <a-form :model="form" @finish="handleRegister">
        <a-form-item
          name="username"
          :rules="[{ required: true, message: $t('rules.username.required') }]"
        >
          <a-input v-model:value="form.username" :placeholder="$t('username')" />
        </a-form-item>
        <a-form-item
          name="password"
          :rules="[{ required: true, message: $t('rules.password.required') }]"
        >
          <a-input v-model:value="form.password" type="password" :placeholder="$t('password')" />
        </a-form-item>
        <a-form-item
          name="confirmPassword"
          :rules="[
            { required: true, message: $t('rules.confirmPassword.required') },
            {
              validator: (rule: Rule, value: any, callback: (error?: string) => void) => {
                if (value !== form.password) {
                  callback($t('rules.confirmPassword.mismatch'));
                } else {
                  callback();
                }
              }
            },
          ]"
        >
          <a-input
            v-model:value="form.confirmPassword"
            type="password"
            :placeholder="$t('confirmPassword')"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loading" block>
            {{ $t('register') }}
          </a-button>
        </a-form-item>
        <div style="text-align: center;">
          <router-link to="/user/login">{{ $t('haveAccount') }}</router-link>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { userRegister } from '@/api/user';
import type { Rule } from 'ant-design-vue/es/form';

const router = useRouter();
const loading = ref(false);
const { t } = useI18n();

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
    if (res.data?.code === 0) {
      message.success(t('registerSuccess'));
      router.push('/user/login');
    } else {
      message.error(res.data?.message || t('registerFailed'));
    }
  } catch (error) {
    console.error('注册异常:', error);
    message.error(t('networkError'));
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
  background: var(--content-bg, #f0f2f5);
}
</style>