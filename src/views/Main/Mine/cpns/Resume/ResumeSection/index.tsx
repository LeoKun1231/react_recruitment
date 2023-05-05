/*
 * @Author: hqk
 * @Date: 2023-03-16 15:07:18
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-22 20:20:57
 * @Description:
 */
import React, { memo } from 'react'
import type { FC, ReactNode, CSSProperties } from 'react'
import { ResumeSectionWrapper } from './style'
import AppModal from '@/components/AppModal'
import { useDrag, useDrop } from 'react-dnd'
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import Icon, { AlignLeftOutlined, FileOutlined, ReadOutlined, UnorderedListOutlined } from '@ant-design/icons'
import Education from '@/assets/img/education'
import Company from '@/assets/img/company'
import Honorary from '@/assets/img/honorary'
interface IProps {
  id: string
  children?: ReactNode
  title: string
  onDelete: () => void
  onClick: () => void
  moveCard: (id: string, to: number) => void
  findCard: (id: string) => { index: number }
}
interface Item {
  id: string
  originalIndex: number
}
const style: CSSProperties = {
  backgroundColor: 'white'
}
const ResumeSection: FC<IProps> = (props) => {
  const { id, children, title, onDelete, onClick, moveCard, findCard } = props
  const originalIndex = findCard(id).index
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'card',
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveCard(droppedId, originalIndex)
        }
      }
    }),
    [id, originalIndex, moveCard]
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'card',
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id)
          moveCard(draggedId, overIndex)
        }
      }
    }),
    [findCard, moveCard]
  )

  const opacity = isDragging ? 0 : 1

  const { templateId } = useAppSelector((state) => {
    return {
      templateId: state.resume.templateId
    }
  }, useAppShallowEqual)

  return (
    <ResumeSectionWrapper ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
      <AppModal onDelete={onDelete} onClick={onClick}>
        {templateId == 1 && <h4 className="border m-0 pb-[10px] border-[var(--resume-color)] text-[var(--resume-color)] ">{title}</h4>}
        {templateId == 2 && (
          <div className="flex items-center">
            <div className="bg-[var(--resume-color)] rounded-full w-fit h-fit center p-[4px] text-white mr-[8px] ">
              {title == '教育经历' && <Icon component={Education}></Icon>}
              {title == '校园经历' && <ReadOutlined className="text-[16px]" />}
              {title == '专业技能' && <FileOutlined className="text-[16px]" />}
              {title == '公司经历' && <Icon component={Company}></Icon>}
              {title == '荣誉经历' && <Icon component={Honorary}></Icon>}
              {title == '技能/证书及其他' && <AlignLeftOutlined className="text-[16px]" />}
              {title != '教育经历' &&
                title != '校园经历' &&
                title != '专业技能' &&
                title != '公司经历' &&
                title != '技能/证书及其他' &&
                title != '荣誉经历' && <UnorderedListOutlined className="text-[16px]" />}
            </div>
            <h2 className="p-0 m-0 border-b-[var(--resume-color)] border-b-2 border-b-solid w-full">{title}</h2>
          </div>
        )}
        {templateId == 3 && (
          <div className="flex items-center">
            <h2 className="p-0 m-0  bg-[var(--resume-color)] w-fit text-white px-[22px] relative left-[-22px] arrow">{title}</h2>
          </div>
        )}
        {templateId == 3 ? <div className="border-t-solid border-l-solid border-[var(--resume-color)] border-2">{children}</div> : children}
      </AppModal>
    </ResumeSectionWrapper>
  )
}

export default memo(ResumeSection)
