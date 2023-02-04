/*
 * @Author: hqk
 * @Date: 2023-02-03 14:24:14
 * @LastEditors: hqk
 * @LastEditTime: 2023-02-03 16:33:05
 * @Description:
 */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//unocss
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
