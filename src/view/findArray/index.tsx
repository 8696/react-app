import './index.less'
import { useEffect, useMemo } from 'react'
import { randomString } from '@/helper/utils'

export default () => {
  const array = useMemo(() => {
    const lastId: string[] = []
    return {
      list: new Array(99999).fill('').map((item, index) => {
        const id =  randomString()
        if (index > 90000) {
          lastId.push(id)
        }
        return {
          id
        }
      }),
      lastId
    }
  }, [])
  useEffect(() => {
    for (let i = 0; i < array.lastId.length; i++) {
      const id = array.lastId[i]
      const item = array.list.find(item => item.id === id)
      if (item?.id === id) {
        console.log(i, item)
      }
    }
  }, [])
  return (
    <>
      <div>template</div>
    </>
  )
}
