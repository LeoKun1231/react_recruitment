import { ColumnProps } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import { FormItemProps } from 'antd/lib/form/FormItem'
import { IBaseResult } from '../base'

export interface IMajorNoTree {
  majorName: string
  id: number
}

export interface IMajorNoTreeData extends IBaseResult {
  data: {
    list: IMajorNoTree[]
  }
}

export interface IUpload extends IBaseResult {
  data: {
    url: string
    fileName: string
  }
}

export interface CustomFormItem extends FormItemProps {
  type: 'input' | 'select' | 'date' | 'tree' | 'cascader'
  options?: { label: string; value: string | number }[]
  treeData?: ITree[]
}

export interface ISearchConfig {
  items: CustomFormItem[]
}

export interface ITableConfig<T> {
  isFullPage?: boolean
  page: string
  columns: ColumnProps<T>[]
}

export interface IMajorTreeData extends IBaseResult {
  data: ITree[]
}

export interface ITree {
  value: number
  title: string
  children?: ITree[]
}
