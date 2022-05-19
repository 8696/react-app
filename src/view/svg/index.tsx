import './index.less'
import url, { ReactComponent as SVG } from './asset/icon.svg'
export default () => {

  return (
    <>
      <div style={{ padding: 20 }}>
        <SVG />
        <img src={url}  alt=''/>
      </div>
    </>
  )
}
