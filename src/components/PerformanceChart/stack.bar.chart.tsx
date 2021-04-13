import React, { FC } from 'react'
import PublicChart from '../PublicChart/public.chart'

const StackBarChar: FC<any> = ({ stack }) => {
  const option: any = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff'
    },
    legend: {
      data: [
        '重定向耗时(redirect)',
        '缓存查询耗时(appcache)',
        'DNS查询耗时(lookup_domain)',
        'TCP耗时(tcp)',
        '首字节(TTFB)',
        '请求耗时(request)',
        'dom处理耗时(dom_parse)',
        'dom事件(load_event)'
      ]
    },
    xAxis: {
      type: 'value'
    },
    height: '100',
    yAxis: {
      type: 'category',
      data: ['']
    },
    series: [
      {
        name: '重定向耗时(redirect)',
        type: 'bar',
        stack: 'total',
        data: [stack.redirect]
      },
      {
        name: '缓存查询耗时(appcache)',
        type: 'bar',
        stack: 'total',
        data: [stack.appcache]
      },
      {
        name: 'DNS查询耗时(lookup_domain)',
        type: 'bar',
        stack: 'total',
        data: [stack.lookup_domain]
      },
      {
        name: 'TCP耗时(tcp)',
        type: 'bar',
        stack: 'total',
        data: [stack.tcp]
      },
      {
        name: '首字节(TTFB)',
        type: 'bar',
        stack: 'total',
        data: [stack.ttfb]
      },
      {
        name: '请求耗时(request)',
        type: 'bar',
        stack: 'total',
        data: [stack.request]
      },
      {
        name: 'dom处理耗时(dom_parse)',
        type: 'bar',
        stack: 'total',
        data: [stack.dom_parse]
      },
      {
        name: 'dom事件(load_event)',
        type: 'bar',
        stack: 'total',
        data: [stack.load_event]
      }
    ]
  }

  return (
    <div>
      <PublicChart option={option} height="200px" />
    </div>
  )
}

export default StackBarChar
