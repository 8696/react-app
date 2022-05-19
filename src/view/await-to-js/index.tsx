import './index.less'
import awaitToJs from 'await-to-js'
import { Button } from 'antd'
import { useMemoizedFn } from 'ahooks'

export default () => {
  const getUserinfo = useMemoizedFn(() => {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.5) {
        return resolve('> 0.5')
      }
      reject(new Error('< 0.5'))
    })
  })
  return (
    <div style={{ padding: 20 }}>
      <Button
        onClick={async () => {
          const [err, data] = await awaitToJs(getUserinfo())
          if (!err) {
            return console.log('fulfilled, res:', data)
          }
          console.log(err)
        }}
      >getUserinfo</Button>
    </div>
  )
}
