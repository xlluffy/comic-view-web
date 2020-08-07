<template>
  <div class="card img-card" v-if="record">
    <router-link :to="'/comic/' + comic.id" target="_blank">
      <img :alt="`${comic.title}/${record.chapter.title}/${record.page}${record.suffix}`"
           :src="`/api/${comic.title}/${record.chapter.title}/${record.page}${record.suffix}`"
           class="img-thumbnail card-img-top comic-content"/>
      <!--height: 477px on 1080p-->
    </router-link>
    <div class="card-body">
      <span :title="comic.title" class="card-text text-center text-truncate"
            data-placement="top" data-toggle="tooltip">
        {{ comic.title }}
      </span>
      <router-link :title="`CH.${record.chapter.title} ${record.page}页`" :to="`/chapter/${record.chapter.id}?page=${record.page}`"
                   class="btn btn-outline-danger float-right btn-sm " data-placement="top"
                   data-toggle="tooltip"
         target="_blank">
        Recent</router-link>
    </div>
  </div>
  <comic-card :comic="comic" v-else></comic-card>
</template>

<script>
  import ComicCard from "@/components/ComicCard/index";

  export default {
    name: "RecordComicCard",
    components: {ComicCard},
    props: {
      record: Object,
      comic: Object
    }
  }
</script>

<style scoped>
  .img-card {
    width: 230px;
  }
  .card-img-top {
    height: 283px;
  }
</style>