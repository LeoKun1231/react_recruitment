// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/86173/Documents/%E8%B5%84%E6%96%99/GraduationProject/react_recruitment/node_modules/.pnpm/vite@4.2.1_@types+node@18.15.7_less@4.1.3/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/86173/Documents/%E8%B5%84%E6%96%99/GraduationProject/react_recruitment/node_modules/.pnpm/@vitejs+plugin-react@3.1.0_vite@4.2.1/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { prismjsPlugin } from "file:///C:/Users/86173/Documents/%E8%B5%84%E6%96%99/GraduationProject/react_recruitment/node_modules/.pnpm/vite-plugin-prismjs@0.0.8_prismjs@1.29.0/node_modules/vite-plugin-prismjs/dist/index.js";
import UnoCSS from "file:///C:/Users/86173/Documents/%E8%B5%84%E6%96%99/GraduationProject/react_recruitment/node_modules/.pnpm/unocss@0.49.8_vite@4.2.1/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/86173/Documents/%E8%B5%84%E6%96%99/GraduationProject/react_recruitment/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    UnoCSS({
      shortcuts: {
        center: "flex justify-center items-center",
        between: "flex justify-between items-center",
        border: "border-b-1px border-b-solid border-[#efefef]",
        hover: "hover:cursor-pointer hover:bg-[#fafafa]",
        hoverSlow: "hover:cursor-pointer hover:opacity-70",
        hoverBlue: "hover:cursor-pointer hover:text-[var(--hover-color)]",
        grayItem: "px-8px py-[4px] mr-[8px] bg-[#f2f2f2] text-[#666] rounded-[4px]"
      }
    }),
    prismjsPlugin({
      languages: [
        "markup",
        "css",
        "bash",
        "basic",
        "c",
        "cpp",
        "csharp",
        "go",
        "groovy",
        "java",
        "javascript",
        "jsx",
        "lua",
        "php",
        "python",
        "ruby",
        "sql",
        "swift",
        "tsx",
        "typescript",
        "visual-basic",
        "markdown"
      ],
      plugins: ["line-numbers", "copy-to-clipboard"],
      //官网有其他功能,这里开启行数和复制按钮功能
      theme: "tomorrow",
      css: true
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  define: {
    "process.env": process.env
  },
  server: {
    proxy: {
      "/api": {
        target: "https://console.tim.qq.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw4NjE3M1xcXFxEb2N1bWVudHNcXFxcXHU4RDQ0XHU2NTk5XFxcXEdyYWR1YXRpb25Qcm9qZWN0XFxcXHJlYWN0X3JlY3J1aXRtZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw4NjE3M1xcXFxEb2N1bWVudHNcXFxcXHU4RDQ0XHU2NTk5XFxcXEdyYWR1YXRpb25Qcm9qZWN0XFxcXHJlYWN0X3JlY3J1aXRtZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy84NjE3My9Eb2N1bWVudHMvJUU4JUI1JTg0JUU2JTk2JTk5L0dyYWR1YXRpb25Qcm9qZWN0L3JlYWN0X3JlY3J1aXRtZW50L3ZpdGUuY29uZmlnLnRzXCI7LypcbiAqIEBBdXRob3I6IGhxa1xuICogQERhdGU6IDIwMjMtMDItMTYgMTE6MjA6MjZcbiAqIEBMYXN0RWRpdG9yczogaHFrXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIzLTA0LTEzIDExOjQ5OjE2XG4gKiBARGVzY3JpcHRpb246XG4gKi9cbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgcHJpc21qc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXByaXNtanMnXG4vL3Vub2Nzc1xuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICBVbm9DU1Moe1xuICAgICAgc2hvcnRjdXRzOiB7XG4gICAgICAgIGNlbnRlcjogJ2ZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgYmV0d2VlbjogJ2ZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgIGJvcmRlcjogJ2JvcmRlci1iLTFweCBib3JkZXItYi1zb2xpZCBib3JkZXItWyNlZmVmZWZdJyxcbiAgICAgICAgaG92ZXI6ICdob3ZlcjpjdXJzb3ItcG9pbnRlciBob3ZlcjpiZy1bI2ZhZmFmYV0nLFxuICAgICAgICBob3ZlclNsb3c6ICdob3ZlcjpjdXJzb3ItcG9pbnRlciBob3ZlcjpvcGFjaXR5LTcwJyxcbiAgICAgICAgaG92ZXJCbHVlOiAnaG92ZXI6Y3Vyc29yLXBvaW50ZXIgaG92ZXI6dGV4dC1bdmFyKC0taG92ZXItY29sb3IpXScsXG4gICAgICAgIGdyYXlJdGVtOiAncHgtOHB4IHB5LVs0cHhdIG1yLVs4cHhdIGJnLVsjZjJmMmYyXSB0ZXh0LVsjNjY2XSByb3VuZGVkLVs0cHhdJ1xuICAgICAgfVxuICAgIH0pLFxuICAgIHByaXNtanNQbHVnaW4oe1xuICAgICAgbGFuZ3VhZ2VzOiBbXG4gICAgICAgICdtYXJrdXAnLFxuICAgICAgICAnY3NzJyxcbiAgICAgICAgJ2Jhc2gnLFxuICAgICAgICAnYmFzaWMnLFxuICAgICAgICAnYycsXG4gICAgICAgICdjcHAnLFxuICAgICAgICAnY3NoYXJwJyxcbiAgICAgICAgJ2dvJyxcbiAgICAgICAgJ2dyb292eScsXG4gICAgICAgICdqYXZhJyxcbiAgICAgICAgJ2phdmFzY3JpcHQnLFxuICAgICAgICAnanN4JyxcbiAgICAgICAgJ2x1YScsXG4gICAgICAgICdwaHAnLFxuICAgICAgICAncHl0aG9uJyxcbiAgICAgICAgJ3J1YnknLFxuICAgICAgICAnc3FsJyxcbiAgICAgICAgJ3N3aWZ0JyxcbiAgICAgICAgJ3RzeCcsXG4gICAgICAgICd0eXBlc2NyaXB0JyxcbiAgICAgICAgJ3Zpc3VhbC1iYXNpYycsXG4gICAgICAgICdtYXJrZG93bidcbiAgICAgIF0sXG4gICAgICBwbHVnaW5zOiBbJ2xpbmUtbnVtYmVycycsICdjb3B5LXRvLWNsaXBib2FyZCddLCAvL1x1NUI5OFx1N0Y1MVx1NjcwOVx1NTE3Nlx1NEVENlx1NTI5Rlx1ODBGRCxcdThGRDlcdTkxQ0NcdTVGMDBcdTU0MkZcdTg4NENcdTY1NzBcdTU0OENcdTU5MERcdTUyMzZcdTYzMDlcdTk0QUVcdTUyOUZcdTgwRkRcbiAgICAgIHRoZW1lOiAndG9tb3Jyb3cnLFxuICAgICAgY3NzOiB0cnVlXG4gICAgfSlcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgJ3Byb2Nlc3MuZW52JzogcHJvY2Vzcy5lbnZcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwczovL2NvbnNvbGUudGltLnFxLmNvbScsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFPQSxTQUFTLGVBQWUsV0FBVztBQUVuQyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxxQkFBcUI7QUFFOUIsT0FBTyxZQUFZO0FBYmdPLElBQU0sMkNBQTJDO0FBZXBTLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFdBQVc7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLE9BQU87QUFBQSxRQUNQLFdBQVc7QUFBQSxRQUNYLFdBQVc7QUFBQSxRQUNYLFVBQVU7QUFBQSxNQUNaO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsTUFDWixXQUFXO0FBQUEsUUFDVDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFNBQVMsQ0FBQyxnQkFBZ0IsbUJBQW1CO0FBQUE7QUFBQSxNQUM3QyxPQUFPO0FBQUEsTUFDUCxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGVBQWUsUUFBUTtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDOUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
