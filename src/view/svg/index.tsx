import './index.less'
import url from './asset/icon.svg'
import SVG from './asset/icon.svg?react'
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
