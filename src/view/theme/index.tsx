import './index.less'
import { theme } from 'antd'

const { useToken, getDesignToken } = theme
export default () => {
  const { token  } = useToken()
  console.log(token)
  console.log(getDesignToken())
  return (
    <>
      <div className='m-view'>
        <h3 className='m-title'>Design Token</h3>
        <div>
          <div
            style={{
              backgroundColor: token.colorPrimaryBg,
              padding: token.padding,
              borderRadius: token.borderRadius,
              color: token.colorPrimaryText,
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
