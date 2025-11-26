import { Table, Input, Button } from 'antd'
import { useState } from 'react'
import DemoTitle from '@/component/DemoTitle'

export default () => {
  const [dataSource, setDataSource] = useState([
    {
      id: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    },
    {
      id: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }
  ])

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 200
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 200
    },
    {
      title: '住址',
      dataIndex: 'address',
      width: 200
    }
  ]

  const [keyWork, setKeyWork] = useState<string>('')

  return (
    <div className='m-view'>
      <DemoTitle>Change row</DemoTitle>
      <Table
        style={{ width: '100%' }}
        scroll={{ x: 1200 }}
        dataSource={dataSource}
        bordered
        columns={columns}
        rowKey={() => Math.random()}
      />
      <div>
        <Input onChange={e => {
          setKeyWork(e.target.value)
        }} style={{ width: 300 }} />
        &nbsp;
        <Button onClick={() => {
          dataSource[0].name = keyWork
          console.log(JSON.stringify([...dataSource], null, '  '))
          setDataSource([...dataSource])
        }}>Change</Button>
      </div>
    </div>
  )
}
