import React, { FC } from 'react'
import PublicChart from '../publicChart/public.chart'

const LoadTimePieChar: FC<any> = () => {
  const option: any = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '30%'],
        avoidLabelOverlap: false,
        data: [
          { value: 426.69, name: 'http://test.dancin.cn/#/' },
          { value: 341.98, name: 'http://test.dancin.cn/#/about' },
          { value: 341.98, name: 'http://test.dancin.cn/#/about' },
          { value: 341.98, name: 'http://test.dancin.cn/#/about' },
          { value: 341.98, name: 'http://test.dancin.cn/#/about' },
          { value: 341.98, name: 'http://test.dancin.cn/#/about' },
          { value: 341.98, name: 'http://test.dancin.cn/#/about' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  return (
    <div>
      <PublicChart option={option} height="200px" />
    </div>
  )
}

export default LoadTimePieChar
