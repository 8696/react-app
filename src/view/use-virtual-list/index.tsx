import { useMemo, useRef } from 'react'
import { useVirtualList } from 'ahooks'

export default () => {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)

  const originalList = useMemo(() => Array.from(Array(40).keys()), [])

  const [list] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 80,
    overscan: 10
  })

  return (
    <div style={{ overflowAnchor: 'none' }}>
      <div ref={containerRef} style={{ height: '800px', overflow: 'auto', overflowAnchor: 'none' }}>
        <div ref={wrapperRef}>
          {list.map((ele) => (
            <div
              style={{
                height: 80,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e8e8e8'
              }}
              key={ele.index}
            >
              Row: {ele.data} size: {ele.index % 2 === 0 ? 'small' : 'large'}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
