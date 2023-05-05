/*
 * @Author: hqk
 * @Date: 2023-04-11 13:18:51
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-11 19:47:32
 * @Description:
 */
import React, { memo, useState, useRef, ElementRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import type { FC, ReactNode } from 'react'
import cityData from '@/assets/data/city.json'
import AppAddSelect from '@/components/AppAddSelect'
import { useDebounceFn, useMemoizedFn } from 'ahooks'
import AppMap from '@/components/AppMap'
import { getAddressBySeachPamrm } from '@/utils/map'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import { AddJobAction, getJobDetailAction, updateDataByIdAction } from '@/store/features/admin'
import { useRulesConfig } from '../config/rule.config'
import JobData from '@/assets/data/job.json'
import AppSectionEditor from '@/components/AppSectionEditor'
import { EditFilled, SaveOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, Cascader, Form, Input, InputNumber, Row, Col, Select, Modal } from 'antd'
interface IProps {
  children?: ReactNode
  jobId?: string
  disabled?: boolean
  isShowEdit?: boolean
  close?: () => void
}

interface IHandler {
  reset: () => void
}

interface ISearchResult {
  label: string
  value: [number, number]
}
const options = [
  '五险一金',
  '补充医疗保险',
  '定期体检',
  '加班补助',
  '年终奖',
  '带薪年假',
  '员工旅游',
  '免费班车',
  '股票期权',
  '餐补',
  '通讯补贴',
  '交通补助',
  '包吃',
  '包吃包住',
  '节日福利',
  '零食下午茶'
]
const {
  jobTypeRules,
  jobNameRules,
  jobRequireRules,
  startMoneyRules,
  endMoneyRules,
  moneyMonthRules,
  cityRules,
  tagRules,
  wealRules,
  jobDescRules
} = useRulesConfig()

const JobInfo = forwardRef<IHandler, IProps>((props, ref) => {
  let arr: any[] = []
  const { jobId, disabled: isDisabled, isShowEdit, close } = props
  const [editId, setEditId] = useState('')
  const [disabled, setDisabled] = useState(() => {
    return isDisabled
  })

  const { companyId } = useAppSelector((state) => {
    return {
      companyId: state.login.loginUser.companyId
    }
  }, useAppShallowEqual)

  const [searchData, setSearchData] = useState<ISearchResult[]>([])

  const appMapRef = useRef<ElementRef<typeof AppMap>>(null)

  const { run: handleSearch } = useDebounceFn(
    (value: string) => {
      getAddressBySeachPamrm(value).then((res: any) => {
        if (res.info == 'OK') {
          const data = res.tips
            .map((item: any) => {
              if (Object.keys(item?.location).length > 0) {
                return {
                  label: item.name,
                  value: [item?.location?.lat, item?.location?.lng]
                }
              }
            })
            .filter((item: any) => item && item.value.length > 0 && item.value[0] != undefined && item.value[1] != undefined)
          setSearchData(data)
        }
      })
    },
    {
      wait: 500
    }
  )

  const [form] = Form.useForm()

  const dispatch = useAppDispatch()

  const handleReset = useMemoizedFn(async () => {
    form.resetFields()
  })

  const handleSave = useMemoizedFn(async () => {
    try {
      await form.validateFields()
      const startMoney = form.getFieldValue('startMoney')
      const endMoney = form.getFieldValue('endMoney')
      const address = form.getFieldValue('address')
      if (startMoney >= endMoney) {
        Modal.error({ content: '结束薪资要大于起始薪资' })
        return
      }
      if (!address || address == '') {
        Modal.error({ content: '工作地点不能为空' })
        return
      }
      if (jobId && jobId != '-1') {
        //修改
        const res = await dispatch(
          updateDataByIdAction({ page: '/company/job', data: { ...form.getFieldsValue(), id: editId }, isFullPage: true })
        ).unwrap()
        if (res.code == 200) {
          close && close()
        }
      } else {
        //添加
        const res = await dispatch(AddJobAction({ ...form.getFieldsValue(), companyId })).unwrap()
        arr = []
        if (res.code == 200) {
          close && close()
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  })

  const handleSelect = useMemoizedFn((value: any, option: any) => {
    if (value?.length > 0) {
      setSearchData([])
      form.setFieldValue('addressName', option.label)
      form.setFieldValue('address', [value[1], value[0]])
      appMapRef.current?.setAddress({ longitude: value[1], latitude: value[0] })
    }
  })

  const handleEdit = useMemoizedFn(() => {
    setDisabled(false)
  })

  useEffect(() => {
    if (jobId && jobId != '-1') {
      dispatch(getJobDetailAction(jobId))
        .unwrap()
        .then((res) => {
          form.setFieldsValue(res.data.data)
          setEditId(res.data.data.id)
          const address = res.data.data.address
          appMapRef.current?.setAddress({ latitude: address[1], longitude: address[0] })
        })
    }
    return () => {
      arr = []
    }
  }, [jobId])

  useImperativeHandle(
    ref,
    () => {
      return {
        reset() {
          form.resetFields()
        }
      }
    },
    []
  )

  return (
    <>
      {disabled && isShowEdit && (
        <div className="header flex justify-end">
          <Button type="primary" icon={<EditFilled />} className="mr-16px" onClick={handleEdit}>
            去编辑
          </Button>
        </div>
      )}
      {!disabled && (
        <div className="header flex justify-end">
          {!jobId ||
            (jobId == '-1' && (
              <Button type="primary" icon={<SyncOutlined />} className="mr-16px" onClick={handleReset}>
                重 置
              </Button>
            ))}
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            保 存
          </Button>
        </div>
      )}
      <div className="overflow-x-hidden mt-[10px]">
        <div className="baseInfo flex">
          <div className="w-200px bg-[#fbfbfc] center text-gray">基本信息</div>
          <div className="flex-1 bg-[#fbfbfc] ml-[20px] px-30px py-24px">
            <Form form={form} layout="horizontal" labelCol={{ flex: '80px' }} wrapperCol={{ span: 20 }} disabled={disabled}>
              <Row gutter={32}>
                <Col span={8}>
                  <Form.Item label="职位类别" name="jobType" rules={jobTypeRules}>
                    <Cascader
                      options={JobData as any}
                      placeholder="请选择职位类别"
                      fieldNames={{ label: 'label', value: 'label', children: 'children' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="职位名" name="jobName" rules={jobNameRules}>
                    <Input placeholder="请填写职位名" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="学历要求" name="jobRequire" rules={jobRequireRules}>
                    <Select placeholder="请选择学历要求">
                      {['学历不限', '高中', '大专', '本科', '硕士', '研究生'].map((item) => {
                        return (
                          <Select.Option value={item} key={item}>
                            {item}
                          </Select.Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={8}>
                  <Form.Item label="起始薪资" name="startMoney" rules={startMoneyRules}>
                    <InputNumber min={1} max={1000} addonAfter="K" className="w-full" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="结束薪资" name="endMoney" rules={endMoneyRules}>
                    <InputNumber min={1} max={1000} addonAfter="K" className="w-full" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="薪资月份" name="moneyMonth" rules={moneyMonthRules}>
                    <InputNumber min={1} max={100} addonAfter="薪" className="w-full" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={8}>
                  <Form.Item label="所在城市" name="city" rules={cityRules}>
                    <Cascader
                      options={cityData}
                      placeholder="请选择所在城市"
                      fieldNames={{ children: 'children', label: 'label', value: 'label' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <AppAddSelect options={arr} label="职位标签" name="tag" placeholder="请选择填写此职位标签" rules={tagRules} />
                </Col>
                <Col span={8}>
                  <AppAddSelect options={options} label="职位福利" name="weal" placeholder="请选择公司福利" rules={wealRules} />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={24}>
                  <Form.Item label="职位描述" name="jobDesc" rules={jobDescRules}>
                    <AppSectionEditor />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={24}>
                  <Form.Item label="工作地址" name="addressName">
                    <Select
                      options={searchData || []}
                      showSearch
                      defaultActiveFirstOption={false}
                      showArrow={false}
                      filterOption={false}
                      onSearch={handleSearch}
                      onSelect={handleSelect}
                      notFoundContent={null}
                    />
                  </Form.Item>
                  <Form.Item className="ml-[80px] w-full" name="address">
                    <AppMap ref={appMapRef} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
})

export default memo(JobInfo)
