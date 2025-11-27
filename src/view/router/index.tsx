import React from 'react'
import { Route, Routes, Link, Navigate } from 'react-router-dom'

const A = React.lazy(() => import('./a-index'))
const B = React.lazy(() => import('./b-index'))

const RouterIndex = () => {
  return (
    <>
      <div className='main-link'>
        <Link to='a/a-0'>a-0</Link>
        <Link to='a/a-1'>a-1</Link>
        <Link to='a/a-2'>a-2</Link>
        <Link to='b/b-0'>b-0</Link>
        <Link to='b/b-1'>b-1</Link>
        <Link to='b/b-2'>b-2</Link>
      </div>
      <div style={{ padding: 20 }}>
        <React.Suspense fallback=''>
          <Routes>
            <Route path='a/*' element={<A />} />
            <Route path='b/*' element={<B />} />
            <Route path='' element={<Navigate to='a/a-0' replace />} />
            <Route path='*' element={<Navigate to='/404' replace />} />
          </Routes>
        </React.Suspense>
      </div>
    </>
  )
}

export default RouterIndex
