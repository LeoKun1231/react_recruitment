/*
 * @Author: hqk
 * @Date: 2023-03-06 16:31:51
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-06 16:39:41
 * @Description:
 */
import styled from 'styled-components'

export const ViewWrapper = styled.div`
  position: relative;
  padding: 8px 0;
  width: 750px;

  .scroll {
    overflow: hidden;
    .scroll-content {
      display: flex;
      transition: transform 250ms ease;
    }
  }
  .control {
    position: absolute;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    border-width: 2px;
    border-style: solid;
    border-color: #fff;
    background: #fff;
    box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.14);
    cursor: pointer;
    font-size: 14px;
    color: var(--primary-color);
    &.left {
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &.right {
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
    }
  }
`
