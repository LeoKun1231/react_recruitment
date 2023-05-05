/*
 * @Author: hqk
 * @Date: 2023-03-26 17:04:51
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-31 10:47:37
 * @Description:
 */
import { ISearchConfig } from '@/types/common'

export const searchConfig: ISearchConfig = {
  items: [
    { type: 'input', name: 'account', label: '帐号' },
    { type: 'input', name: 'nickName', label: '用户名' },
    { type: 'input', name: 'userName', label: '姓名' },
    { type: 'input', name: 'companyName', label: '公司名' },
    { type: 'input', name: 'telephone', label: '手机号' },
    {
      type: 'select',
      name: 'status',
      label: '审核状态',
      options: [
        {
          label: '未完善资料',
          value: 0
        },
        {
          label: '未审核',
          value: 1
        },
        {
          label: '已审核',
          value: 2
        },
        {
          label: '未审核通过',
          value: 3
        }
      ]
    },
    { type: 'date', name: 'createTime', label: '创建时间' },
    { type: 'date', name: 'updateTime', label: '更新时间' }
  ]
}
