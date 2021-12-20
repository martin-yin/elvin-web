import moment from 'moment'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

interface FilterHeaderIF {
  filterHeaderParams: FilterHeaderParams
  handleTimeChange: (dates, dateString: [string, string]) => void
  handleFilterHeaderLabelChange: (label: string, value: string) => void
}

export interface FilterHeaderParams {
  startTime: string
  endTime: string
  sessionId: string
  userId: string
}

const defaultFilterHeaderData: FilterHeaderParams = {
  startTime: moment().format('YYYY-MM-DD'),
  endTime: moment().format('YYYY-MM-DD'),
  sessionId: '',
  userId: ''
}
export const FilterHeaderContext = createContext<FilterHeaderIF>({
  filterHeaderParams: {
    startTime: moment().format('YYYY-MM-DD'),
    endTime: moment().format('YYYY-MM-DD'),
    sessionId: '',
    userId: ''
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
  const [filterHeaderParams, setFilterHeaderParams] = useState<FilterHeaderParams>(defaultFilterHeaderData)

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
