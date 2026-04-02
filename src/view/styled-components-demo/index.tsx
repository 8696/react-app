import React from 'react'

import WithAntd from './components/WithAntd'
import BasicStyle from './components/BasicStyle'
import DynamicProps from './components/DynamicProps'
import ExtendStyle from './components/ExtendStyle'
import AnyComponent from './components/AnyComponent'
import Animations from './components/Animations'
import AsProp from './components/AsProp'

const StyledComponentsDemo: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Styled Components 演示</h2>
      
      <WithAntd />
      <BasicStyle />
      <DynamicProps />
      <ExtendStyle />
      <AnyComponent />
      <Animations />
      <AsProp />

    </div>
  )
}

export default StyledComponentsDemo
