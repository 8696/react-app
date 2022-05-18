import { Link, Redirect } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import React, { Fragment } from 'react'
import './main.less'


export default () => {

  const link = [
    { name: 'home', link: '/home', C: React.lazy(() => import('@/view/home')) },
    { name: 'template', link: '/template', C: React.lazy(() => import('@/view/template')) },
    { name: 'table', link: '/table', C: React.lazy(() => import('@/view/table')) },
    { name: 'virtual', link: '/virtual', C: React.lazy(() => import('@/view/virtual')) },
    { name: 'md', link: '/md', C: React.lazy(() => import('@/view/md')) },
    { name: 'env', link: '/env', C: React.lazy(() => import('@/view/env')) },
    { name: 'scroll', link: '/scroll', C: React.lazy(() => import('@/view/scroll')) },
    { name: 'useRequest', link: '/useRequest', C: React.lazy(() => import('@/view/useRequest')) }
  ]

  return (
    <>
      <div className='main-link'>
        {link.map(item => (
          <Fragment key={item.name}>
            <Link to={item.link}>{item.name}</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </Fragment>
        ))}
      </div>
      <React.Suspense fallback={<></>}>
        <Switch>
          {link.map(item => (
            <Route key={item.link} exact path={item.link} component={item.C} />
          ))}
          <Route exact path='*' render={() => <Redirect to='/404' />} />
        </Switch>
      </React.Suspense>
    </>
  )
}
