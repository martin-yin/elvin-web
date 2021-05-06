import React, { FC } from 'react'
import PublicChart from '../publicChart/publicChart'

const HttpBarChar: FC<any> = () => {
  const option: any = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
      interval: 20,
      axisLabel: {
        formatter: '{value} %'
      }
    },
    grid: {
      left: '14%',
      bottom: '8%'
    },
    series: [
      {
        data: [20, 100, 100, 100, 99, 100, 100],
        type: 'line',
        smooth: true,
        areaStyle: {}
      }
    ]
  }

  return (
    <div>
      <PublicChart option={option} height="410px" />
    </div>
  )
}

export default HttpBarChar
