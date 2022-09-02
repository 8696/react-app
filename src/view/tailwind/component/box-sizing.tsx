import style from './index.module.less'
export default () => {
  return (
    <>
      <div className={style.title}>box-content</div>
      <div className='box-content w-[200px] h-[200px] border-[10px]'>
        box-content
      </div>
    </>
  )
}
