import { ConfigProvider, Button, Switch, Input } from 'antd'
import DemoTitle from '@/component/DemoTitle'


export default () => {

  return (
    <>
      <div className='m-view'>
        <DemoTitle>局部主题</DemoTitle>
        <ConfigProvider theme={{
          token: {
            colorPrimary: '#dc9a32'
          }
        }}>
          <div>
            <Button type={'primary'}>Button</Button>
            <Switch defaultChecked/>
            <Input />
          </div>
        </ConfigProvider>
        <br/>
        <ConfigProvider theme={{
          token: {
            colorPrimary: '#015959'
          }
        }}>
          <div>
            <Button type={'primary'}>Button</Button>
            <Switch defaultChecked/>
            <Input />
          </div>
        </ConfigProvider>
      </div>
    </>
  )
}
