<template>
  <div>
    <dropdown-menu :get-current-page="getCurrentPage" v-show="header"></dropdown-menu>
    <div class="text-center" id="main-pages">
      <span ref="top"></span>
      <div class="page">
        <ImageCard :src="imgPath(imgList[0])" v-if="state === 'init'"
                   view="top"></ImageCard>
        <ImageCard :src="imgPath(imgList[0])" v-else-if="state === 'up'"
                   view="bottom"></ImageCard>
        <span class='footer text-secondary'>{{imgList[0] + '/' + chapter.pages}}</span>
      </div>

      <div :key="index" class="page" v-for="index of imgList.slice(1)">
        <ImageCard :ref="'img' + index" :src="imgPath(index)"></ImageCard>
        <!--<img class="page-img border border-light rounded mt-2 mb-2"
             :alt="imgPath(index)" :src="imgPath(index)"/>
        <br>-->
        <span class='footer text-secondary'>{{index + '/' + chapter.pages}}</span>
      </div>
    </div>
    <dropdown-menu :get-current-page="getCurrentPage" v-show="footer"></dropdown-menu>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import DropdownMenu from "@/components/ChapterMenu/DropdownMenu"
  import ImageCard from "@/components/ImageCard/index";

  const step = 5;

  export default {
    name: "Dropdown",
    // eslint-disable-next-line vue/no-unused-components
    components: {ImageCard, DropdownMenu},
    props: {
    },

    data() {
      return {
        imgList: [],
        footer: false,
        header: false,
        state: null,
      }
    },

    computed: {
      ...mapGetters([
        'chapter',
        'prevChapter',
        'nextChapter',
        'currentPage'
      ]),
    },

    created() {
      this.$emit('toggle-header', false);
      this.appendPages();
      this.$nextTick(() => {
        this.state = 'init';
      });

      // 绑定scroll事件
      $(window).on('scroll.a', () => {
        const scrollTop = $(window).scrollTop();
        const blankTop = this.$refs.top.offsetTop;
        if (this.position.top === undefined) { // 初始化position
          this.initPage();
          // this.position.scrollTop = this.position.top;
        } else {
          const height = this.position.bottom - this.position.top;
          if (scrollTop > this.position.scrollTop) { // 向下滚动
            const windowHeight = $(window).height();
            const documentHeight = $(document).height();
            if (scrollTop + windowHeight + 10 >= documentHeight) {
              if (this.imgList[this.imgList.length - 1] < this.chapter.pages) {
                this.appendPages();
              } else {
                this.footer = true;
              }
            }
            if (scrollTop > this.position.top + 4 * height / 5) { // 下一页
              this.nextPage();
            }
          } else { // 向上滚动
            if (scrollTop < blankTop && this.position.scrollTop + 1 >= blankTop) {
              // 避免连续触发
              if (this.imgList[0] !== 1) {
                this.unshiftPages();
              } else {
                this.header = true;
                this.$emit('toggle-header', true);
              }
            }
            if (scrollTop < this.position.top + height / 5) { // 上一页
              this.prevPage();
            }
          }
        }
        this.position.scrollTop = scrollTop;
      });

      window.onbeforeunload = () => {
        this.$store.dispatch('SyncRecord', this.getCurrentPage())
      };
    },

    mounted() {
      this.position = {top: undefined, bottom: undefined, scrollTop: 0, page: 0};
    },

    beforeDestroy() {
      $(window).off('scroll.a');
    },

    methods: {
      imgPath(index) {
        return '/api/' + this.chapter.comic.title + '/' + this.chapter.title +
          '/' + index.format(3) + this.chapter.suffix;
      },

      appendPages() {
        let nowLoaded = this.imgList.length ? this.currentPage + 1 : this.currentPage;
        if (!this.imgList.length || nowLoaded === this.imgList[this.imgList.length - 1] + 1) {
          const end = Math.min(nowLoaded + step, this.chapter.pages + 1);
          let list = [];
          while (nowLoaded < end) {
            list.push(nowLoaded++);
          }
          this.imgList.push(...list);
          this.$nextTick(() => {
            this.pages = $('.page');
          });
          // console.log(this.imgList)
        }
      },

      unshiftPages() {
        /* let start = Math.max(this.currentPage - step, 1);
        let start = Math.max(this.currentPage - 1, 1);
        let list = [];
        while (start < this.currentPage) {
          list.push(start++);
        }
        this.imgList.unshift(...list)*/
        if (this.position.page === 0) {
          this.imgList.unshift(Math.max(this.currentPage - 1, 1));
          this.state = 'up';
          this.$nextTick(() => {
            this.pages = $('.page');
            this.changePage(this.position.page);
            this.$store.commit('PREV_PAGE');
            console.log(this.currentPage)
          })
        }
      },

      initPage() {
        this.changePage(0)
      },

      prevPage() {
        if (this.changePage(this.position.page - 1)) {
          console.log('prev page');
          this.$store.commit('PREV_PAGE');
          console.log(this.currentPage);
        }
      },

      nextPage() {
        if (this.changePage(this.position.page + 1)) {
          console.log('next page');
          this.$store.commit('NEXT_PAGE');
          console.log(this.currentPage);
        }
      },

      changePage(page) {
        if (page < 0 || page >= this.imgList.length) {
          return false
        }
        const selector = this.pages[page];
        this.position.top = selector.offsetTop;
        this.position.bottom = selector.offsetTop + selector.offsetHeight;
        this.position.page = page;
        console.log(this.position);
        return true;
      },

      getCurrentPage(){
        return this.currentPage
      },
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