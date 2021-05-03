import { Card, Col, Empty, Row, Space } from 'antd'
import React, { FC, useCallback, useEffect, useState } from 'react'
import PvAndUvChartBarChar from '../../components/surveyChart/pvAndUvChart'
import { GetSurveyStatistics, GetSurveyPUvData } from '../../request'
import './index.less'
const SurveyPage: FC = () => {
  const [surveyStatistics, setSurveyStatistics] = useState({
    http_error: 0,
    js_error: 0,
    load_page: 1413.4,
    resources: 0
  })

  const [surveyPUvData, setSurveyPUvData] = useState([])
  const initSurveyStatistics = useCallback(async () => {
    const result = await GetSurveyStatistics()
    setSurveyStatistics(result.data)
  }, [])

  const initSurveyPUvData = useCallback(async () => {
    const result = await GetSurveyPUvData()
    setSurveyPUvData(result.data)
  }, [])

  // const [surveyJsErrorData, setSurveyJsErrorData] = useState([])

  // const initSurveyJsErrorData = useCallback(async () => {
  //   const result = await GetSurveyJsErrorData()
  //   setSurveyJsErrorData(result.data)
  // }, [])

  useEffect(() => {
    initSurveyStatistics()
    initSurveyPUvData()
    // initSurveyJsErrorData()
  }, [initSurveyStatistics, initSurveyPUvData])

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
            <div className="value">{surveyStatistics.js_error}</div>
            <div className="name">Js错误</div>
            <div className="desc"></div>
            {/** 这里当然要做同比日增加或者减少。*/}
          </Card>
          <Card className="surveyCardStatistics">
            <div className="value">{surveyStatistics.load_page}ms</div>
            <div className="name">首次渲染时间</div>
            <div className="desc"></div>
          </Card>
        </Col>
        <Col span={16}>
          <Card className="surveyCardStatisticsChart">
            <Space size={40}>
              <p></p>
            </Space>
            {surveyPUvData.length > 0 ? (
              <PvAndUvChartBarChar surveyPUvData={surveyPUvData} />
            ) : (
              <>
                <Empty />
              </>
            )}
          </Card>
        </Col>
        <Col span={4}>
          <Card className="surveyCardStatistics" style={{ marginBottom: '20px' }}>
            <div className="value">{surveyStatistics.http_error}</div>
            <div className="name">API异常</div>
            <div className="desc"></div>
          </Card>
          <Card className="surveyCardStatistics">
            <div className="value">{surveyStatistics.resources}</div>
            <div className="name">资源异常</div>
            <div className="desc"></div>
          </Card>
        </Col>
      </Row>
      <div className="chart"></div>
      {/* <Card title="JS报错"> */}
      {/** 每小时的JS报错，可以跟昨日做对比*/}
      {/* <PublicChart option={option} height="400px" />
      </Card> */}

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={16}>
          <Card>
            <Empty />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Empty />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default SurveyPage
