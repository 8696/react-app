import { Redirect } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import React from 'react'
import './main.less'
import nav from '../view/nav'

import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'

export default () => {
  const { pathname } = useLocation()
  return (
    <>
      <React.Suspense fallback={<></>}>
        <Switch>
          {nav.map(item => (
            <Route key={item.link} exact path={item.link} component={item.C} />
          ))}
          <Route exact path='*' render={() => <Redirect to='/404' />} />
        </Switch>
      </React.Suspense>
      {
        pathname !== '/home' && (
          <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <NavLink to='/home'>Home</NavLink>
          </div>
        )
      }
    </>
  )
}
