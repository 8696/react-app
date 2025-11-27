import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const View = React.lazy(() => import('./view'))

export default () => {
  return (
    <Routes>
      <Route path='a-0' element={<Navigate to='a-0/1' replace />} />
      <Route path='a-0/1' element={<View />} />
      <Route path='a-1' element={<Navigate to='a-1/123456' replace />} />
      <Route path='a-1/:id' element={<View />} />
      <Route path='a-2' element={<View />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </Routes>
  )
}
