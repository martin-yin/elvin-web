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
