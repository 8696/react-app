import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { message } from 'antd'

export default () => {
  const history = useHistory()

  useEffect(() => {
    message.error('Not Found.')
  }, [])

  return (
    <div>
      <span
        onClick={() => {
          history.replace('/')
        }}
      >
        404
      </span>
    </div>
  )
}
