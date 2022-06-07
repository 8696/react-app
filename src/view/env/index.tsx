import './index.less'
export default () => {
  const json = JSON.stringify(process.env, null, '  ')
  return (
    <div style={{ padding: 20 }}>
      <pre>{json}</pre>
    </div>
  )
}
