import style from './index.module.less'

const fontScale = [
  { sample: 'text-4xl', className: 'text-4xl font-bold', usage: '页面主标题' },
  { sample: 'text-2xl', className: 'text-2xl font-semibold', usage: '模块标题' },
  { sample: 'text-base', className: 'text-base', usage: '正文默认字号' },
  { sample: 'text-sm', className: 'text-sm text-slate-500', usage: '辅助说明' },
  { sample: 'text-xs tracking-wide', className: 'text-xs uppercase tracking-wide text-slate-500', usage: '分组标签/注释' }
]

const leadingScale = [
  { sample: 'leading-none', className: 'leading-none', desc: '紧凑，常用于大字号标题' },
  { sample: 'leading-snug', className: 'leading-snug', desc: '常规标题排版' },
  { sample: 'leading-relaxed', className: 'leading-relaxed', desc: '正文段落，阅读舒适' },
  { sample: 'leading-loose', className: 'leading-loose', desc: '用于注解、引导等松散语句' }
]

export default () => {
  return (
    <div className='space-y-6'>
      <section className={style.section}>
        <div className={style.title}>字体大小（Font Size）</div>
        <div className={style.utilityRow}>
          {fontScale.map(({ sample, className, usage }) => (
            <div key={sample} className={style.utilityCard}>
              <div className='font-medium text-slate-700'>{sample}</div>
              <div className={`mt-1 ${className}`}>Tailwind 字体示例</div>
              <p className='mt-2 text-[11px] text-slate-500'>场景：{usage}</p>
            </div>
          ))}
        </div>
        <p className={style.note}>Tailwind 使用 text-{'{size}'} 定义字号，可配合 font-medium/font-bold 控制粗细。</p>
      </section>

      <section className={style.section}>
        <div className={style.title}>行高（Line Height）</div>
        <div className={style.utilityRow}>
          {leadingScale.map(({ sample, className, desc }) => (
            <div key={sample} className={style.utilityCard}>
              <div className='font-medium text-slate-700'>{sample}</div>
              <p className={`mt-1 text-sm text-slate-600 ${className}`}>
                月影杉林的故事在夜风里层层展开，行距决定了阅读时的呼吸节奏。
              </p>
              <p className='mt-2 text-[11px] text-slate-500'>说明：{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={style.section}>
        <div className={style.title}>字距（Letter Spacing）</div>
        <div className={style.utilityRow}>
          {['tracking-tight', 'tracking-normal', 'tracking-wide', 'tracking-widest'].map((sample) => (
            <div key={sample} className={style.utilityCard}>
              <div className='font-medium text-slate-700'>{sample}</div>
              <div className={`mt-1 text-sm uppercase text-slate-600 ${sample}`}>
                Tailwind Letter Spacing
              </div>
              <p className='mt-2 text-[11px] text-slate-500'>适用于导航、标签、引导文字等场景。</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
