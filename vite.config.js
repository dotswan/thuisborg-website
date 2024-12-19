import {fileURLToPath, URL} from 'node:url';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {visualizer} from 'rollup-plugin-visualizer';


const portNumber = 6633;
export default defineConfig({
    server: {
        port: portNumber,
        proxy: {
            '/template': {
                target: 'http://localhost:' + portNumber + '/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/template/, ''),
            },
        },
    },
    plugins: [
        vue({
            template: {
                transformAssetUrls: {
                    includeAbsolute: false,
                },
            },
        }),
        visualizer({open: true})
    ],
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        }
    },
    build: {
        main: '/js/main.js',
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                entryFileNames: 'assets/js/app.js',
                chunkFileNames: 'assets/js/[name].js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css')
                        return 'assets/css/app.css';
                    else {
                        return 'assets/[name][extname]';
                    }
                },
            },
        },
        cssCodeSplit: false,
        assetsInlineLimit: 0,
        minify: 'terser',            // Enable Terser minification
        terserOptions: {
            compress: {
                drop_console: true,  // Remove console statements
                drop_debugger: true  // Remove debugger statements
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
