import React, { FC } from 'react'
import * as echarts from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent, DataZoomComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import PublicChart from '../publicChart/publicChart'
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LineChart,
  DataZoomComponent,
  LegendComponent
])
const HttpStageTimeChart: FC<any> = ({ stageTime = [] }) => {
  const successOption = {
    color: ['#4395ff', '#91CB75'],
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff'
    },
    dataZoom: [
      {
        startValue: ''
      },
      {
        type: 'inside'
      }
    ],
    legend: {
      data: ['请求数量', '请求耗时']
    },
    yAxis: [
      {
        type: 'value',
        name: '耗时',
        position: 'left',
        interval: 3000,
        axisLabel: {
          formatter: '{value} ms'
        }
      },
      {
        type: 'value',
        name: '请求数量',
        interval: 1000,
        splitLine: {
          show: false
        }
      }
    ],
    xAxis: {
      data:
        stageTime.length !== 0
          ? stageTime.map(function (item: any) {
              return item.time_key
            })
          : []
    },
    series: [
      {
        name: '请求数量',
        type: 'bar',
        smooth: true,
        barMaxWidth: 16,
        data:
          stageTime.length !== 0
            ? stageTime.map(function (item: any) {
                return item.total
              })
            : [],
        yAxisIndex: 1
      },
      {
        name: '请求耗时',
        type: 'line',
        smooth: true,
        data:
          stageTime.length !== 0
            ? stageTime.map(function (item: any) {
                return item.load_time
              })
            : []
      }
    ]
  }

  return (
    <div>
      <PublicChart option={successOption} height="450px" />
    </div>
  )
}

export default HttpStageTimeChart
