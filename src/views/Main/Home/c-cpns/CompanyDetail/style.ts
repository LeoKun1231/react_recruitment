import styled from 'styled-components'

export const CompanyDetailWrapper = styled.div`
  .company_item + .company_item::before {
    content: ' · ';
    display: inline-block;
    padding: 0 10px;
    color: #fff;
  }
  .content {
    background: #f8f8f8;
    background-color: #ffffff;
    background-image: linear-gradient(to top, #ffffff 0%, #eff5fc 74%);
  }
  height: 100%;
`
