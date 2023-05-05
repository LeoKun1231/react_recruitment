/*
 * @Author: hqk
 * @Date: 2023-03-04 20:03:31
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-05 11:08:11
 * @Description:
 */
import styled from 'styled-components'

export const ArticleWrapper = styled.div`
  margin: 0 auto;
  padding: 60px 0;
  background-color: #ffffff;
  background-image: linear-gradient(to top, #ffffff 0%, #eff5fc 74%);

  .title {
    .ant-input-affix-wrapper {
      border: none;
      outline: none;
      height: 50px;
      line-height: 50px;
      padding-left: 0;
      input {
        font-size: 24px;
        font-weight: 600;
      }
      /* &:focus {
        border: none;
        outline: none;
      } */
    }
    .ant-input-affix-wrapper-focused {
      box-shadow: none;
    }
  }

  .active {
    background-color: var(--primary-color);
    color: #fff;
  }
`
