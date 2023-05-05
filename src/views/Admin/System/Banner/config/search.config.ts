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
    { type: 'input', name: 'creator', label: '创建者' },
    { type: 'input', name: 'govUrl', label: '跳转链接' },
    {
      type: 'select',
      name: 'status',
      label: '是否启用',
      options: [
        {
          label: '停用',
          value: 0
        },
        {
          label: '启用',
          value: 1
        }
      ]
    },
    { type: 'date', name: 'createTime', label: '创建时间' },
    { type: 'date', name: 'updateTime', label: '更新时间' }
  ]
}
