import React, { memo, Suspense, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import AppEditor from '@/components/AppEditor'
import { ArticleWrapper } from './style'
import { Avatar, Input, Button, Popover, notification } from 'antd'
import { UserOutlined, LinkOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { useMemoizedFn } from 'ahooks'
import TopicList from '../TopicList'
import { ITopic } from '@/types/home/community'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { publishArticleAction, resetArticleSearchOptionsAction } from '@/store/features/community'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
interface IProps {
  children?: ReactNode
}

const types = ['闲聊', '提问题', '提建议']

const WriteArticle: FC<IProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [title, setTitle] = useState('')
  const [html, setHtml] = useState('')
  const [text, setText] = useState('')
  const [topicText, setTopicText] = useState('')
  const [topicId, setTopicId] = useState(0)
  const [isTopicShow, setIsTopicShow] = useState(false)

  const ref = useRef<HTMLDivElement | null>(null)

  const dispatch = useAppDispatch()

  const { userId, avatar, majorId } = useAppSelector((state) => {
    return {
      userId: state.login.loginUser?.id,
      avatar: state.login.loginUser?.avatar,
      majorId: state.login.loginUser?.majorId
    }
  }, useAppShallowEqual)

  const [notify, contextHolder] = notification.useNotification()

  //处理类型切换
  const handleTypeChange = useMemoizedFn((_: any, index: number) => {
    setCurrentIndex(index)
  })

  //处理标题切换
  const handleTitleChange = useMemoizedFn((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.target.value)
  })

  //获取富文本内容
  const getEditorHtml = useMemoizedFn((editor: string, text: string) => {
    setHtml(editor)
    setText(text)
  })

  //处理话题切换
  const handleTopicChange = useMemoizedFn((item: ITopic) => {
    setTopicId(item.id)
    setTopicText(item.content)
  })

  const location = useLocation()

  useEffect(() => {
    if (location.state?.id) {
      setTopicId(location.state.id)
      setTopicText(location.state.name)
    }
    return () => {
      dispatch(resetArticleSearchOptionsAction())
    }
  }, [])

  //选中话题隐藏对话框
  useEffect(() => {
    if (topicText == '') return
    setIsTopicShow(false)
  }, [topicText])

  //选中话题显隐
  const handleTopicShowAndHide = useMemoizedFn(() => {
    setIsTopicShow(!isTopicShow)
  })

  const navigate = useNavigate()

  //提交
  const handlePublish = useMemoizedFn(async () => {
    if (title.length <= 4) {
      notify.error({
        key: 'title_error',
        message: '标题内容不能少于五个字符'
      })
      return
    }
    if (text.length <= 9) {
      notify.error({
        key: 'content_error',
        message: '正文内容不能少于10个字符'
      })
      return
    }
    const res = await dispatch(
      publishArticleAction({
        content: html,
        userId,
        title,
        typeId: currentIndex + 1,
        topicId,
        majorId
      })
    ).unwrap()
    if (res.code == 200) {
      navigate(-1)
    }
  })

  const handleBack = useMemoizedFn(() => {
    navigate(-1)
  })

  return (
    <ArticleWrapper>
      {contextHolder}
      <div
        ref={ref}
        className="inner w-[1008px] m-auto border-1 border-solid border-gray-200 rounded-5 py-[10px] px-[24px] flex flex-col items-center shadow-2xl bg-white">
        <div className="w-[960px] m-auto h-[80px] between border">
          {avatar ? <Avatar size={40} src={avatar} /> : <Avatar size={40} icon={<UserOutlined />} />}
          <div className="center ">
            <div className="font-600 text-[18px]">类型：</div>
            {types.map((item, index) => {
              return (
                <div
                  key={index}
                  className={classNames(
                    { active: currentIndex === index },
                    { 'w-[60px] h-[30px] mx-[5px] leading-[30px] text-center rounded-[16px] cursor-pointer bg-[#efefef]': true }
                  )}
                  onClick={(e) => handleTypeChange(e, index)}>
                  {item}
                </div>
              )
            })}
            <Button icon={<ArrowLeftOutlined />} type="primary" onClick={handleBack} className="ml-20px">
              返回
            </Button>
          </div>
        </div>
        <div className="title flex items-center w-[960px] border py-[5px]">
          <Input showCount maxLength={60} onChange={handleTitleChange} placeholder="请输入标题" />
        </div>
        <AppEditor getEdtiorHtml={getEditorHtml} />

        <div className="h-[80px] w-[960px] between">
          <div className="topic text-[20px] cursor-pointer text-[var(--primary-color)] hover:opacity-50" onClick={handleTopicShowAndHide}>
            <LinkOutlined />
            <Popover
              placement="top"
              title={<div className="text-[18px] pb-[10px]">选择话题</div>}
              content={<TopicList onTopic={handleTopicChange} />}
              trigger="click"
              open={isTopicShow}
              getPopupContainer={() => ref.current as any}>
              <span className="ml-[6px]">{topicText.length > 0 ? topicText : '添加属于你的话题'}</span>
            </Popover>
          </div>
          <Button className="px-[30px]  h-[40px] font-600 text-[18px]" type="primary" onClick={handlePublish}>
            发布
          </Button>
        </div>
      </div>
    </ArticleWrapper>
  )
}

export default memo(WriteArticle)
