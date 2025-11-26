import { theme } from 'antd'
import DemoTitle from '@/component/DemoTitle'

export default () => {

  const { token  } = theme.useToken()

  return (
    <>
      <div className='m-view'>
        <DemoTitle>Design Token</DemoTitle>
        <div>
          <div
            style={{
              backgroundColor: token.colorPrimaryBg,
              padding: token.padding,
              borderRadius: token.borderRadius,
              color: token.colorPrimary,
              fontSize: token.fontSize
            }}
          >
            使用 Design Token
          </div>
        </div>
      </div>
    </>
  )
}
