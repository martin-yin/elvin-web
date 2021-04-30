import React, { FC } from 'react'
import PublicChart from '../publicChart/public.chart'

const JsErrorBarChar: FC<any> = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      left: '14%',
      bottom: '8%'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barMaxWidth: 12
      }
    ]
  }

  return (
    <div>
      <PublicChart option={option} height="410px" />
    </div>
  )
}

export default JsErrorBarChar
