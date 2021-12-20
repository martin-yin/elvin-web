import moment from 'moment'
import { useEffect, useState } from 'react'
import { useFilterHeaderContext } from '../../../components/filterHeader/hook/useFilterHeaderInit'
import { httpInteractor } from '../../../core/interactors'
import { HttpIF } from '../../../interface'

export const useHttpInit = () => {
  const { filterHeaderParams } = useFilterHeaderContext()

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

  useEffect(() => {
    ;(async () => {
      const httpConsumes = await httpInteractor.getHttpStage(filterHeaderParams)
      setHttpConsumes(httpConsumes)
      const httpList = await httpInteractor.getHttps(filterHeaderParams)
      setHttpList(httpList)
      const quota = await httpInteractor.getHttpQuota(filterHeaderParams)
      setQUota(quota)
    })()
  }, [filterHeaderParams])

  return { quota, httpList, httpConsumes }
}
