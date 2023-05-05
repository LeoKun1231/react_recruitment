/*
 * @Author: hqk
 * @Date: 2023-03-06 15:22:27
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-04 12:51:51
 * @Description:
 */
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { RadioAreaWrapper } from './style'
import { useMemoizedFn } from 'ahooks'
import classNames from 'classnames'
import AppScrollView from '@/components/AppScrollView'
import { getArticleListAction, resetArticleSearchOptionsAction, saveRadioSelectAction } from '@/store/features/community'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { getMajorNoTreeListAction } from '@/store/features/common'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
interface IProps {
  children?: ReactNode
}
const types = ['全部', '最热', '最新', '最多评论', '最多点赞']
const category = ['全部', '闲聊', '提问题', '提建议']

const RadioArea: FC<IProps> = () => {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0)
  const [currentCategoryIndex, setCurrentCateIndex] = useState(0)
  const [currentOtherIndex, setCurrenOthertIndex] = useState(0)

  const dispatch = useAppDispatch()

  const { majorNoTreeList } = useAppSelector((state) => {
    return {
      majorNoTreeList: state.common.majorNoTreeList
    }
  }, useAppShallowEqual)

  //处理类型切换
  const handleTypeChange = useMemoizedFn((_: any, index: number, type: number) => {
    //切换类型之前，先清空数据
    dispatch(resetArticleSearchOptionsAction())
    switch (type) {
      case 0:
        setCurrentTypeIndex(index)
        resetRadio()
        dispatch(getArticleListAction({ typedId: index }))
        dispatch(saveRadioSelectAction({ categoryId: currentCategoryIndex, otherId: currentOtherIndex, typedId: index }))
        break
      case 1:
        setCurrentCateIndex(index)
        dispatch(getArticleListAction({ categoryId: index, otherId: currentOtherIndex, typedId: currentTypeIndex }))
        dispatch(saveRadioSelectAction({ categoryId: index, otherId: currentOtherIndex, typedId: currentTypeIndex }))

        break
      case 2:
        setCurrenOthertIndex(index)
        dispatch(getArticleListAction({ otherId: index, categoryId: currentCategoryIndex, typedId: currentTypeIndex }))
        dispatch(saveRadioSelectAction({ categoryId: currentCategoryIndex, otherId: index, typedId: currentTypeIndex }))
        break
      default:
        break
    }
  })

  useEffect(() => {
    dispatch(getMajorNoTreeListAction())
  }, [])

  const resetRadio = useMemoizedFn(() => {
    setCurrenOthertIndex(0)
    setCurrentCateIndex(0)
  })

  const navigate = useNavigate()
  const handlePublish = useMemoizedFn(() => {
    navigate('/main/community/writeArticle')
  })

  return (
    <RadioAreaWrapper>
      <div className=" mb-30px between">
        <div className="flex items-center">
          {types.map((item, index) => {
            return (
              <div
                key={index}
                className={classNames(
                  { active: currentTypeIndex === index },
                  {
                    'w-[80px] h-[40px]  mx-[5px] leading-[40px] text-center rounded-[20px] cursor-pointer bg-[#efefef] hover:bg-[var(--primary-color)] hover:text-white':
                      true
                  }
                )}
                onClick={(e) => handleTypeChange(e, index, 0)}>
                {item}
              </div>
            )
          })}
        </div>
        <Button type="primary" onClick={handlePublish}>
          去发表文章
        </Button>
      </div>
      <div className="rounded-[12px] overflow-hidden">
        <div className=" bg-[#f8f8f8] w-full">
          <div className="h-[20px] p-[20px] flex items-center">
            <div className="w-[50px]">类型：</div>
            <AppScrollView width={1}>
              {category.map((item: any, index: any) => {
                return (
                  <div
                    key={index}
                    className={classNames(
                      { 'bg-[#E1ECF9]  !text-[#1684FC]': currentCategoryIndex === index },
                      {
                        'text-[#666666]  rounded-[14px] px-[16px] py-[8px] hover:bg-[#E1ECF9]  hover:!text-[#1684FC] hover:cursor-pointer':
                          true
                      }
                    )}
                    onClick={(e) => handleTypeChange(e, index, 1)}>
                    {item}
                  </div>
                )
              })}
            </AppScrollView>
          </div>
        </div>
        <div className=" bg-[#f8f8f8] w-full">
          <div className="h-[20px] p-[20px] flex items-center">
            <div className="w-[50px]">其他：</div>
            <AppScrollView width={1}>
              {(majorNoTreeList || []).map((item, index: any) => {
                return (
                  <div
                    key={item.id}
                    className={classNames(
                      { 'bg-[#E1ECF9]  !text-[#1684FC]': currentOtherIndex === item.id },
                      {
                        'text-[#666666]  rounded-[14px] px-[16px] py-[8px] hover:bg-[#E1ECF9]  hover:!text-[#1684FC] hover:cursor-pointer':
                          true
                      }
                    )}
                    onClick={(e) => handleTypeChange(e, item.id, 2)}>
                    {item.majorName}
                  </div>
                )
              })}
            </AppScrollView>
          </div>
        </div>
      </div>
    </RadioAreaWrapper>
  )
}

export default memo(RadioArea)
