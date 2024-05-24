import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/extensions/mkt/",
  plugins: [vue(),], 
  base: '/extensions/mkt/', // 設置 base 路徑
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },

  },
  esbuild: {
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
    },
  },
  server:{
    historyApiFallback : true
  }
  
});
