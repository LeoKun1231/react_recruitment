/*
 * @Author: hqk
 * @Date: 2023-03-15 14:27:24
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-15 14:28:58
 * @Description:
 */
import styled from 'styled-components'

export const ListCardWrapper = styled.div`
  padding: 16px 24px;
  .rotate {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    /* border-top: 2px solid #00b8bf; */
    -webkit-animation: rotate-23f72fdc 0.4s linear alternate both;
    animation: rotate-23f72fdc 0.4s linear alternate both;
  }

  @-webkit-keyframes rotate-23f72fdc {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }

  @keyframes rotate-23f72fdc {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }
`
