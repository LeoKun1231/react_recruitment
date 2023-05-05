import { validateAccount, validateEmail, validatePhone, validateRealName } from '@/utils/validate'

export const useRulesConfig = () => {
  const shortNameRules = [{ required: true, message: '公司简称不能为空' }]

  const fullNameRules = [{ required: true, message: '公司全称不能为空' }]
  const linkManRules = [{ required: true, message: '联系人不能为空' }]
  const phoneRules = [
    { required: true, message: '请输入手机号码' },
    {
      pattern: validatePhone(),
      message: '请您输入正确的手机号',
      validateTrigger: 'onBlur'
    }
  ]
  const cityRules = [{ required: true, message: '所在城市不能为空' }]
  const sizeRules = [{ required: true, message: '企业规模不能为空' }]
  const categoryRules = [{ required: true, message: '企业类别不能为空' }]
  const levelRules = [{ required: true, message: '融资阶段不能为空' }]
  const companyTypeRules = [{ required: true, message: '公司性质不能为空' }]
  const wealRules = [{ required: true, message: '公司福利不能为空' }]
  const descRules = [{ required: true, message: '公司描述不能为空' }]
  const addressNameRules = [{ required: true, message: '公司地址不能为空' }]

  return {
    shortNameRules,
    fullNameRules,
    linkManRules,
    phoneRules,
    cityRules,
    sizeRules,
    categoryRules,
    levelRules,
    companyTypeRules,
    wealRules,
    descRules,
    addressNameRules
  }
}
