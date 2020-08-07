<template>
  <div class="comment pr-4 border-bottom">
    <div class="user-face pr-4">
      <img :alt="'/api/' + comment.user.icon" :src="'/api/' + comment.user.icon">
    </div>
    <div class="comment-details">
      <div class="mb-2">
        <router-link :to="'/user/' + comment.user.id + '/favourite'"
           class="username">
          {{ comment.user.username }}
        </router-link>
      </div>
      <div class="mb-1">{{ comment.text }}</div>
      <div class="text-muted reply-info">
        <span>{{ formatData(comment.createTime) }}</span>
        <span @click="replyClick(null)" class="ml-3 btn-reply-wrap">
          回复
        </span>
      </div>

      <template v-if="replies">
        <div :key="reply.id" class="reply" v-for="reply of replies.list">
          <div class="user-face-reply pr-2">
            <img :alt="'/api/' + reply.user.icon" :src="'/api/' + reply.user.icon">
          </div>
          <div>
            <div class="mb-1">
              <span class="pr-2">
                  <router-link :to="'/user/' + comment.user.id + '/favourite'" class="username">
                    {{ reply.user.username }}
                  </router-link>
              </span>
              <span v-if="reply.reply">
                回复
                <router-link :to="'/user/' + reply.reply.user.id + '/favourite'">
                  {{ reply.reply.user.username }}
                </router-link>
                <span>:&nbsp;{{ reply.text }}</span>
              </span>
              <span v-else>{{ reply.text }}</span>
            </div>
            <div class="text-muted reply-info">
              <span>{{ formatData(reply.createTime) }}</span>
              <span @click="replyClick(reply)" class="ml-3 btn-reply-wrap">
                回复
              </span>
            </div>
          </div>
        </div>

        <ul class="list-inline justify-content-end" v-if="replies.pages > 1">
          <li :class="{ disabled: replies.isFirstPage }" class="list-inline-item">
            <span @click="fetchReplies(replies.prePage, replies.pageSize)">上一页</span>
          </li>
          <li :class="{ active: now === replies.pageNum }" :key="now"
              class="list-inline-item" v-for="now in replies.pages">
              <span @click="fetchReplies(now, replies.pageSize)">
                {{ now }}
              </span>
          </li>
          <li :class="{ disabled: replies.isLastPage }" class="list-inline-item">
            <span @click="fetchReplies(replies.nextPage, replies.pageSize)">下一页</span>
          </li>
        </ul>

        <template v-if="commentBoxSeen">
          <div class="comment-area" v-if="isLogin()">
            <div class="user-face pr-4">
              <img :alt="'/api/' + user.icon" :src="'/api/' + user.icon">
            </div>
            <textarea autocomplete="off" class="form-control comment-text mr-4" cols="8" maxlength="500"
                      placeholder="写下你的评论..." required rows="2" v-model.lazy="commentTxt"></textarea>
            <button @click="replyComment" class="btn btn-primary btn-comment align-self-center">评论</button>
          </div>
          <!--                TODO: 处理匿名用户反馈-->
          <div class="comment-area" v-else>
          </div>
        </template>
      </template>

<!--      <div class="comment-area pr-4" sec:authorize="isAnonymous()"></div>-->
    </div>
  </div>
</template>

<script>
  import {service} from "@/api/api";
  import {mapGetters} from "vuex";
  import {isLogin} from "@/api/auth";
  import {formatDate} from "@/utils/utils";

  export default {
    name: "Comment",

    props: {
      comment: Object,
      firstReplies: Object
    },

    data() {
      return {
        reply: null,
        commentBoxSeen: false,
        commentTxt: '',
        replies: this.firstReplies
      }
    },

    computed: {
      ...mapGetters([
        'user'
      ]),
    },

    methods: {
      isLogin: () => isLogin(),

      fetchReplies(pageNum = 1, pageSize = 10) {
        service.get('/api/comment/' + this.comment.id + '/replies', {
          params: {
            pageNum,
            pageSize
          }
        }).then(resp => {
          this.replies = resp;
        })
      },

      replyClick(reply) {
        this.reply = reply;
        this.commentBoxSeen = true
      },

      replyComment() {
        if (this.commentTxt && this.commentTxt.length) {
          this.putRequest('/api/comment/reply', {
            reply: this.reply ? { id: this.reply.id } : null,
            comment: {id: this.comment.id},
            text: this.commentTxt
          }).then(resp => {
            // console.log(resp);
            resp.reply.user = this.reply.reply.user;
            this.replies.list.push(resp);
            this.commentTxt = ''
          })
        }
      },

      formatData: data => formatDate(data)
    }
  }
</script>

<style scoped>
  .comment-area, .comment, .reply {
    max-width: 900px;
    display: flex;
    padding-top: .5rem!important;
    margin-bottom: 1.5rem!important;
  }

  .reply {
    margin-bottom: .5rem!important;
  }

  .reply-info {
    font-size: 14px;
  }

  .user-face img{
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .user-face-reply img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .username {
    color: #6d757a;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    text-decoration: none;
  }

  .comment-text {
    width: 700px;
    resize: none;
  }

  .btn-comment {
    width: 60px;
    height: 40px;
  }

  .btn-reply-wrap {
    cursor: pointer;
  }

  .btn-reply-wrap:hover {
    font-weight: 700;
    text-decoration: underline;
  }

  .list-inline-item {
    color: black;
    font-size: 12px;
    cursor: pointer;
  }

  .active {
    color: #007bff;
    font-weight: 700;
  }

  .disabled {
  cursor: default;
  }


</style>