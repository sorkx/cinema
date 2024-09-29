// vite.config.js
import { fileURLToPath, URL } from "node:url";
import createSvgSpritePlugin from "file:///Users/daniilvorokosovmail.ru/Desktop/cinema/cinema/node_modules/vite-plugin-svg-sprite/esm/index.js";
import { defineConfig } from "file:///Users/daniilvorokosovmail.ru/Desktop/cinema/cinema/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/daniilvorokosovmail.ru/Desktop/cinema/cinema/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/daniilvorokosovmail.ru/Desktop/cinema/cinema/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ["swiper-container", "swiper-slide"].includes(tag)
        }
      }
    }),
    createSvgSpritePlugin({
      symbolId: "icon-[name]-[hash]"
    })
  ],
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src/_imports", __vite_injected_original_import_meta_url)),
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
					@import "@/app/styles/variables-sass.scss";
				`
      }
    }
  },
  build: {
    minify: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGFuaWlsdm9yb2tvc292bWFpbC5ydS9EZXNrdG9wL2NpbmVtYS9jaW5lbWFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kYW5paWx2b3Jva29zb3ZtYWlsLnJ1L0Rlc2t0b3AvY2luZW1hL2NpbmVtYS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZGFuaWlsdm9yb2tvc292bWFpbC5ydS9EZXNrdG9wL2NpbmVtYS9jaW5lbWEvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCBjcmVhdGVTdmdTcHJpdGVQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLXNwcml0ZSdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICB2dWUoe1xuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaXNDdXN0b21FbGVtZW50OiB0YWcgPT4gWydzd2lwZXItY29udGFpbmVyJywgJ3N3aXBlci1zbGlkZSddLmluY2x1ZGVzKHRhZylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBjcmVhdGVTdmdTcHJpdGVQbHVnaW4oe1xuICAgICAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtuYW1lXS1baGFzaF0nLFxuICAgICAgICB9KSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcblx0ICBcdFx0J34nOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL19pbXBvcnRzJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgICAgIHNjc3M6IHtcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYFxuXHRcdFx0XHRcdEBpbXBvcnQgXCJAL2FwcC9zdHlsZXMvdmFyaWFibGVzLXNhc3Muc2Nzc1wiO1xuXHRcdFx0XHRgLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICAgIG1pbmlmeTogdHJ1ZVxuXHQgIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJVLFNBQVMsZUFBZSxXQUFXO0FBQzlXLE9BQU8sMkJBQTJCO0FBQ2xDLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUg4TCxJQUFNLDJDQUEyQztBQU0vUCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDTixpQkFBaUI7QUFBQSxVQUNiLGlCQUFpQixTQUFPLENBQUMsb0JBQW9CLGNBQWMsRUFBRSxTQUFTLEdBQUc7QUFBQSxRQUM3RTtBQUFBLE1BQ0o7QUFBQSxJQUNKLENBQUM7QUFBQSxJQUNELHNCQUFzQjtBQUFBLE1BQ2xCLFVBQVU7QUFBQSxJQUNkLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDVixLQUFLLGNBQWMsSUFBSSxJQUFJLGtCQUFrQix3Q0FBZSxDQUFDO0FBQUEsTUFDdEQsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNELHFCQUFxQjtBQUFBLE1BQ2pCLE1BQU07QUFBQSxRQUNGLGdCQUFnQjtBQUFBO0FBQUE7QUFBQSxNQUdwQjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxRQUFRO0FBQUEsRUFDYjtBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
