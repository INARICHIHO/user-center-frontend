/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/user.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  LoginParams,
  RegisterParams,
  UserInfo,
  LoginResult,
  RegisterResult,
} from '@/api/user'  // 从user.ts导入类型

// 导入 API 函数
import {
  userLogin as apiLogin,
  userRegister as apiRegister,
  userLogout as apiLogout,
  getCurrentUser as apiGetCurrentUser,
} from '@/api/user'

export const useUserStore = defineStore('user', () => {
  // ---------- state ----------
  // 当前登录用户的信息，未登录时为 null
  const userInfo = ref<UserInfo | null>(null)

  // 登录后可能返回 token，如果有则存储
  const token = ref<string | null>(null)

  // 通用的加载状态，用于按钮防抖等
  const loading = ref<boolean>(false)

  // ---------- actions ----------
  /**
   * 登录
   * @param params 用户名和密码
   * @returns 登录结果
   */
async function login(params: LoginParams) {
  loading.value = true;
  try {
    const res: any = await apiLogin(params);
    console.log('登录响应完整结构：', res);

    // 检查数据路径（根据你的拦截器，数据在 res.data 里）
    if (res.data?.code === 0) {
      const newToken = res.data.data.token;
      token.value = newToken;               // ✅ 直接赋值
      localStorage.setItem('token', newToken);
      
      await fetchCurrentUser();              // 获取用户信息
      return { code: 0, message: '登录成功' };
    } else {
      return { code: -1, message: res.data?.message || '登录失败' };
    }
  } catch (error) {
    console.error('登录异常:', error);
    return { code: -2, message: '网络错误' };
  } finally {
    loading.value = false;
  }
}
  /**
   * 注册
   * @param params 用户名和密码
   * @returns 注册结果
   */
  async function register(params: RegisterParams) {
    loading.value = true
    try {
      const res = await apiRegister(params) // 调用api里的登录函数
      // 假设 code 0 表示成功
      if (res.data.code === 0) {
        // 注册成功后，可以自动登录或跳转登录页
        console.log('注册成功，用户ID:', (res.data.data as RegisterResult).id)
      } else {
        console.error('注册失败:', res.data.message)
      }
      return res
    } finally {
      loading.value = false
    }
  }

  /**
   * 注销
   */
async function logout() {
  loading.value = true;
  try {
    const res: any = await apiLogout();
    console.log('注销响应：', res);

    // 关键：数据在 res.data 里
    if (res.data?.code === 0) {
      token.value = null;
      userInfo.value = null;
      localStorage.removeItem('token');
      console.log('注销成功');
    } else {
      console.error('注销失败:', res.data?.message || '未知错误');
    }
    return res;
  } catch (error) {
    console.error('注销异常:', error);
  } finally {
    loading.value = false;
  }
}

  /**
   * 获取当前用户信息（通常用于初始化或刷新用户信息）
   */
async function fetchCurrentUser() {
  if (!token.value) {
    console.log('无 token，跳过获取用户信息');
    return;
  }
  loading.value = true;
  try {
    const res: any = await apiGetCurrentUser();
    console.log('获取用户信息响应：', res);
    if (res.data?.code === 0) {
      userInfo.value = res.data.data;   // ✅ 正确路径
    } else {
      console.error('获取用户信息失败:', res.data?.message);
    }
  } catch (error) {
    console.error('获取用户信息异常:', error);
  } finally {
    loading.value = false;
  }
}

  /**
   * 初始化 store：从 localStorage 恢复 token，并获取用户信息
   * 建议在应用启动时调用（例如 App.vue 的 onMounted）
   */
async function init() {
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    token.value = savedToken;      // 注意用 .value
    await fetchCurrentUser();
  } else {
    userInfo.value = null;
  }
}

  // 可以定义 getters（如果需要）
  const isLoggedIn = () => !!token.value

  return {
    // state
    userInfo,
    token,
    loading,
    // actions
    login,
    register,
    logout,
    fetchCurrentUser,
    init,
    // getters
    isLoggedIn,
  }
})