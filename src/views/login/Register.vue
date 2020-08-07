<template>
  <div class="text-center" id="register">
    <form @submit.prevent="submitEvent" action="#" class="form-signin" method="post" novalidate>
      <img alt="/favicon.ico" class="mb-2" height="72" src="/favicon.ico" width="72">
      <h1 class="h3 mb-3 font-weight-normal">请注册</h1>
      <div class="row mb-2">
        <div class="col-4">
          <label class="sr-only" for="username">用户名</label>
        </div>
        <input :class="username.inputClass()" :pattern="username.pattern" @change="checkUsername"
               class="form-control col-4" id="username" name="username"
               placeholder="用户名"
               required type="text" v-model.lazy="username.value">
        <div :class="username.feedbackClass()"
             class="col align-self-center text-left">
          {{ username.feedback }}
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-4">
          <label class="sr-only" for="nickName">昵称</label>
        </div>
        <input :class="nickName.inputClass()" :pattern="nickName.pattern" @change="nickName.check($event)"
               class="form-control col-4" id="nickName" name="nickName"
               placeholder="昵称"
               required type="text" v-model.lazy="nickName.value">
        <div :class="nickName.feedbackClass()"
             class="col align-self-center text-left">
          {{ nickName.feedback }}
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-4">
          <label class="sr-only" for="email">邮箱</label>
        </div>
        <input :class="email.inputClass()" :pattern="email.pattern" @change="checkEmail"
               class="form-control col-4" id="email" name="email"
               placeholder="邮箱"
               required type="text" v-model.lazy="email.value">
        <div :class="email.feedbackClass()"
             class="col align-self-center text-left">
          {{ email.feedback }}
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-4">
          <label class="sr-only" for="password">密码</label>
        </div>
        <input :class="password.inputClass()" :pattern="password.pattern" @change="password.check($event)"
               class="form-control col-4" id="password" name="password"
               placeholder="密码"
               required type="password" v-model.lazy="password.value">
        <div :class="password.feedbackClass()"
             class="col align-self-center text-left">
          {{ password.feedback }}
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-4">
          <label class="sr-only" for="repeat-password">重复密码</label>
        </div>
        <input :class="repeatPass.inputClass()" :pattern="repeatPass.pattern"
               @change="checkRepeatPass" class="form-control col-4" id="repeat-password"
               placeholder="重复密码"
               required type="password" v-model="repeatPass.value">
        <div :class="repeatPass.feedbackClass()"
             class="col align-self-center text-left">
          {{ repeatPass.feedback }}
        </div>
      </div>
      <div class="row">
        <div class="col-5"></div>
        <button :class="submit.inputClass()" class="btn btn-lg btn-primary btn-block col-2"
                type="submit">
          注册
        </button>
        <div :class="submit.feedbackClass()" class="col align-self-center text-left">
          {{ submit.feedback }}
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-4"></div>
        <span class="col text-right">已有账号？<router-link  to="/login">登录</router-link></span>
        <div class="col-4"></div>
      </div>
      <!--    <p class="mt-5 mb-3 text-muted">© 2017-2019</p>-->
    </form>
  </div>
</template>

<script>
  import ValidatorParam, {EmailParam, PasswordParam, UsernameParam} from "@/utils/ValidatorParam";
  import {hasEmail, hasUsername} from "@/api/user";

  export default {
    name: "Register",
    data() {
      return {
        username: new UsernameParam(),
        nickName: new UsernameParam(),
        email: new EmailParam(),
        password: new PasswordParam(),
        repeatPass: new PasswordParam(),
        submit: new ValidatorParam('', '请完善注册信息')
      }
    },

    methods: {
      checkUsername(event) {
        this.username.check(event);
        if (this.username.isValid) {
          hasUsername(this.username.value).then(exist => {
            if (exist) {
              this.username.invalid('用户名已存在')
            } else {
              this.username.valid()
            }
          }).catch(() => {
            this.username.invalid('服务器连接失败')
          })
        }
      },

      checkEmail(event) {
        if (event.target.checkValidity()) {
          hasEmail(this.email.value).then(exist => {
            if (exist) {
              this.email.invalid('邮箱已注册')
            } else {
              this.email.valid()
            }
          }).catch(() => {
            this.email.invalid('服务器连接失败')
          })
        } else {
          this.email.invalid()
        }
      },

      checkRepeatPass(event) {
        if (!event.target.checkValidity()) {
          this.repeatPass.invalid()
        } else if (this.repeatPass.value !== this.password.value) {
          this.repeatPass.invalid('两次输入密码不同');
        } else {
          this.repeatPass.valid();
        }
      },

      submitEvent() {
        if (this.username.isValid && this.nickName.isValid && this.email.isValid
            && this.password.isValid && this.repeatPass.isValid) {
          this.$store.dispatch('Register', {
            username: this.username.value,
            nickName: this.nickName.value,
            email: this.email.value,
            password: this.password.value
          }).then(resp => {
            this.submit.valid(resp);
            this.$router.push({path: '/login', query: {username: this.username.value}})
          }).catch(error => {
            this.submit.invalid(error)
          })
        } else {
          this.submit.invalid()
        }
      }
    }
  }
</script>

<style scoped>
  #register {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow-y: auto;
  }

  .form-signin {
    width: 100%;
    /*max-width: 660px;*/
    max-width: 550px;
    padding: 15px;
    margin: auto;
  }

  #register form {
    max-width: 840px;
  }

  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
    /*margin-bottom: 10px;*/
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  #repeat-password {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

</style>