import { Form, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { projectInteractor } from '../../../core/interactors'
import { TeamIF } from '../../../interface'
import { CreateProject } from '../../../request/admin'
import { useFormValidateFields } from '../../../utils/useHookTools'

export const useHomePageInit = () => {
  const [form] = Form.useForm()
  const formValidateFields = useFormValidateFields(form)
  const [list, setList] = useState<TeamIF.ProjectHealthyList>([])
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    ;(async () => {
      const data = await projectInteractor.getHealthStatus()
      setList(data)
    })()
  }, [])

  const onClose = () => {
    form.resetFields()
    setVisible(false)
  }

  const handleOpenModal = () => {
    setVisible(true)
  }

  const createProject = useCallback(async () => {
    formValidateFields(async value => {
      const { code, msg } = await CreateProject(value)
      if (code === 200) {
        message.success(msg)
        onClose()
      } else {
        message.warn(msg)
      }
    })
  }, [])

  return { list, createProject, visible, onClose, form, handleOpenModal }
}
