import './index.less'
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons'
export default () => {
  return (
    <div className='m-view'>
      <h3 className='m-title'>Ant design icons</h3>
      <StarOutlined />
      <StarFilled />
      <StarTwoTone twoToneColor='#eb2f96' />
    </div>
  )
}
