import './index.less'
import List from 'rc-virtual-list'
import { useMemo } from 'react'

import useVistBoxHeight from '@/hook/useVistBoxHeight'

export default () => {

  const list = useMemo(() => {
    const list: Array<{ id: number, time: string }> = []
    for (let i = 0; i < 100000; i++) {
      list.push({
        id: i,
        time: new Date().getTime().toString()
      })
    }
    return list
  }, [])

  const height = useVistBoxHeight()
  console.log(height)

  return (
    <>
      <div className='vist-demo'>
        <div className='box'>
          <List data={list as unknown as any[]} height={height} itemHeight={90} itemKey='id'>
            {item => {
              return (
                <>
                  <div style={{  height: 90, border: '1px solid #cccccc' }}>
                    <div style={{ height: 30 }}>
                      {item.id}
                    </div>
                    <div style={{ height: 30 }}>
                      {item.time}
                    </div>
                    <div style={{ height: 30 }}>
                      <img style={{ height: '100%' }} src='http://asset.icode.link/test/u%3D1557229360%2C443641844%26fm%3D193%26f%3DGIF.jpeg' alt=''/>
                      <img style={{ height: '100%' }} src='http://asset.icode.link/test/u%3D4240641596%2C3235181048%26fm%3D193%26f%3DGIF.jpeg' alt=''/>
                      <img style={{ height: '100%' }} src='https://t7.baidu.com/it/u=805456074,3405546217&fm=193&f=GIF' alt=''/>
                    </div>
                  </div>
                </>
              )
            }}
          </List>
        </div>
      </div>
    </>
  )
}
