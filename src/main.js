import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'cherry-markdown/dist/cherry-markdown.css';
import V3Emoji from 'vue3-emoji';
import 'vue3-emoji/dist/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.use(V3Emoji);

app.mount('#app');
