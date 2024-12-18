import { theme, ColorPicker, Button, Alert } from 'antd'
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


  return (
    <>
      <div className='m-view'>
        <h3 className='m-title'>动态设置</h3>
        <div>
          <Button type='primary'>Primary Button</Button>
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
