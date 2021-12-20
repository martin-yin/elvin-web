import React, { useMemo } from 'react'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { JsErrIF } from '../../../interface/jsErr.interface'
import { getJsError } from '../../../request'

const defaultJsErrData: JsErrIF.JsErrData = {
  jsErr: null,
  error_id: null,
  issue_id: null,
  visible: false,
  stackFrames: [],
  stackFrame: {
    url: '',
    line: 0,
    column: 0,
    index: 0
  }
}
export interface JsErrProviderState {
  jsErrData: JsErrIF.JsErrData
  handleOpenSourceMapModal: (item: JsErrIF.StackFrame, index: number) => void
  handleSetOriginSource: (sourceCode: JsErrIF.StackFrame['originSource'], index: number, stackFrames) => void
  handleCloseModal: () => void
  handleChangeIssueId: (error_id: number, isssue_id: number) => void
}

export const JsErrContext = createContext<JsErrProviderState>({
  jsErrData: defaultJsErrData,
  handleOpenSourceMapModal(item: JsErrIF.StackFrame, index: number) {
    throw new Error('JsErrContext not yet initialized.')
  },
  handleSetOriginSource(sourceCode: JsErrIF.StackFrame['originSource'], index: number, stackFrames) {
    throw new Error('JsErrContext not yet initialized.')
  },
  handleCloseModal() {
    throw new Error('JsErrContext not yet initialized.')
  },
  handleChangeIssueId(error_id: number, isssue_id: number) {
    throw new Error('JsErrContext not yet initialized.')
  }
})

export const useJsErrContext = () => {
  const value = useContext(JsErrContext)
  return value
}

export const JsErrorProvider = ({ children }) => {
  const params = useParams<'error_id'>()
  defaultJsErrData.error_id = +params.error_id
  const [jsErrData, setJsErrData] = useState(defaultJsErrData)

  const handleSetOriginSource = useCallback((sourceCode, index, stackFrames) => {
    stackFrames[index].originSource = {
      ...sourceCode
    }
    setJsErrData(value => ({ ...value, stackFrames, visible: false }))
  }, [])

  const handleOpenSourceMapModal = useCallback((item, index: number) => {
    setJsErrData(value => ({
      ...value,
      stackFrame: {
        url: item.fileName + '.map',
        line: item.lineNumber,
        column: item.columnNumber,
        index: index
      },
      visible: true
    }))
  }, [])

  const handleChangeIssueId = useCallback((issue_id: number) => {
    setJsErrData(value => ({
      ...value,
      issue_id
    }))
  }, [])

  const handleCloseModal = useCallback(() => {
    setJsErrData(value => ({
      ...value,
      visible: false
    }))
  }, [])

  const initJsErrData = useCallback((error_id: number, issue_id) => {
    ;(async () => {
      const result = await getJsError({
        issue_id,
        error_id
      })
      setJsErrData(value => ({
        ...value,
        visible: false,
        jsErr: result.data,
        stackFrames: JSON.parse(result.data.stack_frames)
      }))
    })()
  }, [])

  useEffect(() => {
    initJsErrData(jsErrData.error_id, jsErrData.issue_id)
  }, [jsErrData.error_id && jsErrData.issue_id])

  const value = useMemo(
    () => ({
      jsErrData,
      handleSetOriginSource,
      handleOpenSourceMapModal,
      handleCloseModal,
      handleChangeIssueId
    }),
    [jsErrData, handleSetOriginSource, handleOpenSourceMapModal, handleCloseModal, handleChangeIssueId]
  )
  return <JsErrContext.Provider value={value}>{children}</JsErrContext.Provider>
}
