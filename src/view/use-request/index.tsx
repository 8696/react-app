import './index.less'
import { Button } from 'antd'
import { useUserName } from './http'
import { useEffect } from 'react'

export default () => {
  const { refreshAsync, data, runAsync, loading } = useUserName({
    type: 'default'
  })
  // console.log('data')
  // console.log(JSON.stringify(data, null, '  '))

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='m-view'>
      <h3 className='m-title'>使用上一次请求参数</h3>
      <Button loading={loading} onClick={() => {
        refreshAsync()
          .then(data => {
            console.log('refreshAsync')
            console.log(JSON.stringify(data, null, '  '))
          })
      }}>refreshAsync</Button>
      <h3 className='m-title'>使用新的请求参数</h3>
      <Button loading={loading} onClick={() => {
        runAsync({
          type: 'runAsync' + Math.random()
        })
          .then(data => {
            console.log('runAsync')
            console.log(JSON.stringify(data, null, '  '))
          })
      }}>runAsync</Button>

    </div>
  )
}
