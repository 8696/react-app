import './index.less'
import Basics from './component/basics'
import PromiseC from './component/promise'
import Timeout from './component/timeout'
import Original from './component/original'
import DemoTitle from '@/component/DemoTitle'
export default () => {
  return (
    <>
      <div className='m-view'>
        <DemoTitle>basics</DemoTitle>
        <Basics />
        <DemoTitle>promise</DemoTitle>
        <PromiseC />
        <DemoTitle>timeout</DemoTitle>
        <Timeout />
        <DemoTitle>original</DemoTitle>
        <Original />
      </div>
    </>
  )
}
