import React from 'react'

export default [
  { name: 'home', link: '/home', C: React.lazy(() => import('@/view/home')) },
  { name: 'antd', link: '/antd', C: React.lazy(() => import('@/view/antd')) },
  { name: 'template', link: '/template', C: React.lazy(() => import('@/view/template')) },
  { name: 'table', link: '/table', C: React.lazy(() => import('@/view/table')) },
  { name: 'virtual', link: '/virtual', C: React.lazy(() => import('@/view/virtual')) },
  { name: 'env', link: '/env', C: React.lazy(() => import('@/view/env')) },
  { name: 'use-request', link: '/use-request', C: React.lazy(() => import('@/view/use-request')) },
  { name: 'await-to-js', link: '/await-to-js', C: React.lazy(() => import('@/view/await-to-js')) },
  { name: 'svg', link: '/svg', C: React.lazy(() => import('@/view/svg')) },
  { name: 'axios-mock-adapter', link: '/axios-mock-adapter', C: React.lazy(() => import('@/view/axios-mock-adapter')) },
  { name: 'axios-adapter', link: '/axios-adapter', C: React.lazy(() => import('@/view/axios-adapter')) },
  { name: 'table-pagination', link: '/table-pagination', C: React.lazy(() => import('@/view/table-pagination')) },
  { name: 'find-array', link: '/find-array', C: React.lazy(() => import('@/view/find-array')) },
  { name: 'http-proxy', link: '/http-proxy', C: React.lazy(() => import('@/view/http-proxy')) },
  { name: 'change-tab', link: '/change-tab', C: React.lazy(() => import('@/view/change-tab')) },
  { name: 'modal', link: '/modal', C: React.lazy(() => import('@/view/modal')) },
  { name: 'use-virtual-list', link: '/use-virtual-list', C: React.lazy(() => import('@/view/use-virtual-list')) },
  { name: 'antd-icon', link: '/antd-icon', C: React.lazy(() => import('@/view/antd-icon')) },
  { name: 'tailwind', link: '/tailwind', C: React.lazy(() => import('@/view/tailwind')) }
]
