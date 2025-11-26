import './index.less'
import { useState } from 'react'
import { DatePicker } from 'antd'
import { DatePicker as MomentDatePicker } from './component'
import dayjs from 'dayjs'
import moment from 'moment'
import useMomentToZhCn from './useMomentToZhCn'
import DemoTitle from '@/component/DemoTitle'

const { RangePicker } = DatePicker
const { RangePicker: MomentRangePicker } = MomentDatePicker

export default () => {

  useMomentToZhCn()

  // dayjs
  const [datePickerValue, setDatePickerValue] = useState<any>(dayjs('2025-02-10 01:02:03'))
  const [dateRangePickerValue, setDateRangePickerValue] = useState<any>([
    dayjs('2025-02-09 01:02'), dayjs('2025-02-11 03:04')
  ])


  // moment
  const [momentDatePickerValue, setMomentDatePickerValue] = useState<any>(moment('2025-02-10 01:02:03'))
  const [momentRangePickerValue, setMomentRangePickerValue] = useState<any>([
    moment('2025-02-09 01:02'), moment('2025-02-11 03:04')
  ])


  return (
    <div className='m-view'>
      <DemoTitle>说明</DemoTitle>
      <div className='m-desc'>V5版本中内置的时间库使用 Dayjs 替代 Moment.js，如果在升级前使用大量的 Moment.js API，可以参考以下方式进行替换
        <a
          target='_blank'
          href='https://ant-design.antgroup.com/docs/react/use-custom-date-library-cn#自定义组件' rel='noreferrer'>https://ant-design.antgroup.com/docs/react/use-custom-date-library-cn#自定义组件</a>
      </div>
      <DemoTitle>DatePicker(day.js)</DemoTitle>
      <DatePicker
        showTime
        onChange={(value) => {
          console.log('instanceof dayjs: ', value instanceof dayjs)
          setDatePickerValue(value)
        }}
        value={datePickerValue}
      />
      <DemoTitle>DatePicker.RangePicker(day.js)</DemoTitle>
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
      <DemoTitle>DatePicker(moment.js)</DemoTitle>
      <MomentDatePicker
        showTime
        onChange={(value) => {
          console.log('instanceof moment: ', value instanceof moment)
          setMomentDatePickerValue(value)
        }}
        value={momentDatePickerValue}
      />
      <DemoTitle>DatePicker.RangePicker(moment.js)</DemoTitle>
      <MomentRangePicker
        showTime={{ format: 'HH:mm' }}
        format='YYYY-MM-DD HH:mm'
        onChange={(value) => {
          value?.forEach(day => {
            console.log('instanceof moment: ', day instanceof moment)
          })
          setMomentRangePickerValue(value)
        }}
        value={momentRangePickerValue}
      />
    </div>
  )
}
