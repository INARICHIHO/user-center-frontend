<template>
  <div class="home">
    <!-- 欢迎横幅 -->
    <div class="hero">
      <h1>欢迎来到稻荷用户中心</h1>
      <p>一个基于 Vue 3 + Ant Design 的用户管理系统示例项目</p>
      <a-space size="middle">
        <a-button type="primary" size="large" @click="goToRegister">立即注册</a-button>
        <a-button size="large" @click="goToLogin">登录</a-button>
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
            <template #title>用户管理</template>
            <template #description>查看、搜索、管理所有用户信息，支持分页和关键字搜索。</template>
          </a-card-meta>
          <template #actions>
            <a-button type="link" @click="goToUserManage">前往管理</a-button>
          </template>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="8">
        <a-card hoverable>
          <template #cover>
            <div class="card-icon">🔐</div>
          </template>
          <a-card-meta>
            <template #title>安全认证</template>
            <template #description>基于 JWT 的登录/注册，状态持久化，路由守卫保护。</template>
          </a-card-meta>
          <template #actions>
            <a-button type="link" @click="goToLogin">去登录</a-button>
          </template>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="8">
        <a-card hoverable>
          <template #cover>
            <div class="card-icon">⚙️</div>
          </template>
          <a-card-meta>
            <template #title>Mock 数据</template>
            <template #description>使用 Mock.js 模拟后端 API，开发时无需等待真实接口。</template>
          </a-card-meta>
          <template #actions>
            <a-button type="link" @click="goToUserManage">查看示例</a-button>
          </template>
        </a-card>
      </a-col>
    </a-row>

    <!-- 已登录用户的专属提示 -->
    <div v-if="userStore.userInfo" class="welcome-user">
      <a-alert
        :message="`欢迎回来，${userStore.userInfo.username}！`"
        description="您已成功登录，可以访问所有功能。"
        type="success"
        show-icon
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const router = useRouter();
const userStore = useUserStore();

// 导航函数
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
  color: #333;
}

.hero p {
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
}

.features {
  margin-bottom: 48px;
}

.card-icon {
  font-size: 48px;
  text-align: center;
  line-height: 120px;
  background-color: #f0f2f5;
}

.welcome-user {
  margin-top: 32px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hero {
    padding: 40px 16px;
  }
  .hero h1 {
    font-size: 28px;
  }
}
</style>