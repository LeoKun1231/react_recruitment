/*
 * @Author: hqk
 * @Date: 2023-03-31 21:18:30
 * @LastEditors: hqk
 * @LastEditTime: 2023-05-10 12:33:59
 * @Description:
 */
import React, { ElementRef, memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { ArticleWrapper } from './style'
import { Tabs, Pagination, Button } from 'antd'
import type { TabsProps } from 'antd'
import { useCreation, useMemoizedFn, useSafeState } from 'ahooks'
import ArticleReport from './ArticleReport'
import { IReportArticle } from '@/types/home/community'
import { useAppDispatch } from '@/hooks/useAppRedux'
import { deleteReportAction, getReportArticleListAction, recoverReportAction } from '@/store/features/admin'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import AppDrawer from '@/components/AppDrawer'
import ArticleDetail from '@/views/Main/Community/c-cpns/ArticleDetail'
import AppConfirmModal from '@/components/AppConfirmModal'

interface IProps {
  children?: ReactNode
}

const Article: FC<IProps> = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [pageSize, setPageSize] = useState(5)
  const [data, setData] = useState<IReportArticle[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [type, setType] = useState(1)
  const [articleId, setArticleId] = useState(-1)
  const [isDisabled, setIsDisabled] = useSafeState(false)

  const articleReportRef = useRef<ElementRef<typeof ArticleReport>>(null)
  const appDrawerRef = useRef<ElementRef<typeof AppDrawer>>(null)

  const deleteModalRef = useRef<ElementRef<typeof AppConfirmModal>>(null)
  const recoverModalRef = useRef<ElementRef<typeof AppConfirmModal>>(null)

  const dispatch = useAppDispatch()
  const loadData = useMemoizedFn(async (currentPage: number, type: number) => {
    const res = await dispatch(getReportArticleListAction({ page: 'article', type, pageSize, currentPage })).unwrap()
    if (res.code == 200) {
      setData(res.data.records)
      setTotalCount(res.data.totalCount)
    }
  })

  const handlePageChange = useMemoizedFn((current: number) => {
    setCurrentPage(current)
    loadData(current, type)
  })

  const onChange = useMemoizedFn((type: string) => {
    setType(parseInt(type))
    setData([])
    setCurrentPage(1)
    setIsDisabled(false)
    loadData(1, parseInt(type))
  })

  useEffect(() => {
    loadData(1, 1)
  }, [])

  useEffect(() => {
    const el = document.querySelector('.ant-tabs-content-holder')
    el?.scrollTo(0, 0)
  }, [type])

  const handleDelete = useMemoizedFn(() => {
    deleteModalRef.current?.show()
  })

  const handleRecover = useMemoizedFn(() => {
    recoverModalRef.current?.show()
  })

  const handleReportArtilce = useMemoizedFn((id: number) => {
    setArticleId(id)
    appDrawerRef.current?.showDrawer()
  })

  const handleDeleteConfirm = useMemoizedFn(async () => {
    const selects = articleReportRef.current?.getSelects()
    const res = await dispatch(deleteReportAction({ page: 'article', data: selects! })).unwrap()
    if (res.code == 200) {
      setCurrentPage(1)
      loadData(1, type)
      articleReportRef.current?.clear()
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  })

  const handleRecoverConfirm = useMemoizedFn(async () => {
    const selects = articleReportRef.current?.getSelects()
    const res = await dispatch(recoverReportAction({ page: 'article', data: selects! })).unwrap()
    if (res.code == 200) {
      setCurrentPage(1)
      loadData(1, type)
      articleReportRef.current?.clear()
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  })

  const handleChange = (select: number[]) => {
    setIsDisabled(select.length > 0)
  }

  const items: TabsProps['items'] = useCreation(
    useMemoizedFn(() => {
      return [
        {
          key: '1',
          label: `举报最多`,
          children: <ArticleReport data={data} ref={articleReportRef} onClick={handleReportArtilce} onChange={handleChange} />
        },
        {
          key: '2',
          label: `最新举报`,
          children: <ArticleReport data={data} ref={articleReportRef} onClick={handleReportArtilce} onChange={handleChange} />
        }
      ]
    }),
    [data]
  )
  return (
    <ArticleWrapper>
      <div className="px-20px py-40px bg-white flex flex-col h-[calc(100%-10px)] shadow-lg">
        <h2 className="p-0 m-0">文章举报管理</h2>
        <Tabs
          defaultActiveKey="1"
          className="mt-[20px] flex-1 h-[calc(100%-24px-32px-20px) overflow-hidden"
          items={items}
          onChange={onChange}
          tabBarExtraContent={
            <>
              <Button icon={<EditOutlined />} type="primary" onClick={handleRecover} disabled={!isDisabled}>
                恢复
              </Button>
              <Button type="primary" className="ml-10px" icon={<DeleteOutlined />} onClick={handleDelete} disabled={!isDisabled}>
                删除
              </Button>
            </>
          }
        />
        <div className="mt-20px center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalCount}
            onChange={handlePageChange}
            showTotal={(total) => `总共 ${total} 条数据`}
            showSizeChanger={false}
          />
        </div>
      </div>
      <AppDrawer ref={appDrawerRef} destroyOnClose isShowExtra={false}>
        <ArticleDetail isAdmin articleId={articleId} />
      </AppDrawer>
      <AppConfirmModal title="举报内容属实" onConfirm={handleDeleteConfirm} ref={deleteModalRef}>
        <div className="px-10px py-20px">删除后，文章不可恢复，请确定。</div>
      </AppConfirmModal>
      <AppConfirmModal title="举报内容不属实" onConfirm={handleRecoverConfirm} ref={recoverModalRef}>
        <div className="px-10px py-20px">删除举报信息，请确认。</div>
      </AppConfirmModal>
    </ArticleWrapper>
  )
}

export default memo(Article)
