import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useRouteMatch } from 'react-router'

const View = React.lazy(() => import('./view'))

export default () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Redirect exact path={`${path}/b-0`} to={`${path}/b-0/1`} />
      <Route exact path={`${path}/b-0/1`} component={View} />
      <Route exact path={`${path}/b-1`} component={View} />
      <Route exact path={`${path}/b-2`} component={View} />
      <Redirect exact path={`${path}/*`} to='/404' />
    </Switch>
  )
}
