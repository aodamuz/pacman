import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'

/** @type {import('vite').UserConfig} */
export default defineConfig({
    base: '/pacman/',
    css: {
        postcss: {
            plugins: [
                autoprefixer({})
            ]
        }
    }
})
