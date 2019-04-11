import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/Full'
import Fullone from '@/containers/Fullone'
import Fulltwo from '@/containers/Fulltwo'

//import Buttons from '@/views/components/Buttons'

// Views - Pages
import Page404 from '@/views/errorPages/Page404'
import Page500 from '@/views/errorPages/Page500'


/* login */
const Login = _import('login/Login');
const Regist = _import('login/Regist');
const Forgetword = _import('login/Forgetword');
Vue.use(Router);

export const constantRouterMap = [
    {path: '/login', component: Login, hidden: true},
    {path: '/regist', component: Regist},
    {path: '/forgetword', component: Forgetword},
    {
        path: '/pages', redirect: '/pages/p404', name: 'Pages',
        component: {
            render(c) {
                return c('router-view')
            }
            // Full,
        },
        children: [
            {path: '404', name: 'Page404', component: _import('errorPages/Page404')},
            {path: '500', name: 'Page500', component: _import('errorPages/Page404')},
        ]
    }


]

export default new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});

export const asyncRouterMap = [
    {
        path: '/',
        redirect: '/home',
        name: 'Home',
        component: Full,
        hidden: false,
        children: [
            {path: '/home',name: 'Home主页',icon:"md-home",component: _import('pages/Home')},
            {
                path: '/index',name: '首页',icon:"md-outlet",redirect: '/index/Index1',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                     {
                        path: 'index1',name: '首页1',icon: 'ios-funnel',redirect: '/index/index1/Index1_1',
                        component: {
                            render(c) {
                                return c('router-view')
                            }
                        },
                        children: [
                            {
                                path: 'index1_1',
                                name: '首页1-1',
                                icon: 'ios-aperture',
                                component: _import('pages/pagesmenu/index1/Index1_1'),
                                hidden: false,
                            },
                            {
                                path: 'index1_2',
                                name: '首页1-2',
                                icon: 'md-appstore',
                                component: _import('pages/pagesmenu/index1/Index1_2'),
                                hidden: false,
                            },
                            {
                                path: 'index1_3',
                                name: '首页1-3',
                                icon: 'ios-at',
                                component: _import('pages/pagesmenu/index1/Index1_3'),
                                hidden: false,
                            }
                        ]
                    },{
                        path: 'index2',
                        name: '首页2',
                        icon: 'ios-bookmark',
                        component: _import('pages/pagesmenu/Index2'),
                        hidden: false,
                    },
                    {
                        path: 'index3',name: '首页3',icon: 'ios-funnel',redirect: '/index/index1/Index3_1',
                        component: {
                            render(c) {
                                return c('router-view')
                            }
                        },
                        children: [
                            {
                                path: 'index3_1',
                                name: '首页3-1',
                                icon: 'ios-aperture',
                                component: _import('pages/pagesmenu/index3/Index3_1'),
                                hidden: false,
                            },
                            {
                                path: 'index3_2',
                                name: '首页1-2',
                                icon: 'md-appstore',
                                component: _import('pages/pagesmenu/index3/Index3_2'),
                                hidden: false,
                            }
                        ]
                    }
                ]
            },{
                path: '/list',name: '列表页',icon:"ios-cloud",redirect: '/list/List1',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'list1',name: '列表页1',icon: 'ios-albums',redirect: '/list/list1/List1_1',
                        component: {
                            render(c) {
                                return c('router-view')
                            }
                        },
                        children: [
                            {
                                path: 'list1_1',
                                name: '列表页1-1',
                                icon: 'ios-aperture',
                                component: _import('pages/pagesmenu/list1/List1_1'),
                                hidden: false,
                            },
                            {
                                path: 'list1_2',
                                name: '列表页1-2',
                                icon: 'ios-aperture',
                                component: _import('pages/pagesmenu/list1/List1_2'),
                                hidden: false,
                            },{
                                path: 'list1_3',
                                name: '列表页1-3',
                                icon: 'ios-aperture',
                                component: _import('pages/pagesmenu/list1/List1_3'),
                                hidden: false,
                            },{
                                path: 'list1_4',
                                name: '列表页1-4',
                                icon: 'ios-aperture',
                                component: _import('pages/pagesmenu/list1/List1_4'),
                                hidden: false,
                            },
                        ]
                    },{
                        path: 'list2',
                        name: '列表页2',
                        icon: 'md-map',
                        component: _import('pages/pagesmenu/List2'),
                        hidden: false,
                    },{
                        path: 'list3',
                        name: '列表页3',
                        icon: 'md-albums',
                        component: _import('pages/pagesmenu/List3'),
                        hidden: false,
                    },
                ]
            },{
                path: '/detail',name: '详情页',icon:"md-analytics",redirect: '/detail/Detail1',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'detail1',
                        name: '详情页1',
                        icon: 'ios-arrow-dropdown-circle',
                        component: _import('pages/pagesmenu/Detail1'),
                        hidden: false,
                    },{
                        path: 'detail2',
                        name: '详情页2',
                        icon: 'ios-arrow-dropup-circle',
                        component: _import('pages/pagesmenu/Detail2'),
                        hidden: false,
                    },{
                        path: 'detail3',
                        name: '详情页3',
                        icon: 'ios-arrow-dropleft-circle',
                        component: _import('pages/pagesmenu/Detail3'),
                        hidden: false,
                    },{
                        path: 'detail4',
                        name: '详情页4',
                        icon: 'ios-arrow-dropright-circle',
                        component: _import('pages/pagesmenu/Detail4'),
                        hidden: false,
                    },
                ]
            },{
                path: '/table',name: '图标页',icon:"ios-barcode",redirect: '/table/Table1',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'table1',
                        name: '图标页1',
                        icon: 'ios-flag',
                        component: _import('pages/pagesmenu/Table1'),
                        hidden: false,
                    },{
                        path: 'table2',
                        name: '图标页2',
                        icon: 'ios-alert',
                        component: _import('pages/pagesmenu/Table2'),
                        hidden: false,
                    },{
                        path: 'table3',
                        name: '图标页3',
                        icon: 'md-baseball',
                        component: _import('pages/pagesmenu/Table3'),
                        hidden: false,
                    },
                ]
            },{
                path: '/picture',name: '图片页',icon:"md-bookmarks",redirect: '/picture/Picture1',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'picture1',
                        name: '图片页1',
                        icon: 'ios-man',
                        component: _import('pages/pagesmenu/Picture1'),
                        hidden: false,
                    },{
                        path: 'picture2',
                        name: '图片页2',
                        icon: 'ios-woman',
                        component: _import('pages/pagesmenu/Picture2'),
                        hidden: false,
                    },{
                        path: 'picture3',
                        name: '图片页3',
                        icon: 'ios-female',
                        component: _import('pages/pagesmenu/Picture3'),
                        hidden: false,
                    },
                ]
            },{
                path: '/article',name: '文章页',icon:"ios-cafe",redirect: '/article/Article1',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'article1',
                        name: '文章页1',
                        icon: 'ios-person',
                        component: _import('pages/pagesmenu/Article1'),
                        hidden: false,
                    },{
                        path: 'article2',
                        name: '文章页2',
                        icon: 'ios-pizza',
                        component: _import('pages/pagesmenu/Article2'),
                        hidden: false,
                    },{
                        path: 'article3',
                        name: '文章页3',
                        icon: 'ios-call',
                        component: _import('pages/pagesmenu/Article3'),
                        hidden: false,
                    },
                ]
            },
            {path: '/text',name: '测试页',icon:"ios-home",component: _import('pages/Text')},

        ]
    },

    {
        path: '/homeone',
        redirect: '/pageother/Homeone',
        name: 'homeone',
        component: Fullone,
        hidden: false,
        children: [
            {path: '/homeone',name: 'homeone首页',icon:"md-home",component: _import('pageother/Homeone')},
            {
                path: '/homeonelist',name: 'homeone列表页',icon:"md-albums",redirect: '/homeonelist/homeone1',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'homeone1',
                        name: '列表one1',
                        icon: 'ios-funnel',
                        component: _import('pageother/pageothermenu/Homeone1'),
                        hidden: false,
                    },{
                        path: 'homeone2',
                        name: '列表one2',
                        icon: 'ios-bookmark',
                        component: _import('pageother/pageothermenu/Homeone2'),
                        hidden: false,
                    },{
                        path: 'homeone3',
                        name: '列表one3',
                        icon: 'ios-paper',
                        component: _import('pageother/pageothermenu/Homeone3'),
                        hidden: false,
                    },
                ]
            },
        ]
    },

    {
        path: '/hometwo',
        redirect: '/pageother/Hometwo',
        name: 'hometwo',
        component: Fulltwo,
        hidden: false,
        children: [
            {path: '/hometwo',name: 'hometwo首页',icon:"ios-barcode",component: _import('pageother/Hometwo')},
            {
                path: '/hometwolist',name: 'hometwo列表',icon:"md-home",redirect: '/hometwolist/hometwo1',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'hometwo1',
                        name: '列表two1',
                        icon: 'ios-funnel',
                        component: _import('pageother/pageothermenu/Hometwo1'),
                        hidden: false,
                    },{
                        path: 'hometwo2',
                        name: '列表two2',
                        icon: 'ios-bookmark',
                        component: _import('pageother/pageothermenu/Hometwo2'),
                        hidden: false,
                    },{
                        path: 'hometwo3',
                        name: '列表two3',
                        icon: 'ios-paper',
                        component: _import('pageother/pageothermenu/Hometwo3'),
                        hidden: false,
                    },
                ]
            },
            {
                path: '/pagetwo',name: 'hometwo文章页',icon:"md-outlet",redirect: '/pagetwo/pagetwo1',
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'pagetwo1',
                        name: 'hometwo文章页1',
                        icon: 'ios-funnel',
                        component: _import('pageother/pageothermenu/Pagetwo1'),
                        hidden: false,
                    },{
                        path: 'pagetwo2',
                        name: 'hometwo文章页2',
                        icon: 'ios-bookmark',
                        component: _import('pageother/pageothermenu/Pagetwo2'),
                        hidden: false,
                    },{
                        path: 'pagetwo3',
                        name: 'hometwo文章页3',
                        icon: 'ios-paper',
                        component: _import('pageother/pageothermenu/Pagetwo3'),
                        hidden: false,
                    },
                ]
            }

        ]
    },


    {path: '*', redirect: '/pages/404', hidden: true}

];
