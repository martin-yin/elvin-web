import { Timeline } from 'antd'
import React from 'react'
import { UserIF } from '../../../interface'
import BehaviorTimeLineItem from './behaviorTimeLineItem'
interface BehaviorTimeLineProps {
  activeId: string
  list: Array<any>
  activeBehavior: (item: UserIF.UserAction) => void
}
const BehaviorTimeLine = React.memo<BehaviorTimeLineProps>(({ list, activeId, activeBehavior }) => {
  return (
    <Timeline>
      {list.map((item: UserIF.UserAction, key: number) => {
        return (
          <BehaviorTimeLineItem
            activeId={activeId}
            activeBehavior={activeBehavior}
            key={key}
            item={item}
          ></BehaviorTimeLineItem>
        )
      })}
    </Timeline>
  )
})

export default BehaviorTimeLine
