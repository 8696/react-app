
import Component from './component'

export default () => {
  return (
    <div style={{ padding: 20, backgroundColor: '#002040' }}>
      <Component
        paneList={['VR', '图片', '视频', '视频', '视频', '视频', '视频']}
        onChange={value => {
          console.log(value)
        }}
      />
    </div>
  )
}
