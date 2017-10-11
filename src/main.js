// 导入插件
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import axios from 'axios';
import VueLazyLoad from 'vue-lazyload';

import 'common/stylus/index.styl';

// 移动端300延迟
fastclick.attach(document.body);

// 图片懒加载
Vue.use(VueLazyLoad, {
    loading: require('common/image/default.png')
});

Vue.prototype.$ajax = axios;

// Vue实例化
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})