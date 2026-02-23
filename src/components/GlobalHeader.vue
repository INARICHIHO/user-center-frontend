<template>
  <div id="globalHeader">
    <a-row :wrap="false" align="middle" class="header-row">
      <a-col flex="200px">
        <div class="logo-title">
          <img src="@/assets/logo.svg" alt="logo" class="logo" />
          <div class="title">稻荷用户中心</div>
        </div>
      </a-col>

      <a-col flex="1">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
          class="nav-menu"
        />
      </a-col>
      <a-col flex="px">
        <div class="user-login-status">
          <!-- 如果已登录，显示用户名下拉菜单 overlay负责接收dropdown的内容 -->
          <a-dropdown v-if="userStore.userInfo" placement="bottomRight">
            <div class="user-info">
              <a-avatar :src="userStore.userInfo.avatar" style="margin-right: 8px;">
                {{ userStore.userInfo.username.charAt(0).toUpperCase() }}
              </a-avatar>
              <span>{{ userStore.userInfo.username }}</span>
            </div>
            <template #overlay> 
              <a-menu>
                <a-menu-item @click="handleLogout">退出登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <!-- 否则显示登录按钮 -->
          <a-button v-else type="primary" @click="() => router.push('/user/login')">登录</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { HomeOutlined, CrownOutlined } from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/store/user';
import { message } from 'ant-design-vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 点击菜单跳转
const doMenuClick = ({ key }: { key: string }) => {
  if (key === 'others') return; // 外部链接不跳转
  router.push({ path: key });
};

// 当前选中菜单项，根据路由初始化
const current = ref<string[]>([route.path]);

router.afterEach((to) => {
  current.value = [to.path];
});

// 菜单项配置
const items = ref<MenuProps['items']>([
  { key: '/', icon: () => h(HomeOutlined), label: '主页' },
  { key: '/user/login', label: '用户登录' },
  { key: '/user/register', label: '用户注册' },
  { key: '/admin/userManage', icon: () => h(CrownOutlined), label: '用户管理' },
  {
    key: 'others',
    label: h(
      'a',
      { href: 'https://space.bilibili.com/522470519', target: '_blank' },
      '个人主页'
    ),
  },
]);

// 退出登录
const handleLogout = async () => {
  const res = await userStore.logout();
  if (res.data?.code === 0) {
    message.success('已退出');
    router.push('/user/login');
  } else {
    message.error(res.data?.message || '退出失败');
  }
};
</script>

<style scoped>
#globalHeader {
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  margin: 0 auto; /* 如果希望整体居中 */
}

.header-row {
  width: 100%;
}

.nav-menu {
  border-bottom: none !important;
  line-height: 64px;
}

.logo-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  height: 40px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
}

.user-login-status {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>