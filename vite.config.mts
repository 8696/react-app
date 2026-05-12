import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { visualizer } from 'rollup-plugin-visualizer'

function writeVersionJson(): Plugin {
  return {
    name: 'write-version-json',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist')
      fs.writeFileSync(
        path.join(outDir, 'version.json'),
        JSON.stringify({ v: Date.now().toString() })
      )
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isAnalyze = env.ANALYZE === 'true'
  const dropConsole = env.DROP_CONSOLE === 'true'
  const generateSourcemap = env.GENERATE_SOURCEMAP !== 'false'

  return {
    plugins: [
      react({
        babel: {
          plugins: [
            [
              'babel-plugin-styled-components',
              {
                displayName: true,
                fileName: true,
                meaninglessFileNames: ['index', 'styles'],
                pure: true
              }
            ]
          ]
        }
      }),
      svgr(),
      isAnalyze && visualizer({ open: true, filename: 'dist/stats.html' }),
      writeVersionJson()
    ].filter(Boolean) as Plugin[],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {}
        }
      }
    },

    server: {
      port: 8280,
      proxy: {
        '/api': {
          target: 'http://proxy.info.icode.link/',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, '')
        }
      }
    },

    build: {
      outDir: 'dist',
      sourcemap: generateSourcemap,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: dropConsole,
          drop_debugger: true
        },
        mangle: {
          safari10: true
        },
        format: {
          ascii_only: true,
          comments: false
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name].[hash].chunk.js',
          entryFileNames: 'static/js/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'static/css/[name].[hash][extname]'
            }
            return 'static/media/[name].[hash][extname]'
          }
        }
      }
    },

    envPrefix: 'VITE_'
  }
})
