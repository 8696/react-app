import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  border-radius: 8px;
  margin-bottom: 20px;
`

const BasicStyle: React.FC = () => {
  return (
    <Wrapper>
      <Title>Hello World! (基础样式)</Title>
    </Wrapper>
  )
}

export default BasicStyle
