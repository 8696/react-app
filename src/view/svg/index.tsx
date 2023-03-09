import './index.less'
import url, { ReactComponent as SVG } from './asset/icon.svg'
export default () => {

  return (
    <>
      <div className='m-view'>
        <h3 className='m-title'>SVG</h3>
        <SVG />
        <h3 className='m-title'>Img</h3>
        <img src={url}  alt=''/>
      </div>
    </>
  )
}
