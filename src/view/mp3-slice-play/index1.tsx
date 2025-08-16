/*
帮我使用前端实现一个demo需求
背景如下：
1、我有n个未知个mp3音频http地址，我需要把他们合并起来当作一个音频进行播放，采用audio的形式。简单来讲就是让他们看起来像是一个整体。
2、每个音频我都有一个序列号index，他们是有序的从1开始。但是会出现中间丢失的情况
3、不定时的会新增新的音频，比如现在有第1、2、3、4段。可能过段一段时间会来第5段，也有可能现在有1、2、4、5段，过段时间第3段才来。需要按顺序在播放器中播放。
要求如下：
1、需要把所有音频的时长统计出来，并显示在播放器上。
2、需要实现拖动进度条，可以拖动到任意位置播放。
3、需要实现无缝续播，即播放器从头开始播放，不会出现卡顿。
4、需要实现当前正在播放的实时时长数
5、需要实现如果有新的音频加入，可以自动播放。
6、需要实现如果我只有1、2、4、5段，然后第三段来了，自动按照排序把它插入到正确的位置。并且正确更新播放进度条的百分比，总时长，和实时播放时长。
7、使用react+typescript+antd5实现，追加音频（包括追加后段和中间断）都给我自己实现，写个按钮和表单给我
8、需要实现完整的播放、暂停、停止、拖动滚动条功能
9、你存储整个mp3列表，typescript类型定义是这样的Array<{ index: number, url: string, duration: number }>、index代表第几段，url代表音频地址，duration代表该音频的时长。
10、需要实现一个方法，给出一个mp3地址，返回对应的时长
11、关于我的mp3列表序列号不连续问题：如果现在我已经追加了第1、2、4、5段。此时我追加明确指示是第3段，应该把它插入到第3的位置，同时更新播放进度条的百分比，总时长，和实时播放时长如果我追加的音频是第6段，应该把它插入到第5的位置，同时更新播放进度条的百分比，总时长，和实时播放时长。
12、你需要实现的功能有：正常最后追加音频（我提供http地址，你需要提供输入框和按钮），指定某一段音频（我提供http地址，你需要提供输入框和按钮和当前音频序列号），列出所有音频列表，播放，暂停，总时长，当前播放时长，当前正在播放的是哪一段
13、audio使用示例话的方式即：new Audio，进度条使用antd的Slider


* */
/*
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/1.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/2.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/3.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/4.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/5.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/6.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/7.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/8.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/9.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/10.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/11.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/12.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/13.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/14.mp3
* https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/15.mp3
* */


import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Card, Divider, Form, Input, InputNumber, List, Space, Slider, Tag, Typography, message } from 'antd'
import type { SliderSingleProps } from 'antd'
import useGetState from '@/hooks/useGetState';

/**
 * 音频分段的类型定义：
 * - index: 第几段（从 1 开始且可不连续）
 * - url: 该段的 mp3 地址
 * - duration: 该段的时长（秒）
 * - offset: 该段在虚拟音轨中的起始偏移量（秒）
 */
export type Segment = { index: number; url: string; duration: number; offset: number };

/** 将秒格式化为 00:00:00 / 00:00 */
function fmt(t: number): string {
  if (!isFinite(t) || t < 0) t = 0
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const s = Math.floor(t % 60)
  const mm = (m < 10 && h > 0 ? `0${m}` : `${m}`)
  const ss = s < 10 ? `0${s}` : `${s}`
  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`
}

/**
 * 获取 mp3 的时长（秒）
 * 原理：创建一个离屏的 <audio>，只加载 metadata，等到 loadedmetadata 后读取 duration。
 * 失败会 reject。
 */
export function getMp3Duration(url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const a = new Audio()

    const onLoaded = () => {
      cleanup()
      const d = Number(a.duration)
      if (Number.isFinite(d)) resolve(d)
      else reject(new Error('无法获取音频时长'))
    }
    const onErr = () => {
      cleanup()
      reject(new Error('加载音频失败'))
    }
    const cleanup = () => {
      a.removeEventListener('loadedmetadata', onLoaded)
      a.removeEventListener('error', onErr)
    }

    a.preload = 'metadata'   // 只拉取元信息，速度快、流量小
    a.src = url
    a.addEventListener('loadedmetadata', onLoaded)
    a.addEventListener('error', onErr)
  })
}

const { Title, Text } = Typography

export default function SegmentedMp3Player() {
  /** 分段列表（按 index 排序后用于播放的完整“虚拟音轨”） */
  const [segments, setSegments, getSegments] = useGetState<Segment[]>([])

  /** 真正用于播放的 audio 元素 */
  const audioRef = useRef<HTMLAudioElement | null>(null)
  /**
   * 预加载“下一段”的 audio 元素，仅用于提前建缓存，加速段间切换，避免卡顿
   * 注意：并不会用它来播放，播放始终由 audioRef.current 进行
   */
  const preloadedNextRef = useRef<HTMLAudioElement | null>(null)

  /** 播放状态（基于 audio 的 play/pause 事件同步） */
  const [isPlaying, setIsPlaying] = useState(false)
  /** 当前正在播放的“分段在数组中的下标”（不是 index 字段） */
  const [currentSegIdx, setCurrentSegIdx, getCurrentSegIdx] = useGetState<number>(-1)
  /** 当前分段内的播放进度（秒）——绑定 audio.currentTime */
  const [segLocalTime, setSegLocalTime] = useState<number>(0)
  /** 标识用户正在拖动滑块，暂停“自动跟随播放进度”以免抖动 */
  const [userSeeking, setUserSeeking] = useState(false)
  /** 用户拖动中的临时值（松手后再真正跳播） */
  const [tempSliderValue, setTempSliderValue] = useState<number | null>(null)

  /**
   * 计算并更新 segments 中每个音频段的 offset 值
   * 这个函数会在 segments 变化时被调用，确保每个段都有正确的 offset
   */
  const calculateOffsets = (segments: Segment[]): Segment[] => {
    console.log('开始计算 offsets，输入 segments:', segments)
    let acc = 0
    const result = segments.map(segment => {
      const result = { ...segment, offset: acc }
      console.log(`段 ${segment.index}: duration=${segment.duration}, 设置 offset=${acc}`)
      acc += segment.duration || 0
      return result
    })
    console.log('计算完成，结果:', result)
    return result
  }

  /** 整个虚拟音轨的总时长（秒） */
  const totalDuration = useMemo(
    () => segments.reduce((sum, s) => sum + (s.duration || 0), 0),
    [segments]
  )

  /** 取出当前段（用于 UI 展示） */
  const currentSeg = useMemo(() => {
    return currentSegIdx >= 0 ? segments[currentSegIdx] : null
  }, [currentSegIdx, segments])


  /**
   * 当前"虚拟时间"（全局进度条上的时间）
   * = 当前段起点偏移 + 段内当前播放时间
   */
  const currentVirtualTime = useMemo(() => {
    if (currentSegIdx < 0 || currentSegIdx >= segments.length) return 0
    return (segments[currentSegIdx]?.offset || 0) + (segLocalTime || 0)
  }, [currentSegIdx, segLocalTime, segments])

  /**
   * 根据"虚拟时间 t（秒）"找到应该落在哪一段，以及段内的 local time。
   * 使用简单的线性查找，适合音频段数量不多的情况。
   */
  function findSegByVirtualTime(t: number): { i: number; local: number } {
    if (segments.length === 0) return { i: -1, local: 0 }
    if (t <= 0) return { i: 0, local: 0 }
    if (t >= totalDuration) {
      const last = segments.length - 1
      return { i: last, local: Math.max(0, totalDuration - segments[last].offset) }
    }

    // 简单的线性查找：遍历所有段，找到包含时间 t 的段
    for (let i = 0; i < segments.length; i++) {
      const start = segments[i].offset
      const end = start + (segments[i].duration || 0)

      if (t >= start && t < end) {
        return { i, local: t - start }
      }
    }

    // 兜底处理：如果没找到，返回最后一段
    const last = segments.length - 1
    return { i: last, local: Math.max(0, t - segments[last].offset) }
  }

  /**
   * 组件挂载时：
   * 1) 创建用于播放和预加载的两个 <audio> 实例
   * 2) 绑定事件
   * 3) 预先追加 3 段音频（1/2/3.mp3），并计算各自时长后放入 segments
   * 4) 卸载时清理音频
   */
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.preload = 'auto'
      attachAudioEvents(audioRef.current)
    }
    if (!preloadedNextRef.current) {
      preloadedNextRef.current = new Audio()
      preloadedNextRef.current.preload = 'auto'
    }

    // 预置的 3 段音频
    const presetUrls = [
      'https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/1.mp3',
      'https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/2.mp3',
      'https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/3.mp3'
    ]
    // 并发拉取 3 段的时长，拿到后按 index 排序塞到列表
    Promise.all(
      presetUrls.map((url, idx) => getMp3Duration(url).then(duration => ({ index: idx + 1, url, duration, offset: 0 }))
      )
    )
      .then((presetSegs) => {
        const segmentsWithOffsets = calculateOffsets(presetSegs)
        console.log('预置音频加载完成，计算后的 segments:', segmentsWithOffsets)
        setSegments(segmentsWithOffsets)
      })
      .catch((e) => {
        console.error('预加载音频失败', e)
      })

    return () => {
      // 卸载时：停止并释放音频资源
      audioRef.current?.pause()
      audioRef.current?.removeAttribute('src')
      preloadedNextRef.current?.pause()
      preloadedNextRef.current?.removeAttribute('src')
    }
  }, [])

  /** 绑定播放实例的全套事件（只绑定一次即可） */
  function attachAudioEvents(a: HTMLAudioElement) {
    a.addEventListener('timeupdate', onTimeUpdate) // 实时进度
    a.addEventListener('ended', onEnded)           // 一段结束 -> 续播下一段
    a.addEventListener('play', () => setIsPlaying(true))
    a.addEventListener('pause', () => setIsPlaying(false))
  }

  /**
   * 播放进度回调：
   * - 持续同步段内时间 segLocalTime
   * - 在临近段尾时，启动“下一段”的预加载（减少段间空隙）
   */
  function onTimeUpdate() {
    const a = audioRef.current
    if (!a) return

    // 记录当前段内时间（驱动 UI）
    setSegLocalTime(a.currentTime || 0)

    // 段尾预加载下一段：当离段尾小于 ~0.3 秒时触发
    const i = currentSegIdx
    if (i >= 0 && i < segments.length - 1) {
      const curDur = segments[i].duration || 0
      if (curDur > 0 && a.currentTime >= curDur - 0.3) {
        const next = preloadedNextRef.current!
        const nextUrl = segments[i + 1].url
        if (next.src !== nextUrl) {
          next.src = nextUrl
          try {
            next.load() // 建立缓存
          } catch {}
        }
      }
    }
  }

  /**
   * 段播放结束：如果有下一段则自动续播，否则标记为停止
   */
  function onEnded() {
    const i = getCurrentSegIdx()
    console.log(getCurrentSegIdx())
    console.log(getSegments())
    if (i >= 0 && i < getSegments().length - 1) {
      console.log('自动续播下一段')
      playSegmentAt(i + 1, 0, true)
    } else {
      setIsPlaying(false)
    }
  }

  /**
   * 在“第 segArrayIdx 段”的“localTimeSec 秒”处开始播放
   * - 会同步更新 currentSegIdx / segLocalTime
   * - 会尝试预加载下一段
   * - autoplay=true 时立即播放；如果想只定位不播放，可以传 false
   *
   * 说明：这里直接设置 src -> load -> currentTime -> play()
   * 若发现某些平台（极端移动端）需要等到 canplay 才能 play，
   * 可把 play 放到 a.oncanplay 内；当前逻辑在主流桌面/移动浏览器上已可平滑续播。
   */
  function playSegmentAt(segArrayIdx: number, localTimeSec: number, autoplay = true) {
    const segments = getSegments()
    if (segArrayIdx < 0 || segArrayIdx >= segments.length) return

    const seg = segments[segArrayIdx]
    const a = audioRef.current!

    // 切换到目标段
    a.src = seg.url
    try {
      a.load() // 触发重新缓冲
    } catch {}

    // 段内定位：限制在 [0, duration]
    a.currentTime = Math.max(0, Math.min(localTimeSec, seg.duration || 0))

    // 同步 UI 状态
    setCurrentSegIdx(segArrayIdx)
    setSegLocalTime(a.currentTime)

    // 自动播放
    a.oncanplay = () => {
      if (autoplay) void a.play().catch(() => {})
    }

    // 预加载下一段，减少段间空隙
    if (segArrayIdx < segments.length - 1) {
      const next = preloadedNextRef.current!
      const nextUrl = segments[segArrayIdx + 1].url
      if (next.src !== nextUrl) {
        next.src = nextUrl
        try {
          next.load()
        } catch {}
      }
    }
  }

  /** 播放：若从未播放过则从第 0 段起播，否则继续当前段 */
  const onPlay = () => {
    if (segments.length === 0) return message.info('请先追加音频段')
    if (currentSegIdx === -1) {
      playSegmentAt(0, 0, true)
    } else {
      const a = audioRef.current!
      void a.play().catch(() => {})
    }
  }

  /** 暂停（保留当前位置） */
  const onPause = () => audioRef.current?.pause()

  /** 停止（清空 src，回到初始状态） */
  const onStop = () => {
    const a = audioRef.current
    if (!a) return
    a.pause()
    setIsPlaying(false)
    setCurrentSegIdx(-1)
    setSegLocalTime(0)
    a.removeAttribute('src') // 移除资源，重置到未加载状态
  }

  /** 滑块最大值 = 总时长（向上取整） */
  const sliderMax = Math.max(0, Math.ceil(totalDuration))
  /**
   * 滑块显示值：
   * - 拖动中优先显示 temp 值（避免 timeupdate 抢占）
   * - 否则跟随 currentVirtualTime
   */
  const sliderValue = userSeeking ? (tempSliderValue ?? currentVirtualTime) : currentVirtualTime

  /** 滑动/点击时：仅更新临时值，不立即跳播 */
  const onSliderChange: SliderSingleProps['onChange'] = (val) => {
    setUserSeeking(true)
    const v = Array.isArray(val) ? val[0] : val
    setTempSliderValue(v)
  }

  /**
   * 松手后：根据“虚拟时间”定位到正确的分段和段内时间，并执行跳播
   */
  const onSliderAfterChange: SliderSingleProps['onChangeComplete'] = (val) => {
    const t = Array.isArray(val) ? val[0] : (val as number)
    const { i, local } = findSegByVirtualTime(t)
    if (i !== -1) {
      playSegmentAt(i, local, true)
    }
    setUserSeeking(false)
    setTempSliderValue(null)
  }

  // 表单实例：尾部追加、按 index 插入/更新
  const [formAppend] = Form.useForm()
  const [formInsert] = Form.useForm()

  /**
   * 尾部追加：自动按照"当前最大 index + 1"作为新段 index
   * 1) 先测时长
   * 2) 放入 segments 并排序
   * 3) 弹出提示
   */
  async function handleAppend(values: { url: string }) {
    const nextIndex = segments.length > 0 ? Math.max(...segments.map(s => s.index)) + 1 : 1
    try {
      const duration = await getMp3Duration(values.url)
      const added: Segment = { index: nextIndex, url: values.url, duration, offset: 0 }
      const newSegments = calculateOffsets(sortSegments([...segments, added]))
      console.log('尾部追加音频后，计算后的 segments:', newSegments)
      setSegments(newSegments)
      message.success(`已追加第${nextIndex}段，时长 ${fmt(duration)}`)
    } catch (e: any) {
      message.error(e?.message || '获取音频时长失败')
    }
    formAppend.resetFields()
  }

  /**
   * 按序号插入/更新：
   * - 如果 index 已存在则覆盖，不存在则作为新段插入
   * - 插入后会自动排序，保证播放顺序正确
   * - 这能满足"中间缺段后来补"的需求
   */
  async function handleInsert(values: { url: string; index: number }) {
    const { url, index } = values
    if (!index || index < 1) return message.error('序列号 index 必须从 1 开始')
    try {
      const duration = await getMp3Duration(url)
      const newSegments = calculateOffsets(sortSegments([...segments.filter(s => s.index !== index), { index, url, duration, offset: 0 }]))
      console.log('按序号插入音频后，计算后的 segments:', newSegments)
      setSegments(newSegments)
      // 如果正在播放的段大于即将插入的，则需要更新当前正在播放的游标
      if((currentSeg?.index || -1) > index) {
        setCurrentSegIdx(prev => prev + 1)
      }
      message.success(`已插入/更新第${index}段，时长 ${fmt(duration)}`)
    } catch (e: any) {
      message.error(e?.message || '获取音频时长失败')
    }
    formInsert.resetFields()
  }

  /** 统一的排序：按 index 升序 */
  function sortSegments(arr: Segment[]): Segment[] {
    return [...arr].sort((a, b) => a.index - b.index)
  }

  useEffect(() => {
    console.log(JSON.stringify(segments, null, 2))
  }, [segments])

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      <Title level={3}>分段 MP3 播放器 Demo</Title>

      {/* 播放控制区：播放/暂停/停止 + 状态 */}
      <Card className='mt-4' title='播放控制'>
        <Space wrap>
          <Button type='primary' onClick={onPlay}>播放</Button>
          <Button onClick={onPause}>暂停</Button>
          <Button danger onClick={onStop}>停止</Button>
          <Tag color={isPlaying ? 'green' : 'default'}>{isPlaying ? '播放中' : '已暂停/停止'}</Tag>
        </Space>

        <Divider />

        {/* 进度与时间显示 */}
        <div>
          <div className='flex items-center justify-between'>
            <Text>当前：{fmt(currentVirtualTime)}</Text>
            <Text>总时长：{fmt(totalDuration)}</Text>
          </div>

          {/* 进度条（Antd Slider）：
              - value 绑定虚拟时间
              - step=0.01 使拖动更平滑
              - tooltip 显示格式化时间
              - onChange 仅更新临时值
          */}
          <Slider
            min={0}
            max={sliderMax}
            step={0.01}
            tooltip={{ formatter: (v) => fmt(Number(v)) }}
            value={sliderValue}
            onChange={onSliderChange}
            onChangeComplete={onSliderAfterChange}
          />

          {/* 当前段信息 */}
          <div className='flex items-center'>
            <Text>
              正在播放（业务段）：
              {currentSeg
                ? (
                  <>第 <b>{currentSeg.index}</b> 段（段内 {fmt(segLocalTime)} / {fmt(currentSeg.duration)}）</>
                )
                : (<>无</>)}
            </Text>
          </div>
          <div className='flex items-center'>
            <Text>实际音频段数：{segments.length}</Text>
          </div>
          <div className='flex items-center'>
            <Text>正在播放音频游标：{currentSegIdx + 1}</Text>
          </div>
        </div>
      </Card>

      {/* 追加/插入操作区 */}
      <div className='grid md:grid-cols-2 gap-4 mt-4'>
        {/* 尾部追加（自动分配 index） */}
        <Card title='尾部追加音频'>
          <Form layout='vertical' form={formAppend} onFinish={handleAppend}>
            <Form.Item name='url' label='音频 URL' rules={[{ required: true, message: '请输入 mp3 地址' }]}>
              <Input placeholder='https://example.com/seg.mp3' allowClear />
            </Form.Item>
            <Space>
              <Button type='primary' htmlType='submit'>追加</Button>
              <Button onClick={() => formAppend.resetFields()}>重置</Button>
            </Space>
          </Form>
        </Card>

        {/* 指定 index 插入/更新（用于补中间缺段或替换某一段） */}
        <Card title='按序号插入/更新音频'>
          <Form layout='vertical' form={formInsert} onFinish={handleInsert}>
            <Form.Item name='index' label='段序号' rules={[{ required: true, message: '请输入序号' }]}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name='url' label='音频 URL' rules={[{ required: true, message: '请输入 mp3 地址' }]}>
              <Input placeholder='https://example.com/seg3.mp3' allowClear />
            </Form.Item>
            <Space>
              <Button type='primary' htmlType='submit'>插入/更新</Button>
              <Button onClick={() => formInsert.resetFields()}>重置</Button>
            </Space>
          </Form>
        </Card>
      </div>

      {/* 分段列表：可快速点播到任意段起点 */}
      <Card className='mt-4' title='音频段列表'>
        {segments.length === 0
          ? (
            <Text type='secondary'>暂无音频</Text>
          )
          : (
            <List
              size='small'
              bordered
              dataSource={segments}
              renderItem={(item, i) => (
                <List.Item actions={[<Button size='small' onClick={() => playSegmentAt(i, 0, true)} key='play'>播放</Button>]}>
                  <Space>
                    <Tag color={i === currentSegIdx ? 'processing' : 'default'}>#{item.index}</Tag>
                    <Text copyable={{ text: item.url }}>URL</Text>
                    <Tag>{fmt(item.duration)}</Tag>
                    <Text type='secondary'>起点 {fmt(item.offset)}</Text>
                  </Space>
                </List.Item>
              )}
            />
          )}
      </Card>
    </div>
  )
}
