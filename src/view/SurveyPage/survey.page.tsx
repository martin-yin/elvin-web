import { InfoCircleFilled } from '@ant-design/icons/lib/icons'
import { Card, Col, Row, Space, Statistic, Tooltip } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import HttpBarChar from '../../components/surveyChart/httpChart'
import JsErrorBarChar from '../../components/surveyChart/jsErrorChart'
import PerfprmanceBarChar from '../../components/surveyChart/performanceChart'
import PvAndUvChartBarChar from '../../components/surveyChart/pvAndUvChart'
import { GetSurveyStatistics, GetSurveyPerformance } from '../../request'
import './index.less'
const SurveyPage: FC = () => {
  const [surveyStatistics, setSurveyStatistics] = useState({
    pv: 0,
    uv: 0,
    ip: 0,
    resources: 0,
    jsError: 0
  })

  const [surveyPerformance, setSurveyPerformance] = useState([])
  const initSurveyStatistics = useCallback(async () => {
    const result = await GetSurveyStatistics()
    setSurveyStatistics(result.data)
  }, [])

  const initSurveyPerformance = useCallback(async () => {
    const result = await GetSurveyPerformance()
    setSurveyPerformance(result.data)
  }, [])

  useEffect(() => {
    initSurveyStatistics()
    initSurveyPerformance()
  }, [initSurveyStatistics, initSurveyPerformance])

  return (
    <div>
      {/* 概况页面参考这个{' '}
      <a href="https://unpkg.com/@alifd/fusion-design-pro-js@0.2.6/build/index.html#/dashboard/monitor">
        https://unpkg.com/@alifd/fusion-design-pro-js@0.2.6/build/index.html#/dashboard/monitor
      </a> */}
      {/* https://github.com/alibaba-fusion/materials/blob/d65c5bdf92af917009993d95e95c2f9473476081/blocks/MonitorBlock/src/components/VisitBlock/index.tsx#L55 */}
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <Card className="surveyCardStatistics" style={{ marginBottom: '20px' }}>
            <div className="value">2556</div>
            <div className="name">Js错误</div>
            <div className="desc">2556</div>
          </Card>
          <Card className="surveyCardStatistics">
            <div className="value">2556ms</div>
            <div className="name">首次渲染时间</div>
            <div className="desc">2556</div>
          </Card>
        </Col>
        <Col span={16}>
          <Card className="surveyCardStatisticsChart">
            <Space size={40}>
              <p></p>
            </Space>
            <p>123</p>
            <p>123</p>
            <PvAndUvChartBarChar />
          </Card>
        </Col>
        <Col span={4}>
          <Card className="surveyCardStatistics" style={{ marginBottom: '20px' }}>
            <div className="value">2556</div>
            <div className="name">API异常</div>
            <div className="desc">2556</div>
          </Card>
          <Card className="surveyCardStatistics">
            <div className="value">2556</div>
            <div className="name">资源异常</div>
            <div className="desc">2556</div>
          </Card>
        </Col>
      </Row>
      <div className="chart"></div>
      <Card>12312</Card>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={16}>
          <Card>地图</Card>
        </Col>
        <Col span={8}>
          <Card>然后是浏览器</Card>
        </Col>
      </Row>
    </div>
  )
}

export default SurveyPage
