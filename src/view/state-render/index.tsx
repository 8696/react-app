import './index.less'
import Basics from './component/basics'
import PromiseC from './component/promise'
import Timeout from './component/timeout'
import Original from './component/original'
export default () => {
  return (
    <>
      <div className='m-view'>
        <h3 className='m-title'>basics</h3>
        <Basics />
        <h3 className='m-title'>promise</h3>
        <PromiseC />
        <h3 className='m-title'>timeout</h3>
        <Timeout />
        <h3 className='m-title'>original</h3>
        <Original />
      </div>
    </>
  )
}
