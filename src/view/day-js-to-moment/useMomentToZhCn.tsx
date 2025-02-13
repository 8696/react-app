import { useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn'

export default () => {
  useEffect(() => {
    moment.locale('zh-cn')
  }, [])
}
