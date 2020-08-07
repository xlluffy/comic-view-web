<template>
  <div class="col-md-2 d-none d-md-block bg-dark sidebar">
    <div class="nav flex-column mt-5" v-if="lastRecord">
      <router-link :to="'/chapter/' + lastRecord.chapter.id + '?page=' + lastRecord.page" class="nav-link mt-5"
                   target="_blank">
        <img :alt="`${lastRecord.chapter.title}/${lastRecord.page}${lastRecord.suffix}`"
             :src="`/api/${lastRecord.comic.title}/${lastRecord.chapter.title}/${lastRecord.page}${lastRecord.suffix}`"
             class="img-thumbnail" />
      </router-link>
      <div class="text-center text-light">
        <p>最近阅读：</p>
        <p>{{ lastRecord.comic.title }}</p>
        <p> {{ lastRecord.chapter.title + '卷 -- ' + lastRecord.page + '页'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {isLogin} from "@/api/auth";

  export default {
    name: "SidebarComic",
    props: {
      lastRecord: Object,
    },

    methods: {
      isLogin: () => isLogin()
    }
  }
</script>

<style scoped>

</style>