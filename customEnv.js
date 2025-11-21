const fs = require('fs-extra')
const path = require('path')
const packageData = require('./package.json')

/**
 * 自定义环境列表
 * */
const envCustomList = [
  'development',
  'test',
  'production'
]
/**
 * 自定义 ENV 值：
 * 1、REACT_APP_ 开头的可被浏览器读取，可通过 process.env.REACT_APP_xxx 获取
 * 2、数组索引对应的自定义环境列表
 * */
const envCustomValue = {
  REACT_APP_CURRENT_ENV_FILE: {
    comment: '当前运行使用env文件名称',
    values: [
      '.env.custom.development',
      '.env.custom.test',
      '.env.custom.production'
    ]
  },
  REACT_APP_CUSTOM_ENV: {
    comment: '自定义环境',
    values: [
      'development',
      'test',
      'production'
    ]
  },
  GENERATE_SOURCEMAP: {
    comment: '是否生成 sourcemap',
    values: [
      'true',
      'true',
      'false'
    ]
  },
  DROP_CONSOLE: {
    comment: '是否删除所有 console',
    values: [
      'false',
      'false',
      'true'
    ]
  },
  REACT_APP_URL_API: {
    comment: '请求地址',
    values: [
      'http://development1.com',
      'http://test1.com',
      'http://production1.com'
    ]
  }
}

const mkdirContent = (envIndex) => {
  let value = ''
  Object.keys(envCustomValue).forEach(key => {
    value += '# ' + envCustomValue[key].comment + '\r\n'
    value += key + '=' + (envCustomValue[key].values[envIndex] || 'null') + '\r\n\r\n'
  })
  return value
}

;(async function() {
  // 删除 .env.custom.xx 文件
  const rootPathFileList = require('fs').readdirSync(path.resolve(__dirname, './'))
  for (let i = 0; i < rootPathFileList.length; i++) {
    const file = rootPathFileList[i]
    if (/\.env\.custom\./.test(file)) {
      await fs.remove(path.resolve(__dirname, `./${file}`))
    }
  }
  // 删除 package.json > scripts > start | build 开头的脚本
  Object.keys(packageData.scripts).forEach(key => {
    if (/start:/.test(key) || /build:/.test(key)) {
      delete packageData.scripts[key]
    }
  })

  const scripts = {}
  for (let i = 0; i < envCustomList.length; i++) {
    // 刷入 env 文件
    const envCustomItem = envCustomList[i]
    await fs.outputFile(path.resolve(__dirname, `./.env.custom.${envCustomItem}`), mkdirContent(i))
    // 暂存 script
    scripts[`start:${envCustomItem}`]
      = `cross-env CUSTOM_ENV=${envCustomItem} node scripts/start.js`
    scripts[`build:${envCustomItem}`]
      = `yarn eslint && cross-env CUSTOM_ENV=${envCustomItem} node scripts/build.js`
  }
  // 刷入 script
  packageData.scripts = {
    ...scripts,
    ...packageData.scripts
  }
  await fs.outputFile(
    path.resolve(__dirname, './package.json'),
    JSON.stringify(packageData, null, '  ')
  )
}())

