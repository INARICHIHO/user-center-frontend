<template>
  <div class="user-manage">
    <a-card title="用户管理">
      <template #extra>
        <a-space>
          <a-input-search
            v-model:value="searchKeyword"
            placeholder="请输入用户名"
            @search="fetchUsers"
            style="width: 200px"
          />
          <a-button type="primary" @click="fetchUsers">刷新</a-button>
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
              title="确定要删除该用户吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="handleDelete(record.id)"
            >
              <a-button type="link" danger>删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { searchUsers, deleteUser } from '@/api/user';
import type { UserInfo } from '@/api/user';  // 假设 UserInfo 类型已定义

const searchKeyword = ref('');
const userList = ref<UserInfo[]>([]);
const loading = ref(false);

// 表格列定义
const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '操作', key: 'action' },
];

// 获取用户列表
const fetchUsers = async () => {
  loading.value = true;
  try {
    const params = searchKeyword.value ? { username: searchKeyword.value } : {};
    const res = await searchUsers(params);  // 注意：searchUsers 返回的是 axios 响应对象
    if (res.data?.code === 0) {
      userList.value = res.data.data;       // 用户列表在 res.data.data 里
    } else {
      message.error(res.data?.message || '获取用户列表失败');
    }
  } catch (error) {
    console.error('获取用户列表异常:', error);
    message.error('网络错误');
  } finally {
    loading.value = false;
  }
};

// 删除用户
const handleDelete = async (id: string) => {
  try {
    const res = await deleteUser(id);
    if (res.data?.code === 0) {
      message.success('删除成功');
      await fetchUsers();  // 刷新列表
    } else {
      message.error(res.data?.message || '删除失败');
    }
  } catch (error) {
    console.error('删除用户异常:', error);
    message.error('网络错误');
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