import './index.less'
import { useMemo } from 'react'
import { randomString } from '@/helper/utils'
import { Button } from 'antd'

export default () => {

  const map = useMemo(() => new Map(), [])
  const object = useMemo<any>(() => {
    return {}
  }, [])

  const data = useMemo(() => {
    const lastId: string[] = []
    return {
      list: new Array(100000).fill('').map((item, index) => {
        const id =  randomString()
        const obj = {
          id,
          a: randomString(),
          b: randomString(),
          c: randomString(),
          d: randomString(),
          index
        }
        if (index < 80000 && index > 60000) {
          lastId.push(id)
        }
        object[obj.id] = obj
        map.set(obj.id, obj)
        return obj
      }),
      lastId
    }
  }, [map, object])

  return (
    <div style={{ padding: 20 }}>
      <Button
        onClick={() => {
          const t = new Date().getTime()

          for (let i = 0; i < data.lastId.length; i++) {
            const id = data.lastId[i]
            const item = data.list.find(item => item.id === id)
            if (item?.id === id) {
              item
              // console.log(i, item)
            }
          }

          console.log(new Date().getTime() - t)
        }}
      >array</Button>
      <Button
        onClick={() => {
          const t = new Date().getTime()

          for (let i = 0; i < data.lastId.length; i++) {
            const id = data.lastId[i]
            const item = object[id]
            item
            // console.log(i, item)
          }

          console.log(new Date().getTime() - t)
        }}
      >object</Button>
      <Button
        onClick={() => {
          const t = new Date().getTime()

          for (let i = 0; i < data.lastId.length; i++) {
            const id = data.lastId[i]
            const item = map.get(id)
            item
            // console.log(i, item)
          }
          console.log(new Date().getTime() - t)
        }}
      >map</Button>
    </div>
  )
}
