import moment from 'moment'
import { useEffect, useState } from 'react'
import { httpInteractor } from '../../../core/interactors'
import { HttpIF } from '../../../interface'

export const useHttpInit = () => {
  const [quota, setQUota] = useState<HttpIF.Quota>({
    error_user: 0,
    load_time: 0,
    success_total: 0,
    total: 0,
    success_rate: ''
  })
  const [httpList, setHttpList] = useState<HttpIF.Https>([])
  const [httpConsumes, setHttpConsumes] = useState<HttpIF.HttpConsumes>({
    total: [],
    timeConsumes: []
  })

  const [httpParams] = useState<HttpIF.HttpParams>({
    time_grain: 'minute',
    start_time: moment().format('YYYY-MM-DD'),
    end_time: moment().format('YYYY-MM-DD')
  })

  useEffect(() => {
    ;(async () => {
      const httpConsumes = await httpInteractor.getHttpStage(httpParams)
      setHttpConsumes(httpConsumes)
      const httpList = await httpInteractor.getHttps(httpParams)
      setHttpList(httpList)
      const quota = await httpInteractor.getHttpQuota(httpParams)
      setQUota(quota)
    })()
  }, [])

  return { quota, httpList, httpConsumes }
}
