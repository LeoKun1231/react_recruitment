/*
 * @Author: hqk
 * @Date: 2023-02-16 11:20:26
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-14 17:59:33
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import ErrorImg from '@/assets/img/error.jpg'
import { Button } from 'antd'
import { LeftOutlined, ReloadOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const NotFound: FC<IProps> = () => {
  const navigate = useNavigate()

  const handleRefresh = useMemoizedFn(() => {
    location.reload()
  })

  const handleBackToHome = useMemoizedFn(() => {
    navigate('/main/home')
  })

  return (
    <div className="h-100vh flex justify-center items-center border-1px border-solid border-#eee">
      <div className="not-found__body flex flex-col items-center px-20 py-12 border-gray-50 border-2 rounded-3xl shadow-xl">
        <div className="not-found__bg">
          <img src={ErrorImg} />
        </div>
        <div className=" text-4xl mt-6">糟糕，网页出现故障或不存在！</div>
        <div className=" text-2xl my-8 text-center">我们正在尝试解决您遇到的错误，请重试。 🤗</div>
        <div className="center">
          <Button icon={<ReloadOutlined />} className="mr-20px" type="primary" onClick={handleRefresh}>
            刷新
          </Button>
          <Button icon={<LeftOutlined />} className="ml-20px" type="primary" onClick={handleBackToHome}>
            返回首页
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(NotFound)
