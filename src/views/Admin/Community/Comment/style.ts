/*
 * @Author: hqk
 * @Date: 2023-03-24 12:59:42
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-31 21:19:35
 * @Description:
 */
import styled from 'styled-components'

export const CommentWrapper = styled.div`
  height: calc(100vh - 78px);
  overflow: hidden;
  .ant-tabs-content-holder {
    height: calc(100% - 46px - 16px);
    overflow: hidden;
  }
  .ant-tabs-content,
  .ant-tabs-tabpane {
    height: 100%;
  }
`
