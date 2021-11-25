import { DualAxes } from '@ant-design/charts'
import React from 'react'

export const HttpChart = React.memo<any>(({ httpConsumes }) => {
  const config = {
    data: [httpConsumes.total, httpConsumes.timeConsumes],
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
      {httpConsumes.total.length > 0 ? (
        <>
          <DualAxes {...config} />
        </>
      ) : (
        <></>
      )}
    </>
  )
})
