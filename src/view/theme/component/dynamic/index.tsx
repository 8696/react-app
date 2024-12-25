import { theme, ColorPicker, Button, message, App } from 'antd'
import { useContext, useEffect } from 'react'
import { ThemeContext } from '@/provider/theme'
import Form from './form'

const { useToken } = theme
export default () => {
  const { token  } = useToken()


  useEffect(() => {
    console.log(token.colorPrimary)
  }, [token])

  const { setTheme } = useContext(ThemeContext)

  const { message: messageApi } = App.useApp()

  return (
    <>
      <div className='m-view'>
        <h3 className='m-title'>动态设置</h3>
        <div>
          <Button type='primary' onClick={() => {
            messageApi.open({
              type: 'error',
              content: '尝试设置主题error颜色试试icon的变化',
              duration: 10
            })
          }}>useMessage</Button>
          <br/>
          <br/>
          <Button type='primary' onClick={() => {
            // 直接使用 message 无法使用全局 ConfigProvider 的主题
            message.open({
              type: 'success',
              content: '直接使用 message 无法使用全局 ConfigProvider 的主题',
              duration: 10
            })
          }}>message.success</Button>
          <br/>
          <br/>
          <Form/>
        </div>
        <br/>
        <div className='flex items-center'>
          <span>选择主颜色：</span>
          <ColorPicker onChange={value => {
            setTheme?.({
              token: {
                ...token,
                colorPrimary: '#' + value.toHex()
              }
            })
          }}/>
        </div>
        <div className='flex items-center'>
          <span>选择主hover颜色：</span>
          <ColorPicker onChange={value => {
            setTheme?.({
              token: {
                ...token,
                colorPrimaryHover: '#' + value.toHex()
              }
            })
          }}/>
        </div>
        <div className='flex items-center'>
          <span>选择error颜色：</span>
          <ColorPicker onChange={value => {
            setTheme?.({
              token: {
                ...token,
                colorError: '#' + value.toHex()
              }
            })
          }}/>
        </div>
        <br/>
        <div className='flex items-center'>
          <Button
            type='primary'
            onClick={() => {
              setTheme?.({
                token: {
                  ...token,
                  borderRadius: 20
                }
              })
            }}
          >设置圆角</Button>
        </div>
      </div>
    </>
  )
}
