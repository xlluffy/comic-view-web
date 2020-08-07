<template>
  <div class="card img-card">
    <router-link :to="'/comic/'+comic.id" target="_blank">
      <img :alt="'/' + comic.title + '/cover.jpg'"
           :src="'/api/' + comic.title + '/cover.jpg'"
           class="img-thumbnail card-img-top"/>
    </router-link>
    <div class="card-body">
      <span :title="comic.title" class="card-text text-center text-truncate"
            data-placement="top" data-toggle="tooltip">
        {{ comic.title }}
      </span>
      <slot></slot>
      <!--<favourite class="float-right" v-if="favourite !== undefined"
                 :favourite="favourite" :comic-id="comic.id">
      </favourite>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "ComicCard",
    // components: {Favourite},
    props: {
      comic: Object,
      // favourite: [Boolean, undefined]
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