/*
 * @Author: hqk
 * @Date: 2023-04-15 15:06:22
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-16 13:02:35
 * @Description:
 */

import styled from 'styled-components'

export const AppChatWrapper = styled.div`
  height: 100%;
  width: 100%;
  a,
  abbr,
  acronym,
  address,
  applet,
  article,
  aside,
  audio,
  b,
  big,
  blockquote,
  body,
  canvas,
  caption,
  center,
  cite,
  code,
  dd,
  del,
  details,
  dfn,
  div,
  dl,
  dt,
  em,
  embed,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  header,
  hgroup,
  html,
  i,
  iframe,
  img,
  ins,
  kbd,
  label,
  legend,
  li,
  mark,
  menu,
  nav,
  object,
  ol,
  output,
  p,
  pre,
  q,
  ruby,
  s,
  samp,
  section,
  small,
  span,
  strike,
  strong,
  sub,
  summary,
  sup,
  table,
  tbody,
  td,
  tfoot,
  th,
  thead,
  time,
  tr,
  tt,
  u,
  ul,
  var,
  video {
    border: 0;
    font-size: 100%;
    font: inherit;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }
  a,
  a:active,
  a:hover,
  a:link,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:after,
  blockquote:before,
  q:after,
  q:before {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .tui-kit {
    background-color: #fff;
    width: 100%;
  }
  .tui-conversation,
  .tui-kit {
    display: flex;
    height: 100%;
    position: relative;
    text-align: initial;
  }
  .tui-conversation {
    border-right: 1px solid #f9fafb;
    flex-direction: column;
    max-width: 400px;
    min-width: 360px;
    width: 30%;
  }
  .tui-conversation .tui-conversation-header {
    display: flex;
    padding: 10px 20px;
  }
  .tui-conversation .tui-conversation-header .tui-conversation-create-icon {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-left: 10px;
  }
  .tui-conversation .no-result {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }
  .tui-conversation .no-result-icon {
    margin: 100px auto 50px;
  }
  .tui-conversation .no-result-message {
    color: #999;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
  }
  .tui-kit-icon {
    align-items: center;
    cursor: pointer;
    display: flex;
    position: relative;
    text-align: center;
  }
  .tui-kit-icon .icon-image {
    height: 100%;
    width: 100%;
  }
  .tui-kit-icon:hover {
    border-color: currentColor;
    color: #4169e1;
  }
  .tui-kit-icon:after {
    border-radius: inherit;
    box-shadow: 0 0 0 6px #4169e1;
    content: '';
    inset: 0;
    opacity: 0;
    position: absolute;
    transition: 0.3s;
  }
  .tui-kit-icon:active:after {
    box-shadow: none;
    opacity: 0.4;
    transition: 0s;
  }
  .tui-kit-avatar {
    align-items: center;
    cursor: pointer;
    display: flex;
    position: relative;
  }
  .tui-kit-avatar.circle .avatar-image {
    border-radius: 50%;
  }
  .tui-kit-avatar.square .avatar-image {
    border-radius: 4px;
  }
  .tui-kit-avatar img {
    height: 100%;
    width: 100%;
  }
  .tui-kit-avatar:hover .tui-kit-avatar-edit {
    display: flex;
  }
  .tui-kit-avatar-edit {
    align-items: center;
    background: rgba(0, 0, 0, 0.33);
    border-radius: 100%;
    display: none;
    height: 100%;
    left: 0;
    top: 0;
  }
  .tui-kit-avatar-edit,
  .tui-kit-avatar-list {
    justify-content: center;
    position: absolute;
    width: 100%;
  }
  .tui-kit-avatar-list {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);
    display: flex;
    flex-wrap: wrap;
    max-width: 400px;
    min-width: 200px;
    padding: 10px;
    top: 100%;
    z-index: 2;
  }
  .tui-kit-avatar-list-item {
    padding: 10px;
  }
  .tui-kit-avatar-list-item img {
    width: 40px;
  }
  .conversation-list-container {
    height: 100%;
    overflow-x: hidden;
  }
  .conversation-preview-container {
    align-items: center;
    background-color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    height: 64px;
    line-height: 17px;
    padding: 0 20px;
    width: 100%;
  }
  .conversation-preview-container .content {
    flex: 1;
    margin-left: 10px;
    max-width: 58%;
    min-width: 58%;
    text-align: left;
  }
  .conversation-preview-container .content .title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
    padding: 1px 0;
  }
  .conversation-preview-container .content .message {
    color: #7a7a7a;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    overflow: hidden;
    padding: 1px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .conversation-preview-container .external {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 90px;
    text-align: right;
  }
  .conversation-preview-container .external .unread {
    height: 19px;
    padding: 1px 0;
  }
  .conversation-preview-container .external .time {
    color: #7a7a7a;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    padding: 1px 0;
  }
  .conversation-preview-container .external .more--hover {
    display: flex;
    justify-content: right;
  }
  .conversation-preview-container .external .more--hover .icon-more {
    transform: scale(1.5);
  }
  .conversation-preview-container .external .more--hover .more-handle-box {
    bottom: auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 14px 0;
    right: 0;
    text-align: start;
    top: 0;
    white-space: nowrap;
  }
  .conversation-preview-container .external .more--hover .more-handle-box .more-handle-item {
    box-sizing: border-box;
    cursor: pointer;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    padding: 6px 16px;
  }
  .conversation-preview-container .external .more--hover .more-handle-box .more-handle-item:hover {
    background: #147aff;
    color: #fff !important;
    opacity: 0.6;
  }
  .conversation-preview-container:hover {
    background-color: rgba(0, 110, 255, 0.1);
  }
  .conversation-preview-container.conversation-preview-content--pin {
    background-color: hsla(0, 0%, 95%, 0.831);
  }
  .conversation-preview-container.conversation-preview-content--active {
    background-color: rgba(0, 110, 255, 0.1);
  }
  .conversation-preview-container.conversation-preview-content--active .title {
    color: #147aff;
  }
  .conversation-preview-container.conversation-preview-content--unread .unread {
    align-items: center;
    background: #ff3742;
    border-radius: 16px;
    color: #fff;
    display: flex;
    font-size: 11px;
    font-weight: 700;
    height: 13px;
    justify-content: center;
    margin: 2px 0 2px auto;
    padding: 2px 5px 1px;
    width: 16px;
  }
  .popup {
    opacity: 0;
  }
  .popup-show {
    opacity: 1;
  }
  .plugin {
    gap: 8px;
    padding: 0 8px;
  }
  .plugin,
  .plugin-popup {
    align-items: center;
    display: flex;
    height: 100%;
  }
  .plugin-popup {
    position: relative;
  }
  .plugin-popup-box {
    background: #fff;
    border-radius: 16px;
    bottom: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 2;
  }
  .profile {
    background: #f9fafb;
    flex-direction: row;
    font-family: PingFangSC-Medium;
    justify-content: space-between;
    padding: 16px 20px;
  }
  .profile,
  .profile .profile-content {
    align-items: center;
    display: flex;
  }
  .profile .profile-content .profile-name {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-weight: 600;
    margin-left: 10px;
  }
  .conversation-search-result.no-result {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }
  .conversation-search-result.no-result-icon {
    margin: 100px auto 50px;
  }
  .conversation-search-result.no-result-message {
    color: #999;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
  }
  .conversation-search-input {
    height: 36px;
    width: 100%;
  }
  .tui-kit-input-box {
    align-items: center;
    background: hsla(0, 0%, 98%, 0.94);
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    height: 36px;
    padding: 0 8px;
  }
  .tui-kit-input-box.tui-kit-input-box--focus {
    outline: 1px solid #147aff;
  }
  .tui-kit-input-box.tui-kit-input-border--bottom {
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0;
    outline: none;
  }
  .tui-kit-input-box .tui-kit-input {
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-left: 6px;
    margin-right: auto;
  }
  .tui-kit-input-box .tui-kit-input:focus {
    border: none;
    outline: none;
  }
  .tui-kit-input-box .tui-kit-input::-moz-placeholder {
    color: rgba(67, 60, 63, 0.6);
    font-weight: 400;
    padding: 2px 0;
  }
  .tui-kit-input-box .tui-kit-input::placeholder {
    color: rgba(67, 60, 63, 0.6);
    font-weight: 400;
    padding: 2px 0;
  }
  .tui-conversation-create-header {
    align-items: center;
    background-color: #f9fafb;
    display: flex;
    flex-direction: row;
    padding: 16px 20px;
    text-align: center;
  }
  .tui-conversation-create-header .title {
    color: #000;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.41px;
    line-height: 32px;
    margin-left: 10px;
  }
  .tui-conversation-create-search-input {
    margin: 10px;
  }
  .tui-user {
    align-items: center;
    cursor: pointer;
    display: flex;
    padding: 10px;
    text-align: center;
  }
  .tui-user:hover {
    background-color: rgba(0, 110, 255, 0.1);
  }
  .tui-user .tui-user-name {
    color: #000;
    font-weight: 400;
    margin-left: 10px;
  }
  .tui-user .tui-user-name,
  .tui-user .tui-user-name.active {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    line-height: 20px;
  }
  .tui-user .tui-user-name.active {
    color: #0365f9;
    font-weight: 600;
  }
  .tui-user-checkbox-label .tui-user-checkbox {
    margin-left: auto;
  }
  .tui-user-checkbox-label input[type='checkbox'] {
    cursor: pointer;
  }
  .tui-conversation-create-next-container {
    display: flex;
    justify-content: center;
    margin: 20px auto 10px;
    width: 100%;
  }
  .tui-conversation-create-next-container .tui-conversation-create-next {
    background-color: #0365f9;
    border-radius: 31px;
    color: #fff;
    cursor: pointer;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    line-height: 20px;
    padding: 12px 36px;
    text-align: center;
    width: 12%;
  }
  .tui-conversation-create {
    overflow-y: auto;
  }
  .tui-conversation-create .tui-conversation-create-container {
    position: relative;
  }
  .tui-conversation-create .tui-conversation-create-container .tui-group-container {
    width: 100%;
  }
  .tui-conversation-create .tui-conversation-create-container .tui-group-box .title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 10px;
  }
  .conversation-create-select-view {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
  .conversation-create-select-view .select-view-info {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 6px;
    position: relative;
    width: calc(20% - 2px);
  }
  .conversation-create-select-view .select-view-info .select-view-info-close {
    position: absolute;
    right: 15px;
    top: 6px;
    z-index: 2;
  }
  .conversation-create-select-view .select-view-info .select-view-info-nick {
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
  .toast {
    border-radius: 5px;
    box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);
    margin: 20px;
    max-width: 50%;
    padding: 10px;
    position: fixed;
    top: 0;
    word-break: break-all;
    z-index: 10;
  }
  .tui-conversation-create-group-detail .create-group-box {
    padding: 10px 0;
  }
  .tui-conversation-create-group-detail .input-group-text {
    color: #000;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
  }
  .tui-conversation-create-group-detail .create-group-name .input-group-name {
    color: #000;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
  }
  .tui-conversation-create-group-detail .input-group-title {
    color: rgba(0, 0, 0, 0.4);
    width: 106px;
  }
  .tui-conversation-create-group-detail .create-group-illustrate {
    color: rgba(0, 0, 0, 0.4);
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    padding-left: 8px;
    text-align: justify;
  }
  .tui-conversation-create-group-detail .create-group-portrait .create-group-portrait-title {
    color: #000;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 20px 0 20px 8px;
  }
  .tui-conversation-create-group-detail .create-group-portrait .create-group-portrait-info-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
  .tui-conversation-create-group-detail .create-group-portrait .create-group-portrait-info-container .create-group-portrait-info {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 6px;
    width: calc(16.66667% - 1.66667px);
  }
  .tui-conversation-create-group-detail .create-group-portrait .create-group-portrait-info-container .create-group-portrait-info-nick {
    font-family: PingFangSC-Medium;
    font-size: 12px;
    margin-top: 6px;
  }
  .tui-conversation-group-type-info {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
  }
  .tui-conversation-group-type-info .group-type-info-box {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    padding: 12px 16px;
  }
  .tui-conversation-group-type-info .group-type-info-box.group-type-info-box--active,
  .tui-conversation-group-type-info .group-type-info-box:hover {
    border: 1px solid #147aff;
  }
  .tui-conversation-group-type-info .group-type-info-box .group-type-info-title {
    align-items: center;
    color: rgba(0, 0, 0, 0.8);
    display: flex;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    line-height: 22px;
  }
  .tui-conversation-group-type-info .group-type-info-box .group-type-info-title .box-active-icon {
    margin-right: 8px;
  }
  .tui-conversation-group-type-info .group-type-info-box .group-type-info-description {
    color: rgba(0, 0, 0, 0.4);
    font-family: PingFangSC-Medium;
    font-size: 12px;
    line-height: 17px;
    text-align: justify;
  }
  .tui-conversation-group-type-info .group-type-info-document {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    line-height: 22px;
    margin: 1rem auto;
    text-align: justify;
    text-decoration: none;
  }
  .tui-conversation-group-type-info .group-type-info-document:active,
  .tui-conversation-group-type-info .group-type-info-document:link,
  .tui-conversation-group-type-info .group-type-info-document:visited {
    color: #104ef5;
  }
  .tui-profile {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 400px;
    min-width: 360px;
    width: 30%;
  }
  .tui-profile-header {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    line-height: 32px;
    padding: 16px 20px;
    width: 100%;
  }
  .tui-profile-header h1 {
    font-weight: 600;
    padding: 0 11px;
  }
  .tui-profile-main {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    padding: 20px;
  }
  .tui-profile-avatar {
    margin: 13px 0;
    position: relative;
  }
  .tui-profile .displayFlex {
    display: flex;
  }
  .tui-profile-nick {
    font-family: PingFangSC-Medium;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
    text-align: center;
  }
  .tui-profile-nick .show {
    padding-left: 25px;
  }
  .tui-profile-ID {
    align-items: center;
    color: #666;
    display: flex;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    padding: 6px 0;
  }
  .tui-profile-list {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    width: 100%;
  }
  .tui-profile-list-item {
    padding: 20px 0 0;
  }
  .tui-profile-list-item h4 {
    color: rgba(0, 0, 0, 0.6);
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    padding-bottom: 3px;
  }
  .tui-profile-div-with-edit {
    border-bottom: 1px solid #eee;
    padding: 4px 0;
  }
  .tui-profile-edit {
    border-bottom: none !important;
  }
  .tui-profile-birthday .react-date-picker__wrapper {
    display: none !important;
  }
  .tui-profile-birthday .react-date-picker__calendar {
    position: static !important;
  }
  .tui-profile-birthday-calendar {
    border: none !important;
  }
  .tui-profile {
    background: #fff;
  }
  .tui-profile-header {
    background: #f9fafb;
  }
  .div-with-edit {
    box-sizing: border-box;
  }
  .div-with-edit,
  .div-with-edit-popup {
    display: flex;
    flex: 1;
    max-width: 100%;
  }
  .div-with-edit .show {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: space-between;
    position: relative;
    word-break: break-all;
  }
  .div-with-edit .show:hover .icon-edit {
    display: flex;
  }
  .div-with-edit .show .icon-edit {
    display: none;
  }
  .div-with-edit .icon {
    margin-left: 10px;
    width: 25px;
  }
  .div-with-edit .edit {
    align-items: center;
    border-bottom: 1px solid #eee;
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0 10px;
    position: relative;
  }
  .div-with-edit .edit input {
    border: none;
    flex: 1;
    font-size: inherit;
  }
  .div-with-edit .edit input:focus {
    border: none;
    outline: none;
  }
  .div-with-edit .edit .select {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    min-width: 100%;
    padding: 10px 0;
    position: absolute;
    top: 100%;
    z-index: 2;
  }
  .div-with-edit .edit .select-list-item {
    padding: 5px 10px;
  }
  .div-with-edit .edit .select-list-item:hover {
    background: #f2f7ff;
  }
  .message-default {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex: 1;
    font-family: SF Pro Text;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    width: 100%;
  }
  .message-default .avatar,
  .message-default .avatar img {
    width: 45px;
  }
  .message-default .content {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
  }
  .message-default .content .name {
    display: inline-block;
    padding-bottom: 3px;
  }
  .in {
    display: flex;
    flex: 1;
    flex-direction: row;
    gap: 10px;
    justify-self: flex-start;
  }
  .in .content {
    align-items: flex-start;
    flex: 1;
  }
  .out {
    display: flex;
    flex: 1;
    flex-direction: row-reverse;
    gap: 10px;
    justify-self: flex-end;
  }
  .out .content {
    align-items: flex-end;
    flex: 1;
  }
  .tip {
    justify-self: center !important;
    width: auto;
  }
  .bubble {
    padding: 8px 16px;
  }
  .bubble-in {
    border-radius: 16px 16px 16px 0;
  }
  .bubble-in.group {
    border-radius: 0 16px 16px 16px;
  }
  .bubble-out {
    border-radius: 16px 16px 0 16px;
  }
  .message-status {
    align-items: flex-end;
    align-self: flex-end;
    display: flex;
  }
  .message-status .time {
    color: #7a7a7a;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    padding: 5px 0 0 10px;
    text-align: right;
    width: -moz-max-content;
    width: max-content;
  }
  .message-image,
  .message-video {
    position: relative;
  }
  .message-image .message-status,
  .message-video .message-status {
    bottom: 10px;
    position: absolute;
    right: 10px;
  }
  .message-image .message-status .time,
  .message-video .message-status .time {
    color: #fff;
  }
  .message-text {
    display: flex;
  }
  .message-text-content {
    display: inline;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    word-break: break-word;
  }
  .message-text-content-p {
    display: inline;
    vertical-align: middle;
  }
  .message-text-content .message-status {
    clear: right;
    display: inline-flex;
    float: right;
  }
  .message-text,
  .message-tip {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
  }
  .message-text .text-img,
  .message-tip .text-img {
    height: 20px;
    vertical-align: middle;
    width: 20px;
  }
  .message-image {
    background: #fff;
  }
  .message-image img {
    max-width: 300px;
  }
  .message-image .big-image {
    max-height: 95%;
    max-width: 95%;
  }
  .message-video {
    max-width: 300px;
  }
  .message-video .snap-video {
    position: relative;
  }
  .message-video .snap-video:before {
    border: 15px solid transparent;
    border-left: 20px solid #fff;
    bottom: 0;
    content: '';
    height: 0;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    z-index: 1;
  }
  .message-video video {
    border-radius: 10px;
    width: 100%;
  }
  .message-video .play-video {
    max-height: 95%;
    max-width: 95%;
  }
  .message-file {
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
  }
  .message-file-main {
    align-items: center;
    background: #fff;
    border-radius: 4px;
    display: flex;
    padding: 12px;
  }
  .message-file-main .icon {
    margin-right: 7px;
  }
  .message-file-footer {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
  }
  .message-file-footer .time {
    padding-top: 10px;
  }
  .message-file-size {
    color: #7a7a7a;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    padding-top: 10px;
  }
  .message-merger {
    background: #ecebeb;
    display: flex;
    flex-direction: column;
  }
  .message-merger h3 {
    border-bottom: 1px solid #a1a1a1;
    padding-bottom: 4px;
  }
  .message-merger-list {
    opacity: 0.6;
  }
  .message-merger-item {
    padding-top: 4px;
  }
  .meesage-bubble-reply {
    background: #ecebeb;
    padding: 8px 16px;
  }
  .meesage-bubble-reply-in {
    border-radius: 16px 16px 16px 0;
  }
  .meesage-bubble-reply-out {
    border-radius: 16px 16px 0 16px;
  }
  .meesage-bubble-reply .message-text {
    border: none;
    border-radius: none;
  }
  .meesage-bubble-reply .bubble {
    padding: 0;
  }
  .meesage-bubble-reply .bubble-in {
    border-radius: 0;
  }
  .meesage-bubble-reply-main {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 14px;
    position: relative;
  }
  .meesage-bubble-reply-main:before {
    background: #d9d9d9;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 6px;
  }
  .meesage-bubble-reply-main .title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    padding-bottom: 10px;
  }
  .meesage-bubble-reply-main .message-context {
    opacity: 0.6;
  }
  .meesage-bubble {
    align-items: flex-end;
    display: flex;
  }
  .meesage-bubble-status {
    margin: 3px;
  }
  .meesage-bubble-context {
    align-items: center;
    display: flex;
    gap: 10px;
  }
  .meesage-bubble-context .message-context {
    flex: 1;
  }
  .icon-fail {
    align-items: center;
    background: #fa5151;
    border-radius: 14px;
    display: inline-flex;
    height: 14px;
    justify-content: center;
    position: relative;
    width: 14px;
  }
  .icon-fail:before {
    color: #fff;
    content: '!';
    font-family: PingFangSC-Medium;
    font-size: 12px;
    position: absolute;
  }
  .message-face {
    display: flex;
    flex-direction: column;
  }
  .message-face .img {
    max-width: 88px;
  }
  .loading {
    display: inline-block;
    position: relative;
  }
  .loading .img,
  .loading video {
    border-radius: 10px;
    max-width: 300px;
    min-height: 60px;
    min-width: 60px;
  }
  .loading:before {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    height: 100%;
    width: 100%;
  }
  .loading:after,
  .loading:before {
    content: '';
    left: 0;
    position: absolute;
    top: 0;
  }
  .loading:after {
    animation: spin 2s linear infinite;
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top-color: #555;
    bottom: 0;
    display: inline-block;
    height: 30px;
    margin: auto;
    right: 0;
    width: 30px;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1turn);
    }
  }
  .message-plugin {
    margin: 0 5px;
    width: 32px;
  }
  .message-plugin .icon-more {
    transform: scale(1.5);
  }
  .message-plugin .plugin-popup-box {
    bottom: auto;
    top: 100%;
  }
  .message-plugin-top {
    bottom: 100% !important;
    top: auto !important;
  }
  .message-plugin-left {
    left: -140px !important;
  }
  .message-plugin-box {
    padding: 6px 0;
  }
  .message-plugin-item {
    align-items: center;
    display: flex;
    font-family: PingFangSC-Medium;
    font-size: 12.8px;
    font-weight: 500;
    justify-content: space-between;
    line-height: 15px;
    min-width: 144px;
    padding: 6px 13px;
  }
  .message-plugin-item:hover {
    background: rgba(0, 110, 255, 0.1);
    color: #147aff;
  }
  .message-plugin-item .del {
    color: #ff584c;
  }
  .message-custom {
    display: flex;
    word-break: break-all;
  }
  .message-custom a {
    color: #679ce1;
    text-decoration: none;
  }
  .message-custom a,
  .message-custom p {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
  }
  .message-revoke {
    color: #999;
  }
  .message-audio {
    align-items: center;
    display: flex;
  }
  .message-audio .out {
    transform: rotate(180deg);
  }
  .message-audio-none {
    display: none;
  }
  .message-audio-content {
    align-items: center;
    display: flex;
    gap: 10px;
  }
  .message-audio-out {
    flex-direction: row-reverse;
  }
  .message-audio .playing {
    animation: playingAnimation 1s ease-in-out infinite;
  }
  @keyframes playingAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
  .high-lighted {
    animation: highLightedAnimation 1s ease-in-out forwards;
  }
  @keyframes highLightedAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
  .progress-box {
    display: flex;
    height: 5px;
    justify-content: flex-start;
    width: 100%;
  }
  .progress-box .progress {
    background: #147aff;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    display: inline-block;
    height: 5px;
    width: 0;
  }
  .message-custom,
  .message-text {
    border: 1px solid #ddd;
  }
  .bubble-out {
    border: 1px solid #f2f7ff;
  }
  .bubble-out,
  .meesage-bubble-reply-out {
    background: #f2f7ff;
  }
  .meesage-bubble-reply-out .meesage-bubble-reply-main .message-text {
    background: none;
  }
  .message-tip {
    color: #999;
  }
  .tip .bubble .edit {
    color: #147aff;
  }
  .model {
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 2;
  }
  .chat {
    background: #fff;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    position: relative;
    width: 100%;
  }
  .tui-chat-header {
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 20px;
  }
  .tui-chat-header,
  .tui-chat-header-left {
    align-items: center;
    display: flex;
  }
  .tui-chat-header .header-content {
    flex: 1;
    padding: 0 8px;
  }
  .tui-chat-header-right .header-handle-more {
    padding: 10px 3px;
  }
  .tui-chat-header .title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
  }
  .tui-chat-header .system {
    height: 32px;
  }
  div,
  label,
  li,
  p,
  span,
  ul {
    margin: 0;
    padding: 0;
  }
  .message-list {
    flex: 1;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 20px;
    position: relative;
  }
  .message-list.hide {
    opacity: 0;
  }
  .message-list-item {
    display: grid;
    padding: 5px 0;
  }
  .message-list .no-more {
    color: #999;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
  }
  .message-list .no-more,
  .message-list-time {
    font-family: PingFangSC-Medium;
    text-align: center;
  }
  .message-list-time {
    color: #7a7a7a;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    padding: 10px;
  }
  .tui-message-input {
    display: flex;
    flex-direction: column;
  }
  .tui-message-input-main {
    align-items: center;
    display: flex;
    flex: 1;
    gap: 12px;
    padding: 14px 12px;
  }
  .tui-message-input-main .input-box {
    border-radius: 15px;
    display: flex;
    flex: 1;
    max-height: 200px;
    min-height: 20px;
    overflow: hidden;
    padding: 10px;
    position: relative;
  }
  .tui-message-input-main .input-box .input-visibility-content {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    max-width: -webkit-fill-available;
    padding: 1px 2px;
    visibility: hidden;
    word-break: break-all;
  }
  .tui-message-input-main .input-box textarea {
    background: none;
    border: none;
    flex: 1;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    height: -webkit-fill-available;
    left: 0;
    line-height: 17px;
    margin: 9px;
    position: absolute;
    resize: none;
    top: 0;
    width: -webkit-fill-available;
  }
  .tui-message-input-main .input-box textarea:active,
  .tui-message-input-main .input-box textarea:focus {
    border: none;
    outline: none;
  }
  .tui-message-input-main .disabled {
    display: none;
  }
  .tui-message-input-box {
    .plugin {
      display: none !important;
    }
    align-items: center;
    display: flex;
    flex: 1;
  }
  ul li {
    list-style: none;
  }
  .input-plugin-popup {
    position: relative;
  }
  .input-plugin-popup-box {
    bottom: 30px;
    position: absolute;
    z-index: 2;
  }
  .input-plugin-item {
    display: flex;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 19px;
  }
  .input-plugin-item span {
    padding: 0 17px;
  }
  .emoji-picker .face-list {
    display: flex;
    flex-wrap: wrap;
    max-height: 120px;
    min-width: 265px;
    overflow-y: auto;
    padding: 10px 5px;
  }
  .emoji-picker .face-list-item {
    cursor: pointer;
    padding: 5px;
  }
  .emoji-picker .face-list-item img {
    width: 20px;
  }
  .emoji-picker .face-list-item .face-img {
    width: 38px;
  }
  .emoji-picker .face-tab {
    align-items: center;
    display: flex;
    min-width: 265px;
  }
  .emoji-picker .face-tab-item {
    cursor: pointer;
    padding: 10px;
    width: 24px;
  }
  .emoji-picker .face-tab-item img {
    width: 100%;
  }
  .emoji-picker .emoji-plugin-right {
    right: 0;
  }
  .upload-picker {
    min-width: 180px;
    padding: 10px 16px;
    position: relative;
  }
  .upload-picker:hover {
    background: rgba(0, 110, 255, 0.1);
    color: #147aff;
  }
  .upload-picker input {
    cursor: pointer;
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  .input-quote {
    align-items: center;
    background: #f9f9f9;
    display: flex;
    padding: 7px 16px;
  }
  .input-quote-content {
    background: #fff;
    color: #000;
    display: flex;
    flex: 1;
    flex-direction: column;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    padding: 2px 14px;
    position: relative;
  }
  .input-quote-content:before {
    background: #999;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 6px;
  }
  .input-quote-content span {
    opacity: 0.6;
    padding-top: 8px;
  }
  .input-quote .icon {
    margin: 0 5px 0 16px;
  }
  .tui-forward {
    background: #fff;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 300px;
  }
  .tui-forward-header {
    align-items: center;
    display: flex;
    padding: 24px 20px;
  }
  .tui-forward-title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
    padding: 0 16px;
  }
  .tui-forward-main {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    padding: 0 20px;
  }
  .tui-forward-main .no-result {
    color: #999;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    line-height: 20px;
    padding: 10px;
    text-align: center;
  }
  .tui-forward-search {
    padding: 10px 15px;
  }
  .tui-forward-list {
    padding: 13px 0;
  }
  .tui-forward-list-title {
    font-weight: 600;
  }
  .tui-forward-list-item,
  .tui-forward-list-title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    line-height: 20px;
  }
  .tui-forward-list-item {
    font-weight: 400;
    justify-content: space-between;
    padding: 6px 0;
  }
  .tui-forward-list-item,
  .tui-forward-list-item .info {
    align-items: center;
    display: flex;
  }
  .tui-forward-list-item .info-nick {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    max-width: 300px;
    min-width: 180px;
    overflow: hidden;
    padding: 0 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tui-forward-footer {
    align-items: center;
    background: hsla(0, 0%, 98%, 0.94);
    display: flex;
    justify-content: space-between;
    padding: 13px 10px;
  }
  .tui-forward-footer .button {
    background: #0365f9;
    border: none;
    border-radius: 31px;
    color: #fff;
    cursor: pointer;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    padding: 10px 21px;
  }
  .tui-forward-footer-name {
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .transmitter {
    padding: 0 10px;
  }
  .transmitter .icon-send {
    transform: rotate(90deg);
  }
  .tui-message-input .tui-kit-input-box--focus {
    outline: 1px solid #147aff;
  }
  .tui-message-input .input-box {
    background: #fff;
    border: 1px solid #d3daf3;
  }
  .input-plugin-popup-box {
    background: hsla(0, 0%, 98%, 0.94);
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  }
  .checkbox {
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    position: relative;
  }
  .checkbox-default {
    border: 1px solid #ddd;
    border-radius: 14px;
    box-sizing: border-box;
    height: 14px;
    width: 14px;
  }
  .checkbox-input {
    height: 100%;
    left: 0;
    margin: 0;
    opacity: 0;
    padding: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  .info {
    background: #fff;
  }
  .warn {
    background: #faad14;
    color: #fff;
  }
  .error {
    background: #ff4d4f;
    color: #fff;
  }
  .tui-manage {
    border-left: 1px solid #f9fafb;
    display: flex;
    flex-direction: column;
    max-width: 300px;
    min-width: 200px;
    width: 22%;
  }
  .tui-manage .red {
    color: #ff584c !important;
  }
  .tui-manage .tui-manage-title {
    align-items: center;
    display: flex;
    padding: 24px 20px;
  }
  .tui-manage .tui-manage-title span {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    margin-left: 10px;
  }
  .tui-manage .tui-manage-container .tui-manage-info {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .tui-manage .tui-manage-container .tui-manage-info .info-avatar {
    margin-bottom: 20px;
    margin-top: 40px;
  }
  .tui-manage .tui-manage-container .tui-manage-info .info-name {
    font-family: PingFangSC-Medium;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
    margin-bottom: 10px;
    text-align: center;
  }
  .tui-manage .tui-manage-container .tui-manage-info .info-id {
    color: #666;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    margin-bottom: 30px;
    text-align: center;
  }
  .tui-manage .tui-manage-container .tui-manage-handle .manage-handle-box {
    align-items: center;
    background: hsla(0, 0%, 98%, 0.94);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .tui-manage .tui-manage-container .tui-manage-handle .manage-handle-box:nth-child(2) {
    cursor: pointer;
    margin-top: 10px;
  }
  .tui-manage .tui-manage-container .tui-manage-handle .manage-handle-box .manage-handle-title {
    color: rgba(0, 0, 0, 0.6);
    font-family: PingFangSC-Medium;
    font-size: 16px;
    line-height: 22px;
  }
  .self-ui-switch {
    display: inline-flex;
    vertical-align: top;
  }
  .self-ui-switch-input {
    display: none;
    height: 0;
    width: 0;
  }
  .self-ui-switch-label {
    background-color: hsla(240, 3%, 49%, 0.16);
    border-radius: 100px;
    cursor: pointer;
    height: 31px;
    position: relative;
    transition: all 0.2s;
    width: 51px;
  }
  .self-ui-switch-button {
    background-color: #fff;
    border-radius: 46px;
    box-shadow: 0 0 2px 0 hsla(0, 0%, 4%, 0.29);
    height: calc(100% - 4px);
    left: 2px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.2s;
    width: 50%;
  }
  .self-ui-switch-label .self-ui-switch-input:checked + .self-ui-switch-button {
    left: calc(100% - 2px);
    transform: translateX(-100%) translateY(-50%);
  }
  .self-ui-switch-label:active .self-ui-switch-button {
    width: 66%;
  }
  abbr,
  acronym,
  address,
  applet,
  article,
  aside,
  audio,
  b,
  big,
  blockquote,
  body,
  canvas,
  caption,
  center,
  cite,
  code,
  dd,
  del,
  details,
  dfn,
  div,
  dl,
  dt,
  em,
  embed,
  fieldset,
  figcaption,
  figure,
  footer,
  form,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  header,
  hgroup,
  html,
  i,
  iframe,
  img,
  ins,
  kbd,
  label,
  legend,
  li,
  mark,
  menu,
  nav,
  object,
  ol,
  output,
  p,
  pre,
  q,
  ruby,
  s,
  samp,
  section,
  small,
  span,
  strike,
  strong,
  sub,
  summary,
  sup,
  table,
  tbody,
  td,
  tfoot,
  th,
  thead,
  time,
  tr,
  tt,
  u,
  ul,
  var,
  video {
    border: 0;
    font-size: 100%;
    font: inherit;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }
  a,
  a:active,
  a:hover,
  a:link,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:after,
  blockquote:before,
  q:after,
  q:before {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .tui-kit {
    background-color: #fff;
    width: 100%;
  }
  .tui-conversation,
  .tui-kit {
    display: flex;
    height: 100%;
    position: relative;
    text-align: initial;
  }
  .tui-conversation {
    border-right: 1px solid #f9fafb;
    flex-direction: column;
    max-width: 400px;
    min-width: 360px;
    width: 30%;
  }
  .tui-conversation .tui-conversation-header {
    display: flex;
    padding: 10px 20px;
  }
  .tui-conversation .tui-conversation-header .tui-conversation-create-icon {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-left: 10px;
  }
  .tui-conversation .no-result {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }
  .tui-conversation .no-result-icon {
    margin: 100px auto 50px;
  }
  .tui-conversation .no-result-message {
    color: #999;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
  }
  .tui-kit-icon {
    align-items: center;
    cursor: pointer;
    display: flex;
    position: relative;
    text-align: center;
  }
  .tui-kit-icon .icon-image {
    height: 100%;
    width: 100%;
  }
  .tui-kit-icon:hover {
    border-color: currentColor;
    color: #4169e1;
  }
  .tui-kit-icon:after {
    border-radius: inherit;
    box-shadow: 0 0 0 6px #4169e1;
    content: '';
    inset: 0;
    opacity: 0;
    position: absolute;
    transition: 0.3s;
  }
  .tui-kit-icon:active:after {
    box-shadow: none;
    opacity: 0.4;
    transition: 0s;
  }
  .tui-kit-avatar {
    align-items: center;
    cursor: pointer;
    display: flex;
    position: relative;
  }
  .tui-kit-avatar.circle .avatar-image {
    border-radius: 50%;
  }
  .tui-kit-avatar.square .avatar-image {
    border-radius: 4px;
  }
  .tui-kit-avatar img {
    height: 100%;
    width: 100%;
  }
  .tui-kit-avatar:hover .tui-kit-avatar-edit {
    display: flex;
  }
  .tui-kit-avatar-edit {
    align-items: center;
    background: rgba(0, 0, 0, 0.33);
    border-radius: 100%;
    display: none;
    height: 100%;
    left: 0;
    top: 0;
  }
  .tui-kit-avatar-edit,
  .tui-kit-avatar-list {
    justify-content: center;
    position: absolute;
    width: 100%;
  }
  .tui-kit-avatar-list {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);
    display: flex;
    flex-wrap: wrap;
    max-width: 400px;
    min-width: 200px;
    padding: 10px;
    top: 100%;
    z-index: 2;
  }
  .tui-kit-avatar-list-item {
    padding: 10px;
  }
  .tui-kit-avatar-list-item img {
    width: 40px;
  }
  .conversation-list-container {
    height: 100%;
    overflow-x: hidden;
  }
  .conversation-preview-container {
    align-items: center;
    background-color: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    height: 64px;
    line-height: 17px;
    padding: 0 20px;
    width: 100%;
  }
  .conversation-preview-container .content {
    flex: 1;
    margin-left: 10px;
    max-width: 58%;
    min-width: 58%;
    text-align: left;
  }
  .conversation-preview-container .content .title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
    padding: 1px 0;
  }
  .conversation-preview-container .content .message {
    color: #7a7a7a;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    overflow: hidden;
    padding: 1px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .conversation-preview-container .external {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 90px;
    text-align: right;
  }
  .conversation-preview-container .external .unread {
    height: 19px;
    padding: 1px 0;
  }
  .conversation-preview-container .external .time {
    color: #7a7a7a;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    padding: 1px 0;
  }
  .conversation-preview-container .external .more--hover {
    display: flex;
    justify-content: right;
  }
  .conversation-preview-container .external .more--hover .icon-more {
    transform: scale(1.5);
  }
  .conversation-preview-container .external .more--hover .more-handle-box {
    bottom: auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 14px 0;
    right: 0;
    text-align: start;
    top: 0;
    white-space: nowrap;
  }
  .conversation-preview-container .external .more--hover .more-handle-box .more-handle-item {
    box-sizing: border-box;
    cursor: pointer;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    padding: 6px 16px;
  }
  .conversation-preview-container .external .more--hover .more-handle-box .more-handle-item:hover {
    background: #147aff;
    color: #fff !important;
    opacity: 0.6;
  }
  .conversation-preview-container:hover {
    background-color: rgba(0, 110, 255, 0.1);
  }
  .conversation-preview-container.conversation-preview-content--pin {
    background-color: hsla(0, 0%, 95%, 0.831);
  }
  .conversation-preview-container.conversation-preview-content--active {
    background-color: rgba(0, 110, 255, 0.1);
  }
  .conversation-preview-container.conversation-preview-content--active .title {
    color: #147aff;
  }
  .conversation-preview-container.conversation-preview-content--unread .unread {
    align-items: center;
    background: #ff3742;
    border-radius: 16px;
    color: #fff;
    display: flex;
    font-size: 11px;
    font-weight: 700;
    height: 13px;
    justify-content: center;
    margin: 2px 0 2px auto;
    padding: 2px 5px 1px;
    width: 16px;
  }
  .popup {
    opacity: 0;
  }
  .popup-show {
    opacity: 1;
  }
  .plugin {
    gap: 8px;
    padding: 0 8px;
  }
  .plugin,
  .plugin-popup {
    align-items: center;
    display: flex;
    height: 100%;
  }
  .plugin-popup {
    position: relative;
  }
  .plugin-popup-box {
    background: #fff;
    border-radius: 16px;
    bottom: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 2;
  }
  .profile {
    background: #f9fafb;
    flex-direction: row;
    font-family: PingFangSC-Medium;
    justify-content: space-between;
    padding: 16px 20px;
  }
  .profile,
  .profile .profile-content {
    align-items: center;
    display: flex;
  }
  .profile .profile-content .profile-name {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-weight: 600;
    margin-left: 10px;
  }
  .conversation-search-result.no-result {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }
  .conversation-search-result.no-result-icon {
    margin: 100px auto 50px;
  }
  .conversation-search-result.no-result-message {
    color: #999;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
  }
  .conversation-search-input {
    height: 36px;
    width: 100%;
  }
  .tui-kit-input-box {
    align-items: center;
    background: hsla(0, 0%, 98%, 0.94);
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    height: 36px;
    padding: 0 8px;
  }
  .tui-kit-input-box.tui-kit-input-box--focus {
    outline: 1px solid #147aff;
  }
  .tui-kit-input-box.tui-kit-input-border--bottom {
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0;
    outline: none;
  }
  .tui-kit-input-box .tui-kit-input {
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-left: 6px;
    margin-right: auto;
  }
  .tui-kit-input-box .tui-kit-input:focus {
    border: none;
    outline: none;
  }
  .tui-kit-input-box .tui-kit-input::-moz-placeholder {
    color: rgba(67, 60, 63, 0.6);
    font-weight: 400;
    padding: 2px 0;
  }
  .tui-kit-input-box .tui-kit-input::placeholder {
    color: rgba(67, 60, 63, 0.6);
    font-weight: 400;
    padding: 2px 0;
  }
  .tui-conversation-create-header {
    align-items: center;
    background-color: #f9fafb;
    display: flex;
    flex-direction: row;
    padding: 16px 20px;
    text-align: center;
  }
  .tui-conversation-create-header .title {
    color: #000;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.41px;
    line-height: 32px;
    margin-left: 10px;
  }
  .tui-conversation-create-search-input {
    margin: 10px;
  }
  .tui-user {
    align-items: center;
    cursor: pointer;
    display: flex;
    padding: 10px;
    text-align: center;
  }
  .tui-user:hover {
    background-color: rgba(0, 110, 255, 0.1);
  }
  .tui-user .tui-user-name {
    color: #000;
    font-weight: 400;
    margin-left: 10px;
  }
  .tui-user .tui-user-name,
  .tui-user .tui-user-name.active {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    line-height: 20px;
  }
  .tui-user .tui-user-name.active {
    color: #0365f9;
    font-weight: 600;
  }
  .tui-user-checkbox-label .tui-user-checkbox {
    margin-left: auto;
  }
  .tui-user-checkbox-label input[type='checkbox'] {
    cursor: pointer;
  }
  .tui-conversation-create-next-container {
    display: flex;
    justify-content: center;
    margin: 20px auto 10px;
    width: 100%;
  }
  .tui-conversation-create-next-container .tui-conversation-create-next {
    background-color: #0365f9;
    border-radius: 31px;
    color: #fff;
    cursor: pointer;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    line-height: 20px;
    padding: 12px 36px;
    text-align: center;
    width: 12%;
  }
  .tui-conversation-create {
    overflow-y: auto;
  }
  .tui-conversation-create .tui-conversation-create-container {
    position: relative;
  }
  .tui-conversation-create .tui-conversation-create-container .tui-group-container {
    width: 100%;
  }
  .tui-conversation-create .tui-conversation-create-container .tui-group-box .title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 10px;
  }
  .conversation-create-select-view {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
  .conversation-create-select-view .select-view-info {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 6px;
    position: relative;
    width: calc(20% - 2px);
  }
  .conversation-create-select-view .select-view-info .select-view-info-close {
    position: absolute;
    right: 15px;
    top: 6px;
    z-index: 2;
  }
  .conversation-create-select-view .select-view-info .select-view-info-nick {
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
  .toast {
    border-radius: 5px;
    box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);
    margin: 20px;
    max-width: 50%;
    padding: 10px;
    position: fixed;
    top: 0;
    word-break: break-all;
    z-index: 10;
  }
  .tui-conversation-create-group-detail .create-group-box {
    padding: 10px 0;
  }
  .tui-conversation-create-group-detail .input-group-text {
    color: #000;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
  }
  .tui-conversation-create-group-detail .create-group-name .input-group-name {
    color: #000;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 700;
    line-height: 19px;
  }
  .tui-conversation-create-group-detail .input-group-title {
    color: rgba(0, 0, 0, 0.4);
    width: 106px;
  }
  .tui-conversation-create-group-detail .create-group-illustrate {
    color: rgba(0, 0, 0, 0.4);
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-weight: 400;
    line-height: 17px;
    padding-left: 8px;
    text-align: justify;
  }
  .tui-conversation-create-group-detail .create-group-portrait .create-group-portrait-title {
    color: #000;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 20px 0 20px 8px;
  }
  .tui-conversation-create-group-detail .create-group-portrait .create-group-portrait-info-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
  .tui-conversation-create-group-detail .create-group-portrait .create-group-portrait-info-container .create-group-portrait-info {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 6px;
    width: calc(16.66667% - 1.66667px);
  }
  .tui-conversation-create-group-detail .create-group-portrait .create-group-portrait-info-container .create-group-portrait-info-nick {
    font-family: PingFangSC-Medium;
    font-size: 12px;
    margin-top: 6px;
  }
  .tui-conversation-group-type-info {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
  }
  .tui-conversation-group-type-info .group-type-info-box {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    padding: 12px 16px;
  }
  .tui-conversation-group-type-info .group-type-info-box.group-type-info-box--active,
  .tui-conversation-group-type-info .group-type-info-box:hover {
    border: 1px solid #147aff;
  }
  .tui-conversation-group-type-info .group-type-info-box .group-type-info-title {
    align-items: center;
    color: rgba(0, 0, 0, 0.8);
    display: flex;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    line-height: 22px;
  }
  .tui-conversation-group-type-info .group-type-info-box .group-type-info-title .box-active-icon {
    margin-right: 8px;
  }
  .tui-conversation-group-type-info .group-type-info-box .group-type-info-description {
    color: rgba(0, 0, 0, 0.4);
    font-family: PingFangSC-Medium;
    font-size: 12px;
    line-height: 17px;
    text-align: justify;
  }
  .tui-conversation-group-type-info .group-type-info-document {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    line-height: 22px;
    margin: 1rem auto;
    text-align: justify;
    text-decoration: none;
  }
  .tui-conversation-group-type-info .group-type-info-document:active,
  .tui-conversation-group-type-info .group-type-info-document:link,
  .tui-conversation-group-type-info .group-type-info-document:visited {
    color: #104ef5;
  }
  .tui-profile {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 400px;
    min-width: 360px;
    width: 30%;
  }
  .tui-profile-header {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    line-height: 32px;
    padding: 16px 20px;
    width: 100%;
  }
  .tui-profile-header h1 {
    font-weight: 600;
    padding: 0 11px;
  }
  .tui-profile-main {
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    padding: 20px;
  }
  .tui-profile-avatar {
    margin: 13px 0;
    position: relative;
  }
  .tui-profile .displayFlex {
    display: flex;
  }
  .tui-profile-nick {
    font-family: PingFangSC-Medium;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
    text-align: center;
  }
  .tui-profile-nick .show {
    padding-left: 25px;
  }
  .tui-profile-ID {
    align-items: center;
    color: #666;
    display: flex;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    padding: 6px 0;
  }
  .tui-profile-list {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    width: 100%;
  }
  .tui-profile-list-item {
    padding: 20px 0 0;
  }
  .tui-profile-list-item h4 {
    color: rgba(0, 0, 0, 0.6);
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    padding-bottom: 3px;
  }
  .tui-profile-div-with-edit {
    border-bottom: 1px solid #eee;
    padding: 4px 0;
  }
  .tui-profile-edit {
    border-bottom: none !important;
  }
  .tui-profile-birthday .react-date-picker__wrapper {
    display: none !important;
  }
  .tui-profile-birthday .react-date-picker__calendar {
    position: static !important;
  }
  .tui-profile-birthday-calendar {
    border: none !important;
  }
  .tui-profile {
    background: #fff;
  }
  .tui-profile-header {
    background: #f9fafb;
  }
  .div-with-edit {
    box-sizing: border-box;
  }
  .div-with-edit,
  .div-with-edit-popup {
    display: flex;
    flex: 1;
    max-width: 100%;
  }
  .div-with-edit .show {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: space-between;
    position: relative;
    word-break: break-all;
  }
  .div-with-edit .show:hover .icon-edit {
    display: flex;
  }
  .div-with-edit .show .icon-edit {
    display: none;
  }
  .div-with-edit .icon {
    margin-left: 10px;
    width: 25px;
  }
  .div-with-edit .edit {
    align-items: center;
    border-bottom: 1px solid #eee;
    display: flex;
    flex: 1;
    justify-content: space-between;
    padding: 0 10px;
    position: relative;
  }
  .div-with-edit .edit input {
    border: none;
    flex: 1;
    font-size: inherit;
  }
  .div-with-edit .edit input:focus {
    border: none;
    outline: none;
  }
  .div-with-edit .edit .select {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    min-width: 100%;
    padding: 10px 0;
    position: absolute;
    top: 100%;
    z-index: 2;
  }
  .div-with-edit .edit .select-list-item {
    padding: 5px 10px;
  }
  .div-with-edit .edit .select-list-item:hover {
    background: #f2f7ff;
  }
  .message-default {
    align-items: center;
    cursor: pointer;
    display: flex;
    flex: 1;
    font-family: SF Pro Text;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    width: 100%;
  }
  .message-default .avatar,
  .message-default .avatar img {
    width: 45px;
  }
  .message-default .content {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
  }
  .message-default .content .name {
    display: inline-block;
    padding-bottom: 3px;
  }
  .in {
    display: flex;
    flex: 1;
    flex-direction: row;
    gap: 10px;
    justify-self: flex-start;
  }
  .in .content {
    align-items: flex-start;
    flex: 1;
  }
  .out {
    display: flex;
    flex: 1;
    flex-direction: row-reverse;
    gap: 10px;
    justify-self: flex-end;
  }
  .out .content {
    align-items: flex-end;
    flex: 1;
  }
  .tip {
    justify-self: center !important;
    width: auto;
  }
  .bubble {
    padding: 8px 16px;
  }
  .bubble-in {
    border-radius: 16px 16px 16px 0;
  }
  .bubble-in.group {
    border-radius: 0 16px 16px 16px;
  }
  .bubble-out {
    border-radius: 16px 16px 0 16px;
  }
  .message-status {
    align-items: flex-end;
    align-self: flex-end;
    display: flex;
  }
  .message-status .time {
    color: #7a7a7a;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    padding: 5px 0 0 10px;
    text-align: right;
    width: -moz-max-content;
    width: max-content;
  }
  .message-image,
  .message-video {
    position: relative;
  }
  .message-image .message-status,
  .message-video .message-status {
    bottom: 10px;
    position: absolute;
    right: 10px;
  }
  .message-image .message-status .time,
  .message-video .message-status .time {
    color: #fff;
  }
  .message-text {
    display: flex;
  }
  .message-text-content {
    display: inline;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    word-break: break-word;
  }
  .message-text-content-p {
    display: inline;
    vertical-align: middle;
  }
  .message-text-content .message-status {
    clear: right;
    display: inline-flex;
    float: right;
  }
  .message-text,
  .message-tip {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
  }
  .message-text .text-img,
  .message-tip .text-img {
    height: 20px;
    vertical-align: middle;
    width: 20px;
  }
  .message-image {
    background: #fff;
  }
  .message-image img {
    max-width: 300px;
  }
  .message-image .big-image {
    max-height: 95%;
    max-width: 95%;
  }
  .message-video {
    max-width: 300px;
  }
  .message-video .snap-video {
    position: relative;
  }
  .message-video .snap-video:before {
    border: 15px solid transparent;
    border-left: 20px solid #fff;
    bottom: 0;
    content: '';
    height: 0;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    z-index: 1;
  }
  .message-video video {
    border-radius: 10px;
    width: 100%;
  }
  .message-video .play-video {
    max-height: 95%;
    max-width: 95%;
  }
  .message-file {
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
  }
  .message-file-main {
    align-items: center;
    background: #fff;
    border-radius: 4px;
    display: flex;
    padding: 12px;
  }
  .message-file-main .icon {
    margin-right: 7px;
  }
  .message-file-footer {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
  }
  .message-file-footer .time {
    padding-top: 10px;
  }
  .message-file-size {
    color: #7a7a7a;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    padding-top: 10px;
  }
  .message-merger {
    background: #ecebeb;
    display: flex;
    flex-direction: column;
  }
  .message-merger h3 {
    border-bottom: 1px solid #a1a1a1;
    padding-bottom: 4px;
  }
  .message-merger-list {
    opacity: 0.6;
  }
  .message-merger-item {
    padding-top: 4px;
  }
  .meesage-bubble-reply {
    background: #ecebeb;
    padding: 8px 16px;
  }
  .meesage-bubble-reply-in {
    border-radius: 16px 16px 16px 0;
  }
  .meesage-bubble-reply-out {
    border-radius: 16px 16px 0 16px;
  }
  .meesage-bubble-reply .message-text {
    border: none;
    border-radius: none;
  }
  .meesage-bubble-reply .bubble {
    padding: 0;
  }
  .meesage-bubble-reply .bubble-in {
    border-radius: 0;
  }
  .meesage-bubble-reply-main {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 14px;
    position: relative;
  }
  .meesage-bubble-reply-main:before {
    background: #d9d9d9;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 6px;
  }
  .meesage-bubble-reply-main .title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    padding-bottom: 10px;
  }
  .meesage-bubble-reply-main .message-context {
    opacity: 0.6;
  }
  .meesage-bubble {
    align-items: flex-end;
    display: flex;
  }
  .meesage-bubble-status {
    margin: 3px;
  }
  .meesage-bubble-context {
    align-items: center;
    display: flex;
    gap: 10px;
  }
  .meesage-bubble-context .message-context {
    flex: 1;
  }
  .icon-fail {
    align-items: center;
    background: #fa5151;
    border-radius: 14px;
    display: inline-flex;
    height: 14px;
    justify-content: center;
    position: relative;
    width: 14px;
  }
  .icon-fail:before {
    color: #fff;
    content: '!';
    font-family: PingFangSC-Medium;
    font-size: 12px;
    position: absolute;
  }
  .message-face {
    display: flex;
    flex-direction: column;
  }
  .message-face .img {
    max-width: 88px;
  }
  .loading {
    display: inline-block;
    position: relative;
  }
  .loading .img,
  .loading video {
    border-radius: 10px;
    max-width: 300px;
    min-height: 60px;
    min-width: 60px;
  }
  .loading:before {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    height: 100%;
    width: 100%;
  }
  .loading:after,
  .loading:before {
    content: '';
    left: 0;
    position: absolute;
    top: 0;
  }
  .loading:after {
    animation: spin 2s linear infinite;
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top-color: #555;
    bottom: 0;
    display: inline-block;
    height: 30px;
    margin: auto;
    right: 0;
    width: 30px;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(1turn);
    }
  }
  .message-plugin {
    margin: 0 5px;
    width: 32px;
  }
  .message-plugin .icon-more {
    transform: scale(1.5);
  }
  .message-plugin .plugin-popup-box {
    bottom: auto;
    top: 100%;
  }
  .message-plugin-top {
    bottom: 100% !important;
    top: auto !important;
  }
  .message-plugin-left {
    left: -140px !important;
  }
  .message-plugin-box {
    padding: 6px 0;
  }
  .message-plugin-item {
    align-items: center;
    display: flex;
    font-family: PingFangSC-Medium;
    font-size: 12.8px;
    font-weight: 500;
    justify-content: space-between;
    line-height: 15px;
    min-width: 144px;
    padding: 6px 13px;
  }
  .message-plugin-item:hover {
    background: rgba(0, 110, 255, 0.1);
    color: #147aff;
  }
  .message-plugin-item .del {
    color: #ff584c;
  }
  .message-custom {
    display: flex;
    word-break: break-all;
  }
  .message-custom a {
    color: #679ce1;
    text-decoration: none;
  }
  .message-custom a,
  .message-custom p {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
  }
  .message-revoke {
    color: #999;
  }
  .message-audio {
    align-items: center;
    display: flex;
  }
  .message-audio .out {
    transform: rotate(180deg);
  }
  .message-audio-none {
    display: none;
  }
  .message-audio-content {
    align-items: center;
    display: flex;
    gap: 10px;
  }
  .message-audio-out {
    flex-direction: row-reverse;
  }
  .message-audio .playing {
    animation: playingAnimation 1s ease-in-out infinite;
  }
  @keyframes playingAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
  .high-lighted {
    animation: highLightedAnimation 1s ease-in-out forwards;
  }
  @keyframes highLightedAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
  .progress-box {
    display: flex;
    height: 5px;
    justify-content: flex-start;
    width: 100%;
  }
  .progress-box .progress {
    background: #147aff;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    display: inline-block;
    height: 5px;
    width: 0;
  }
  .message-custom,
  .message-text {
    border: 1px solid #ddd;
  }
  .bubble-out {
    border: 1px solid #f2f7ff;
  }
  .bubble-out,
  .meesage-bubble-reply-out {
    background: #f2f7ff;
  }
  .meesage-bubble-reply-out .meesage-bubble-reply-main .message-text {
    background: none;
  }
  .message-tip {
    color: #999;
  }
  .tip .bubble .edit {
    color: #147aff;
  }
  .model {
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    height: 100vh;
    justify-content: center;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 2;
  }
  .chat {
    background: #fff;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    position: relative;
    width: 100%;
  }
  .tui-chat-header {
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 20px;
  }
  .tui-chat-header,
  .tui-chat-header-left {
    align-items: center;
    display: flex;
  }
  .tui-chat-header .header-content {
    flex: 1;
    padding: 0 8px;
  }
  .tui-chat-header-right .header-handle-more {
    padding: 10px 3px;
  }
  .tui-chat-header .title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
  }
  .tui-chat-header .system {
    height: 32px;
  }
  div,
  label,
  li,
  p,
  span,
  ul {
    margin: 0;
    padding: 0;
  }
  .message-list {
    flex: 1;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 20px;
    position: relative;
  }
  .message-list.hide {
    opacity: 0;
  }
  .message-list-item {
    display: grid;
    padding: 5px 0;
  }
  .message-list .no-more {
    color: #999;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
  }
  .message-list .no-more,
  .message-list-time {
    font-family: PingFangSC-Medium;
    text-align: center;
  }
  .message-list-time {
    color: #7a7a7a;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    padding: 10px;
  }
  .tui-message-input {
    display: flex;
    flex-direction: column;
  }
  .tui-message-input-main {
    align-items: center;
    display: flex;
    flex: 1;
    gap: 12px;
    padding: 14px 12px;
  }
  .tui-message-input-main .input-box {
    border-radius: 15px;
    display: flex;
    flex: 1;
    max-height: 200px;
    min-height: 20px;
    overflow: hidden;
    padding: 10px;
    position: relative;
  }
  .tui-message-input-main .input-box .input-visibility-content {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 17px;
    max-width: -webkit-fill-available;
    padding: 1px 2px;
    visibility: hidden;
    word-break: break-all;
  }
  .tui-message-input-main .input-box textarea {
    background: none;
    border: none;
    flex: 1;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    height: -webkit-fill-available;
    left: 0;
    line-height: 17px;
    margin: 9px;
    position: absolute;
    resize: none;
    top: 0;
    width: -webkit-fill-available;
  }
  .tui-message-input-main .input-box textarea:active,
  .tui-message-input-main .input-box textarea:focus {
    border: none;
    outline: none;
  }
  .tui-message-input-main .disabled {
    display: none;
  }
  .tui-message-input-box {
    align-items: center;
    display: flex;
    flex: 1;
  }
  ul li {
    list-style: none;
  }
  .input-plugin-popup {
    position: relative;
  }
  .input-plugin-popup-box {
    bottom: 30px;
    position: absolute;
    z-index: 2;
  }
  .input-plugin-item {
    display: flex;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 19px;
  }
  .input-plugin-item span {
    padding: 0 17px;
  }
  .emoji-picker .face-list {
    display: flex;
    flex-wrap: wrap;
    max-height: 120px;
    min-width: 265px;
    overflow-y: auto;
    padding: 10px 5px;
  }
  .emoji-picker .face-list-item {
    cursor: pointer;
    padding: 5px;
  }
  .emoji-picker .face-list-item img {
    width: 20px;
  }
  .emoji-picker .face-list-item .face-img {
    width: 38px;
  }
  .emoji-picker .face-tab {
    align-items: center;
    display: flex;
    min-width: 265px;
  }
  .emoji-picker .face-tab-item {
    cursor: pointer;
    padding: 10px;
    width: 24px;
  }
  .emoji-picker .face-tab-item img {
    width: 100%;
  }
  .emoji-picker .emoji-plugin-right {
    right: 0;
  }
  .upload-picker {
    min-width: 180px;
    padding: 10px 16px;
    position: relative;
  }
  .upload-picker:hover {
    background: rgba(0, 110, 255, 0.1);
    color: #147aff;
  }
  .upload-picker input {
    cursor: pointer;
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  .input-quote {
    align-items: center;
    background: #f9f9f9;
    display: flex;
    padding: 7px 16px;
  }
  .input-quote-content {
    background: #fff;
    color: #000;
    display: flex;
    flex: 1;
    flex-direction: column;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    padding: 2px 14px;
    position: relative;
  }
  .input-quote-content:before {
    background: #999;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 6px;
  }
  .input-quote-content span {
    opacity: 0.6;
    padding-top: 8px;
  }
  .input-quote .icon {
    margin: 0 5px 0 16px;
  }
  .tui-forward {
    background: #fff;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 300px;
  }
  .tui-forward-header {
    align-items: center;
    display: flex;
    padding: 24px 20px;
  }
  .tui-forward-title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 17px;
    padding: 0 16px;
  }
  .tui-forward-main {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    padding: 0 20px;
  }
  .tui-forward-main .no-result {
    color: #999;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    line-height: 20px;
    padding: 10px;
    text-align: center;
  }
  .tui-forward-search {
    padding: 10px 15px;
  }
  .tui-forward-list {
    padding: 13px 0;
  }
  .tui-forward-list-title {
    font-weight: 600;
  }
  .tui-forward-list-item,
  .tui-forward-list-title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    line-height: 20px;
  }
  .tui-forward-list-item {
    font-weight: 400;
    justify-content: space-between;
    padding: 6px 0;
  }
  .tui-forward-list-item,
  .tui-forward-list-item .info {
    align-items: center;
    display: flex;
  }
  .tui-forward-list-item .info-nick {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    max-width: 300px;
    min-width: 180px;
    overflow: hidden;
    padding: 0 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tui-forward-footer {
    align-items: center;
    background: hsla(0, 0%, 98%, 0.94);
    display: flex;
    justify-content: space-between;
    padding: 13px 10px;
  }
  .tui-forward-footer .button {
    background: #0365f9;
    border: none;
    border-radius: 31px;
    color: #fff;
    cursor: pointer;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    padding: 10px 21px;
  }
  .tui-forward-footer-name {
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .transmitter {
    padding: 0 10px;
  }
  .transmitter .icon-send {
    transform: rotate(90deg);
  }
  .tui-message-input .tui-kit-input-box--focus {
    outline: 1px solid #147aff;
  }
  .tui-message-input .input-box {
    background: #fff;
    border: 1px solid #d3daf3;
  }
  .input-plugin-popup-box {
    background: hsla(0, 0%, 98%, 0.94);
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  }
  .checkbox {
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    position: relative;
  }
  .checkbox-default {
    border: 1px solid #ddd;
    border-radius: 14px;
    box-sizing: border-box;
    height: 14px;
    width: 14px;
  }
  .checkbox-input {
    height: 100%;
    left: 0;
    margin: 0;
    opacity: 0;
    padding: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }
  .info {
    background: #fff;
  }
  .warn {
    background: #faad14;
    color: #fff;
  }
  .error {
    background: #ff4d4f;
    color: #fff;
  }
  .tui-manage {
    border-left: 1px solid #f9fafb;
    display: flex;
    flex-direction: column;
    max-width: 300px;
    min-width: 200px;
    width: 22%;
  }
  .tui-manage .red {
    color: #ff584c !important;
  }
  .tui-manage .tui-manage-title {
    align-items: center;
    display: flex;
    padding: 24px 20px;
  }
  .tui-manage .tui-manage-title span {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
    margin-left: 10px;
  }
  .tui-manage .tui-manage-container .tui-manage-info {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .tui-manage .tui-manage-container .tui-manage-info .info-avatar {
    margin-bottom: 20px;
    margin-top: 40px;
  }
  .tui-manage .tui-manage-container .tui-manage-info .info-name {
    font-family: PingFangSC-Medium;
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
    margin-bottom: 10px;
    text-align: center;
  }
  .tui-manage .tui-manage-container .tui-manage-info .info-id {
    color: #666;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    margin-bottom: 30px;
    text-align: center;
  }
  .tui-manage .tui-manage-container .tui-manage-handle .manage-handle-box {
    align-items: center;
    background: hsla(0, 0%, 98%, 0.94);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .tui-manage .tui-manage-container .tui-manage-handle .manage-handle-box:nth-child(2) {
    cursor: pointer;
    margin-top: 10px;
  }
  .tui-manage .tui-manage-container .tui-manage-handle .manage-handle-box .manage-handle-title {
    color: rgba(0, 0, 0, 0.6);
    font-family: PingFangSC-Medium;
    font-size: 16px;
    line-height: 22px;
  }
  .self-ui-switch {
    display: inline-flex;
    vertical-align: top;
  }
  .self-ui-switch-input {
    display: none;
    height: 0;
    width: 0;
  }
  .self-ui-switch-label {
    background-color: hsla(240, 3%, 49%, 0.16);
    border-radius: 100px;
    cursor: pointer;
    height: 31px;
    position: relative;
    transition: all 0.2s;
    width: 51px;
  }
  .self-ui-switch-button {
    background-color: #fff;
    border-radius: 46px;
    box-shadow: 0 0 2px 0 hsla(0, 0%, 4%, 0.29);
    height: calc(100% - 4px);
    left: 2px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.2s;
    width: 50%;
  }
  .self-ui-switch-label .self-ui-switch-input:checked + .self-ui-switch-button {
    left: calc(100% - 2px);
    transform: translateX(-100%) translateY(-50%);
  }
  .self-ui-switch-label:active .self-ui-switch-button {
    width: 66%;
  }
`
