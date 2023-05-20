import { useEffect } from 'react'
import { useMemoizedFn } from 'ahooks'
import { Modal } from 'antd'

const APP_STORAGE = 'APP_VERSION'

export default () => {


  const clearAppVersion = useMemoizedFn(() => {
    window.localStorage.removeItem(APP_STORAGE)
  })

  const getAppVersion = useMemoizedFn(() => {
    return window.localStorage.getItem(APP_STORAGE)
  })

  const setAppVersion = useMemoizedFn((v) => {
    window.localStorage.setItem(APP_STORAGE, v)
  })


  const checkAppVersion = useMemoizedFn(() => {
    fetch('/version.json?t=' + new Date().getTime())
      .then(data => {
        return data.text()
      })
      .then((data) => {
        try {
          const json = JSON.parse(data)
          const localAppVersion = getAppVersion()
          if (localAppVersion && json.v !== localAppVersion) {
            Modal.confirm({
              title: '版本更新提示',
              content: '当前网页版本过低，可刷新获得最新版本',
              okText: '刷新',
              cancelText: '取消',
              centered: true,
              onOk: () => {
                window.location.reload()
              }
            })
          } else {
            setAppVersion(json.v)
            throw new Error()
          }
        } catch (e) {
          throw new Error()
        }
      })
      .catch(() => {
        setTimeout(() => {
          checkAppVersion()
        }, 3000)
      })
  })

  useEffect(() => {
    clearAppVersion()
    checkAppVersion()
  }, [checkAppVersion, clearAppVersion])


  return null
}
