<template>
  <div class="row justify-content-center">
    <sidebar-profile></sidebar-profile>
    <div class="profile mt-lg-1 col-6">
      <div class="profile-item">
        <div>
          <h4>邮箱</h4>
          <span class="text-muted">
            {{ user.email ? user.email : '未设置'}}
          </span>
        </div>
        <div class="profile-btn">
          <a aria-expanded="false" data-target="#collapseEmail"
             data-toggle="collapse" href="#">
            {{ user.email ? '修改' : '设置'}}
          </a>
        </div>
        <div class="collapse pt-2" id="collapseEmail">
          <form @submit.prevent="updateEmail" class="card card-body" id="email-form" novalidate>
            <div class="row mb-2">
              <div class="col-2 text-right align-self-center">
                <label for="old-email">旧邮箱: </label>
              </div>
              <input :class="oldEmail.inputClass()" :pattern="oldEmail.pattern"
                     @change="oldEmail.check($event)" class="form-control col-4"
                     id="old-email" placeholder="输入旧邮箱"
                     required type="text" v-model="oldEmail.value">
              <div :class="oldEmail.feedbackClass()"
                   class="col align-self-center text-left">
                {{ oldEmail.feedback }}
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-2 text-right align-self-center">
                <label for="new-email">新邮箱: </label>
              </div>
              <input :class="newEmail.inputClass()" :pattern="newEmail.pattern"
                     @change="newEmail.check($event)" class="form-control col-4"
                     id="new-email" placeholder="输入新邮箱"
                     required type="text" v-model="newEmail.value">
              <div :class="newEmail.feedbackClass()"
                   class="col align-self-center text-left">
                {{ newEmail.feedback }}
              </div>
            </div>
            <div class="row pt-2">
              <div class="col-2"></div>
              <input :class="emailSubmit.inputClass()" :value="user.email ? '修改邮箱' : '设置邮箱'"
                     class="btn btn-danger col-2"
                     id="email-submit"
                     type="submit">
              <div :class="emailSubmit.feedbackClass()"
                   class="col align-self-center text-left">
                {{ emailSubmit.feedback }}
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="profile-item">
        <div class="profile-item">
          <div class="profile-btn">
            <a aria-expanded="false" data-target="#collapsePassword" data-toggle="collapse" href="#">修改密码</a>
          </div>
          <div class="collapse pt-2" id="collapsePassword">
            <form @submit.prevent="updatePassword" class="card card-body" id="password-form" novalidate>
              <div class="row mb-2">
                <div class="col-2 text-right align-self-center">
                  <label for="old-password">旧密码: </label>
                </div>
                <input :class="oldPass.inputClass()" :pattern="oldPass.pattern"
                       @change="oldPass.check($event)" class="form-control col-4"
                       id="old-password" placeholder="输入旧密码"
                       required type="password" v-model.lazy="oldPass.value">
                <div :class="oldPass.feedbackClass()"
                     class="col align-self-center text-left">
                  {{ oldPass.feedback }}
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-2 text-right align-self-center">
                  <label for="new-password">新密码: </label>
                </div>
                <input :class="newPass.inputClass()" :pattern="newPass.pattern"
                       @change="checkNewPass" class="form-control col-4"
                       id="new-password" placeholder="输入新密码"
                       required type="password" v-model.lazy="newPass.value">
                <div :class="newPass.feedbackClass()"
                     class="col align-self-center text-left">
                  {{ newPass.feedback }}
                </div>
              </div>
              <div class="row mb-2">
                <div class="col-2 text-right align-self-center">
                  <label for="repeat-password">重复密码: </label>
                </div>
                <input :class="repeatPass.inputClass()" :pattern="repeatPass.pattern"
                       @change="checkRepeatPass" class="form-control col-4"
                       id="repeat-password" placeholder="重复新密码"
                       required type="password" v-model="repeatPass.value">
                <div :class="repeatPass.feedbackClass()"
                     class="col align-self-center text-left">
                  {{ repeatPass.feedback }}
                </div>
              </div>
              <div class="row pt-2">
                <div class="col-2"></div>
                <input :class="passSubmit.inputClass()" class="btn btn-danger col-2" type="submit"
                       value="修改密码"/>
                <div :class="passSubmit.feedbackClass()"
                     class="col align-self-center text-left">
                  {{ passSubmit.feedback }}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SidebarProfile from "@/components/Sidebar/SidebarProfile";
  import {mapGetters} from "vuex";
  import ValidatorParam, {EmailParam, PasswordParam} from "@/utils/ValidatorParam";
  import {safetyEmail} from "@/utils/utils";
  import {updateEmail, updatePass} from "@/api/user";

  export default {
    name: "profileSafety",
    components: {SidebarProfile},

    data() {
      return {
        oldEmail: new EmailParam(),
        newEmail: new EmailParam(),
        emailSubmit: new ValidatorParam(),

        oldPass: new PasswordParam('', '密码格式错误'),
        newPass: new PasswordParam('', '密码格式错误'),
        repeatPass: new PasswordParam('', '密码格式错误'),
        passSubmit: new ValidatorParam()
      }
    },

    computed: {
      ...mapGetters([
        'user'
      ])
    },

    created() {
      document.title = `安全设置 - ${this.user.username}`
    },

    methods: {
      checkNewPass(event) {
        if (this.oldPass.value === this.newPass.value) {
          this.newPass.invalid('新旧密码相同');
        } else {
          this.newPass.check(event)
        }
      },

      checkRepeatPass(event) {
        if (this.repeatPass.value !== this.newPass.value) {
          this.repeatPass.invalid('两次密码不同');
        } else {
          this.repeatPass.check(event)
        }
      },

      updateEmail() {
        if (this.oldEmail.isValid && this.newEmail.isValid) {
          if (this.oldEmail.value === this.newEmail.value) {
            this.emailSubmit.invalid('两次邮箱相同')
          } else {
            updateEmail({
              'oldEmail': this.oldEmail.value,
              'newEmail': this.newEmail.value
            }).then(resp => {
              this.emailSubmit.valid(resp);
              this.$store.commit('UPDATE_USER', {email: safetyEmail(this.newEmail.value)});
              console.log(this.user)
            }).catch(resp => {
              this.emailSubmit.invalid(resp)
            })
          }
        }
      },

      updatePassword() {
        if (this.oldPass.isValid && this.newPass.isValid && this.repeatPass.isValid) {
          updatePass({
            'oldPass': this.oldPass.value,
            'newPass': this.newPass.value
          }).then(resp => {
            this.passSubmit.valid(resp);
            alert('密码修改成功，请重新登陆');
            this.$store.dispatch('Logout').then(() => {
              this.$router.push('/login')
            })
          }).catch(resp => {
            this.passSubmit.invalid(resp)
          })
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