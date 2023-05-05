/*
 * @Author: hqk
 * @Date: 2023-03-06 22:31:07
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-19 19:12:05
 * @Description:
 */
import { format } from 'timeago.js'
import dayjs from 'dayjs'

/**
 * @description:时间
 * @param {string} time
 * @return {*}
 */
export default function formatTimeago(time: string) {
  return format(time, 'zh_CN')
}

export function formatStringToDayjs(date: string) {
  return dayjs(date)
}
export function formatTime(date: string, formatString = 'YYYY-MM') {
  return dayjs(date).format(formatString)
}
