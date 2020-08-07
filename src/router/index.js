import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/views/layout";
import Login from "@/views/login/Login";
import Register from "@/views/login/Register";
// import Comic from "@/views/comic"
// import Chapter from "@/views/chapter"
// import Profile from "@/views/user/profile"
// import SidebarProfile from "@/components/Sidebar/SidebarProfile";

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { title: '登陆' }
      // hidden: true
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { title: '注册' }
    },
    // root router map
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import("@/views/Home"),
          meta: { title: '主页' }
        },
        {
          path: 'comic/:id',
          name: 'Comic',
          component: () => import("@/views/comic"),
        },
        {
          path: 'chapter/:id',
          name: 'Chapter',
          component: () => import("@/views/chapter")
        },
        {
          path: 'category',
          name: 'Category',
          component: () => import("@/views/category")
        },
        {
          path: 'search',
          name: 'Search',
          component: () => import("@/views/search")
        }
      ]
    },

    // user map
    {
      path: '/user',
      component: Layout,
      redirect: '/user/favourite',
      children: [
        {
          path: 'profile',
          name: 'Profile',
          component: () => import("@/views/user/profile/profile"),
          meta: { auth: true }
        },
        {
          path: 'profile/safety',
          name: 'ProfileSafety',
          component: () => import("@/views/user/profile/profileSafety"),
          meta: { auth: true }
        },
        {
          path: 'favourite',
          name: 'Favourite',
          component: () => import("@/views/user/favourite/favourite"),
          meta: { auth: true }
        },
        {
          path: 'record',
          name: 'record',
          component: () => import("@/views/user/record"),
          meta: { auth: true }
        },
        {
          path: ':id',
          redirect: '/user/:id/favourite',
        },
        {
          path: ':id/favourite',
          name: 'OtherFavourite',
          component: () => import("@/views/user/favourite/otherFavourite"),
        },
      ]
    },

    // admin map
    {
      path: '/admin',
      component: Layout,
      children: [
        {
          path: 'account/index',
          name: 'Account',
          component: () => import("@/views/admin/account"),
          meta: { title: '用户管理' }
        },
        {
          path: 'comic/index',
          name: 'AdminComicLocal',
          component: () => import("@/views/admin/comic"),
          meta: { title: '漫画管理' }
        },
        {
          path: 'comic/addList',
          name: 'ComicLocal',
          component: () => import("@/views/admin/comic/comicLocal"),
          meta: { title: '本地漫画' }
        },
        {
          path: 'comic/:id',
          name: 'AdminComic',
          component: () => import("@/views/admin/comic/comic")
        },
        {
          path: 'comic/:id/addList',
          name: 'AdminChapterLocal',
          component: () => import("@/views/admin/comic/chapterLocal")
        }
      ]
    },

    // errors map
    {
      path: '',
      component: Layout,
      children: [
        {
          path: '401',
          name: 'Unauthorized',
          component: () => import("@/views/error/401"),
          meta: { title: '未登录' }
        },
        {
          path: '403',
          name: 'Forbidden',
          component: () => import("@/views/error/403"),
          meta: { title: '没有权限' }
        },
        {
          path: '404',
          name: 'NotFound',
          component: () => import("@/views/error/404"),
          meta: { title: '页面不存在' }
        },
        {
          path: '*',
          redirect: '/404'
        }
      ]
    }
  ]
})