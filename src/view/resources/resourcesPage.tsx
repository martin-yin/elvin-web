import React, { FC, useCallback, useEffect, useState } from 'react'
import { Card, Table } from 'antd'
import { webPageErrorData } from '../../request'
import { ResourcesIF } from '../../interface/'
import HeaderQuota from '../../components/headerQuota/headerQuota'

const ResourcesPage: FC = () => {
  const [resourcesData, setErrorPageData] = useState<{
    quota: ResourcesIF.Quota
    resources_list: ResourcesIF.ResourcesList
  }>()

  const initErrorPageData = useCallback(async () => {
    const { data } = await webPageErrorData()
    setErrorPageData(data)
  }, [])

  useEffect(() => {
    initErrorPageData()
  }, [initErrorPageData])

  const columns = [
    {
      title: '资源地址',
      dataIndex: 'page_source_url',
      key: 'page_source_url'
    },
    {
      title: '发生页面',
      dataIndex: 'page_url_count',
      key: 'page_url_count'
    },
    {
      title: '影响用户',
      dataIndex: 'user_count',
      key: 'user_count'
    },
    {
      title: '总共次数',
      dataIndex: 'source_count',
      key: 'source_count'
    },
    {
      title: '资源类型',
      dataIndex: 'element_type',
      key: 'element_type'
    }
  ]

  const quotaTitleUnitKey = [
    {
      title: '异常次数',
      key: 'error_count',
      unit: 'ms'
    },
    {
      title: '异常页面',
      key: 'error_page',
      unit: '%'
    },
    {
      title: '影响用户',
      key: 'error_user',
      unit: ''
    }
  ]

  return (
    <>
      <div>
        <HeaderQuota quotaTitleUnitKey={quotaTitleUnitKey} quota={resourcesData.quota} />
        <Card>
          <Table dataSource={resourcesData.resources_list} columns={columns} rowKey="page_source_url" />
        </Card>
      </div>
    </>
  )
}

export default ResourcesPage
