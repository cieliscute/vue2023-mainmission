// import './assets/main.css'
import './assets/all.scss';
import * as bootstrap from 'bootstrap';
import 'vue-loading-overlay/dist/css/index.css';

import axios from 'axios';
import VueAxios from 'vue-axios';
import FullScreenLoading from 'vue-loading-overlay';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';

import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: false, // 當輸入任何內容直接進行驗證
});
setLocale('zh_TW');

const app = createApp(App);

app.config.globalProperties.$bs = bootstrap;
app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.component('FullScreenLoading', FullScreenLoading);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
