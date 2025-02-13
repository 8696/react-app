import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ConfigProvider, App, ThemeConfig } from 'antd'
import useCheckAppVersion from '@/hooks/useCheckAppVersion'
import useDayJsToZhCn from '@/hooks/useDayJsToZhCn'
import zhCN from 'antd/lib/locale/zh_CN'
import { ThemeContext } from '@/provider/theme'
import { useMount } from 'ahooks'
import defaultToken from '@/theme/defaultToken'
const Main = React.lazy(() => import('@/layout/main'))
const Error404 = React.lazy(() => import('@/view/error/404'))

export default () => {
  // console.log(process.env.REACT_APP_URL_API)
  // console.log(process.env.REACT_APP_URL_API)

  useCheckAppVersion()

  useDayJsToZhCn()

  // 主题
  const [theme, setTheme] = useState<ThemeConfig>()

  useMount(() => {
    setTheme({
      token: defaultToken
    })
  })

  return (
    <ThemeContext.Provider value={{ setTheme }}>
      <ConfigProvider locale={zhCN} theme={theme}>
        <App>
          <BrowserRouter>
            <React.Suspense fallback={<></>}>
              <Switch>
                <Route exact path='/' render={() => <Redirect to='/home' />} />
                <Route exact path='/404' component={Error404} />
                <Route path='/' component={Main} />
              </Switch>
            </React.Suspense>
          </BrowserRouter>
        </App>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
