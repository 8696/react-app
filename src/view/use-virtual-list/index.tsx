import { useMemo, useRef } from 'react'
import { useVirtualList } from 'ahooks'

export default () => {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)

  const originalList = useMemo(() => Array.from(Array(999).keys()), [])

  const [list] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: (i) => (i % 2 === 0 ? 42 + 8 : 84 + 8),
    overscan: 10
  })

  return (
    <div style={{ overflowAnchor: 'none' }}>
      <div ref={containerRef} style={{ height: '800px', overflow: 'auto', overflowAnchor: 'none' }}>
        <div ref={wrapperRef}>
          {list.map((ele) => (
            <div
              style={{
                height: ele.index % 2 === 0 ? 42 : 84,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #e8e8e8',
                marginBottom: 8
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
