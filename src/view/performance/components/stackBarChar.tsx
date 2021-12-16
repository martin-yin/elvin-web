import React, { useEffect } from 'react'
import { AllBaseConfig, Column, ColumnConfig, Plot } from '@ant-design/charts'

export const StackBarChar = React.memo<any>(({ stackConsumes }) => {
  let ref: Plot<AllBaseConfig>
  useEffect(() => {
    ref.chart.coordinate('rect').transpose()
  }, [])

  const config: ColumnConfig = {
    data: stackConsumes,
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
