/*
 * @Author: hqk
 * @Date: 2023-04-06 11:17:43
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-06 21:56:03
 * @Description:
 */
import styled from 'styled-components'

export const ArticleReportWrapper = styled.div`
  .ant-spin-nested-loading,
  .ant-spin-container {
    height: 100% !important;
  }
  .ant-list {
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 0 !important; /*高宽分别对应横竖滚动条的尺寸*/
      height: 0 !important;
    }
  }
  .ant-ribbon-wrapper {
    width: calc(100% - 42px);
  }
`
