import { DatePicker } from 'antd'

export default () => {
  return (
    <>
      <DatePicker
        renderExtraFooter={() => {
          return <span>不限</span>
        }}
        showToday={false} />
    </>
  )
}
