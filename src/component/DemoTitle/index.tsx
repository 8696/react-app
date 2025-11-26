import type { ReactNode } from 'react'
import { Typography } from 'antd'

type DemoTitleProps = {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5
  className?: string
}

const DemoTitle = ({ children, level = 3, className }: DemoTitleProps) => {
  const classes = ['m-title', className].filter(Boolean).join(' ')
  return (
    <Typography.Title level={level} className={classes}>
      {children}
    </Typography.Title>
  )
}

export default DemoTitle
