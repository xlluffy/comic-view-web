<template>
  <div>
    <one-page-menu :next-page="nextPage" :prev-page="prePage" id="menu-header">
    </one-page-menu>
    <div :style="{cursor: cursor}" @click="documentClick($event)"
         @mousemove="documentMousemove($event)"
         class="text-center"
         id="main-pages">
      <div class="page">
        <ImageCard :src="imgPath"></ImageCard>
<!--        <img class="page-img border border-light rounded mt-2 mb-2"-->
<!--            :alt="imgPath" :src="imgPath"/>-->
      </div>
    </div>
    <one-page-menu :next-page="nextPage" :prev-page="prePage">
    </one-page-menu>
  </div>
</template>

<script>
  import OnePageMenu from "@/components/ChapterMenu/OnePageMenu"
  import {mapGetters} from "vuex"
  import {isMobile} from "@/utils/utils";
  import ImageCard from "@/components/ImageCard/index";

  export default {
    name: "OnePage",
    components: {ImageCard, OnePageMenu},
    props: {
    },

    data() {
      return {
        cursor: 'default'
      }
    },

    computed: {
      ...mapGetters([
        'chapter',
        'prevChapter',
        'nextChapter',
        'currentPage'
      ]),

      imgPath() {
        return '/api/' + this.chapter.comic.title + '/' + this.chapter.title +
               '/' + this.currentPage.format(3) + this.chapter.suffix;
      }
    },

    created() {
      window.onbeforeunload = () => {
        this.$store.dispatch('SyncRecord', this.currentPage)
      };
    },

    mounted() {
      this.menuHeader = $('#menu-header')
    },

    methods: {
      scrollToMenu() {
        $(document).scrollTop(this.menuHeader[0].offsetTop)
      },

      prePage() {
        if (this.currentPage > 1) {
          this.$store.commit('PREV_PAGE');
          this.$nextTick(() => this.scrollToMenu())
        } else if (this.prevChapter && confirm('已经是第一页了，是否跳转到上一章节？')) {
          this.$store.dispatch('PrevChapter', this.currentPage);
        }
      },

      nextPage() {
        if (this.currentPage < this.chapter.pages) {
          this.$store.commit('NEXT_PAGE');
          this.$nextTick(() => this.scrollToMenu())
        } else if (this.nextChapter && confirm('已经是本篇章最后一页了，是否跳转到下一章节？')) {
          this.$store.dispatch('NextChapter', this.currentPage);
        }
      },

      documentClick(event) {
        if (isMobile()) {
          this.nextPage()
        } else {
          if (window.outerWidth > 5 * event.screenX / 2) {
            this.prePage();
          } else if (window.outerWidth < 5 * event.screenX / 3) {
            this.nextPage();
          }
        }
      },

      documentMousemove(event) {
        if (window.outerWidth > 5 * event.screenX / 2 ||
            window.outerWidth < 5 * event.screenX / 3) {
          this.cursor = 'pointer'
        } else {
          this.cursor = 'default'
        }
      }
    }
  }
</script>

<style scoped>
  .page-img {
    max-width: 90%;
    border-width: .2rem;
    box-shadow: 4px 4px 5px #aaaaaa, -3px -3px 5px #aaaaaa;
    /*filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, .5));*/
  }
</style>