
import style from './index.module.less'
import scssStyle from './index.module.scss'

import GetState from './component/get-state'
import GetRef from './component/get-ref'
export default () => {

  return (
    <div style={{ padding: 20 }}>
      <h3 className={ `${scssStyle.title} ${style.title}` }>GetState</h3>
      <GetState />
      <h3 className={ `${scssStyle.title} ${style.title}` }>GetRef</h3>
      <GetRef />
    </div>
  )
}
