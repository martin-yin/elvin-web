import { Timeline } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { UserIF } from '../../interface/user.interface'
import { getTimeHHMM } from '../../utils'
import { UseActionQuotaListProxy } from '../../utils/useActionQuotaProxy'

interface ActionTimeLineProps {
  key: number
  item: UserIF.UserAction
  activeTimeLine: (item: UserIF.UserAction) => void
  activeId: string
}

const ActionTimeLineItem: FC<ActionTimeLineProps> = ({ key, item, activeTimeLine, activeId }) => {
  const [itemData, setItemData] = useState({
    itemIcon: () => {
      return <></>
    },
    itemTitle: '',
    itemContent: ''
  })

  const initItemData = useCallback(async () => {
    const { icon, title, content } = transformationAction(item)

    setItemData({
      itemIcon: icon,
      itemTitle: content,
      itemContent: title
    })
  }, [item])

  useEffect(() => {
    initItemData()
  }, [initItemData])

  const transformationAction = (item: UserIF.UserAction): any => {
    const action_detail = Reflect.has(item, 'action_detail')
    if (action_detail) {
      item.action_detail = JSON.parse(item.action_detail)
      return UseActionQuotaListProxy[item.action_type](item)
    } else {
      return UseActionQuotaListProxy['EMPTY']()
    }
  }

  return (
    <>
      <Timeline.Item key={key} dot={itemData.itemIcon()}>
        <div
          className={`footprint__des ${activeId == item.happen_time + item.action_type ? 'active__footprint_des' : ''}`}
          onClick={() => activeTimeLine(item)}
        >
          <div className="flex">
            <div className="flex-grow-1">
              <p className="over-hidde">{itemData.itemTitle}</p>
            </div>
            <div className="flex-grow-0 flex-item">{getTimeHHMM(item.happen_time)}</div>
          </div>
          <div>{itemData.itemContent}</div>
        </div>
      </Timeline.Item>
    </>
  )
}

export default ActionTimeLineItem
