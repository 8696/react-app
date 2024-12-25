import { theme } from 'antd'

export default () => {

  const { token  } = theme.useToken()

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
