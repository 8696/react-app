import { NavLink, Redirect } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import React, { Fragment } from 'react'
import './main.less'
import nav from '../view/nav'

export default () => {

  return (
    <>
      <div className='main-link'>
        {nav.map(item => (
          <Fragment key={item.name}>
            <NavLink to={item.link}>{item.name}</NavLink>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </Fragment>
        ))}
      </div>
      <React.Suspense fallback={<></>}>
        <Switch>
          {nav.map(item => (
            <Route key={item.link} exact path={item.link} component={item.C} />
          ))}
          <Route exact path='*' render={() => <Redirect to='/404' />} />
        </Switch>
      </React.Suspense>
    </>
  )
}
