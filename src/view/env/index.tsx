import './index.less'
import envConfig from '@/env.config'
export default () => {
  const json = JSON.stringify(envConfig, null, '  ')
  return (
    <div style={{ padding: 20 }}>
      <pre>{json}</pre>
    </div>
  )
}
