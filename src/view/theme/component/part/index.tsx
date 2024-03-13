import { ConfigProvider, Button, Switch, Input } from 'antd'


export default () => {

  return (
    <>
      <div className='m-view'>
        <h3 className='m-title'>局部主题</h3>
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
