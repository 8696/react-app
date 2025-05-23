import React, {} from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ConfigProvider, App as AntdApp } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import { useTheme, ThemeProvider } from '@/provider/theme'
import useCheckAppVersion from '@/hooks/useCheckAppVersion'
import useDayJsToZhCn from '@/hooks/useDayJsToZhCn'
import useAntdHolderRender from '@/hooks/useAntdHolderRender'

const Layout = React.lazy(() => import('@/layout/index'))
const Error404 = React.lazy(() => import('@/view/error/404'))

const RenderBefore = ({ children }: { children: React.ReactNode }) => {
  useDayJsToZhCn()
  useAntdHolderRender()
  useCheckAppVersion()
  return <>{children}</>
}

const RenderConfigProvider = ({ children }: { children: React.ReactNode }) => {
  // 主题
  const { theme } = useTheme()
  return <ConfigProvider locale={zhCN} theme={theme}>{children}</ConfigProvider>
}


export default () => {
  // console.log(process.env.REACT_APP_URL_API)
  // console.log(process.env.REACT_APP_URL_API)

  return (
    <ThemeProvider>
      <RenderConfigProvider>
        <RenderBefore>
          <AntdApp>
            <BrowserRouter>
              <React.Suspense fallback={<></>}>
                <Switch>
                  <Route exact path='/' render={() => <Redirect to='/home' />} />
                  <Route exact path='/404' component={Error404} />
                  <Route path='/' component={Layout} />
                </Switch>
              </React.Suspense>
            </BrowserRouter>
          </AntdApp>
        </RenderBefore>
      </RenderConfigProvider>
    </ThemeProvider>
  )
}
