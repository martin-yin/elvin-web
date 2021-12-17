import StepBackwardOutlined from '@ant-design/icons/lib/icons/StepBackwardOutlined'
import StepForwardOutlined from '@ant-design/icons/lib/icons/StepForwardOutlined'
import { Button, Divider, Empty, message, Space } from 'antd'
import React from 'react'
import BrowserIcon from '../../../assets/webIcons/browse.png'
import IpIcon from '../../../assets/webIcons/ip.png'
import PcIcon from '../../../assets/webIcons/pc.png'
import WindowIcon from '../../../assets/webIcons/window.png'
import { JsErrIF } from '../../../interface/jsErr.interface'
import { useJsErrContext } from '../hook/useJsErrDetail'

const JsErrSurvey = React.memo<{ jsErr: JsErrIF.JsErr }>(({ jsErr }) => {
  const { handleChangeErrorId } = useJsErrContext()
  const changeIssue = async (id: number) => {
    if (id == 0) {
      message.warn('没有下一个问题了！')
      return
    }
    handleChangeErrorId(id)
  }

  const ErrorChangeButton = () => {
    return (
      <div id="errorAction">
        <Space>
          <Button
            style={{ fontSize: '10px' }}
            size="small"
            icon={<StepBackwardOutlined />}
            disabled={jsErr.previous_error_id == 0}
            onClick={() => changeIssue(jsErr.previous_error_id)}
          >
            上一个
          </Button>
          <Button
            style={{ fontSize: '10px' }}
            size="small"
            icon={<StepForwardOutlined />}
            disabled={jsErr.next_error_id == 0}
            onClick={() => changeIssue(jsErr.next_error_id)}
          >
            下一个
          </Button>
        </Space>
      </div>
    )
  }

  const SurveyIcon = () => {
    return (
      <Space size={60}>
        <Space>
          <img src={IpIcon} alt="" />
          <h3>{jsErr.ip}</h3>
        </Space>
        <Space>
          <img src={BrowserIcon} alt="" />
          <div>
            <h3>{jsErr.browser}</h3>
            <p>{jsErr.browser_version}</p>
          </div>
        </Space>
        <Space>
          <img src={WindowIcon} alt="" />
          <div>
            <h3>{jsErr.os}</h3>
            <p>{jsErr.os_version}</p>
          </div>
        </Space>
        <Space>
          <img src={PcIcon} alt="" />
          <div>
            <h3>{jsErr.device}</h3>
            <p>{jsErr.device_type}</p>
          </div>
        </Space>
      </Space>
    )
  }

  return (
    <>
      {jsErr ? (
        <>
          <div id="errorDesc">
            <Space>
              <h2>
                {jsErr.error_name}: {jsErr.message}
              </h2>
            </Space>
            <div style={{ marginBottom: '20px' }}>
              <p>{jsErr.componentName}</p>
            </div>
          </div>
          <ErrorChangeButton />
          <Divider />
          <SurveyIcon />
        </>
      ) : (
        <Empty />
      )}
    </>
  )
})

export default JsErrSurvey
