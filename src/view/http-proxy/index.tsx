import './index.less'
import { Button, Input } from 'antd'
import axios from 'axios'
import { useState } from 'react'
export default () => {
  const [json, setJson] = useState<string>()
  const [path, setPath] = useState<string>('/url')
  const [loading, setLoading] = useState(false)
  return (
    <div className='m-view'>
      <h3 className='m-title'>Http proxy</h3>
      <Input.Group compact>
        <Input
          style={{ width: 300 }}
          value={path}
          onChange={e => {
            setPath(e.target.value)
          }}
        />
        <Button
          loading={loading}
          type='primary'
          onClick={() => {
            setLoading(true)
            axios.get(`/api/${path}`)
              .then(data => {
                setJson(JSON.stringify(data.data, null, '  '))
              })
              .finally(() => {
                setLoading(false)
              })
          }}
        >
          Request
        </Button>
      </Input.Group>
      <br/>
      <br/>
      <pre>{json}</pre>
    </div>
  )
}
