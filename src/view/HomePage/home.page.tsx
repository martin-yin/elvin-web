import { AppstoreOutlined, EditOutlined } from '@ant-design/icons'
import { Card, Col, Row, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CreateProject from '../../components/project/createProject'
import { useAppState } from '../../stores'
import { setMonitorId } from '../../stores/app.store'

import './index.less'
const HomePage: FC = () => {
  const { projectList } = useAppState(state => state.appsotre)
  const dispatch = useDispatch()
  const history = useHistory()

  console.log(projectList)

  const projectSurvey = (monitor_id: string) => {
    dispatch(setMonitorId(monitor_id))
    history.push('/survey')
  }
  return (
    <>
      <div>
        <div className="project-list">
          <Row gutter={[16, 16]}>
            {projectList.length > 0 ? (
              projectList.map((item: any, index) => {
                return (
                  <Col key={index} span={8}>
                    <Card>
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
                              <p style={{ color: '#ff6a00' }}>8000</p>
                              <span className="quota-item-title">今日访问</span>
                            </div>
                            <div className="quota-item">
                              <p>0</p>
                              <span className="quota-item-title">新用户</span>
                            </div>
                            <div className="quota-item">
                              <p>0</p>
                              <span className="quota-item-title">老用户</span>
                            </div>
                          </div>
                          <p>健康总分</p>
                          <div className="flex health">
                            <div className="flex-grow-0">{/* <HomeChart /> */}</div>
                            <div className="flex-grow-1 health-rate">
                              <span>
                                <label></label> JS报错率：28.08%
                              </span>
                              <span>接口报错率：0.23%</span>
                              <span>资源报错率：5.93%</span>
                              <span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                )
              })
            ) : (
              <>
                <CreateProject />
              </>
            )}
          </Row>
        </div>
      </div>
    </>
  )
}

export default HomePage
