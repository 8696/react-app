import React from 'react'
import styled from 'styled-components'
import { Button } from './DynamicProps'

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
  background: white;

  &:hover {
    background: tomato;
    color: white;
  }
`

const ExtendStyle: React.FC = () => {
  return (
    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #eee' }}>
      <h3>样式继承</h3>
      <Button>Normal Button</Button>
      <TomatoButton>Tomato Button</TomatoButton>
    </div>
  )
}

export default ExtendStyle
