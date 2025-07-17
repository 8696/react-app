import React, { useRef, useState, useEffect } from 'react'
import { Button, Space, message } from 'antd'
import Recorder from 'recorder-core'

// 引入 MP3 编码器
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/mp3-engine'

// 设置类型为 any 简化类型约束
const RecorderDemo: React.FC<any> = () => {
  const recorderRef = useRef<any>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [audioUrl, setAudioUrl] = useState<any>(null)
  const [audioChunks, setAudioChunks] = useState<Array<{ blob: Blob, url: any, size: any }>>([])
  const [duration, setDuration] = useState<number>(0)

  // 临时
  const frameBuffer: any = useRef<any[]>([])

  // 所有分片
  const allFrameBuffer: any = useRef<any[]>([])


  // 处理录音切片
  const handleFrameBufferToChunks = () => {
    const blob = new Blob(frameBuffer.current, { type: 'audio/mp3' })
    console.log(blob.size / 1024, 'KB')
    setAudioChunks(prevState => {
      return [...prevState, {
        blob,
        url: URL.createObjectURL(blob),
        size: blob.size / 1024
      }]
    })
    frameBuffer.current = []
  }

  // 权限 + 初始化录音器
  const initRecorder = () => {

    const rec = recorderRef.current || Recorder({
      type: 'mp3',
      sampleRate: 16000,
      bitRate: 16,
      audioTrackSet: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      },
      onProcess(buffers: any, powerLevel: any, bufferDuration: any, bufferSampleRate: any, newBufferIdx: any, asyncEnd: any) {
        console.log('正在录音：', buffers.length, bufferDuration, newBufferIdx)
        setDuration(bufferDuration / 1000)
      },
      takeoffEncodeChunk(mp3Frame: any) {
        frameBuffer.current.push(mp3Frame)
        allFrameBuffer.current.push(mp3Frame)
        if (frameBuffer.current.length >= 50) {
          handleFrameBufferToChunks()
        }
      }

    })

    return new Promise((resolve, reject) => {
      rec.open(() => {
        console.log('录音权限已获取')
        resolve(null)
        recorderRef.current = rec
      }, (msg: any, isUserNotAllow: any) => {
        console.error('权限拒绝', msg, isUserNotAllow)
        message.error('录音权限拒绝')
        reject()
      })
    })
  }

  const handleClose = () => {
    recorderRef.current.close()
    console.log('录音资源已释放')
  }

  // 开始录音
  const handleStart = async () => {
    (async () => {
      console.log('获取屏幕唤醒')
      await (navigator as any).wakeLock.request('screen')
    })()
    try {
      await initRecorder()
      recorderRef.current.start()
      setIsRecording(true)
      setIsPaused(false)
      setAudioUrl(null)
      setAudioChunks([])
      allFrameBuffer.current = []
      frameBuffer.current = []
    } catch (e) {
    }
  }

  // 暂停录音
  const handlePause = () => {
    if (!recorderRef.current) return
    recorderRef.current.pause()
    setIsPaused(true)
  }

  // 恢复录音
  const handleResume = () => {
    if (!recorderRef.current) return
    recorderRef.current.resume()
    setIsPaused(false)
  }

  // 停止录音
  const handleStop = () => {

    if (!recorderRef.current) return

    recorderRef.current.stop((_: any, duration: any) => {
      // 完整
      const blob = new Blob(allFrameBuffer.current, { type: 'audio/mp3' })
      const url = URL.createObjectURL(blob)

      // 最后一部分
      handleFrameBufferToChunks()

      console.log('录音结束', blob, duration)

      setAudioUrl(url)
      setIsRecording(false)
      setIsPaused(false)
      handleClose()
    }, (errMsg: any) => {
      console.error('结束录音失败：' + errMsg)
      message.error('结束录音失败：' + errMsg)
    })
  }

  // 下载录音
  const handleDownload = () => {
    if (!audioUrl) return
    const link = document.createElement('a')
    link.href = audioUrl
    link.download = 'recording.mp3'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }


  const blobToFile = (theBlob: any, fileName: any) => {
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
  }

  // 假设你有一个名为 audioBlob 的 Blob 对象，以及你想要的文件名
  const handleConvertToFile = () => {
    if (!audioUrl) {
      alert('没有可用的录音')
      return
    }

    // 将 audioUrl 转换为 Blob 对象
    fetch(audioUrl)
      .then(response => response.blob())
      .then(blob => {
        // 使用 blobToFile 函数将 Blob 对象转换为 File 对象
        const audioFile = blobToFile(blob, 'recording.mp3')
        console.log(audioFile)
        // 现在你可以使用 audioFile 对象了，比如下载、上传等
      })
      .catch(error => {
        console.error('转换为 Blob 对象时出错:', error)
      })
  }


  return (
    <div style={{ padding: 20 }}>
      <Space wrap>
        <Button type='primary' onClick={handleStart} disabled={isRecording}>
          开始录音
        </Button>
        <Button onClick={handlePause} disabled={!isRecording || isPaused}>
          暂停录音
        </Button>
        <Button onClick={handleResume} disabled={!isPaused}>
          恢复录音
        </Button>
        <Button danger onClick={handleStop} disabled={!isRecording}>
          停止录音
        </Button>
        <Button onClick={handleDownload} disabled={!audioUrl}>
          下载录音
        </Button>
        <Button onClick={handleConvertToFile}>
          转成File
        </Button>
        <Button onClick={handleClose}>
          释放资源
        </Button>
      </Space>
      {
        duration > 0 && (
          <div style={{ marginTop: 20 }}>
            <h3>录音时长</h3>
            <div>{duration.toFixed(2)} 秒</div>
          </div>
        )
      }
      {audioUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>完整录音文件</h3>
          <audio controls src={audioUrl} style={{ width: '100%' }} />
        </div>
      )}
      {audioChunks.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>分片录音文件</h3>
          {
            audioChunks.map((item, index) => {
              return (
                <div key={item.url} style={{ marginTop: 10 }}>
                  <p>第{index}个，大小：{item.size} KB</p>
                  <audio controls src={item.url} style={{ width: '100%' }} />
                </div>
              )
            })
          }
        </div>
      )}
    </div>
  )
}

export default RecorderDemo
