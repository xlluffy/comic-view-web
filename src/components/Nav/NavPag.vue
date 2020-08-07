<template>
  <nav aria-label="Page navigation example" class="mt-3" id="nav-pag"
       v-if="pages.pages > 1">
    <ul class="pagination justify-content-center">
      <li :class="{disabled: pages.isFirstPage}" class="page-item">
        <a @click.prevent="action(pages.prePage, pages.pageSize)" class="page-link" href="#" tabindex="-1">
          Previous
        </a>
      </li>
      <li :class="{active: index === pages.pageNum}" :key="index"
          class="page-item" v-for="index in pages.pages">
        <a @click.prevent="action(index, pages.pageSize)" class="page-link" href="#">
          {{ index }}
        </a>
      </li>
      <li :class="{disabled: pages.isLastPage}" class="page-item">
        <a @click.prevent="action(pages.nextPage, pages.pageSize)" class="page-link" href="#">
          Next
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: "NavPag",
    props: {
      pages: Object,
      action: Function
    },
    data() {
      return {
        path: this.$route.path
      }
    }
  }
</script>

<style scoped>

</style>