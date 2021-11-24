import React from 'react'
import { DualAxes } from '@ant-design/charts'

export const PerformanceChart = React.memo<any>(({ performanceConsumes }) => {
  const config = {
    data: [performanceConsumes.pv, performanceConsumes.timeConsumes],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column',
        seriesField: 'type',
        columnWidthRatio: 0.1
      },
      {
        geometry: 'line',
        smooth: true,
        seriesField: 'name'
      }
    ]
  }

  return (
    <>
      {performanceConsumes.pv.length > 0 ? (
        <>
          <DualAxes {...config} />
        </>
      ) : (
        <></>
      )}
    </>
  )
})
