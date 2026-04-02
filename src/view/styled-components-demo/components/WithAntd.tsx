import React from 'react'
import styled from 'styled-components'
import { Button, Input, DatePicker, Space } from 'antd'

// 1. 直接覆盖 Antd 组件的最外层样式
// 注意：有时为了覆盖 antd 默认样式的高优先级，可能需要使用 && 或者 !important
const StyledAntdButton = styled(Button)`
  && {
    background-color: #8c8c8c;
    border-color: #8c8c8c;
    color: white;
    border-radius: 20px;
    padding: 4px 24px;

    &:hover {
      background-color: #595959;
      border-color: #595959;
    }
  }
`

// 2. 通过 styled 重写 Antd 组件内部的深层元素样式
const CustomInput = styled(Input)`
  /* 控制 Input 最外层 */
  && {
    border-radius: 8px;
    border-width: 2px;

    /* 当 input 被 focus 时的伪类样式 */
    &:focus, &:hover, &-focused {
      border-color: #bf4f74;
      box-shadow: 0 0 0 2px rgba(191, 79, 116, 0.2);
    }
  }
`

// 3. 深入覆盖复杂组件的内部类名
const StyledDatePicker = styled(DatePicker)`
  /* 利用 styled-components 的嵌套特性重写 antd 内部类名 */
  && {
    background-color: #fff0f6;
    border-color: #ffadd2;
    border-radius: 8px;

    /* 修改输入框里文字的样式 */
    .ant-picker-input > input {
      color: #c41d7f;
      font-weight: bold;
    }

    /* 覆盖 placeholder 颜色 */
    .ant-picker-input > input::placeholder {
      color: #ffa39e;
    }

    /* 覆盖清除按钮图标的颜色 */
    .ant-picker-clear {
      background-color: transparent;
      color: #c41d7f;
    }
  }
`

const WithAntd: React.FC = () => {
  return (
    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #1677ff', borderRadius: '8px', backgroundColor: '#f0f5ff' }}>
      <h3 style={{ color: '#1677ff' }}>配合 Ant Design 组件使用</h3>

      <Space direction='vertical' size='large' style={{ width: '100%' }}>
        <div>
          <h4>1. 覆盖基本组件外层样式 (Button)</h4>
          <Space>
            <Button type='primary'>原版 Button</Button>
            <StyledAntdButton type='primary'>自定义 Antd Button</StyledAntdButton>
          </Space>
        </div>

        <div>
          <h4>2. 修改组件的不同状态及伪类 (Input)</h4>
          <Space direction='vertical' style={{ width: '300px' }}>
            <Input placeholder='原版 Input' />
            <CustomInput placeholder='定制了 focus & hover 的 Input' />
          </Space>
        </div>

        <div>
          <h4>3. 深入覆盖组件内部元素的子样式 (DatePicker)</h4>
          <Space direction='vertical'>
            <DatePicker placeholder='原版 DatePicker' />
            <StyledDatePicker placeholder='深层定制的 DatePicker' />
          </Space>
        </div>
      </Space>
    </div>
  )
}

export default WithAntd
