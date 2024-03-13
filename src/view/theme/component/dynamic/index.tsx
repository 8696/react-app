import { theme, ColorPicker, Button } from 'antd'
import { useContext, useEffect } from 'react'
import { ThemeContext } from '@/provider/theme'

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
        </div>
        <br/>
        <div className='flex items-center'>
          <span>选择颜色：</span>
          <ColorPicker onChange={value => {
            setTheme && setTheme({
              token: {
                colorPrimary: '#' + value.toHex()
              }
            })
          }} />
        </div>
      </div>
    </>
  )
}
