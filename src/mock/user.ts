/* eslint-disable @typescript-eslint/no-explicit-any */
import Mock from 'mockjs';

// 模拟用户列表
// 模拟用户列表（支持搜索）
// 用正则匹配所有以 /api/user/search 开头的请求（包括带参数的）
Mock.mock(/\/api\/user\/search(\?.*)?/, 'get', (options: any) => {
  // 解析查询参数
  const url = new URL(options.url, window.location.origin);
  const username = url.searchParams.get('username');

  // 生成模拟数据（这里生成20-30条，以便分页）
  const allUsers = Mock.mock({
    'data|20-30': [{
      'id|+1': 1,
      'username': '@cname',
      'avatar': '@image("100x100")',
      'age|18-60': 1,
      'email': '@email'
    }]
  }).data;

  // 根据 username 过滤（模糊匹配）
  const filtered = username
    ? allUsers.filter((u: any) => u.username.includes(username))
    : allUsers;

  return {
    code: 0,
    message: '成功',
    data: filtered,
  };
});

// 模拟当前用户
Mock.mock('http://localhost:5173/api/user/current', 'get', {
  'code': 0,
  'message': '成功',
  'data': {
    'id': 1,
    'username': '@cname',
    'avatar': '@image("100x100")',
    'email': '@email'
  }
});

// 模拟登录（可根据参数动态返回）
Mock.mock('http://localhost:5173/api/user/login', 'post', (options: any) => {
  const body = JSON.parse(options.body);
  if (body.username && body.password) {
    return {
      code: 0,
      message: '登录成功',
      data: { token: 'mock_token_' + Date.now() }
    };
  } else {
    return {
      code: 400,
      message: '用户名或密码不能为空'
    };
  }
});

// 模拟注册（同理）
Mock.mock('http://localhost:5173/api/user/register', 'post', {
  'code': 0,
  'message': '注册成功',
  'data': { 'id|+1': 10 }
});

// 模拟删除用户（通过 URL 参数传递 ID）
Mock.mock(RegExp('http://localhost:5173/api/user/delete/\\d+'), 'delete', (options: any) => {
  const url = options.url;
  const id = url.match(/\/api\/user\/delete\/(\d+)/)?.[1];
  return {
    code: 0,
    message: `用户 ${id} 删除成功`,
    data: { success: true }
  };
});

// 模拟用户注销
Mock.mock('http://localhost:5173/api/user/logout', 'post', {
  code: 0,
  message: '注销成功',
  data: { success: true }
});