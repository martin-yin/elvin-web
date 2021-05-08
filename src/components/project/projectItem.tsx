import React, { FC } from 'react'
import { AppstoreOutlined, EditOutlined } from '@ant-design/icons'
import { Card, Col, Progress, Space, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setMonitorId } from '../../stores/app.store'
import { ProjectHealthy } from '../../interface/team.interface'

const ProjectItem: FC<any> = ({ item, index, health}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const projectSurvey = (monitor_id: string) => {
    dispatch(setMonitorId(monitor_id))
    history.push('/survey')
  }

  const getHealthyRate = (health: ProjectHealthy) => {
    let number = 0
    if (health?.http_error != 0) {
      number ++;
    }
    if (health?.resources_error != 0) {
      number ++;
    }
    if (health?.js_error != 0) {
      number ++;
    }
    console.log(number);
    return Number((100 - (health?.http_error / number) - (health?.resources_error / number) - (health?.js_error / number)).toFixed(2))
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
                <Tooltip placement="topLeft" title="修改配置">
                  <EditOutlined style={{ color: '#a3a5b0' }} />
                </Tooltip>
                <p onClick={() => projectSurvey(item.monitor_id)}>
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
                <span className="quota-item-title">用户</span>
              </div>
              <div className="quota-item">
                <p>0</p>
                <span className="quota-item-title">老用户</span>
              </div>
              <div className="quota-item">
                <p>0</p>
                <span className="quota-item-title">老用户</span>
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
