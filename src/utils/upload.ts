import { message } from 'antd'

//检验文件大小
export function checkSize(file: any, size: any) {
  return new Promise(function (resolve, reject) {
    if (file.size / 1024 / 1024 > size) {
      message.error({
        content: '文件大小超出限制，请重新上传'
      })
      reject()
    } else {
      resolve('ok')
    }
  })
}

//检验文件类型
export function checkType(file: any, typeList: any) {
  return new Promise(function (resolve, reject) {
    if (!typeList.includes(file.type)) {
      message.error({
        content: '文件类型错误，请重新上传'
      })
      reject()
    } else {
      resolve('ok')
    }
  })
}
