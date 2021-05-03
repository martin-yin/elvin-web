import React, { FC } from 'react'
import { Input, Form, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.less'
import { AdminLogin } from '../../request'
import { setUserInfo } from '../../stores/app.store'
import { useDispatch } from 'react-redux'

const LoginPage: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const userLogin = async (form: any) => {
    const data: any = await AdminLogin(form)
    dispatch(setUserInfo(data.data.user))
    localStorage.setItem('token', data.data.token)
    history.push('/')
  }

  return (
    <div className={'login-content'}>
      <strong>大家好，我是登录标题</strong>
      <Form name="basic" initialValues={{ username: 'admin', password: '123456' }} onFinish={userLogin}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default LoginPage
function dispatch(arg0: { payload: any; type: string }) {
  throw new Error('Function not implemented.')
}
