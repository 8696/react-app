import DemoTitle from '@/component/DemoTitle'
import AHooksGetState from './component/ahooks-get-state'
import GetState from './component/get-state'
import GetRef from './component/get-ref'
export default () => {

  return (
    <div className='m-view'>
      <DemoTitle>ahooks GetState</DemoTitle>
      <AHooksGetState />
      <DemoTitle>GetState</DemoTitle>
      <GetState />
      <DemoTitle>GetRef</DemoTitle>
      <GetRef />
    </div>
  )
}
