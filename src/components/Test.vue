<template>
  <li id="test">
    <h4>{{ post.title }}</h4>
    <button @click="$emit('enlarge-text')">
      Enlarge text
    </button>
    <div v-html="post.content"></div>
  </li>
</template>

<script>
export default {
  props: ['post'],
  data() {
    return {
      // postFontSize: 1,
      // post
    }
  },
  methods: {
    clickEvent: function() {
      console.log('here');
      this.$emit('enlarge-text')
    }
  }
}
</script>

<style scoped>

</style>