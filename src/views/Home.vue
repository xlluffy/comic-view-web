<template>
  <div>
    <header class="text-center">
      <h2 class="mb-4">目录</h2>
    </header>
    <div class="text-center" v-if="loading">
      <h4>加载中...</h4>
    </div>
    <template v-if="pages">
      <nav-pag :pages="pages"></nav-pag>
      <div class="row justify-content-center" id="cards">
        <div :key="comic.id" class="mt-3 ml-4" v-for="comic in pages.list">
          <favourite-comic-card :comic="comic"
                      :favourite="favourites ? favourites[comic.id] : null">
          </favourite-comic-card>
        </div>
      </div>
      <nav-pag :pages="pages"></nav-pag>
    </template>
  </div>
</template>

<script>
  import {service} from "@/api/api";
  import NavPag from "@/components/Nav/NavPag";
  import FavouriteComicCard from "@/components/ComicCard/FavouriteComicCard";
  // import Favourite from "@/components/Favourite/index";
  export default {
    name: "Home",
    components: {FavouriteComicCard, NavPag},

    data() {
      return {
        loading: false,
        pages: null,
        favourites: null,
      }
    },

    created() {
      if (!this.pages)
        this.fetchData()
    },

    watch: {
      '$route': 'fetchData'
    },

    methods: {
      fetchData() {
        this.loading = true;
        service.get('/api/index', {
          params: this.$route.query
        }).then(resp => {
          // console.log(resp);
          this.pages = resp.pages;
          this.favourites = resp.favourites;
          this.loading = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>