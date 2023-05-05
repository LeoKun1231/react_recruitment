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
    { type: 'input', name: 'telephone', label: '手机号' },
    {
      type: 'select',
      name: 'roleId',
      label: '角色',
      options: [
        {
          label: '超级管理员',
          value: 1
        },
        {
          label: '老师',
          value: 2
        }
      ]
    },
    { type: 'date', name: 'createTime', label: '创建时间' },
    { type: 'date', name: 'updateTime', label: '更新时间' }
  ]
}
