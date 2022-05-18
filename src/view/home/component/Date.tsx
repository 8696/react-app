import { DatePicker } from 'antd'
const A: any = DatePicker
export default () => {
  return (
    <>
      <A
        renderExtraFooter={() => {
          return <span>不限</span>
        }}
        showToday={false} />
    </>
  )
}
