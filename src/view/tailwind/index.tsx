import './index.less'
import style from './index.module.less'
import BoxSizing from './component/box-sizing'
import Display from './component/display'
import Theme from './component/theme'

export default () => {
  return (
    <div className='m-view'>
      <div className={`tailwind-title ${style.tailwindTitleM}`}>box sizing</div>
      <BoxSizing />
      <div className={`tailwind-title ${style.tailwindTitleM}`}>display</div>
      <Display />
      <div className={`tailwind-title ${style.tailwindTitleM}`}>theme</div>
      <Theme />
    </div>
  )
}
