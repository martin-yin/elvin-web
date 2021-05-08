import React, { FC } from 'react'
import PublicChart from '../publicChart/publicChart'

const StageTimeChart: FC<any> = ({ stage_time }) => {
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
        name: '耗时',
        position: 'left',
        scale: true,
        axisLabel: {
          formatter: '{value} ms'
        }
      },
      {
        type: 'value',
        name: '采样pv',
        scale: true
      }
    ],
    dataZoom: [
      {
        startValue: ''
      },
      {
        type: 'inside'
      }
    ],
    series: [
      {
        name: '采样pv',
        type: 'bar',
        barMaxWidth: 16,
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
      <PublicChart option={option} height="460px" />
    </div>
  )
}

export default StageTimeChart
