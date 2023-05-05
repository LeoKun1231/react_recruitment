/*
 * @Author: hqk
 * @Date: 2023-04-10 19:22:40
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-16 22:52:12
 * @Description:
 */
import { validateAccount, validateEmail, validatePhone, validateRealName } from '@/utils/validate'

export const useRulesConfig = () => {
  const accountRules = [
    { required: true, message: '请输入帐号' },
    {
      pattern: validateAccount(),
      message: '请输入4到16位(字母，数字，下划线，减号)',
      validateTrigger: 'onBlur'
    }
  ]

  const nickNameRules = [{ required: true, message: '请输入用户名' }]

  const userNameRules = [
    { required: true, message: '请输入真实姓名' },
    {
      pattern: validateRealName(),
      message: '请输入中文字符',
      validateTrigger: 'onBlur'
    }
  ]

  const phoneRules = [
    {
      pattern: validatePhone(),
      message: '请您输入正确的手机号',
      validateTrigger: 'onBlur'
    }
  ]

  const emailRules = [
    {
      pattern: validateEmail(),
      message: '请您输入正确的邮箱',
      validateTrigger: 'onBlur'
    }
  ]

  return {
    accountRules,
    nickNameRules,
    userNameRules,
    phoneRules,
    emailRules
  }
}
