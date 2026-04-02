import React from 'react'
import styled from 'styled-components'

export const Button = styled.button<{ $primary?: boolean }>`
  /* 基础背景色，根据 $primary prop 变化 */
  background: ${props => props.$primary ? '#bf4f74' : 'white'};
  color: ${props => props.$primary ? 'white' : '#bf4f74'};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
  cursor: pointer;

  /* 伪类和嵌套 */
  &:hover {
    opacity: 0.8;
  }
`

const DynamicProps: React.FC = () => {
  return (
    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #eee' }}>
      <h3>根据 Props 动态改变样式</h3>
      <Button>Normal Button</Button>
      <Button $primary>Primary Button</Button>
    </div>
  )
}

export default DynamicProps
