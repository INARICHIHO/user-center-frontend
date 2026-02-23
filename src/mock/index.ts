// 统一引入所有 mock 模块
import Mock from 'mockjs';
import './user';
// 如果有其他 mock，也在这里引入
// import './article';
// import './comment';

// 可以在这里配置 Mock 的全局设置
Mock.setup({
  timeout: '200-600' // 模拟延迟 200~600ms
});