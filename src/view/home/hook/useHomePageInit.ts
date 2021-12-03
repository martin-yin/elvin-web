import { Form, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { adminInteractor, projectInteractor } from '../../../core/interactors'
import { AdminIF, TeamIF } from '../../../interface'
import { useFormValidateFields } from '../../../utils/useHookTools'

export const useHomePageInit = () => {
  const [form] = Form.useForm()
  const formValidateFields = useFormValidateFields(form)
  const [list, setList] = useState<TeamIF.ProjectHealthys>([])
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    getHealthStatusInit()
  }, [])

  const getHealthStatusInit = useCallback(async () => {
    const data = await projectInteractor.getHealthStatus()
    setList(data)
  }, [])

  const handleCloseModal = useCallback(() => {
    form.resetFields()
    setVisible(false)
  }, [])

  const handleOpenModal = useCallback(() => {
    setVisible(true)
  }, [])

  const handleCreateProject = useCallback(async () => {
    formValidateFields(async (value: AdminIF.CreateProject) => {
      const code = await adminInteractor.createProject(value)
      if (code === 200) {
        message.success('创建成功！')
      }
      handleCloseModal()
      getHealthStatusInit()
    })
  }, [])

  return { list, handleCreateProject, visible, handleCloseModal, form, handleOpenModal }
}
