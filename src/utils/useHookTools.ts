import { Form, FormInstance } from 'antd'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../stores'

export const useHookTools = () => {
  const navigate = useNavigate()
  const storeDispatch = useAppDispatch()
  const [form] = Form.useForm()

  const formValidateFields = (callbcak: <T>(value: T) => void): void => {
    form.validateFields().then(async (value: any) => callbcak(value))
  }

  return { navigate, storeDispatch, form, formValidateFields }
}

export const useFormValidateFields = <T>(form: FormInstance<T>) => {
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
