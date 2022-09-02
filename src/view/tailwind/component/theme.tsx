import style from './index.module.less'
export default () => {
  return (
    <>
      <div className={style.title}>bg-blue-400</div>
      <div className='bg-blue-400'>
        bg-blue-400
      </div>
      <div className={style.title}>text-orange-700</div>
      <div className='text-orange-700'>
        text-orange-700
      </div>
    </>
  )
}
