/*
 * @Author: hqk
 * @Date: 2023-03-23 10:58:50
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-23 11:05:39
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { TemplatePreviewWrapper } from './style'
import { Image, Button } from 'antd'
import TemplateV1 from '@/assets/img/template-v1.jpg'
import TemplateV2 from '@/assets/img/template-v2.jpg'
import TemplateV3 from '@/assets/img/template-v3.jpg'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  children?: ReactNode
  onChange: (index: number) => void
}

const TemplatePreview: FC<IProps> = (props) => {
  const { onChange } = props
  const handleClick = useMemoizedFn((e: React.MouseEvent, index: number) => {
    onChange && onChange(index)
  })

  return (
    <TemplatePreviewWrapper className="between w-[640px]">
      <div className="flex flex-col justify-center items-center">
        <Image width={200} src={TemplateV1} height={260} />
        <Button className="w-[120px] mt-[10px]" onClick={(e) => handleClick(e, 1)}>
          模板一
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Image width={200} src={TemplateV2} height={260} />
        <Button className="w-[120px] mt-[10px]" onClick={(e) => handleClick(e, 2)}>
          模板二
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Image width={200} src={TemplateV3} height={260} />
        <Button className="w-[120px] mt-[10px]" onClick={(e) => handleClick(e, 3)}>
          模板三
        </Button>
      </div>
    </TemplatePreviewWrapper>
  )
}

export default memo(TemplatePreview)
