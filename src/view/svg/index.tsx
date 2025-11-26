import './index.less'
import url, { ReactComponent as SVG } from './asset/icon.svg'
import DemoTitle from '@/component/DemoTitle'
export default () => {

  return (
    <>
      <div className='m-view'>
        <DemoTitle>SVG</DemoTitle>
        <SVG />
        <DemoTitle>Img</DemoTitle>
        <img src={url}  alt=''/>
      </div>
    </>
  )
}
