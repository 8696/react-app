import { useEffect } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

export default () => {
  useEffect(() => {
    dayjs.locale('zh-cn')
  }, [])
}
