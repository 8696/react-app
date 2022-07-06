import './index.less'
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons'
export default () => {
  return (
    <div style={{ padding: 20 }}>
      <StarOutlined />
      <StarFilled />
      <StarTwoTone twoToneColor='#eb2f96' />
    </div>
  )
}
