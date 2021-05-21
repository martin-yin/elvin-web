import React, { FC } from 'react'
import { AppstoreOutlined, EditOutlined } from '@ant-design/icons'
import { Card, Col, Progress, Space, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setMonitorId } from '../../stores/app.store'
import { TeamIF } from '../../interface'

const ProjectItem: FC<any> = ({ item, index, health }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const projectToUrl = (url: string, monitor_id: string) => {
    dispatch(setMonitorId(monitor_id))
    history.push(url)
  }

  const getHealthyRate = (health: TeamIF.ProjectHealthy) => {
    if (health) {
      if (health.pv == 0) {
        return 0
      }
      const { http_error, resources_error, js_error } = health
      return +(100 - http_error / 3 - resources_error / 3 - js_error / 3).toFixed(2)
    }
    return 0
  }

  return (
    <Col key={index} span={8}>
      <Card>
        {}
        <div className="project-item">
          <div className="item-title">
            <div className="project-title-name flex-grow-1">{item.project_name}</div>
            <div className="project-title-operation flex-grow-1">
              <Space size={20}>
                <p onClick={() => projectToUrl('/project', item.monitor_id)}>
                  <Tooltip placement="topLeft" title="修改配置">
                    <EditOutlined style={{ color: '#a3a5b0' }} />
                  </Tooltip>
                </p>
                <p onClick={() => projectToUrl('/survey', item.monitor_id)}>
                  <Tooltip placement="topLeft" title="查看概况">
                    <AppstoreOutlined style={{ color: '#a3a5b0' }} />
                  </Tooltip>
                </p>
              </Space>
            </div>
          </div>
          <div className="item-content">
            <div className="project-quota">
              <div className="quota-item">
                <p style={{ color: '#ff6a00' }}>{health?.pv}</p>
                <span className="quota-item-title">今日访问</span>
              </div>
              <div className="quota-item">
                <p>{health?.uv}</p>
                <span className="quota-item-title">今日用户</span>
              </div>
              {/* <div className="quota-item">
                <p>0</p>
                <span className="quota-item-title">老用户</span>
              </div>
              <div className="quota-item">
                <p>0</p>
                <span className="quota-item-title">老用户</span>
              </div> */}
            </div>
            <p>健康总分</p>
            <div className="flex health">
              <div className="flex-grow-0">
                <Progress
                  strokeWidth={8}
                  type="circle"
                  style={{ marginLeft: '20px', marginTop: '10px' }}
                  width={80}
                  percent={getHealthyRate(health)}
                  format={percent => `${percent}`}
                />
              </div>
              <div className="flex-grow-1 health-rate">
                <span>
                  <label></label> JS报错率：{health?.js_error}%
                </span>
                <span>接口报错率：{health?.http_error}%</span>
                <span>资源报错率：{health?.resources_error}%</span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Col>
  )
}

export default ProjectItem
