
import style from './index.module.less'
import scssStyle from './index.module.scss'

import UseGetState from './component/useGetState'
export default () => {

  return (
    <div style={{ padding: 20 }}>
      <h3 className={ `${scssStyle.title} ${style.title}` }>aHooks</h3>
      <UseGetState />
    </div>
  )
}
