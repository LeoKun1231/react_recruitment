/*
 * @Author: hqk
 * @Date: 2023-04-14 17:55:31
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-14 21:51:52
 * @Description:
 */
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { AppPDFViewWrapper } from './style'
import { Document, Page, pdfjs } from 'react-pdf'
import { Spin, Tooltip, Input, Button } from 'antd'
import {
  LeftOutlined,
  RightOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined
} from '@ant-design/icons'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface IProps {
  children?: ReactNode
  file: string
}

const AppPDFView: FC<IProps> = (props) => {
  const { file } = props

  const [numPages, setNumPages] = useState(null)

  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages)
  }

  const lastPage = () => {
    if (pageNumber == 1) {
      return
    }
    const page = pageNumber - 1
    setPageNumber(page)
  }

  const nextPage = () => {
    if (pageNumber == numPages) {
      return
    }
    const page = pageNumber + 1
    setPageNumber(page)
  }

  useEffect(() => {
    const el = document.querySelector('.pdf')
    el?.parentElement?.scrollTo(0, 0)
  }, [pageNumber])

  return (
    <AppPDFViewWrapper className="pdf">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} devicePixelRatio={3} />
      </Document>
      {numPages && numPages > 1 && (
        <div className="center">
          <Button icon={<LeftOutlined />} onClick={lastPage} disabled={pageNumber == 1} className="mr-10px">
            上一页
          </Button>
          <Button icon={<RightOutlined />} onClick={nextPage} disabled={pageNumber == numPages} className="ml-10px">
            下一页
          </Button>
        </div>
      )}
    </AppPDFViewWrapper>
  )
}

export default memo(AppPDFView)
