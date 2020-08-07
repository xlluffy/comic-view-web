<template>
  <div class="text-center" v-if="!comic">
    <h4>加载中...</h4>
  </div>
  <div class="row" v-else>
    <sidebar-admin></sidebar-admin>
    <div class="col">
      <table class="table table-striped justify-content-center">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">章节名</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr :key="index" v-for="(title, index) of chapters">
          <th scope="row">{{ index + 1 }}</th>
          <td><router-link :to="`/admin/comic/${comic.id}`">{{ title }}</router-link></td>
          <td><a @click="addChapter(title, $event)" href="#">添加</a></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import {service} from "@/api/api";
  import SidebarAdmin from "@/components/Sidebar/SidebarAdmin";

  export default {
    name: "ChapterLocal",
    components: {SidebarAdmin},
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
        service.get(`/api/admin/comic/${this.$route.params.id}/addList`).then(resp => {
          this.comic = resp.comic;
          this.chapters = resp.chapters;
          document.title = `本地章节 - ${this.comic.title}`
        })
      },

      addChapter(title, event) {
        service.put(`/api/admin/comic/${this.comic.id}/add?title=${title}`).then(() => {
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