import React from 'react'

export default [
  { name: 'home', link: '/home', C: React.lazy(() => import('@/view/home')) },
  { name: 'template', link: '/template', C: React.lazy(() => import('@/view/template')) },
  { name: 'table', link: '/table', C: React.lazy(() => import('@/view/table')) },
  { name: 'virtual', link: '/virtual', C: React.lazy(() => import('@/view/virtual')) },
  { name: 'md', link: '/md', C: React.lazy(() => import('@/view/md')) },
  { name: 'env', link: '/env', C: React.lazy(() => import('@/view/env')) },
  { name: 'scroll', link: '/scroll', C: React.lazy(() => import('@/view/scroll')) },
  { name: 'useRequest', link: '/useRequest', C: React.lazy(() => import('@/view/useRequest')) },
  { name: 'await-to-js', link: '/await-to-js', C: React.lazy(() => import('@/view/await-to-js')) },
  { name: 'svg', link: '/svg', C: React.lazy(() => import('@/view/svg')) },
  { name: 'axios-mock-adapter', link: '/axios-mock-adapter', C: React.lazy(() => import('@/view/axios-mock-adapter')) },
  { name: 'axios-adapter', link: '/axios-adapter', C: React.lazy(() => import('@/view/axios-adapter')) },
  { name: 'table-pagination', link: '/table-pagination', C: React.lazy(() => import('@/view/table-pagination')) },
  { name: 'findArray', link: '/findArray', C: React.lazy(() => import('@/view/findArray')) }
]
