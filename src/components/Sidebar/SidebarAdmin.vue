<template>
  <div class="col-2 mt-lg-5">
    <ul class="nav flex-column text-center nav-pills bg-gray">
      <li class="nav-item list-group-item-action pt-2 pb-2 border-bottom">
        <router-link :class="{active: $route.name === 'AdminComicLocal'}" class="nav-link"
                     to="/admin/comic/index">
          漫画管理
        </router-link>
      </li>
      <li class="nav-item list-group-item-action pt-2 pb-2 border-bottom" v-if="hasRole('ROLE_LADMIN')">
        <router-link :class="{active: $route.name === 'ComicLocal'}" class="nav-link"
                     to="/admin/comic/addList">
          添加漫画
        </router-link>
      </li>
      <li class="nav-item list-group-item-action pt-2 pb-2 border-bottom">
        <router-link :class="{active: $route.name === 'Account'}" class="nav-link"
                     to="/admin/account/index">
          账号管理
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {hasPermission} from "@/api/auth";

  export default {
    name: "SidebarAdmin",

    methods: {
      hasRole: role => hasPermission(role)
    }
  }
</script>

<style scoped>

</style>