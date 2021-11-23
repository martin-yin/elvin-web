import { Form } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Issue } from '../../../interface/issue.interface'
import { GetIssuesDetail } from '../../../request'
import { useModalHook } from '../../../utils/useHookTools'

interface StackFram {
  url: string
  line: number
  column: number
  index: number
}

export const useJsErrDeatilInit = () => {
  const [form] = Form.useForm()
  const params = useParams<'error_id'>()
  const [visible, handleOpenModal, handleCloseModal] = useModalHook()
  const [stackFrames, setStackFrames] = useState<Issue.StackFramesList>([])
  const [issue, setIssue] = useState<Issue.Issue>()
  const [stackFrame, setStackFrame] = useState<StackFram>({
    url: '',
    line: 0,
    column: 0,
    index: 0
  })

  useEffect(() => {
    ;(async () => {
      const result = await GetIssuesDetail({
        issue_id: +params.error_id,
        error_id: 0
      })
      setIssue(result.data)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const result = await GetIssuesDetail({
        issue_id: +params.error_id,
        error_id: 0
      })
      setStackFrames(JSON.parse(result.data.stack_frames))
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
    issue,
    setIssue,
    visible,
    stackFrames,
    setStackFrames,
    handleSetOriginSource,
    stackFrame,
    setStackFrame,
    handleCloseModal,
    handleOpenSourceMapModal
  }
}
