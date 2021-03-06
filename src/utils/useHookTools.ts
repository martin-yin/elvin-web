import { FormInstance } from 'antd'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../stores'

export const useHookTools = () => {
  const navigate = useNavigate()
  const storeDispatch = useAppDispatch()
  return { navigate, storeDispatch }
}

export const useFormValidateFields = <T = any>(form: FormInstance<T>) => {
  const formValidateFields = useCallback((callback: (value: T) => void) => {
    form
      .validateFields()
      .then(async (value: T) => {
        callback(value)
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }, [])

  return formValidateFields
}

export const useModalHook = () => {
  const [visible, setVisible] = useState(false)

  const handleCloseModal = (): void => {
    setVisible(false)
  }

  const handleOpenModal = (): void => {
    setVisible(true)
  }

  return [visible, handleOpenModal, handleCloseModal] as const
}
