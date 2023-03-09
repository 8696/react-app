import './index.less'
import LessModule from './component/less-module'
import ScssModule from './component/scss-module'
export default () => {
  return (
    <div className='m-view'>
      <h3 className='m-title'>LessModule</h3>
      <LessModule />
      <h3 className='m-title'>ScssModule</h3>
      <ScssModule />
    </div>
  )
}
