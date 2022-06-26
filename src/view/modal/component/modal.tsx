import { ReactNode, useEffect, useState } from 'react'

export default (props: {
  children: ReactNode
  visible: boolean
  afterCloseTime?: number
}) => {
  const [visible, setVisible] = useState(props.visible)
  useEffect(() => {
    let timer: any
    if (props.visible) {
      setVisible(true)
    } else {
      timer = setTimeout(() => {
        setVisible(false)
      }, props.afterCloseTime || 250)
    }
    return () => clearTimeout(timer)
  }, [props.visible, props.afterCloseTime])
  return (
    <>{visible && props.children}</>
  )
}
