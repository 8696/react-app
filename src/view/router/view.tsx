import { useLocation } from 'react-router-dom'

export default () => {
  const { pathname } = useLocation()
  return (
    <>
      <div>{pathname}</div>
    </>
  )
}
