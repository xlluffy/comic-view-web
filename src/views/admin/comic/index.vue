<template>
  <div class="text-center" v-if="!comics">
    <h4>加载中...</h4>
  </div>

  <div v-else>
    <nav-pag :action="fetchData" :pages="comics"></nav-pag>
    <div class="row">
      <sidebar-admin></sidebar-admin>
      <div class="col">
        <table class="table table-striped justify-content-center comics-table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">漫画名</th>
            <th scope="col">章节数</th>
            <th scope="col">作者</th>
            <th scope="col" v-if="hasRole('ROLE_LADMIN')"></th>
            <th scope="col" v-if="hasRole('ROLE_LADMIN')"></th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <!--                TODO: 改成由ajax实现的异步更新-->
          <tr :key="comic.id" class="comic-info" v-for="(comic, index) of comics.list">
            <th scope="row">{{ index + comics.startRow }}</th>
            <td>
              <router-link :to="`/admin/comic/${comic.id}`">{{ comic.title }}</router-link>
            </td>
            <td>{{ comicsMap[comic.id] }}</td>
            <td>{{ comic.author }}</td>
            <td>
              <router-link :to="`/admin/comic/${comic.id}/addList`"
                           v-if="hasRole('ROLE_LADMIN')">
                本地章节
              </router-link>
            </td>
            <td><a @click.prevent="updateComic(comic)"  href="#" v-if="hasRole('ROLE_LADMIN')">更新</a></td>
            <td><a @click.prevent="deleteComic(comic.id, index)" href="#">删除</a></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <nav-pag :action="fetchData" :pages="comics"></nav-pag>
  </div>
</template>

<script>
  import {service} from "@/api/api";
  import NavPag from "@/components/Nav/NavPag";
  import SidebarAdmin from "@/components/Sidebar/SidebarAdmin";
  import {hasPermission} from "@/api/auth";

  export default {
    name: "AdminComic",
    components: {SidebarAdmin, NavPag},
    data() {
      return {
        comics: null,
        comicsMap: null
      }
    },

    created() {
      this.fetchData()
    },

    methods: {
      hasRole: role => hasPermission(role),

      fetchData() {
        service.get('/api/admin/comic/index').then(resp => {
          this.comics = resp.comics;
          this.comicsMap = resp.comicsMap
        })
      },

      updateComic(comic) {
        service.put(`/api/admin/comic/add?title=${comic.title}`).then(resp => {
          this.comicsMap[comic.id] = resp
        })
      },

      deleteComic(comicId, index) {
        // 可以考虑请求下一个comic以填充当前页，否则刷新当前页面更直观些
        service.delete(`/api/admin/comic/delete?id=${comicId}`).then(() => {
          this.comics.list.splice(index, 1);
        })
      }
    }
  }
</script>

<style scoped>

</style>