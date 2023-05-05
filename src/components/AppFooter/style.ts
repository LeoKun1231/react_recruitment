/*
 * @Author: hqk
 * @Date: 2023-03-04 14:36:46
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-15 10:16:11
 * @Description:
 */
import styled from 'styled-components'

export const FooterWrapper = styled.div`
  height: 144px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  width: 100%;
  .header {
    position: relative;
    text-align: center;
    height: 144px;
  }
  .waves {
    position: relative;
    width: 100%;
    height: 144px;
  }
  .parallax > use {
    /* 使use元素执行move-forever动画 */
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
  }
  .parallax > use:nth-child(1) {
    /* 延迟2秒启动动画  */
    animation-delay: -2s;
    /* 设置动画持续时间为7秒 */
    animation-duration: 7s;
  }
  .parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }

  .parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }
  .parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }
  @keyframes move-forever {
    0% {
      transform: translate3d(-90px, 0, 0);
    }

    100% {
      transform: translate3d(85px, 0, 0);
    }
  }

  @media (max-width: 768px) {
    .waves {
      height: 40px;
      min-height: 40px;
    }

    .content {
      height: 30vh;
    }
  }
`
