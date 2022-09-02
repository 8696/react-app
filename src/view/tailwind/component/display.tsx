import style from './index.module.less'
export default () => {
  return (
    <>
      <div className={style.title}>block</div>
      <span className='block border-[1px]'>
        ss
      </span>
      <div className={style.title}>flex</div>
      <div className='flex'>
        <div>A</div>
        <div>|</div>
        <div>b</div>
      </div>
    </>
  )
}
