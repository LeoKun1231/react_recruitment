import React, { ElementRef, memo, useContext, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { JobDetailWrapper } from './style'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMemoizedFn } from 'ahooks'
import { IHomeJobDetail } from '@/types/home/home'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import {
  addCompanyAndJobWatchCountAction,
  addResumeToJobAction,
  changeAppChatShowAction,
  checkIsChatAction,
  getHomeJobDetailAction,
  saveChatRecordAction
} from '@/store'
import { Affix, Avatar, Button, Modal, Typography } from 'antd'
import AppMap from '@/components/AppMap'
import { Icon } from '@iconify-icon/react'
import { CarryOutOutlined, CommentOutlined, LeftOutlined, MailOutlined } from '@ant-design/icons'
import JobRelatiobList from '../JobRelatiobList'
import AppRoleControl from '@/components/AppRoleControl'
import { ROLECODE } from '@/constant'
import { TimContext } from '@/Context'
import TIM from 'tim-js-sdk/tim-js-friendship'

const { Title, Paragraph } = Typography
interface IProps {
  children?: ReactNode
}

const JobDetail: FC<IProps> = () => {
  const {
    state: { jobId }
  } = useLocation()
  const [data, setData] = useState<IHomeJobDetail>()
  const [isSend, setIsSend] = useState(false)
  const [jobType, setJobType] = useState<string[]>([])

  const tim = useContext(TimContext)

  const appMapRef = useRef<ElementRef<typeof AppMap>>(null)

  const dispatch = useAppDispatch()

  const { id } = useAppSelector((state) => {
    return {
      id: state.login.loginUser.id
    }
  }, useAppShallowEqual)

  const loadData = useMemoizedFn(async () => {
    const res = await dispatch(getHomeJobDetailAction(jobId)).unwrap()
    if (res.code == 200) {
      setData(res.data.data)
      const address = res.data.data.address
      setIsSend(res.data.data.isSend)
      setJobType(res.data.data.jobType)
      if (address) {
        setTimeout(() => {
          appMapRef.current?.setAddress({ latitude: address[1], longitude: address[0] })
        }, 1000)
      }
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    loadData()
    dispatch(addCompanyAndJobWatchCountAction({ type: 2, id: jobId }))
  }, [jobId])

  const navigate = useNavigate()
  const handleBack = useMemoizedFn(() => {
    navigate('/main/home', { replace: true })
  })

  const handleResume = useMemoizedFn(async () => {
    const res = await dispatch(addResumeToJobAction({ jobId: jobId, userId: id })).unwrap()

    if (res.code != 200) {
      Modal.error({ content: '请先上传简历', title: '提醒' })
    } else {
      setIsSend(true)
    }
  })

  const handleChat = useMemoizedFn(async () => {
    const res = await dispatch(checkIsChatAction({ userId: id!, jobId: jobId! })).unwrap()
    if (res.code != 200) {
      dispatch(changeAppChatShowAction(true))
      return
    }
    const message = tim?.createTextMessage({
      to: data?.hrId + '',
      conversationType: TIM.TYPES.CONV_C2C,
      // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
      // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
      // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
      payload: {
        text: '您好，我对你发布的' + data?.jobName + '非常感兴趣,希望能加入贵公司'
      }
      // v2.20.0起支持C2C消息已读回执功能，如果您发消息需要已读回执，需购买旗舰版套餐，并且创建消息时将 needReadReceipt 设置为 true
      // needReadReceipt: true
      // 消息自定义数据（云端保存，会发送到对端，程序卸载重装后还能拉取到，v2.10.2起支持）
      // cloudCustomData: 'your cloud custom data'
    })
    // 2. 发送消息
    tim?.sendMessage(message!).then(() => {
      dispatch(saveChatRecordAction({ userId: id!, jobId: jobId! }))
      dispatch(changeAppChatShowAction(true))
    })
  })

  return (
    <JobDetailWrapper>
      <div className="h-210px bg-[#57a8ff96]">
        <div className="w-[1200px] m-auto h-full">
          <div className="between h-full">
            <div className="flex items-center">
              <div className=" h-80px my-10px flex flex-col justify-between">
                <div className="flex items-center">
                  <div className="text-[28px] text-white">{data?.jobName}</div>
                  <div className="text-[28px] text-[#0099CC] ml-60px">
                    {data?.startMoney}K~{data?.endMoney}K·{data?.moneyMonth}薪
                  </div>
                </div>
                <div className=" flex items-center text-[16px] text-white">
                  <div className="company_item">{data?.jobType.join('/')}</div>
                  <div className="company_item ">
                    {data?.city[0]}-{data?.city[1]}
                  </div>
                  <div className="company_item ">{data?.jobRequire}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center text-white">
              <div className="mr-30px text-right">
                <div className="text-18px my-10px">{data?.companyName}</div>
                <div className="text-18px my-10px">{data?.size}</div>
                <div className="text-18px my-10px flex items-center">
                  <div className="mr-10px">浏览次数 : </div>
                  <div>{data?.watchCount != undefined ? data?.watchCount + 1 : 0}</div>
                </div>
              </div>

              <Avatar src={data?.avatar} shape="square" size={100} />
            </div>
          </div>
        </div>
      </div>
      <div className="content pt-20px ">
        <div className="w-[1200px] m-auto flex">
          <div className="w-[880px] ">
            <div className=" bg-white shadow-xl rounded-[12px] px-[30px] py-[24px]">
              <Title level={4} className="!my-0px">
                职位标签
              </Title>
              <div className="flex my-20px">
                {data?.tag?.map((item) => {
                  return (
                    <div key={item} className="grayItem">
                      {item}
                    </div>
                  )
                })}
              </div>
              <Title level={4} className="!my-0px">
                职位描述
              </Title>
              <div dangerouslySetInnerHTML={{ __html: data?.jobDesc as any }}></div>
              <Title level={4} className="mt-0px">
                工作地址
              </Title>
              <div>
                <div className="text-[#999] text-[16px] flex items-center pb-10px">
                  <Icon icon="gis:position" />
                  <span className="ml-10px"> {data?.addressName}</span>
                </div>
                <AppMap ref={appMapRef} />
              </div>
            </div>
            <div className="bg-white shadow-2xl rounded-[12px] px-[30px] py-[24px] mt-20px">
              <Title level={4} className="mt-0px">
                公司描述
              </Title>
              <Paragraph className="text-[16px]" ellipsis={{ rows: 5, expandable: true, symbol: '展开' }}>
                {data?.desc}
              </Paragraph>
              <Title level={4} className="mt-0px">
                公司信息
              </Title>
              <div className="flex items-center bg-[#f2f3f5] py-14px justify-around">
                <div className="flex items-center">
                  <div className="text-[16px] mr-30px">负责人:</div>
                  <div className="text-[#999]"> {data?.linkMan}</div>
                </div>

                <div className="flex items-center">
                  <div className="text-[16px] ml-100px mr-30px">公司官网:</div>
                  <a className="text-[#999]" href={'https://' + data?.govUrl} target="_blank" rel="noreferrer">
                    {data?.govUrl}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-20px flex-1 ">
            <Button type="primary" className="w-full  mb-20px  " size="large" onClick={handleBack}>
              <LeftOutlined /> 返回首页
            </Button>
            <AppRoleControl code={[ROLECODE.STUDENT]}>
              <div className="flex items-center justify-around  mb-20px ">
                <Button type="primary" className="w-[40%]" size="large" onClick={handleChat}>
                  <CommentOutlined /> 沟通
                </Button>
                <Button type="primary" className="w-[40%]" size="large" onClick={handleResume} disabled={isSend}>
                  <MailOutlined /> {isSend ? '已投递' : '投递简历'}
                </Button>
              </div>
            </AppRoleControl>
            <div className="px-[20px] py-[20px] h-fit bg-white rounded-[12px] w-[280px] shadow-lg ">
              <div className="font-600 text-[18px]">
                <CarryOutOutlined className="text-[#0099CC]" /> 岗位福利
              </div>
              <div className="my-10px py-12px flex flex-wrap between bg-[#f2f3f5] text-[#666] px-12px rounded-[8px]">
                {data?.weal.map((item) => {
                  return (
                    <div className="grayItem bg-[#e2e2e2] w-100px my-8px text-center truncate" key={item}>
                      {item}
                    </div>
                  )
                })}
              </div>
            </div>
            <JobRelatiobList jobId={jobId} firstLabel={jobType[0]} secondLabel={jobType[1]} thirdLabel={jobType[2]} isThird />
          </div>
        </div>
      </div>
    </JobDetailWrapper>
  )
}

export default memo(JobDetail)
