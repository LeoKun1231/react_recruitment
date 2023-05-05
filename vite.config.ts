/*
 * @Author: hqk
 * @Date: 2023-02-16 11:20:26
 * @LastEditors: hqk
 * @LastEditTime: 2023-04-13 11:49:16
 * @Description:
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { prismjsPlugin } from 'vite-plugin-prismjs'
//unocss
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      shortcuts: {
        center: 'flex justify-center items-center',
        between: 'flex justify-between items-center',
        border: 'border-b-1px border-b-solid border-[#efefef]',
        hover: 'hover:cursor-pointer hover:bg-[#fafafa]',
        hoverSlow: 'hover:cursor-pointer hover:opacity-70',
        hoverBlue: 'hover:cursor-pointer hover:text-[var(--hover-color)]',
        grayItem: 'px-8px py-[4px] mr-[8px] bg-[#f2f2f2] text-[#666] rounded-[4px]'
      }
    }),
    prismjsPlugin({
      languages: [
        'markup',
        'css',
        'bash',
        'basic',
        'c',
        'cpp',
        'csharp',
        'go',
        'groovy',
        'java',
        'javascript',
        'jsx',
        'lua',
        'php',
        'python',
        'ruby',
        'sql',
        'swift',
        'tsx',
        'typescript',
        'visual-basic',
        'markdown'
      ],
      plugins: ['line-numbers', 'copy-to-clipboard'], //官网有其他功能,这里开启行数和复制按钮功能
      theme: 'tomorrow',
      css: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env': process.env
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://console.tim.qq.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
