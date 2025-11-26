import styles from './index.module.less'
import DemoTitle from '@/component/DemoTitle'

export default () => {

  return (
    <>
      <div className='m-view'>
        <DemoTitle>Design Var</DemoTitle>
        <div>
          <div className={styles.colorPrimary}>
            使用 Design Token
          </div>
        </div>
      </div>
    </>
  )
}
