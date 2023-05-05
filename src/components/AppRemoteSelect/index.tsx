/*
 * @Author: hqk
 * @Date: 2023-03-06 14:18:59
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-15 17:54:16
 * @Description:
 */
import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { RemoteSelectWrapper } from './style'
import { Empty, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { SelectProps } from 'antd'
import { useDispatch } from 'react-redux'
import { getArticleSearchResultAction, saveArticleSearchResult } from '@/store/features/community'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { useDebounce, useDebounceFn, useMemoizedFn } from 'ahooks'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  placeholder?: string
  style?: React.CSSProperties
}

const AppRemoteSelect: FC<IProps> = (props) => {
  const [value, setValue] = useState<string>()

  const { searchResults } = useAppSelector((state) => {
    return {
      searchResults: state.community.searchResults
    }
  }, useAppShallowEqual)

  const dispatch = useAppDispatch()

  const { run: handleSearch } = useDebounceFn((newValue: string) => {
    if (newValue == '') return
    dispatch(getArticleSearchResultAction(newValue))
  })

  const navigate = useNavigate()
  const handleChange = useMemoizedFn((id: string) => {
    navigate(`/main/community/articleDeatil/${id}`)
    dispatch(saveArticleSearchResult([]))
  })

  return (
    <RemoteSelectWrapper>
      <Select
        showSearch
        size="large"
        value={value}
        placeholder={props.placeholder}
        style={props.style}
        suffixIcon={<SearchOutlined />}
        defaultActiveFirstOption={false}
        showArrow={true}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        notFoundContent={null}
        options={searchResults.map((d) => ({
          value: d.id,
          label: d.title
        }))}
      />
    </RemoteSelectWrapper>
  )
}

export default memo(AppRemoteSelect)
