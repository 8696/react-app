import './index.less'
import LessModule from './component/less-module'
import ScssModule from './component/scss-module'
import DemoTitle from '@/component/DemoTitle'
export default () => {
  return (
    <div className='m-view'>
      <DemoTitle>LessModule</DemoTitle>
      <LessModule />
      <DemoTitle>ScssModule</DemoTitle>
      <ScssModule />
    </div>
  )
}
