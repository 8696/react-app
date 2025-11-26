import styles from './index.module.less'

import { Timeline, Typography, Card, Space, Tag } from 'antd'
import {
  ClockCircleOutlined,
  CheckCircleTwoTone,
  RocketOutlined,
  SyncOutlined,
  SmileOutlined
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

const productRelease = [
  {
    children: (
      <Card size='small' title='内部原型评审'>
        <Paragraph type='secondary'>2025-02-18 · UI / 产品 / 技术联合评审</Paragraph>
        <Paragraph>收集关键用户反馈，确认 MVP 范围与迭代节奏。</Paragraph>
      </Card>
    ),
    color: 'blue'
  },
  {
    children: (
      <Card size='small' title='灰度上线'>
        <Paragraph type='secondary'>2025-03-12 · Beta 渠道开启</Paragraph>
        <Paragraph>向 5% 种子用户开放，观察留存数据，监控 SLA。</Paragraph>
      </Card>
    ),
    dot: <SyncOutlined spin />
  },
  {
    children: (
      <Card size='small' title='正式发布'>
        <Paragraph type='secondary'>2025-03-28 · 全量发布</Paragraph>
        <Paragraph>
          推送营销邮件，协同售前与客服完成知识库更新，A/B 测试方案开始采集。
        </Paragraph>
      </Card>
    ),
    dot: <CheckCircleTwoTone twoToneColor='#52c41a' />
  }
]

export default () => {
  return (
    <div className={`m-view ${styles.timelineDemo}`}>
      <Typography>
        <Title level={2}>Timeline 场景演示</Title>
        <Paragraph className={styles.intro}>
          结合实际项目节奏展示 Ant Design Timeline 的多种用法：发布计划、物流追踪与项目里程碑。
          通过 <Text code>dot</Text>、<Text code>mode</Text>、<Text code>pending</Text> 等属性可以灵活控制节点形态。
        </Paragraph>
      </Typography>

      <Space direction='vertical' size={32} className={styles.sectionGroup}>
        <section>
          <Title level={4} className={styles.sectionTitle}>产品发布节奏</Title>
          <Paragraph type='secondary' className={styles.sectionDesc}>
            使用 items 配置结构化节点，结合自定义 dot 表示状态。
          </Paragraph>
          <Timeline items={productRelease} />
        </section>

        <section>
          <Title level={4} className={styles.sectionTitle}>物流追踪</Title>
          <Paragraph type='secondary' className={styles.sectionDesc}>
            通过 <Text code>pending</Text> 描述在途状态，节点内容可以混排标签和说明。
          </Paragraph>
          <Timeline
            pending={
              <span>
                预计送达 · <Text strong>3 月 22 日 18:00</Text>
              </span>
            }
          >
            <Timeline.Item color='green'>
              <div className={styles.itemHeader}>
                <span className={styles.itemTime}>3 月 18 日 09:20</span>
                <Tag color='green'>签收完成</Tag>
              </div>
              <Paragraph className={styles.itemContent}>客户【林晓】确认收货，系统自动完成结算。</Paragraph>
            </Timeline.Item>
            <Timeline.Item color='green'>
              <div className={styles.itemHeader}>
                <span className={styles.itemTime}>3 月 17 日 14:05</span>
                <Tag color='processing'>派送中</Tag>
              </div>
              <Paragraph className={styles.itemContent}>上海浦东集散中心车辆出发，配送员：赵文。</Paragraph>
            </Timeline.Item>
            <Timeline.Item color='blue'>
              <div className={styles.itemHeader}>
                <span className={styles.itemTime}>3 月 16 日 22:40</span>
                <Tag icon={<RocketOutlined />} color='blue'>装车完成</Tag>
              </div>
              <Paragraph className={styles.itemContent}>订单打包完毕，完成冷链箱入库检查。</Paragraph>
            </Timeline.Item>
            <Timeline.Item color='gray'>
              <div className={styles.itemHeader}>
                <span className={styles.itemTime}>3 月 16 日 10:12</span>
                <Tag color='default'>揽件</Tag>
              </div>
              <Paragraph className={styles.itemContent}>快递员已上门取件，等待仓库扫描入库。</Paragraph>
            </Timeline.Item>
          </Timeline>
        </section>

        <section>
          <Title level={4} className={styles.sectionTitle}>项目里程碑</Title>
          <Paragraph type='secondary' className={styles.sectionDesc}>
            使用 <Text code>mode=&quot;alternate&quot;</Text> 呈现双侧布局，适合季度计划或大型活动拆分。
          </Paragraph>
          <Timeline
            mode='alternate'
            items={[
              {
                label: 'Q1',
                dot: <ClockCircleOutlined />,
                children: (
                  <Card size='small' bordered={false} className={styles.altCard}>
                    <Title level={5}>研究阶段</Title>
                    <Paragraph>完成用户访谈 18 场，沉淀 3 套核心旅程地图。</Paragraph>
                  </Card>
                )
              },
              {
                label: 'Q2',
                color: 'green',
                children: (
                  <Card size='small' bordered={false} className={styles.altCard}>
                    <Title level={5}>试点落地</Title>
                    <Paragraph>上线内部审批模块，交付 2 个业务中台试点。</Paragraph>
                  </Card>
                )
              },
              {
                label: 'Q3',
                color: 'blue',
                dot: <SmileOutlined style={{ fontSize: 16, color: '#1677ff' }} />,
                children: (
                  <Card size='small' bordered={false} className={styles.altCard}>
                    <Title level={5}>体验升级</Title>
                    <Paragraph>引入埋点体系，完成 4 次体验回访并发布 1.5 版本。</Paragraph>
                  </Card>
                )
              },
              {
                label: 'Q4',
                color: 'red',
                children: (
                  <Card size='small' bordered={false} className={styles.altCard}>
                    <Title level={5}>复盘收官</Title>
                    <Paragraph>整理年度复盘文档，规划下一年度预算与资源配置。</Paragraph>
                  </Card>
                )
              }
            ]}
          />
        </section>
      </Space>
    </div>
  )
}
