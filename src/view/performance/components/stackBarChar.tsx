import React, { useEffect } from 'react'
import { Column } from '@ant-design/charts'

export const StackBarChar = React.memo<any>(({ stackChartData }) => {
  let ref
  useEffect(() => {
    ref.chart.coordinate('rect').transpose()
  }, [])

  const config = {
    data: stackChartData,
    isStack: true,
    xField: 'title',
    yField: 'value',
    seriesField: 'type',
    legend: {
      position: 'top'
    },
    tooltip: {
      title: '页面加载各阶段请求耗时'
    },
    label: {
      position: 'bottom',
      layout: [
        {
          type: 'interval-adjust-position'
        },
        {
          type: 'interval-hide-overlap'
        },
        {
          type: 'adjust-color'
        }
      ]
    }
  }
  return <Column style={{ height: 140 }} {...config} chartRef={chartRef => (ref = chartRef)} />
})
