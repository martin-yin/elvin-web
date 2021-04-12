import React, { FC } from 'react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer])

const StageTimeChart: FC<any> = ({ stage_time }) => {
  const dateTime = new Date()
  const startTime = ('0' + (dateTime.getHours() - 1)).slice(-2) + ':00'

  const option: any = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff'
    },
    legend: {
      data: ['请求数量', '成功率', '请求耗时']
    },
    xAxis: {
      data: stage_time.map(function (item: any) {
        return item.time_key
      })
    },
    yAxis: [
      {
        type: 'value',
        name: '',
        position: 'left',
        axisLabel: {
          formatter: '{value} %'
        },
        max: 100
      },
      {
        type: 'value',
        name: '请求数量',
        min: 0
      }
    ],
    dataZoom: [
      {
        startValue: startTime
      },
      {
        type: 'inside'
      }
    ],
    series: [
      {
        name: '请求数量',
        type: 'bar',
        data: stage_time.map(function (item: any) {
          return item.total
        }),
        yAxisIndex: 1
      },
      {
        name: '成功率',
        type: 'line',
        data: stage_time.map(function (item: any) {
          return item.success_rate
        })
      },
      {
        name: '请求耗时',
        type: 'line',
        data: stage_time.map(function (item: any) {
          return item.load_time
        })
      }
    ]
  }

  return (
    <div>
      <ReactEChartsCore echarts={echarts} option={option} notMerge={true} lazyUpdate={true} theme={'theme_name'} />
    </div>
  )
}

export default StageTimeChart