import React from 'react'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getJsError } from '../../../request'

export const JsErrContext = createContext<any>(null)

export const useJsErrContext = () => {
  const value = useContext(JsErrContext)
  return value
}

export const JsErrorProvider = ({ value = {}, children }) => {
  const [state, setState] = useState(value)
  const updateState = (value = {}) => {
    setState({
      ...state,
      ...value
    })
  }
  return <JsErrContext.Provider value={[state, updateState]}>{children}</JsErrContext.Provider>
}

export const useJsErrDeatilInit = (jsErrorContext, setJsErrContxt) => {
  const params = useParams<'error_id'>()
  const handleSetOriginSource = useCallback((originSource, value) => {
    const { stackFrames } = value
    stackFrames[originSource.index].originSource = {
      ...originSource
    }
    setJsErrContxt({
      ...value,
      stackFrames,
      visible: false
    })
  }, [])

  const handleOpenSourceMapModal = (item, index, value) => {
    setJsErrContxt({
      ...value,
      stackFrame: {
        url: item.fileName + '.map',
        line: item.lineNumber,
        column: item.columnNumber,
        index: index
      },
      visible: true
    })
  }

  const handleCloseModal = value => {
    setJsErrContxt({
      ...value,
      visible: true
    })
  }

  useEffect(() => {
    ;(async () => {
      const result = await getJsError({
        issue_id: +params.error_id,
        error_id: 0
      })
      setJsErrContxt({
        ...jsErrorContext,
        visible: false,
        handleCloseModal,
        jsErr: result.data,
        handleOpenSourceMapModal,
        stackFrames: JSON.parse(result.data.stack_frames),
        handleSetOriginSource
      })
    })()
  }, [])

  return jsErrorContext
}
