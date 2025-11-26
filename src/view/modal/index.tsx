import './index.less'
import Content from './component/content'
import { Button } from 'antd'
import { useState } from 'react'
import Model from './component/modal'
import DemoTitle from '@/component/DemoTitle'
export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisible2, setIsModalVisible2] = useState(false)
  return (
    <div className='m-view'>
      <DemoTitle>关闭不销毁</DemoTitle>
      <Button onClick={() => {
        setIsModalVisible(true)
      }}>Open modal</Button>
      <DemoTitle>关闭销毁</DemoTitle>
      <Button onClick={() => {
        setIsModalVisible2(true)
      }}>Open destroy modal</Button>

      <Content open={isModalVisible} close={() => setIsModalVisible(false)} />

      <Model open={isModalVisible2}>
        <Content open={isModalVisible2} close={() => setIsModalVisible2(false)} />
      </Model>
    </div>
  )
}
