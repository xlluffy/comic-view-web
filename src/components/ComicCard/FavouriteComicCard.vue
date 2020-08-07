<template>
  <comic-card :comic="comic">
    <favourite :comic-id="comic.id"
               :favourite="favourite" class="float-right">
    </favourite>
  </comic-card>
</template>

<script>
  import ComicCard from "@/components/ComicCard/index";
  import Favourite from "@/components/Favourite/index";

  export default {
    name: "FavouriteComicCard",
    props: {
      comic: Object,
      favourite: Boolean
    },
    components: {Favourite, ComicCard}
  }
</script>

<style scoped>

</style>