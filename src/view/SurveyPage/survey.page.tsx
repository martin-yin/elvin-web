import { InfoCircleFilled } from '@ant-design/icons/lib/icons'
import { Card, Col, Row, Statistic, Tooltip } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import HttpBarChar from '../../components/surveyChart/httpChart'
import JsErrorBarChar from '../../components/surveyChart/jsErrorChart'
import PerfprmanceBarChar from '../../components/surveyChart/performanceChart'
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
    console.log(surveyPerformance)
  }, [])

  useEffect(() => {
    initSurveyStatistics()
    initSurveyPerformance()
  }, [initSurveyStatistics, initSurveyPerformance])

  return (
    <div>
      <Card className="header-quota">
        <p className="quota-tips">
          <Tooltip title="今日数据指标">
            <InfoCircleFilled style={{ fontSize: '16px', color: '#3399FF' }} />
          </Tooltip>
        </p>
        <div className="item">
          <Statistic title="访客数" value={surveyStatistics.uv} suffix="" />
        </div>
        <div className="item">
          <Statistic title="浏览量(PV)" value={surveyStatistics.pv} suffix="" />
        </div>
        <div className="item">
          <Statistic title="IP数" value={surveyStatistics.ip} suffix="" />
        </div>
        <div className="item">
          <Statistic title="Js异常" value={surveyStatistics.jsError} suffix="" />
        </div>
        <div className="item">
          <Statistic title="资源异常" value={surveyStatistics.resources} suffix="" />
        </div>
      </Card>
      <div className="chart">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card>
              <JsErrorBarChar />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <HttpBarChar />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              {surveyPerformance.length !== 0 ? <PerfprmanceBarChar perfprmance={surveyPerformance} /> : <></>}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default SurveyPage
