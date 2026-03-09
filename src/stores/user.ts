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
} from '@/api/user'

import {
  userLogin as apiLogin,
  userRegister as apiRegister,
  userLogout as apiLogout,
  getCurrentUser as apiGetCurrentUser,
} from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const token = ref<string | null>(null)
  const loading = ref<boolean>(false)

  async function login(params: LoginParams) {
    loading.value = true
    try {
      const res = await apiLogin(params)
      if (res.data?.code === 0) {
        const { token: newToken, userInfo: user } = res.data.data
        localStorage.setItem('token', newToken)
        token.value = newToken
        userInfo.value = user
        return { code: 0, message: '登录成功' }
      } else {
        return { code: -1, message: res.data?.message || '登录失败' }
      }
    } finally {
      loading.value = false
    }
  }

  async function register(params: RegisterParams) {
    loading.value = true
    try {
      const res = await apiRegister(params)
      if (res.data?.code === 0) {
        console.log('注册成功，用户ID:', (res.data.data as RegisterResult).id)
      } else {
        console.error('注册失败:', res.data?.message)
      }
      return res
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    try {
      const res: any = await apiLogout()
      if (res.data?.code === 0) {
        token.value = null
        userInfo.value = null
        localStorage.removeItem('token')
        console.log('注销成功')
      } else {
        console.error('注销失败:', res.data?.message || '未知错误')
      }
      return res
    } catch (error) {
      console.error('注销异常:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchCurrentUser() {
    if (!token.value) {
      console.log('无 token，跳过获取用户信息')
      userInfo.value = null
      return
    }
    loading.value = true
    try {
      const res = await apiGetCurrentUser()
      console.log('获取用户信息响应：', res)
      if (res.data?.code === 0) {
        userInfo.value = res.data.data
      } else if (res.data?.code === 40100) {
        token.value = null
        userInfo.value = null
        localStorage.removeItem('token')
      } else {
        console.error('获取用户信息失败:', res.data?.message)
      }
      return res
    } catch (error) {
      console.error('获取用户信息异常:', error)
    } finally {
      loading.value = false
    }
  }

  async function init() {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
      await fetchCurrentUser()
    } else {
      userInfo.value = null
    }
  }

  const isLoggedIn = () => !!token.value

  return {
    userInfo,
    token,
    loading,
    login,
    register,
    logout,
    fetchCurrentUser,
    init,
    isLoggedIn,
  }
})