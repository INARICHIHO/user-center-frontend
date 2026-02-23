import myAxios from "@/request";
import type { AxiosResponse } from 'axios';   // 👈 新增导入

// ------------------------------
// 通用响应类型
// ------------------------------
interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

// ------------------------------
// 用户相关类型定义
// ------------------------------
export interface RegisterParams {
  username: string;
  password: string;
}
export interface RegisterResult {
  id: string;
}
export interface LoginParams {
  username: string;
  password: string;
}
export interface LoginResult {
  token: string;
  userInfo: UserInfo;
}
export interface UserInfo {
  id: string;
  username: string;
  avatar?: string;
}
export interface LogoutResult {
  success: boolean;
}
export interface SearchParams {
  username?: string;   // 👈 改为可选
}
export interface DeleteResult {
  success: boolean;
}

// ------------------------------
// API 函数定义（返回类型全部加上 AxiosResponse）
// ------------------------------
export const userRegister = (params: RegisterParams): Promise<AxiosResponse<ApiResponse<RegisterResult>>> => {
  return myAxios.post('/api/user/register', params);
};

export const userLogin = (params: LoginParams): Promise<AxiosResponse<ApiResponse<LoginResult>>> => {
  return myAxios.post('/api/user/login', params);
};

export const userLogout = (): Promise<AxiosResponse<ApiResponse<LogoutResult>>> => {
  return myAxios.post('/api/user/logout');
};

export const getCurrentUser = (): Promise<AxiosResponse<ApiResponse<UserInfo>>> => {
  return myAxios.get('/api/user/current');
};

export const searchUsers = (params: SearchParams): Promise<AxiosResponse<ApiResponse<UserInfo[]>>> => {
  return myAxios.get('/api/user/search', { params });
};

export const deleteUser = (id: string): Promise<AxiosResponse<ApiResponse<DeleteResult>>> => {
  return myAxios.delete(`/api/user/delete/${id}`);
};