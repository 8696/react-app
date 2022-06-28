import { Cascader, Button } from 'antd'
import { useState } from 'react'
import './cascader.less'

export default () => {

  const options = [
    {
      'id': '184391c4-bb28-11ec-b369-75ba826e75ad',
      'title': '其它',
      'value': '其它',
      'en_title': null,
      'parent_id': '3a0275cf-2e43-c96f-7343-3a6e6ab9950f',
      'level': 1,
      'scope_id': '',
      'parameter_id': '',
      'sort': 1,
      'is_system': 0,
      'is_enabled': 1,
      'ext': '',
      'child': [
        {
          'id': '184391c5-bb28-11ec-b369-93fb8704248b',
          'title': '监狱',
          'value': '监狱',
          'en_title': null,
          'parent_id': '184391c4-bb28-11ec-b369-75ba826e75ad',
          'level': 2,
          'scope_id': '',
          'parameter_id': '',
          'sort': 1,
          'is_system': 0,
          'is_enabled': 1,
          'ext': '',
          'child': [],
          'is_exhibition': null
        }
      ],
      'is_exhibition': null
    },
    {
      'id': '3a027606-390e-9449-3dcc-fd8474d1488b',
      'title': '写字楼',
      'value': '写字楼',
      'en_title': null,
      'parent_id': '3a0275cf-2e43-c96f-7343-3a6e6ab9950f',
      'level': 1,
      'scope_id': '',
      'parameter_id': '',
      'sort': 1,
      'is_system': 1,
      'is_enabled': 1,
      'ext': '',
      'child': [],
      'is_exhibition': null
    },
    {
      'id': '3a027606-540a-097e-276f-4c24c7ea0951',
      'title': '商铺',
      'value': '商铺',
      'en_title': null,
      'parent_id': '3a0275cf-2e43-c96f-7343-3a6e6ab9950f',
      'level': 1,
      'scope_id': '',
      'parameter_id': '',
      'sort': 2,
      'is_system': 1,
      'is_enabled': 1,
      'ext': '',
      'child': [],
      'is_exhibition': null
    },
    {
      'id': '3a027606-6fa6-3260-0b7e-336f812ea966',
      'title': '住宅',
      'value': '住宅',
      'en_title': null,
      'parent_id': '3a0275cf-2e43-c96f-7343-3a6e6ab9950f',
      'level': 1,
      'scope_id': '',
      'parameter_id': '',
      'sort': 3,
      'is_system': 1,
      'is_enabled': 1,
      'ext': '',
      'child': [
        {
          'id': '8747ba6b-bb2d-11ec-b369-87de0f77b9b6',
          'title': '成套住宅',
          'value': '成套住宅',
          'en_title': null,
          'parent_id': '3a027606-6fa6-3260-0b7e-336f812ea966',
          'level': 2,
          'scope_id': '',
          'parameter_id': '',
          'sort': 1,
          'is_system': 0,
          'is_enabled': 1,
          'ext': '',
          'child': [
            {
              'id': '8747ba6c-bb2d-11ec-b369-f113527b62d5',
              'title': '别墅',
              'value': '别墅',
              'en_title': null,
              'parent_id': '8747ba6b-bb2d-11ec-b369-87de0f77b9b6',
              'level': 3,
              'scope_id': '',
              'parameter_id': '',
              'sort': 1,
              'is_system': 0,
              'is_enabled': 1,
              'ext': '',
              'child': null,
              'is_exhibition': null
            }
          ],
          'is_exhibition': null
        }
      ],
      'is_exhibition': null
    },
    {
      'id': '3e75ad86-bb2b-11ec-b369-ebd9ad0951ce',
      'title': '土地用途',
      'value': '土地用途',
      'en_title': null,
      'parent_id': '3a0275cf-2e43-c96f-7343-3a6e6ab9950f',
      'level': 1,
      'scope_id': '',
      'parameter_id': '',
      'sort': 1,
      'is_system': 0,
      'is_enabled': 1,
      'ext': '',
      'child': [
        {
          'id': '3e75ad87-bb2b-11ec-b369-2b9b6ab6d16e',
          'title': '土地用途2级',
          'value': '土地用途2级',
          'en_title': null,
          'parent_id': '3e75ad86-bb2b-11ec-b369-ebd9ad0951ce',
          'level': 2,
          'scope_id': '',
          'parameter_id': '',
          'sort': 1,
          'is_system': 0,
          'is_enabled': 1,
          'ext': '',
          'child': [
            {
              'id': '3e75ad88-bb2b-11ec-b369-5baab78e8103',
              'title': '土地用途3级',
              'value': '土地用途3级',
              'en_title': null,
              'parent_id': '3e75ad87-bb2b-11ec-b369-2b9b6ab6d16e',
              'level': 3,
              'scope_id': '',
              'parameter_id': '',
              'sort': 1,
              'is_system': 0,
              'is_enabled': 1,
              'ext': '',
              'child': null,
              'is_exhibition': null
            }
          ],
          'is_exhibition': null
        }
      ],
      'is_exhibition': null
    },
    {
      'id': '47b08059-bb2b-11ec-b369-69e1fd746e0e',
      'title': '裁决房',
      'value': '裁决房',
      'en_title': null,
      'parent_id': '3a0275cf-2e43-c96f-7343-3a6e6ab9950f',
      'level': 1,
      'scope_id': '',
      'parameter_id': '',
      'sort': 1,
      'is_system': 0,
      'is_enabled': 1,
      'ext': '',
      'child': [],
      'is_exhibition': null
    },
    {
      'id': '6d2b365a-b960-11ec-bd22-3ff3550e1234',
      'title': '租赁一级用途',
      'value': '租赁一级用途',
      'en_title': null,
      'parent_id': '3a0275cf-2e43-c96f-7343-3a6e6ab9950f',
      'level': 1,
      'scope_id': '',
      'parameter_id': '',
      'sort': 1,
      'is_system': 1,
      'is_enabled': 1,
      'ext': '',
      'child': [
        {
          'id': '6d2b365a-b960-11ec-bd22-3ff3550e1235',
          'title': '租赁二级用途',
          'value': '租赁二级用途',
          'en_title': null,
          'parent_id': '6d2b365a-b960-11ec-bd22-3ff3550e1234',
          'level': 2,
          'scope_id': '',
          'parameter_id': '',
          'sort': 1,
          'is_system': 1,
          'is_enabled': 1,
          'ext': '',
          'child': [
            {
              'id': '6d2b365a-b960-11ec-bd22-3ff3550e1236',
              'title': '租赁三级用途',
              'value': '租赁三级用途',
              'en_title': null,
              'parent_id': '6d2b365a-b960-11ec-bd22-3ff3550e1235',
              'level': 3,
              'scope_id': '',
              'parameter_id': '',
              'sort': 1,
              'is_system': 1,
              'is_enabled': 1,
              'ext': '',
              'child': null,
              'is_exhibition': null
            }
          ],
          'is_exhibition': null
        }
      ],
      'is_exhibition': null
    },
    {
      'id': '8747ba6d-bb2d-11ec-b369-49fc96676c08',
      'title': '住宅2',
      'value': '住宅2',
      'en_title': null,
      'parent_id': '3a0275cf-2e43-c96f-7343-3a6e6ab9950f',
      'level': 1,
      'scope_id': '',
      'parameter_id': '',
      'sort': 1,
      'is_system': 0,
      'is_enabled': 1,
      'ext': '',
      'child': [],
      'is_exhibition': null
    },
    {
      'id': 'afe8a58a-bb2b-11ec-b369-0566589de430',
      'title': '请输入选项名称',
      'value': '请输入选项名称',
      'en_title': null,
      'parent_id': '3a0275cf-2e43-c96f-7343-3a6e6ab9950f',
      'level': 1,
      'scope_id': '',
      'parameter_id': '',
      'sort': 1,
      'is_system': 0,
      'is_enabled': 1,
      'ext': '',
      // 'child': [],
      'is_exhibition': null
    }
  ]

  function onChange(value: any) {
    console.log(value)
    setValue(value)
  }

  const [value, setValue] = useState<string[]>()

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Cascader
        options={options}
        value={value}
        onChange={onChange}
        fieldNames={{ label: 'title', value: 'id', children: 'child' }}
        placeholder='Please select'
      />
      <Button
        onClick={() => {
          setValue(undefined)
        }}>Clear
      </Button>
    </div>
  )
}
