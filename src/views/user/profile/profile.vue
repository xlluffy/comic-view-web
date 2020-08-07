<template>
  <div class="row justify-content-center">
    <sidebar-profile></sidebar-profile>
    <form @submit.prevent="submitEvent" action="#" class="profile mt-lg-1 col-6" method="post" novalidate>
      <div class="profile-item row">
        <div class="col-2 text-right">
          <label>用户名: </label>
        </div>
        <div class="text-muted col">
          {{ user.username }}
        </div>
      </div>
      <div class="profile-item row">
        <div class="col-2 text-right align-self-center">
          <label for="nickName">昵称: </label>
        </div>
        <input :class="nickName.inputClass()" :pattern="nickName.pattern" :placeholder="nickName.value ? nickName.value :'无'"
               @input="checkNickname" class="form-control col-4"
               id="nickName"
               name="nickName" type="text" v-model="nickNameValue">
        <div :class="nickName.feedbackClass()"
             class="col align-self-center text-left">
          {{ nickName.feedback }}
        </div>
      </div>
      <div class="profile-item row">
        <div class="col-2 text-right">
          <label for="note">头像: </label>
        </div>
        <div class="col">
          <span class="text-muted">
            {{ user.icon ? user.icon : '未设置'}}
          </span>
        </div>
      </div>
      <div class="profile-item row">
        <div class="col-2 text-right align-self-center">
          <label for="note">我的签名: </label>
        </div>
        <div class="col">
          <textarea :placeholder="note ? '' : '无'" autocomplete="off"
                    class="border rounded" id="note" maxlength="500" name="note"
                    rows="2"
                    v-model="note"></textarea>
        </div>
      </div>
      <div class="profile-item row">
        <div class="col-2"></div>
        <input :class="submit.inputClass()"
               class="btn btn-danger"
                type="submit" value="保存">
        <div :class="submit.feedbackClass()"
             class="col align-self-center text-left">
          {{ submit.feedback }}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import SidebarProfile from "@/components/Sidebar/SidebarProfile";
  import ValidatorParam, {UsernameParam} from "@/utils/ValidatorParam";
  import {checkLength} from "@/utils/utils";
  import store from "@/store"
  import {updateProfile} from "@/api/user";

  export default {
    name: "Profile",
    components: {SidebarProfile},
    data() {
      return {
        nickNameValue: '', // 初始值应为空，placeholder应为nikeName旧值，所以单独提出来
        nickName: new UsernameParam(store.getters.user.nickName),
        submit: new ValidatorParam(),
        note: store.getters.user.note
      }
    },

    computed: {
      ...mapGetters([
        'user',
      ]),
    },

    created() {
      document.title = `设置 - ${this.user.username}`;
      this.nickName.isValid = null
    },

    methods: {
      // eslint-disable-next-line no-unused-vars
      checkNickname(event) {
        if (this.nickNameValue !== '') {
          this.nickName.validate(event.target.checkValidity() && checkLength(this.nickNameValue));
        } else {
          this.nickName.isValid = null
        }
      },

      checkNote(event) {
        return event.target.checkValidity();
      },

      submitEvent() {
        let data = {};
        if (this.nickNameValue !== '' && this.nickNameValue !== this.user.nickName) {
          data['nickName'] = this.nickNameValue;
        }
        if (this.note !== this.user.note) {
          data['note'] = this.note;
        }
        if (data['nickName'] || data['note']) {
          updateProfile(data).then(resp => {
            this.submit.valid(resp);
            this.$store.commit('UPDATE_USER', data);
          }).catch(error => {
            this.submit.invalid(error)
          })
        } else {
          this.submit.valid('设置未更改')
        }
      }
    }
  }
</script>

<style scoped>
  .profile {
    border: 1px solid #dee2e6!important;
    /*box-shadow: 1px 1px 2px #aaaaaa, -1px -1px 2px #aaaaaa;*/
  }

  .profile-item {
    /*border-bottom: 1px solid #dee2e6!important;*/
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .profile-item input {
    margin-left: 15px;
  }

  .profile-item textarea {
    width: 80%;
    resize: none;
  }

  .profile-item-border:last-child { /*被上一条覆盖*/
    border-bottom: none;
  }

  .profile-btn {
    position: relative;
    bottom: 45px;
    float: right;
  }
</style>