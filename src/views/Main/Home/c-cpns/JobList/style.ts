import styled from 'styled-components'

export const JobListWrapper = styled.div`
  background: #f8f8f8;
  min-height: calc(100% - 60px);
  background-color: #ffffff;
  background-image: linear-gradient(to top, #ffffff 0%, #eff5fc 74%);

  .item {
    &:first-of-type {
      padding-right: 10px;
      border-right: 1px solid #eee;
    }
  }
`
