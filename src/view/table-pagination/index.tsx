import './index.less'
import { Table } from 'antd'
import { useMemo } from 'react'
export default () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address'
    }
  ]
  const data = useMemo(() => {
    return new Array(99).fill('').map((_, index) => {
      return {
        key: index.toString(),
        name: 'Joe Black ' + index,
        age: index,
        address: 'Sidney No. 1 Lake Park'
      }
    })
  }, [])
  return (
    <div className='m-view'>
      <h3 className='m-title'>Table pagination</h3>
      <Table
        columns={columns}
        key='key'
        dataSource={data}
        size='small'
        pagination={{ size: 'small', showTotal: () => null, showSizeChanger: true, showQuickJumper: false }}
      />
    </div>
  )
}
