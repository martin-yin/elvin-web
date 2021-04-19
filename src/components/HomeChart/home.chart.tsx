import React, { FC } from 'react'
import PublicChart from '../PublicChart/public.chart'

const HomeChart: FC<any> = () => {
  const option: any = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#FF6E76'],
              [0.5, '#FDDD60'],
              [0.75, '#58D9F9'],
              [1, '#7CFFB2']
            ]
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2
          }
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5
          }
        },
        axisLabel: {
          color: '#464646',
          fontSize: 20,
          distance: -60,
          formatter: function (value: any) {
            if (value === 0.875) {
              return '优'
            } else if (value === 0.625) {
              return '中'
            } else if (value === 0.375) {
              return '良'
            } else if (value === 0.125) {
              return '差'
            }
          }
        },
        title: {
          offsetCenter: [0, '-20%'],
          fontSize: 30
        },
        detail: {
          fontSize: 50,
          offsetCenter: [0, '0%'],
          valueAnimation: true,
          formatter: function (value: any) {
            return Math.round(value * 100) + '分'
          },
          color: 'auto'
        },
        data: [
          {
            value: 0.7,
            name: '成绩评定'
          }
        ]
      }
    ]
  }

  return (
    <div>
      <PublicChart option={option} height="200px" />
    </div>
  )
}

export default HomeChart