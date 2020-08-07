<template>
  <div class="text-center" v-if="!comic">
    <h4>加载中...</h4>
  </div>
  <div v-else>
    <nav-pag :action="fetchData" :pages="chapters"></nav-pag>
    <div class="row">
      <sidebar-admin></sidebar-admin>
      <div class="col">
        <table class="table table-striped justify-content-center">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">章节名</th>
            <th scope="col">页数</th>
            <th scope="col">阅读情况</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr :key="index" v-for="(chapter, index) of chapters.list">
            <th scope="row">{{ index + chapters.startRow }}</th>
            <td><router-link :to="`/admin/comic/${comic.id}`" >{{ chapter.title }}</router-link></td>
            <td>{{ chapter.pages }}</td>
            <td>{{ comic.author }}</td>
            <td><a @click.prevent="deleteChapter(chapter.id, $event)" href="#">删除</a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {service} from "@/api/api";
  import NavPag from "@/components/Nav/NavPag";
  import SidebarAdmin from "@/components/Sidebar/SidebarAdmin";

  export default {
    name: "comic",
    components: {SidebarAdmin, NavPag},
    data() {
      return {
        comic: null,
        chapters: null
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
        service.get(`/api/admin/comic/${this.$route.params.id}`, {
          params: this.$route.query}).then(resp => {
            this.comic = resp.comic;
            this.chapters = resp.chapters;
            document.title = `漫画章节 - ${this.comic.title}`
          })
      },

      deleteChapter(chapterId, event) {
        service.delete(`/api/admin/comic/deleteChapter?chapterId=${chapterId}`).then(() => {
          event.target.classList.add('text-muted');
          event.target.removeAttribute('href');
          event.target.innerHTML = '已添加'
        })
      }
    }
  }
</script>

<style scoped>

</style>