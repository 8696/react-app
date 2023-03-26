import React from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
const A = React.lazy(() => import('./a-index'))
const B = React.lazy(() => import('./b-index'))

const Routes = () => {
  const { path } = useRouteMatch()
  return (
    <>
      <div className='main-link'>
        <Link to={`${path}/a/a-0`}>a-0</Link>
        <Link to={`${path}/a/a-1`}>a-1</Link>
        <Link to={`${path}/a/a-2`}>a-2</Link>
        <Link to={`${path}/b/b-0`}>b-0</Link>
        <Link to={`${path}/b/b-1`}>b-1</Link>
        <Link to={`${path}/b/b-2`}>b-2</Link>
      </div>
      <div style={{ padding: 20 }}>
        <React.Suspense fallback=''>
          <Switch>
            <Route path={`${path}/a`} component={A} />
            <Route path={`${path}/b`} component={B} />
            <Redirect exact path={`${path}/`} to={`${path}/a/a-0`} />
            <Redirect exact path={`${path}/*`} to='/404' />
          </Switch>
        </React.Suspense>
      </div>
    </>
  )
}

export default Routes
