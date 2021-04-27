import { InfoCircleFilled } from '@ant-design/icons/lib/icons'
import { Card, Col, Row, Statistic, Tooltip } from 'antd'
import React, { FC } from 'react'

const SurveyPage: FC = () => {
  return (
    <div>
      <p>核心数据</p>
      <Card className="header-quota">
        <p className="quota-tips">
          <Tooltip title="今日数据指标">
            <InfoCircleFilled style={{ fontSize: '16px', color: '#3399FF' }} />
          </Tooltip>
        </p>
        <div className="item">
          <Statistic title="访客数" value={99} suffix="" />
        </div>
        <div className="item">
          <Statistic title="浏览量(PV)" value={100} suffix="" />
        </div>
        <div className="item">
          <Statistic title="IP数" value={10} suffix="" />
        </div>
        <div className="item">
          <Statistic title="Js异常" value={0} suffix="" />
        </div>
        <div className="item">
          <Statistic title="资源异常" value={0} suffix="" />
        </div>
      </Card>
      <div style={{ marginTop: '20px' }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card>js异常</Card>
          </Col>
          <Col span={8}>
            <Card>Api成功率</Card>
          </Col>
          <Col span={8}>
            <Card>页面性能</Card>
          </Col>
        </Row>
      </div>
      <p>综合数据</p>
    </div>
  )
}

export default SurveyPage
