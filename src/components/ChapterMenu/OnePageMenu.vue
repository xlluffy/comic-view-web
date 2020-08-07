<template>
  <div class="text-center justify-content-center mt-4 mb-4 onePage">
    <button @click="prevChapterEvent(currentPage)" class="btn btn-info pre-chapter"
       v-if="prevChapter">
      上一卷
    </button>
    <button @click="prevPage"
            class="btn btn-outline-danger btn-sm ml-4">上一页</button>
    <select :value="currentPage"
            @change="updatePage" class="my-custom-select mr-sm-2 ml-4">
      <option :key="index" :selected="index === currentPage"
              :value="index"
              v-for="index in chapter.pages">
        {{ index }}
      </option>
    </select>
    <span class="text-muted">/{{ chapter.pages }}</span>
    <button @click="nextPage"
            class="btn btn-outline-danger btn-sm ml-4">下一页</button>
    <button @click="nextChapterEvent(currentPage)" class="btn btn-info ml-4 next-chapter"
      v-if="nextChapter">
      下一卷
    </button>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex"

  export default {
    name: "OnePageMenu",
    props: {
      prevPage: Function,
      nextPage: Function
    },

    computed: {
      ...mapGetters([
        'chapter',
        'prevChapter',
        'nextChapter',
        'currentPage'
      ]),
    },

    methods: {
      updatePage(e) {
        this.$store.commit('GOTO_PAGE', parseInt(e.target.value));
      },

      ...mapActions({
        prevChapterEvent: 'PrevChapter',
        nextChapterEvent: 'NextChapter'
      })
    }
  }
</script>

<style scoped>
  .my-custom-select {
    display: inline-block;
    /* width: 100%; */
    height: calc(2.25rem + 2px);
    padding: .375rem 1.75rem .375rem .75rem;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background: #fff url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right .75rem center;
    background-size: 8px 10px;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
</style>