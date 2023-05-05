/*
 * @Author: hqk
 * @Date: 2022-09-24 21:58:59
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-08 17:54:52
 * @Description:
 */
import AMapLoader from '@amap/amap-jsapi-loader'

let plugins: any[] = []
export function initMap({ plugin }: any, callBack: (map: any) => void) {
  plugins = [...plugins, ...plugin]
  AMapLoader.load({
    key: '4737ad9caecf44ee10fad88df94af610', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      callBack(AMap)
    })
    .catch((e) => {
      console.log(e)
    })
}

/**
 * @description:根据ip地址查询当前位置
 * @return {*}
 */
export function queryCityByIp() {
  return new Promise((resolve) => {
    initMap({ plugin: ['AMap.CitySearch'] }, (AMap) => {
      const citySearch = new AMap.CitySearch()
      citySearch.getLocalCity(function (status: string, result: any) {
        if (status === 'complete' && result.info === 'OK') {
          // 查询成功，result即为当前所在城市信息
          resolve(result)
        }
      })
    })
  })
}

/**
 * @description: 获取当地的位置的经纬度
 * @return {*} {longitude,latitude}
 */
export function queryCurrentPosition() {
  return new Promise((resolve, reject) => {
    initMap({ plugin: ['AMap.Geolocation'] }, (AMap) => {
      const Geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000
        // 定位按钮的停靠位置的偏移量
      })
      Geolocation.getCurrentPosition(function (status: string, result: any) {
        if (status == 'complete') {
          const {
            position: { lng: longitude, lat: latitude }
          } = result
          resolve({
            longitude,
            latitude
          })
        } else {
          reject(result)
        }
      })
    })
  })
}

/**
 * @description: 根据经纬度查询当前的位置
 * @param {*} longitude 经度
 * @param {*} latitude 纬度
 * @return {*}
 */
export function queryCityByPosition({ longitude, latitude }: { longitude: number; latitude: number }) {
  return new Promise((resolve) => {
    initMap({ plugin: ['AMap.Geocoder'] }, (AMap) => {
      const Geocoder = new AMap.Geocoder({
        radius: 0
      })
      const lnglat = [longitude, latitude]
      Geocoder.getAddress(lnglat, function (status: string, result: any) {
        if (status === 'complete' && result.info === 'OK') {
          // result为对应的地理位置详细信息
          resolve(result)
        }
      })
    })
  })
}

export function getAddressBySeachPamrm(searchPamrm: string) {
  return new Promise((resolve) => {
    initMap({ plugin: ['AMap.AutoComplete'] }, (AMap) => {
      const autoOptions = {
        //city 限定城市，默认全国
        city: '全国'
      }
      // 实例化AutoComplete
      const autoComplete = new AMap.AutoComplete(autoOptions)
      // 根据关键字进行搜索
      autoComplete.search(searchPamrm, function (status: string, result: any) {
        // 搜索成功时，result即是对应的匹配数据
        if (status === 'complete' && result.info === 'OK') {
          // result为对应的地理位置详细信息
          resolve(result)
        }
      })
    })
  })
}
