<template>
  <div class="text-center" v-if="!comics">
    加载中
  </div>
  <div class="row" v-else>
    <sidebar-comic :last-record="lastRecord"></sidebar-comic>
    <div class="col-md-10">
      <header class="text-center">
        <h2 class="mb-4">目录</h2>
        <span v-if="lastRecord">
          {{ `最近阅读: ${lastRecord.comic.title} - ${lastRecord.chapter.title}卷 - ${lastRecord.page}页` }}
        </span>
      </header>
      <nav-pag :action="fetchData" :pages="comics"></nav-pag>
      <div class="row justify-content-center">
        <div :key="comic.id" class="mt-3 ml-4" v-for="comic of comics.list">
          <record-comic-card :comic="comic" :record="allRecords[comic.id]">
          </record-comic-card>
        </div>
      </div>
      <nav-pag :action="fetchData" :pages="comics"></nav-pag>
    </div>
  </div>
</template>

<script>
  import SidebarComic from "@/components/Sidebar/SidebarComic";
  import {service} from "@/api/api";
  import NavPag from "@/components/Nav/NavPag";
  import RecordComicCard from "@/components/ComicCard/RecordComicCard";
  import {mapGetters} from "vuex";

  export default {
    name: "favourite",
    // eslint-disable-next-line vue/no-unused-components
    components: {RecordComicCard, NavPag, SidebarComic},

    data() {
      return {
        lastRecord: null,
        allRecords: null,
        comics: null,
      }
    },

    computed: {
      ...mapGetters([
        'user'
      ])
    },

    created() {
      document.title = `订阅 - ${this.user.username}`;
      this.fetchData();
    },

    methods: {
      fetchData() {
        service.get('/api/user/favourite', {
          params: this.$route.query
        }).then(resp => {
          this.lastRecord = resp['last_record'];
          this.allRecords = resp['all_records'];
          this.comics = resp['comics']
        })
      }
    }
  }
</script>

<style scoped>

</style>