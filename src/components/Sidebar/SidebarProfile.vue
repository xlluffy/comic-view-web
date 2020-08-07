<template>
  <div class="col-2 mt-lg-1">
    <ul class="nav flex-column text-center nav-pills bg-gray border">
      <li class="nav-item list-group-item-action mt-2 mb-2 border-bottom">
        <router-link :class="{active: url === 'Profile'}" class="nav-link"
                     to="/user/profile">
          基本信息
        </router-link>
      </li>
      <li class="nav-item list-group-item-action mt-2 mb-2">
        <router-link :class="{active: url === 'ProfileSafety'}" class="nav-link"
                     to="/user/profile/safety">
          账号安全
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "SidebarProfile",

    computed: {
      url() {
        return this.$route.name
      }
    },
  }
</script>

<style scoped>

</style>