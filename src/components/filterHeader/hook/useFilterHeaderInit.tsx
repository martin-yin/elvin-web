import moment from 'moment'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

interface FilterHeaderIF {
  filterHeaderParams: filterHeaderParamsIF
  handleTimeChange: (dates, dateString: [string, string]) => void
  handleFilterHeaderLabelChange: (label: string, value: string) => void
}

interface filterHeaderParamsIF {
  startTime: string
  endTime: string
  session_id: string
  uuid: string
}

const defaultFilterHeaderData: filterHeaderParamsIF = {
  startTime: moment().format('YYYY-MM-DD'),
  endTime: moment().format('YYYY-MM-DD'),
  session_id: '',
  uuid: ''
}
export const FilterHeaderContext = createContext<FilterHeaderIF>({
  filterHeaderParams: {
    startTime: moment().format('YYYY-MM-DD'),
    endTime: moment().format('YYYY-MM-DD'),
    session_id: '',
    uuid: ''
  },
  handleTimeChange: (dates, dateString: [string, string]) => {
    throw new Error('FilterHeaderContext not yet initialized.')
  },
  handleFilterHeaderLabelChange: (label: string, labelValue: string) => {
    throw new Error('FilterHeaderContext not yet initialized.')
  }
})

export const useFilterHeaderContext = () => {
  const value = useContext<FilterHeaderIF>(FilterHeaderContext)
  return value
}

export const FilterHeaderProvider = ({ children }) => {
  const [filterHeaderParams, setFilterHeaderParams] = useState<filterHeaderParamsIF>(defaultFilterHeaderData)

  const handleTimeChange = useCallback((dates, dateString: [string, string]) => {
    setFilterHeaderParams(v => ({ ...v, startTime: dateString[0], endTime: dateString[1] }))
  }, [])

  const handleFilterHeaderLabelChange = useCallback((label: string, labelValue: string) => {
    setFilterHeaderParams(value => ({
      ...value
    }))
  }, [])

  const value = useMemo(
    () => ({
      filterHeaderParams,
      handleTimeChange,
      handleFilterHeaderLabelChange
    }),
    [filterHeaderParams, handleTimeChange, handleFilterHeaderLabelChange]
  )
  return <FilterHeaderContext.Provider value={value}>{children}</FilterHeaderContext.Provider>
}
