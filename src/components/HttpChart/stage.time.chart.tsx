import React, { FC } from 'react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent, LegendComponent, DataZoomComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import PublicChart from '../PublicChart/public.chart'
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
  const dateTime = new Date()
  const startTime = ('0' + (dateTime.getHours() - 1)).slice(-2) + ':00'

  const successOption = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff'
    },
    dataZoom: [
      {
        startValue: startTime
      },
      {
        type: 'inside'
      }
    ],
    legend: {
      data: ['请求耗时', '请求数量']
    },
    yAxis: [
      {
        type: 'value',
        name: '耗时',
        position: 'left',
        interval: 1000,
        axisLabel: {
          formatter: '{value} ms'
        }
      },
      {
        type: 'value',
        name: '请求数量',
        splitLine: {
          show: false
        }
      }
    ],
    xAxis: {
      data: stageTime.map(function (item: any) {
        return item.time_key
      })
    },
    series: [
      {
        name: '请求耗时',
        type: 'line',
        smooth: true,
        data: stageTime.map(function (item: any) {
          return item.load_time
        })
      },
      {
        name: '请求数量',
        type: 'bar',
        smooth: true,
        barMaxWidth: 16,
        data: stageTime.map(function (item: any) {
          return item.total
        }),
        yAxisIndex: 1
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
