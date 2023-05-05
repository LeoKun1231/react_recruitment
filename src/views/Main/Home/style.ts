/*
 * @Author: hqk
 * @Date: 2023-04-10 16:41:38
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-13 17:00:37
 * @Description:
 */
import styled from 'styled-components'
import HomeLogo from '@/assets/img/home_bg.jpg'
export const HomeWrapper = styled.div`
  & ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px !important; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px !important;
  }
  .search-left::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 1px !important; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px !important;
  }
  background: #f8f8f8;
  min-height: calc(100% - 60px);
  background-color: #ffffff;
  background-image: linear-gradient(to top, #ffffff 0%, #eff5fc 74%);
  .community_logo {
    background: url(${HomeLogo}) no-repeat;
    background-position: center center;
    background-size: cover;
    height: 160px;
  }
`
