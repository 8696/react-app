import './index.less'
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons'
import DemoTitle from '@/component/DemoTitle'
export default () => {
  return (
    <div className='m-view'>
      <DemoTitle>Ant design icons</DemoTitle>
      <StarOutlined />
      <StarFilled />
      <StarTwoTone twoToneColor='#eb2f96' />
    </div>
  )
}
