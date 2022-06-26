import './index.less'
import List from 'rc-virtual-list'
import { useMemo } from 'react'

import useVirtualBoxHeight from './hook/useVirtualBoxHeight'

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

  const height = useVirtualBoxHeight()
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
                      <img style={{ height: '100%' }} src='https://private-oss-gz-020.oss-cn-guangzhou.aliyuncs.com/cli/upload/Users/i2022/Desktop/%E6%B5%8B%E8%AF%95%E5%9B%BE%E7%89%87/1.jpeg' alt=''/>
                      <img style={{ height: '100%' }} src='https://private-oss-gz-020.oss-cn-guangzhou.aliyuncs.com/cli/upload/Users/i2022/Desktop/%E6%B5%8B%E8%AF%95%E5%9B%BE%E7%89%87/60265eca0b17aaf3a313698573959712.jpeg' alt=''/>
                      <img style={{ height: '100%' }} src='https://private-oss-gz-020.oss-cn-guangzhou.aliyuncs.com/cli/upload/Users/i2022/Desktop/%E6%B5%8B%E8%AF%95%E5%9B%BE%E7%89%87/f1334f9a60e2a2ed08161253b1214cec.jpeg' alt=''/>
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
