import React, { createContext } from 'react'
import { ThemeConfig } from 'antd'

export const ThemeContext = createContext<{
  setTheme?: React.Dispatch<React.SetStateAction<ThemeConfig | undefined>>
    }>({})
