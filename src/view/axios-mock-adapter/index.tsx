import './index.less'
import { Button } from 'antd'
import { startMock } from './mock'
import { useMount } from 'ahooks'
import axios from 'axios'
export default () => {
  useMount(() => {
    startMock()
  })
  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => {
        axios.get('/axios-mock-adapter/get')
          .then(data => {
            console.log(data)
          })
      }}>request</Button>
    </div>
  )
}
