import React, { useState } from 'react'
import { useMount } from 'ahooks'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ConfigProvider, App, ThemeConfig } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import defaultTheme from '@/theme/defaultTheme'

import { ThemeContext } from '@/provider/theme'
import useCheckAppVersion from '@/hooks/useCheckAppVersion'
import useDayJsToZhCn from '@/hooks/useDayJsToZhCn'
import useAntdHolderRender from '@/hooks/useAntdHolderRender'

const Layout = React.lazy(() => import('@/layout/index'))
const Error404 = React.lazy(() => import('@/view/error/404'))

const Init = ({ children }: { children: React.ReactNode }) => {
  useDayJsToZhCn()
  useAntdHolderRender()
  useCheckAppVersion()
  return <>{children}</>
}

export default () => {
  // console.log(process.env.REACT_APP_URL_API)
  // console.log(process.env.REACT_APP_URL_API)

  // 主题
  const [theme, setTheme] = useState<ThemeConfig>()

  useMount(() => {
    setTheme(defaultTheme)
  })

  return (
    <ThemeContext.Provider value={{ setTheme }}>
      <ConfigProvider locale={zhCN} theme={theme}>
        <App>
          <Init>
            <BrowserRouter>
              <React.Suspense fallback={<></>}>
                <Switch>
                  <Route exact path='/' render={() => <Redirect to='/home' />} />
                  <Route exact path='/404' component={Error404} />
                  <Route path='/' component={Layout} />
                </Switch>
              </React.Suspense>
            </BrowserRouter>
          </Init>
        </App>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
