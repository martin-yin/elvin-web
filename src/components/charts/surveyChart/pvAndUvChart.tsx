import React, { FC } from 'react'
import PublicChart from '../publicChart/publicChart'
import * as echarts from 'echarts/core'
const PvAndUvChartBarChar: FC<any> = ({ surveyPUvData }) => {
  const option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: surveyPUvData.map((item: any) => {
        return item.time_key
      })
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff'
    },
    legend: {
      data: ['UV', 'PV']
    },
    yAxis: [
      {
        type: 'value',
        scale: true
      }
    ],
    series: [
      {
        name: 'UV',
        data: surveyPUvData.map((item: any) => {
          return item.uv
        }),
        type: 'line',
        itemStyle: {
          color: '#FFCE03'
        },
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(253,250,242)'
            },
            {
              offset: 1,
              color: 'rgba(255,245,205)'
            }
          ])
        }
      },
      {
        name: 'PV',
        type: 'line',
        data: surveyPUvData.map((item: any) => {
          return item.pv
        }),
        smooth: true,
        itemStyle: {
          color: '#00C1DE'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(221,246,250)'
            },
            {
              offset: 1,
              color: 'rgba(244,252,253)'
            }
          ])
        }
      }
    ]
  }

  return (
    <div>
      <PublicChart option={option} height="390px" />
    </div>
  )
}

export default PvAndUvChartBarChar
