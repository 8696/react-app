import { Routes, Route, Navigate, NavLink, useLocation } from 'react-router-dom'
import React from 'react'
import './index.less'
import nav from '../view/nav'

export default () => {
  const { pathname } = useLocation()

  return (
    <>
      <React.Suspense fallback={<></>}>
        <Routes>
          {nav.map(item => (
            <Route key={item.link} path={`${item.link}/*`} element={<item.C />} />
          ))}
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Routes>
      </React.Suspense >
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
