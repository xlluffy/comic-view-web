<template>
  <div class="text-center" v-if="!comicsMap">
    <h4>加载中...</h4>
  </div>
  <div class="row" v-else>
    <sidebar-admin></sidebar-admin>
    <div class="col">
<!--      TODO: 添加初始设置表格-->
      <table class="table table-striped justify-content-center">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">漫画名</th>
          <th scope="col">章节数</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr :key="index" v-for="(value, name, index) of comicsMap">
          <th scope="row">{{ index + 1}}</th>
          <td>{{ name }}</td>
          <td>{{ value }}</td>
          <td><a @click.prevent="addComic(name, $event)" href="#">添加</a></td>
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
    name: "ComicLocal",
    components: {SidebarAdmin},
    data() {
      return {
        comicsMap: null
      }
    },

    created() {
      this.fetchData();
    },

    methods: {
      fetchData() {
        service.get('/api/admin/comic/addList').then(resp => {
          this.comicsMap = resp;
        })
      },

      addComic(title, event) {
        service.put(`/api/admin/comic/add?title=${title}`).then(() => {
          event.target.classList.add('text-muted');
          event.target.removeAttribute('href');
          event.target.innerHTML = '已添加'
        })
      }
    }
  }
</script>

<style scoped>
  .table {
    width: 85%;
    max-width: 85%;
    margin: 0 auto 1rem;
  }
</style>