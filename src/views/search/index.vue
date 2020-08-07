<template>
  <div class="text-center" v-if="!comics">
    <h4>加载中</h4>
  </div>
  <div v-else>
    <header class="text-center">
      <h4> {{ keyword }} - 搜索结果</h4>
      <span class="text-muted" v-if="count">
        共有{{ count }}部作品
      </span>
    </header>
    <nav-pag :action="fetchData" :pages="comics"></nav-pag>
    <div class="row justify-content-center">
      <div :key="comic.id" class="mt-3 ml-4" v-for="comic of comics.list">
        <comic-card :comic="comic"></comic-card>
      </div>
    </div>
    <nav-pag :action="fetchData" :pages="comics"></nav-pag>
  </div>
</template>

<script>
  import {service} from "@/api/api";
  import NavPag from "@/components/Nav/NavPag";
  import ComicCard from "@/components/ComicCard/index";

  export default {
    name: "Search",
    components: {ComicCard, NavPag},
    data() {
      return {
        keyword: null,
        comics: null,
        count: null
      }
    },

    created() {
      this.fetchData();
    },

    watch: {
      '$route': 'fetchData'
    },

    methods: {
      fetchData() {
        this.keyword = this.$route.query.keyword ? this.$route.query.keyword : this.$route.query.author;
        document.title = `搜索结果 - ${this.keyword}`;
        service.get(`/api/esComic/search`, {
          params: this.$route.query
        }).then(resp => {
          console.log(resp);
          this.comics = resp.comics;
          this.count = resp.count;
        });
      }
    }
  }
</script>

<style scoped>

</style>