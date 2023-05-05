import styled from 'styled-components'

export const AppTableWrapper = styled.div`
  .ant-spin-nested-loading,
  .ant-spin-container {
    height: 100%;
  }

  .ant-pagination {
    margin: 0 !important;
    padding: 1.67vh 0 !important;
  }
  .ant-table-header,
  .ant-table-thead {
    tr,
    th {
      padding: 0px !important;
      height: 55px !important;
    }
    height: 55px !important;
  }
  /* .ant-table-body {
    overflow: auto !important;
  } */

  .ant-table {
    height: calc(100% - 6.67vh);
    .ant-table-container {
      height: 100%;
    }
    .ant-table-tbody {
      overflow: hidden;
    }
  }
`
