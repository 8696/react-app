import './index.less'
import style from './index.module.less'
import Container from './component/container'
import BoxSizing from './component/box-sizing'
import Display from './component/display'
import Theme from './component/theme'

export default () => {
  return (
    <div style={{ padding: 20 }}>
      <div className={`tailwind-title ${style.tailwindTitleM}`}>Container</div>
      <Container />
      <div className={`tailwind-title ${style.tailwindTitleM}`}>box sizing</div>
      <BoxSizing />
      <div className={`tailwind-title ${style.tailwindTitleM}`}>display</div>
      <Display />
      <div className={`tailwind-title ${style.tailwindTitleM}`}>theme</div>
      <Theme />
    </div>
  )
}
