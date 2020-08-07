<template>
  <div class="text-center" v-if="!categories">
    <h4>加载中...</h4>
  </div>
  <div v-else>
    <nav-category :categories="categories"></nav-category>
    <nav-pag :action="fetchData" :pages="comics"></nav-pag>
    <div class="row justify-content-center" id="cards">
      <div :key="comic.id" class="mt-3 ml-4" v-for="comic of comics.list">
        <comic-card :comic="comic"></comic-card>
      </div>
      <h4 class="text-center" v-if="comics.total === 0">没有相关漫画</h4>
    </div>
    <nav-pag :action="fetchData" :pages="comics"></nav-pag>
  </div>
</template>

<script>
  import {service} from "@/api/api";
  import NavCategory from "@/components/Nav/NavCategory";
  import NavPag from "@/components/Nav/NavPag";
  import ComicCard from "@/components/ComicCard/index";

  export default {
    name: "index",
    components: {ComicCard, NavPag, NavCategory},
    data() {
      return {
        categories: null,
        comics: null
      }
    },

    created() {
      this.fetchData()
    },

    watch: {
      '$route': 'fetchData'
    },

    methods: {
      fetchData() {
        const categoryId = Number.parseInt(this.$route.query.categoryId);
        service.get('/api/category', {
          params: this.$route.query
        }).then(resp => {
          this.categories = resp.categories;
          this.comics = resp.comics;
          const category = this.categories.find(x => x.id === categoryId);
          document.title = `分类 - ${category.name}`
        })
      }
    }
  }
</script>

<style scoped>

</style>