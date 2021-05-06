import React, { FC } from 'react'
import PublicChart from '../publicChart/publicChart'

const PerfprmanceBarChar: FC<any> = ({ perfprmance }) => {
  const option: any = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: perfprmance.map((item: any) => {
        return item.time_key
      })
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} ms'
      }
    },
    grid: {
      left: '14%',
      bottom: '8%'
    },
    series: [
      {
        data: perfprmance.map((item: any) => {
          return item.load_page
        }),
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

export default PerfprmanceBarChar
