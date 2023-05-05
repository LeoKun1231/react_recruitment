/*
 * @Author: hqk
 * @Date: 2023-04-10 19:04:10
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-12 19:20:10
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HomeSectionWrapper } from './style'
import { Button, Card, List, Skeleton } from 'antd'
import { ArrowDownOutlined, DownOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
interface IProps {
  children?: ReactNode
  renderItem: (item: any) => ReactNode
  data: any
  title?: string
  count: number
  className?: string
  onMore: () => void
}

const HomeSection: FC<IProps> = (props) => {
  const { renderItem, data, title, count, onMore, className } = props
  const handleMore = useMemoizedFn(() => {
    onMore && onMore()
  })
  return (
    <HomeSectionWrapper className={className}>
      {title && <h1 className="text-center mb-[30px]">{title}</h1>}
      <div className="px-20px flex ">
        <List
          grid={{
            gutter: 20,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3
          }}
          className="w-full"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card className="shadow-lg">{renderItem && renderItem(item)}</Card>
            </List.Item>
          )}
        />
      </div>
      {count > data.length && (
        <div className="center mt-[30px] mb-[60px]">
          <Button size="large" className="!px-40px" onClick={handleMore}>
            查看更多
            <DownOutlined />
          </Button>
        </div>
      )}
    </HomeSectionWrapper>
  )
}

export default memo(HomeSection)
