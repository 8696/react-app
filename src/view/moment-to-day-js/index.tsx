import './index.less'
import React from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker


export default () => {

  const [datePickerValue, setDatePickerValue] = React.useState<any>(dayjs('2025-02-10 01:02:03'))
  const [dateRangePickerValue, setDateRangePickerValue] = React.useState<any>([
    dayjs('2025-02-09 01:02'), dayjs('2025-02-11 03:04')
  ])

  return (
    <div className='m-view'>
      <h3 className='m-title'>说明</h3>
      <div className='m-desc'>V5版本中内置的时间库使用 Dayjs 替代 Moment.js，Day.js 相比于 moment 使用了不可变数据结构，性能更快，体积仅
        2KB，API 设计完全一致
      </div>
      <h3 className='m-title'>DatePicker</h3>
      <DatePicker
        showTime
        onChange={(value) => {
          console.log('instanceof dayjs: ', value instanceof dayjs)
          setDatePickerValue(value)
        }}
        value={datePickerValue}
      />
      <h3 className='m-title'>DatePicker.RangePicker</h3>
      <RangePicker
        showTime={{ format: 'HH:mm' }}
        format='YYYY-MM-DD HH:mm'
        onChange={(value) => {
          value?.forEach(day => {
            console.log('instanceof dayjs: ', day instanceof dayjs)
          })
          setDateRangePickerValue(value)
        }}
        value={dateRangePickerValue}
      />
    </div>
  )
}
