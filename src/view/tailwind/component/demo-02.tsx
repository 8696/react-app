import style from './index.module.less'

const paddingSamples = [
  { sample: 'p-2', desc: '统一内边距 8px，小尺寸按钮或标签常用。' },
  { sample: 'px-4 py-2', desc: '水平 16px / 垂直 8px，适合表单控件。' },
  { sample: 'px-6 py-4', desc: '区块内容常用，保证呼吸空间。' },
  { sample: 'pt-10', desc: '单独控制上边距，例如卡片顶部留白。' }
]

const marginSamples = [
  { sample: 'mt-2', desc: '标题与正文之间常用间距。' },
  { sample: 'mb-6', desc: '模块之间拉开层次。' },
  { sample: 'mx-auto', desc: '块级元素居中且自适应宽度。' },
  { sample: 'space-y-4', desc: '列表项统一垂直间隔。' }
]

export default () => {
  return (
    <div className='space-y-6'>
      <section className={style.section}>
        <div className={style.title}>内边距（Padding）</div>
        <div className={style.utilityRow}>
          {paddingSamples.map(({ sample, desc }) => (
            <div key={sample} className={style.utilityCard}>
              <div className='font-medium text-slate-700'>{sample}</div>
              <div className={`mt-2 rounded border border-slate-300 bg-white ${sample}`}>
                <div className='text-xs text-slate-500'>内容区域</div>
              </div>
              <p className='mt-2 text-[11px] text-slate-500'>{desc}</p>
            </div>
          ))}
        </div>
        <p className={style.note}>Tailwind 采用短横线语法描述尺寸，p-4 表示所有方向 16px，px-6 仅水平设置。</p>
      </section>

      <section className={style.section}>
        <div className={style.title}>外边距（Margin）</div>
        <div className={style.utilityRow}>
          {marginSamples.map(({ sample, desc }) => (
            <div key={sample} className={style.utilityCard}>
              <div className='font-medium text-slate-700'>{sample}</div>
              <div className='mt-2 bg-white p-2'>
                <div className={`rounded border border-dashed border-indigo-300 bg-indigo-50 text-center text-xs text-indigo-600 ${sample}`}>
                  示例块
                </div>
              </div>
              <p className='mt-2 text-[11px] text-slate-500'>{desc}</p>
            </div>
          ))}
        </div>
        <p className={style.note}>使用 m-/mx-/my- 等前缀控制不同方向的外边距；space-x/y-* 适合批量处理列表间隔。</p>
      </section>

      <section className={style.section}>
        <div className={style.title}>间距组合</div>
        <div className='space-y-3'>
          <div className='rounded border border-slate-300 bg-slate-50 p-3 text-xs text-slate-600'>
            <span className='font-semibold text-slate-700'>容器</span>：`max-w-xl mx-auto px-6 py-8` → 指定最大宽度 + 居中 + 内边距。
          </div>
          <div className='rounded border border-slate-300 bg-slate-50 p-3 text-xs text-slate-600'>
            <span className='font-semibold text-slate-700'>列表</span>：`space-y-2` → 子元素保持等距，避免逐项添加 mb-*。
          </div>
          <div className='rounded border border-slate-300 bg-slate-50 p-3 text-xs text-slate-600'>
            <span className='font-semibold text-slate-700'>按钮组</span>：`inline-flex gap-3` → 横向按钮统一间距，由 gap 控制。
          </div>
        </div>
      </section>
    </div>
  )
}
