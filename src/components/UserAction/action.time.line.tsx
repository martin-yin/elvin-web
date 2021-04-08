import { Timeline } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { getTimeHHMM } from '../../utils'

interface ActionTimeLineProps {
  key: string
  item: any
  activeTimeLine: (item: any) => void
  activeId: string
}

const ActionTimeLineItem: FC<ActionTimeLineProps> = ({ key, item, activeTimeLine, activeId }) => {
  const [itemData, setItemData] = useState({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    initItemData()
  }, [initItemData])

  const transformationAction = (item: any): any => {
    if (item.action_type == 'JS_ERROR') {
      return {
        icon: (): React.ReactNode => {
          return <i className="icofont-warning"></i>
        },
        title: `错误信息${item.message}`,
        content: `错误页面: ${item.page_url}`
      }
    } else if (item.action_type == 'RESOURCE_ERROR') {
      return {
        icon: (): React.ReactNode => {
          return <i className="icofont-warning"></i>
        },
        title: `资源加载错误${item.element_type}`,
        content: `资源URL: ${item.source_url}`
      }
    } else if (item.action_type == 'BEHAVIOR_INFO') {
      return {
        icon: (): React.ReactNode => {
          return <i className="icofont-touch"></i>
        },
        title: '点击事件',
        content: `点击内容: ${item.innter_text}`
      }
    } else if (item.action_type == 'HTTP_LOG') {
      return {
        icon: (): React.ReactNode => {
          return <i className="icofont-ui-network"></i>
        },
        title: '发送请求',
        content: `请求URL: ${item.http_url}`
      }
    } else if (item.action_type == 'PAGE_LOAD') {
      return {
        icon: (): React.ReactNode => {
          return <i className="icofont-ui-browser"></i>
        },
        title: '页面浏览',
        content: `页面URL: ${item.page_url}`
      }
    }
  }
  return (
    <>
      <Timeline.Item key={key} dot={itemData.itemIcon()}>
        <div
          className={`footprint-des ${activeId == item.action_id + item.action_type ? 'active-footprint-des' : ''}`}
          onClick={() => activeTimeLine(item)}
        >
          <div className="flex">
            <div className="flex-grow-1">{itemData.itemTitle}</div>
            <div className="flex-grow-0 flex-item">{getTimeHHMM(item.happen_time)}</div>
          </div>
          <div>{itemData.itemContent}</div>
        </div>
      </Timeline.Item>
    </>
  )
}

export default ActionTimeLineItem
