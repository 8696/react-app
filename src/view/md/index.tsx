import React, { useMemo } from 'react'
import MEEditor, { commands } from '@uiw/react-md-editor'


export default function App() {
  const [value, setValue] = React.useState('**Hello world!!!**')
  const title3 = useMemo<commands.ICommand>(() => {
    return {
      name: 'title3',
      keyCommand: 'title3',
      buttonProps: { 'aria-label': 'Insert title3' },
      icon: <><span>title</span></>,
      execute: () => {
        setValue(prevState => prevState + '\r\n# value')
      }
    }
  }, [])
  return (
    <div className='container'>
      <MEEditor
        value={value}
        commands={[
          ...commands.getCommands(),
          title3
        ]}
        onChange={(value) => {
          setValue(value as string)
        }}
      />
    </div>
  )
}
