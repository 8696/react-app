import GetState from './component/get-state'
import GetRef from './component/get-ref'
export default () => {

  return (
    <div className='m-view'>
      <h3 className='m-title'>GetState</h3>
      <GetState />
      <h3 className='m-title'>GetRef</h3>
      <GetRef />
    </div>
  )
}
