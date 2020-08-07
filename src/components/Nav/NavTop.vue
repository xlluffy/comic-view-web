<template>
  <nav class="navbar navbar-expand-lg navbar-dark bd-navbar bg-dark" id="nav-top">
    <a class="navbar-brand mr-2" href="/">
      <img alt="/favicon.ico" class="d-inline-block align-top" height="30" src="/favicon.ico" width="30">
    </a>

    <div class="navbar-nav-scroll ml-4">
      <ul class="navbar-nav  bd-navbar-nav flex-row">
        <li class="nav-item">
          <router-link class="nav-link" to="/category?categoryId=1">分类</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/?orderBy=lastUpdate&asc=false">最近更新</router-link>
        </li>
      </ul>
    </div>

    <div class="collapse navbar-collapse justify-content-end">
      <ul class="navbar-nav account">
        <li class="nav-item mr-2">
          <search-tip></search-tip>
        </li>

        <li class="nav-item dropdown" id="logout" v-if="isLogin()">
          <a aria-expanded="false" aria-haspopup="true" class="nav-link dropdown-toggle" data-toggle="dropdown"
             href="#" id="navbarDropdownMenuLink" role="button">
            {{ user.username }}
          </a>
          <div aria-labelledby="navbarDropdownMenuLink" class="dropdown-menu">
            <router-link class="dropdown-item" to="/user/favourite">我的订阅</router-link>
            <router-link class="dropdown-item" to="/user/record">历史记录</router-link>
            <router-link class="dropdown-item" to="/user/profile">设置</router-link>
            <a @click="logout" class="dropdown-item" href="#">登出</a>
          </div>
        </li>
        <li class="nav-item login" id="login" v-else>
          <router-link class="nav-link" to="/login">登陆</router-link>
        </li>
        <li class="nav-item dropdown" id="comic-admin" v-if="hasRole('ROLE_ADMIN')">
          <a aria-expanded="false" aria-haspopup="true" class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button">
            管理员
          </a>
          <div aria-labelledby="navbarDropdownMenuLink" class="dropdown-menu">
            <router-link class="dropdown-item" to="/admin/comic/index">漫画管理</router-link>
            <router-link class="dropdown-item" to="/admin/account/index">账号管理</router-link>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import {hasPermission, isLogin} from "@/api/auth";
  // eslint-disable-next-line no-unused-vars
  import {mapGetters} from 'vuex'
  import SearchTip from "@/components/Search/SearchTip";

  export default {
    name: "NavTop",
    components: {SearchTip},
    data() {
      return {
      };
    },

    computed: {
      ...mapGetters([
        'user',
      ])
    },

    methods: {
      hasRole: role => hasPermission(role),

      isLogin: () => isLogin(),

      logout() {
        this.$store.dispatch('Logout').then(() => {
          if (this.$route.meta.auth || this.$route.path.startsWith('/admin')) {
            this.$router.push('/')
          } else {
            location.reload()
          }
        })
      }
    }
  }
</script>

<style scoped>
  #nav-top {
    border-bottom: 1px solid #dee2e6!important;
    box-shadow: 2px 2px 4px #aaaaaa;
    margin-bottom: 30px;
    padding-left: 50px;
    padding-right: 50px;
  }
  .dropdown-menu {
    max-width: 120px;
    min-width: 100px;
  }
</style>