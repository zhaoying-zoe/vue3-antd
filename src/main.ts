import './assets/main.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { message } from 'ant-design-vue';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 应用级的错误处理器,用来收集子组件上的错误
app.config.errorHandler = (err, vm, info) => {
    console.error('err', err)
    console.error('vm', vm)
    console.error('info', info)
}

app.use(createPinia())
app.use(router)
app.use(Antd) // 使用 antd 组件

console.error('message', message);

// antd 的 $message 挂载到全局供子组件使用
app.config.globalProperties.gloMessage = 'message12345';
app.config.globalProperties.$message = message;

app.mount('#app')
