import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { TopicDetailWrapper } from './style'
import { useNavigate, useParams } from 'react-router-dom'
import { FireFilled, LeftOutlined, EyeOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { Button, Divider, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import AppArticleList from '@/components/AppArticleList'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppRedux'
import { getTopicDetailAction, resetArticleSearchOptionsAction } from '@/store/features/community'
import { shallowEqual } from 'react-redux'
import { formatNumber2KW } from '@/utils/number-format'

interface IProps {
  children?: ReactNode
}

const TopicDetail: FC<IProps> = () => {
  const params = useParams() as any
  const [id, setId] = useState(() => {
    return params.id
  })

  const navigate = useNavigate()
  const handleBack = useMemoizedFn(() => {
    navigate(-1)
  })

  const { topicDetail, articleList } = useAppSelector((state) => {
    return {
      topicDetail: state.community.topicDetail,
      articleList: state.community.articleList
    }
  }, shallowEqual)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setId(params.id)
  }, [params.id])

  useEffect(() => {
    dispatch(getTopicDetailAction(params.id))
  }, [])

  const goToPublishArticle = useMemoizedFn((e: React.MouseEvent, id: number, name: string) => {
    navigate('/main/community/writeArticle', {
      state: {
        id,
        name
      }
    })
  })

  const items: TabsProps['items'] = [
    {
      key: '0',
      label: <div className="text-[16px] px-[14px]">全部</div>,
      children: id && <AppArticleList typedId={0} topicId={id} />
    },
    {
      key: '1',
      label: <div className="text-[16px] px-[14px]">最热</div>,
      children: id && <AppArticleList typedId={1} topicId={id} />
    },
    {
      key: '2',
      label: <div className="text-[16px] px-[14px]">最新</div>,
      children: id && <AppArticleList typedId={2} topicId={id} />
    }
  ]

  useEffect(() => {
    return () => {
      dispatch(resetArticleSearchOptionsAction())
    }
  }, [])

  return (
    <TopicDetailWrapper>
      <div className="m-auto w-[1200px] pt-[40px]">
        <div className=" bg-white shadow-lg rounded-[12px] px-[28px] py-[16px]">
          <div className="back  text-[18px] border pb-[12px] flex items-center hover:cursor-pointer hover:opacity-70" onClick={handleBack}>
            <LeftOutlined className="text-[14px] text-[var(--text-gray-color)]" />
            <div className="ml-[6px]">返回</div>
          </div>
          <div className="between">
            <div>
              <h1 className="mt-[16px]">#{topicDetail.name}</h1>
              <div className="mt-[16px] text-[14px] text-[var(--text-gray-color)] ">
                <FireFilled />
                <span className="ml-[4px]">{formatNumber2KW(topicDetail.relationCount)} 参与</span>
                <Divider type="vertical" />
                <EyeOutlined />
                <span className="ml-[4px]">{formatNumber2KW(topicDetail.watchCount)} 阅读</span>
              </div>
            </div>
            <Button type="primary" onClick={(e) => goToPublishArticle(e, topicDetail.id, topicDetail.name)}>
              去发表相关话题的文章
            </Button>
          </div>
        </div>

        <div className="content bg-white shadow-lg rounded-[12px] px-[28px] py-[16px] mt-[30px]">
          <Tabs defaultActiveKey="0" items={items} destroyInactiveTabPane />
        </div>
      </div>
    </TopicDetailWrapper>
  )
}

export default memo(TopicDetail)
