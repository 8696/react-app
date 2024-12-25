
import nav from '../../view/nav'
import { NavLink } from 'react-router-dom'
import './index.less'

import { theme } from 'antd'

export default () => {

  const { token } = theme.useToken()

  return (
    <div className='main-link'>
      {nav.map(item => (
        <NavLink style={{ color: token.colorPrimary }} key={item.name} to={item.link}>{item.name}</NavLink>
      ))}
    </div>
  )
}
