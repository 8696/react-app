import './index.less'
import Content from './component/content'
import { Button } from 'antd'
import { useState } from 'react'
import Model from './component/modal'
export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisible2, setIsModalVisible2] = useState(false)
  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => {
        setIsModalVisible(true)
      }}>Open modal</Button>
      &nbsp;
      &nbsp;
      <Button onClick={() => {
        setIsModalVisible2(true)
      }}>Open destroy modal</Button>

      <Content visible={isModalVisible} close={() => setIsModalVisible(false)} />

      <Model visible={isModalVisible2}>
        <Content visible={isModalVisible2} close={() => setIsModalVisible2(false)} />
      </Model>
    </div>
  )
}
