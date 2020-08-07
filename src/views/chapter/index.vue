<template>
  <div id="chapter">
    <div class="text-center" v-if="loading">
      加载中...
    </div>

    <div v-if="chapter">
      <template v-if="header">
        <div class="header mb-4 text-center mt-4" id="page-header">
          <h2>
            <router-link :to="`/comic/${chapter.comic.id}`" class="muted-link">{{ chapter.comic.title }}</router-link>
            {{ ' 第' + chapter.title + '卷'}}
          </h2>
        </div>

        <div class="form-check text-center">
          <input :checked="dropdown" @change="changeStyle"
                 class="form-check-input" id="read-style" type="checkbox">
          <label class="form-check-label" for="read-style">
            下拉式阅读
          </label>
        </div>
      </template>
<!--      <dropdown ></dropdown>-->

      <component :is="dropdown ? 'dropdown' : 'one-page'"
                 v-on:toggle-header="toggleHeader">
      </component>

      <div @mouseleave="menuMouseleave" id="menu">
        <div class="text-center btn-group" id="menu-content" role="group">
          <button @click="changeStyle" class="btn btn-outline-light" data-original-title="切换阅读方式"
                  data-placement="left" data-toggle="tooltip" id="menu-read-style" title type="button">
            <img alt="/images/icons/arrow-repeat.svg"
                 height="30px" src="/api/images/icons/arrow-repeat.svg" width="30px">
          </button>
          <br>
          <favourite :comic-id="chapter.comic.id" :favourite="favourite" position="left"></favourite>
          <br>

          <template v-if="prevChapter" >
            <button @click="prevChapterEvent(currentPage)" class="btn btn-outline-light" data-original-title="上一章"
                    data-placement="left" data-toggle="tooltip"
                    type="button">
              <svg class="icon" p-id="2633" t="1575400052204" version="1.1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path d="M830.24 685.76l11.328-11.312a16 16 0 0 0 0-22.64L530.448 340.688a16 16 0 0 0-22.64 0L196.688 651.808a16 16 0 0 0 0 22.64l11.312 11.312a16 16 0 0 0 22.624 0l288.496-288.512L807.632 685.76a16 16 0 0 0 22.624 0z" p-id="2634">
                </path>
              </svg>
            </button>
            <br>
          </template>
          <button @click="menuClick" class="btn btn-outline-light"
                  data-original-title="目录" data-placement="left"
                  data-toggle="tooltip" type="button">
            <svg class="icon" p-id="2869" t="1575400455009" version="1.1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path d="M343.312 374.256v-16a16 16 0 0 1 16-16h23.648a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-23.648a16 16 0 0 1-16-16z m100.16 0v-16a16 16 0 0 1 16-16H650.08a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H459.472a16 16 0 0 1-16-16z m-100.16 144.704v-16a16 16 0 0 1 16-16h23.648a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-23.648a16 16 0 0 1-16-16z m100.16 0v-16a16 16 0 0 1 16-16H650.08a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H459.472a16 16 0 0 1-16-16z m-100.16 144.688v-16a16 16 0 0 1 16-16h23.648a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-23.648a16 16 0 0 1-16-16z m100.16 0v-16a16 16 0 0 1 16-16H650.08a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16H459.472a16 16 0 0 1-16-16zM256 240v541.92h497.392V240H256z m529.392 589.92H224a16 16 0 0 1-16-16V208a16 16 0 0 1 16-16h561.392a16 16 0 0 1 16 16v605.92a16 16 0 0 1-16 16z" p-id="2870">
              </path>
            </svg>
          </button>
          <br>
          <button @click="nextChapterEvent(currentPage)" class="btn btn-outline-light" data-original-title="下一章"
                  data-placement="left" data-toggle="tooltip"
                  type="button" v-if="nextChapter">
            <svg class="icon" p-id="2515" t="1575399554787" version="1.1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path d="M830.24 340.688l11.328 11.312a16 16 0 0 1 0 22.624L530.448 685.76a16 16 0 0 1-22.64 0L196.688 374.624a16 16 0 0 1 0-22.624l11.312-11.312a16 16 0 0 1 22.624 0l288.496 288.496 288.512-288.496a16 16 0 0 1 22.624 0z" p-id="2516">

              </path>
            </svg>
          </button>
        </div>
        <img @mouseenter="menuIconMouseenter" alt="" id="menu-icon" src="/api/images/list-unordered.svg">
      </div>
    </div>
  </div>
</template>

<script>
  import OnePage from "@/views/chapter/OnePage";
  import Dropdown from "@/views/chapter/Dropdown"
  import {mapActions, mapGetters} from "vuex"
  import {service} from "@/api/api";
  import Favourite from "@/components/Favourite/index";

  export default {
    name: "Chapter",
    components: {Favourite, OnePage, Dropdown},
    data() {
      return {
        loading: false,
        favourite: false,
        dropdown: true,
        header: true
      }
    },

    computed: {
      ...mapGetters([
        'chapter',
        'prevChapter',
        'nextChapter',
        'currentPage'
      ]),

      chapterId() {
        return this.$route.params.id
      },
    },

    beforeCreate() {
      document.querySelector('body').setAttribute('style', 'background-color: rgb(245, 245, 245)')
    },

    beforeDestroy() {
      document.querySelector('body').removeAttribute('style')
    },

    created() {
      this.initStyle();
      this.fetchData();
    },

    watch: {
      '$route': 'fetchData'
    },

    methods: {
      initStyle() {
        if (localStorage.dropdown === undefined) {
          localStorage.dropdown = true
        }
        this.dropdown = localStorage.dropdown === 'true';
      },

      fetchData() {
        this.loading = true;
        service.get('/api/chapter/' + this.chapterId).then(resp => {
          this.$store.commit('INIT', resp);
          this.favourite = resp.favourite;
          document.title = `${this.chapter.comic.title} - ${this.chapter.title}`;
          this.loading = false;
        })
      },

      changeStyle() {
        this.dropdown = !this.dropdown;
        localStorage.dropdown = this.dropdown
      },

      toggleHeader(header) {
        // console.log(header);
        this.header = header;
      },

      menuMouseleave() {
        $("#menu-content").slideUp(800);
      },

      menuIconMouseenter() {
        $("#menu-content").slideDown("fast");
      },

      menuClick() {
        this.$store.dispatch('SyncRecord', this.currentPage);
        this.$router.push(`/comic/${this.chapter.comic.id}`)
      },

      ...mapActions({
        prevChapterEvent: 'PrevChapter',
        nextChapterEvent: 'NextChapter'
      })
    }
  }
</script>

<style scoped>
  #menu-content {
    position: fixed;
    right: 0;
    bottom: 92px;
  }

  #menu > img {
    width: 24px;
    height: 32px;
    cursor: pointer;
    position: fixed;
    right: 15px;
    bottom: 60px;
  }

  #menu-content {
    display: none;
  }

  #menu svg {
    width: 30px;
    height: 30px;
  }
</style>