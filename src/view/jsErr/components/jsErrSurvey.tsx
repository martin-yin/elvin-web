import StepBackwardOutlined from '@ant-design/icons/lib/icons/StepBackwardOutlined'
import StepForwardOutlined from '@ant-design/icons/lib/icons/StepForwardOutlined'
import { Button, Divider, Empty, message, Space } from 'antd'
import React from 'react'
import { getJsError } from '../../../request'
import BrowserIcon from '../../../assets/webIcons/browse.png'
import IpIcon from '../../../assets/webIcons/ip.png'
import PcIcon from '../../../assets/webIcons/pc.png'
import WindowIcon from '../../../assets/webIcons/window.png'

const JsErrSurvey = React.memo<any>(({ issue, setIssue, setStackFrames }) => {
  const changeIssue = async (id: number) => {
    if (id == 0) {
      message.warn('没有下一个问题了！')
      return
    }
    const result = await getJsError({
      error_id: id,
      issue_id: 0
    })
    setIssue(result.data)
    setStackFrames(JSON.parse(result.data.stack_frames))
  }

  return (
    <>
      {issue ? (
        <>
          <div id="errorDesc">
            <Space>
              <h2>
                {issue.error_name}: {issue.message}
              </h2>
            </Space>
            <div style={{ marginBottom: '20px' }}>
              <p>{issue.componentName}</p>
            </div>
          </div>
          <div id="errorAction">
            <Space>
              <Button
                style={{ fontSize: '10px' }}
                size="small"
                icon={<StepBackwardOutlined />}
                disabled={issue?.previous_error_id == 0}
                onClick={() => changeIssue(issue?.previous_error_id)}
              >
                上一个
              </Button>
              <Button
                style={{ fontSize: '10px' }}
                size="small"
                icon={<StepForwardOutlined />}
                disabled={issue?.next_error_id == 0}
                onClick={() => changeIssue(issue?.next_error_id)}
              >
                下一个
              </Button>
            </Space>
          </div>
          <Divider />
          <Space size={60}>
            <Space>
              <img src={IpIcon} alt="" />
              <h3>{issue.ip}</h3>
            </Space>
            <Space>
              <img src={BrowserIcon} alt="" />
              <div>
                <h3>{issue.browser}</h3>
                <p>{issue.browser_version}</p>
              </div>
            </Space>
            <Space>
              <img src={WindowIcon} alt="" />
              <div>
                <h3>{issue.os}</h3>
                <p>{issue.os_version}</p>
              </div>
            </Space>
            <Space>
              <img src={PcIcon} alt="" />
              <div>
                <h3>{issue.device}</h3>
                <p>{issue.device_type}</p>
              </div>
            </Space>
          </Space>
        </>
      ) : (
        <Empty />
      )}
    </>
  )
})

export default JsErrSurvey
