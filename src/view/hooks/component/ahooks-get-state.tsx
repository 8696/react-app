import { useGetState } from 'ahooks'
import { Button } from 'antd'
import { useEffect } from 'react'


export default () => {

  const [state, setState, getState] = useGetState<{value: string}>({
    value: 'init'
  })

  const change = () => {
    const a = Math.random().toString()
    console.log(a, '即将设置的值a')
    setState({
      value: a
    })
    console.log(getState().value, '获取刚刚设置的值a')

    //
    const b = Math.random().toString()
    console.log(b, '即将设置的值b')
    setState({
      value: b
    })
    console.log(getState().value, '获取刚刚设置的值b')

  }

  useEffect(() => {
    console.log('useEffect', state)
  }, [state])


  return (
    <>
      <h4>state value: {state?.value || 'null'}</h4>
      <Button onClick={change}>change</Button>
    </>
  )
}
