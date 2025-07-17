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
  const [audioChunks, setAudioChunks] = useState<any[]>([])


  // 权限 + 初始化录音器
  const initRecorder = async () => {
    if (recorderRef.current) return

    const rec = Recorder({
      type: 'mp3',
      sampleRate: 16000,
      bitRate: 16
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
    try {
      await initRecorder()
      recorderRef.current.start()
      setIsRecording(true)
      setIsPaused(false)
      setAudioUrl(null)
      setAudioChunks([])
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

    recorderRef.current.stop((blob: any, duration: any) => {
      console.log('录音结束', blob, duration)


      const url = URL.createObjectURL(blob)
      setAudioUrl(url)
      setIsRecording(false)
      setIsPaused(false)
      handleClose()
    }, (errMsg: any) => {
      console.error('结束录音失败：' + errMsg)
      message.error('结束录音失败：' + errMsg)
    })
  }

  // 播放录音
  const handlePlay = () => {
    if (!audioUrl) return
    const audio = new Audio(audioUrl)
    audio.play()
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
        <Button onClick={handlePlay} disabled={!audioUrl}>
          播放录音
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
      <div style={{ marginTop: 20 }}>
        {audioUrl && (
          <audio controls src={audioUrl} style={{ width: '100%' }} />
        )}
      </div>
    </div>
  )
}

export default RecorderDemo
