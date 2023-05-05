/*
 * @Author: hqk
 * @Date: 2023-03-04 12:31:08
 * @LastEditors: hqk
 * @LastEditTime: 2023-03-20 13:34:17
 * @Description:
 */
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect, memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { DomEditor, IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { SectionEditorWrapper } from './style'
import { useMemoizedFn } from 'ahooks'

interface IProps {
  children?: ReactNode
  getEdtiorHtml?: (html: string, text: string) => void
  value?: string
  className?: string
  onChange?: (html: string) => void
}

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: [
    'group-video',
    'group-image',
    'headerSelect',
    'blockquote',
    'underline',
    'color',
    'bgColor',
    'fontSize',
    'fontFamily',
    'todo',
    'group-justify',
    'emotion',
    'insertLink',
    'insertTable',
    'codeBlock',
    'divider',
    'fullScreen',
    'lineHeight',
    '|',
    'group-more-style',
    'group-indent'
  ],
  insertKeys: {
    index: 32,
    keys: ['indent', 'delIndent', 'clearStyle']
  }
} // TS 语法

// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  maxLength: 2000,
  autoFocus: false
}

const AppEditor: FC<IProps> = (props) => {
  const { getEdtiorHtml, value, className, onChange } = props
  const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法

  // 编辑器内容
  const [html, setHtml] = useState('<p></p>')

  useEffect(() => {
    if (value) {
      setHtml(value)
    }
  }, [value])

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      // editor.destroy()
      // setEditor(null)
    }
  }, [editor])

  const handleChange = useMemoizedFn((editor) => {
    setHtml(editor.getHtml())
    getEdtiorHtml && getEdtiorHtml(editor.getHtml(), editor.getText())
    onChange && onChange(editor.getHtml())
  })

  return (
    <SectionEditorWrapper className={className}>
      <div style={{ zIndex: 1 }} className="border w-full">
        <Toolbar editor={editor} defaultConfig={toolbarConfig} mode="default" className="border" />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={handleChange}
          mode="simple"
          className="!px-0"
          style={{ height: '301px' }}
        />
      </div>
    </SectionEditorWrapper>
  )
}

export default memo(AppEditor)
