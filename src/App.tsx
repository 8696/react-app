import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ConfigProvider, ThemeConfig } from 'antd'
import useCheckAppVersion from '@/hooks/useCheckAppVersion'

import zhCN from 'antd/lib/locale/zh_CN'
import { ThemeContext } from '@/provider/theme'
const Main = React.lazy(() => import('@/layout/main'))
const Error404 = React.lazy(() => import('@/view/error/404'))

export default () => {
  // console.log(process.env.REACT_APP_URL_API)
  // console.log(process.env.REACT_APP_URL_API)

  useCheckAppVersion()

  // 主题
  const [theme, setTheme] = useState<ThemeConfig>()

  return (
    <ThemeContext.Provider value={{ setTheme }}>
      <ConfigProvider locale={zhCN} theme={theme}>
        <BrowserRouter>
          <React.Suspense fallback={<></>}>
            <Switch>
              <Route exact path='/' render={() => <Redirect to='/home' />} />
              <Route exact path='/404' component={Error404} />
              <Route path='/' component={Main} />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
