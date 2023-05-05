export const useRulesConfig = () => {
  const jobTypeRules = [{ required: true, message: '职位类别不能为空' }]

  const jobNameRules = [{ required: true, message: '职位名不能为空' }]
  const jobRequireRules = [{ required: true, message: '学历要求不能为空' }]
  const startMoneyRules = [{ required: true, message: '起始薪资不能为空' }]
  const endMoneyRules = [{ required: true, message: '结束薪资不能为空' }]
  const moneyMonthRules = [{ required: true, message: '薪资月份不能为空' }]
  const cityRules = [{ required: true, message: '所在城市不能为空' }]
  const tagRules = [{ required: true, message: '职位标签不能为空' }]
  const wealRules = [{ required: true, message: '职位福利不能为空' }]
  const jobDescRules = [{ required: true, message: '职位描述不能为空' }]
  const addressNameRules = [{ required: true, message: '工作地址不能为空' }]

  return {
    jobTypeRules,
    jobNameRules,
    jobRequireRules,
    startMoneyRules,
    endMoneyRules,
    moneyMonthRules,
    cityRules,
    tagRules,
    wealRules,
    jobDescRules,
    addressNameRules
  }
}
