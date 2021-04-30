import React, { FC } from 'react'
import PublicChart from '../publicChart/public.chart'
import * as echarts from 'echarts/core'
const PvAndUvChartBarChar: FC<any> = () => {
  const option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['20:00', '21:00', '22:00', '23:00', '24:00']
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
        type: 'value'
      }
    ],
    series: [
      {
        name: 'UV',
        data: [120, 60, 132, 101, 134, 90, 230, 210],
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
        data: [120, 132, 101, 134, 90, 230, 210],
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
      <PublicChart option={option} height="290px" />
    </div>
  )
}

export default PvAndUvChartBarChar
