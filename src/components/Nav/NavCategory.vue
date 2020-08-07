<template>
  <nav id="nav-category">
    <ul class="list-inline">
      <li class="list-inline-item text-muted">分类</li>
      <li :key="category.id" class="list-inline-item" v-for="category of categories">
        <router-link :style="{color: categoryId === category.id ? 'blue' : 'black'}"
                     :to="`/category?categoryId=${category.id}`">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
    <!--<ul class="list-inline">
      <li class="list-inline-item text-muted">排序</li>
      <li class="list-inline-item">默认</li>
      <li class="list-inline-item">漫画名</li>
      <li class="list-inline-item">更新时间</li>
    </ul>-->
  </nav>
</template>

<script>
  export default {
    name: "NavCategory",
    props: {
      categories: Array
    },

    computed: {
      categoryId() {
        return parseInt(this.$route.query.categoryId)
      }
    }
  }
</script>

<style scoped>
  #nav-category {
    margin: 0 200px 30px 200px;
  }

  #nav-category a {
    text-decoration: none;
    color: black;
  }
</style>