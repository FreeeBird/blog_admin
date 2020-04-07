import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const routeMap = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: { title: '自述文件' },
        children: [
            {
                path: '/dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                meta: { title: '系统首页' }
            },
            {
                path: '/editor',
                component: () => import(/* webpackChunkName: "editor" */ '../components/page/article/ArticleEditor'),
                meta: { title: '发表文章', keepAlive: true}
            },
            {
                path: '/article/:id',
                component: () => import(/* webpackChunkName: "editor" */ '../components/page/draft/EditArticle'),
                meta: { title: '编辑文章', keepAlive: false}
            },
            {
                path: '/article',
                component: () => import(/* webpackChunkName: "articles" */ '../components/page/article/PublicArticle'),
                meta: { title: '文章管理' , keepAlive: false}
            },
            {
                path: '/draft',
                component: () => import(/* webpackChunkName: "articles" */ '../components/page/draft/Draft'),
                meta: { title: '草稿箱' , keepAlive: false}
            },
            {
                path: '/category',
                component: () => import('../components/page/category/Categories'),
                meta: { title: '分类管理'}
            },
            {
                path: '/comment',
                component: () => import('../components/page/comment/Comment'),
                meta: { title: '评论管理'}
            },
            {
                path: '/message',
                component: () => import('../components/page/message/Message'),
                meta: { title: '留言管理'}
            },
            {
                path: '/link',
                component: () => import('../components/page/link/Link'),
                meta: { title: '链接管理'}
            },
            {
                path: '/blogInfo',
                component: () => import('../components/page/blogInfo/BlogInfo'),
                meta: { title: '博客信息'}
            },
            {
                path: '/blogger',
                component: () => import('../components/page/blogger/Blogger'),
                meta: { title: '博主信息'}
            },
            {
                path: '/icon',
                component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                meta: { title: '自定义图标' }
            },
            {
                // 图片上传组件
                path: '/upload',
                component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                meta: { title: '文件上传' }
            },
            {
                // vue-schart组件
                path: '/charts',
                component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                meta: { title: 'schart图表' }
            },
            {
                path: '/404',
                component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: { title: '404' }
            },
            {
                path: '/403',
                component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                meta: { title: '403' }
            },
        ]
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
        meta: { title: '登录' }
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const router =  new Router({
    mode: 'history',
    routes: routeMap
});
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 博客管理系统`;
    const role = sessionStorage.getItem('username');
    if (!role && to.path !== '/login') {
        Vue.prototype.$message.warning('请先登录')
        next('/login');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

export default router
