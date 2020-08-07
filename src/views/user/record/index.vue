<template xmlns:th="http://www.w3.org/1999/xhtml">
  <div class="text-center" v-if="!records">
    <h4>加载中</h4>
  </div>
  <div v-else>
    <nav-pag :action="fetchData" :pages="records"></nav-pag>
    <div :key="record.id" class="row record justify-content-center" v-for="record of records.list">
      <div class="col-1 border-bottom pt-1 pb-1">
        <router-link :to="'/comic/' + record.comic.id">
          <img :alt="record.comic.title + '/cover.jpg'"
               :src="'/api/' + record.comic.title + '/cover.jpg'"
               class="record-cover img-thumbnail">
        </router-link>
      </div>
      <div class="col-5 border-bottom">
        <h4 class="pt-2">
          <router-link :to="'/comic/' + record.comic.id">
            {{ record.comic.title }}
          </router-link>
        </h4>
        <div class="pt-2">
          <router-link :to="`/chapter/${record.chapter.id}?page=${record.page}`"
                       class="text-muted"
             th:text="|p.*{page} / CH.*{chapter.title}|">
            {{ `p.${record.page} / CH.${record.chapter.title}` }}
          </router-link>
        </div>
      </div>
      <div class="col-2 border-bottom mt-4">
        <a @click="deleteRecord(record.id)" class="btn btn-outline-danger record-delete mr-1" style="top: 20px">删除</a>
        <router-link :to="`/chapter/${record.chapter.id}?page=${record.page}`"
                     class="btn btn-outline-success">
          继续阅读
        </router-link>
      </div>
    </div>
    <h4 class="text-center" v-if="records.total === 0">
      尚未有阅读记录
    </h4>
    <nav-pag :action="fetchData" :pages="records"></nav-pag>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {service} from "@/api/api";
  import NavPag from "@/components/Nav/NavPag";

  export default {
    name: "Record",
    components: {NavPag},
    data() {
      return {
        records: null
      }
    },

    computed: {
      ...mapGetters([
        'user'
      ])
    },

    created() {
      document.title = `阅读记录 - ${this.user.username}`;
      this.fetchData()
    },

    methods: {
      fetchData() {
        service.get('/api/user/record', {
          params: this.$route.query
        }).then(resp => {
          console.log(resp);
          this.records = resp
        })
      },

      deleteRecord(id) {
        service.get(`/api/record/delete/${id}`).then(() => {
          this.fetchData()
        })
      }
    }
  }
</script>

<style scoped>
  #record-info p{
    margin-bottom: 0.2rem;
  }

  .record-cover {
    width: 82px;
    height: 96px;
  }
</style>