/*
 * @Author: hqk
 * @Date: 2023-03-09 14:36:13
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-06 16:47:24
 * @Description:
 */
import styled from 'styled-components'

export const ArticleDetailWrapper = styled.div<{ isAdmin: boolean }>`
  height: 100%;
  background-color: #ffffff;
  background-image: ${(props) => (props.isAdmin ? 'none' : 'linear-gradient(to top, #ffffff 0%, #eff5fc 74%)')};
  .content {
    img {
      max-width: 100%;
    }
  }
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

  .comment {
    ul {
      margin: 0;
      padding: 0;
    }
  }
`
