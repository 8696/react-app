import React from 'react'
import styled from 'styled-components'

const Link = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <a className={className}>
    {children}
  </a>
)

const StyledLink = styled(Link)`
  color: #bf4f74;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const AnyComponent: React.FC = () => {
  return (
    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #eee' }}>
      <h3>给已有组件添加样式</h3>
      <Link>Unstyled, boring Link</Link>
      <br />
      <StyledLink>Styled, exciting Link</StyledLink>
    </div>
  )
}

export default AnyComponent
