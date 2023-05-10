/*
 * @Author: hqk
 * @Date: 2023-05-05 13:17:39
 * @LastEditors: hqk
 * @LastEditTime: 2023-05-05 14:50:26
 * @Description:
 */
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { ArticleReportWrapper } from './style'
import AppArticle from '@/components/AppArticle'
import { IReportArticle } from '@/types/home/community'
import { Badge, Alert, List, Checkbox, Empty } from 'antd'
import { useMemoizedFn } from 'ahooks'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
interface IProps {
  children?: ReactNode
  data: IReportArticle[]
  onClick: (id: number) => void
  onChange: (select: number[]) => void
}

interface IHandler {
  getSelects: () => number[]
  clear: () => void
}

const ArticleReport = forwardRef<IHandler, IProps>((props, ref) => {
  const { data, onClick, onChange } = props
  const [selectIds, setSelectId] = useState<number[]>([])

  const handleChange = useMemoizedFn((e: CheckboxChangeEvent, id: number) => {
    e.stopPropagation()
    if (e.target.checked) {
      onChange && onChange([...selectIds, id])
      setSelectId([...selectIds, id])
    } else {
      onChange && onChange(selectIds.filter((item) => item != id))
      setSelectId(selectIds.filter((item) => item != id))
    }
  })

  useImperativeHandle(
    ref,
    useMemoizedFn(() => {
      return {
        getSelects() {
          return selectIds
        },
        clear() {
          setSelectId([])
        }
      }
    }),
    [selectIds]
  )

  const handleArticleClick = useMemoizedFn((id: number) => {
    onClick && onClick(id)
  })

  return (
    <ArticleReportWrapper>
      {data.map((item) => {
        return (
          <div key={item.reportId} title="点击查看文章详情" className="w-full">
            <div className="flex items-center w-full">
              <Checkbox onChange={(e) => handleChange(e, item.reportId)}></Checkbox>
              <Badge.Ribbon text={<div className="info">被举报次数：{item.reportCount}</div>}>
                <div className="flex px-20px hover:bg-[#fafafa] hover:cursor-pointer w-full" onClick={() => handleArticleClick(item.id)}>
                  <AppArticle item={item as any} isEdit={false} classname="w-[50%] overflow-hidden" />
                  <div className="w-[50%] border  py-20px overflow-hidden">
                    <div className="font-600 text-[16px]">被举报原因</div>
                    <List className="mt-8px h-[180px] overflow-auto" size="small" split={false}>
                      {item.reason.map((reason) => {
                        return (
                          <List.Item key={reason}>
                            <Alert message={<div className="truncate w-[600px]">{reason}</div>} key={reason} className="!truncate w-full" />
                          </List.Item>
                        )
                      })}
                    </List>
                  </div>
                </div>
              </Badge.Ribbon>
            </div>
          </div>
        )
      })}
      {data?.length == 0 && <Empty />}
    </ArticleReportWrapper>
  )
})

export default memo(ArticleReport)
