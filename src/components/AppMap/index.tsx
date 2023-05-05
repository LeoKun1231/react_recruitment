/*
 * @Author: hqk
 * @Date: 2023-04-08 15:10:20
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-08 18:28:27
 * @Description:
 */
import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { AppMapWrapper } from './style'
import { initMap } from '@/utils/map'
import { useMemoizedFn } from 'ahooks'
interface IProps {
  children?: ReactNode
}

interface IHandler {
  setAddress: (address: { longitude: number | string; latitude: number | string }) => void
}

const AppMap = forwardRef<IHandler, IProps>((props, ref) => {
  const [map, setMap] = useState<any>({})
  const [mark, setMaker] = useState<any>()

  useEffect(() => {
    initMap({ plugin: [] }, (AMap) => {
      //防止刷新,失去经纬度
      const { longitude, latitude } = { longitude: 116.38, latitude: 39.9 }
      const appMap = new AMap.Map('map', {
        viewMode: '2D', //是否为3D地图模式
        zoom: 16, //初始化地图级别
        center: [longitude, latitude] //初始化地图中心点位置
      })
      const marker = new AMap.Marker({
        position: [longitude, latitude] //位置
      })
      appMap.add(marker) //添加到地图

      // 同时引入工具条插件，比例尺插件和鹰眼插件
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation', 'AMap.Geocoder'], function () {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        appMap.addControl(
          new AMap.ToolBar({
            position: 'RT'
          })
        )
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        appMap.addControl(new AMap.Scale())
        // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
        const Geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认：true
          timeout: 10000, // 设置定位超时时间，默认：无穷大
          offset: [10, 20], // 定位按钮的停靠位置的偏移量
          zoomToAccuracy: true //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        })

        appMap.addControl(Geolocation)
        setMaker(marker)
        //监听定位按钮的点击,更新地理位置以及大头针位置
        const geolocation = document.querySelector('.amap-geolocation')
        geolocation!.addEventListener('click', () => {
          Geolocation.getCurrentPosition(function (status: string, result: any) {
            if (status == 'complete') {
              const {
                position: { lng: longitude, lat: latitude }
              } = result
              marker.setPosition([longitude, latitude]) //更新点标记位置
            } else {
              // reject(result)
            }
          })
        })
      })
      setMap(appMap)
    })
  }, [])

  useImperativeHandle(
    ref,
    useMemoizedFn(() => {
      return {
        setAddress(address: { longitude: number | string; latitude: number | string }) {
          const { longitude, latitude } = address
          mark.setPosition([longitude, latitude])
          map.setCenter([longitude, latitude])
        }
      }
    }),
    [mark]
  )

  return (
    <AppMapWrapper>
      {/* 初始化创建地图容器,div标签作为地图容器，同时为该div指定id属性； */}
      <div id="map" className="map" style={{ height: '300px' }}></div>
    </AppMapWrapper>
  )
})

export default memo(AppMap)
