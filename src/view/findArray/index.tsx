import './index.less'
import { useEffect, useMemo } from 'react'
import { randomString } from '@/helper/utils'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import HashTable from 'simple-hashtable'
export default () => {
  const hashtable = useMemo(() => new HashTable(), [])
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        hashtable.put(obj.id, obj)
        object[obj.id] = obj
        map.set(obj.id, obj)
        return obj
      }),
      lastId
    }
  }, [])
  useEffect(() => {
    setTimeout(() => {
      // console.log(data.list)
      // console.log(hashtable)
      // console.log(object)
      const t = new Date().getTime()

      for (let i = 0; i < data.lastId.length; i++) {
        break
        const id = data.lastId[i]
        const item = data.list.find(item => item.id === id)
        if (item?.id === id) {
          console.log(i, item)
        }
      }

      for (let i = 0; i < data.lastId.length; i++) {
        break
        const id = data.lastId[i]
        const item = hashtable.get(id)
        console.log(i, item)
      }
      for (let i = 0; i < data.lastId.length; i++) {
        break
        const id = data.lastId[i]
        const item = object[id]
        console.log(i, item)
      }
      for (let i = 0; i < data.lastId.length; i++) {
        // break
        const id = data.lastId[i]
        const item = map.get(id)
        console.log(i, item)
      }
      console.log(new Date().getTime() - t)
    }, 100)
  }, [data, hashtable, map, object])
  return (
    <>
      <div>template</div>
    </>
  )
}
