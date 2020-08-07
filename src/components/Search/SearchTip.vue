<template>
  <span id="search-tips-component">
    <label class="sr-only" for="search">搜索</label>
    <input @focus="show" class="form-control" id="search" placeholder="输入漫画或作者名称"
           type="text" v-model="inputTxt">
    <div :style="{width: tipsWidth}" class="mt-1" id="search-tips" v-if="showTips">
      <template v-if="text === ''">
        <div class="row text-muted pt-2 ml-2 mr-2 align-self-end border-bottom">热搜</div>
        <ul class="remote-tips">
          <li :key="index" @click="clickEvent('tips', data[index - 1])"
              class="search-item pt-2 pl-2" v-for="index of Math.min(6, data.length)">
            {{ isComic ? data[index - 1].title : data[index - 1] }}
          </li>
        </ul>

        <div class="row text-muted ml-2 mr-2 align-self-end border-bottom">本地记录</div>
        <ul class="local-tips">
          <li :key="index"
              @click="clickEvent('keyword', localTipsData[index - 1])" class="search-item pt-2 pl-2"
              v-for="index of Math.min(5, localTipsData.length)">
            {{ localTipsData[index - 1] }}
          </li>
        </ul>
      </template>

      <template v-else>
        <ul class="real-time-tips">
          <li :key="index" @click="clickEvent('keyword', tip)" class="search-item pt-2 pl-2"
              v-for="(tip, index) of filterLocalTips()">
            <b class="text-primary">{{ text }}</b>{{ tip.substring(text.length) }}
          </li>
          <li :key="index"
              @click="clickEvent('tips', data[index - 1])"
              class="search-item pt-2 pl-2" v-for="index of Math.min(10 - localTipsCount, data.length)">
            <template v-if="data[0].title">
              <span :key="i" v-for="(match, i) of tipsHint(data[index - 1].title)">
                <b v-if="match">{{ data[index - 1].title[i] }}</b>
                <template v-else>{{ data[index - 1].title[i] }}</template>
              </span>
            </template>
            <template v-else>
              <span :key="i" v-for="(match, i) of tipsHint(data[index - 1])">
                <b v-if="match">{{ data[index - 1][i] }}</b>
                <template v-else>{{ data[index - 1][i] }}</template>
              </span>
            </template>
          </li>
        </ul>
      </template>
    </div>
  </span>
</template>

<script>
  import {service} from "@/api/api";
  import {lcs} from "@/utils/utils";

  export default {
    name: "SearchTip",
    data() {
      return {
        showTips: false,
        inputTxt: '',
        isComic: false,
        tipsWidth: 0,
        localTipsData: localStorage.searchTips === undefined ? [] : JSON.parse(localStorage.searchTips),
        localTipsCount: 0,
        data: [],
        text: '',
        nowTip: null
      }
    },

    mounted() {
      this.component = $('#search-tips-component');
      this.input = $('#search');

      // 匹配中文输入
      let cpLock = false;
      this.input.on('compositionstart', function() {
        cpLock = true;
      });
      this.input.on('compositionend', () => {
        cpLock = false;
        if (this.nowTip != null) {
          this.nowTip.removeClass('hover');
          this.nowTip = null;
        }
        const text = this.inputTxt.trim();
        if (text.length !== this.text.length) {
          this.text = text;
          this.search()
        }
      });

      // 匹配英文或者数字输入
      this.input.on('input', () => {
        if (!cpLock) {
          if (this.nowTip != null) {
            this.nowTip.removeClass('hover');
            this.nowTip = null;
          }
          setTimeout(() => {
            const text = this.inputTxt.trim();
            if (Math.abs(text.length - this.text.length) > 1) {
              this.text = text;
              this.search()
            }
          }, 500)
        }
      });

      // 键盘映射绑定
      this.input.on('keydown', (e) => {
        // TODO: 切换加入localTips
        switch (e.keyCode) {
          case 9: {
            // tab, 直接触发down...
            e.preventDefault();
            let e1 = $.Event('keydown', {keyCode: 40});
            this.input.trigger(e1);
            break;
          }
          case 27: // esc
            this.hide();
            this.input.blur();
            break;
          case 13: {// enter
            const text = this.inputTxt.trim();
            if (text.length > 0) {
              if (this.nowTip != null) {
                this.nowTip.click();
              } else {
                this.clickEvent('keyword', text)
              }
              this.input.blur();
            }
            break;
          }
          case 38: // up
            if (this.nowTip && this.nowTip.length > 0) {
              this.nowTip.removeClass('hover');
            }
            this.nowTip = this.nowTip.prev('li');
            this.nowTip.addClass('hover');
            this.inputTxt = this.nowTip.text().trim();
            break;
          case 40: // down
            if (this.nowTip == null || this.nowTip.length === 0) {
              this.nowTip = this.component.find('li').eq(0);
            } else {
              this.nowTip.removeClass('hover');
              this.nowTip = this.nowTip.next('li')
            }
            this.nowTip.addClass('hover');
            this.inputTxt = this.nowTip.text().trim();
            break;
        }
      })
    },

    methods: {
      show() {
        $(document).on('mousedown.a', ((e) => {
          if (!$.contains(this.component.get(0), e.target)) {
            this.hide();
          }
        }));
        this.search();
        this.showTips = true;
        this.tipsWidth = this.input.outerWidth() + 'px'
      },

      hide() {
        this.showTips = false;
        this.nowTip = null;
        $(document).off('mousedown.a');
      },

      search() {
        const params = this.text === '' ? {} : {keyword: this.text};
        service.get('/api/esComic/search/simple', {params}).then(resp => {
          console.log(resp);
          this.isComic = resp.keyword;
          this.data = resp.data;
        }).catch(error => {
          console.log(error)
        })
      },

      filterLocalTips() {
        let tips = [];
        for (let tip of this.localTipsData) {
          if (tip.startsWith(this.text)) {
            tips.push(tip)
          }
          if (tips.length === 3) {
            break;
          }
        }
        this.localTipsCount = tips.length;
        return tips
      },

      // 匹配输入和搜索反馈的最长公共子序列
      tipsHint(tip) {
        return lcs(tip, this.text.toLowerCase());
      },

      saveRecord(text) {
        const index = this.localTipsData.indexOf(text);
        if (index !== -1) {
          if (this.localTipsData.length > 1) {
            this.localTipsData.splice(index, 1);
            this.localTipsData.unshift(text)
          }
        } else {
          if (this.localTipsData.length >= 20) {
            this.localTipsData.pop()
          }
          this.localTipsData.unshift(text)
        }
        localStorage.searchTips = JSON.stringify(this.localTipsData)
      },

      /**
       *
       * @param type 搜索类型
       * @param data 数据
       * click事件可由click或者input的enter调用
       * click时，事件分为type = 'tips'实时搜索反馈和type = 'keyword'历史记录两种
       *   当type = 'tips'时，若isComic则直接转到相应漫画首页，否则转到匹配的author首页
       *   当type = 'keyword'时，直接按照keyword = data搜索（不知道是否有简洁办法把实时搜索数据转到结果页面）
       * enter时，input可能由up, down, 或tab操作选定，此时执行相应tip(li)的click事件
       *   也可能只是按输入搜索，此时执行keyword = data
       */
      clickEvent(type, data) {
        if (type === 'tips') {
          if (this.isComic) {
            this.$router.push(`/comic/${data.id}`).then(() => {
              this.saveRecord(data.title)
            }).catch(() => {})
          } else {
            this.$router.push(`/search?author=${data}`).then(() => {
              this.saveRecord(data)
            }).catch(() => {})
          }
        } else {
          this.$router.push(`/search?keyword=${data}`).then(() => {
            this.saveRecord(data)
          }).catch(() => {})
        }
        this.hide();
      }
    }
  }
</script>

<style scoped>
  #search-tips {
    position: absolute;
    height: 415px;
    z-index: 1000;
    background-color: #ffffff;
    border: 1px solid #dee2e6!important;
    border-top-left-radius: .25rem!important;
    border-top-right-radius: .25rem!important;
    box-shadow: 1px 1px 2px #aaaaaa, -1px -1px 2px #aaaaaa;
  }

  #search-tips ul {
    list-style: none;
    padding-left: 0;
    /*padding-inline-start: 0; 草案标签，未标准化...*/
  }

  #search-tips div {
    font-size: 15px;
  }

  .search-item {
    cursor: pointer;
  }

  .search-item a {
    width: 100%;
    text-decoration: none;
  }

  .search-item:hover, .search-item.hover{
    background-color: #f6f6f6;
  }
</style>