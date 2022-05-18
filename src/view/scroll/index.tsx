import './index.less'
import { useRef, Fragment, useMemo } from 'react'
import { useVirtualList } from 'ahooks'
import originList from './origin-list'
export default () => {

  /*  function getRandomColor() {
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += (Math.random() * 16 | 0).toString(16)
    }
    return color
  }*/

  // 号
  type NumberType = {
    id: number
    name: string
  }
  // 单元 list
  type UnitType = {
    id: number
    name: string
    number: NumberType[]
  }
  const unitList: UnitType[] = Array.from(Array(10).keys()).map((_, index) => {
    return {
      id: index,
      name: index + 'D',
      number: Array.from(Array(index + 1).keys()).map((_, index) => {
        return {
          id: index,
          name: index + '号'
        }
      })
    }
  })
  console.log(JSON.stringify(unitList, null, '  '))
  //
  // 号楼的宽度
  const hWidth = 120


  console.log(JSON.stringify(originList, null, '  '))

  console.log('s--------')
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  const originalList = useMemo(() => Array.from(Array(99999).keys()), [])

  const [list] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 60,
    overscan: 10
  })
  return (
    <>
      <div className='scroll'>
        <div className='unit-list'>
          {
            unitList.map(item => {
              return (
                <Fragment key={item.id}>
                  <div className='unit-item' style={{ width: item.number.length * hWidth }}>
                    <div className='unit-name'>{item.name}</div>
                    {/* 层 */}
                    <div className='number-list'>
                      {
                        item.number.map(item => (
                          <Fragment key={item.id}>
                            <div className='number-item'>
                              <span>{item.name}</span>
                            </div>
                          </Fragment>
                        ))
                      }
                    </div>
                  </div>
                </Fragment>
              )
            })
          }
        </div>
        <div className='asset-list'>
          {
            originList.map(item => {
              return item.map(item => {
                return (
                  <>
                    {
                      item.type === 1 && (
                        <div className='storey-item item-common'>{item.name}</div>
                      )
                    }
                    {
                      item.type === 2 && (
                        <div className='asset-item item-common' style={{ width: 120 }}>{item.asset?.assetName}</div>
                      )
                    }
                    {
                      item.type === 3 && (
                        <div className='empty-item item-common' style={{ width: 120 }}>empty</div>
                      )
                    }
                  </>
                )
              })
            })
          }
        </div>
        <div style={{ marginBottom: 1000 }} />
        <div ref={containerRef} style={{ height: '300px', overflow: 'auto', border: '1px solid' }}>
          <div ref={wrapperRef}>
            {list.map((ele) => (
              <div
                style={{
                  height: 52,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid #e8e8e8',
                  marginBottom: 8
                }}
                key={ele.index}
              >
                Row: {ele.data}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
