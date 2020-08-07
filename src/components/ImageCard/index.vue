<template>
  <div>
    <div class="spinner-border text-dark" role="status" v-if="loading">
      <span class="sr-only">Loading...</span>
    </div>
    <img :alt="src"
         :src="src" @load="loadingEvent"
         class="page-img border border-light rounded mt-2 mb-2" ref="image" v-show="!loading"/>
  </div>
</template>

<script>
  export default {
    name: "ImageCard",
    props: {
      src: String,
      view: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        loading: true
      }
    },

    methods: {
      loadingEvent() {
        this.loading = false;
        if (this.view === 'top') {
          this.topIntoView()
        } else if (this.view === 'bottom') {
          this.bottomIntoView()
        }
      },

      topIntoView() {
        this.$nextTick(() => {
          // console.log('top into view');
          this.$refs.image.scrollIntoView(true);
        });

      },

      bottomIntoView() {
        this.$nextTick(() => {
          this.$refs.image.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
          });
          // console.log('bottom Into view')
        });
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