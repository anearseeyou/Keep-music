// 导入文件
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import axios from 'axios'
import 'common/stylus/index.styl';

// 移动端300延迟
fastclick.attach(document.body);

Vue.prototype.$ajax = axios;

// Vue实例化
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})