<template>
  <div class="comment-area" v-if="isLogin()">
    <div class="user-face pr-4">
      <img :alt="'/api/' + user.icon" :src="'/api/' + user.icon">
    </div>
    <textarea autocomplete="off" class="form-control comment-text mr-4" cols="8" maxlength="500"
              placeholder="写下你的评论..." required rows="2" v-model.lazy="commentTxt"></textarea>
    <button @click="comment" class="btn btn-primary btn-comment align-self-center">评论</button>
  </div>
  <!--                TODO: 处理匿名用户反馈-->
  <div class="comment-area" v-else>
  </div>
</template>

<script>
  import {isLogin} from "@/api/auth";
  import {mapGetters} from "vuex";
  import {putRequest} from "@/api/api";

  export default {
    name: "CommentBox",
    props: {
      comicId: [String, Number]
    },

    data() {
      return {
        commentTxt: ''
      }
    },

    computed: {
      ...mapGetters([
        'user'
      ])
    },

    methods: {
      isLogin: () => isLogin(),

      comment() {
        if (this.commentTxt && this.commentTxt.length) {
          putRequest('/api/comment', {
            comic: {id: this.comicId},
            text: this.commentTxt
          }).then(resp => {
            console.log(resp);
            if (resp)
              this.$emit('addComment', resp);
          })
        }
      }
    }
  }
</script>

<style scoped>
  .comment-area{
    max-width: 900px;
    display: flex;
    padding-top: .5rem!important;
    margin-bottom: 1.5rem!important;
  }

  .user-face img{
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .btn-comment{
    width: 60px;
    height: 40px;
  }

  .comment-text {
    width: 700px;
    resize: none;
  }
</style>