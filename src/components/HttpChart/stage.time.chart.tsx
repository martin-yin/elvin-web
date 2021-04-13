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
const HttpStageTimeChart: FC<any> = ({ stageTime = [], stageType = 'success' }) => {
  const dateTime = new Date()
  const startTime = ('0' + (dateTime.getHours() - 1)).slice(-2) + ':00'
  console.log(startTime)
  const option: any = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff'
    },
    // yAxis: [
    //   {
    //     type: 'value',
    //     name: '',
    //     position: 'left',
    //     axisLabel: {
    //       formatter: '{value}'
    //     },
    //     max: 100
    //   },
    //   {
    //     type: 'value',
    //     name: '请求数量'
    //   }
    // ],
    yAxis: [
      {
        type: 'value',
        name: '成功率',
        position: 'left',
        axisLabel: {
          formatter: '{value} %'
        }
      }
    ],
    dataZoom: [
      {
        startValue: startTime
      },
      {
        type: 'inside'
      }
    ]
  }
  const errorOption = {
    ...option,
    legend: {
      data: ['请求数量', '失败次数', '请求耗时']
    },
    xAxis: {
      data:
        stageTime.length == 0
          ? []
          : stageTime.map(function (item: any) {
              return item.time_key
            })
    },
    series: [
      {
        name: '请求数量',
        type: 'line',
        smooth: true,
        data: stageTime.map(function (item: any) {
          return item.total
        })
      },
      {
        name: '失败次数',
        type: 'line',
        smooth: true,
        data: stageTime.map(function (item: any) {
          return item.fail_total
        })
      },
      {
        name: '请求耗时',
        type: 'bar',
        smooth: true,
        data: stageTime.map(function (item: any) {
          return item.load_time
        })
      }
    ]
  }

  const successOption = {
    ...option,
    legend: {
      data: ['请求数量', '成功率']
    },
    yAxis: [
      {
        type: 'value',
        name: '',
        position: 'left',
        axisLabel: {
          formatter: '{value}'
        }
      },
      {
        type: 'value',
        name: '成功率',
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    xAxis: {
      data:
        stageTime.length == 0
          ? []
          : stageTime.map(function (item: any) {
              return item.time_key
            })
    },
    series: [
      {
        name: '请求数量',
        type: 'bar',
        smooth: true,
        data: stageTime.map(function (item: any) {
          return item.total
        }),
        yAxisIndex: 0
      },
      {
        name: '成功率',
        type: 'line',
        smooth: true,
        data: stageTime.map(function (item: any) {
          return item.success_rate
        })
      }
    ]
  }

  return (
    <div>
      <PublicChart option={stageType === 'success' ? successOption : errorOption} height="450px" />
    </div>
  )
}

export default HttpStageTimeChart
