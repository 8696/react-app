import { useHistory } from 'react-router-dom'

export default () => {
  const history = useHistory()
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
