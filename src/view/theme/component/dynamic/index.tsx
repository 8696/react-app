import { theme, ColorPicker, Button, message, App, Modal } from 'antd'
import { useEffect } from 'react'
import Form from './form'
import { useTheme } from '@/provider/theme'
import DemoTitle from '@/component/DemoTitle'

const { useToken } = theme
export default () => {
  const { token  } = useToken()


  useEffect(() => {
    console.log(token.colorPrimary)
  }, [token])


  const { message: messageApi } = App.useApp()

  const { updateToken, updateTheme } = useTheme()

  return (
    <>
      <div className='m-view'>
        <DemoTitle>动态设置</DemoTitle>
        <Form/>


        <DemoTitle>message等静态方法消费context</DemoTitle>
        <span>使用 holderRender 给 message 、modal 、notification 静态方法设置 Provider</span>
        <br/>
        <br/>
        <div>
          <Button type='primary' onClick={() => {
            messageApi.open({
              type: 'error',
              content: '这个是直接使用hook方式调用应用ConfigProvider配置的效果，尝试设置主题error颜色试试icon的变化',
              duration: 10
            })
          }}>Hook方式调用message</Button>
          <br/>
          <br/>
          <Button type='primary' onClick={() => {
            // message.open({
            //   type: 'error',
            //   content: '这个是直接使用静态方法调用但是也能应用ConfigProvider配置的效果，尝试设置主题error颜色试试icon的变化。https://ant-design.antgroup.com/components/config-provider-cn#config-provider-demo-holderrender',
            //   duration: 10
            // })

            // or

            message.error('这个是直接使用静态方法调用但是也能应用ConfigProvider配置的效果，尝试设置主题error颜色试试icon的变化。https://ant-design.antgroup.com/components/config-provider-cn#config-provider-demo-holderrender')
            console.log(token.colorPrimary)
          }}>静态方法调用message</Button>
          <br/>
          <br/>
          <Button type='primary' onClick={() => {
            Modal.confirm({
              title: 'Do you want to delete these items?',
              content: 'Some descriptions'
            })
          }}>静态方法调用modal</Button>
        </div>
        <br/>

        <DemoTitle>设置主题</DemoTitle>

        <div className='flex items-center'>
          <span>选择主颜色：</span>
          <ColorPicker onChange={value => {
            updateToken?.({
              colorPrimary: '#' + value.toHex()
            })
          }}/>
        </div>
        <div className='flex items-center'>
          <span>选择主hover颜色：</span>
          <ColorPicker onChange={value => {
            updateToken?.({
              colorPrimaryHover: '#' + value.toHex()
            })
          }}/>
        </div>
        <div className='flex items-center'>
          <span>选择error颜色：</span>
          <ColorPicker onChange={value => {
            updateToken?.({
              colorError: '#' + value.toHex()
            })
          }}/>
        </div>
        <br/>
        <div className='flex items-center'>
          <Button
            type='primary'
            onClick={() => {
              updateToken?.({
                borderRadius: 20
              })
            }}
          >设置圆角</Button>
        </div>
        <DemoTitle>CSS 变量</DemoTitle>

        <div className=''>
          <div>
            <span style={{ color: 'var(--ant-color-primary)' }}>--ant-color-primary</span>
            &nbsp;
            <span style={{ color: 'var(--ant-color-error)' }}>--ant-color-error</span>
          </div>
          <br />
          <Button
            type='primary'
            onClick={() => {
              updateTheme?.({
                cssVar: false
              })
            }}
          >关闭css变量</Button>
          &nbsp;
          <Button
            type='primary'
            onClick={() => {
              updateTheme?.({
                cssVar: true
              })
            }}
          >打开css变量</Button>
        </div>
      </div>
    </>
  )
}
