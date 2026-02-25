<template>
  <div class="user-manage">
    <a-card :title="$t('userManage')">
      <template #extra>
        <a-space>
          <a-input-search
            v-model:value="searchKeyword"
            :placeholder="$t('searchPlaceholder')"
            @search="fetchUsers"
            style="width: 200px"
          />
          <a-button type="primary" @click="fetchUsers">{{ $t('refresh') }}</a-button>
        </a-space>
      </template>

      <a-table
        :dataSource="userList"
        :columns="columns"
        :loading="loading"
        rowKey="id"
        :pagination="{ pageSize: 10 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-popconfirm
              :title="$t('deleteConfirm')"
              :ok-text="$t('okText')"
              :cancel-text="$t('cancelText')"
              @confirm="handleDelete(record.id)"
            >
              <a-button type="link" danger>{{ $t('delete') }}</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import { searchUsers, deleteUser } from '@/api/user';
import type { UserInfo } from '@/api/user';

const { t } = useI18n();

const searchKeyword = ref('');
const userList = ref<UserInfo[]>([]);
const loading = ref(false);

// 表格列定义（使用翻译函数）
const columns = computed(() => [
  { title: t('id'), dataIndex: 'id', key: 'id' },
  { title: t('username'), dataIndex: 'username', key: 'username' },
  { title: t('email'), dataIndex: 'email', key: 'email' },
  { title: t('action'), key: 'action' },
]);

// 获取用户列表
const fetchUsers = async () => {
  loading.value = true;
  try {
    const params = searchKeyword.value ? { username: searchKeyword.value } : {};
    const res = await searchUsers(params);
    if (res.data?.code === 0) {
      userList.value = res.data.data;
    } else {
      message.error(res.data?.message || t('fetchUsersFailed'));
    }
  } catch (error) {
    console.error('获取用户列表异常:', error);
    message.error(t('networkError'));
  } finally {
    loading.value = false;
  }
};

// 删除用户
const handleDelete = async (id: string) => {
  try {
    const res = await deleteUser(id);
    if (res.data?.code === 0) {
      message.success(t('deleteSuccess'));
      await fetchUsers();
    } else {
      message.error(res.data?.message || t('deleteFailed'));
    }
  } catch (error) {
    console.error('删除用户异常:', error);
    message.error(t('networkError'));
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.user-manage {
  padding: 24px;
}
</style>