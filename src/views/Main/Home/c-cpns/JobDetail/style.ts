import styled from 'styled-components'

export const JobDetailWrapper = styled.div`
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
  p,
  li {
    white-space: pre-wrap; /* 保留空格 */
  }

  blockquote {
    border-left: 8px solid #d0e5f2;
    padding: 10px 10px;
    margin: 10px 0;
    background-color: #f1f1f1;
  }

  code {
    font-family: monospace;
    background-color: #eee;
    padding: 3px;
    border-radius: 3px;
  }
  pre > code {
    display: block;
    padding: 10px;
  }

  table {
    border-collapse: collapse;
  }
  td,
  th {
    border: 1px solid #ccc;
    min-width: 50px;
    height: 20px;
  }
  th {
    background-color: #f1f1f1;
  }

  ul,
  ol {
    padding-left: 20px;
  }

  input[type='checkbox'] {
    margin-right: 5px;
  }
`
