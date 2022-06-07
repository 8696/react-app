import './index.less'
import { Button } from 'antd'
import { useUserName } from './http'

export default () => {
  const { refreshAsync, data, runAsync } = useUserName({
    type: 'default'
  })
  console.log('data')
  console.log(JSON.stringify(data, null, '  '))

  return (
    <div className='use-request'>
      <Button onClick={() => {
        refreshAsync()
          .then(data => {
            console.log('refreshAsync')
            console.log(JSON.stringify(data, null, '  '))
          })
      }}>refreshAsync</Button>
      {/************************ */}
      <Button onClick={() => {
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
