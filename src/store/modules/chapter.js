import router from '@/router'
// eslint-disable-next-line no-unused-vars
import store from "@/store"
// eslint-disable-next-line no-unused-vars
import {isLogin} from "@/api/auth";
// eslint-disable-next-line no-unused-vars
import {sendBeacon} from "@/api/api";

const chapter = {
  state: {
    chapter: null,
    prevChapter: null,
    nextChapter: null,
    currentPage: 1
  },

  mutations: {
    INIT: (state, chapter) => {
      state.chapter = chapter.chapter;
      state.prevChapter = chapter.prevChapter;
      state.nextChapter = chapter.nextChapter;
      state.currentPage = router.currentRoute.query.page ? parseInt(router.currentRoute.query.page) : 1
    },

    GOTO_PAGE: (state, page) => {
      state.currentPage = page;
    },

    PREV_PAGE: (state) => {
      if (state.currentPage > 1)
        state.currentPage -= 1
    },

    NEXT_PAGE: (state) => {
      if (state.currentPage < state.chapter.pages)
        state.currentPage += 1
    },

    PREV_CHAPTER: (state) => {
      state.currentPage = 1;
      router.push('/chapter/' + state.prevChapter)
    },

    NEXT_CHAPTER: (state) => {
      state.currentPage = 1;
      router.push('/chapter/' + state.nextChapter)
    }
  },

  actions: {
    SyncRecord({ state }, currentPage) {
      if (isLogin()) {
        const user = store.getters.user;

        sendBeacon('/api/record/update',
          {
            "user": {id: user.id, username: user.username},
            "comic": state.chapter.comic,
            "chapter": state.chapter, "page": String(currentPage),
            "suffix": state.chapter.suffix
          });
      }
    },

    PrevChapter({ dispatch, commit }, currentPage) {
      commit('PREV_CHAPTER');
      dispatch('SyncRecord', currentPage)
    },

    NextChapter({ dispatch, commit}, currentPage) {
      commit('NEXT_CHAPTER');
      dispatch('SyncRecord', currentPage)
    }
  }
};

export default chapter