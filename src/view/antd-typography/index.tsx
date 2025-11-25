import styles from './index.module.less'

import { Typography, Divider } from 'antd'

const { Title, Text, Paragraph, Link } = Typography

const guildOath = '我们守着杉林的灯火，让每个故事都找到回家的路。'
const secretScroll = '传说中的万愿锦册从山谷蜿蜒至云端，记录了小镇居民写给月神的心愿。上面绘着山川脉络、银色星轨、儿童唱过的歌谣以及商贩的账单，密密麻麻铺满整夜。一旦完全展开，便会拖曳出一条月光瀑布，让阅读者沉浸在无穷无尽的回忆潮汐里。'
const ancientSong = '愿夜风温柔，愿灯光长久，愿每次道别都能在黎明重逢。'

export default () => {
  return (
    <div className={`m-view ${styles.typographyDemo}`}>
      <Typography>
        <Title level={2}>月影杉林的守护者</Title>
        <Paragraph type='secondary'>
          此篇童话由<Text underline>山城书司星槿</Text>抄录，展示 Ant Design Typography 在中文场景下的呈现能力。
        </Paragraph>

        <Title level={3}>序章 · 风起灯鸣</Title>
        <Paragraph>
          月影山林的深处住着一只名叫<Text strong>阿岚</Text>的银狐，他守护着一整片会发光的杉树。
          每当夜幕降临，他用尾巴轻轻敲打树干，让藏在树心的故事随着灯火醒来。
          当山风变得急躁，他会细心地用<Text mark>萤光苔</Text>包裹树芯，免得故事句子散乱。
        </Paragraph>
        <Paragraph>
          阿岚有位搭档，是一只叫<Text italic>洛羽</Text>的小画眉，它能将树叶的沙沙声译成卷轴。
          逢年庆典，整片杉林都会闪烁<Text type='success'>翡翠般的欣喜</Text>；
          若有陌生脚步靠近，树灯便亮起<Text type='warning'>琥珀警语</Text>；
          真遇见危险时，更会燃成<Text type='danger'>猩红的号角</Text>。
          而当故事疲倦打盹，洛羽便用<Text disabled>细雨般的低吟</Text>轻轻唤醒它们。
        </Paragraph>
        <Paragraph>
          两位守护者共同维护《杉林录》的目录，用<Text code>syncChapters()</Text>作为约定，确保每个章节都写得端正。
          洛羽不忘提醒阿岚：<Text keyboard>Option + 光标</Text>可以快速定位到换行处，此刻排版应整洁有序。
        </Paragraph>

        <Divider />

        <Title level={3}>第一章 · 灯火的学徒</Title>
        <Paragraph>
          有一年秋分，小镇的童子<Text strong>夏禾</Text>前来拜访，想学习守灯的秘术。
          阿岚递给他一片会发光的松针，示范如何调整故事的行距与字距；洛羽则在枝头叽喳，
          叫他记住<Text code>{'igniteLantern("mind")'}</Text>能唤醒灵感，别忘了<Text keyboard>Shift + 星光</Text>这一组合技。
        </Paragraph>
        <Paragraph>
          夏禾因此立下誓言：<Text copyable>{guildOath}</Text>
          誓词立刻化作金色的风缎缠绕在枝梢，提醒来往旅人，只要留心便能<Text underline>找到守灯的节奏</Text>。
          晚上，他在记事本中附上注释，指向<Text mark>杉林灯晷法</Text>，并邀请任何好奇者
          <Link href='https://ant.design/components/typography' target='_blank' rel='noreferrer'>查阅规范</Link>以学习排版。
        </Paragraph>
        <Paragraph>
          小镇的婆婆们见状纷纷到来，将新鲜的故事挂在枝头，整片杉林亮起第一次<Text type='success'>收获的绿光</Text>；
          阵雨降临时，灯火略显<Text type='warning'>迟疑的黄</Text>；但在阿岚的守护下，它们不再恐惧<Text type='danger'>突如其来的黑暗</Text>。
        </Paragraph>
        <Paragraph delete>早年的悲观纪录——“灯火终有熄灭的一日”——被阿岚亲手划去，从此不再提起。</Paragraph>

        <Divider />

        <Title level={3}>第二章 · 锦册与密咒</Title>
        <Paragraph className={styles.paragraphCard}>
          林中珍藏着一卷<Text strong>万愿锦册</Text>，它会自动拓展，记下孩子的心愿、旅人的思绪与商队的歌谣。
          阿岚与洛羽将其存入档案，为耐心的读者标注提示：请做好被故事吞没的准备。
        </Paragraph>
        <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: '展开全文', tooltip: secretScroll }}>
          {secretScroll}
        </Paragraph>
        <Paragraph>
          夜深时，阿岚会吟诵古老的祝词：<Text italic>“{ancientSong}”</Text>。
          他的声音让夜色变得清澈，连最顽皮的松鼠都安静下来聆听。
        </Paragraph>

        <Divider />

        <Title level={3}>第三章 · 月色的回响</Title>
        <Paragraph>
          随着故事的不断累积，即便是<Text disabled>沉睡的旧记忆</Text>也会在某个清晨被唤醒。
          小镇的孩子围着灯火跳舞，他们的笑声在书页之间<Text mark>折射出七彩的注脚</Text>。
        </Paragraph>
        <Paragraph>
          夏禾再次来到杉林，在《杉林录》的空白页上写下：<Text code>{'export const guardians = ["阿岚", "洛羽", "夏禾"];'}</Text>
          他举起手巾，敲击枝干，唤醒新的篇章。
        </Paragraph>
        <Paragraph>
          星槿翻阅完所有记录，把这段童话整理成可共享的展示页，提醒读者：Typography 不只是文字排布，
          更是让故事呼吸的节奏与舞步。若你也想编织这样的章节，记得返回<Text keyboard>⌘ + ←</Text>检查行首是否整齐。
        </Paragraph>
      </Typography>
    </div>
  )
}
