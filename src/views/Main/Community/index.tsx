/*
 * @Author: hqk
 * @Date: 2023-03-01 20:42:19
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-10 11:47:17
 * @Description:
 */
import React, { memo, useEffect, Suspense, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { CommunityWrapper } from './style'
import AppRemoteSelect from '@/components/AppRemoteSelect'
import RadioArea from './c-cpns/RadioArea'
import RandomToipList from './c-cpns/RandomToipList'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { getArticleListAction, resetArticleSearchOptionsAction } from '@/store/features/community'
import AppArticleList from '@/components/AppArticleList'
import { Spin } from 'antd'
import { Outlet, useLocation, useParams } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const Community: FC<IProps> = () => {
  const { radios, userId } = useAppSelector((state) => {
    return {
      radios: state.community.radios,
      userId: state.login.loginUser.id
    }
  }, useAppShallowEqual)

  const { pathname } = useLocation()
  const [isShowRoutes, setIsShowRoutes] = useState(false)

  const dispatch = useAppDispatch()
  const params = useParams()

  useEffect(() => {
    if (!params.id) {
      dispatch(getArticleListAction({}))
    }
    dispatch(resetArticleSearchOptionsAction())
    setIsShowRoutes(pathname.split('/').length >= 4)
  }, [pathname])

  useEffect(() => {
    return () => {
      dispatch(resetArticleSearchOptionsAction())
    }
  }, [])

  return (
    <CommunityWrapper>
      {!isShowRoutes ? (
        <>
          <div className="community_logo center">
            <AppRemoteSelect placeholder="请输入要搜索的闲聊/提问/提建议" />
          </div>
          <div className="w-[1200px] m-auto flex mt-[30px]">
            <div className="bg-white w-[270px] mr-[17px] h-fit rounded-[10px] shadow-lg">
              <RandomToipList />
            </div>
            <div className=" w-[915px]">
              <div className=" bg-white rounded-[10px] shadow-lg">
                <RadioArea />
              </div>
              <div className=" bg-white mt-[20px] rounded-[10px] shadow-lg ">
                <AppArticleList {...radios} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Suspense
          fallback={
            <Spin
              className="center [&>:nth-child(1)]:w-[64px] [&>:nth-child(1)]:h-[64px]"
              style={{
                height: '100vh',
                position: 'fixed',
                width: '100vw'
              }}
            />
          }>
          <Outlet />
        </Suspense>
      )}
    </CommunityWrapper>
  )
}

export default memo(Community)
