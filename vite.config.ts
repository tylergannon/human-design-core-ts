import path from 'path'
import { defineConfig } from 'vite'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: '@tylergannon/human-design-core-ts',
            fileName: format => `human-design.${format}.js`,
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
                'axios',
                'cookie',
                'd3-path',
                'd3-selection',
                'es6-promise',
                'jsdom',
                'purify-ts',
                'ramda',
                'union-find-ts',
                'url-parse',
                'whatwg-fetch',
            ],
            plugins: [
                typescript({
                    target: "es2020",
                    exclude: ["node_modules/**"],
                    compilerOptions: {
                        declarationDir: './dist',
                        declaration: true
                    }
                })
            ],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    // axios: 'axios'
                },
            },
        },
    },
})
