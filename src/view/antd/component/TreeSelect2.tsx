import { useEffect, useState } from 'react'
import { TreeSelect } from 'antd'

import json from './TreeSelect2-json'

export default () => {
  const [treeData, setTreeData] = useState<Array<any>>([])
  const [value, setValue] = useState<string>()

  useEffect(() => {
    setTreeData(json)
  }, [])

  const onChange = (val: any) => {
    setValue(val)
  }

  return (
    <>
      <TreeSelect
        treeCheckable
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 800, overflow: 'auto' }}
        placeholder='Please select'
        onChange={onChange}
        treeData={treeData}
        treeDefaultExpandAll
        fieldNames={{
          label: 'value',
          children: 'child',
          value: 'value'
        }}
      />
    </>
  )
}
