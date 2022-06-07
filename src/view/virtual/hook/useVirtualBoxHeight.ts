import { useEffect, useState } from 'react'

export default () => {
  const [height, setHeight] = useState<number>(window.innerHeight - 22)

  useEffect(() => {
    const getHeight = () => {
      setHeight(window.innerHeight - 22)
    }
    window.addEventListener('resize', getHeight)
    return () => {
      window.removeEventListener('resize', getHeight)
    }
  }, [])
  return height
}
