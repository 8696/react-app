import styles from './index.module.less'

export default () => {

  return (
    <>
      <div className='m-view'>
        <h3 className='m-title'>Design Var</h3>
        <div>
          <div className={styles.colorPrimary}>
            使用 Design Token
          </div>
        </div>
      </div>
    </>
  )
}
