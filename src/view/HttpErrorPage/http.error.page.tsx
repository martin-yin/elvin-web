import React, { FC } from 'react'
import { Card, Statistic, Table, Tooltip } from 'antd'
import './index.less'
import { InfoCircleFilled } from '@ant-design/icons'
const HttpPageError: FC = () => {
  return (
    <>
      <div>
        <Card className="header-quota" style={{ marginBottom: '20px' }}>
          <p className="quota-tips">
            <Tooltip title="今日数据指标">
              <InfoCircleFilled style={{ fontSize: '16px', color: '#3399FF' }} />
            </Tooltip>
          </p>
          <div className="item">
            <Statistic title="400错误" value={111} />
          </div>
          <div className="item">
            <Statistic title="404错误" value={111} />
          </div>
          <div className="item">
            <Statistic title="500错误" value={111} />
          </div>
          <div className="item">
            <Statistic title="失败影响用户" value={1} />
          </div>
        </Card>
        {/* <Card className="header-quota" style={{ marginBottom: '20px' }}></Card> */}
        <Card>
          <Table dataSource={[]} columns={[]} rowKey="http_url" />
        </Card>
      </div>
    </>
  )
}

export default HttpPageError
