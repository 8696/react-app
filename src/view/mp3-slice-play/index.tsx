/*

  目的：实现一个“分段 MP3 播放器”的前端 Demo（React + TypeScript + Antd5），满足以下核心需求：

  核心场景说明（对应你最顶部列出的需求）：
  - 我有若干段独立的 mp3（每段有序号 index，从 1 开始，但序号可能不连续）。
  - 希望把这些段按序拼接成一个“虚拟整段音轨”来播放，用户看到并操作的是一个整体进度条（可以拖动、暂停、停止、播放）。
  - 支持动态追加：尾部追加或在中间插入/覆盖某一段（用来补齐丢失的段）。
  - 要做到无缝续播、显示总时长、实时显示当前播放时长、自动在新段到达时按顺序插入并正确更新进度/时长/当前播放段。

  本文件中的注释尽量做到：
  - 解释为什么这么写（设计意图、边界情况）
  - 解释关键变量的语义和相互关系
  - 提示容易出错的地方（例如 currentTime 的可用性、移动端 play 的限制）

  类型说明（在代码中也有明确的 TypeScript 定义）：
  - Segment: { index: number; url: string; duration: number; offset: number }
      index: 业务层面的段号（1 起），可能不连续
      url: mp3 地址
      duration: 段时长（秒）——通过 getMp3Duration 动态获取
      offset: 该段在“虚拟整段音轨”中的起始时间（秒）——由 calculateOffsets 计算

  注意：此文件保留了原实现的主要逻辑，仅对所有注释进行了逐行替换/补充，帮助阅读与维护。
*/

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Card, Divider, Form, Input, InputNumber, List, Space, Slider, Tag, Typography, message } from 'antd'
import type { SliderSingleProps } from 'antd'
import useGetState from '@/hooks/useGetState'
import DemoTitle from '@/component/DemoTitle'

/**
 * 每段音频的类型定义
 * - index: 业务序号（从 1 开始），注意该值用于业务排序，而不是数组下标
 * - url: 音频资源地址（http/https）
 * - duration: 该段音频的时长，单位：秒。由 getMp3Duration 获取并写入
 * - offset: 该段在“虚拟整段音轨”中的起始时间（秒），由 calculateOffsets 根据前面各段累加得到
 */
export type Segment = { index: number; url: string; duration: number; offset: number };


/**
 * 辅助：把秒转换为易读的时:分:秒或分:秒格式（例如 3661 -> "1:01:01"，61 -> "1:01"）
 * - 处理非法值（NaN / Infinity / 负数）时返回 0 格式
 */
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
 * 获取远程 mp3 的时长（秒）
 * todo 优先取后端返回的时长
 * 实现要点：
 *  - 创建一个离屏的 HTMLAudioElement（new Audio），只请求 metadata（preload = 'metadata'）以尽量减少流量
 *  - 监听 loadedmetadata 事件来读取 audio.duration
 *  - 加入超时保护（例如 10s），以免资源不可达导致 Promise 永远不返回
 *  - 加入 error 事件处理
 * 返回：Promise<number>（成功 -> 时长秒数；失败 -> reject）
 * 注意：某些跨域或服务器不返回正确 Content-Type/Range 的情况下可能拿不到 duration
 */
export function getMp3Duration(url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const a = new Audio()
    // eslint-disable-next-line prefer-const
    let timeoutId: any

    const onLoaded = () => {
      cleanup()
      const d = Number(a.duration)
      if (Number.isFinite(d) && d > 0) resolve(d)
      else reject(new Error('无法获取音频时长'))
    }
    const onErr = () => {
      cleanup()
      reject(new Error('加载音频失败'))
    }
    const cleanup = () => {
      clearTimeout(timeoutId)
      a.removeEventListener('loadedmetadata', onLoaded)
      a.removeEventListener('error', onErr)
      a.removeAttribute('src')
    }

    // 超时（防止网络/资源问题导致 Promise 永远挂起）
    timeoutId = setTimeout(() => {
      cleanup()
      reject(new Error('获取音频时长超时'))
    }, 10000)

    // 只下载元信息
    a.preload = 'metadata'
    a.src = url
    a.addEventListener('loadedmetadata', onLoaded)
    a.addEventListener('error', onErr)
  })
}

const { Title, Text } = Typography

export default function SegmentedMp3Player() {
  /**
   * 存储所有段，按业务的 index 值排序后形成播放序列
   * 使用自定义 hook useGetState，额外提供 getSegments() 的即时 getter，方便在回调里读取最新值
   */
  const [segments, setSegments, getSegments] = useGetState<Segment[]>([])

  /**
   * 真实用于播放的 audio 元素（单一播放实例）
   * 我们通过替换它的 src 来切换段落，从而实现把多段拼接成一个“虚拟整段”播放体验
   */
  const audioRef = useRef<HTMLAudioElement | null>(null)

  /**
   * 预加载下一个段的 audio 元素（仅用于提前建立缓存，减少切换时的空白）
   * 注意：播放始终由 audioRef.current 承担，preloadedNextRef 仅做 load 缓存
   */
  const preloadedNextRef = useRef<HTMLAudioElement | null>(null)

  /** 播放状态（true = 正在播放）——通过 audio 的 play/pause 事件同步 */
  const [isPlaying, setIsPlaying] = useState(false)

  /** 当前正在播放的段在数组中的下标（-1 表示尚未开始播放）
   * 注意：这个下标是数组下标，不等同于 Segment.index（业务序号）
   */
  const [currentSegIdx, setCurrentSegIdx, getCurrentSegIdx] = useGetState<number>(-1)

  /** 当前段内的播放时间（秒）——我们把 audio.currentTime 同步到这里，用于 UI 显示与计算虚拟时间 */
  const [segLocalTime, setSegLocalTime] = useState<number>(0)

  /** 表示用户正在拖动进度条（此时我们不会被 timeupdate 的事件干扰 UI） */
  const [userSeeking, setUserSeeking] = useState(false)

  /** 在拖动过程中保存临时滑块值（松手后才真正跳转） */
  const [tempSliderValue, setTempSliderValue] = useState<number | null>(null)

  /**
   * 根据 segments 数组（保证按 index 升序）计算每段的 offset（虚拟起点）
   * 例如：段 1 长 10s，段 2 长 5s，则段1.offset=0，段2.offset=10
   * 返回一个新数组（不在原数组上更改以保持纯函数风格）
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

  /** 整个“虚拟整段音轨”的总时长（秒）——基于 segments 的 durations 求和 */
  const totalDuration = useMemo(
    () => segments.reduce((sum, s) => sum + (s.duration || 0), 0),
    [segments]
  )

  /** 便捷：当前播放段的 Segment 对象（用于 UI 展示） */
  const currentSeg = useMemo(() => {
    return currentSegIdx >= 0 ? segments[currentSegIdx] : null
  }, [currentSegIdx, segments])

  /**
   * 当前 "虚拟时间"（用于进度条和显示）
   * = 当前段在虚拟轨道中的 offset + 该段内已播放的时间
   * 如果当前段索引无效则返回 0
   */
  const currentVirtualTime = useMemo(() => {
    if (currentSegIdx < 0 || currentSegIdx >= segments.length) return 0
    return (segments[currentSegIdx]?.offset || 0) + (segLocalTime || 0)
  }, [currentSegIdx, segLocalTime, segments])

  /**
   * 根据虚拟时间 t（秒）查找落在哪一段以及该段内的 local 时间
   * - 对边界（小于等于 0 或 >= totalDuration）做合理处理
   * - 使用线性查找（段数量通常不会很大，简单且稳定）
   */
  function findSegByVirtualTime(t: number): { i: number; local: number } {
    if (segments.length === 0) return { i: -1, local: 0 }
    if (t <= 0) return { i: 0, local: 0 }
    if (t >= totalDuration) {
      const last = segments.length - 1
      return { i: last, local: Math.max(0, totalDuration - segments[last].offset) }
    }

    // 线性遍历找到包含 t 的段
    for (let i = 0; i < segments.length; i++) {
      const start = segments[i].offset
      const end = start + (segments[i].duration || 0)

      if (t >= start && t < end) {
        return { i, local: t - start }
      }
    }

    // 兜底（理论上不会走到这里）
    const last = segments.length - 1
    return { i: last, local: Math.max(0, t - segments[last].offset) }
  }

  /**
   * 组件挂载逻辑：创建播放与预加载用的 audio 实例、绑定事件，并预置若干测试段
   * 注意：在卸载时要移除事件并释放音频资源
   */
  useEffect(() => {
    // 如果尚未创建播放实例则创建并绑定事件
    if (!audioRef.current) {
      audioRef.current = new Audio()
      // 尽量缓冲播放时需要的资源
      audioRef.current.preload = 'auto'
      attachAudioEvents(audioRef.current)
    }
    // 创建用于预加载下一段的 audio（仅作缓存）
    if (!preloadedNextRef.current) {
      preloadedNextRef.current = new Audio()
      preloadedNextRef.current.preload = 'auto'
    }

    // 预置示例音频（启动时自动加载 1/2/3 段的时长）
    const presetUrls = [
      'https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/1.mp3',
      'https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/2.mp3',
      'https://public-file-020.oss-cn-guangzhou.aliyuncs.com/audio/mp3/3.mp3'
    ]

    // 并发获取三段的时长，拿到后计算 offsets 并写入 segments
    Promise.all(
      presetUrls.map((url, idx) => getMp3Duration(url).then(duration => ({ index: idx + 1, url, duration, offset: 0 })))
    )
      .then((presetSegs) => {
        const segmentsWithOffsets = calculateOffsets(presetSegs)
        console.log('预置音频加载完成，计算后的 segments:', segmentsWithOffsets)
        setSegments(segmentsWithOffsets)
      })
      .catch((e) => {
        console.error('预加载音频失败', e)
      })

    // 卸载时释放资源并解绑事件
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener('timeupdate', onTimeUpdate)
        audioRef.current.removeEventListener('ended', onEnded)
        audioRef.current.removeEventListener('play', handleAudioPlay)
        audioRef.current.removeEventListener('pause', handleAudioPause)
        audioRef.current.removeAttribute('src')
        audioRef.current = null
      }
      if (preloadedNextRef.current) {
        preloadedNextRef.current.pause()
        preloadedNextRef.current.removeAttribute('src')
        preloadedNextRef.current = null
      }
    }
  }, [])

  /**
   * 在数组下标为 segArrayIdx 的分段处，从段内 localTimeSec 秒开始播放
   * 逻辑要点：
   *  - 直接把 audio.src 设置为该段的 url，然后定位 currentTime 并 play()
   *  - 把当前播放段下标与段内时间同步到状态（用于 UI）
   *  - 利用 audio.oncanplay 保证在可以播放时再调用 play（兼容某些浏览器）
   *  - 尝试提前用 preloadedNextRef 载入下一段的资源以减少切换时的延迟
   * 参数 autoplay 用来控制是否在定位后立即播放（true = 播放，false = 仅定位）
   */
  const playSegmentAt = useCallback((segArrayIdx: number, localTimeSec: number, autoplay = true) => {
    const segments = getSegments()
    if (segArrayIdx < 0 || segArrayIdx >= segments.length) return

    const seg = segments[segArrayIdx]
    const a = audioRef.current
    // 安全检查，防止在实例被销毁后调用
    if (!a) return

    // 切换到目标段的资源并 reload
    a.src = seg.url
    try {
      // 触发重新缓冲
      a.load()
    } catch { }

    // 段内定位（防止越界）
    a.currentTime = Math.max(0, Math.min(localTimeSec, seg.duration || 0))

    // 同步 UI 状态
    setCurrentSegIdx(segArrayIdx)
    setSegLocalTime(a.currentTime)

    // 在 canplay 后再 play（兼容性考虑）
    a.oncanplay = () => {
      // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
      if (autoplay) void a.play().catch(() => { })
    }

    // 预加载下一段（仅做 load 缓存，不作播放）
    // todo 看下是不是需要删除
    if (segArrayIdx < segments.length - 1) {
      const next = preloadedNextRef.current
      // 防御性检查
      if (next) {
        const nextUrl = segments[segArrayIdx + 1].url
        if (next.src !== nextUrl) {
          next.src = nextUrl
          try {
            next.load()
          } catch { }
        }
      }
    }
  }, [])

  /**
   * audio 的 timeupdate 处理：
   * - 同步段内当前时间（segLocalTime）到状态
   * - 当接近当前段尾时（阈值 0.3s），触发预加载下一段，减少段间空白
   */
  const onTimeUpdate = useCallback(() => {
    const a = audioRef.current
    if (!a) return

    const currentTime = a.currentTime
    if (typeof currentTime === 'number' && isFinite(currentTime)) {
      setSegLocalTime(currentTime)
    }

    // 如果当前段存在下一段，且接近当前段尾则 load 下一段以缓存
    const i = currentSegIdx
    if (i >= 0 && i < segments.length - 1) {
      const curDur = segments[i].duration || 0
      if (curDur > 0 && a.currentTime >= curDur - 0.3) {
        const next = preloadedNextRef.current
        if (next) {
          const nextUrl = segments[i + 1].url
          if (next.src !== nextUrl) {
            next.src = nextUrl
            // eslint-disable-next-line max-depth
            try {
              // 仅做缓存，不会播放
              next.load()
            } catch { }
          }
        }
      }
    }
  }, [currentSegIdx, segments])

  /**
   * 当当前段播放结束：如果还有下一段则自动切换并播放下一段；否则标记为停止
   * 这里使用 getCurrentSegIdx / getSegments 来获取最新的状态（防止闭包捕获旧值）
   */
  const onEnded = useCallback(() => {
    const i = getCurrentSegIdx()
    const currentSegments = getSegments()
    console.log('当前段索引:', i)
    console.log('当前segments:', currentSegments)
    if (i >= 0 && i < currentSegments.length - 1) {
      console.log('自动续播下一段')
      playSegmentAt(i + 1, 0, true)
    } else {
      setIsPlaying(false)
    }
  }, [playSegmentAt, getCurrentSegIdx, getSegments])

  /** 播放/暂停事件的同步处理（仅更新 isPlaying 状态） */
  const handleAudioPlay = useCallback(() => setIsPlaying(true), [])
  const handleAudioPause = useCallback(() => setIsPlaying(false), [])

  /**
   * 把事件绑定到播放实例上（只绑定一次）
   * 绑定的事件：timeupdate（实时进度）、ended（段结束续播）、play、pause
   */
  function attachAudioEvents(a: HTMLAudioElement) {
    a.addEventListener('timeupdate', onTimeUpdate)
    a.addEventListener('ended', onEnded)
    a.addEventListener('play', handleAudioPlay)
    a.addEventListener('pause', handleAudioPause)
  }

  /**
   * 播放按钮动作：
   * - 如果尚未开始播放（currentSegIdx === -1），从第 0 段开始
   * - 否则继续当前段（调用 audio.play）
   * 注意：play 返回 Promise，应该使用 catch 以避免未捕获的异常（某些浏览器在自动播放策略下会拒绝）
   */
  const onPlay = () => {
    if (segments.length === 0) return message.info('请先追加音频段')
    if (currentSegIdx === -1) {
      playSegmentAt(0, 0, true)
    } else {
      const a = audioRef.current
      // 防御性检查
      if (a) {
        // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
        void a.play().catch(() => { })
      }
    }
  }

  /** 暂停：保留当前位置（调用 audio.pause） */
  const onPause = () => {
    const a = audioRef.current
    if (a) a.pause()
  }

  /** 停止：暂停、清除 src、重置状态到初始（不再保留 current src） */
  const onStop = () => {
    const a = audioRef.current
    if (!a) return
    a.pause()
    setIsPlaying(false)
    setCurrentSegIdx(-1)
    setSegLocalTime(0)
    // 清空资源，回到未加载状态
    a.removeAttribute('src')
  }

  /** 滑块最大值使用总时长（向上取整为整数秒），Slider 的单位是秒 */
  const sliderMax = Math.max(0, Math.ceil(totalDuration))

  /**
   * Slider 的显示值：
   * - 如果用户正在拖动（userSeeking）则显示临时拖动值
   * - 否则显示 currentVirtualTime（跟随播放）
   */
  const sliderValue = useMemo(() => {
    return userSeeking ? (tempSliderValue ?? currentVirtualTime) : currentVirtualTime
  }, [userSeeking, tempSliderValue, currentVirtualTime])

  /**
   * 当滑块发生变化（拖动或点击）时：仅更新临时值与 seeking 状态
   * 真正跳转在 onChangeComplete（即松手时）处理
   */
  const onSliderChange: SliderSingleProps['onChange'] = (val) => {
    setUserSeeking(true)
    const v = Array.isArray(val) ? val[0] : val
    setTempSliderValue(v)
  }

  /**
   * 当滑块操作完成（用户松手）时：
   * - 把虚拟时间转换为具体的段 & 段内时间
   * - 跳转到对应段并播放
   * - 清理拖动临时状态
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

  // Antd 表单实例：尾部追加与按序号插入/更新
  const [formAppend] = Form.useForm()
  const [formInsert] = Form.useForm()

  /**
   * "尾部追加"：自动计算新的业务 index（当前最大 index + 1），并把新段追加到列表中
   * 步骤：
   *  1) 使用 getMp3Duration 获取时长
   *  2) 合并进现有 segments（先去掉重复 index 再合并），排序后计算 offsets
   *  3) 更新 segments 并提示
   */
  async function handleAppend(values: { url: string }) {
    const currentSegments = getSegments()
    const nextIndex = currentSegments.length > 0 ? Math.max(...currentSegments.map(s => s.index)) + 1 : 1
    try {
      const duration = await getMp3Duration(values.url)
      const added: Segment = { index: nextIndex, url: values.url, duration, offset: 0 }
      const newSegments = calculateOffsets(sortSegments([...currentSegments, added]))
      console.log('尾部追加音频后，计算后的 segments:', newSegments)
      setSegments(newSegments)
      message.success(`已追加第${nextIndex}段，时长 ${fmt(duration)}`)
    } catch (e: any) {
      message.error(e?.message || '获取音频时长失败')
    }
    formAppend.resetFields()
  }

  /**
   * "按序号插入/更新"：用于补齐中间缺段或替换某一段
   * 规则：
   *  - 如果指定的 index 已存在，则覆盖该段（替换 url 与 duration）
   *  - 如果不存在，则插入为新段
   *  插入后统一按 index 排序并重新计算 offsets
   * 额外：插入后尝试保持当前播放状态的正确性（通过查找当前播放段在新数组中的下标）
   */
  async function handleInsert(values: { url: string; index: number }) {
    const { url, index } = values
    if (!index || index < 1) return message.error('序列号 index 必须从 1 开始')
    try {
      const currentSegments = getSegments()
      const duration = await getMp3Duration(url)
      const newSegments = calculateOffsets(sortSegments([...currentSegments.filter(s => s.index !== index), { index, url, duration, offset: 0 }]))
      console.log('按序号插入音频后，计算后的 segments:', newSegments)

      // 修复/保持当前播放段的索引：如果当前正在播放某一段，插入操作不会导致 UI 指向错误的段
      let newCurrentSegIdx = currentSegIdx
      if (currentSegIdx >= 0) {
        // 找到当前播放段在新数组中的新位置（以业务 index 为准匹配）
        const currentSegmentIndex = currentSegments[currentSegIdx]?.index
        if (currentSegmentIndex !== undefined) {
          newCurrentSegIdx = newSegments.findIndex(s => s.index === currentSegmentIndex)
        }
      }

      setSegments(newSegments)
      setCurrentSegIdx(newCurrentSegIdx)

      message.success(`已插入/更新第${index}段，时长 ${fmt(duration)}`)
    } catch (e: any) {
      message.error(e?.message || '获取音频时长失败')
    }
    formInsert.resetFields()
  }

  /** 简单的按业务 index 升序排序函数（不改变原数组） */
  function sortSegments(arr: Segment[]): Segment[] {
    return [...arr].sort((a, b) => a.index - b.index)
  }

  useEffect(() => {
    // 调试输出：当 segments 变化时打印当前数组（便于观察 offset/duration 是否正确）
    console.log(JSON.stringify(segments, null, 2))
  }, [segments])

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      <DemoTitle level={3}>分段 MP3 播放器 Demo</DemoTitle>

      {/* 播放控制：播放 / 暂停 / 停止 + 当前播放状态 */}
      <Card className='mt-4' title='播放控制'>
        <Space wrap>
          <Button type='primary' onClick={onPlay}>播放</Button>
          <Button onClick={onPause}>暂停</Button>
          <Button danger onClick={onStop}>停止</Button>
          <Tag color={isPlaying ? 'green' : 'default'}>{isPlaying ? '播放中' : '已暂停/停止'}</Tag>
        </Space>

        <Divider />

        {/* 进度与时间显示区 */}
        <div>
          <div className='flex items-center justify-between'>
            <Text>当前：{fmt(currentVirtualTime)}</Text>
            <Text>总时长：{fmt(totalDuration)}</Text>
          </div>

          {/*
            进度条（Antd Slider）说明：
            - min/max 分别为 0 / 总时长（向上取整）
            - step 设为 0.01 以获得更平滑的拖动体验
            - tooltip 展示格式化后的时间
            - onChange 只更新临时值，onChangeComplete（松手）才做跳转
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

          {/* 当前段信息：显示正在播放的是第几段、段内播放时长 / 段总时长 */}
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

      {/* 追加/插入控制区：提供表单以便演示尾部追加与按序号插入 */}
      <div className='grid md:grid-cols-2 gap-4 mt-4'>
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

      {/* 段列表：列出所有段，提供快速播放每段开头的按钮 */}
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
