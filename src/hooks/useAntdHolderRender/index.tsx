import { useContext, useLayoutEffect } from 'react'
import { ConfigProvider } from 'antd'


// 使用 holderRender 给 message 、modal 、notification 静态方法设置 Provider
// https://ant-design.antgroup.com/components/config-provider-cn#config-provider-demo-holderrender
// 且只需要在 ConfigProvider 组件下的全局子组件调用一次即可
export default () => {
  const { locale, theme } = useContext(ConfigProvider.ConfigContext)
  useLayoutEffect(() => {
    ConfigProvider.config({
      holderRender: (children) => (
        <ConfigProvider locale={locale} theme={theme}>
          {children}
        </ConfigProvider>
      )
    })
  }, [locale, theme])
}
