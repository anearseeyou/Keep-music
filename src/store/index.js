/**
 * Vuex的入口
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';  // Vuex的插件 方便在控制台查看日志

// 引用到vue
Vue.use(Vuex);

// 工具 ---> debug
const debug = process.env.NODE_ENV != 'production';

// 实例化Vuex ---> 单利模式
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,  // 线下调试的时候 Vuex会开启严格模式 检测state是不是来源于mutations 如果不是的话会报警告
    plugins: debug ? [createLogger()] : []  // plugins是一个数组 还可以有别的调试工具
})

