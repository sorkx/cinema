import { fileURLToPath, URL } from 'node:url'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        createSvgSpritePlugin({
            symbolId: 'icon-[name]-[hash]',
        }),
    ],
    resolve: {
        alias: {
	  		'~': fileURLToPath(new URL('./src/_imports', import.meta.url)),
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
					@import "@/assets/css/styles/variables-sass.scss";
				`,
            },
        },
    },
})
