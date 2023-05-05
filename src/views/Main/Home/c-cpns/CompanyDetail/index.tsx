import React, { ElementRef, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { CompanyDetailWrapper } from './style'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMemoizedFn } from 'ahooks'
import { IDetailJobList, IHomeCompanyDetail } from '@/types/home/home'
import { useAppDispatch } from '@/hooks/useAppRedux'
import {
  addCompanyAndJobWatchCountAction,
  getCompanyDetailJobListAction,
  getCompanyDetailTypeAction,
  getHomeCompanyDetailByIdAction
} from '@/store'
import { Affix, Avatar, Button, Typography } from 'antd'
import ImageGallery from 'react-image-gallery'
import AppMap from '@/components/AppMap'
import { Icon } from '@iconify-icon/react'
import { CarryOutOutlined, DownOutlined, LeftOutlined, LinkOutlined, UserOutlined } from '@ant-design/icons'
import AppSectionTab from '@/components/AppSectionTab'
import { useGoToJob } from '@/hooks/useGoToJob'

const { Title, Paragraph } = Typography
interface IProps {
  children?: ReactNode
}

const CompanyDetail: FC<IProps> = () => {
  const {
    state: { companyId }
  } = useLocation()
  const [data, setData] = useState<IHomeCompanyDetail>()
  const [images, setImages] = useState<any[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [jobList, setJobList] = useState<IDetailJobList[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [totalCount, setTotalCount] = useState(6)
  const [type, setType] = useState('')

  const appMapRef = useRef<ElementRef<typeof AppMap>>(null)

  const dispatch = useAppDispatch()

  const loadJobListData = useMemoizedFn(async (type: string, isPageChange: boolean, current: number) => {
    const jobListRes = await dispatch(getCompanyDetailJobListAction({ currentPage: current, pageSize, companyId, type })).unwrap()
    if (jobListRes.code == 200) {
      setTotalCount(jobListRes.data.totalCount)
      if (isPageChange) {
        setJobList(jobListRes.data.records)
      } else {
        setJobList((c) => [...c, ...jobListRes.data.records])
      }
    }
  })

  const loadData = useMemoizedFn(async () => {
    const res = await dispatch(getHomeCompanyDetailByIdAction(companyId)).unwrap()
    if (res.code == 200) {
      setData(res.data.data)
      const imgs = res.data.data?.companyUrl?.map((item) => ({
        original: item,
        thumbnail: item,
        originalHeight: 440,
        thumbnailHeight: 60
      }))
      setImages(imgs!)
      const address = res.data.data.address
      if (address) {
        setTimeout(() => {
          appMapRef.current?.setAddress({ latitude: address[1], longitude: address[0] })
        }, 1000)
      }
    }
    const typeRes = await dispatch(getCompanyDetailTypeAction(companyId)).unwrap()
    if (typeRes.code == 200) {
      setTypes(typeRes.data)
      setType(typeRes.data[0])
      loadJobListData(typeRes.data[0], true, 1)
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    loadData()
    dispatch(addCompanyAndJobWatchCountAction({ type: 1, id: companyId }))
  }, [])

  const onScreenChange = useMemoizedFn((isOpen: boolean) => {
    if (isOpen) {
      const imgs = data?.companyUrl?.map((item) => ({
        original: item,
        thumbnail: item,
        // originWidth: 600,
        // originalHeight: 440,
        // sizes: [200, 400],
        // thumbnailWidth: 100,
        thumbnailHeight: 60
      }))
      if (imgs) {
        setImages(imgs)
      }
    } else {
      const imgs = data?.companyUrl?.map((item) => ({
        original: item,
        thumbnail: item,
        // originWidth: 600,
        originalHeight: 440,
        // sizes: [200, 400],
        // thumbnailWidth: 100,
        thumbnailHeight: 60
      }))
      if (imgs) {
        setImages(imgs)
      }
    }
  })

  const handleTabClick = useMemoizedFn(async (index: number, item: string) => {
    loadJobListData(item, true, 1)
    setType(item)
    setPageSize(6)
    setCurrentPage(1)
  })

  const navigate = useNavigate()
  const handleBack = useMemoizedFn(() => {
    navigate('/main/home', { replace: true })
  })

  const handleMore = useMemoizedFn(() => {
    setCurrentPage((c) => c + 1)
    loadJobListData(type, false, currentPage + 1)
  })

  const { handleGoToJobDetail } = useGoToJob()

  return (
    <CompanyDetailWrapper>
      <div className="h-210px bg-[#57a8ff96]">
        <div className="w-[1200px] m-auto h-full">
          <div className="between h-full">
            <div className="flex items-center">
              <Avatar src={data?.avatar} shape="square" size={100} />
              <div className="ml-40px h-80px my-10px flex flex-col justify-between">
                <div className="text-[28px] ">{data?.fullName}</div>
                <div className=" flex items-center text-[16px] text-white">
                  <div className="company_item">{data?.category}</div>
                  <div className="company_item">{data?.size}</div>
                  <div className="company_item">{data?.companyType}</div>
                  <div className="company_item ">
                    {data?.city[0]}-{data?.city[1]}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center text-white">
              <div className="center flex-col pb-10px hover:cursor-pointer">
                <div className="text-18px my-10px">浏览次数</div>
                <div className="text-[20px]">{data?.watchCount != undefined ? data?.watchCount + 1 : 0}</div>
              </div>
              <div className="center flex-col pb-10px mx-20px hover:cursor-pointer">
                <div className="text-18px my-10px">招聘职位</div>
                <div className="text-[20px]">{data?.jobCount || 1}</div>
              </div>
              <div className="center flex-col pb-10px hover:cursor-pointer">
                <div className="text-18px my-10px">招聘者数</div>
                <div className="text-[20px]">{data?.hrCount || 1}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content pt-20px">
        <div className="w-[1200px] m-auto flex">
          <div className="w-[800px]  bg-white shadow-xl rounded-[12px] px-[30px] py-[24px]">
            <Title level={4} className="mt-0px">
              公司简介
            </Title>
            <Paragraph className="text-[16px]" ellipsis={{ rows: 5, expandable: true, symbol: '展开' }}>
              {data?.desc}
            </Paragraph>
            <Title level={4} className="mt-0px">
              公司照片
            </Title>
            <div className="img">
              {images && images?.length > 0 && <ImageGallery onScreenChange={onScreenChange as any} autoPlay items={images as any} />}
            </div>
            <Title level={4} className="mt-0px">
              公司地址
            </Title>
            <div>
              <div className="text-[#999] text-[16px] flex items-center pb-10px">
                <Icon icon="gis:position" />
                <span className="ml-10px"> {data?.addressName}</span>
              </div>
              <AppMap ref={appMapRef} />
            </div>
          </div>
          <Affix offsetTop={100}>
            <div className="ml-20px flex-1 ">
              <Button type="primary" className="w-full mb-20px " size="large" onClick={handleBack}>
                <LeftOutlined /> 返回首页
              </Button>
              <div className="px-[20px] py-[20px] h-fit bg-white rounded-[12px] w-[280px] shadow-lg ">
                <div className="font-600 text-[18px]">
                  <UserOutlined className="text-[#0099CC]" /> 公司老板
                </div>
                <div className="my-10px py-12px bg-[#f2f3f5] text-[#666] px-12px rounded-[8px]">{data?.linkman}</div>
                <div className="font-600 text-[18px]">
                  <LinkOutlined className="text-[#0099CC]" /> 公司官网
                </div>
                <a
                  className="display-block text-[var(--hover-color)] my-10px py-12px bg-[#f2f3f5]  px-12px rounded-[8px]"
                  target="_blank"
                  href={'https://' + data?.govUrl}
                  rel="noreferrer">
                  {data?.govUrl}
                </a>
                <div className="font-600 text-[18px]">
                  <CarryOutOutlined className="text-[#0099CC]" /> 公司福利
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
            </div>
          </Affix>
        </div>
      </div>
      <div className="w-[1200px] mt-30px m-auto px-20px">
        <div className="bg-white shadow-2xl rounded-[12px] px-[30px] py-[24px] w-[800px] ">
          <Title level={4} className="mt-0px">
            公司岗位
          </Title>
          <AppSectionTab tabClick={handleTabClick} customClass="!ml-0px" tabNames={types} />
          <>
            {jobList.map((item) => {
              return (
                <div
                  key={item.jobId}
                  onClick={() => handleGoToJobDetail(item.jobId)}
                  className="bg-[#fbfbfb] border-1 border-solid border-[#eee]  px-30px py-20px my-20px rounded-8px shadow-sm transition-all duration-600 hover:shadow-2xl hover:cursor-pointer ">
                  <div className="hoverBlue w-full">
                    <div className="between  py-10px text-20px items-center">
                      <div className="truncate ">{item.jobName}</div>
                      <div className=" text-[#0099CC] ml-30px">
                        {item.startMoney}K~{item.endMoney}K·{item.moneyMonth}薪
                      </div>
                    </div>
                    <div className="flex pb-12px">
                      {item.tag.map((tag) => {
                        return (
                          <div
                            title={tag}
                            className="border-1  max-w-70px truncate border-#eee border-solid px-8px py-4px mr-8px text-[#999]"
                            key={tag}>
                            {tag}
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex pb-6px">
                      {item.weal.slice(0, 8).map((weal) => {
                        return (
                          <div title={weal} className="grayItem max-w-70px truncate " key={weal}>
                            {weal}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
            {totalCount > jobList.length && (
              <div className="center mt-[30px] mb-[20px]">
                <Button size="large" className="!px-40px" onClick={handleMore}>
                  查看更多
                  <DownOutlined />
                </Button>
              </div>
            )}
          </>
        </div>
      </div>
    </CompanyDetailWrapper>
  )
}

export default memo(CompanyDetail)
