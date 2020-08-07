<template>
  <header>
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
  </header>
</template>

<script>
  export default {
    name: "ChapterHeader",
  }
</script>

<style scoped>

</style>