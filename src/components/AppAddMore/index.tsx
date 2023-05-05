import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { AppAddMoreWrapper } from './style'
import AppSectionHeader from '@/components/AppSectionHeader'
import { Button, Form } from 'antd'
import { useMemoizedFn } from 'ahooks'
import { DeleteOutlined } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'

interface IProps {
  children?: ReactNode
}
const AppAddMore = (
  Component: FC<{ name: string; formData: any }>,
  { initialState, AddObj, title, btnText }: { AddObj: any; initialState: any; title: string; btnText: string }
) => {
  return memo((props: IProps) => {
    const [list, setList] = useState<any[]>(() => {
      return [...initialState]
    })

    const handleDelete = (e: React.MouseEvent, id: number) => {
      const arr = [...list]
      const newArr = arr.filter((item) => item.id != id)
      setList(newArr)
    }

    useEffect(() => {
      console.log(list)
    }, [list])

    const handleAdd = useMemoizedFn(() => {
      setList([
        ...list,
        {
          id: uuidv4(),
          ...AddObj
        }
      ])
    })

    const handleFormChange = useMemoizedFn((name, info) => {
      list[parseInt(name.split('form')[1])][info.changedFields[0].name.toString()] = info.changedFields[0].value
      console.log(list)
    })

    return (
      <AppAddMoreWrapper>
        <AppSectionHeader title={title} />
        <Form.Provider onFormChange={handleFormChange}>
          {list.map((item, index) => {
            return (
              <div key={item.id}>
                <div className="h-[28px] leading-[28px] text-[var(--primary-color)] text-[16px] center">
                  {title + (index + 1)}
                  {list.length > 1 && <DeleteOutlined className="ml-[6px]  hoverSlow" onClick={(e) => handleDelete(e, item.id)} />}
                </div>
                <Component name={index + ''} formData={item} {...props} />
              </div>
            )
          })}
        </Form.Provider>
        <Button type="primary" className="my-[10px]" onClick={handleAdd}>
          添加{btnText}
        </Button>
      </AppAddMoreWrapper>
    )
  })
}

export default AppAddMore
