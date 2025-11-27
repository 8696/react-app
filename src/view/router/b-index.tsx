import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const View = React.lazy(() => import('./view'))

export default () => {
  return (
    <Routes>
      <Route path='b-0' element={<Navigate to='b-0/1' replace />} />
      <Route path='b-0/1' element={<View />} />
      <Route path='b-1' element={<View />} />
      <Route path='b-2' element={<View />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  )
}
