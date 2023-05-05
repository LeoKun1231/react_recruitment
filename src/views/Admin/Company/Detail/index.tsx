import React, { memo, useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { DetailWrapper } from './style'
import { Result, Button } from 'antd'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { getCompanyStatusAction } from '@/store/features/admin'
import CompanyInfo from './CompanyInfo'
import { useMemoizedFn } from 'ahooks'
interface IProps {
  children?: ReactNode
}

const Detail: FC<IProps> = () => {
  const [companyStatus, setCompanyStatus] = useState(-1)
  const { userId } = useAppSelector((state) => {
    return {
      userId: state.login.loginUser.id
    }
  }, useAppShallowEqual)

  const [reason, setReason] = useState('')

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getCompanyStatusAction(userId))
      .unwrap()
      .then((res) => {
        const { status, reason } = res.data
        setCompanyStatus(status)
        setReason(reason)
      })
  }, [userId])

  const changeStatus = useMemoizedFn((id: number) => {
    setCompanyStatus(id)
  })

  return (
    <DetailWrapper className="shadow-lg px-40px py-20px flex flex-col">
      {companyStatus == 0 && <CompanyInfo userId={userId} onSuccess={() => changeStatus(1)} />}
      {companyStatus == 1 && <Result status="success" title="已经成功提交" subTitle="请等待审核" />}
      {companyStatus == 2 && (
        <Result
          status="success"
          title="审核通过"
          extra={[
            <Button type="primary" key="console" onClick={() => changeStatus(0)}>
              去编辑页面
            </Button>,
            <Button type="primary" key="look" onClick={() => changeStatus(4)}>
              去查看详情
            </Button>
          ]}
        />
      )}
      {companyStatus == 3 && (
        <Result
          status="error"
          title="审核未通过"
          subTitle={reason}
          extra={[
            <Button type="primary" key="console" onClick={() => changeStatus(0)}>
              去修改
            </Button>
          ]}
        />
      )}
      {companyStatus == 4 && <CompanyInfo disabled userId={userId} onSuccess={() => changeStatus(1)} isShowEdit />}
    </DetailWrapper>
  )
}

export default memo(Detail)
