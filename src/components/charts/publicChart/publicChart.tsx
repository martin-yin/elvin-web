import React, { FC } from 'react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent, DataZoomComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  LineChart,
  PieChart,
  CanvasRenderer,
  DataZoomComponent,
  LegendComponent
])

const PublicChart: FC<any> = ({ option, height }) => {
  if (!option.color) {
    Object.assign(option, {
      color: [
        '#4395ff',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
        '#ff8c00',
        '#F5DEB3'
      ]
    })
  }

  Object.assign(option, {
    grid: {
      left: '2%',
      right: '2%',
      top: '10%',
      bottom: '2%',
      containLabel: true
    }
  })
  return (
    <div>
      <ReactEChartsCore
        style={{ height: height }}
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  )
}

export default PublicChart
