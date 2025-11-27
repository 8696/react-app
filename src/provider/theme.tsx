import React, { createContext, useContext, useState } from 'react'
import { ThemeConfig } from 'antd'
import defaultTheme from '@/theme/defaultTheme'
import type { AliasToken } from 'antd/es/theme/interface'
import { useMount } from 'ahooks'

type TData = {
  // 主题
  theme?: ThemeConfig;
  // 追加的形式更新 theme
  updateTheme?: (theme: ThemeConfig) => void;
  // 追加的形式更新 token
  updateToken?: (token: Partial<AliasToken>) => void;
}

const Context = createContext<TData | undefined>({})

export const ThemeProvider = (props: { children: React.ReactNode }) => {
  const { children } = props

  // 主题
  const [theme, setTheme] = useState<Partial<ThemeConfig>>()

  // token
  const [token, setToken] = useState<Partial<AliasToken>>()


  const updateToken = (tokenData: Partial<AliasToken>): void => {
    setToken(prevState => ({ ...prevState, ...tokenData }))
    setTheme(prevState => {
      return {
        ...prevState,
        token: {
          ...token,
          ...tokenData
        }
      }
    })
  }

  const updateTheme = (theme: ThemeConfig): void => {
    setTheme(prevState => {
      return {
        ...prevState,
        ...theme
      }
    })
  }


  useMount(() => {
    setTheme(defaultTheme)
    setToken(defaultTheme.token)
  })


  return (
    <Context.Provider
      value={{
        theme,
        updateTheme,
        updateToken
      }}>
      {children}
    </Context.Provider>
  )
}


export const useTheme = (): TData => {

  const context = useContext(Context)
  if (!context) {
    throw new Error()
  }

  return context
}


