/*
 * @Author: hqk
 * @Date: 2023-03-16 10:36:43
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-21 17:10:35
 * @Description:
 */
import styled from 'styled-components'

export const EditorWrapper = styled.div`
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 0; /*高宽分别对应横竖滚动条的尺寸*/
    height: 0;
  }
  width: 500px;
  padding: 0 24px 30px 24px;
  background-color: white;
  overflow-y: auto;
  position: fixed;
  height: calc(100vh - 260px);
  --un-shadow: var(--un-shadow-inset) 0 25px 50px -12px var(--un-shadow-color, rgba(0, 0, 0, 0.25));
  box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
  border-radius: 8px;
  .ant-form-item {
    margin-bottom: 8px;
  }
`
