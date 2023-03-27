import { useCallback, useState } from 'react'
import { Button } from 'antd'

export default () => {
  console.log('render.')
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const setCount = useCallback(() => {
    setTimeout(() => {
      setCount1(prevState => prevState + 1)
      setCount2(prevState => prevState + 1)
    })
  }, [])
  return (
    <>
      <div>count1: { count1 }</div>
      <div>count2: { count2 }</div>
      <br/>
      <Button onClick={setCount}>setCount</Button>
    </>
  )
}
