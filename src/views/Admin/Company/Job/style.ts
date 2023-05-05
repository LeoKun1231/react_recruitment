/*
 * @Author: hqk
 * @Date: 2023-03-24 12:59:42
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-30 19:35:25
 * @Description:
 */
import styled from 'styled-components'

export const JobWrapper = styled.div`
  height: calc(100vh - 88px);
  overflow: hidden;
  .ant-spin-container,
  .ant-spin-nested-loading {
    height: 100%;
  }
  .react-pdf__Page__canvas,
  .react-pdf__Page {
    width: 100% !important;
    height: 100% !important;
  }
  .react-pdf__Page {
    min-width: initial !important;
    min-height: initial !important;
  }
  .annotationLayer {
    height: 0 !important;
  }
  .react-pdf__Page__textContent {
    display: none !important;
  }
  .resume-detail {
    .ant-modal-body {
      overflow-y: auto;
      max-height: 70vh;
      min-height: 50vh;
    }
  }
  .resume-list {
    .ant-modal-body {
      overflow-y: auto;
      height: fit-content;
      max-height: 40vh;
    }
  }
`
