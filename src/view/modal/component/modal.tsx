import { ReactNode, useEffect, useState } from 'react'

export default (props: {
  children: ReactNode
  open: boolean
  afterCloseTime?: number
}) => {
  const [visible, setVisible] = useState(props.open)
  useEffect(() => {
    let timer: any
    if (props.open) {
      setVisible(true)
    } else {
      timer = setTimeout(() => {
        setVisible(false)
      }, props.afterCloseTime || 250)
    }
    return () => clearTimeout(timer)
  }, [props.open, props.afterCloseTime])
  return (
    <>{visible && props.children}</>
  )
}
