import AppstoreOutlined from '@ant-design/icons/lib/icons/AppstoreOutlined'
import { EditOutlined } from '@ant-design/icons'
import PlusCircleOutlined from '@ant-design/icons/lib/icons/PlusCircleOutlined'
import ProCard from '@ant-design/pro-card'
import { Progress, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { TeamIF } from '../../../interface'
import { setMonitorId } from '../../../stores/app.store'

interface HealthStatusItemProps {
  detail: TeamIF.ProjectHealthy
}

const HealthStatusItem: FC<HealthStatusItemProps> = ({ detail }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const projectToUrl = (url: string, monitor_id: string) => {
    dispatch(setMonitorId(monitor_id))
    navigate(url)
  }

  // 计算健康状态
  const getHealthyRate = (detail: TeamIF.ProjectHealthy) => {
    if (detail) {
      if (detail.pv == 0) {
        return 0
      }
      const { http_error, resources_error, js_error } = detail
      return +(100 - http_error / 3 - resources_error / 3 - js_error / 3).toFixed(2)
    }
    return 0
  }

  return (
    <div className="project-item">
      <div className="item-title">
        <div className="project-title-name flex-grow-1">{detail.project_name}</div>
        <div className="project-title-operation flex-grow-1">
          <Space size={20}>
            <p onClick={() => projectToUrl('/system/project', detail.monitor_id)}>
              <Tooltip placement="topLeft" title="修改配置">
                <EditOutlined style={{ color: '#a3a5b0' }} />
              </Tooltip>
            </p>
            <p onClick={() => projectToUrl('/user', detail.monitor_id)}>
              <Tooltip placement="topLeft" title="查看用户">
                <AppstoreOutlined style={{ color: '#a3a5b0' }} />
              </Tooltip>
            </p>
          </Space>
        </div>
      </div>
      <div className="item-content">
        <div className="project-quota">
          <div className="quota-item">
            <p style={{ color: '#ff6a00' }}>{detail?.pv}</p>
            <span className="quota-item-title">今日访问</span>
          </div>
          <div className="quota-item">
            <p>{detail?.uv}</p>
            <span className="quota-item-title">今日用户</span>
          </div>
        </div>
        <p>健康总分</p>
        <div className="flex health">
          <div className="flex-grow-0">
            <Progress
              strokeWidth={8}
              type="circle"
              style={{ marginLeft: '20px', marginTop: '10px' }}
              width={80}
              percent={getHealthyRate(detail)}
              format={percent => `${percent}`}
            />
          </div>
          <div className="flex-grow-1 health-rate">
            <span>
              <label></label> JS报错率：{detail?.js_error}%
            </span>
            <span>接口报错率：{detail?.http_error}%</span>
            <span>资源报错率：{detail?.resources_error}%</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface HealthStatusProps {
  list: TeamIF.ProjectHealthys
  openModal: () => void
}

export const HealthStatus: FC<HealthStatusProps> = ({ list, openModal }) => {
  return (
    <div className="project-list">
      <ProCard gutter={8} ghost wrap>
        {list.map((item, index) => {
          return (
            <ProCard key={index} colSpan={8} style={{ marginBottom: 8 }}>
              <HealthStatusItem detail={item} />
            </ProCard>
          )
        })}
        <ProCard colSpan={8} style={{ marginBottom: 8 }}>
          <div className="project-item">
            <div className="add-project">
              <PlusCircleOutlined className="add-icon" onClick={openModal} />
            </div>
          </div>
        </ProCard>
      </ProCard>
    </div>
  )
}
