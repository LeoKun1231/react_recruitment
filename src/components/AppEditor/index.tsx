/*
 * @Author: hqk
 * @Date: 2023-03-04 12:31:08
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-15 14:33:27
 * @Description:
 */
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect, memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { Boot, IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
import { EditorWrapper } from './style'
import { useCreation, useMemoizedFn } from 'ahooks'
import { useAppSelector, useAppShallowEqual } from '@/hooks/useAppRedux'

Boot.registerModule(markdownModule)

interface IProps {
  children?: ReactNode
  getEdtiorHtml: (html: string, text: string) => void
}

// 工具栏配置
const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['group-video', 'insertImage', 'insertTable']
} // TS 语法

const AppEditor: FC<IProps> = (props) => {
  const { getEdtiorHtml } = props
  const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法

  const { token } = useAppSelector((state) => {
    return {
      token: state.login.loginUser.token
    }
  }, useAppShallowEqual)

  // 编辑器内容
  const [html, setHtml] = useState('<p></p>')

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = useCreation(() => {
    return {
      placeholder: '请输入内容...',
      maxLength: 2000,
      MENU_CONF: {
        uploadImage: {
          fieldName: 'file',
          server: import.meta.env.VITE_BASE_URL + '/common/article/upload',
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      }
    }
  }, [])

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  const handleChange = useMemoizedFn((editor) => {
    setHtml(editor.getHtml())
    getEdtiorHtml(editor.getHtml(), editor.getText())
  })

  return (
    <EditorWrapper>
      <div style={{ zIndex: 1, width: '960px' }} className="border">
        <Toolbar editor={editor} defaultConfig={toolbarConfig} mode="default" className="border" />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={handleChange}
          mode="default"
          className="!px-0"
          style={{ minHeight: '400px' }}
        />
      </div>
    </EditorWrapper>
  )
}

export default memo(AppEditor)
