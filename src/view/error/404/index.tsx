import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { message } from 'antd'

export default () => {
  const navigate = useNavigate()

  useEffect(() => {
    message.error('Not Found.')
  }, [])

  return (
    <div>
      <span
        onClick={() => {
          navigate('/', { replace: true })
        }}
      >
        404
      </span>
    </div>
  )
}
