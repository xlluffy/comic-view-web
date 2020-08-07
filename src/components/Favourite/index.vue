<template>
  <span v-if="isLogin()">
    <button :data-placement="position" @click="deleteFav()"
            class="btn btn-outline-light btn-favourite"
            data-toggle="tooltip" title="取消订阅" v-if="fav">
      <img alt="/images/icons/heart-fill.svg"
           height="30px" src="/api/images/icons/heart-fill.svg" width="30px">
    </button>
    <button :data-placement="position" @click="addFav()"
            class="btn btn-outline-light btn-favourite"
            data-toggle="tooltip" title="订阅" v-else>
      <img alt="/images/icons/heart.svg"
           height="30px" src="/api/images/icons/heart.svg" width="30px">
    </button>
  </span>
</template>

<script>
  import {isLogin} from "@/api/auth";
  import {service} from "@/api/api";

  export default {
    name: "Favourite",
    props: {
      favourite: Boolean,
      comicId: [Number, String],
      position: {
        type: String,
        default: 'top'
      }
    },

    data() {
      return {
        fav: this.favourite
      }
    },

    methods: {
      isLogin: () => isLogin(),

      addFav() {
        service.post('/api/comic/' + this.comicId + '/addFavourite').then(() => {
          this.fav = true;
        })
      },

      deleteFav() {
        service.post('/api/comic/' + this.comicId + '/deleteFavourite').then(() => {
          this.fav = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>