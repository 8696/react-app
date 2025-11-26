import { Modal, Button } from 'antd'
import { useState } from 'react'
export default (props: { open: boolean, close: () => void }) => {
  const [count, setCount] = useState(0)
  return (
    <>
      <Modal
        destroyOnClose
        open={props.open}
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
