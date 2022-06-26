import { Modal, Button } from 'antd'
import { useState } from 'react'
export default (props: { visible: boolean, close: () => void }) => {
  const [count, setCount] = useState(0)
  return (
    <>
      <Modal
        destroyOnClose
        visible={props.visible}
        onCancel={props.close}
        onOk={props.close}
        afterClose={() => {
          console.log('afterClose')
        }}
      >
        <Button onClick={() => setCount(prevState => prevState + 1)} type='primary'>+1</Button>
        &nbsp;&nbsp;{count}
      </Modal>
    </>
  )
}
