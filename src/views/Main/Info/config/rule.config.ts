/*
 * @Author: hqk
 * @Date: 2023-02-25 16:20:00
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-17 10:31:05
 * @Description:
 */
import { validateCode, validateEmail, validatePassword, validatePhone, validateRealName } from '@/utils/validate'

export const useRulesConfig = () => {
  const codeRules = [
    { required: true, message: '请输入验证码' },
    {
      pattern: validateCode(),
      message: '请您输入正确的验证码（六位）',
      validateTrigger: 'onBlur'
    }
  ]

  const passwordRules = [
    { required: true, message: '设置6-16位字母和数字组合' },
    {
      pattern: validatePassword(),
      message: '请输入6-16位字母和数字组合的密码',
      validateTrigger: 'onBlur'
    }
  ]

  const phoneRules = [
    { required: true, message: '请输入手机号码' },
    {
      pattern: validatePhone(),
      message: '请您输入正确的手机号',
      validateTrigger: 'onBlur'
    }
  ]

  const userNameRules = [
    { required: true, message: '请输入真实姓名' },
    {
      pattern: validateRealName(),
      message: '请输入中文字符',
      validateTrigger: 'onBlur'
    }
  ]

  const emailRules = [
    { required: true, message: '请输入邮箱' },

    {
      pattern: validateEmail(),
      message: '请您输入正确的邮箱',
      validateTrigger: 'onBlur'
    }
  ]
  return {
    codeRules,
    passwordRules,
    phoneRules,
    userNameRules,
    emailRules
  }
}
