
import nav from '../../view/nav'
import { NavLink } from 'react-router-dom'
import './index.less'

export default () => {

  return (
    <div className='main-link'>
      {nav.map(item => (
        <NavLink key={item.name} to={item.link}>{item.name}</NavLink>
      ))}
    </div>
  )
}
