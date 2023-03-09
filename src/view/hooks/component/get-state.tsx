import useGetState from '@/hooks/useGetState'
import { Button } from 'antd'
import { useEffect } from 'react'


export default () => {

  const [state, setState, getState] = useGetState<{a: string}>({
    a: 'init'
  })

  const change = () => {
    const a = Math.random().toString()
    console.log(a)
    setState({
      a
    })
    console.log(JSON.stringify(getState()))

    const b = Math.random().toString()
    console.log(b)
    setState({
      a: b
    })
    console.log(JSON.stringify(getState()))

    const c = Math.random().toString()
    console.log(c)
    setState(() => {
      return {
        a: c
      }
    })
    console.log(JSON.stringify(getState()))


    const d = Math.random().toString()
    console.log(d)
    setState(() => {
      return {
        a: d
      }
    })
    console.log(JSON.stringify(getState()))
  }

  useEffect(() => {
    console.log('useEffect', state)
  }, [state])

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log('interval count 1', JSON.stringify(state))
      // console.log('interval count 2', JSON.stringify(getState()))
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <h4>state value: {state?.a || 'null'}</h4>
      <Button onClick={change}>change</Button>
    </>
  )
}
