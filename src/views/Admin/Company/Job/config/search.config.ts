/*
 * @Author: hqk
 * @Date: 2023-03-26 17:04:51
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-31 10:47:37
 * @Description:
 */
import { ISearchConfig } from '@/types/common'
import cityData from '@/assets/data/city.json'
import jobData from '@/assets/data/job.json'

export const searchConfig: ISearchConfig = {
  items: [
    { type: 'input', name: 'jobName', label: '岗位名称' },

    {
      type: 'cascader',
      label: '岗位类型',
      name: 'jobType',
      options: jobData as any
    },

    {
      type: 'cascader',
      label: '所在城市',
      name: 'city',
      options: cityData as any
    },

    {
      type: 'select',
      name: 'status',
      label: '是否上架',
      options: [
        {
          label: '下架',
          value: 0
        },
        {
          label: '上架',
          value: 1
        }
      ]
    },
    { type: 'input', name: 'addressName', label: '工作地址' },

    {
      type: 'select',
      label: '学历要求',
      name: 'jobRequire',
      options: ['学历不限', '高中', '大专', '本科', '硕士', '研究生'].map((item) => {
        return { lable: item, value: item }
      }) as any
    },
    { type: 'date', name: 'createTime', label: '创建时间' },
    { type: 'date', name: 'updateTime', label: '更新时间' }
  ]
}
