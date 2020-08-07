const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  roles: state => state.user.user.authorities,
  chapter: state => state.chapter.chapter,
  prevChapter: state => state.chapter.prevChapter,
  nextChapter: state => state.chapter.nextChapter,
  currentPage: state => state.chapter.currentPage
  // isLogin: state => state.user.user && state.user.user.user.username
};

export default getters