<template>
  <div>
    <nav-top></nav-top>
    <div class="container-fluid">
      <transition mode="out-in" name="fade">
        <router-view></router-view>
      </transition>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
  import NavTop from "@/components/Nav/NavTop";
  import Footer from "@/components/Footer/index";
  import {hasPermission, isLogin, needGetInfo} from "@/api/auth";
  import store from "@/store"
  import NProgress from 'nprogress'

  function checkAuth(to, next) {
    if (to.meta.auth && !isLogin()) {
      next({path: '/401', replace: true});
      return false
    }
    return true
  }

  function checkAdmin(to, next) {
    if (to.path.startsWith('/admin') && !hasPermission('ROLE_ADMIN')) {
      next({path: '/403', replace: true});
      return false;
    }
    return true
  }

  function preprocess(to, next) {
    if (needGetInfo()) {
      NProgress.start();
      store.dispatch('GetInfo').then(() => {
        if (checkAdmin(to, next)) {
          next();
        }
        NProgress.done()
      }).catch(() => {
        if (checkAuth(to, next) && checkAdmin(to, next)) {
          next()
        }
        NProgress.done()
      });
    } else {
      if (checkAuth(to, next) && checkAdmin(to, next)) {
        next()
      }
    }
  }

  export default {
    name: "Layout",
    // eslint-disable-next-line vue/no-unused-components
    components: {Footer, NavTop},

    beforeRouteEnter(to, from, next) {
      preprocess(to, next);
    },

    beforeRouteUpdate(to, from, next) {
      preprocess(to, next);
    },

    methods: {
      preprocess() {

      }
    }
  }
</script>

<style scoped>

</style>