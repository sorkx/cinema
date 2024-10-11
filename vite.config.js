import { fileURLToPath, URL } from 'node:url'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: tag => ['swiper-container', 'swiper-slide'].includes(tag)
                }
            }
        }),
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
					@import "@/app/styles/variables-sass.scss";
				`,
                api: 'modern-compiler',
            },
        },
    },
    build: {
        rollupOptions: {
            external: ['nprogress/nprogress.css'],
        }
    }
})
