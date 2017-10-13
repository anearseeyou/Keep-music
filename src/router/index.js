// 导入模版
import Vue from 'vue';
import Router from 'vue-router';

const Recommend = (resolve) => {
    import('components/recommend/recommend').then((module) => {
        resolve(module)
    })
}
const Singer = (resolve) => {
    import('components/singer/singer').then((module) => {
        resolve(module)
    })
}
const Ranking = (resolve) => {
    import('components/ranking/ranking').then((module) => {
        resolve(module)
    })
}
const Search = (resolve) => {
    import('components/search/search').then((module) => {
        resolve(module)
    })
}
const SingerDetail = (resolve) => {
    import('components/singer-detail/singer-detail').then((module) => {
        resolve(module)
    })
}

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
            component: Singer,
            children: [
                {
                    path: ':id',
                    component: SingerDetail
                }
            ]
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
