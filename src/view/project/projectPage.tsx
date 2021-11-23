import { Card } from 'antd'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'
import { TeamIF } from '../../interface/team.interface'
import { Descriptions } from 'antd'
import Field from '@ant-design/pro-field'
import { projectInteractor } from '../../core/interactors'

const ProjectPage: FC = () => {
  const [project, setProject] = useState<TeamIF.Project>({
    id: 0,
    monitor_id: '',
    project_name: '',
    team_id: '',
    created_at: 'string'
  })

  useEffect(() => {
    ;async () => {
      const data = await projectInteractor.getProject()
      setProject(data)
    }
  }, [])

  const code = `<script>
    !(function(sdk, monitorId) {
      var head = document.getElementsByTagName('head')[0]; 
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = sdk
      script.onload = function() {
        window['elvin-js'] && window['elvin-js'].init({
          monitorId: monitorId,
        })
      };
      head.appendChild(script); 
    })("https://shifulaile-admin-1258720006.cos.ap-chengdu.myqcloud.com/index.js", "${project.monitor_id}");
  </script>`

  // 删除项目
  // const confirm = async (id: number | any) => {
  //   const { code, msg } = await DelProject(id)
  //   if (code == 200) {
  //     navigate('/')
  //     message.success(msg)
  //   }
  // }

  return (
    <Card>
      <Descriptions column={1}>
        <Descriptions.Item label="应用名称">
          <Field text={project.project_name} mode="read" />
        </Descriptions.Item>
        <Descriptions.Item label="应用标识">
          <Field text={project.monitor_id} mode="read" />
        </Descriptions.Item>
        <Descriptions.Item label="打点代码">
          <Field text={code} mode="read" valueType="jsonCode" />
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          <Field text={moment(project?.created_at).format('YYYY MM-DD hh:mm:ss')} mode="read" />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
export default ProjectPage
