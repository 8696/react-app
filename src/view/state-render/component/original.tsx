import { useCallback, useState } from 'react'
import { Button } from 'antd'
import { useMount } from 'ahooks'

export default () => {
  console.log('render.')
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const setCount = useCallback(() => {
    setCount1(prevState => prevState + 1)
    setCount2(prevState => prevState + 1)
  }, [])
  useMount(() => {
    document.querySelector('.set-count')?.addEventListener('click', () => {
      setCount()
    })
  })
  return (
    <>
      <div>count1: { count1 }</div>
      <div>count2: { count2 }</div>
      <br/>
      <Button id='set-count' onClick={setCount}>setCount</Button>
    </>
  )
}
