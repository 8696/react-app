import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
const Main = React.lazy(() => import('@/layout/main'))
const Error404 = React.lazy(() => import('@/view/error/404'))

export default () => {
  // console.log(process.env.REACT_APP_URL_API)
  // console.log(process.env.REACT_APP_URL_API)
  return (
    <ConfigProvider locale={zhCN}>
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
  )
}
