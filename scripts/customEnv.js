const fs = require('fs-extra')
const path = require('path')
const packageData = require('../package.json')

/**
 * 自定义环境列表
 * */
const envCustomList = [
  'development',
  'test',
  'production',
  'beta'
]
/**
 * 自定义 ENV 值：
 * 1、REACT_APP_ 开头的可被浏览器读取，可通过 process.env.REACT_APP_xxx 获取
 * 2、数组索引对应的自定义环境列表
 * */
const envCustomValue = {
  /** 自定义环境 */
  REACT_APP_CUSTOM_ENV: [
    'development',
    'test',
    'production'
  ],
  /** 生成 sourcemap */
  GENERATE_SOURCEMAP: [
    'true',
    'true',
    'false'
  ],
  /** 删除所有 console */
  DROP_CONSOLE: [
    'false',
    'false',
    'true'
  ],
  /** 请求地址 */
  REACT_APP_URL_API: [
    'http://development.com',
    'http://test.com',
    'http://production.com'
  ]
}

const mkdirContent = (envIndex) => {
  let value = ''
  Object.keys(envCustomValue).forEach(key => {
    value += key + ' = ' + (envCustomValue[key][envIndex] || 'null') + '\r\n'
  })
  return value
}

;(async function() {
  for (let i = 0; i < envCustomList.length; i++) {
    const envCustomItem = envCustomList[i]
    await fs.outputFile(path.resolve(__dirname, `../.env.custom.${envCustomItem}`), mkdirContent(i))
  }
  console.log(packageData)
}())


