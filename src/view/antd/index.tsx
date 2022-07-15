
import style from './index.module.less'
import scssStyle from './index.module.scss'
import TreeSelect from './component/TreeSelect'
import Cascader from './component/Cascader'

export default () => {

  return (
    <div style={{ padding: 20 }}>
      <h3 className={ `${scssStyle.title} ${style.title}` }>TreeSelect</h3>
      <TreeSelect />
      <h3 className={ `${scssStyle.title} ${style.title}` }>Cascader</h3>
      <Cascader />
    </div>
  )
}
