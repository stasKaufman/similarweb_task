import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import store from './store/index';
import 'element-plus/dist/index.css';
const app = createApp(App)

app.use(ElementPlus)
app.use(store);
app.mount('#app')
