// 导入模版
import Vue from 'vue';
import Router from 'vue-router';
import Ranking from 'components/ranking/ranking';
import Recommend from 'components/recommend/recommend';
import Search from 'components/search/search';
import Singer from 'components/singer/singer';

// 初始化路由
Vue.use(Router);

// 配置路由
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            component: Recommend
        },
        {
            path: '/singer',
            component: Singer
        },
        {
            path: '/ranking',
            component: Ranking
        },
        {
            path: '/search',
            component: Search
        },
    ]
})
