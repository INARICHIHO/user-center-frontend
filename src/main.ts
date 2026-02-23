import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import * as Icons from '@ant-design/icons-vue'
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
const pinia = createPinia()

Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})

async function bootstrap() {
  if (import.meta.env.DEV) {
    await import('./mock');  // ✅ 现在在 async 函数内部，合法
    console.log('✅ Mock 加载完成');
  }

  app.use(router);
  app.use(Antd);
  app.use(pinia);
  app.mount('#app');
}

bootstrap();