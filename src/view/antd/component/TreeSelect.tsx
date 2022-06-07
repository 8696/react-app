import { useEffect, useState } from 'react'
import { TreeSelect } from 'antd'


export default () => {
  const [treeData, setTreeData] = useState<Array<any>>([])
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setTreeData([
      { id: 1, pId: 0, value: '1', title: 'Expand to load', key: '1', isLeaf: true },
      { id: 2, pId: 0, value: '2', title: 'Expand to load', key: '2', isLeaf: true },
      { id: 3, pId: 0, value: '3', title: 'Expand to load', key: '3', isLeaf: false }
    ])
  }, [])

  const onChange = (val: string) => {
    setValue(val)
  }

  const onLoadData = (props: any): Promise<any> => {
    console.log(props)
    const list = (() => {
      const l: { id: number; pId: number; value: string; title: string; key: string; isLeaf: boolean }[] = []
      new Array(100).fill('').forEach((item, index) => {
        l.push({ id: 30 + index, pId: 3, value: '31' + index, title: 'Expand to load 3' + index, key: '31' + index, isLeaf: true })
      })
      return l
    })()
    setTreeData(treeData.concat(list))
    return Promise.resolve()
  }
  return (
    <>
      <TreeSelect
        treeDataSimpleMode
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder='Please select'
        onChange={onChange}
        loadData={onLoadData}
        treeData={treeData}
      />
    </>
  )
}
