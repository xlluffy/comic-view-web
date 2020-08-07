import {checkLength} from "@/utils/utils";

class ValidatorParam {
  constructor(value = '', invalidFeedback = '', validFeedback = '', pattern = '') {
    this.value = value;
    this.validFeedback = validFeedback;
    this.invalidFeedback = invalidFeedback;
    this.pattern = pattern;
    this.feedback = '';
    // 允许3种状态，默认状态null不显示反馈，一旦触发调用函数触发callback则只有显示valid和invalid两种
    this.isValid = value === '' || !value ? null : true;
  }

  valid(validFeedback) {
    this.isValid = true;
    this.feedback = validFeedback ? validFeedback : this.validFeedback;
  }

  invalid(invalidFeedback) {
    this.isValid = false;
    this.feedback = invalidFeedback ? invalidFeedback : this.invalidFeedback;
  }

  validate(condition, invalidFeedback) {
    condition ? this.valid() : this.invalid(invalidFeedback)
  }

  check(event) {
    this.validate(event.target.checkValidity())
  }

  inputClass() {
    return {'is-valid': this.isValid, 'is-invalid': this.isValid === false}
  }

  feedbackClass() {
    return {'valid-feedback': this.isValid, 'invalid-feedback': !this.isValid};
  }
}

export class UsernameParam extends ValidatorParam{
  constructor(value = '', invalidFeedback = '由4-16个字符内的字母中文或数字组成', validFeedback = '') {
    super(value, invalidFeedback, validFeedback,
      '^(?![0-9_])[a-zA-Z0-9_\u4e00-\u9fa5]{2,16}$')
  }

  check(event) {
    this.validate(event.target.checkValidity() && checkLength(this.value))
  }
}

export class EmailParam extends ValidatorParam{
  constructor(value = '', invalidFeedback = '邮箱格式不合法', validFeedback = '') {
    super(value, invalidFeedback, validFeedback,
      '^[\\w\u4e00-\u9fa5]+@\\w+\\.\\w+$')
  }
}

export class PasswordParam extends ValidatorParam{
  constructor(value = '', invalidFeedback = '由长度6-16内的字母、数字或特殊字符组成', validFeedback = '') {
    super(value, invalidFeedback, validFeedback,
      '^[\x21-\x7e]{6,16}$')
  }
}

export default ValidatorParam