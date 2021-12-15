import { Form } from 'antd'
import React from 'react'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { JsErrIF } from '../../../interface/jsErr.interface'
import { getJsError } from '../../../request'
import { useModalHook } from '../../../utils/useHookTools'

interface StackFram {
  url: string
  line: number
  column: number
  index: number
}

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
  const [form] = Form.useForm()
  const params = useParams<'error_id'>()
  const [visible, handleOpenModal, handleCloseModal] = useModalHook()
  const [stackFrames, setStackFrames] = useState<JsErrIF.StackFramesList>([])
  // const [jsErr, setJsErr] = useState<JsErrIF.JsErr>()
  const [stackFrame, setStackFrame] = useState<StackFram>({
    url: '',
    line: 0,
    column: 0,
    index: 0
  })

  useEffect(() => {
    ;(async () => {
      const result = await getJsError({
        issue_id: +params.error_id,
        error_id: 0
      })
      setJsErrContxt({
        ...jsErrorContext,
        visible,
        jsErr: result.data,
        stackFrames: JSON.parse(result.data.stack_frames)
      })
    })()
  }, [])

  const handleSetOriginSource = useCallback(originSource => {
    stackFrames[originSource.index].originSource = {
      ...originSource
    }
    setStackFrames(stackFrames)
    handleCloseModal()
  }, [])

  const handleOpenSourceMapModal = useCallback((item, index) => {
    form.setFieldsValue({
      url: item.fileName + '.map'
    })
    setStackFrame({
      url: item.fileName + '.map',
      line: item.lineNumber,
      column: item.columnNumber,
      index: index
    })
    handleOpenModal()
  }, [])

  return {
    visible,
    stackFrames,
    setStackFrames
    // handleSetOriginSource,
    // stackFrame,
    // setStackFrame,
    // handleCloseModal,
    // handleOpenSourceMapModal
  }
}
