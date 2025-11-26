import './index.less'
import style from './index.module.less'
import Demo01 from './component/demo-01'
import Demo02 from './component/demo-02'
import Demo03 from './component/demo-03'

export default () => {
  const demos = [
    {
      key: 'demo01',
      title: 'Demo 01 · 字体体系',
      description: '汇总 text-*、leading-*、tracking-* 等常用排版类，便于快速确定字级与行距。',
      component: Demo01
    },
    {
      key: 'demo02',
      title: 'Demo 02 · 边距与留白',
      description: '对比 p-*/m-*/space-* 的用法，帮助统一容器、列表的内外间距。',
      component: Demo02
    },
    {
      key: 'demo03',
      title: 'Demo 03 · 布局对齐',
      description: '演示 flex 对齐、gap 与 divide 的组合，解决常见排版场景。',
      component: Demo03
    }
  ]

  return (
    <div className='m-view'>
      <div className={`tailwind-title ${style.tailwindTitle}`}>Tailwind 实用示例</div>
      <p className={style.tailwindIntro}>
        Tailwind CSS 通过原子化类名让排版、留白更易维护。以下示例聚焦字体、边距、对齐三个常见维度，可按需拷贝。
      </p>

      <div className='space-y-12'>
        {demos.map(({ key, title, description, component: Component }) => (
          <section key={key}>
            <h2 className={style.sectionTitle}>{title}</h2>
            <p className={style.sectionDesc}>{description}</p>
            <Component />
          </section>
        ))}
      </div>
    </div>
  )
}
