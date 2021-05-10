import React, { FC, useCallback, useEffect, useState } from 'react'
import { Button, Card, Col, Input, message, Popconfirm, Row, Select } from 'antd'
import { useHistory } from 'react-router-dom'
import { Project } from '../../interface/team.interface'
import { DelProject, GetProject } from '../../request/admin'
import './index.less'
require('codemirror/lib/codemirror.css')
require('codemirror/theme/material.css')
require('codemirror/theme/neat.css')
require('codemirror/mode/xml/xml.js')
require('codemirror/mode/javascript/javascript.js')
import { UnControlled as CodeMirror } from 'react-codemirror2'
import moment from 'moment'

const ProjectPage: FC = () => {
  const [project, setProject] = useState<Project>({
    id: 0,
    monitor_id: '',
    project_name: '',
    team_id: '',
    created_at: 'string'
  })
  const history = useHistory()

  const initProject = useCallback(async () => {
    const { code, data } = await GetProject()
    if (code == 200) {
      setProject(data)
    }
  }, [])

  useEffect(() => {
    initProject()
  }, [initProject])

  const code = `<script>
    !(function(sdk, monitorId) {
      var head = document.getElementsByTagName('head')[0]; 
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = sdk
      script.onload = function() {
        window[hawkReport] || window[hawkReport].init({monitorId})
      };
      head.appendChild(script); 
    })("https://shifulaile-admin-1258720006.cos.ap-chengdu.myqcloud.com/index.js", ${project.monitor_id});
  </script>`

  const confirm = async (id: number | any) => {
    const { code, msg } = await DelProject(id)
    if (code == 200) {
      history.push('/')
      message.success(msg)
    } else {
      message.success(msg)
    }
  }

  return (
    <div>
      <Card>
        <Row gutter={[16, 16]} className="projectItem">
          <Col span={2}>
            <p className="align-right">应用名称：</p>
          </Col>
          <Col span={14}>{project.project_name}</Col>
          <Col span={8}></Col>
        </Row>
        <Row gutter={[16, 16]} className="projectItem">
          <Col span={2}>
            <p className="align-right">应用标识：</p>
          </Col>
          <Col span={14}>{project.monitor_id}</Col>
          <Col span={8}></Col>
        </Row>
        <Row gutter={[16, 16]} className="projectItem">
          <Col span={2}>
            <p className="align-right">打点代码：</p>
          </Col>
          <Col span={14}>
            <CodeMirror
              value={code}
              options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true
              }}
            />
          </Col>
          <Col span={8}></Col>
        </Row>
        <Row gutter={[16, 16]} className="projectItem">
          <Col span={2}>
            <p className="align-right">创建时间：</p>
          </Col>
          <Col span={14}>{moment(project?.created_at).format('YYYY MM-DD hh:mm:ss')}</Col>
          <Col span={8}></Col>
        </Row>
        <Row gutter={[16, 16]} className="projectItem">
          <Col span={2}>
            <p className="align-right">操作：</p>
          </Col>
          <Col span={14}>
            <Popconfirm
              title="确定要删除此项目么?删了可就真的没了！"
              onConfirm={() => confirm(project.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </Col>
          <Col span={8}></Col>
        </Row>
      </Card>
    </div>
  )
}
export default ProjectPage
