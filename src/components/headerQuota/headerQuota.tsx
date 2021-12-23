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
      ) : null}
    </Card>
  )
}
export default HeaderQuota
