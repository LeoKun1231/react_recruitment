/*
 * @Author: hqk
 * @Date: 2023-04-10 14:02:10
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-11 12:25:55
 * @Description:
 */
import React, { memo, useState, useRef, ElementRef, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { EditFilled, SaveOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, Cascader, Result, Space, Form, Divider, Input, InputNumber, Row, Col, Select, Switch, TreeSelect, Modal } from 'antd'
import cityData from '@/assets/data/city.json'
import AppAddSelect from '@/components/AppAddSelect'
import AppUploadImage from '@/components/AppUploadImage'
import { useDebounceFn, useMemoizedFn } from 'ahooks'
import AppMap from '@/components/AppMap'
import { getAddressBySeachPamrm } from '@/utils/map'
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'
import {
  removeAllAction,
  removeImagesAction,
  updateCompanyAction,
  getCompanyDetailAction,
  getCompanyStatusAction
} from '@/store/features/admin'
import { useRulesConfig } from '../config/rule.config'
interface IProps {
  children?: ReactNode
  userId: number
  disabled?: boolean
  isShowEdit?: boolean
  onSuccess?: () => void
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

const selectBefore = (
  <Select defaultValue="https://">
    <Select.Option value="https://">https://</Select.Option>
  </Select>
)

interface ISearchResult {
  label: string
  value: [number, number]
}

const {
  shortNameRules,
  fullNameRules,
  linkManRules,
  phoneRules,
  cityRules,
  sizeRules,
  categoryRules,
  levelRules,
  companyTypeRules,
  wealRules,
  descRules
} = useRulesConfig()
const CompanyInfo: FC<IProps> = (props) => {
  const { userId, disabled: isDisabled, onSuccess, isShowEdit } = props
  const [disabled, setDisabled] = useState(() => {
    return isDisabled
  })

  const logoImageRef = useRef<ElementRef<typeof AppUploadImage>>(null)
  const companyImageRef = useRef<ElementRef<typeof AppUploadImage>>(null)
  const certifyImageRef = useRef<ElementRef<typeof AppUploadImage>>(null)
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
    const res = await dispatch(removeAllAction()).unwrap()
    if (res.code == 200) {
      form.resetFields()
      logoImageRef.current?.clear()
      companyImageRef.current?.clear()
      certifyImageRef.current?.clear()
    }
  })

  const handleSave = useMemoizedFn(async () => {
    try {
      await form.validateFields()
      const avatarSize = logoImageRef.current?.getSize()
      const companySize = companyImageRef.current?.getSize()
      const certifySize = certifyImageRef.current?.getSize()
      const address = form.getFieldValue('address')
      if (avatarSize == 0) {
        Modal.error({ content: '公司头像不能为空' })
        return
      }
      if (!address || address == '') {
        Modal.error({ content: '公司地点不能为空' })
        return
      }
      if (companySize == 0) {
        Modal.error({ content: '公司照片不能为空' })
        return
      }
      if (certifySize == 0) {
        Modal.error({ content: '证明材料不能为空' })
        return
      }
      const res = await dispatch(updateCompanyAction(form.getFieldsValue())).unwrap()
      if (res.code == 200) {
        onSuccess && onSuccess()
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

  const handleAvatarRemove = useMemoizedFn((file) => {
    if (file.status == 'error') {
      return true
    }
    const url = file.url
    dispatch(removeImagesAction({ page: 'avatar', url }))
  })

  const handleCompanyImageRemove = useMemoizedFn((file) => {
    if (file.status == 'error') {
      return true
    }
    const url = file.url
    dispatch(removeImagesAction({ page: 'companyImages', url }))
  })

  const handleCertifyImageRemove = useMemoizedFn((file) => {
    if (file.status == 'error') {
      return true
    }
    const url = file.url
    dispatch(removeImagesAction({ page: 'certifyImages', url }))
  })

  useEffect(() => {
    if (userId) {
      dispatch(getCompanyDetailAction(userId))
        .unwrap()
        .then((res) => {
          const { companyUrl, certifyUrl, avatar } = res.data.data
          form.setFieldsValue(res.data.data)
          if (!res.data.data.weal) {
            form.setFieldValue('weal', undefined)
          }
          avatar && logoImageRef.current?.setImages([avatar as any])
          companyUrl && companyImageRef.current?.setImages(companyUrl as any)
          certifyUrl && certifyImageRef.current?.setImages(certifyUrl as any)
          setTimeout(() => {
            const address = res.data.data.address
            if (address) {
              appMapRef.current?.setAddress({ latitude: address[1], longitude: address[0] })
            }
          }, 1000)
        })
    }
  }, [appMapRef, userId])

  const handleEdit = useMemoizedFn(() => {
    setDisabled(false)
  })

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
          <Button type="primary" icon={<SyncOutlined />} className="mr-16px" onClick={handleReset}>
            重 置
          </Button>
          <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            保 存
          </Button>
        </div>
      )}
      <div className="overflow-y-auto overflow-x-hidden mt-[10px] ">
        <div className="baseInfo flex">
          <div className="w-200px bg-[#fbfbfc] center text-gray">基本资料</div>
          <div className="flex-1 bg-[#fbfbfc] ml-[20px] px-30px py-24px">
            <Form form={form} layout="horizontal" labelCol={{ flex: '80px' }} wrapperCol={{ span: 20 }} disabled={disabled}>
              <Row gutter={32}>
                <Col span={8}>
                  <Form.Item label="公司简称" name="shortName" rules={shortNameRules}>
                    <Input placeholder="请填写公司简称" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="公司全称" name="fullName" rules={fullNameRules}>
                    <Input placeholder="请填写公司全称" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="联系人" name="linkman" rules={linkManRules}>
                    <Input placeholder="请填写联系人" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={8}>
                  <Form.Item label="联系电话" name="telephone" rules={phoneRules}>
                    <Input placeholder="请填写联系电话" />
                  </Form.Item>
                </Col>
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
                  <Form.Item label="企业规模" name="size" rules={sizeRules}>
                    <Select placeholder="请选择企业规模">
                      <Select.Option value="0-20人">0-20人</Select.Option>
                      <Select.Option value="20-99人">20-99人</Select.Option>
                      <Select.Option value="100-499人">100-499人</Select.Option>
                      <Select.Option value="500-999人">500-999人</Select.Option>
                      <Select.Option value="1000-9999人">1000-9999人</Select.Option>
                      <Select.Option value="10000人以上">10000人以上</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={8}>
                  <Form.Item label="企业类别" name="category" rules={categoryRules}>
                    <Select placeholder="请选择企业类别">
                      {[
                        '电子商务',
                        '游戏',
                        '媒体',
                        '广告营销',
                        '数据服务',
                        '医疗健康',
                        '生活服务',
                        'O2O 旅游',
                        '分类信息',
                        '音乐/视频/阅读',
                        '在线教育',
                        '社交网络',
                        '人力资源服务',
                        '企业服务',
                        '信息安全',
                        '智能硬件',
                        '移动互联网',
                        '互联网',
                        '计算机软件',
                        '通信/网络设备',
                        '广告/公关/会展',
                        '互联网金融',
                        '物流/仓储',
                        '贸易/进出口',
                        '咨询 ',
                        '工程施工',
                        '汽车生产',
                        '其他行业'
                      ].map((item) => {
                        return (
                          <Select.Option key={item} value={item}>
                            {item}
                          </Select.Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="融资阶段" name="level" rules={levelRules}>
                    <Select placeholder="请选择融资阶段">
                      {['未融资', '天使轮', 'A轮', 'B轮', 'C轮', 'D轮及以上 ', '已上市', '不需要融资'].map((item) => {
                        return (
                          <Select.Option key={item} value={item}>
                            {item}
                          </Select.Option>
                        )
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="公司性质" name="companyType" rules={companyTypeRules}>
                    <Select placeholder="请选择公司性质">
                      {[
                        '国企',
                        '民营',
                        '合资',
                        '外商独资',
                        '股份制企业',
                        '上市公司 ',
                        '代表处',
                        '国家机关',
                        '事业单位',
                        '银行',
                        '医院',
                        '学校/下级单位',
                        '律师事务所',
                        '社会团体',
                        '港澳台公司',
                        '其他'
                      ].map((item) => {
                        return (
                          <Select.Option key={item} value={item}>
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
                  <Form.Item label="公司官网" name="govUrl">
                    <Input addonBefore={selectBefore} placeholder="请填写公司官网" />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <AppAddSelect options={options} label="公司福利" name="weal" placeholder="请选择公司福利" rules={wealRules} />
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={24}>
                  <Form.Item label="公司描述" name="desc" rules={descRules}>
                    <Input.TextArea placeholder="请填写公司描述" style={{ resize: 'none' }} rows={4} maxLength={2000} showCount />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={24}>
                  <Form.Item label="公司头像">
                    <AppUploadImage
                      maxCount={1}
                      onRemove={handleAvatarRemove}
                      listType="picture-circle"
                      action={import.meta.env.VITE_BASE_URL + '/company/upload/avatar'}
                      ref={logoImageRef}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={24}>
                  <Form.Item label="公司地址" name="addressName">
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
        <div className="image mt-10px flex">
          <div className="w-200px bg-[#fbfbfc] center text-gray">公司照片</div>
          <div className="flex-1 bg-[#fbfbfc] ml-[20px] px-30px py-24px">
            <Row gutter={30}>
              <Col span={24}>
                <AppUploadImage
                  maxCount={9}
                  onRemove={handleCompanyImageRemove}
                  listType="picture-card"
                  disabled={disabled}
                  action={import.meta.env.VITE_BASE_URL + '/company/upload/companyImages'}
                  ref={companyImageRef}
                />
                <div className="text-12px text-gray">上传公司的平时照片等等</div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="image mt-10px flex">
          <div className="w-200px bg-[#fbfbfc] center text-gray">证明材料</div>
          <div className="flex-1 bg-[#fbfbfc] ml-[20px] px-30px py-24px">
            <Row gutter={30}>
              <Col span={24}>
                <AppUploadImage
                  maxCount={9}
                  disabled={disabled}
                  listType="picture-card"
                  onRemove={handleCertifyImageRemove}
                  action={import.meta.env.VITE_BASE_URL + '/company/upload/certifyImages'}
                  ref={certifyImageRef}
                />
                <div className="text-12px text-gray">上传公司的营业执照等等</div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(CompanyInfo)
