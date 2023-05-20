import useGetRef from '@/hooks/useGetRef'
import { Button } from 'antd'
import { useUpdate } from 'ahooks'


export default () => {

  const [ref, setRef, getRef] = useGetRef<{value: string}>({
    value: 'init'
  })


  const change = () => {
    const a = Math.random().toString()
    console.log(a, '即将设置的值a')
    setRef({
      value: a
    })
    console.log(getRef().value, '获取刚刚设置的值a')

    //
    const b = Math.random().toString()
    console.log(b, '即将设置的值b')
    setRef({
      value: b
    })
    console.log(getRef().value, '获取刚刚设置的值b')

  }

  const update = useUpdate()

  const updateView = () => update()

  return (
    <>
      <h4>ref value: {ref?.value}</h4>
      <Button onClick={change}>change</Button>
      &nbsp;
      <Button onClick={updateView}>updateView</Button>
    </>
  )
}
