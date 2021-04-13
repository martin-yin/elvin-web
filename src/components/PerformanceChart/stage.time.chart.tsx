import React, { FC } from 'react'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent, DataZoomComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, LineChart, CanvasRenderer, DataZoomComponent])
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
      data: [
        '采样pv',
        '重定向',
        'DNS查询耗时',
        '缓存查询耗时',
        'TCP耗时',
        'SSL连接耗时',
        '首字节',
        '请求耗时',
        'DOM处理',
        'Event耗时',
        '完全加载'
      ]
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
          formatter: '{value} ms'
        }
      },
      {
        type: 'value',
        name: '采样pv',
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
        name: '采样pv',
        type: 'bar',
        data: stage_time.map(function (item: any) {
          return item.pv
        }),
        yAxisIndex: 1
      },
      {
        name: '重定向',
        type: 'line',
        smooth: true,
        data: stage_time.map(function (item: any) {
          return item.redirect
        })
      },
      {
        name: 'DNS查询耗时',
        smooth: true,
        type: 'line',
        data: stage_time.map(function (item: any) {
          return item.lookup_domain
        })
      },
      {
        name: '缓存查询耗时',
        smooth: true,
        type: 'line',
        data: stage_time.map(function (item: any) {
          return item.appcache
        })
      },
      {
        name: 'TCP耗时',
        smooth: true,
        type: 'line',
        data: stage_time.map(function (item: any) {
          return item.tcp
        })
      },
      {
        name: 'SSL连接耗时',
        smooth: true,
        type: 'line',
        data: stage_time.map(function (item: any) {
          return item.ssl_t
        })
      },
      {
        name: '首字节',
        smooth: true,
        type: 'line',
        data: stage_time.map(function (item: any) {
          return item.ttfb
        })
      },
      {
        name: '请求耗时',
        smooth: true,
        type: 'line',
        data: stage_time.map(function (item: any) {
          return item.request
        })
      },
      {
        name: 'DOM处理',
        smooth: true,
        type: 'line',
        data: stage_time.map(function (item: any) {
          return item.dom_parse
        })
      },
      {
        name: 'Event耗时',
        smooth: true,
        type: 'line',
        data: stage_time.map(function (item: any) {
          return item.load_event
        })
      },
      {
        name: '完全加载',
        smooth: true,
        type: 'line',
        data: stage_time.map(function (item: any) {
          return item.load_page
        })
      }
    ]
  }
  return (
    <div>
      <ReactEChartsCore
        style={{ height: '460px' }}
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  )
}

export default StageTimeChart
