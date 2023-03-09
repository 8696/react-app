import TreeSelect from './component/TreeSelect'
import Cascader from './component/Cascader'
import TreeSelect2 from './component/TreeSelect2'

export default () => {

  return (
    <div className='m-view'>
      <h3 className='m-title'>TreeSelect</h3>
      <TreeSelect />
      <h3 className='m-title'>Cascader</h3>
      <Cascader />
      <h3 className='m-title'>TreeSelect2</h3>
      <TreeSelect2 />
    </div>
  )
}
