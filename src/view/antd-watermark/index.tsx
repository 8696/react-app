import styles from './index.module.less'

import { Watermark, Typography, Card, Space, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography

const logoSvg = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40"><rect width="120" height="40" rx="8" ry="8" fill="%23ebf4ff"/><text x="60" y="22" font-size="14" font-family="Arial" text-anchor="middle" fill="%230071ff">水印示例</text></svg>'

export default () => {
  return (
    <div className={`m-view ${styles.watermarkDemo}`}>
      <Typography>
        <Title level={2}>Ant Design Watermark 演示</Title>
        <Paragraph type='secondary'>
          通过<Text strong>Watermark</Text> 组件可以快速为内容添加防拷贝提示或品牌标识。这里展示了文本、多行以及图像水印的常见配置。
        </Paragraph>
      </Typography>

      <Space direction='vertical' size='large' className={styles.watermarkSection}>
        <section>
          <Title level={3}>基础文本水印</Title>
          <Paragraph className={styles.sectionDesc}>
            默认情况下只需传入<Text code>content</Text> 即可。水印会铺满容器区域，适合文章、报告等长内容。
          </Paragraph>
          <Watermark content='月影工作室' font={{ fontSize: 18 }}>
            <Card bordered={false} className={styles.demoBlock}>
              <Title level={4}>杉林旅记</Title>
              <Paragraph>
                风吹杉林如潮，旅人们在夜色中围坐听故事。银狐阿岚点亮灯火，孩子们则把剪纸贴在窗前。
                水印沿着纸页延展，提醒大家这份故事属于<Text strong>月影小镇</Text>。
              </Paragraph>
              <Paragraph>
                无论是导出的 PDF 还是截图分享，轻量水印都能让创作者的署名保留。
                当你需要更醒目的提示时，可调整<Text code>gap</Text> 与<Text code>zIndex</Text>。
              </Paragraph>
            </Card>
          </Watermark>
        </section>

        <Divider />

        <section>
          <Title level={3}>多行水印与间距</Title>
          <Paragraph className={styles.sectionDesc}>
            通过传入数组，水印可以换行展示；配合<Text code>gap</Text>、<Text code>offset</Text>、<Text code>rotate</Text> 可以控制密度和角度。
          </Paragraph>
          <Watermark
            content={['Ant Design', '水印演示']}
            gap={[120, 100]}
            offset={[30, 20]}
            rotate={-25}
            font={{
              fontSize: 16,
              color: 'rgba(0, 0, 0, 0.15)',
              fontWeight: 500
            }}
          >
            <Card bordered={false} className={styles.demoBlock}>
              <Title level={4}>守灯的约定</Title>
              <Paragraph>
                夏禾在《杉林录》上写下誓言：<Text underline>守护灯火，莫让故事褪色</Text>。
                多行水印交错排列，即使缩放也能保持可读性，适合章程、协议等必须强调归属的内容。
              </Paragraph>
              <Paragraph>
                你可以尝试改变<Text code>rotate</Text> 角度，打造对角线或者横向排布；<Text code>offset</Text> 则用于调整首个水印的起始位置，
                与页面标题或 Logo 对齐不会显得突兀。
              </Paragraph>
            </Card>
          </Watermark>
        </section>

        <Divider />

        <section>
          <Title level={3}>图像水印</Title>
          <Paragraph className={styles.sectionDesc}>
            支持传入<Text code>image</Text>，可使用 SVG 或 Base64 图片文件。搭配<Text code>width</Text> 与<Text code>height</Text> 控制图像尺寸。
          </Paragraph>
          <Watermark
            image={logoSvg}
            width={120}
            height={40}
            gap={[150, 140]}
            offset={[50, 40]}
          >
            <Card bordered={false} className={`${styles.demoBlock} ${styles.imageDemo}`}>
              <Title level={4}>旅行手札封面</Title>
              <Paragraph>
                手札封面采用了淡蓝色的图像水印，与首页插画保持一致。
                使用 SVG 作为水印可以获得清晰的矢量效果，即便打印放大也不会失真。
              </Paragraph>
              <Paragraph>
                若需在深色背景上水印，可配合<Text code>rotate</Text> 和<Text code>gutter</Text> 参数，
                或者设置<Text code>style</Text> 调整容器背景色，以提升可读性。
              </Paragraph>
            </Card>
          </Watermark>
        </section>
      </Space>
    </div>
  )
}
