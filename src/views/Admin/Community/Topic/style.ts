/*
 * @Author: hqk
 * @Date: 2023-03-24 12:59:42
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-05 17:39:19
 * @Description:
 */
import styled from 'styled-components'

export const TopicWrapper = styled.div`
  height: calc(100vh - 78px);
  .ant-row {
    width: 100%;
    margin: 0 !important;
  }
  .ant-spin-nested-loading,
  .ant-spin-container,
  .ant-col {
    height: 100%;
  }
`
