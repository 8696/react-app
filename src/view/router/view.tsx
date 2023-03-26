import { useLocation } from 'react-router'

export default () => {
  const { pathname } = useLocation()
  return (
    <>
      <div>{ pathname }</div>
    </>
  )
}
