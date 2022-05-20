import './index.less'
import { Button } from 'antd'
import { useMount, useMemoizedFn } from 'ahooks'
import axios, { AxiosRequestConfig } from 'axios'
export default () => {
  useMount(() => {
    const originAdapter = axios.defaults.adapter
    axios.defaults.adapter = (config: AxiosRequestConfig) => {

      return new Promise((resolve, reject) => {
        if (/A/.test(config.url as string)) {
          // originAdapter && originAdapter(config).then(resolve, reject)
          originAdapter && originAdapter(config).then((response) => {
            resolve(response)
          }, (error) => {
            reject(error)
          })
        } else {
          resolve({
            data: {
              code: 0
            },
            status: 500,
            statusText: 'OK',
            headers: {
              custom: 'custom value'
            },
            config
          })
        }
      })
    }
  })
  const log = useMemoizedFn((response) => {
    console.log('----')
    console.log(response)
    console.log(JSON.stringify(response.data, null, '  '))
  })
  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => {
        axios.get('/api/request-A')
          .then(log)
          .catch(err => {
            console.log(err)
          })
      }}>request - A</Button>
      <Button onClick={() => {
        axios.get('/api/request-B')
          .then(log)
          .catch(err => {
            console.log(err)
          })
      }}>request - B</Button>
    </div>
  )
}
