import styled from 'styled-components'

export const PannelWrapper = styled.div`
  width: 360px;
  height: 400px;
  .ant-tabs-nav {
    &::before {
      border-bottom: none;
    }
  }
  .ant-tabs-tab-btn {
    font-size: 16px;
  }
`
