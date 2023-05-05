import styled from 'styled-components'

export const MineResumeWrapper = styled.div`
  .resume-detail {
    .ant-modal-body {
      overflow-y: auto;
      max-height: 70vh;
      min-height: 50vh;
    }
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
`
