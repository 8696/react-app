import React from 'react'
import styled from 'styled-components'

const ComponentAsProp = styled.button`
  display: inline-block;
  color: #bf4f74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
  display: block;
`

const AsProp: React.FC = () => {
  return (
    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #eee' }}>
      <h3>As Prop (改变渲染标签)</h3>
      <ComponentAsProp>Normal Button</ComponentAsProp>
      <ComponentAsProp as='a' href='/'>Link masquerading as a button</ComponentAsProp>
    </div>
  )
}

export default AsProp
