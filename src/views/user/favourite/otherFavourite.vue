<template>
  <div class="text-center" v-if="!comics">
    <h4>加载中</h4>
  </div>
  <div v-else>
    <header class="text-center">
      <h2>{{ otherUser.username }} 的订阅</h2>
    </header>
    <nav-pag :action="fetchData" :pages="comics"></nav-pag>
    <div class="row justify-content-center">
      <div :key="comic.id" class="mt-3 ml-4" v-for="comic of comics.list">
        <ComicCard :comic="comic"></ComicCard>
      </div>
    </div>
    <nav-pag :action="fetchData" :pages="comics"></nav-pag>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {service} from "@/api/api";
  import NavPag from "@/components/Nav/NavPag";
  import ComicCard from "@/components/ComicCard/index";

  export default {
    name: "otherFavourite",
    components: {ComicCard, NavPag},
    data() {
      return {
        otherUser: null,
        comics: null
      }
    },

    computed: {
      ...mapGetters([
        'user'
      ])
    },

    created() {
      this.fetchData();
    },

    watch: {
      '$route': 'fetchData'
    },

    methods: {
      fetchData() {
        if (Number.parseInt(this.$route.params.id) === this.user.id) {
          this.$router.push('/user/favourite');
          return
        }
        service.get(`/api/user/${this.$route.params.id}/favourite`, {
          params: this.$route.query
        }).then(resp => {
          this.otherUser = resp.user;
          this.comics = resp.comics;
          document.title = `订阅 - ${this.otherUser.username}`
        }).catch(() => {
          this.$router.replace('/404')
        })
      }
    }
  }
</script>

<style scoped>

</style>