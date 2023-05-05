/*
 * @Author: hqk
 * @Date: 2023-02-25 14:13:17
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-31 09:56:42
 * @Description:
 */
export function validatePhone(): RegExp {
  const regMobilePhone = /^(?:(?:\+|00)86)?1\d{10}$/ //手机
  return regMobilePhone
}

export function validateCode(): RegExp {
  const regCode = /^[0-9]\d{5}$/
  return regCode
}

export function validatePassword(): RegExp {
  // 密码(6-16位字母和数字组合)：
  const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
  return regPassword
}

/**
 * @description: 判断字符串中中文的数目
 * @param {*} word 字符串
 * @return {*}
 */
export function getChineseNum(word: string) {
  let ChineseNum = 0
  const rule =
    /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/
  word.split('').forEach((item) => {
    if (rule.exec(item)) {
      ChineseNum++
    }
  })
  return ChineseNum
}

/**
 * @description:用户名校验，4到16位（字母，数字，下划线，减号）
 * @return {*}
 */
export function validateAccount(): RegExp {
  return /^[\w-]{4,16}$/
}

/**
 * @description:姓名检验
 * @return {*}
 */
export function validateRealName(): RegExp {
  return /^(?:[\u4e00-\u9fa5·]{2,16})$/
}

/**
 * @description:邮箱验证
 * @return {*}
 */
export function validateEmail(): RegExp {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}
