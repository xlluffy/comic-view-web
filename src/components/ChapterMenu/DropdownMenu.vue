<template>
  <div class="text-center row justify-content-center mt-4 mb-4 dropDown">
    <button @click="preChapterEvent(getCurrentPage())" class="btn btn-info"
            v-if="prevChapter">
      上一卷
    </button>
    <router-link :to="'/comic/' + chapter.comic.id" class="ml-5 btn btn-info"
            type="button">
      目录
    </router-link>
    <button @click="nextChapterEvent(getCurrentPage())" class="ml-5 btn btn-info"
            v-if="nextChapter">
      下一卷
    </button>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "DropdownMenu",
    props: {
      getCurrentPage: Function
    },

    computed: {
      ...mapGetters([
        'prevChapter',
        'chapter',
        'nextChapter'
      ])
    },

    methods: {
      ...mapActions({
        prevChapterEvent: 'PrevChapter',
        nextChapterEvent: 'NextChapter'
      })
    }
  }
</script>

<style scoped>

</style>