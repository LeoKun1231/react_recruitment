/*
 * @Author: hqk
 * @Date: 2023-03-06 22:47:19
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-15 14:49:01
 * @Description:
 */
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { RandomWrapper } from './style'
import { NumberOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { getRandomTopicListAction, resetArticleSearchOptionsAction } from '@/store/features/community'
import { Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import AppListCard from '@/components/AppListCard'

interface IProps {
  children?: ReactNode
}

const RandonTopList: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getRandomTopicListAction())
  }, [])

  const { randomTopicList, isRandomTopicLoading } = useAppSelector((state) => {
    return {
      randomTopicList: state.community.randomTopicList,
      isRandomTopicLoading: state.community.isRandomTopicLoading
    }
  }, useAppShallowEqual)

  const onLoad = useMemoizedFn(() => {
    dispatch(getRandomTopicListAction())
  })

  const navigate = useNavigate()

  const goToTopicDetail = useMemoizedFn((e: any, id: number) => {
    dispatch(resetArticleSearchOptionsAction())
    navigate(`/main/community/topicDetail/${id}`)
  })

  return (
    <RandomWrapper>
      <AppListCard title="话题" onReload={onLoad}>
        {!isRandomTopicLoading ? (
          randomTopicList?.map((item) => {
            return (
              <div
                className="flex items-center px-[12px] py-[10px] text-[16px] border hover:bg-[var(--bg-gray-color)] hover:cursor-pointer group"
                key={item.id}
                onClick={(e) => goToTopicDetail(e, item.id)}>
                <NumberOutlined className="center text-[#1684FC]" />
                <div className="ml-[6px]  text-[#333] ">{item.content}</div>
              </div>
            )
          })
        ) : (
          <>
            {Array.from({ length: 10 }).map((item, index) => {
              return (
                <div key={index} className=" border text-[16px] py-[10px]">
                  <Skeleton paragraph={{ rows: 1, width: '90%' }} active title={false} />
                </div>
              )
            })}
          </>
        )}
      </AppListCard>
    </RandomWrapper>
  )
}

export default memo(RandonTopList)
