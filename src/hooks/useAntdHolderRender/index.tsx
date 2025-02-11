import { useContext, useLayoutEffect } from 'react'
import { App, ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'


// 使用 holderRender 给 message 、modal 、notification 静态方法设置 Provider
// https://ant-design.antgroup.com/components/config-provider-cn#config-provider-demo-holderrender
// 且只需要在 ConfigProvider 组件下的全局子组件调用一次即可
export default () => {

  const { locale, theme } = useContext(ConfigProvider.ConfigContext)
  useLayoutEffect(() => {
    ConfigProvider.config({
      holderRender: (children) => (
        <StyleProvider hashPriority='high'>
          <ConfigProvider prefixCls='static' iconPrefixCls='icon' locale={locale} theme={theme}>
            <App>
              {children}
            </App>
          </ConfigProvider>
        </StyleProvider>
      )
    })
  }, [locale, theme])
}
