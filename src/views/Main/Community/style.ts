/*
 * @Author: hqk
 * @Date: 2023-03-06 10:54:58
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-06 10:57:54
 * @Description:
 */
import styled from 'styled-components'
import CommunityLogo from '@/assets/img/community_logo.png'

export const CommunityWrapper = styled.div`
  background: #f8f8f8;
  min-height: calc(100% - 60px);
  background-color: #ffffff;
  background-image: linear-gradient(to top, #ffffff 0%, #eff5fc 74%);
  .community_logo {
    background: url(${CommunityLogo}) no-repeat;
    background-size: cover;
    height: 210px;
  }
`
