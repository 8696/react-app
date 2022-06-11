
import './index.less'
import { Tabs } from 'antd'
const { TabPane } = Tabs
type TProps = {
  // eslint-disable-next-line no-unused-vars
  onChange?: ({ index, name }: { name: string, index: number }) => void
  paneList: string[]
}

export default (props: TProps) => {
  const { onChange, paneList } = props
  return (
    paneList.length > 0
      ? (
        <div className='change-tab-custom'>
          <Tabs
            tabBarGutter={0}
            onChange={activeIndex => {
              onChange && onChange({
                name: paneList[+activeIndex],
                index: +activeIndex
              })
            }}
          >
            {
              paneList.map((item, index) => (
                <TabPane tab={item} key={index.toString()} />
              ))
            }
          </Tabs>
        </div>
      )
      : null
  )
}
