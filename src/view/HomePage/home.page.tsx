import { AppstoreOutlined, EditOutlined } from '@ant-design/icons'
import { Avatar, Card, Divider, Space, Statistic, Tooltip, Typography } from 'antd'
import React, { FC } from 'react'
import HomeChart from '../../components/HomeChart/home.chart'
import './index.less'
const HomePage: FC = () => {
  return (
    <>
      <div>
        <div className="project-list">
          <div className="project-item">
            <div className="item-title">
              <div className="project-title-name flex-grow-1">🐕鸡巴前端项目</div>
              <div className="project-title-operation flex-grow-1">
                <Space size={20}>
                  <Tooltip placement="topLeft" title="Prompt Text">
                    <EditOutlined style={{ color: '#a3a5b0' }} />
                  </Tooltip>
                  <Tooltip placement="topLeft" title="Prompt Text">
                    <AppstoreOutlined style={{ color: '#a3a5b0' }} />
                  </Tooltip>
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

          <div className="project-item">
            <div className="item-title">
              <div className="project-title-name flex-grow-1">🐕鸡巴前端项目</div>
              <div className="project-title-operation flex-grow-1">
                <Space size={20}>
                  <EditOutlined style={{ color: '#a3a5b0' }} />
                  <AppstoreOutlined style={{ color: '#a3a5b0' }} />
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

          <div className="project-item">
            <div className="item-title">
              <div className="project-title-name flex-grow-1">🐕鸡巴前端项目</div>
              <div className="project-title-operation flex-grow-1">
                <Space size={20}>
                  <EditOutlined style={{ color: '#a3a5b0' }} />
                  <AppstoreOutlined style={{ color: '#a3a5b0' }} />
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
          <div className="project-item">
            <div className="item-title">
              <div className="project-title-name flex-grow-1">🐕鸡巴前端项目</div>
              <div className="project-title-operation flex-grow-1">
                <Space size={20}>
                  <EditOutlined style={{ color: '#a3a5b0' }} />
                  <AppstoreOutlined style={{ color: '#a3a5b0' }} />
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
        </div>
      </div>
    </>
  )
}

export default HomePage
