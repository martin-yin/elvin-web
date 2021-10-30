import moment from 'moment'
import { useState } from 'react'

export const useFilterHeaderInit = () => {
  const [timePicker, setTimePicker] = useState({
    startTime: moment().format('YYYY-MM-DD'),
    endTime: moment().format('YYYY-MM-DD'),
    timeGrain: 'minute'
  })

  return { timePicker, setTimePicker }
}
