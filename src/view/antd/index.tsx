import TreeSelect from './component/TreeSelect'
import Cascader from './component/Cascader'
import TreeSelect2 from './component/TreeSelect2'
import Tree from './component/Tree'
import DemoTitle from '@/component/DemoTitle'

export default () => {

  return (
    <div className='m-view'>
      <DemoTitle>TreeSelect</DemoTitle>
      <TreeSelect />
      <DemoTitle>Cascader</DemoTitle>
      <Cascader />
      <DemoTitle>TreeSelect2</DemoTitle>
      <TreeSelect2 />
      <DemoTitle>Form Tree</DemoTitle>
      <Tree />
    </div>
  )
}
