import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useRouteMatch } from 'react-router'

const View = React.lazy(() => import('./view'))

export default () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Redirect exact path={`${path}/a-0`} to={`${path}/a-0/1`} />
      <Route exact path={`${path}/a-0/1`} component={View} />
      <Redirect exact path={`${path}/a-1`} to={`${path}/a-1/123456`} />
      <Route exact path={`${path}/a-1/:id`} component={View} />
      <Route exact path={`${path}/a-2`} component={View} />
      <Redirect exact path={`${path}/*`} to='/404' />
    </Switch>
  )
}
