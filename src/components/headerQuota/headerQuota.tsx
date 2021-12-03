import { InfoCircleFilled } from '@ant-design/icons'
import { Card, Statistic, Tooltip } from 'antd'
import React, { FC } from 'react'
import { HttpIF, PerformanceIF, QuotaTitleUnitKey, QuotaTitleUnitKeys, ResourcesIF } from '../../interface'
import './index.less'
const HeaderQuota: FC<{
  quotaTitleUnitKeys: QuotaTitleUnitKeys
  quota: PerformanceIF.PerformanceQuota | HttpIF.Quota | ResourcesIF.Quota
}> = ({ quotaTitleUnitKeys, quota }) => {
  return (
    <Card className="header-quota">
      <p className="quota-tips">
        <Tooltip title="今日数据指标">
          <InfoCircleFilled style={{ fontSize: '16px', color: '#3399FF' }} />
        </Tooltip>
      </p>
      {quota ? (
        <>
          {quotaTitleUnitKeys.map((item: QuotaTitleUnitKey, index: number) => {
            return (
              <div key={index} className="item">
                <Statistic title={item.title} value={quota[item.key]} suffix={item.unit} />
              </div>
            )
          })}
        </>
      ) : (
        <> </>
      )}
    </Card>
  )
}
export default HeaderQuota
