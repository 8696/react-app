import useGetRef from '@/hooks/useGetRef'
import { Button } from 'antd'
import { useUpdate } from 'ahooks'


export default () => {

  const [ref, setRef, getRef] = useGetRef<{a: string}>({
    a: 'init'
  })

  const change = () => {
    const a = Math.random().toString()
    console.log(a)
    setRef({
      a
    })
    console.log(JSON.stringify(getRef()))

    const b = Math.random().toString()
    console.log(b)
    setRef({
      a: b
    })
    console.log(JSON.stringify(getRef()))
  }

  const update = useUpdate()
  const updateView = () => update()

  return (
    <>
      <h4>ref value: {ref?.a}</h4>
      <Button onClick={change}>change</Button>
      &nbsp;
      <Button onClick={updateView}>updateView</Button>
    </>
  )
}
