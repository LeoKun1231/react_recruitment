/*
 * @Author: hqk
 * @Date: 2023-03-16 10:36:39
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-22 18:45:57
 * @Description:
 */
import styled from 'styled-components'

export const PreviewWrapper = styled.div`
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 0; /*高宽分别对应横竖滚动条的尺寸*/
    height: 0;
  }
  width: 640px;
  margin-left: 20px;
  height: calc(100% - 50px);
  background-color: white;
  --un-shadow: var(--un-shadow-inset) 0 25px 50px -12px var(--un-shadow-color, rgba(0, 0, 0, 0.25));
  box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
  line-height: 1.5;
  .item:not(:last-of-type) {
    &::after {
      content: '|';
      display: inline-block;
      margin-right: 6px;
      margin-left: 6px;
      width: 1px;
      height: 14px;
    }
  }

  .ant-upload-wrapper,
  .ant-upload-list,
  .ant-upload-list-item-container {
    width: 80px !important;
    height: 96px !important;
  }
  .ant-upload-wrapper .ant-upload-list.ant-upload-list-picture-card .ant-upload-list-item {
    padding: 0;
    border: 0;
    img {
      object-fit: cover;
    }
  }
  .ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload-list.ant-upload-list-picture-card .ant-upload-list-item::before {
    width: 80px !important;
    height: 96px !important;
  }
  .ant-upload .ant-upload-select {
    width: 80px !important;
    height: 96px !important;
  }
  .ant-upload {
    width: 80px !important;
    height: 96px !important;
  }
  ul,
  ol {
    padding-left: 22px;
    margin: 4px 0;
  }
  p {
    margin: 4px 0;
  }
`
