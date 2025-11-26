import style from './index.module.less'

const flexExamples = [
  { label: 'flex justify-between', desc: '两端对齐常用于标题 + 操作区', className: 'flex justify-between' },
  { label: 'flex items-center gap-3', desc: '纵向居中 + 间距，适合图标文字组合', className: 'flex items-center gap-3' },
  { label: 'flex-col space-y-2', desc: '垂直方向等距排列，可用于设置列表', className: 'flex flex-col space-y-2' }
]

export default () => {
  return (
    <div className='space-y-6'>
      <section className={style.section}>
        <div className={style.title}>Flex 对齐与间距</div>
        <div className={style.utilityRow}>
          {flexExamples.map(({ label, desc, className }) => (
            <div key={label} className={style.utilityCard}>
              <div className='font-medium text-slate-700'>{label}</div>
              <div className={`mt-2 rounded border border-slate-300 bg-white p-2 text-xs text-slate-600 ${className}`}>
                <span className='rounded bg-slate-200 px-2 py-1'>A</span>
                <span className='rounded bg-slate-200 px-2 py-1'>B</span>
                <span className='rounded bg-slate-200 px-2 py-1'>C</span>
              </div>
              <p className='mt-2 text-[11px] text-slate-500'>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={style.section}>
        <div className={style.title}>Gap 与 Space</div>
        <div className='space-y-3 text-xs text-slate-600'>
          <div className='rounded border border-slate-300 bg-slate-50 p-3'>
            <div className='font-semibold text-slate-700'>gap-4</div>
            <p className='mt-1'>用于 Grid/Flex 内部元素，保持横竖一致的间隔。</p>
          </div>
          <div className='rounded border border-slate-300 bg-slate-50 p-3'>
            <div className='font-semibold text-slate-700'>space-x-3</div>
            <p className='mt-1'>适用于水平列表，无需手动给每个元素设置 mr-。</p>
          </div>
          <div className='rounded border border-slate-300 bg-slate-50 p-3'>
            <div className='font-semibold text-slate-700'>space-y-2</div>
            <p className='mt-1'>垂直列表常用，保持条目上下间隔一致。</p>
          </div>
        </div>
      </section>

      <section className={style.section}>
        <div className={style.title}>分割线（Divide）</div>
        <div className='rounded border border-slate-300 bg-white p-3 text-xs text-slate-600'>
          <div className='font-medium text-slate-700'>divide-y divide-slate-200</div>
          <div className='mt-2 divide-y divide-slate-200'>
            <p className='py-2'>操作 1：divide-y-* 会在兄弟元素之间插入分割线。</p>
            <p className='py-2'>操作 2：配合 divide-x-* 可以实现表格/工具栏的分隔。</p>
            <p className='py-2'>操作 3：与 space-y-* 一起使用，既分隔又保持留白。</p>
          </div>
        </div>
      </section>
    </div>
  )
}
