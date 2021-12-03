import moment from 'moment'
import { useEffect, useState } from 'react'
import { httpInteractor } from '../../../core/interactors'
import { HttpIF } from '../../../interface'
export interface HttpConsumes {
  total: Array<{
    time: string
    value: number
    type: string
  }>
  timeConsumes: Array<{
    time: string
    count: number
    name: string
  }>
}
export const useHttpInit = () => {
  const [quota, setQUota] = useState<HttpIF.Quota>({
    error_user: 0,
    load_time: 0,
    success_total: 0,
    total: 0,
    success_rate: ''
  })
  const [httpList, setHttpList] = useState<HttpIF.HttpUrlList>([])
  const [httpConsumes, setHttpConsumes] = useState<HttpConsumes>({
    total: [],
    timeConsumes: []
  })

  const [httpParam, setHttpParam] = useState({
    time_grain: 'minute',
    start_time: moment().format('YYYY-MM-DD'),
    end_time: moment().format('YYYY-MM-DD'),
    stage_type: 'success'
  })

  useEffect(() => {
    ;(async () => {
      const httpConsumes = await httpInteractor.getHttpStage(httpParam)
      setHttpConsumes(httpConsumes)
      const httpList = await httpInteractor.getHttps(httpParam)
      setHttpList(httpList)
      const quota = await httpInteractor.getHttpQuota(httpParam)
      setQUota(quota)
    })()
  }, [])

  return { quota, httpList, httpConsumes, setHttpParam }
}
