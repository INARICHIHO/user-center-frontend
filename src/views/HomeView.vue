<template>
  <div class="home">
    <!-- 欢迎横幅 -->
    <div class="hero">
      <h1>{{ $t('home.welcomeTitle') }}</h1>
      <p>{{ $t('home.welcomeDesc') }}</p>
      <a-space size="middle">
        <a-button type="primary" size="large" @click="goToRegister">{{ $t('home.registerNow') }}</a-button>
        <a-button size="large" @click="goToLogin">{{ $t('home.login') }}</a-button>
      </a-space>
    </div>

    <!-- 功能卡片展示 -->
    <a-row :gutter="[24, 24]" class="features">
      <a-col :xs="24" :sm="12" :md="8">
        <a-card hoverable>
          <template #cover>
            <div class="card-icon">👤</div>
          </template>
          <a-card-meta>
            <template #title>{{ $t('home.card.userManage.title') }}</template>
            <template #description>{{ $t('home.card.userManage.desc') }}</template>
          </a-card-meta>
          <template #actions>
            <a-button type="link" @click="goToUserManage">{{ $t('home.card.userManage.action') }}</a-button>
          </template>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="8">
        <a-card hoverable>
          <template #cover>
            <div class="card-icon">🔐</div>
          </template>
          <a-card-meta>
            <template #title>{{ $t('home.card.auth.title') }}</template>
            <template #description>{{ $t('home.card.auth.desc') }}</template>
          </a-card-meta>
          <template #actions>
            <a-button type="link" @click="goToLogin">{{ $t('home.card.auth.action') }}</a-button>
          </template>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="8">
        <a-card hoverable>
          <template #cover>
            <div class="card-icon">⚙️</div>
          </template>
          <a-card-meta>
            <template #title>{{ $t('home.card.mock.title') }}</template>
            <template #description>{{ $t('home.card.mock.desc') }}</template>
          </a-card-meta>
          <template #actions>
            <a-button type="link" @click="goToUserManage">{{ $t('home.card.mock.action') }}</a-button>
          </template>
        </a-card>
      </a-col>
    </a-row>

    <!-- 已登录用户的专属提示 -->
    <div v-if="userStore.userInfo" class="welcome-user">
      <a-alert
        :message="$t('home.welcomeBack', { username: userStore.userInfo.username })"
        :description="$t('home.welcomeDescLogged')"
        type="success"
        show-icon
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

const goToRegister = () => router.push('/user/register');
const goToLogin = () => router.push('/user/login');
const goToUserManage = () => router.push('/admin/userManage');
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.hero {
  text-align: center;
  padding: 60px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 16px;
  margin-bottom: 48px;
}

.hero h1 {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-color, #333);
}

.hero p {
  font-size: 18px;
  color: var(--text-color-secondary, #666);
  margin-bottom: 32px;
}

.features {
  margin-bottom: 48px;
}

.card-icon {
  font-size: 48px;
  text-align: center;
  line-height: 120px;
  background-color: var(--card-icon-bg, #f0f2f5);
}

.welcome-user {
  margin-top: 32px;
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 16px;
  }
  .hero h1 {
    font-size: 28px;
  }
}
</style>