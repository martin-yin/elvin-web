import React, { FC } from 'react'
import { Input, Form, Button, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.less'
import { setUserInfo } from '../../stores/app.store'
import { useDispatch } from 'react-redux'
import { Tabs } from 'antd'
import { AdminLogin, RegisterAdmin } from '../../request/admin'
import { useNavigate } from 'react-router'

const { TabPane } = Tabs
const LoginPage: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = async (form: any) => {
    const { data, code, msg } = await AdminLogin(form)
    if (code == 200) {
      dispatch(setUserInfo(data.user))
      localStorage.setItem('token', data.token)
      navigate('/')
    } else {
      notification['error']({
        message: msg
      })
    }
  }

  const register = async (form: any) => {
    const data: any = await RegisterAdmin(form)
    if (data.code == 200) {
      dispatch(setUserInfo(data.data.user))
      localStorage.setItem('token', data.data.token)
    } else {
      notification['error']({
        message: data.msg
      })
    }
  }

  return (
    <div className={'login-content'}>
      <strong>大家好，我是登录标题</strong>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="登 录" key="1">
          <Form name="basic" initialValues={{ user_name: 'admin', password: '123456' }} onFinish={userLogin}>
            <Form.Item name="user_name" rules={[{ required: true, message: '请输入用户名!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="注 册" key="2">
          <Form
            name="basic"
            initialValues={{ user_name: 'admin', password: '123456', nick_name: '' }}
            onFinish={register}
          >
            <Form.Item name="user_name" rules={[{ required: true, message: '请输入用户名!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="nick_name">
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入昵称" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                注册
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  )
}
export default LoginPage
