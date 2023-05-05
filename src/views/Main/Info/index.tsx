/*
 * @Author: hqk
 * @Date: 2023-04-16 19:31:51
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-23 12:46:52
 * @Description:
 */

import React, { ElementRef, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { InfoWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux'
import { Avatar, Menu } from 'antd'
import {
  ScheduleOutlined,
  SmileOutlined,
  UserOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  FilePdfOutlined,
  SettingOutlined,
  MessageOutlined
} from '@ant-design/icons'
import { ROLECODE } from '@/constant'
import {} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useMemoizedFn, useSafeState } from 'ahooks'
import BaseInfo from './BaseInfo'
import PasswordChange from './PasswordChange'
import MineResume from './MineResume'
import ChatJob from './ChatJob'
import MineArticle from './MineArticle'
import AppUploadImage from '@/components/AppUploadImage'
import { changeLoginUserAction } from '@/store'
interface IProps {
  children?: ReactNode
}

const getRoleName = (roleId: number) => {
  let roleName: any = ''
  switch (roleId) {
    case ROLECODE.ADMIN:
      roleName = '管理员'
      break
    case ROLECODE.BOSS:
      roleName = 'Boss'
      break
    case ROLECODE.TEACHER:
      roleName = '老师'
      break
    case ROLECODE.STUDENT:
      roleName = '学生'
      break
    case ROLECODE.HR:
      roleName = 'HR'
      break
    default:
      break
  }
  return roleName
}

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}
type MenuItem = Required<MenuProps>['items'][number]

const Info: FC<IProps> = () => {
  const [key, setKey] = useState('1')
  const appUploadRef = useRef<ElementRef<typeof AppUploadImage>>(null)
  const [items, setItems] = useSafeState([
    getItem('个人资料', '1', <UserOutlined />),
    getItem('修改密码', '2', <SettingOutlined />),
    getItem('发表的文章', '5', <MessageOutlined />)
  ])

  const { avatar, nickName, userName, majorName, roleId } = useAppSelector((state) => {
    return {
      avatar: state.login.loginUser.avatar,
      nickName: state.login.loginUser.nickName,
      userName: state.login.loginUser.userName,
      majorName: state.login.loginUser.majorName,
      roleId: state.login.loginUser.roleId
    }
  })

  const handleSelect = useMemoizedFn(({ key }) => {
    setKey(key)
  })

  useEffect(() => {
    if (avatar) {
      appUploadRef.current?.setImages([avatar as any])
    } else {
      appUploadRef.current?.setImages(['https://hqk10.oss-cn-hangzhou.aliyuncs.com/user.png' as any])
    }
  }, [avatar])

  useEffect(() => {
    if (roleId) {
      if (roleId == ROLECODE.STUDENT) {
        setItems([...items, getItem('我的简历', '3', <FilePdfOutlined />), getItem('沟通过的职位', '4', <MessageOutlined />)])
      }
    }
  }, [roleId])

  const dispatch = useAppDispatch()

  const handleSuccess = useMemoizedFn((url: string) => {
    dispatch(changeLoginUserAction({ avatar: url }))
  })

  return (
    <InfoWrapper>
      <div className="bg-#e8f4ff h-210px center flex-col border-b-1px border-b-solid border-b-#eee">
        <div className="flex">
          {/* <Avatar src={avatar} size={100} className="border" /> */}
          <AppUploadImage
            listType="picture-circle"
            ref={appUploadRef}
            action={import.meta.env.VITE_BASE_URL + '/acl/user/updateAvatar'}
            maxCount={1}
            onSuccess={handleSuccess}
          />
        </div>
        <div className="mt-20px flex text-[18px] text-[#666] items-center">
          {majorName && (
            <>
              <div className="mr-10px">
                <ScheduleOutlined />
                {majorName}
              </div>
            </>
          )}

          <div className="mr-10px flex items-center">
            <ScheduleOutlined className="mr-8px" />
            <div className=""> {getRoleName(roleId)}</div>
          </div>
          {nickName && (
            <>
              <div className="mr-10px flex items-center">
                <UserOutlined className="mr-8px" />
                <div className=""> {nickName}</div>
              </div>
            </>
          )}
          {userName && (
            <>
              <div className="mr-10px flex items-center">
                <SmileOutlined className="mr-8px" />
                <div className=""> {userName}</div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="my-content">
        <div className="m-auto h-[calc(100%-40px)] pt-40px w-[1200px] flex">
          <div className="w-[200px] mr-20px bg-[white]  shadow-lg px-4px py-20px">
            <Menu
              className="w-full"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="light"
              items={items}
              onSelect={handleSelect}
            />
          </div>
          <div className="flex-1 bg-[white]  shadow-lg">
            {key == '1' && <BaseInfo />}
            {key == '2' && <PasswordChange />}
            {key == '3' && <MineResume />}
            {key == '4' && <ChatJob />}
            {key == '5' && <MineArticle />}
          </div>
        </div>
      </div>
    </InfoWrapper>
  )
}

export default memo(Info)
